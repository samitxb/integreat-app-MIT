// \events\EventsPage.tsx - Seite für Veranstaltungen
'use client'
import Link from "next/link";
import React, { useState, useEffect} from "react";

import { Locale } from "../../../../../i18n-config";
import checkLogin from "@lib/utils/checkLogin";
import { EventModel } from "@/app/models/Events";

import EventList from "./EventsList";

// Definition von Props für Eventpage
interface EventsPageProps {
        lang: Locale;
        dictionary: any;
}

// Komponente für die Veranstaltungsseite
const EventsPage = ({ lang, dictionary }: EventsPageProps) => {
    const [events, setEvents] = useState<EventModel[]>([]);
    const [admin, setAdmin] = useState(false)

    /**
    * Überprüft Benutzeranmeldung und Status
    */
    useEffect(() => {
        const user = checkLogin();
        if (user) {
            const roleString = user.role.toString();
            if (roleString === "admin") {
                setAdmin(true)
            }
        }
    }, []);

    /**
    * Effekt: Holt alle Veranstaltungen aus der Datenbank und setzt sie
    */
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                const data = await response.json() as { events: EventModel[] };
                setEvents(data.events);
            } catch (error) {
                console.error('Fehler beim Abrufen der Veranstaltungen:', error);
            }
        };
        fetchEvents();
    }, []);

    /**
    * Behandelt das Löschen einer Veranstaltung
    */
    const handleDeleteEvent = async (eventId: string) => {
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            // Wenn die Löschung erfolgreich war, aktualisiere die Liste an Veranstaltungen
            if (data.success) {
                setEvents((prevEvents) => prevEvents.filter((event) => event._id?.toString() !== eventId));
            }
        } catch (error) {
            console.error('Fehler beim Löschen der Veranstaltung:', error);
        }
    };

    return (
        <div className="text-center w-full mx-auto mt-10">
            <h2 className="text-[28px] font-orator font-bold mb-8">{dictionary.events}</h2>
            <div className='mb-8 2xl:mb-0 2xl:ml-12 2xl:fixed'>
                {admin && (
                    <Link href={`/${lang}/events/createEvent`} className='w-full bg-donau-blau text-white px-4 py-2 rounded-md hover:bg-thd-blau focus:outline-none focus:ring focus:border-blue-300'>
                        {dictionary.newEvent}
                    </Link>
                )}
            </div>
                {events.length > 0 ? (
                    <div className="mx-auto my-4 text-center w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] 2xl:w-[55%]">
                        <EventList 
                        events={events} 
                        lang={lang} 
                        dictionary={dictionary} 
                        admin={admin}
                        onDeleteEvent={handleDeleteEvent} 
                        />
                    </div>

                ) : (
                    <div className="text-center mt-6 2xl:mt-0">
                        <p className="text-sm">{dictionary.noEvents}</p>
                    </div>
                )
                }
        </div >
    );
};

export default EventsPage;