import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      publicCode: true,
      status: true,
      customerName: true,
      customerPhone: true,
      totalAmount: true,
      currency: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-sand px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-chocolate">Заказы</h1>
            <p className="mt-1 text-sm text-chocolate/65">Новые заказы появляются после оформления на витрине.</p>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-turquoise hover:underline">
            ← Админка
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-chocolate/70">Заказов пока нет.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-chocolate/10 bg-milk shadow-soft">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-chocolate/10 bg-white/50 text-xs uppercase tracking-wide text-chocolate/60">
                <tr>
                  <th className="px-4 py-3">Номер</th>
                  <th className="px-4 py-3">Статус</th>
                  <th className="px-4 py-3">Клиент</th>
                  <th className="px-4 py-3">Телефон</th>
                  <th className="px-4 py-3">Сумма</th>
                  <th className="px-4 py-3">Дата</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-chocolate/5">
                    <td className="px-4 py-3 font-semibold text-inkBlue">{o.publicCode}</td>
                    <td className="px-4 py-3 text-chocolate/80">{o.status}</td>
                    <td className="px-4 py-3 text-chocolate">{o.customerName || "—"}</td>
                    <td className="px-4 py-3 text-chocolate/75">{o.customerPhone || "—"}</td>
                    <td className="px-4 py-3 text-chocolate/75">
                      {o.totalAmount} {o.currency}
                    </td>
                    <td className="px-4 py-3 text-chocolate/60">{new Date(o.createdAt).toLocaleString("ru-RU")}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="rounded-full border border-chocolate/15 bg-white px-3 py-1 text-xs font-semibold text-inkBlue hover:border-turquoise"
                      >
                        Открыть
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

