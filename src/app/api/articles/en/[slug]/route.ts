// \api\articles\en\[slug]\route.ts - Einzelnen Artikel speichern oder holen (englisch)
import clientPromise from "@lib/mongo/database";
import { ObjectId } from "mongodb";

/**
 * Handhabt die PUT-Anfrage zum Aktualisieren eines Artikels
 * @param req Die Next.js-Anfrage enthält den content
 * @param param Die Parameter der Anfrage, einschließlich des Artikelschlüssels (slug)
 * @returns Eine Next.js-Antwort
 */
export async function PUT(req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        // Verbindung zur Datenbank herstellen
        const client = await clientPromise;
        const db = client.db("articles");
        const articlesCollection = db.collection("enArticles");

        // Hole Kontent aus der Request und Konvertiere id zu ObjectId
        const content = await req.json();
        const objectId = new ObjectId(params.slug);

        console.log(objectId)

        // Setze lastEdited auf das aktuelle Datum im gewünschten Format
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

        // Überprüfe, ob id und content vorhanden sind
        if (!objectId || !content) {
            return new Response(JSON.stringify({ error: 'Ungültige Anfrage. id und content erforderlich.' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Aktualisiere den Artikel in der Datenbank
        const result = await articlesCollection.updateOne(
            { _id: objectId },
            {
                $set: {
                    content: content,
                    lastEdited: formattedDate,
                }
            }
        );

        // Überprüfe, ob der Artikel gefunden und aktualisiert wurde
        if (result.matchedCount > 0) {
            return new Response(
                JSON.stringify({ success: "Artikel erfolgreich aktualisiert" }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Artikel nicht gefunden" }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    } catch (error) {
        console.error('Error updating article:', error);
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
 * Handhabt die GET-Anfrage zum Holen eines Artikels
 * @param req Die Next.js-Anfrage enthält den content
 * @param param Die Parameter der Anfrage, einschließlich des Artikelschlüssels (slug)
 * @returns Eine Next.js-Antwort
 */
export async function GET(req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        // Verbindung zur Datenbank herstellen
        const client = await clientPromise;
        const db = client.db("articles");

        // Holtdie spezifische Frage anhand ID aus der Datenbank
        const article: any = await db
        .collection("enArticles")
        .findOne({ id: parseInt(params.slug) });

        // Erfolgreiche Antwort mit den Details der Frage im JSON-Format
        return new Response(JSON.stringify(article), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })

    } catch (error) {
        console.error('Error fetching article:', error);
        // Sende fehlerhafte Antwort zurück
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
