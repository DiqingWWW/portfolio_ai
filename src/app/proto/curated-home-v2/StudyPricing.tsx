"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/i18n/dictionary";
import content from "@content/prototypes/fabrica-study.json";
import styles from "./fabrica.module.css";

export default function StudyPricing({ locale }: { locale: Locale }) {
  const [period, setPeriod] = useState(0);
  const copy = content[locale];
  return <div className={styles.pricing} data-fabrica-reveal>
    <div className={styles.periods} role="group" aria-label={copy.pricing}>{copy.periods.map((label, index) => <button type="button" key={label} aria-pressed={index === period} onClick={() => setPeriod(index)}>{label}</button>)}</div>
    <div className={styles.priceBody} aria-live="polite">
      <div><span>{copy.placeholder}</span><strong>—</strong><p>{copy.periods[period]}</p></div>
      <div>
        <h3>{copy.priceNote}</h3>
        <p>{copy.priceIntro}</p>
        <ul className={styles.priceFeatures}>{copy.priceFeatures.map(feature => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul>
        <div className={styles.delivery}><span>{copy.delivery}</span><strong>{copy.deliveryValue}</strong></div>
      </div>
    </div>
  </div>;
}
