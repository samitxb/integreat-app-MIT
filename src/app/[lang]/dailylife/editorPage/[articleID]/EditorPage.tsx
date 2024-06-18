// \dailylife\editorPage\[articleID]\EditorPage.tsx - Bearbeitung eines Artikels
'use client'
import Loading from '@/app/[lang]/components/loading';
import { Suspense, useEffect, useState } from 'react';
import { Links } from '@/app/[lang]/components/activeLinks';

import { Article } from '@/app/models/Article';
import { Locale } from '../../../../../../i18n-config';

// Definiert Props
interface EditorPageProps {
    dictionary: any;
    lang: Locale;
    articleId: string
}

const EditorPage = ({ dictionary, lang, articleId }: EditorPageProps) => {
    const [article, setArticle] = useState<Article>();
    const [editedContent, setEditedContent] = useState<string>('');

    // Effekt: Abrufen der Artikelinformationen von der API
    useEffect(() => {
        // API-URL basierend auf der ausgewählten Sprache
        const apiUrl = lang === 'en' ? `/api/articles/en/${articleId}` : `/api/articles/${articleId}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.id) {
                    // Artikel und bearbeiteten Inhalt setzen
                    setArticle(data);
                    setEditedContent(data.content);

                } else {
                    console.error('Unerwartetes Datenformat:', data);
                }
            })
            .catch((error) => console.error('Fehler beim Abrufen der Artikel', error));
    }, []);

    // Handler für Änderungen am Inhalt des Artikels
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedContent(event.target.value);
    };

    // Handler für das Speichern der Änderungen
    const handleSave = async () => {
        try {
            // API-URL basierend auf der ausgewählten Sprache
            const apiUrl = lang === 'en' ? `/api/articles/en/${article!._id}` : `/api/articles/${article!._id}`;

            // Setzen des aktualisierten Content-Felds im Artikelobjekt
            article!.content = editedContent;
            // API-Aufruf, um die Änderungen zu speichern
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedContent),
            });

            if (response.ok) {
                console.log('Änderungen erfolgreich gespeichert');
                // Navigiere zurück zur Artikelansicht
                window.location.href = `/${lang}/dailylife/${article!.id}`;
            } else {
                console.error('Fehler beim Speichern der Änderungen:', response.statusText);
            }
        } catch (error) {
            console.error('Fehler beim Speichern der Änderungen:', error);
        }
    };

    if (article) {
        return (
            <Suspense fallback={<Loading />}>
                <div className="container mx-auto my-4 text-center w-[95%] max-h-[95%]">
                    <Links params={{
                        lang: lang
                    }} />
                    <div className="mt-2">
                        <h1 className="text-4xl font-bold mb-10">{article.title}</h1>
                        <div>
                            {/* Artikel-content anzeigen */}
                            <textarea className="border p-2 mt-4 h-[50vh] w-[90%] dark:bg-slate-800 dark:border-slate-700"
                                value={editedContent}
                                onChange={handleContentChange}
                            >{article.content}
                            </textarea>
                            <div className='mt-12 flex justify-between'>
                                <p className="ml-12">{dictionary.lastEdited} {article.lastEdited}</p>
                                <button className="bg-donau-blau text-white px-4 py-2 rounded-md hover:bg-thd-blau focus:outline-none focus:ring focus:border-blue-300 mr-12" onClick={handleSave}>
                                    {dictionary.save}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        );
    } else {
        return (
            <div className='mx-auto my-2 md:my-12 text-center w-[95%] sm:w-[100%] md:w-[82%] lg:w-[72%] xl:w-[55%] 2xl:w-[50%] 3xl:w-[40%]'>
                <h2 className='text-[28px] font-bold mb-10 font-orator'>{dictionary.noArticleContent}</h2>
            </div>

        )
    }
};

export default EditorPage;


