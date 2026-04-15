"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Locale } from "@/lib/i18n";

type CartState = {
  totalQty: number;
};

async function fetchCart(): Promise<CartState> {
  const res = await fetch("/api/cart", { cache: "no-store" });
  if (!res.ok) return { totalQty: 0 };
  const data = (await res.json().catch(() => null)) as any;
  const qty = Number(data?.cart?.totalQty ?? 0);
  return { totalQty: Number.isFinite(qty) ? qty : 0 };
}

export function CartBadge({ locale }: { locale: Locale }) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const s = await fetchCart();
      if (!cancelled) setQty(s.totalQty);
    };
    void load();
    const id = window.setInterval(load, 5000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <Link
      href={`/${locale}/cart`}
      data-analytics-event="cart_open"
      data-analytics-section="header"
      className="relative inline-flex h-10 items-center justify-center rounded-full border border-inkBlue/15 bg-white/70 px-4 text-sm font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise"
    >
      Cart
      {qty > 0 ? (
        <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-inkBlue px-1 text-[11px] font-bold text-milk">
          {qty > 99 ? "99+" : qty}
        </span>
      ) : null}
    </Link>
  );
}

