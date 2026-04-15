"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Locale } from "@/lib/i18n";

type CartItem = {
  id: string;
  productId: string;
  qty: number;
  unitPrice: number;
  title: string;
  lineTotal: number;
};

type CartDto = {
  id: string;
  totalQty: number;
  totalAmount: number;
  currency: string;
  items: CartItem[];
};

function fmt(amount: number) {
  return new Intl.NumberFormat("ru-RU").format(amount);
}

export function CartView({ locale }: { locale: Locale }) {
  const [cart, setCart] = useState<CartDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const labels = useMemo(
    () =>
      ({
        ru: { title: "Корзина", empty: "Корзина пустая.", checkout: "Оформить заказ", clear: "Очистить" },
        en: { title: "Cart", empty: "Your cart is empty.", checkout: "Checkout", clear: "Clear" },
        uz: { title: "Savat", empty: "Savat bo‘sh.", checkout: "Buyurtma berish", clear: "Tozalash" },
      })[locale],
    [locale],
  );

  async function load() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const j = (await res.json().catch(() => null)) as any;
      if (!res.ok) {
        setError("Не удалось загрузить корзину");
        return;
      }
      setCart(j.cart as CartDto);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function updateQty(itemId: string, qty: number) {
    await fetch("/api/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, qty }),
    });
    await load();
  }

  async function remove(itemId: string) {
    await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    await load();
  }

  async function clear() {
    await fetch("/api/cart/clear", { method: "POST" });
    await load();
  }

  if (loading) return <p className="text-chocolate/70">…</p>;
  if (error) return <p className="text-red-700">{error}</p>;

  const items = cart?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl text-chocolate">{labels.title}</h1>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={() => void clear()}
            className="rounded-full border border-chocolate/15 bg-white/70 px-4 py-2 text-sm font-semibold text-inkBlue hover:border-turquoise"
          >
            {labels.clear}
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="text-chocolate/70">{labels.empty}</p>
      ) : (
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-chocolate/10 bg-milk p-4 shadow-card">
              <div className="min-w-[220px]">
                <p className="font-semibold text-chocolate">{i.title}</p>
                <p className="mt-1 text-sm text-chocolate/65">
                  {fmt(i.unitPrice)} UZS × {i.qty} = {fmt(i.lineTotal)} UZS
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void updateQty(i.id, Math.max(1, i.qty - 1))}
                  className="h-9 w-9 rounded-full border border-chocolate/15 bg-white/70 font-bold text-inkBlue hover:border-turquoise"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold text-chocolate">{i.qty}</span>
                <button
                  type="button"
                  onClick={() => void updateQty(i.id, i.qty + 1)}
                  className="h-9 w-9 rounded-full border border-chocolate/15 bg-white/70 font-bold text-inkBlue hover:border-turquoise"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => void remove(i.id)}
                  className="ml-2 rounded-full border border-red-200 bg-white/70 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-inkBlue/10 bg-white/70 p-5 shadow-soft">
            <p className="text-sm font-semibold text-chocolate/70">
              Итого: <span className="text-inkBlue">{fmt(cart?.totalAmount ?? 0)} UZS</span>
            </p>
            <Link
              href={`/${locale}/checkout`}
              data-analytics-event="begin_checkout"
              data-analytics-section="cart"
              className="inline-flex items-center justify-center rounded-full bg-inkBlue px-6 py-3 text-sm font-semibold text-milk hover:bg-turquoise"
            >
              {labels.checkout}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

