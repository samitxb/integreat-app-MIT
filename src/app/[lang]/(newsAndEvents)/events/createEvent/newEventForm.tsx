// \events\createEvent\newEventForm.tsx - Event Form zum Erstellen von Veranstaltungen
import React, { useState } from 'react';
import { Locale } from '../../../../../../i18n-config';

// Definition der Props für die NewEventForm-Komponente
interface NewEventFormProps {
    onSubmit: (title: string, content: string, date: string) => void;
    lang: Locale;
    dictionary: any;
}

// Komponente "NewEventForm"
const NewEventForm = ({ onSubmit, lang, dictionary }: NewEventFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [validationError, setValidationError] = useState<string | null>(null);

    /**
     * Funktion: Handle das Absenden des Formulars
     * @param e - Eventobjekt
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validierung
        if (!title || !content || !date) {
            setValidationError('Bitte alle Felder ausfüllen!');
            return;
        }

        // Validierung
        setValidationError(null);

        // Kombiniere Datum und Uhrzeit zu einem ISO-Datum-Zeit-String
        const datetime = `${date}T${time}:00`;

        // Aufruf der onSubmit-Funktion aus den Props
        onSubmit(title, content, datetime);

        // Setze Formulardaten zurück
        setTitle('');
        setContent('');
        setDate('');
        setTime('');
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
                        {dictionary.event}:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        placeholder={dictionary.eventContent}
                        onChange={(e) => setContent(e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-[95%] md:w-[80%] h-[20vh] dark:text-black"
                        required
                    />
                </div>
                <div className='mb-6 md:flex mx-auto w-[60%]'>
                    <div className='mx-auto mb-6 md:mb-0'>
                        <label htmlFor="date" className="block text-lg font-medium mb-2">
                            {dictionary.date}:
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
                            required
                        />
                    </div>
                    <div className='mx-auto '>
                        <label htmlFor="time" className="block text-lg font-medium mb-2">
                            {dictionary.time}:
                        </label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
                            required
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                {dictionary.newEvent}
            </button>
        </form>
    );
};

// Export der NewEventForm-Komponente
export default NewEventForm;

/**
 *                 <div className="mb-6">
                    <label htmlFor="date" className="block text-sm font-medium mb-2">
                        {dictionary.event}:
                    </label>
                    <textarea
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className=" px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-[60%] h-[20vh]"
                        required
                    />
                </div>
 */
