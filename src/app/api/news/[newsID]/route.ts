// \api\news\[newsID]\route.ts - Löschen einer spezifischen News
import clientPromise from '@lib/mongo/database';
import { ObjectId } from 'mongodb';

/**
 * Handhabt die DELETE-Anfrage zum Löschen einer spezifischen News anhand ihrer ID
 * @param request Die Next.js-Anfrage
 * @param param1 Parameter der Anfrage, einschließlich der newsID
 * @returns Antwort, die den Erfolg oder Misserfolg anzeigt
 */
export async function DELETE(request: Request, { params }: { params: { newsID: string } }
) {
    try {
        // Datenbankverbindung aufbauen
        const client = await clientPromise;
        const db = client.db("eventsAndNews");

        const newsId = params.newsID;

        // Überprüfe, ob die News-ID gültig ist
        if (!ObjectId.isValid(newsId)) {
            return new Response(JSON.stringify({ error: 'Invalid news-ID format' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Lösche die News
        const result = await db.collection('news').deleteOne({ _id: new ObjectId(newsId) });
        const deleteCount = result.deletedCount;

        if (deleteCount === 0) {
            return new Response(JSON.stringify({ error: 'news not found' }), {
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
        console.error('Error during handling deleting news:', error);
        // Sende fehlerhafte Antwort zurück
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}