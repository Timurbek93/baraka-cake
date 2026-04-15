"use client";

import { useMemo, useState } from "react";
import { Locale } from "@/lib/i18n";

type SubmitResult = { ok: true; orderId: string; orderNumber: string } | { ok: false; error: string };

export function CheckoutForm({ locale }: { locale: Locale }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ orderNumber: string } | null>(null);

  const labels = useMemo(
    () =>
      ({
        ru: {
          title: "Оформление заказа",
          name: "Имя",
          phone: "Телефон",
          contact: "Способ связи",
          fulfillment: "Получение",
          delivery: "Доставка",
          pickup: "Самовывоз",
          address: "Адрес доставки",
          comment: "Комментарий",
          submit: "Отправить заказ",
          ok: "Спасибо! Ваш заказ",
        },
        en: {
          title: "Checkout",
          name: "Name",
          phone: "Phone",
          contact: "Contact method",
          fulfillment: "Fulfillment",
          delivery: "Delivery",
          pickup: "Pickup",
          address: "Delivery address",
          comment: "Comment",
          submit: "Submit order",
          ok: "Thank you! Your order",
        },
        uz: {
          title: "Buyurtmani rasmiylashtirish",
          name: "Ism",
          phone: "Telefon",
          contact: "Aloqa usuli",
          fulfillment: "Olish usuli",
          delivery: "Yetkazib berish",
          pickup: "Olib ketish",
          address: "Yetkazib berish manzili",
          comment: "Izoh",
          submit: "Buyurtmani yuborish",
          ok: "Rahmat! Buyurtmangiz",
        },
      })[locale],
    [locale],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const form = new FormData(e.currentTarget);
      const payload = {
        customerName: String(form.get("customerName") ?? ""),
        customerPhone: String(form.get("customerPhone") ?? ""),
        contactMethod: String(form.get("contactMethod") ?? "WHATSAPP"),
        fulfillment: String(form.get("fulfillment") ?? "PICKUP"),
        deliveryAddress: String(form.get("deliveryAddress") ?? ""),
        comment: String(form.get("comment") ?? ""),
        locale,
      };

      const res = await fetch("/api/checkout/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = (await res.json().catch(() => null)) as any;
      const result: SubmitResult = res.ok ? j : { ok: false, error: String(j?.error ?? "Checkout failed") };
      if (!res.ok || !result.ok) {
        setError((result as any).error ?? "Checkout failed");
        return;
      }
      setSuccess({ orderNumber: (result as any).orderNumber });
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-inkBlue/10 bg-white/70 p-6 shadow-soft">
        <p className="text-sm text-chocolate/70">{labels.ok}</p>
        <p className="mt-2 font-display text-4xl text-inkBlue">{success.orderNumber}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-chocolate/10 bg-milk p-6 shadow-soft">
      <h1 className="font-display text-3xl text-chocolate">{labels.title}</h1>

      <label className="block text-sm font-medium text-chocolate">
        {labels.name}
        <input
          name="customerName"
          required
          className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate outline-none ring-inkBlue/20 focus:ring-2"
        />
      </label>

      <label className="block text-sm font-medium text-chocolate">
        {labels.phone}
        <input
          name="customerPhone"
          required
          className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate outline-none ring-inkBlue/20 focus:ring-2"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-chocolate">
          {labels.contact}
          <select
            name="contactMethod"
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate outline-none ring-inkBlue/20 focus:ring-2"
            defaultValue="WHATSAPP"
          >
            <option value="WHATSAPP">WhatsApp</option>
            <option value="TELEGRAM">Telegram</option>
            <option value="PHONE">{labels.phone}</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-chocolate">
          {labels.fulfillment}
          <select
            name="fulfillment"
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate outline-none ring-inkBlue/20 focus:ring-2"
            defaultValue="PICKUP"
            onChange={(e) => {
              const form = e.currentTarget.form;
              const addr = form?.querySelector<HTMLInputElement>('input[name=\"deliveryAddress\"]');
              if (addr) addr.required = e.currentTarget.value === "DELIVERY";
            }}
          >
            <option value="PICKUP">{labels.pickup}</option>
            <option value="DELIVERY">{labels.delivery}</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-chocolate">
        {labels.address}
        <input
          name="deliveryAddress"
          className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate outline-none ring-inkBlue/20 focus:ring-2"
        />
      </label>

      <label className="block text-sm font-medium text-chocolate">
        {labels.comment}
        <textarea
          name="comment"
          rows={3}
          className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate outline-none ring-inkBlue/20 focus:ring-2"
        />
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        data-analytics-event="submit_order"
        data-analytics-section="checkout"
        className="w-full rounded-full bg-inkBlue py-3 text-sm font-semibold text-milk transition hover:bg-turquoise disabled:opacity-60"
      >
        {pending ? "…" : labels.submit}
      </button>
    </form>
  );
}

