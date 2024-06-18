// \login\loginPage.tsx - Login/Register-Form
"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { Locale } from "../../../../../i18n-config";

// Definiert Props
interface LoginPageProps {
  dictionary: any;
  lang: Locale;
}

const LoginPage = ({ dictionary, lang }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  /**
   * Setzt den Cookie mit Benutzerdaten
   * @param userData Benutzerdaten (Benutzername und Rolle)
   */
  const setCookie = (userData: { username: string; role: string }) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 1, path: "/" });
  };

  /**
   * Handhabt die Aktion (Anmeldung oder Registrierung)
   * @param action Aktionstyp ('login' oder 'register')
   * @param username Benutzername
   * @param password Passwort
   */
  const handleAction = async (action: string, username: string, password: string) => {
    setActionSuccess("");

    try {
      // UserData Objekt erstellen
      const userData = { username, password, email, };

      const response = await fetch(`/api/users/${isRegistering ? "registration" : "login"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
      );

      if (response.ok) {
        const responseData = await response.json();

        if (isRegistering) {
          // Registrierung erfolgreich
          setIsRegistering(false); // Wechsle zum Anmeldeformular

          // Alle Felder leeren
          setUsername("");
          setPassword("");
          setEmail("");
          setActionError("");

          setActionSuccess("Registrierung erfolgreich");
        } else {
          // Anmeldung erfolgreich
          const userRole = responseData.role;
          setActionSuccess("Anmeldung erfolgreich");

          // Alle Felder leeren
          setUsername("");
          setPassword("");
          setEmail("");
          setActionError("");

          // Cookie mit Username und Rolle setzen
          setCookie({ username: userData.username, role: userRole });

          // Zur Accountübersicht weiterleiten
          window.location.href = `/${lang}/useraccount`;
        }
      } else if (response.status === 409) {
        setActionError("Benutzer oder E-Mail existiert bereits.");
      } else {
        const errorData = await response.json();
        console.error("Fehler während der Aktion:", errorData.error);
        setActionError(errorData.error);
      }
    } catch (error) {
      console.error("Fehler während der Aktion:", error);
    }
  };

  return (
    <div className="mx-auto my-12 text-center">
      <h2 className="text-[28px] font-orator font-bold mb-8">{isRegistering ? dictionary.register : dictionary.login}</h2>
      <div className="flex text-left items-center justify-center ">
        <form className="max-w-lg mt-6 mx-auto w-[85%] sm:w-[75%] md:w-[75%] lg:w-[65%]"
          onSubmit={(e) => {
            e.preventDefault();
            handleAction(isRegistering ? "register" : "login", username, password);
          }}>
          {isRegistering && (
            <div className="relative z-0 w-full mb-8 group ">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-donau-blau focus:outline-none focus:ring-0 focus:border-thd-blau peer"
                id="floating_email"
                name="floating_email"
                type="email"
                placeholder=""
                value={email}
                aria-label="E-Mail"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-thd-blau peer-focus:dark:text-donau-blau peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                htmlFor="floating_email">E-Mail
              </label>
            </div>
          )}
          <div className="relative z-0 w-full mb-8 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-donau-blau focus:outline-none focus:ring-0 focus:border-thd-blau peer"
              id="username"
              type="text"
              placeholder=""
              value={username}
              aria-label={dictionary.username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-thd-blau peer-focus:dark:text-donau-blau peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              htmlFor="username">{dictionary.username}
            </label>
          </div>
          <div className="relative z-0 w-full mb-8 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-donau-blau focus:outline-none focus:ring-0 focus:border-thd-blau peer"
              id="password"
              type="password"
              placeholder=""
              value={password}
              aria-label={dictionary.password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-thd-blau peer-focus:dark:text-donau-blau peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              htmlFor="password">{dictionary.password}
            </label>
          </div>
          <div className="flex items-center justify-between mt-12">
            <button className={`${isRegistering
              ? "bg-green-500 hover:bg-green-700"
              : "bg-donau-blau hover:bg-thd-blau"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              {isRegistering ? dictionary.register : dictionary.login}
            </button>
            <button className="text-donau-blau hover:text-thd-blau ml-8" type="button"
              onClick={() => {
                // Verstecke den Erfolgstext beim Wechsel zwischen Registrierung und Login
                setActionSuccess("");
                setActionError("");

                // Leere zuvor eingegebenen User-Daten
                setUsername("");
                setPassword("");
                setEmail("");

                // Zu Registrieren wechseln
                setIsRegistering(!isRegistering);
              }}>
              {isRegistering ? dictionary.registertLogin : dictionary.notRegistertRegister}
            </button>
          </div>
          <div className="text-center mt-6">
            {actionSuccess && <p className="text-green-500">{actionSuccess}</p>}
            {actionError && <p className="text-red-500">{actionError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
