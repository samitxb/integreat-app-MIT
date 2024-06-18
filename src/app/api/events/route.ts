// \api\events\route.ts - Alle Events holen und Events hinzufügen
import clientPromise from '@lib/mongo/database';
import { EventModel } from '../../models/Events';

/**
 * Handhabt die GET-Anfrage zum Abrufen aller Veranstaltungen
 * @param res Die Next.js-Antwort
 * @returns Antwort, die alle Veranstaltungen enthält
 */
export async function GET(req: Request) {
  try {
    // Verbindung zur Datenbank herstellen
    const client = await clientPromise;
    const db = client.db("eventsAndNews");
    const eventsCollection = db.collection("events");

    // Alle Veranstaltungen aus der Datenbank abrufen
    const events = await eventsCollection.find().toArray();

     // Erfolgreiche Antwort mit den gefundenen Veranstaltungen zurückgeben
    return new Response(JSON.stringify({ events }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error getting events:', error);
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
 * Handhabt die POST-Anfrage zum Hinzufügen einer neuen Veranstaltung
 * @param req Die Next.js-Anfrage
 * @returns Eine Next.js-Antwort, die den Erfolg oder Misserfolg anzeigt
 */
export async function POST(req: Request) {
  try {
    // Hinzufügen einer neuen Veranstaltung
    const client = await clientPromise;
    const db = client.db("eventsAndNews");

    const { title, content, date } = await req.json() as { content: string; title: string, date: Date };

    // Überprüfe, ob die erforderlichen Felder vorhanden sind
    if (!title || !content || !date) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Erstelle ein neues Veranstaltungs-Objekt
    const newEvent: EventModel = {
      title,
      content,
      date,
      createdAt: new Date(),
    };

    // Füge die neue Veranstaltung zur Datenbank hinzu
    const result = await db.collection('events').insertOne(newEvent);

    // Erfolgreiche Antwort zurückgeben
    return new Response(JSON.stringify({ message: 'Event added successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during handling Event:', error);
    // Sende fehlerhafte Antwort zurück
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}