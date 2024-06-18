// \api\articles\route.ts - Holen aller Artikel
import clientPromise from "@lib/mongo/database";
import { NextApiRequest, NextApiResponse } from "next";


/**
 * Holt alle Artikel aus der Datenbank und sendet die Antwort
 * @param res Die Next.js-Antwort
 * @returns Eine Next.js-Antwort mit allen Artikeln im JSON-Format
 */
export async function GET(res: NextApiResponse) {
    try {
        // Verbindung zur Datenbank herstellen
        const client = await clientPromise;
        const db = client.db("articles");
        const articlesCollection = db.collection("allArticles");

         // Alle Artikel aus der Datenbank abrufen und in ein Array konvertieren
        const articles = await articlesCollection.find().toArray();

        // Erfolgreiche Antwort mit den Artikeln im JSON-Format senden
        return new Response(JSON.stringify({ articles }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })


    } catch (error) {
        console.error('Error getting articles:', error);
        // Sende fehlerhafte Antwort zurück
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}




