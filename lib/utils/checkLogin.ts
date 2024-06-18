// \lib\utils\checkLogin.ts - Login-Überprüfung
import Cookies from 'js-cookie';

/**
 * Überprüft, ob ein Benutzer eingeloggt ist, indem Benutzer-Cookie überprüft wird.
 * @returns Ein Objekt mit Benutzerinformationen (username und role) oder null, wenn kein Benutzer eingeloggt ist.
 */
export default function checkLogin(): { username: any; role: any; } | null {
    try {
        // Benutzer-Cookie abrufen
        const userCookie = Cookies.get('user');

        if (userCookie) {
            // Benutzer-Cookie vorhanden, Benutzerinformationen extrahieren
            const { username: storedUsername, role: storedRole } = JSON.parse(userCookie);

            // Benutzerinformationen zurückgeben
            return { username: storedUsername, role: storedRole };
        }
        
        // Fallback-Wert, wenn kein Benutzer eingeloggt ist
        return null;
    } catch (error) {
        // Fehler beim Parsen des Cookies abfangen und loggen
        console.error('Fehler beim Überprüfen des Logins:', error);

        // Fallback-Wert bei einem Fehler
        return null;
    }
}

