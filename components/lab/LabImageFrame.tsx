"use client";

import Image from "next/image";
import { useState } from "react";

export function LabImageFrame({
  src,
  alt,
  sizes,
  priority = false,
  imageClassName = "",
  wrapperClassName = "",
  fallbackTitle,
  fallbackHint,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  imageClassName?: string;
  wrapperClassName?: string;
  fallbackTitle: string;
  fallbackHint: string;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {failed || !src ? (
        <div className="flex h-full w-full flex-col justify-end bg-cover/35 p-4">
          <p className="font-serif text-lg font-medium text-ink">{fallbackTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{fallbackHint}</p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized
          className={imageClassName}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
