// \news\NewsPage.tsx - Seite für Veranstaltungen
'use client'
import Link from "next/link";
import React, { useState, useEffect} from "react";

import { Locale } from "../../../../../i18n-config";
import checkLogin from "@lib/utils/checkLogin";
import { NewsModel } from "@/app/models/News";

import NewsList from "./NewsList";

// Definition von Props für Eventpage
interface NewsPageProps {
        lang: Locale;
        dictionary: any;
}

// Komponente für die Veranstaltungsseite
const NewsPage = ({ lang, dictionary }: NewsPageProps) => {
    const [news, setNews] = useState<NewsModel[]>([]);
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
    * Effekt: Holt alle News aus der Datenbank und setzt sie
    */
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                const data = await response.json() as { news: NewsModel[] };
                setNews(data.news);
            } catch (error) {
                console.error('Fehler beim Abrufen der News:', error);
            }
        };
        fetchNews();
    }, []);

    /**
    * Behandelt das Löschen einer News
    */
    const handleDeleteNews = async (newsId: string) => {
        try {
            const response = await fetch(`/api/news/${newsId}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            // Wenn die Löschung erfolgreich war, aktualisiere die Liste an News
            if (data.success) {
                setNews((prevNews) => prevNews.filter((news) => news._id?.toString() !== newsId));
            }
        } catch (error) {
            console.error('Fehler beim Löschen der Veranstaltung:', error);
        }
    };

    return (
        <div className="text-center w-full mx-auto mt-10">
            <h2 className="text-[28px] font-orator font-bold mb-8">{dictionary.news}</h2>
            <div className='mb-8 2xl:mb-0 2xl:ml-12 2xl:fixed'>
                {admin && (
                    <Link href={`/${lang}/news/createNews`} className='w-full bg-donau-blau text-white px-4 py-2 rounded-md hover:bg-thd-blau focus:outline-none focus:ring focus:border-blue-300'>
                        {dictionary.newNews}
                    </Link>
                )}
            </div>
                {news.length > 0 ? (
                    <div className="mx-auto my-4 text-center w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] 2xl:w-[55%]">
                        <NewsList 
                        news={news} 
                        lang={lang} 
                        dictionary={dictionary} 
                        admin={admin}
                        onDeleteNews={handleDeleteNews} 
                        />
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg">{dictionary.noNews}</p>
                    </div>
                )
                }
        </div>
    );
};

export default NewsPage;
