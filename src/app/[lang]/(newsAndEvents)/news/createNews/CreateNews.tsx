// \news\createNews\CreateNews.tsx - Seite um News zu erstellen
'use client'
import { Locale } from "../../../../../../i18n-config";
import NewNewsForm from "./newNewsForm";

// CreateNewsPage Props
interface NewsCreatePageProps {
    lang: Locale;
    dictionary: any;
}

// Komponente um eine News zu erstellen
const CreateNewsPage = ({ lang, dictionary }: NewsCreatePageProps) => {
    /**
    * Funktion: Handle das Erstellen einer neuen News
    * @param title - Titel der News
    * @param content - Text der News
     */
    const handleCreateNews = async (title: string, content: string) => {
        try {
            const response = await fetch('/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                }),
            });

            if (response.ok) {
                // News erfolgreich erstellt, weiterleite an NewsSeite
                window.location.href = `/${lang}/news`;
            }
        } catch (error) {
            console.error('Fehler beim Erstellen der News:', error);
        }
    };

    return (
        <div className='text-center mt-10 mx-auto'>
            <h2 className='text-[28px] font-bold font-orator mb-4'>{dictionary.newNews}:</h2>
            {/* Formular für die Erstellung einer neuen News */}
            <NewNewsForm onSubmit={handleCreateNews} lang={lang} dictionary={dictionary} />
        </div>
    );
};

export default CreateNewsPage;