// \api\faq\[questionID]\route.ts - Holen und Löschen einer Frage, Hinzufügen einer Antwort
import clientPromise from '@lib/mongo/database';
import { Question, Answer } from '../../../models/Question';
import { ObjectId } from 'mongodb';

/**
 * Handhabt die PUT-Anfrage zum Hinzufügen einer neuen Antwort zu einer Frage
 * @param req Die Next.js-Anfrage
 * @param param1 Die Parameter der Anfrage, einschließlich der FrageID
 * @returns Success-Antwort
 */
export async function PUT(req: Request,
    { params }: { params: { questionID: string } }
) {
    try {
        // Verbindung zur Datenbank herstellen
        const client = await clientPromise;
        const db = client.db("faq");

        const questionId = params.questionID;

        // Extrahiere Antwort und Autor aus der Anfrage
        const { answer, author } = await req.json();

        // Erzeuge eine eindeutige ID für die Antwort
        const answerId = new ObjectId();

        // Erstelle ein neues Antwortobjekt
        const newAnswer: Answer = {
            _id: answerId,
            answer,
            author,
            createdAt: new Date(),
            lastEdited: new Date()
        };

        // Aktualisiere die Frage in der Datenbank, indem die Antwort hinzugefügt wird
        const result = await db.collection('questions').updateOne(
            { _id: new ObjectId(questionId) },
            { $push: { answers: newAnswer } }
        );

        // Überprüfe, ob die Frage gefunden und aktualisiert wurde
        if (result.matchedCount > 0) {
            return new Response(
                JSON.stringify({ success: "Frage erfolgreich aktualisiert" }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Frage nicht gefunden" }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

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

/**
 * Handhabt die GET-Anfrage zum Abrufen einer spezifischen Frage anhand ihrer ID
 * @param req Die Next.js-Anfrage
 * @param param1 Die Parameter der Anfrage, einschließlich der FrageID
 * @returns Eine Next.js-Antwort mit den Details der Frage im JSON-Format
 */
export async function GET(req: Request,
    { params }: { params: { questionID: string } }
) {
    try {
        // Verbindung zur Datenbank herstellen
        const client = await clientPromise;
        const db = client.db("faq");

        const questionId = params.questionID;

        // Holtdie spezifische Frage anhand ID aus der Datenbank
        const question: any = await db.collection('questions').findOne({ _id: new ObjectId(questionId) });

        // Erfolgreiche Antwort mit den Details der Frage im JSON-Format
        return new Response(JSON.stringify(question), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })

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

/**
 * Handhabt die DELETE-Anfrage zum Löschen einer spezifischen Frage anhand ihrer ID
 * @param request Die Next.js-Anfrage
 * @param param1 Parameter der Anfrage, einschließlich der FrageID
 * @returns Antwort, die den Erfolg oder Misserfolg der Löschung anzeigt
 */
export async function DELETE(request: Request, { params }: { params: { questionID: string } }
) {
    try {
        // Holen Sie eine spezifische Frage anhand ihrer ID
        const client = await clientPromise;
        const db = client.db("faq");

        const questionId = params.questionID;

        // Überprüfe, ob die Frage-ID gültig ist (im richtigen Format)
        if (!ObjectId.isValid(questionId)) {
            return new Response(JSON.stringify({ error: 'Invalid question ID format' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Lösche die Frage und alle zugehörigen Antworten
        const result = await db.collection('questions').deleteOne({ _id: new ObjectId(questionId) });
        const deleteCount = result.deletedCount;

        if (deleteCount === 0) {
            return new Response(JSON.stringify({ error: 'Question not found' }), {
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
        console.error('Error during handling deleting question:', error);
        // Sende fehlerhafte Antwort zurück
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

