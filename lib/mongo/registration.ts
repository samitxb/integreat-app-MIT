// /lib/mongo/registration.ts -Registrieren von Usern
import clientPromise from "./database";

// Variablen für die MongoClient-Instanz
let client: any
let db: any
let collection: any

/**
 * Initialisiert die Datenbankverbindung
 */
async function init(): Promise<void> {
    try {
        // Warte auf die Client-Verbindung und stelle eine Verbindung zur Datenbank "users" her
        client = await clientPromise;
        db = client.db("users");

        // Stelle eine Verbindung zur Sammlung "usersCollection" her
        collection = await db.collection("usersCollection");
    } catch (error) {
        throw new Error("Failed to connect to the database!");
    }
}

/**
 * Verbindet automatisch mit der Datenbank
 */
; (async () => {
    await init()
})()

/**
 * Fügt Benutzer zur Datenbank hinzu
 * @param userData besteht aus Benutzername und Passwort
 */
export async function addUsers({ userData }: { userData: any; }) {
    try {
        if (!collection) await init()

        // Fügt die Rolle "user" hinzu
        const newUserData = {
            ...userData,
            role: "user"
        }

        // Fügt den Benutzer zur Sammlung hinzu
        const result = await collection.insertOne(newUserData);

        // Logging für Console
        //console.log(`User added with ID: ${result.insertedId}`);

    } catch (error) {
        console.error('Error adding user to the database:', error);
        throw error;
    }
}


/**
 * Überprüft, ob der Benutzer existiert
 * @param userData bereitgestellte Benutzerdaten
 * @returns true, wenn der Benutzer existiert
 */
export async function checkIfUserExists({ userData }: { userData: any; }): Promise<boolean> {
    try {
        if (!collection) await init();

        // Extrahiere den Benutzernamen und die E-Mail aus den Benutzerdaten
        const username = userData.username
        const email = userData.email

        // Überprüft, ob ein Benutzer mit dem bereitgestellten Benutzernamen oder der E-Mail existiert
        const existingUser = await collection.findOne({ username });
        const existingEmail = await collection.findOne({ email });

        // Gib true zurück, wenn entweder der Benutzername oder die E-Mail bereits existiert
        return !!existingUser || !!existingEmail;

    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}


