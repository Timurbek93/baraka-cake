"use client";

import { ProductImageUpload } from "@/components/admin/product-image-upload";
import type { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  mode: "create" | "edit";
  initial?: Product;
};

export function ProductForm({ mode, initial }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [nameRu, setNameRu] = useState(initial?.nameRu ?? "");
  const [nameEn, setNameEn] = useState(initial?.nameEn ?? "");
  const [nameUz, setNameUz] = useState(initial?.nameUz ?? "");
  const [descRu, setDescRu] = useState(initial?.descRu ?? "");
  const [descEn, setDescEn] = useState(initial?.descEn ?? "");
  const [descUz, setDescUz] = useState(initial?.descUz ?? "");
  const [priceFrom, setPriceFrom] = useState(initial?.priceFrom ?? "");
  const [unit, setUnit] = useState(initial?.unit ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [imageAltRu, setImageAltRu] = useState(initial?.imageAltRu ?? "");
  const [imageAltEn, setImageAltEn] = useState(initial?.imageAltEn ?? "");
  const [imageAltUz, setImageAltUz] = useState(initial?.imageAltUz ?? "");
  const [isPopular, setIsPopular] = useState(initial?.isPopular ?? false);
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [active, setActive] = useState(initial?.active ?? true);

  async function submit() {
    setError(null);
    setSaving(true);
    const body = {
      slug,
      nameRu,
      nameEn,
      nameUz,
      descRu,
      descEn,
      descUz,
      priceFrom,
      unit,
      category: category || null,
      imageUrl: imageUrl || null,
      imageAltRu,
      imageAltEn,
      imageAltUz,
      isPopular,
      sortOrder,
      active,
    };
    try {
      const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${initial?.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof j.error === "string" ? j.error : JSON.stringify(j.error ?? j));
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <p className="rounded-2xl border border-turquoise/20 bg-white/60 px-4 py-3 text-sm text-chocolate/80">
        Названия, описания и alt для картинки задаются <strong>отдельно для ru, en и uz</strong> — на витрине подставляется вариант по текущей локали (если поле пустое, для названия используется запасной вариант).
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-chocolate/80">Slug (латиница)</span>
          <input
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 font-mono text-sm"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={mode === "edit"}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-chocolate/80">Порядок сортировки</span>
          <input
            type="number"
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </label>
      </div>

      {(["ru", "en", "uz"] as const).map((loc) => (
        <div key={loc} className="rounded-2xl border border-chocolate/10 bg-milk p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-turquoise">{loc}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              Название
              <input
                className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                value={loc === "ru" ? nameRu : loc === "en" ? nameEn : nameUz}
                onChange={(e) => {
                  if (loc === "ru") setNameRu(e.target.value);
                  if (loc === "en") setNameEn(e.target.value);
                  if (loc === "uz") setNameUz(e.target.value);
                }}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              Описание
              <textarea
                rows={3}
                className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                value={loc === "ru" ? descRu : loc === "en" ? descEn : descUz}
                onChange={(e) => {
                  if (loc === "ru") setDescRu(e.target.value);
                  if (loc === "en") setDescEn(e.target.value);
                  if (loc === "uz") setDescUz(e.target.value);
                }}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              Alt изображения
              <input
                className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                value={loc === "ru" ? imageAltRu : loc === "en" ? imageAltEn : imageAltUz}
                onChange={(e) => {
                  if (loc === "ru") setImageAltRu(e.target.value);
                  if (loc === "en") setImageAltEn(e.target.value);
                  if (loc === "uz") setImageAltUz(e.target.value);
                }}
              />
            </label>
          </div>
        </div>
      ))}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Цена (строка)
          <input
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            placeholder="169 000 сум"
          />
        </label>
        <label className="block text-sm">
          Единица
          <input
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="за торт"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          Категория
          <input
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-chocolate/80">URL изображения</span>
          <span className="mt-0.5 block text-xs font-normal text-chocolate/55">
            Вставьте ссылку или путь к файлу в <code className="rounded bg-chocolate/5 px-1">/public</code> — превью и подсказки ниже обновятся сразу. Загрузка с компьютера тоже подставит URL сюда.
          </span>
          <input
            className="mt-2 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 font-mono text-sm"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://… или /images/products/…"
          />
        </label>
        <div className="sm:col-span-2">
          <ProductImageUpload imageUrl={imageUrl} onImageUrl={setImageUrl} />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
          Популярный (главная)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Активен на сайте
        </label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="button"
        disabled={saving}
        onClick={() => void submit()}
        className="rounded-full bg-inkBlue px-6 py-2.5 text-sm font-semibold text-milk hover:bg-turquoise disabled:opacity-60"
      >
        {saving ? "Сохранение…" : mode === "create" ? "Создать" : "Сохранить"}
      </button>
    </div>
  );
}
