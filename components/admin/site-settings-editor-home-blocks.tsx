"use client";

import { ProductImageUpload } from "@/components/admin/product-image-upload";
import type { Locale } from "@/lib/i18n";
import type { LocaleSettingsBlock, SiteSettingsPayload } from "@/lib/site-settings-schema";

type SetLocaleField = <L extends keyof LocaleSettingsBlock>(
  locale: Locale,
  key: L,
  value: SiteSettingsPayload["locales"][Locale][L],
) => void;

type Props = {
  loc: Locale;
  block: LocaleSettingsBlock;
  setLocaleField: SetLocaleField;
};

export function SiteSettingsHomeBlocks({ loc, block, setLocaleField }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-inkBlue/20 bg-white/50 p-4">
        <h3 className="text-sm font-semibold text-chocolate">Hero — фото справа</h3>
        <p className="mt-1 text-xs text-chocolate/55">Путь в /public или URL после загрузки (как у товаров).</p>
        <label className="mt-3 block text-sm">
          Alt для изображения
          <input
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
            value={block.heroImageAlt}
            onChange={(e) => setLocaleField(loc, "heroImageAlt", e.target.value)}
          />
        </label>
        <label className="mt-2 block text-sm">
          URL изображения
          <input
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 font-mono text-sm"
            value={block.heroImageUrl}
            onChange={(e) => setLocaleField(loc, "heroImageUrl", e.target.value)}
            placeholder="/images/hero/hero-cake.jpg"
          />
        </label>
        <div className="mt-3">
          <ProductImageUpload imageUrl={block.heroImageUrl} onImageUrl={(url) => setLocaleField(loc, "heroImageUrl", url)} />
        </div>
      </div>

      <div className="rounded-xl border border-chocolate/15 bg-sand/25 p-4">
        <h3 className="text-sm font-semibold text-chocolate">Секция «Популярное»</h3>
        <div className="mt-3 grid gap-3">
          <Field label="Надзаголовок" value={block.featuredEyebrow} onChange={(v) => setLocaleField(loc, "featuredEyebrow", v)} />
          <Field label="Заголовок" value={block.featuredTitle} onChange={(v) => setLocaleField(loc, "featuredTitle", v)} />
          <Field label="Описание" value={block.featuredDescription} onChange={(v) => setLocaleField(loc, "featuredDescription", v)} textarea rows={2} />
          <Field label="Ссылка «в каталоге»" value={block.viewCatalog} onChange={(v) => setLocaleField(loc, "viewCatalog", v)} />
        </div>
      </div>

      <div className="rounded-xl border border-chocolate/15 bg-sand/25 p-4">
        <h3 className="text-sm font-semibold text-chocolate">Торты на заказ</h3>
        <div className="mt-3 grid gap-3">
          <Field label="Надзаголовок" value={block.customEyebrow} onChange={(v) => setLocaleField(loc, "customEyebrow", v)} />
          <Field label="Заголовок" value={block.customTitle} onChange={(v) => setLocaleField(loc, "customTitle", v)} />
          <Field label="Описание" value={block.customDescription} onChange={(v) => setLocaleField(loc, "customDescription", v)} textarea rows={2} />
          <Field label="Форма — надзаголовок" value={block.customFormEyebrow} onChange={(v) => setLocaleField(loc, "customFormEyebrow", v)} />
          <Field label="Форма — заголовок" value={block.customFormTitle} onChange={(v) => setLocaleField(loc, "customFormTitle", v)} />
          <p className="text-sm font-medium text-chocolate/80">Плитки справа (4 подписи)</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                className="rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                value={block.customCakeHighlights[i] ?? ""}
                onChange={(e) => {
                  const next = [0, 1, 2, 3].map((j) => block.customCakeHighlights[j] ?? "");
                  next[i] = e.target.value;
                  setLocaleField(loc, "customCakeHighlights", next);
                }}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-chocolate/80">Поля формы (по одному на строку в карточке)</p>
          <div className="space-y-2">
            {block.customFormFields.map((line, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="flex-1 rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                  value={line}
                  onChange={(e) => {
                    const next = [...block.customFormFields];
                    next[i] = e.target.value;
                    setLocaleField(loc, "customFormFields", next);
                  }}
                />
                <button
                  type="button"
                  className="text-xs text-red-700"
                  onClick={() => setLocaleField(loc, "customFormFields", block.customFormFields.filter((_, j) => j !== i))}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-sm font-semibold text-turquoise"
              onClick={() => setLocaleField(loc, "customFormFields", [...block.customFormFields, ""])}
            >
              + строка
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Кнопка «форма»" value={block.openForm} onChange={(v) => setLocaleField(loc, "openForm", v)} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-chocolate/15 bg-sand/25 p-4">
        <h3 className="text-sm font-semibold text-chocolate">Преимущества</h3>
        <div className="mt-3 grid gap-3">
          <Field label="Надзаголовок" value={block.benefitsEyebrow} onChange={(v) => setLocaleField(loc, "benefitsEyebrow", v)} />
          <Field label="Заголовок" value={block.benefitsTitle} onChange={(v) => setLocaleField(loc, "benefitsTitle", v)} />
          <Field label="Описание" value={block.benefitsDescription} onChange={(v) => setLocaleField(loc, "benefitsDescription", v)} textarea rows={2} />
        </div>
        <div className="mt-4 space-y-2">
          {block.benefits.map((b, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="flex-1 rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
                value={b}
                onChange={(e) => {
                  const next = [...block.benefits];
                  next[i] = e.target.value;
                  setLocaleField(loc, "benefits", next);
                }}
              />
              <button type="button" className="text-xs text-red-700" onClick={() => setLocaleField(loc, "benefits", block.benefits.filter((_, j) => j !== i))}>
                удалить
              </button>
            </div>
          ))}
          <button type="button" className="text-sm font-semibold text-turquoise" onClick={() => setLocaleField(loc, "benefits", [...block.benefits, ""])}>
            + преимущество
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-chocolate/15 bg-sand/25 p-4">
        <h3 className="text-sm font-semibold text-chocolate">Как заказать</h3>
        <div className="mt-3 grid gap-3">
          <Field label="Надзаголовок" value={block.howOrderEyebrow} onChange={(v) => setLocaleField(loc, "howOrderEyebrow", v)} />
          <Field label="Заголовок" value={block.howOrderTitle} onChange={(v) => setLocaleField(loc, "howOrderTitle", v)} />
          <Field label="Описание" value={block.howOrderDescription} onChange={(v) => setLocaleField(loc, "howOrderDescription", v)} textarea rows={2} />
        </div>
        <div className="mt-4 space-y-4">
          {block.howOrderSteps.map((step, i) => (
            <div key={i} className="rounded-xl border border-chocolate/10 bg-white p-3">
              <Field label="Заголовок шага" value={step.title} onChange={(v) => {
                const next = block.howOrderSteps.map((s, j) => (j === i ? { ...s, title: v } : s));
                setLocaleField(loc, "howOrderSteps", next);
              }} />
              <label className="mt-2 block text-sm">
                Текст
                <textarea
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-chocolate/15 px-3 py-2 text-sm"
                  value={step.description}
                  onChange={(e) => {
                    const next = block.howOrderSteps.map((s, j) => (j === i ? { ...s, description: e.target.value } : s));
                    setLocaleField(loc, "howOrderSteps", next);
                  }}
                />
              </label>
              <button
                type="button"
                className="mt-2 text-xs text-red-700"
                onClick={() => setLocaleField(loc, "howOrderSteps", block.howOrderSteps.filter((_, j) => j !== i))}
              >
                Удалить шаг
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-full border border-chocolate/20 px-4 py-2 text-sm font-semibold"
            onClick={() => setLocaleField(loc, "howOrderSteps", [...block.howOrderSteps, { title: "", description: "" }])}
          >
            + шаг
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-chocolate/15 bg-sand/25 p-4">
        <h3 className="text-sm font-semibold text-chocolate">Доставка (секция на главной)</h3>
        <div className="mt-3 grid gap-3">
          <Field label="Надзаголовок" value={block.deliveryEyebrow} onChange={(v) => setLocaleField(loc, "deliveryEyebrow", v)} />
          <Field label="Заголовок" value={block.deliveryTitle} onChange={(v) => setLocaleField(loc, "deliveryTitle", v)} />
          <Field label="Описание" value={block.deliveryDescription} onChange={(v) => setLocaleField(loc, "deliveryDescription", v)} textarea rows={2} />
        </div>
        <p className="mt-4 text-sm font-medium text-chocolate/80">Карточки с иконками (под серыми фактами)</p>
        <div className="mt-2 space-y-3">
          {block.deliveryItems.map((row, i) => (
            <div key={i} className="grid gap-2 rounded-xl border border-chocolate/10 bg-white p-3 sm:grid-cols-3">
              <input
                className="rounded-lg border border-chocolate/15 px-2 py-1 text-sm"
                placeholder="Подпись"
                value={row.label}
                onChange={(e) => {
                  const next = [...block.deliveryItems];
                  next[i] = { ...next[i], label: e.target.value };
                  setLocaleField(loc, "deliveryItems", next);
                }}
              />
              <input
                className="rounded-lg border border-chocolate/15 px-2 py-1 text-sm"
                placeholder="Значение"
                value={row.value}
                onChange={(e) => {
                  const next = [...block.deliveryItems];
                  next[i] = { ...next[i], value: e.target.value };
                  setLocaleField(loc, "deliveryItems", next);
                }}
              />
              <input
                className="rounded-lg border border-chocolate/15 px-2 py-1 text-sm font-mono"
                placeholder="Иконка (символ)"
                value={row.icon}
                onChange={(e) => {
                  const next = [...block.deliveryItems];
                  next[i] = { ...next[i], icon: e.target.value };
                  setLocaleField(loc, "deliveryItems", next);
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3">
          <Field label="Панель справа — надзаголовок" value={block.deliveryPanelEyebrow} onChange={(v) => setLocaleField(loc, "deliveryPanelEyebrow", v)} />
          <Field label="Панель — заголовок" value={block.deliveryPanelTitle} onChange={(v) => setLocaleField(loc, "deliveryPanelTitle", v)} />
          <Field label="Панель — описание" value={block.deliveryPanelDescription} onChange={(v) => setLocaleField(loc, "deliveryPanelDescription", v)} textarea rows={2} />
          <Field label="Текст кнопки «Доставка»" value={block.deliveryPageEyebrow} onChange={(v) => setLocaleField(loc, "deliveryPageEyebrow", v)} />
        </div>
      </div>

      <div className="rounded-xl border border-chocolate/15 bg-sand/25 p-4">
        <h3 className="text-sm font-semibold text-chocolate">Отзывы</h3>
        <div className="mt-3 grid gap-3">
          <Field label="Надзаголовок" value={block.reviewsEyebrow} onChange={(v) => setLocaleField(loc, "reviewsEyebrow", v)} />
          <Field label="Заголовок" value={block.reviewsTitle} onChange={(v) => setLocaleField(loc, "reviewsTitle", v)} />
          <Field label="Описание" value={block.reviewsDescription} onChange={(v) => setLocaleField(loc, "reviewsDescription", v)} textarea rows={2} />
        </div>
        <div className="mt-4 space-y-4">
          {block.reviews.map((rev, i) => (
            <div key={i} className="rounded-xl border border-chocolate/10 bg-white p-3">
              <label className="block text-sm">
                Цитата
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-chocolate/15 px-3 py-2 text-sm"
                  value={rev.quote}
                  onChange={(e) => {
                    const next = block.reviews.map((r, j) => (j === i ? { ...r, quote: e.target.value } : r));
                    setLocaleField(loc, "reviews", next);
                  }}
                />
              </label>
              <label className="mt-2 block text-sm">
                Автор
                <input
                  className="mt-1 w-full rounded-lg border border-chocolate/15 px-3 py-2 text-sm"
                  value={rev.author}
                  onChange={(e) => {
                    const next = block.reviews.map((r, j) => (j === i ? { ...r, author: e.target.value } : r));
                    setLocaleField(loc, "reviews", next);
                  }}
                />
              </label>
              <button type="button" className="mt-2 text-xs text-red-700" onClick={() => setLocaleField(loc, "reviews", block.reviews.filter((_, j) => j !== i))}>
                Удалить
              </button>
            </div>
          ))}
          <button type="button" className="rounded-full border px-4 py-2 text-sm font-semibold" onClick={() => setLocaleField(loc, "reviews", [...block.reviews, { quote: "", author: "" }])}>
            + отзыв
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-chocolate/15 bg-sand/25 p-4">
        <h3 className="text-sm font-semibold text-chocolate">О нас — галерея (слева)</h3>
        <div className="mt-3 grid gap-3">
          <Field label="Надзаголовок секции" value={block.aboutEyebrow} onChange={(v) => setLocaleField(loc, "aboutEyebrow", v)} />
          <Field label="Заголовок" value={block.aboutTitle} onChange={(v) => setLocaleField(loc, "aboutTitle", v)} />
          <Field label="Описание" value={block.aboutDescription} onChange={(v) => setLocaleField(loc, "aboutDescription", v)} textarea rows={2} />
        </div>
        <div className="mt-4 space-y-4">
          {block.aboutGallery.map((g, i) => (
            <div key={i} className="rounded-xl border border-chocolate/10 bg-white p-3">
              <label className="block text-sm">
                Подпись
                <input
                  className="mt-1 w-full rounded-lg border border-chocolate/15 px-3 py-2 text-sm"
                  value={g.title}
                  onChange={(e) => {
                    const next = block.aboutGallery.map((x, j) => (j === i ? { ...x, title: e.target.value } : x));
                    setLocaleField(loc, "aboutGallery", next);
                  }}
                />
              </label>
              <label className="mt-2 block text-sm">
                URL картинки
                <input
                  className="mt-1 w-full rounded-lg border border-chocolate/15 px-3 py-2 font-mono text-xs"
                  value={g.image}
                  onChange={(e) => {
                    const next = block.aboutGallery.map((x, j) => (j === i ? { ...x, image: e.target.value } : x));
                    setLocaleField(loc, "aboutGallery", next);
                  }}
                />
              </label>
              <div className="mt-2">
                <ProductImageUpload
                  imageUrl={g.image}
                  onImageUrl={(url) => {
                    const next = block.aboutGallery.map((x, j) => (j === i ? { ...x, image: url } : x));
                    setLocaleField(loc, "aboutGallery", next);
                  }}
                />
              </div>
              <label className="mt-2 block text-sm">
                Alt
                <input
                  className="mt-1 w-full rounded-lg border border-chocolate/15 px-3 py-2 text-sm"
                  value={g.imageAlt}
                  onChange={(e) => {
                    const next = block.aboutGallery.map((x, j) => (j === i ? { ...x, imageAlt: e.target.value } : x));
                    setLocaleField(loc, "aboutGallery", next);
                  }}
                />
              </label>
              <button type="button" className="mt-2 text-xs text-red-700" onClick={() => setLocaleField(loc, "aboutGallery", block.aboutGallery.filter((_, j) => j !== i))}>
                Удалить карточку
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-full border px-4 py-2 text-sm font-semibold"
            onClick={() => setLocaleField(loc, "aboutGallery", [...block.aboutGallery, { title: "", image: "", imageAlt: "" }])}
          >
            + карточка галереи
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          Подпись цены «от»
          <input
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
            value={block.priceFromLabel}
            onChange={(e) => setLocaleField(loc, "priceFromLabel", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Кнопка «Связаться» (общая)
          <input
            className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-sm"
            value={block.contactCta}
            onChange={(e) => setLocaleField(loc, "contactCta", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <label className="block text-sm">
      {label}
      {textarea ? (
        <textarea rows={rows} className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
