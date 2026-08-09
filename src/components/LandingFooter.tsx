import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NavigationContent } from "@/types/content";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.98 10.98 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path fill="currentColor" d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.4L6.47 22H3.35l7.27-8.31L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.72L8.46 4.05H6.61L17.8 19.84Z" />
  </svg>
);

const XiaohongshuIcon = () => (
  <span
    aria-hidden="true"
    className="h-4 w-11 bg-[#242526]"
    style={{
      maskImage: "url('/brand/xiaohongshu.svg')",
      maskPosition: "center",
      maskRepeat: "no-repeat",
      maskSize: "contain",
      WebkitMaskImage: "url('/brand/xiaohongshu.svg')",
      WebkitMaskPosition: "center",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
    }}
  />
);

const DesignSkillIcon = () => (
  <span aria-hidden="true" className="font-mono text-sm font-black leading-none">DS</span>
);

const iconByPlatform: Record<string, React.ComponentType> = {
  github: GithubIcon,
  x: XIcon,
  xiaohongshu: XiaohongshuIcon,
  "design-skill": DesignSkillIcon,
};

export default function LandingFooter({ content }: { content: NavigationContent["landingFooter"] }) {
  return (
    <footer id="contact" className="relative z-10 scroll-mt-11 overflow-hidden bg-workspace-bg text-[#242526] md:scroll-mt-0">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.45fr)_minmax(10rem,.55fr)_minmax(12rem,.65fr)] md:items-start md:gap-10 lg:gap-16">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#242526]/60">{content.eyebrow}</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#242526]">
              {content.heading}
            </h2>
          </div>

          <nav aria-label={content.navigationLabel}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#242526]/55">{content.navigationLabel}</p>
            <ul className="mt-5 space-y-1">
              {content.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex min-h-11 items-center gap-2 text-lg font-bold tracking-[-0.02em] underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242526]">
                    {item.label}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#242526]/55">{content.socialLabel}</p>
            <div className="mt-4 flex flex-wrap gap-1 text-[#242526]">
              {content.socials.map((social) => {
                const Icon = iconByPlatform[social.platform] ?? DesignSkillIcon;
                return (
                  <a key={social.platform} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.label} — opens in a new tab`} className="flex h-11 min-w-11 items-center justify-center px-2 text-[#242526] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#242526]">
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 font-mono text-[10px] leading-5 text-[#242526]/60 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p>© {new Date().getFullYear()} {content.copyright}</p>
          <p>Portfolio workspace / Shanghai</p>
        </div>
      </div>
    </footer>
  );
}
