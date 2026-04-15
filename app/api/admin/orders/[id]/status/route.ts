import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const BodySchema = z.object({
  status: z.enum(["NEW", "CONFIRMED", "PREPARING", "READY", "DELIVERING", "COMPLETED", "CANCELLED"]),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status: parsed.data.status },
    select: { id: true, status: true, publicCode: true },
  });

  return NextResponse.json({ ok: true, order });
}

