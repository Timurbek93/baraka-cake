"use client";

import { SiteSettingsHomeBlocks } from "@/components/admin/site-settings-editor-home-blocks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { SiteSettingsPayload } from "@/lib/site-settings-schema";

const locales: Locale[] = ["ru", "en", "uz"];

type Props = {
  initial: SiteSettingsPayload;
};

export function SiteSettingsEditor({ initial }: Props) {
  const router = useRouter();
  const [data, setData] = useState<SiteSettingsPayload>(initial);
  const [tab, setTab] = useState<Locale>("ru");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function setContact<K extends keyof SiteSettingsPayload["contacts"]>(key: K, value: SiteSettingsPayload["contacts"][K]) {
    setData((d) => ({ ...d, contacts: { ...d.contacts, [key]: value } }));
  }

  function setLocaleField<L extends keyof SiteSettingsPayload["locales"][Locale]>(
    locale: Locale,
    key: L,
    value: SiteSettingsPayload["locales"][Locale][L],
  ) {
    setData((d) => ({
      ...d,
      locales: {
        ...d.locales,
        [locale]: { ...d.locales[locale], [key]: value },
      },
    }));
  }

  async function save() {
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof j.error === "string" ? j.error : "Ошибка сохранения");
        return;
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const loc = tab;
  const block = data.locales[loc];

  function patchTriple(
    field: "heroFacts" | "heroFactLabels" | "deliveryFacts",
    index: number,
    value: string,
  ) {
    const next = [0, 1, 2].map((j) => block[field][j] ?? "");
    next[index] = value;
    setLocaleField(loc, field, next);
  }

  return (
    <div className="mt-8 space-y-10">
      <section className="rounded-2xl border border-chocolate/10 bg-milk p-6 shadow-soft">
        <h2 className="font-display text-xl text-chocolate">Контакты и ссылки</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {(
            [
              ["phone", "Телефон (отображение)"],
              ["phoneHref", "tel: ссылка"],
              ["whatsappHref", "WhatsApp URL"],
              ["telegram", "Telegram @"],
              ["telegramHref", "Telegram URL"],
              ["instagram", "Instagram @"],
              ["instagramHref", "Instagram URL"],
              ["mapHref", "Google Maps URL"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm">
              <span className="font-medium text-chocolate/80">{label}</span>
              <input
                className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate"
                value={data.contacts[key]}
                onChange={(e) => setContact(key, e.target.value)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-chocolate/10 bg-milk p-6 shadow-soft">
        <h2 className="font-display text-xl text-chocolate">Тексты по языкам</h2>
        <p className="mt-2 text-sm text-chocolate/60">
          Контент главной страницы (hero, секции, отзывы, галерея, фото hero) хранится в БД; при пустой записи подставляются значения из кода.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setTab(l)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                tab === l ? "bg-inkBlue text-milk" : "border border-chocolate/15 bg-white text-chocolate"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6">
          <label className="block text-sm">
            <span className="font-medium text-chocolate/80">Адрес</span>
            <input
              className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate"
              value={block.address}
              onChange={(e) => setLocaleField(loc, "address", e.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-chocolate/80">Часы работы</span>
            <input
              className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate"
              value={block.workingHours}
              onChange={(e) => setLocaleField(loc, "workingHours", e.target.value)}
            />
          </label>

          <div className="rounded-xl border border-turquoise/20 bg-white/40 p-4">
            <h3 className="text-sm font-semibold text-chocolate">Hero — левая колонка</h3>
            <div className="mt-3 grid gap-3">
              <label className="block text-sm">
                Надзаголовок (eyebrow)
                <input
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.heroEyebrow}
                  onChange={(e) => setLocaleField(loc, "heroEyebrow", e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Заголовок
                <input
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.heroTitle}
                  onChange={(e) => setLocaleField(loc, "heroTitle", e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Акцентная строка (под заголовком, бирюзой)
                <input
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.heroAccent}
                  onChange={(e) => setLocaleField(loc, "heroAccent", e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Описание
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.heroDescription}
                  onChange={(e) => setLocaleField(loc, "heroDescription", e.target.value)}
                />
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="block text-sm">
                  Кнопка «каталог»
                  <input
                    className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                    value={block.heroPrimaryCta}
                    onChange={(e) => setLocaleField(loc, "heroPrimaryCta", e.target.value)}
                  />
                </label>
                <label className="block text-sm">
                  Кнопка WhatsApp
                  <input
                    className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                    value={block.heroSecondaryCta}
                    onChange={(e) => setLocaleField(loc, "heroSecondaryCta", e.target.value)}
                  />
                </label>
              </div>
              <div>
                <p className="text-sm font-medium text-chocolate/80">Три факта под кнопками</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {[0, 1, 2].map((i) => (
                    <input
                      key={i}
                      className="w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                      value={block.heroQuickFacts[i] ?? ""}
                      onChange={(e) => {
                        const next = [0, 1, 2].map((j) => block.heroQuickFacts[j] ?? "");
                        next[i] = e.target.value;
                        setLocaleField(loc, "heroQuickFacts", next);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-turquoise/20 bg-white/40 p-4">
            <h3 className="text-sm font-semibold text-chocolate">Hero — правая карточка</h3>
            <div className="mt-3 grid gap-3">
              <label className="block text-sm">
                Бейдж в углу
                <input
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.heroBadge}
                  onChange={(e) => setLocaleField(loc, "heroBadge", e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Надзаголовок карточки
                <input
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.heroCardEyebrow}
                  onChange={(e) => setLocaleField(loc, "heroCardEyebrow", e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Заголовок карточки
                <input
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.heroTitleCard}
                  onChange={(e) => setLocaleField(loc, "heroTitleCard", e.target.value)}
                />
              </label>
              <div>
                <p className="text-sm font-medium text-chocolate/80">Три подписи к фактам (колонки)</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {[0, 1, 2].map((i) => (
                    <input
                      key={i}
                      className="w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                      value={block.heroFactLabels[i] ?? ""}
                      onChange={(e) => patchTriple("heroFactLabels", i, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-chocolate/80">Три значения фактов</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {[0, 1, 2].map((i) => (
                    <input
                      key={i}
                      className="w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                      value={block.heroFacts[i] ?? ""}
                      onChange={(e) => patchTriple("heroFacts", i, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <SiteSettingsHomeBlocks loc={loc} block={block} setLocaleField={setLocaleField} />

          <div className="rounded-xl border border-chocolate/15 bg-sand/30 p-4">
            <h3 className="text-sm font-semibold text-chocolate">Блок доставки на главной — три короткие строки</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <textarea
                  key={i}
                  rows={2}
                  className="w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                  value={block.deliveryFacts[i] ?? ""}
                  onChange={(e) => patchTriple("deliveryFacts", i, e.target.value)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-chocolate/15 bg-sand/30 p-4">
            <h3 className="text-sm font-semibold text-chocolate">FAQ</h3>
            <div className="mt-3 grid gap-3">
              <label className="block text-sm">
                Надзаголовок
                <input
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.faqEyebrow}
                  onChange={(e) => setLocaleField(loc, "faqEyebrow", e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Заголовок
                <input
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.faqTitle}
                  onChange={(e) => setLocaleField(loc, "faqTitle", e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Описание секции
                <textarea
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2"
                  value={block.faqDescription}
                  onChange={(e) => setLocaleField(loc, "faqDescription", e.target.value)}
                />
              </label>
            </div>
            <div className="mt-4 space-y-4">
              {block.faqItems.map((item, i) => (
                <div key={i} className="rounded-xl border border-chocolate/10 bg-white p-3">
                  <label className="block text-sm">
                    Вопрос
                    <input
                      className="mt-1 w-full rounded-lg border border-chocolate/15 px-3 py-2 text-sm"
                      value={item.question}
                      onChange={(e) => {
                        const next = block.faqItems.map((row, j) => (j === i ? { ...row, question: e.target.value } : row));
                        setLocaleField(loc, "faqItems", next);
                      }}
                    />
                  </label>
                  <label className="mt-2 block text-sm">
                    Ответ
                    <textarea
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-chocolate/15 px-3 py-2 text-sm"
                      value={item.answer}
                      onChange={(e) => {
                        const next = block.faqItems.map((row, j) => (j === i ? { ...row, answer: e.target.value } : row));
                        setLocaleField(loc, "faqItems", next);
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="mt-2 text-xs font-semibold text-red-700 hover:underline"
                    onClick={() => setLocaleField(loc, "faqItems", block.faqItems.filter((_, j) => j !== i))}
                  >
                    Удалить вопрос
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="rounded-full border border-chocolate/20 bg-white px-4 py-2 text-sm font-semibold text-chocolate hover:border-turquoise"
                onClick={() => setLocaleField(loc, "faqItems", [...block.faqItems, { question: "", answer: "" }])}
              >
                + Добавить вопрос
              </button>
            </div>
          </div>

          <label className="block text-sm">
            <span className="font-medium text-chocolate/80">Блок «О нас» — абзацы (пустая строка между абзацами)</span>
            <textarea
              rows={8}
              className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-chocolate"
              value={block.aboutText.join("\n\n")}
              onChange={(e) =>
                setLocaleField(
                  loc,
                  "aboutText",
                  e.target.value
                    .split(/\n\s*\n/)
                    .map((s) => s.trim())
                    .filter(Boolean),
                )
              }
            />
          </label>
        </div>
      </section>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="rounded-full bg-inkBlue px-6 py-2.5 text-sm font-semibold text-milk hover:bg-turquoise disabled:opacity-60"
        >
          {saving ? "Сохранение…" : "Сохранить на сайт"}
        </button>
        <p className="text-sm text-chocolate/60">Страницы с `force-dynamic` подхватят изменения без пересборки.</p>
      </div>
    </div>
  );
}
