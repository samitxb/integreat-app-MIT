// \api\users\registration\route.ts - Post und Get Anfragen zum Registrieren
import { getUsers } from "@lib/mongo/getUsers";
import { NextApiRequest, NextApiResponse } from "next";
import { addUsers, checkIfUserExists } from "@lib/mongo/registration";
import bcrypt from "bcrypt";

/**
 * Bearbeitet POST-Anfragen an die Registrierungsroute.
 *
 * @param request Das eingehende Anfrageobjekt.
 * @returns Die Antwort auf die Registrierungsanfrage.
 */
export async function POST(request: Request) {
    try {
        // Verarbeitt die POST-Anfrage und fügt den Benutzer zur Datenbank hinzu
        const userData = await request.json();
        const userExists = await checkIfUserExists({ userData });

        // Überprüft, ob der Benutzer bereits existiert
        if (userExists) {
            return new Response(
                JSON.stringify({ error: 'User already exists' }),
                { status: 409, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Hashen des Passworts
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        // Hinzufügen des Benutzers zur Datenbank
        await addUsers({ userData });

        // Erfolgreiche Antwort zurückgeben
        return new Response(JSON.stringify({ message: 'User added successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error adding user to the database:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

/**
 * Wird nicht verwendet, I guess
 * 
 * @param res Antwortobjekt
 * @returns Alle Nutzer
 */
export async function GET(res: NextApiResponse) {
    try {
        // Verarbeite die GET-Anfrage und hole alle Benutzer aus der Datenbank
        const { users, error } = await getUsers();
        if (error) throw new Error(error);

        return new Response(JSON.stringify({ users }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })

    } catch (error) {
        console.error('Error getting users:', error);
        // Sende fehlerhafte Antwort zurück
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}






