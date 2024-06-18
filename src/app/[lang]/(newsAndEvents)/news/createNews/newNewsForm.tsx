// \news\createNews\newNewsForm.tsx - News Form zum Erstellen
import React, { useState } from 'react';
import { Locale } from '../../../../../../i18n-config';

// Definition der Props für die NewNewsForm-Komponente
interface NewNewsFormProps {
    onSubmit: (title: string, content: string) => void;
    lang: Locale;
    dictionary: any;
}

// Komponente "NewNewsForm"
const NewNewsForm = ({ onSubmit, lang, dictionary }: NewNewsFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [validationError, setValidationError] = useState<string | null>(null);

    /**
     * Funktion: Handle das Absenden des Formulars
     * @param e - Newsobjekt
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validierung
        if (!title || !content) {
            setValidationError('Bitte alle Felder ausfüllen!');
            return;
        }

        // Validierung
        setValidationError(null);

        // Aufruf der onSubmit-Funktion aus den Props
        onSubmit(title, content);

        // Setze Formulardaten zurück
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 w-[95%] md:w-[50%] h-[100%] rounded-md shadow-md dark:bg-slate-800 text-center mx-auto ">
            {validationError && <p className="text-red-500 ">{validationError}</p>}
            <div className='w-[100%] h-[100%] mx-auto justify-items-center mb-8'>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-lg font-medium mb-2">
                        {dictionary.title}:
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder={dictionary.title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-[95%] md:w-[80%] dark:text-black"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-lg font-medium mb-2">
                        {dictionary.news}:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        placeholder={dictionary.newsContent}
                        onChange={(e) => setContent(e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-[95%] md:w-[80%] h-[20vh] dark:text-black"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                {dictionary.newNews}
            </button>
        </form>
    );
};

// Export der NewNewsForm-Komponente
export default NewNewsForm;

