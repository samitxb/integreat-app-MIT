// \dailylife\page.tsx
import React, { Suspense } from "react";

import DailylifePage from './DailylifePage';

import { getDictionary } from '@/app/utils/i18n';
import { Locale } from "../../../../i18n-config";
import Loading from "../components/loading";

// Serverseitige Komponente, um Dictionary zu Übergeben
const Dailylife = async ({ params: { lang } }: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang)

    return (
        <Suspense fallback={<Loading />}>
            <DailylifePage dictionary={dictionary} lang={lang} />;
        </Suspense>
    );
};

export default Dailylife;


