// \faq\newQuestion\newQuestionKomponent.tsx
'use client';

// Import von Next.js-Komponenten und -Bibliotheken
import React, { useState, useEffect, Suspense } from "react";

// Import benutzerdefinierter Komponenten
import Loading from '../../components/loading';
import NewQuestionForm from './QuestionForm';

// Import von Hilfsfunktionen
import checkLogin from '@lib/utils/checkLogin';

// Import von benutzerdefinierten Links
import { Links } from '../../components/activeLinks';
import { Locale } from '../../../../../i18n-config';

// Definiert Props
interface NewQuestionKomponentProps {
    dictionary: any;
    lang: Locale;
}

const NewQuestionsComponent = ({ dictionary, lang }: NewQuestionKomponentProps) => {
    const [username, setUsername] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /**
    * Effekt: Setzt username und login-Status beim Laden der Seite
    */
    useEffect(() => {
        const user = checkLogin();
        if (user) {
            setUsername(user.username);
            setIsLoggedIn(true);
        }
    }, [username]);

    /**
     * Funktion: Handle das Erstellen einer neuen Frage
     * @param title - Titel der Frage
     * @param question - Text der Frage
     */
    const handleCreateQuestion = async (title: string, question: string) => {
        try {
            const response = await fetch('/api/faq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    question,
                    author: username,
                }),
            });

            if (response.ok) {
                // Frage erfolgreich erstellt, aktualisiere die Fragenliste
                window.location.href = `/${lang}/faq`;
            } else {
                // Handle Fehler beim Erstellen der Frage
                console.error('Fehler beim Erstellen der Frage:', response.statusText);
            }
        } catch (error) {
            console.error('Fehler beim Erstellen der Frage:', error);
        }
    };

    return (
        <div className='text-center md:mt-10 mx-auto'>
            <div className='ml-4 md:ml-24 mb-4 md:mb-0'>
                <Links params={{
                    lang: lang
                }}>
                </Links>
            </div>
            <h1 className='text-2xl font-bold mb-4'>{dictionary.createnewquestion}:</h1>
            {/* Ladeanimation während der Datenverarbeitung */}
            <Suspense fallback={<Loading />}>
                {/* Formular für die Erstellung einer neuen Frage */}
                <NewQuestionForm onSubmit={handleCreateQuestion} lang={lang} dictionary={dictionary} />
            </Suspense>
        </div>
    );
};

// Export der Komponente
export default NewQuestionsComponent;

