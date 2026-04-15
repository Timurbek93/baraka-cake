"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["NEW", "CONFIRMED", "PREPARING", "READY", "DELIVERING", "COMPLETED", "CANCELLED"] as const;

export function OrderStatusControl({ orderId, initial }: { orderId: string; initial: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(next: string) {
    setError(null);
    setPending(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: unknown };
      if (!res.ok) {
        setError(typeof j.error === "string" ? j.error : "Не удалось обновить статус");
        return;
      }
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={value}
          disabled={pending}
          onChange={(e) => {
            const next = e.target.value;
            setValue(next);
            void save(next);
          }}
          className="rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm font-semibold text-chocolate outline-none ring-inkBlue/20 focus:ring-2 disabled:opacity-60"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {pending ? <span className="text-sm text-chocolate/60">…</span> : null}
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}

