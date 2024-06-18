// \dailylife\editorPage\[articleID]\page.tsx - Bearbeitungsseite 

import Loading from '@/app/[lang]/components/loading';
import { Suspense } from 'react';

import { Locale } from '../../../../../../i18n-config';
import { getDictionary } from '@/app/utils/i18n';

import EditorPage from './EditorPage';

// Definiert Props
interface ArticleEditorProps {
  params: {
    lang: Locale;
    articleID: string;
  };
}

// Serverseitige Komponente, um Dictionary zu Übergeben
const ArticleEditor = async ({ params }: ArticleEditorProps) => {
  const { lang, articleID } = params;
  const dictionary = await getDictionary(lang);

  return (
    <Suspense fallback={<Loading />}>
      <EditorPage dictionary={dictionary} lang={lang} articleId={articleID} />
    </Suspense>
  )

};

export default ArticleEditor;


