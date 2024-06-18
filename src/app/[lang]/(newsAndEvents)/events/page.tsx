// \events\page.tsx - Allgemeine Übersicht
import React, { Suspense } from "react";

import { getDictionary } from '@/app/utils/i18n';
import Loading from "../../components/loading";
import { Locale } from "../../../../../i18n-config";
import EventsPage from "./EventsPage";

// Definiert Props
interface EventPageProps {
  params: {
    lang: Locale;
  };
}

// Serverseitige Komponente, um Dictionary zu Übergeben
const Events = async ({ params }: EventPageProps) => {
  const lang = params.lang
  const dictionary = await getDictionary(lang);

  return (
    <Suspense fallback={<Loading />}>
      <EventsPage lang={lang} dictionary={dictionary} />
    </Suspense>
  );
};

// Export der Hauptkomponente
export default Events;
