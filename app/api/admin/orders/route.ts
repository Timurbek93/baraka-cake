import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const QuerySchema = z.object({
  status: z.enum(["NEW", "CONFIRMED", "PREPARING", "READY", "DELIVERING", "COMPLETED", "CANCELLED"]).optional(),
  take: z.coerce.number().int().min(1).max(100).optional().default(50),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = QuerySchema.safeParse({
    status: url.searchParams.get("status") ?? undefined,
    take: url.searchParams.get("take") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const rows = await prisma.order.findMany({
    where: parsed.data.status ? { status: parsed.data.status } : undefined,
    orderBy: { createdAt: "desc" },
    take: parsed.data.take,
    select: {
      id: true,
      publicCode: true,
      orderNumber: true,
      status: true,
      customerName: true,
      customerPhone: true,
      fulfillment: true,
      totalAmount: true,
      currency: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ orders: rows });
}

