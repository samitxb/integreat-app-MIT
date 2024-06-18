import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "./components/footer";

import dynamic from "next/dynamic";

import { i18n } from "../../../i18n-config";
import { getDictionary } from "../utils/i18n";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ["latin"] });

const DynamicHeader = dynamic(() => import("./components/Header/header"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Integreat",
  description: "Testapp",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: Array<React.ReactNode>;
  params: { lang: string };
}) {
  const lang = params.lang
  const dictionary = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body className="font-saira text-sm no-scrollbar">
        {/* Hier wird der Header auf jeder Seite angezeigt */}        
          <DynamicHeader lang={lang} dictionary={dictionary}/>

        {/* Der eigentliche Inhalt der Seite style={{ marginTop: 25, marginBottom: 115 }}*/}
        <main className="mt-6 mb-24 md:mb-32">
          {children}
        </main>

        {/* Hier wird der Footer auf jeder Seite angezeigt */}
        <Footer lang={lang} dictionary={dictionary}/>
      </body>
    </html>
  );
}
