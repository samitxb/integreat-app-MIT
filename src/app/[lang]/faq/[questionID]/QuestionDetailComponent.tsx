// \faq\[questionID]\QuestionDetailComponent.tsx - Detailansicht einer bestimmten Frage
import React from 'react';
import { Question } from '@/app/models/Question';
import { ObjectId } from 'mongodb';
import { Locale } from '../../../../../i18n-config';

// Definiert Props für die QuestionDetail-Komponente.
interface QuestionDetailProps {
    question: Question;
    onDeleteQuestion: () => void;
    onDeleteAnswer: (answerId: ObjectId) => void;
    admin: boolean;
    lang: Locale;
    dictionary: any
}

/**
 * Funktion zum Formatieren des Datums.
 * @param date - Das Datum, das formatiert werden soll.
 * @returns Das formatierte Datum als Zeichenkette.
 */
const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return new Date(date).toLocaleDateString('de-DE', options);
};


const QuestionDetailComponent = ({ question, onDeleteQuestion, onDeleteAnswer, admin, lang, dictionary }: QuestionDetailProps) => {
    return (
        <div className="">
            <div className='shadow-md p-4'>
                <h2 className="text-2xl font-bold mb-6">{question.title}</h2>
                <p className="">{question.question}</p>
                <div className="mt-4">
                    <p className="text-[12px] md:text-sm text-gray-600">{dictionary.questionBy}: {question.author}</p>
                    <p className="text-[12px] md:text-sm text-gray-600">{dictionary.publishedOn}: {formatDate(question.createdAt!)}</p>
                    {admin && (
                        <button
                            onClick={onDeleteQuestion}
                            className='bg-red-500 text-white mt-4 mb-4 px-2 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            {question.answers.length > 0 ? (
                <div className="mt-6 shadow-md p-4">
                    <h3 className="text-xl font-bold mb-4">{dictionary.answers}:</h3>
                    <ul>
                        {question.answers.map((answer, index) => (
                            <li key={index === question.answers.length - 1 ? 'latestAnswer' : index} className="mb-8">
                                <p className='mb-3'>{answer.answer}</p>
                                <p className="text-[12px] md:text-sm text-gray-600">{dictionary.answeredBy}: {answer.author}</p>
                                <p className="text-[12px] md:text-sm text-gray-600">{dictionary.publishedOn}: {formatDate(answer.createdAt!)}</p>
                                {admin && (
                                    <button
                                        onClick={() => answer._id && onDeleteAnswer(answer._id)}
                                        className='bg-red-500 text-white mt-4 mb-4 px-2 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="mt-6 text-gray-600">Es gibt noch keine Antworten auf diese Frage.</p>
            )}
        </div>
    );
};

export default QuestionDetailComponent;
