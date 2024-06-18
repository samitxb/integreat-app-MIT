// \faq\page.tsx - Allgemeine Übersicht

// Import von Next.js-Komponenten und -Bibliotheken
import React, { useState, useEffect, Suspense } from "react";

// Import benutzerdefinierter Komponenten
import Loading from '../components/loading';
import { Locale } from '../../../../i18n-config';

import QuestionsPage from './QuestionPage';
import { getDictionary } from '@/app/utils/i18n';

interface QuestionsPageProps {
    params: {
        lang: Locale;
    };
}

const Questions = async ({ params }: QuestionsPageProps) => {
    const lang = params.lang
    const dictionary = await getDictionary(lang);

    return (
        <Suspense fallback={<Loading />}>
            <QuestionsPage params={{
                lang: lang,
                dictionary: dictionary
            }}></QuestionsPage>
        </Suspense>
    );
};

// Export der Hauptkomponente
export default Questions;

