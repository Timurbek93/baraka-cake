"use client";

import { useState } from "react";

export function AddToCartButton({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);

  async function add() {
    setDone(null);
    setPending(true);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty: 1 }),
      });
      if (!res.ok) {
        setDone("err");
        return;
      }
      setDone("ok");
      window.setTimeout(() => setDone(null), 1200);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => void add()}
      data-analytics-event="add_to_cart"
      data-analytics-section="product_card"
      data-analytics-label={productId}
      className={`inline-flex items-center justify-center rounded-full bg-inkBlue px-4 py-2 text-sm font-semibold text-milk transition hover:bg-turquoise disabled:opacity-60 ${className}`}
    >
      {pending ? "…" : done === "ok" ? "Добавлено" : done === "err" ? "Ошибка" : "В корзину"}
    </button>
  );
}

