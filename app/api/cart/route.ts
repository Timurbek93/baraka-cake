import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateCartSessionId } from "@/lib/cart-session";

export async function GET() {
  const sessionId = await getOrCreateCartSessionId();
  const cart = await prisma.cart.upsert({
    where: { sessionId },
    create: { sessionId },
    update: {},
    include: { items: true },
  });

  const totalQty = cart.items.reduce((sum, i) => sum + i.qty, 0);
  const totalAmount = cart.items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);

  return NextResponse.json({
    cart: {
      id: cart.id,
      sessionId: cart.sessionId,
      totalQty,
      totalAmount,
      currency: "UZS",
      items: cart.items.map((i) => ({
        id: i.id,
        productId: i.productId,
        qty: i.qty,
        unitPrice: i.unitPrice,
        title: i.titleSnapshot,
        lineTotal: i.qty * i.unitPrice,
      })),
    },
  });
}

