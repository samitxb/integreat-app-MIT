// \events\EventsList.tsx - Liste von Veranstaltungen
import { Locale } from "../../../../../i18n-config";
import { EventModel } from "@/app/models/Events";
import { useState } from "react";

// Definition der Props für die EventList-Komponente
interface EventListProps {
    onDeleteEvent: (eventId: string) => void;
    events: EventModel[];
    admin: boolean;
    lang: Locale;
    dictionary: any
}

// Eventlist Komponente
const EventList = ({ events, lang, dictionary, admin, onDeleteEvent, }: EventListProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    /**
     * Handelt "mehr anzeigen" falls der Text länger ist
     * @param index 
     */
    const toggleExpand = (index: number) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map((event: EventModel, index: number) => (
                <div key={event._id ? event._id.toString() : 'defaultKey'} className="dark:bg-slate-800 bg-gray-300 p-4 rounded-md shadow-md ">
                    <p className="text-left text-xs text-gray-500 mb-2">
                        {new Date(event.date).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </p>
                    <div className="bg-slate-600 rounded-md mb-4 flex">
                        <p className=" text-white text-sm text-center p-4 ">{event.title}</p>
                        {admin && (
                            <div className="relative ml-auto my-auto mr-2">
                                <button onClick={() => onDeleteEvent(event._id!.toString())} className='bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                    <p className={`text-left text-sm mb-2 ${index === expandedIndex ? 'overflow-visible' : 'overflow-hidden h-24'}`}>
                        {event.content}
                    </p>
                    {event.content.length > 200 && (
                        <button className="text-donau-blau mt-2 cursor-pointer hover:text-thd-blau" onClick={() => toggleExpand(index)}>
                            {index === expandedIndex ? dictionary.showLess : dictionary.showMore}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default EventList;
