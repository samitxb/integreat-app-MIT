// \api\users\login\route.ts - API für Login
import { login } from "@lib/mongo/login";

/**
 * Handelt den POST Request, um sich ein zu Loggen
 * @param request Enthält username und Passwort
 * @returns das Login-Ergebnis
 */
export async function POST(request: Request) {
    try {
        // Userdaten aus dem Req-Body holen und JSON parsen
        const userData = await request.json();

        // Username und Passwort extrahieren
        const { username, password } = userData;

        // Login-Funktion aufrufen 
        const loginResult = await login({ username, password });

        // Result zurückgeben
        if (loginResult.success) {
            return new Response(JSON.stringify({ success: true, message: loginResult.message, role: loginResult.role }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ success: false, error: loginResult.message }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        // Behandeln von Fehlern während des Login-Prozesses
        console.error('Error during login:', error);

        // Rückgabe einer 500 Internal Server Error-Antwort
        return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

















/*const userExists = await checkIfUserExists(userData.username);

// Check if User existiert
if (!userExists) {
    return new Response(
        JSON.stringify({ error: 'User doesnt exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
    );
} */