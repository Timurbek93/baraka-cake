"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ImportDemoProductsButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function run() {
    setMsg(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/products/import-static", { method: "POST" });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(typeof j.error === "string" ? j.error : "Ошибка импорта");
        return;
      }
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => void run()}
        className="rounded-full border border-chocolate/20 bg-white px-4 py-2 text-sm font-semibold text-chocolate hover:border-turquoise disabled:opacity-60"
      >
        {pending ? "Импорт…" : "Импортировать демо-товары из кода"}
      </button>
      {msg ? <p className="text-xs text-amber-800">{msg}</p> : null}
    </div>
  );
}
