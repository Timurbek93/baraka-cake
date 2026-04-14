import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";

export default function AdminProductNewPage() {
  return (
    <div className="min-h-screen bg-sand px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin/products" className="text-sm font-semibold text-turquoise hover:underline">
          ← К списку
        </Link>
        <h1 className="mt-4 font-display text-3xl text-chocolate">Новый товар</h1>
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
