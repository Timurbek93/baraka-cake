import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateCartSessionId } from "@/lib/cart-session";

export async function POST() {
  const sessionId = await getOrCreateCartSessionId();
  const cart = await prisma.cart.findUnique({ where: { sessionId }, select: { id: true } });
  if (!cart) return NextResponse.json({ ok: true });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  return NextResponse.json({ ok: true });
}

