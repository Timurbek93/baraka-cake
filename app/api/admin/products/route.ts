import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productCreateSchema } from "@/lib/product-api-schema";

export async function GET() {
  const items = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = productCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const d = parsed.data;
  try {
    const created = await prisma.product.create({
      data: {
        slug: d.slug,
        nameRu: d.nameRu,
        nameEn: d.nameEn ?? "",
        nameUz: d.nameUz ?? "",
        descRu: d.descRu ?? "",
        descEn: d.descEn ?? "",
        descUz: d.descUz ?? "",
        priceFrom: d.priceFrom ?? "",
        unit: d.unit ?? "",
        category: d.category ?? undefined,
        imageUrl: d.imageUrl ?? undefined,
        imageAltRu: d.imageAltRu ?? "",
        imageAltEn: d.imageAltEn ?? "",
        imageAltUz: d.imageAltUz ?? "",
        isPopular: d.isPopular ?? false,
        sortOrder: d.sortOrder ?? 0,
        active: d.active ?? true,
      },
    });
    return NextResponse.json(created);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Create failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
