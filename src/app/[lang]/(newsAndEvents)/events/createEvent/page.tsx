// \events\createEvent\page.tsx - Seite um Veranstaltungen zu Erstellen
import { Suspense } from "react";

import Loading from "@/app/[lang]/components/loading";
import { Locale } from "../../../../../../i18n-config";
import { getDictionary } from "@/app/utils/i18n";

import CreateEventPage from "./CreateEvent";

// Props für die Komponente
interface QuestionsPageProps {
    params: {
        lang: Locale;
    };
}

// Server-Komponente, um Events zu erstellen. Übergibt dictionary
const CreateEvent = async ({ params }: QuestionsPageProps) => {
    const lang = params.lang
    const dictionary = await getDictionary(lang);

    return (
        <Suspense fallback={<Loading />}>
            <CreateEventPage lang={lang} dictionary={dictionary} />
        </Suspense>
    );
};

// Export der Hauptkomponente
export default CreateEvent;
