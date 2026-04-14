"use client";

import Image from "next/image";
import { useState } from "react";

type AssetImageProps = {
  src: string;
  alt: string;
  sizes: string;
  fallbackLabel?: string;
  className?: string;
  fallbackMode?: "label" | "silent" | "soft";
};

export function AssetImage({
  src,
  alt,
  sizes,
  fallbackLabel,
  className = "object-cover",
  fallbackMode = "soft",
}: AssetImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="relative h-full w-full rounded-[inherit] overflow-hidden bg-[linear-gradient(180deg,rgba(255,251,245,0.95),rgba(231,211,174,0.96))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,143,151,0.12),transparent_28%),linear-gradient(180deg,rgba(24,63,107,0.04),transparent_40%)]" />
        <div className="absolute inset-x-4 bottom-4 h-12 rounded-[18px] border border-white/45 bg-white/45" />
        {fallbackMode === "label" && fallbackLabel ? (
          <div className="relative z-10 flex h-full w-full items-end p-5">
            <div className="rounded-2xl bg-white/78 px-4 py-3 text-sm font-medium text-chocolate shadow-soft">
              {fallbackLabel}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return <Image src={src} alt={alt} fill sizes={sizes} className={className} onError={() => setHasError(true)} />;
}
