// \dailylife\[articleID]\page.tsx
import { Suspense } from 'react';
import { Locale } from '../../../../../i18n-config';
import ArticlePage from './ArticlePage';
import { getDictionary } from '@/app/utils/i18n';
import Loading from '../../components/loading';

// Definiert Props
interface ArticlePageProps {
    params: {
        lang: Locale;
        articleID: string;
    };
}

// Serverseitige Komponente, um Dictionary und ArtikelID zu Übergeben
const Article = async ({ params }: ArticlePageProps) => {
    const { lang, articleID } = params;
    const dictionary = await getDictionary(lang)

    return (
        <Suspense fallback={<Loading />}>
            <ArticlePage dictionary={dictionary} lang={lang} articleID={articleID} />
        </Suspense>
    );
};

export default Article;
