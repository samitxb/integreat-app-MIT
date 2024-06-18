// \api\faq\route.ts - Holen aller Fragen und hinzufügen von Fragen
import clientPromise from '@lib/mongo/database';
import { Question} from '../../models/Question';

/**
 * Handhabt die GET-Anfrage zum Abrufen aller Fragen und deren Antworten
 * @param res Die Next.js-Antwort
 * @returns Antwort, die alle Fragen und Antworten enthält
 */
export async function GET(req: Request) {
  try {
    // Verbindung zur Datenbank herstellen
    const client = await clientPromise;
    const db = client.db("faq");
    const questionsCollection = db.collection("questions");

    // Alle Fragen aus der Datenbank abrufen
    const questions = await questionsCollection.find().toArray();

     // Erfolgreiche Antwort mit den gefundenen Fragen und Antworten zurückgeben
    return new Response(JSON.stringify({ questions }), {
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

/**
 * Handhabt die POST-Anfrage zum Hinzufügen einer neuen Frage
 * @param req Die Next.js-Anfrage
 * @returns Eine Next.js-Antwort, die den Erfolg oder Misserfolg des Hinzufügens anzeigt
 */
export async function POST(req: Request) {
  try {
    // Hinzufügen einer neuen Frage
    const client = await clientPromise;
    const db = client.db("faq");

    const { title, question, author } = await req.json() as { question: string; author: string, title: string };

    // Überprüfe, ob die erforderlichen Felder vorhanden sind
    if (!title || !question || !author) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Erstelle ein neues Frage-Objekt
    const newQuestion: Question = {
      author,
      title,
      question,
      answers: [],
      createdAt: new Date(),
    };

    // Füge die neue Frage zur Datenbank hinzu
    const result = await db.collection('questions').insertOne(newQuestion);

    // Erfolgreiche Antwort zurückgeben
    return new Response(JSON.stringify({ message: 'Question added successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error during handling FAQ:', error);
    // Sende fehlerhafte Antwort zurück
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

