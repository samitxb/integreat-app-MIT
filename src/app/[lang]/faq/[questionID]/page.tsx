// \faq\[questionID]\page.tsx - Seite für eine bestimmte Frage
import React from 'react';


import QuestionDetailPage from './QuestionDetail';
import { Locale } from '../../../../../i18n-config';
import { getDictionary } from '@/app/utils/i18n';

interface ArticleEditorProps {
    params: {
        lang: Locale;
        questionID: string;
    };
}

const QuestionDetail = async ({ params }: ArticleEditorProps) => {
    const { lang, questionID } = params;
    const dictionary = await getDictionary(lang);
    return (
        <QuestionDetailPage dictionary={dictionary} lang={lang} questionID={questionID}></QuestionDetailPage>
    );
};

export default QuestionDetail;
