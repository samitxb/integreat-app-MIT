// \news\page.tsx
import React, { Suspense } from "react";

import Loading from "../../components/loading";
import { Locale } from "../../../../../i18n-config";
import { getDictionary } from "@/app/utils/i18n";
import NewsPage from "./NewsPage";

// Definiert Props
interface NewsPageProps {
  params: {
    lang: Locale;
  };
}

// Serverseitige Komponente, um Dictionary zu Übergeben
const News = async ({ params }: NewsPageProps) => {
  const lang = params.lang
  const dictionary = await getDictionary(lang);

  return (
    <Suspense fallback={<Loading />}>
      <NewsPage lang={lang} dictionary={dictionary} />
    </Suspense>
  );
};

export default News;

