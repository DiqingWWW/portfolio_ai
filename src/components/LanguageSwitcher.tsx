"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/dictionary";

export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const switchLanguage = () => {
    const nextPath = locale === "zh"
      ? pathname.replace(/^\/zh(?=\/|$)/, "") || "/"
      : `/zh${pathname === "/" ? "" : pathname}`;
    const query = searchParams.toString();
    const hash = window.location.hash;
    router.push(`${nextPath}${query ? `?${query}` : ""}${hash}`);
  };

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className="inline-flex min-h-11 items-center rounded-lg px-3 font-mono text-xs font-bold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent"
    >
      {label}
    </button>
  );
}
