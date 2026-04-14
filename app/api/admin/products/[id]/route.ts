import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productCreateSchema } from "@/lib/product-api-schema";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(p);
}

export async function PUT(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = productCreateSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const d = parsed.data;
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(d.slug !== undefined && { slug: d.slug }),
        ...(d.nameRu !== undefined && { nameRu: d.nameRu }),
        ...(d.nameEn !== undefined && { nameEn: d.nameEn }),
        ...(d.nameUz !== undefined && { nameUz: d.nameUz }),
        ...(d.descRu !== undefined && { descRu: d.descRu }),
        ...(d.descEn !== undefined && { descEn: d.descEn }),
        ...(d.descUz !== undefined && { descUz: d.descUz }),
        ...(d.priceFrom !== undefined && { priceFrom: d.priceFrom }),
        ...(d.unit !== undefined && { unit: d.unit }),
        ...(d.category !== undefined && { category: d.category }),
        ...(d.imageUrl !== undefined && { imageUrl: d.imageUrl }),
        ...(d.imageAltRu !== undefined && { imageAltRu: d.imageAltRu }),
        ...(d.imageAltEn !== undefined && { imageAltEn: d.imageAltEn }),
        ...(d.imageAltUz !== undefined && { imageAltUz: d.imageAltUz }),
        ...(d.isPopular !== undefined && { isPopular: d.isPopular }),
        ...(d.sortOrder !== undefined && { sortOrder: d.sortOrder }),
        ...(d.active !== undefined && { active: d.active }),
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Update failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Delete failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
