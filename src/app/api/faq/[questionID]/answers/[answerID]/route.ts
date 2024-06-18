// \api\faq\[questionID]\answers\[answerID]\route.ts - Löschen einer Antwort
import clientPromise from '@lib/mongo/database';
import { ObjectId } from 'mongodb';

/**
 * Handhabt die DELETE-Anfrage zum Löschen einer Antwort zu einer spezifischen Frage
 * @param request Die Next.js-Anfrage
 * @param param1 Die Parameter der Anfrage, einschließlich der FrageID und der AntwortID
 * @returns Eine Next.js-Antwort, die den Erfolg oder Misserfolg der Löschung anzeigt
 */
export async function DELETE(request: Request, { params }: { params: { questionID: string; answerID: string } }) {
    try {
        // Verbindung zur Datenbank herstellen
        const client = await clientPromise;
        const db = client.db("faq");

        const questionId = params.questionID;
        const answerId = params.answerID;

        // Die Antwort von der Frage entfernen
        const result = await db.collection('questions').updateOne(
            { _id: new ObjectId(questionId) },
            { $pull: { answers: { _id: new ObjectId(answerId) } } }
        );

        // Überprüfe, ob die Frage gefunden und die Antwort gelöscht wurde
        if (result.matchedCount > 0) {
            return new Response(
                JSON.stringify({ success: "Antwort erfolgreich gelöscht" }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Frage nicht gefunden oder Antwort nicht gelöscht" }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

    } catch (error) {
        console.error('Error during handling deleting answer:', error);
        // Sende fehlerhafte Antwort zurück
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
