// \api\news\route.ts - Holen aller News und Hinzufügen einer News
import clientPromise from '@lib/mongo/database';
import { NewsModel } from '@/app/models/News';

/**
 * Handhabt die GET-Anfrage zum Abrufen aller News
 * @param res Die Next.js-Antwort
 * @returns Antwort, die alle News enthält
 */
export async function GET(req: Request) {
  try {
    // Verbindung zur Datenbank herstellen
    const client = await clientPromise;
    const db = client.db("eventsAndNews");
    const newsCollection = db.collection("news");

    // Alle News aus der Datenbank abrufen
    const news = await newsCollection.find().toArray();

     // Erfolgreiche Antwort mit den gefundenen News zurückgeben
    return new Response(JSON.stringify({ news }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error getting news:', error);
    // Sende fehlerhafte Antwort zurück
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

/**
 * Handhabt die POST-Anfrage zum Hinzufügen einer neuen News
 * @param req Die Next.js-Anfrage
 * @returns Eine Next.js-Antwort, die den Erfolg oder Misserfolg anzeigt
 */
export async function POST(req: Request) {
  try {
    // Hinzufügen einer neuen Veranstaltung
    const client = await clientPromise;
    const db = client.db("eventsAndNews");

    const { title, content} = await req.json() as { content: string; title: string};

    // Überprüfe, ob die erforderlichen Felder vorhanden sind
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Erstelle ein neues News-Objekt
    const newNews: NewsModel = {
      title,
      content,
      createdAt: new Date(),
    };

    // Füge die neue News zur Datenbank hinzu
    const result = await db.collection('news').insertOne(newNews);

    // Erfolgreiche Antwort zurückgeben
    return new Response(JSON.stringify({ message: 'Newst added successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during handling news:', error);
    // Sende fehlerhafte Antwort zurück
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}