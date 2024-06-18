// \events\createEvent\CreateEvent.tsx - Seite um Veranstaltungen zu Erstellen
'use client'
import { Locale } from "../../../../../../i18n-config";
import { Suspense } from "react";
import Loading from "@/app/[lang]/components/loading";
import NewEventForm from "./newEventForm";

// CreateEventePage Props
interface EventCreatePageProps {
    lang: Locale;
    dictionary: any;
}

// Komponente um eine Veranstaltung zu erstellen
const CreateEventPage = ({ lang, dictionary }: EventCreatePageProps) => {
    /**
    * Funktion: Handle das Erstellen einer neuen Veranstaltung
    * @param title - Titel der Veranstaltung
    * @param content - Text der Veranstaltung
     */
    const handleCreateEvent = async (title: string, content: string, date: string) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    date,
                }),
            });

            if (response.ok) {
                // Veranstaltung erfolgreich erstellt, weiterleite an Veranstaltungsseite
                window.location.href = `/${lang}/events`;
            }
        } catch (error) {
            console.error('Fehler beim Erstellen der Veranstaltung:', error);
        }
    };

    return (
        <div className='text-center mt-10 mx-auto'>
            <h2 className='text-[28px] font-bold font-orator mb-4'>{dictionary.newEvent}:</h2>
            {/* Ladeanimation während der Datenverarbeitung */}
            <Suspense fallback={<Loading />}>
                <div className=''>
                    {/* Formular für die Erstellung einer neuen Frage */}
                    <NewEventForm onSubmit={handleCreateEvent} lang={lang} dictionary={dictionary} />
                </div>
            </Suspense>
        </div>
    );
};

export default CreateEventPage;