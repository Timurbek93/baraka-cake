import Link from "next/link";

export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { prisma } from "@/lib/prisma";

export default async function AdminProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-sand px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin/products" className="text-sm font-semibold text-turquoise hover:underline">
          ← К списку
        </Link>
        <h1 className="mt-4 font-display text-3xl text-chocolate">Редактирование</h1>
        <p className="mt-1 font-mono text-sm text-chocolate/60">{product.slug}</p>
        <ProductForm mode="edit" initial={product} />
      </div>
    </div>
  );
}
