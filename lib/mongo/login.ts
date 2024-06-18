// /lib/mongo/login.ts - Login

import clientPromise from "./database";
import bcrypt from 'bcrypt';

// Variablen für die MongoClient-Instanz
let client: any
let db: any
let collection: any

/**
 * Initialisiert die Datenbankverbindung
 */
async function init() {
    try {
        // Warte auf die Client-Verbindung und stelle eine Verbindung zur Datenbank "users" her
        client = await clientPromise;
        db = client.db("users");

        // Stelle eine Verbindung zur Sammlung "usersCollection" her
        collection = await db.collection("usersCollection");

    } catch (error) {
        throw new Error("Failed to connect to database!");
    }

}

/**
 * Verbindet automatisch mit der Datenbank
 */
; (async () => {
    await init()
})()

/**
 * Login-Logik
 * @param username bereitgestellter Benutzername
 * @param password bereitgestelltes Passwort
 * @returns { success: boolean, message: string, role?: string }, wenn die Anmeldung erfolgreich ist
 */
export async function login({ username, password }: { username: string; password: string; }) {
    // Überprüfe, ob der Benutzer existiert
    const user = await checkUser({ username });

    if (!user) {
        // Benutzer existiert nicht
        return { success: false, message: 'Benutzer existiert nicht' };
    }

    // Überprüfe, ob das eingegebene Passwort mit dem gehashten Passwort übereinstimmt
    const passwordMatch = await comparePasswords({ inputPassword: password, hashedPassword: user.password });

    if (!passwordMatch) {
        // Passwort stimmt nicht überein
        return { success: false, message: 'Falsches Passwort' };
    }

    // Rolle des Benutzers zurückgeben
    return { success: true, message: 'Anmeldung erfolgreich', role: user.role };
}



/**
 * Vergleicht das gehashte Passwort mit dem bereitgestellten Passwort
 * @param inputPassword bereitgestelltes Passwort
 * @param hashedPassword
 * @returns true, wenn die Passwörter übereinstimmen
 */
function comparePasswords({ inputPassword, hashedPassword }: { inputPassword: string; hashedPassword: string; }) {
    return bcrypt.compare(inputPassword, hashedPassword);
}


/**
 * Ruft Benutzerinformationen ab
 * @param username bereitgestellter Benutzername
 * @returns Benutzerinformationen
 */
async function checkUser({ username }: { username: string; }) {
    // Warte auf die Client-Verbindung
    const client = await clientPromise;
    const db = client.db("users");
    const collection = db.collection("usersCollection");

    const user = await collection.findOne({ username });

    return user;
}




