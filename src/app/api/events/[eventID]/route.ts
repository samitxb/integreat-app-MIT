// \api\events\[eventID]\route.ts - Einzelnes Event löschen
import clientPromise from '@lib/mongo/database';
import { ObjectId } from 'mongodb';

/**
 * Handhabt die DELETE-Anfrage zum Löschen einer spezifischen Veranstaltung anhand ihrer ID
 * @param request Die Next.js-Anfrage
 * @param param1 Parameter der Anfrage, einschließlich der eventID
 * @returns Antwort, die den Erfolg oder Misserfolg anzeigt
 */
export async function DELETE(request: Request, { params }: { params: { eventID: string } }
) {
    try {
        // Datenbankverbindung aufbauen
        const client = await clientPromise;
        const db = client.db("eventsAndNews");

        const eventId = params.eventID;

        // Überprüfe, ob die Veranstaltungs-ID gültig ist
        if (!ObjectId.isValid(eventId)) {
            return new Response(JSON.stringify({ error: 'Invalid event ID format' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Lösche die Veranstaltung
        const result = await db.collection('events').deleteOne({ _id: new ObjectId(eventId) });
        const deleteCount = result.deletedCount;

        if (deleteCount === 0) {
            return new Response(JSON.stringify({ error: 'Event not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Erfolgreiche Löschung
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error during handling deleting event:', error);
        // Sende fehlerhafte Antwort zurück
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}