"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminProductRow = {
  id: string;
  slug: string;
  nameRu: string;
  category: string | null;
  active: boolean;
  isPopular: boolean;
  sortOrder: number;
  priceFrom: string;
};

export function ProductsTable({ initial }: { initial: AdminProductRow[] }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function toggleActive(id: string, active: boolean) {
    setActionError(null);
    setPending(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: unknown };
      if (!res.ok) {
        setActionError(typeof j.error === "string" ? j.error : "Не удалось изменить статус");
        return;
      }
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Удалить товар из базы?")) return;
    setActionError(null);
    setPending(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const j = (await res.json().catch(() => ({}))) as { error?: unknown };
      if (!res.ok) {
        setActionError(typeof j.error === "string" ? j.error : "Не удалось удалить");
        return;
      }
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  if (initial.length === 0) {
    return (
      <p className="text-chocolate/70">
        Товаров нет. Импортируйте демо из кода или{" "}
        <Link href="/admin/products/new" className="font-semibold text-turquoise hover:underline">
          создайте новый
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {actionError ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800" role="alert">
          {actionError}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-2xl border border-chocolate/10 bg-milk shadow-soft">
        <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-chocolate/10 bg-white/50 text-xs uppercase tracking-wide text-chocolate/60">
          <tr>
            <th className="px-4 py-3">Порядок</th>
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Название (ru)</th>
            <th className="px-4 py-3">Категория</th>
            <th className="px-4 py-3">Цена</th>
            <th className="px-4 py-3">Популярный</th>
            <th className="px-4 py-3">Активен</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {initial.map((p) => (
            <tr key={p.id} className="border-b border-chocolate/5">
              <td className="px-4 py-3 text-chocolate/80">{p.sortOrder}</td>
              <td className="px-4 py-3 font-mono text-xs text-inkBlue">{p.slug}</td>
              <td className="px-4 py-3 font-medium text-chocolate">{p.nameRu}</td>
              <td className="max-w-[140px] truncate px-4 py-3 text-chocolate/75" title={p.category ?? ""}>
                {p.category || "—"}
              </td>
              <td className="px-4 py-3 text-chocolate/75">{p.priceFrom || "—"}</td>
              <td className="px-4 py-3">{p.isPopular ? "да" : "—"}</td>
              <td className="px-4 py-3">{p.active ? "да" : "нет"}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="rounded-full border border-chocolate/15 bg-white px-3 py-1 text-xs font-semibold text-inkBlue hover:border-turquoise"
                  >
                    Правка
                  </Link>
                  <button
                    type="button"
                    disabled={pending === p.id}
                    onClick={() => void toggleActive(p.id, p.active)}
                    className="rounded-full border border-chocolate/15 px-3 py-1 text-xs font-semibold text-chocolate hover:border-turquoise disabled:opacity-50"
                  >
                    {p.active ? "Скрыть" : "Вкл."}
                  </button>
                  <button
                    type="button"
                    disabled={pending === p.id}
                    onClick={() => void remove(p.id)}
                    className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    Удалить
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
