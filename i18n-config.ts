/** @type {import('next-i18next').UserConfig} */
export const i18n = {
    locales: ["en", "de"], // Add the locales you want to support
    defaultLocale: "de", // Set the default locale
};

export type Locale = (typeof i18n)["locales"][number];
