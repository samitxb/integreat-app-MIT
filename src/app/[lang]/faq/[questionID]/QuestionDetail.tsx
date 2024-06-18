// \faq\[questionID]\QuestionDetail.tsx - Seite für eine bestimmte Frage
'use client'
import React, { useEffect, useState } from 'react';

// Importiere die QuestionDetail-Komponente für die Anzeige der Frage
import QuestionDetailComponent from './QuestionDetailComponent';
import { Question } from '@/app/models/Question';

// Importiere Hilfsfunktionen und -typen
import checkLogin from '@lib/utils/checkLogin';
import { Links } from '../../components/activeLinks';
import { ObjectId } from 'mongodb';
import { Locale } from '../../../../../i18n-config';

// Definiert Props
interface QuestionDetailProps {
    dictionary: any;
    lang: Locale;
    questionID: string
}

const QuestionDetail = ({ dictionary, lang, questionID }: QuestionDetailProps) => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [newAnswer, setNewAnswer] = useState<string>('');
    const [username, setUsername] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false)

    /**
     * Überprüfe Benutzeranmeldung und Status
     */
    useEffect(() => {
        const user = checkLogin();
        if (user) {
            setUsername(user.username);
            setIsLoggedIn(true);

            const roleString = user.role.toString();
            if (roleString === "admin") {
                setAdmin(true)
            }
        }
    }, [username]);

    /**
     * Lade die bestimmte Frage beim Laden der Seite
     */
    const questionId = questionID;
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(`/api/faq/${questionId}`);
                const data = await response.json();
                setQuestion(data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Frage:', error);
            }
        };

        fetchQuestion();
    }, [questionId]);


    /**
     * Aktualisiere die bestimmte Frage nach dem Hinzufügen einer neuen Antwort
     */
    const fetchUpdatedQuestion = async () => {
        try {
            const updatedResponse = await fetch(`/api/faq/${questionId}`);
            const updatedData = await updatedResponse.json();
            setQuestion(updatedData);
        } catch (error) {
            console.error('Fehler beim Abrufen der aktualisierten Frage:', error);
        }
    };

    /**
     * handles new Answer
     */
    const handleAddAnswer = async () => {
        try {
            const response = await fetch(`/api/faq/${questionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer: newAnswer,
                    author: username,
                }),
            });
            const data = await response.json();
            console.log('Response from PUT request:', data);

            // Überprüfe, ob die Antwort erfolgreich hinzugefügt wurde
            if (data.success) {
                fetchUpdatedQuestion();
            }
            setNewAnswer('');
        } catch (error) {
            console.error('Fehler beim Hinzufügen der Antwort:', error);
        }
    };

    /**
     * Behandle das Löschen einer Frage
     */
    const handleDeleteQuestion = async () => {
        try {
            const response = await fetch(`/api/faq/${questionId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log('Response from DELETE question request:', data);

            // Wenn die Löschung erfolgreich war, navigiere zur Seite /faq
            if (data.success) {
                window.location.href = `/${lang}/faq`;
            }
        } catch (error) {
            console.error('Fehler beim Löschen der Frage:', error);
        }
    };

    /**
     * Behandle das Löschen einer Antwort
     * @param answerId - ID der Antwort
     */
    const handleDeleteAnswer = async (answerId: ObjectId) => {
        try {
            const response = await fetch(`/api/faq/${questionId}/answers/${answerId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log('Response from DELETE answer request:', data);

            // Wenn die Löschung erfolgreich war, aktualisiere die Frage
            if (data.success) {
                fetchUpdatedQuestion();
            }

        } catch (error) {
            console.error('Fehler beim Löschen der Antwort:', error);
        }
    };


    return (
        <div className='mx-auto w-[100%] sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[60%] 2xl:w-[60%]'>
            {/* Navigationslinks */}
            <div className='ml-4 sm:ml-0'>
            <Links params={{
                lang: lang
            }}></Links>
            </div>
            <div className='rounded-lg shadow-md'>
                <div className='p-4 lg:p-8 xl:p-10 2xl:p-12'>
                    {/* Rendere die Detailansicht der Frage, wenn sie vorhanden ist */}
                    {question && (
                        <QuestionDetailComponent
                            question={question}
                            onDeleteQuestion={handleDeleteQuestion}
                            onDeleteAnswer={handleDeleteAnswer}
                            admin={admin}
                            lang={lang}
                            dictionary={dictionary}
                        />
                    )}
                    {/* Rendere das Antwortformular, wenn der Benutzer angemeldet ist */}
                    {isLoggedIn && question &&(
                        <div className="mt-8">
                            <textarea
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                placeholder="Deine Antwort..."
                                className="w-full p-2 border rounded dark:text-black"
                            />
                            <button onClick={handleAddAnswer} className="mt-2 bg-donau-blau hover:bg-thd-blau text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                {dictionary.addAnswer}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;
