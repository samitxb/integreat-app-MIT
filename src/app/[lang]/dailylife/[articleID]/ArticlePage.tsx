// \dailylife\[articleID]\ArticlePage.tsx - Darstellung eines einzelnen Artikels
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Links } from '../../components/activeLinks';
import checkLogin from '@lib/utils/checkLogin';
import { Locale } from '../../../../../i18n-config';
import { Article } from '@/app/models/Article';

// Definiert Props
interface ArticlePageProps {
    articleID: string;
    dictionary: any;
    lang: Locale;
}

const ArticlePage = ({ articleID, dictionary, lang }: ArticlePageProps) => {
    const [article, setArticle] = useState<Article>();
    const [role, setRole] = useState<string | null>(null);
    const [admin, setAdmin] = useState<boolean | undefined>();

    // Effekt: Abrufen der Artikelinformationen von der API
    useEffect(() => {
        // API-URL basierend auf der ausgewählten Sprache
        const apiUrl = lang === 'en' ? `/api/articles/en/${articleID}` : `/api/articles/${articleID}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.id) {
                    // Artikel setzen
                    setArticle(data)
                } else {
                    console.error('Unerwartetes Datenformat:', data);
                }
            })
            .catch((error) => console.error('Fehler beim Abrufen der Artikel', error));
    }, []); // Leer, da Seite beim Sprachen-wechseln selbst neu lädt

    // Effekt: Überprüfen des Benutzer-Logins und Extrahieren der Rolle
    useEffect(() => {
        const user = checkLogin();
        if (user) {
            const roleString = user.role.toString();
            setRole(roleString);
        }
    }, []);

    // Effekt: Setzen der Admin-Berechtigung, wenn die Rolle "admin" ist
    useEffect(() => {
        // Zugriff auf role, nachdem der Zustand aktualisiert wurde
        if (role === "admin") {
            setAdmin(true)
        }
    }, [role]);

    // Render-Methode für die Seite, wenn ein Artikel vorhanden ist
    if (article) {
        return (
            <div className='flex'>
                {admin && (
                    <div className='mt-12 ml-96 fixed'>
                        <Link key={article.id} href={`/${lang}/dailylife/editorPage/${article.id}`}>
                            <button className="bg-donau-blau hover:bg-thd-blau text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300">Edit</button>
                        </Link>
                    </div>
                )}
                <div id="innerArticle" className="mx-auto my-2 md:my-4 text-center w-[95%] sm:w-[100%] md:w-[82%] lg:w-[72%] xl:w-[55%] 2xl:w-[50%] 3xl:w-[40%] ">
                    <Links params={{
                        lang: lang
                    }} />
                    <div className='mt-8'>
                        <h2 className="text-[28px] font-bold mb-10 font-orator">{article.title}</h2>
                        <div className='text-left leading-[1.4rem]'>
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            <p className='mt-12 text-left'>{dictionary.lastEdited} {article.lastEdited}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div className='mx-auto my-12 md:my-4 text-center w-[95%] sm:w-[100%] md:w-[82%] lg:w-[72%] xl:w-[55%] 2xl:w-[50%] 3xl:w-[40%]'>
            <h2 className='text-[28px] font-bold mb-10 font-orator'>{dictionary.noArticleContent}</h2>
        </div>
        );
    }
};

export default ArticlePage;

