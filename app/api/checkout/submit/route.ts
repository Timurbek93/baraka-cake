import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getOrCreateCartSessionId } from "@/lib/cart-session";

const BodySchema = z.object({
  customerName: z.string().min(1).max(120),
  customerPhone: z.string().min(5).max(40),
  contactMethod: z.enum(["WHATSAPP", "TELEGRAM", "PHONE"]).default("WHATSAPP"),
  fulfillment: z.enum(["DELIVERY", "PICKUP"]).default("PICKUP"),
  deliveryAddress: z.string().max(240).optional().default(""),
  comment: z.string().max(500).optional().default(""),
  locale: z.string().max(8).optional().default(""),
});

function toPublicCode(orderNumber: number) {
  return `BC-${orderNumber}`;
}

export async function POST(request: Request) {
  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const sessionId = await getOrCreateCartSessionId();

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        const cart = await tx.cart.findUnique({
          where: { sessionId },
          include: { items: true },
        });
        if (!cart || cart.items.length === 0) {
          return { error: "Cart is empty" as const };
        }

        // Compute totals and prepare order items from snapshots.
        const items = cart.items.map((i) => ({
          productId: i.productId,
          titleSnapshot: i.titleSnapshot,
          unitSnapshot: "",
          priceSnapshot: i.unitPrice,
          qty: i.qty,
          lineTotal: i.qty * i.unitPrice,
        }));
        const totalAmount = items.reduce((sum, i) => sum + i.lineTotal, 0);

        // Next orderNumber (simple, human-friendly). For MVP we use max+1 inside tx.
        const agg = await tx.order.aggregate({ _max: { orderNumber: true } });
        const nextOrderNumber = (agg._max.orderNumber ?? 1000) + 1;
        const publicCode = toPublicCode(nextOrderNumber);

        const order = await tx.order.create({
          data: {
            orderNumber: nextOrderNumber,
            publicCode,
            status: "NEW",
            customerName: parsed.data.customerName.trim(),
            customerPhone: parsed.data.customerPhone.trim(),
            contactMethod: parsed.data.contactMethod,
            fulfillment: parsed.data.fulfillment,
            deliveryAddress: parsed.data.deliveryAddress?.trim() ?? "",
            comment: parsed.data.comment?.trim() ?? "",
            currency: "UZS",
            totalAmount,
            items: {
              create: items,
            },
          },
          select: { id: true, orderNumber: true, publicCode: true },
        });

        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

        // Minimal analytics event for submit_order.
        await tx.analyticsEvent.create({
          data: {
            name: "submit_order",
            locale: parsed.data.locale ?? "",
            amount: totalAmount,
            currency: "UZS",
            path: "/checkout",
          },
        });

        return { order };
      },
      { isolationLevel: "Serializable" },
    );

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true, orderId: result.order.id, orderNumber: result.order.publicCode });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

