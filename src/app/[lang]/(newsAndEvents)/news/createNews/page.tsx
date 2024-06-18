// \news\createNews\page.tsx - zum Erstellen von News
import { Suspense } from "react";

import Loading from "@/app/[lang]/components/loading";
import { Locale } from "../../../../../../i18n-config";
import { getDictionary } from "@/app/utils/i18n";

import CreateNewsPage from "./CreateNews";

// Props für die Komponente
interface CreateNewsPageProps {
    params: {
        lang: Locale;
    };
}

// Server-Komponente, um News zu erstellen. Übergibt Dictionary
const CreateNews = async ({ params }: CreateNewsPageProps) => {
    const lang = params.lang
    const dictionary = await getDictionary(lang);

    return (
        <Suspense fallback={<Loading />}>
            <CreateNewsPage lang={lang} dictionary={dictionary} />
        </Suspense>
    );
};

// Export der Hauptkomponente
export default CreateNews;
