import { cache } from "react";
import { LandingPage } from "@/types/pages/landing";

// Use React.cache for request deduplication - prevents duplicate imports
// when getLandingPage is called from both layout.tsx and page.tsx
export const getLandingPage = cache(async function getLandingPage(
  locale: string
): Promise<LandingPage> {
  try {
    const normalizedLocale = locale === "zh-CN" ? "zh" : locale.toLowerCase();
    return await import(
      `@/i18n/pages/landing/${normalizedLocale}.json`
    ).then((module) => module.default);
  } catch (error) {
    console.warn(`Failed to load ${locale}.json, falling back to en.json`);
    return await import("@/i18n/pages/landing/en.json").then(
      (module) => module.default as LandingPage
    );
  }
});
