// \dailylife\DailylifePage.tsx - Liste aller Artikel
"use client";
import Link from "next/link";
import React, { useState, useEffect} from "react";

import { Links } from "../components/activeLinks";
import { Locale } from "../../../../i18n-config";
import { Article } from "@/app/models/Article";

// Definiert Props
interface DailylifePageProps {
  dictionary: any;
  lang: Locale;
}

const DailylifePage = ({ dictionary, lang }: DailylifePageProps) => {
  const [articles, setArticles] = useState<Article[]>([]);

  /**
   * Effekt: Ruft Artikel von der API ab
   */
  useEffect(() => {
    // API anfragen

    // API-URL basierend auf der ausgewählten Sprache
    const apiUrl = lang === "en" ? "/api/articles/en" : "/api/articles";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Überprüfen und Verarbeiten der API-Antwort;
        if (Array.isArray(data.articles)) {
          // Sortieren der Artikel nach ID
          const sortedArticles = data.articles.sort(
            (a: { id: number }, b: { id: number }) => a.id - b.id);
          setArticles(sortedArticles);
        } else {
          console.error("Unerwartetes Datenformat:", data);
        }
      })
      .catch((error) =>
        console.error("Fehler beim Abrufen der Artikel", error)
      );
  }, [lang]); // Leerer Abhängigkeitsarray bedeutet, dass der Effekt nur einmal ausgeführt wird

  // Artikel nach Kategorien gruppieren
  const groupedArticles: { [key: string]: Article[] } = {};
  articles.forEach((article) => {
    if (!groupedArticles[article.category]) {
      groupedArticles[article.category] = [];
    }
    groupedArticles[article.category].push(article);
  });

  return (
    <div className="text-center mx-auto w-100% w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
      {/* Navigationslinks anzeigen */}
      <div className="mb-4 lg:mb-0">
        <Links
          params={{
            lang: lang,
          }}
        />
      </div>
      <h2 className="text-[28px] font-bold mb-6 lg:mb-12 font-orator">{dictionary.dailylife}</h2>
      {/* Kategorien und Artikel anzeigen */}
      {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
        <div key={category} className="text-left ml-0 ">
          {/* Überschrift für die Kategorie*/}
          <h3 className="text-xl mb-2 font-semibold border-thd-blau border-b-2 font-orator">
            {category}
          </h3>
          {/* Liste der Artikel in der Kategorie */}
          <ul className="flex flex-col text-md mb-5 ml-6">
            {categoryArticles.map((article) => (
              <Link key={article.id} href={`/${lang}/dailylife/${article.id}`}>
                <li className={`mb-0 pt-2 pb-2 border-donau-blau border-b hover:bg-gray-300 dark:hover:bg-gray-800`}>
                  {article.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DailylifePage;