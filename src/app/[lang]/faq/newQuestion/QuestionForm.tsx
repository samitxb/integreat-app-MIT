// \faq\newQuestion\QuestionForm.tsx - Questions Form zum Erstellen
import React, { useState } from 'react';

import { Locale } from '../../../../../i18n-config';

// Definition der Props für die NewQuestionForm-Komponente
interface NewQuestionFormProps {
    onSubmit: (title: string, question: string) => void;
    lang: Locale;
    dictionary: any;
}

// Komponente "NewQuestionForm"
const NewQuestionForm = ({ onSubmit, lang, dictionary }: NewQuestionFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [validationError, setValidationError] = useState<string | null>(null);

    /**
     * Funktion: Handle das Absenden des Formulars
     * @param e - Eventobjekt
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validierung
        if (title.length < 10 || question.length < 20) {
            setValidationError('Titel muss mindestens 10 Zeichen lang sein und Frage mindestens 20 Zeichen.');
            return;
        }

        // Validierung
        setValidationError(null);

        // Aufruf der onSubmit-Funktion aus den Props
        onSubmit(title, question);

        // Setze Formulardaten zurück
        setTitle('');
        setQuestion('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 w-[95%] md:w-[80%] xl:w-[60%] h-[100%] rounded-md shadow-md dark:bg-slate-800 text-center mx-auto">
            {validationError && <p className="text-red-500 ">{validationError}</p>}
            <div className="mb-6 ">
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                    {dictionary.title}:
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-[95%] md:w-[80%] xl:w-[60%] dark:bg-slate-800 shadow-lg"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="question" className="block text-sm font-medium mb-2">
                    {dictionary.question}:
                </label>
                <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-[95%] md:w-[80%] xl:w-[60%] h-[20vh] dark:bg-slate-800 shadow-lg"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-donau-blau text-white px-4 py-2 rounded-md hover:bg-thd-blau focus:outline-none focus:ring focus:border-blue-300"
            >
                {dictionary.createQuestion}
            </button>
        </form>
    );
};

// Export der NewQuestionForm-Komponente
export default NewQuestionForm;
