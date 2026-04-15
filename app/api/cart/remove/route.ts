import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getOrCreateCartSessionId } from "@/lib/cart-session";

const BodySchema = z.object({
  itemId: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const sessionId = await getOrCreateCartSessionId();
  const cart = await prisma.cart.findUnique({ where: { sessionId }, select: { id: true } });
  if (!cart) return NextResponse.json({ ok: true });

  const item = await prisma.cartItem.findUnique({ where: { id: parsed.data.itemId }, select: { cartId: true } });
  if (!item || item.cartId !== cart.id) return NextResponse.json({ ok: true });

  await prisma.cartItem.delete({ where: { id: parsed.data.itemId } });
  return NextResponse.json({ ok: true });
}

