"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/dictionary";
import { localizeCatalogue, translateCatalogue } from "./catalogue-locales";

export const CatalogueLocale = createContext<Locale>("zh");
export function useCatalogue() {
  const locale = useContext(CatalogueLocale);
  return { locale, t: (text: string) => translateCatalogue(text, locale), localize: <T,>(value: T) => localizeCatalogue(value, locale) };
}
