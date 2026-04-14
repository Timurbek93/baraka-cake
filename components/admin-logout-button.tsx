"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      disabled={pending}
      className="rounded-full border border-chocolate/15 bg-white px-4 py-2 text-sm font-semibold text-chocolate hover:border-turquoise disabled:opacity-60"
    >
      {pending ? "…" : "Выйти"}
    </button>
  );
}
