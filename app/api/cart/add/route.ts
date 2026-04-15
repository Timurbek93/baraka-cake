import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getOrCreateCartSessionId } from "@/lib/cart-session";

const BodySchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().min(1).max(100).default(1),
});

export async function POST(request: Request) {
  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const sessionId = await getOrCreateCartSessionId();
  const cart = await prisma.cart.upsert({
    where: { sessionId },
    create: { sessionId },
    update: {},
  });

  const product = await prisma.product.findUnique({
    where: { id: parsed.data.productId },
    select: { id: true, nameRu: true, priceFromNumber: true, active: true },
  });
  if (!product?.active) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
    select: { qty: true },
  });
  const nextQty = (existing?.qty ?? 0) + parsed.data.qty;

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
    create: {
      cartId: cart.id,
      productId: product.id,
      qty: nextQty,
      unitPrice: product.priceFromNumber,
      titleSnapshot: product.nameRu,
    },
    update: {
      qty: nextQty,
      unitPrice: product.priceFromNumber,
      titleSnapshot: product.nameRu,
    },
  });

  return NextResponse.json({ ok: true });
}

