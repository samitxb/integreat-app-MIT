/**
 * This module code can be executed on client and server side.
 * Since the header component uses useState and as a consequence client-only,
 * this code must also run on client side.
 * Any disadvantages of this approach?
 * 1. When the language dictionaries get big, a lot of data is sent to the client
 */
// import "server-only";
import type { Locale } from "../../../i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries: any = {
  en: () =>
    import("@public/locales/en.json").then((module) => module.default),
  de: () =>
    import("@public/locales//de.json").then((module) => module.default),
};

// export const getDictionary = async (locale: Locale) =>

export const getDictionary = (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
