import type { Metadata } from "next";
import SystemPage from "./SystemPage";

export const metadata: Metadata = { title: "06 — Deethin Editorial System", description: "Proposed design system: source evidence, tokens, component states and motion.", robots: { index: false, follow: false } };
export default function Page() { return <SystemPage />; }
