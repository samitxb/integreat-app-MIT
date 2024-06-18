// \faq\QuestionPage.tsx - Allgemeine Übersicht
'use client'

// Import von Next.js-Komponenten und -Bibliotheken
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from "react";

// Import benutzerdefinierter Komponenten
import Loading from '../components/loading';
import QuestionList from './QuestionsList';
import { Question } from '@/app/models/Question';
import checkLogin from '@lib/utils/checkLogin';
import { Locale } from '../../../../i18n-config';

// Definiert Porps
interface QuestionsPageProps {
    params: {
        lang: Locale;
        dictionary: any;
    };
}

const QuestionsPage = ({ params }: QuestionsPageProps) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const lang = params.lang
    const dictionary = params.dictionary

    /**
     * Effekt: Holt alle Fragen aus der Datenbank und setzt sie
     */
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/api/faq');
                const data = await response.json() as { questions: Question[] };

                setQuestions(data.questions);

            } catch (error) {
                console.error('Fehler beim Abrufen der Fragen:', error);
            }
        };

        fetchQuestions();
    }, []);

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

    return (
        <div className='text-center w-full mt-10'>
            {/* Seitentitel */}
            <h2 className='text-[28px] font-bold mb-8 font-orator'>FAQ</h2>
            <Suspense fallback={<Loading />}>
                <>
                    <div className='mb-8 xl:mb-0 xl:ml-12 xl:fixed'>
                        {/* Neues Frageformular, nur wenn Benutzer angemeldet ist */}
                        {isLoggedIn && (
                            <Link href={`/${lang}/faq/newQuestion`} className='w-full bg-donau-blau text-white px-4 py-2 rounded-md hover:bg-thd-blau focus:outline-none focus:ring focus:border-blue-300'>
                                {dictionary.newQuestion}
                            </Link>
                        )}
                    </div>
                    <div id="inner" className="mx-auto my-4 text-center w-[80%] sm:w-[80%] md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        {/* Liste der Fragen */}
                        <QuestionList questions={questions} lang={lang} dictionary={dictionary} />
                    </div>
                </>
            </Suspense>
        </div>
    );
};
// Export der Hauptkomponente
export default QuestionsPage;
