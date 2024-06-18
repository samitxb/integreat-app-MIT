// \lib\mongo\getUsers.ts - Holt alle Benutzer aus der Datenbank
import clientPromise from "./database";

// Variablen für die MongoClient-Instanz
let client: any
let db: any
let collection: any

/**
 * Initialisiert die Datenbankverbindung
 */
async function init() {
    try {
        client = await clientPromise;
        db = client.db("users");

        collection = await db.collection("usersCollection");

    } catch (error) {
        throw new Error("Failed to connect to database!");
    }
}

/**
 * Verbindet automatisch mit der Datenbank
 */
;(async () => {
    await init()
})()

/**
 * Stellt Benutzerdaten bereit
 * @returns Benutzerinformationen
 */
export async function getUsers() {
    try {
        if (!collection) await init()
        // Rufe alle Benutzer aus der Sammlung ab und konvertiere sie in ein Array
        const users = await collection.find().toArray();
        return { users, error: null };
    } catch (error) {
        console.error('Error getting users:', error);
        return { users: null, error: 'Internal Server Error' };
    }
}
