import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";
import { getDictionary, type Locale } from "@/i18n/dictionary";

export default function RubikStudioPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const suffix = locale === "zh" ? "CN" : "EN";

  return (
    <main className="relative min-h-screen bg-white">
      <div className="fixed left-4 right-4 top-4 z-10 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
        <Link
          href={locale === "zh" ? "/zh" : "/"}
          aria-label={dictionary.shared.workspace}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </Link>
        <div className="rounded-full bg-white/95 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.35)]">
          <LanguageSwitcher locale={locale} label={dictionary.shared.languageName} />
        </div>
      </div>
      <ResponsiveProjectImage
        src={`/assets/images/rubik-studio/rubikstudio_${suffix}-display.webp`}
        mobileSrc={`/assets/images/rubik-studio/rubikstudio_${suffix}-mobile.webp`}
        alt={locale === "zh" ? "Rubik Studio 项目长图" : "Rubik Studio project overview"}
        width={736}
        height={2138}
        priority
        className="h-auto w-full"
      />
    </main>
  );
}
