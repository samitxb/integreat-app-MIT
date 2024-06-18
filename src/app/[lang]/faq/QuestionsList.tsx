// \faq\QuestionsList.tsx - Liste von Fragen
import Link from "next/link";
import { Question } from "@/app/models/Question";
import { ObjectId } from "mongodb";
import { Locale } from "../../../../i18n-config";

// Definition der Props für die QuestionList-Komponente
interface QuestionListProps {
    questions: Question[];
    lang: Locale;
    dictionary: any
}

const QuestionList = ({ questions, lang, dictionary }: QuestionListProps) => {
    // Prüfe, ob die übergebenen Fragen ein Array sind
    if (Array.isArray(questions)) {
        return (
            <>
                {questions.length > 0 ? (
                    <ul className="text-left">
                        {questions.map((question: Question) => (
                            <Link key={question._id ? question._id.toString() : 'defaultKey'} href={question._id ? `/${lang}/faq/${question._id}` : '#'}>
                                <li className="dark:bg-slate-800 bg-gray-300 mb-4 p-4 rounded-md shadow-md transform transition-transform hover:scale-105 ">
                                    <p className=" text-sm overflow-hidden">{question.title}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[20px] font-bold">{dictionary.noQuestions}</p>
                )}
            </>
        );
    }
};

// Export der QuestionList-Komponente
export default QuestionList;