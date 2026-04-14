"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  imageUrl: string;
  onImageUrl: (url: string) => void;
};

export function ProductImageUpload({ imageUrl, onImageUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const skipSuccessResetRef = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewFailed, setPreviewFailed] = useState(false);

  const trimmed = imageUrl.trim();
  const showPreview = trimmed.length > 0;

  useEffect(() => {
    setPreviewFailed(false);
  }, [trimmed]);

  /** Ручное изменение URL в поле формы — убираем зелёное «загружено», чтобы не путать с текущим значением */
  useEffect(() => {
    if (skipSuccessResetRef.current) {
      skipSuccessResetRef.current = false;
      return;
    }
    setSuccess(null);
  }, [trimmed]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setSuccess(null);
    setPending(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) {
        setError(typeof j.error === "string" ? j.error : "Не удалось загрузить файл. Проверьте формат и размер (до 5 МБ).");
        return;
      }
      if (typeof j.url === "string") {
        skipSuccessResetRef.current = true;
        onImageUrl(j.url);
        setSuccess("Фото загружено в хранилище. Нажмите «Сохранить» внизу страницы, чтобы показать его на сайте.");
      }
    } finally {
      setPending(false);
    }
  }

  function clearImage() {
    setError(null);
    setSuccess(null);
    onImageUrl("");
  }

  function openPicker() {
    setError(null);
    inputRef.current?.click();
  }

  return (
    <div className="rounded-2xl border border-dashed border-chocolate/25 bg-white/50 p-4">
      <p className="text-sm font-medium text-chocolate/85">Фото товара</p>
      <p className="mt-1 text-xs leading-relaxed text-chocolate/60">
        Подойдут файлы <strong>JPEG, PNG, WebP или GIF</strong>, до <strong>5 МБ</strong>. На продакшене (Vercel) нужен токен{" "}
        <code className="rounded bg-chocolate/5 px-1">BLOB_READ_WRITE_TOKEN</code> — без него загрузка недоступна; тогда можно вставить готовый URL
        ниже (например ссылку на картинку с другого хостинга).
      </p>

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => void onPick(e)} />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className={`relative flex min-h-[160px] w-full max-w-[280px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-chocolate/15 bg-[linear-gradient(180deg,#fbf5ea,#ead9b9)] ${
            pending ? "opacity-70" : ""
          }`}
        >
          {pending ? (
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-inkBlue/30 border-t-inkBlue" aria-hidden />
              <span className="text-xs font-medium text-chocolate/75">Загрузка…</span>
            </div>
          ) : showPreview && !previewFailed ? (
            // eslint-disable-next-line @next/next/no-img-element -- админка: произвольные URL (Blob, CDN, /public)
            <img
              src={trimmed}
              alt=""
              className="max-h-52 w-full object-contain"
              onError={() => setPreviewFailed(true)}
            />
          ) : (
            <p className="px-4 text-center text-xs text-chocolate/50">
              {previewFailed ? "Не удалось показать превью — проверьте URL или загрузите файл заново." : "Превью появится после загрузки или когда в поле URL будет рабочая ссылка."}
            </p>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => openPicker()}
              className="rounded-full border border-chocolate/20 bg-white px-4 py-2 text-sm font-semibold text-chocolate hover:border-turquoise disabled:opacity-60"
            >
              {pending ? "Загрузка…" : showPreview ? "Заменить фото" : "Загрузить с компьютера"}
            </button>
            {showPreview ? (
              <button
                type="button"
                disabled={pending}
                onClick={() => clearImage()}
                className="rounded-full border border-chocolate/15 px-4 py-2 text-sm font-semibold text-chocolate/75 hover:border-red-300 hover:text-red-800 disabled:opacity-60"
              >
                Убрать фото
              </button>
            ) : null}
          </div>

          {trimmed ? (
            <p className="break-all font-mono text-[11px] leading-snug text-inkBlue/90" title={trimmed}>
              {trimmed}
            </p>
          ) : null}

          {success ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50/90 px-3 py-2 text-xs text-emerald-900" role="status">
              {success}
            </p>
          ) : null}
          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-900" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
