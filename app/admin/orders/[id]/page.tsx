import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OrderStatusControl } from "@/components/admin/order-status-control";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <div className="min-h-screen bg-sand px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-chocolate">{order.publicCode}</h1>
            <p className="mt-1 text-sm text-chocolate/65">{new Date(order.createdAt).toLocaleString("ru-RU")}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/orders" className="text-sm font-semibold text-turquoise hover:underline">
              ← Заказы
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-chocolate/10 bg-milk p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-chocolate/55">Клиент</p>
            <p className="mt-2 text-lg font-semibold text-chocolate">{order.customerName || "—"}</p>
            <p className="mt-1 text-sm text-chocolate/70">{order.customerPhone || "—"}</p>
            <p className="mt-4 text-sm text-chocolate/70">
              Получение: <span className="font-semibold text-chocolate">{order.fulfillment}</span>
            </p>
            {order.deliveryAddress ? <p className="mt-1 text-sm text-chocolate/70">Адрес: {order.deliveryAddress}</p> : null}
            {order.comment ? <p className="mt-4 text-sm text-chocolate/70">Комментарий: {order.comment}</p> : null}
          </div>

          <div className="rounded-2xl border border-chocolate/10 bg-milk p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-chocolate/55">Статус</p>
            <div className="mt-3">
              <OrderStatusControl orderId={order.id} initial={order.status} />
            </div>
            <p className="mt-6 text-sm text-chocolate/70">
              Сумма:{" "}
              <span className="font-semibold text-inkBlue">
                {order.totalAmount} {order.currency}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-chocolate/10 bg-milk p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-chocolate/55">Позиции</p>
          <div className="mt-4 space-y-3">
            {order.items.map((i) => (
              <div key={i.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-chocolate/10 bg-white/60 px-4 py-3">
                <div>
                  <p className="font-semibold text-chocolate">{i.titleSnapshot || i.productId || "—"}</p>
                  <p className="text-sm text-chocolate/65">
                    {i.priceSnapshot} × {i.qty} = {i.lineTotal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

