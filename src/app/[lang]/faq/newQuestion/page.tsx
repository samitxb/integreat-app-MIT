// \faq\newQuestion\page.tsx
import React from "react";

import { getDictionary } from '@/app/utils/i18n';
import { Locale } from '../../../../../i18n-config';

import NewQuestionsComponent from './newQuestionKomponent';

// Definiert Porps
interface NewQuestionPageProps {
  params: {
      lang: Locale;
    };
}

const QuestionsPage = async ({ params}: NewQuestionPageProps) => {
  const lang = params.lang
  const dictionary = await getDictionary(lang)

  return (
    <div>
      <NewQuestionsComponent dictionary={dictionary} lang={lang} />
    </div>
  );
};

// Export der Komponente
export default QuestionsPage;

