import { caseStudyTokens } from "@/app/proto/design-system-directions/deethin-system-v2/case-study.registry";
import { homeSourceTokens } from "@/app/proto/design-system-directions/deethin-system-v2/home-source.registry";
import { homepageTokens } from "./homepage.registry";
import { homepageObservedTokens } from "./homepage-observed";

/** Single executable token object for the live homepage, Portfolio candidate and DS specimens/export. */
export const portfolioTokens = { ...caseStudyTokens, ...homeSourceTokens, ...homepageTokens, ...homepageObservedTokens } as const;
export { homepageBreakpoints, homepageMotion, homepagePatterns } from "./homepage.registry";
