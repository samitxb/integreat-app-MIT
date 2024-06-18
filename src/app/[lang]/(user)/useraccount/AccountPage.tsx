// \useraccount\AccountPage.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import checkLogin from '@lib/utils/checkLogin';
import { Locale } from '../../../../../i18n-config';

// Definiert Props
interface UserPageProps {
  dictionary: any;
  lang: Locale;
}

const AccountPage = ({ dictionary, lang }: UserPageProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  /**
   * Effekt: Anmeldestatus und Benutzerdaten überprüfen.
   */
  useEffect(() => {
    const user = checkLogin();
  
    if (user) {
      setUsername(user.username);
      setRole(user.role);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /**
   * Funktion zum Abmelden und Löschen des Benutzer-Cookies.
   * Weiterleitung zur Anmeldeseite ein.
   */
  const handleLogout = () => {
    Cookies.remove('user');
    setIsLoggedIn(false);

    window.location.href = `/${lang}/`;
  };

  /**
   * Funktion zum Starten der Freundessuche.
   * Nicht implementiert.
   */
  const handleSearchFriends = () => {
    console.log("No FriendSearch implemented!")
  };

  return (
    <div className="flex items-center justify-center mt-20 ">
      {isLoggedIn ? (
        <div className='flex flex-col'>
          <h1 className='text-2xl mb-8'>{dictionary.loggedInAs} {username} {dictionary.withRole} {role}</h1>
          <div className='flex flex-col'>
            {/* Freundessuche ausgeblendet, da nicht implementiert */}
            <button className='hidden bg-gray-400 border-2 border-gray-400 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau transform transition-transform hover:scale-105 mb-4 dark:text-black' onClick={handleSearchFriends}>{dictionary.searchFriend}</button>
            <button className='bg-gray-400 border-2 border-gray-400 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau transform transition-transform hover:scale-105 dark:text-black' onClick={handleLogout}>{dictionary.logout}</button>
          </div>
        </div>
      ) : (
        <p className='text-2xl'>{dictionary.pleaseLogIn}</p>
      )}
    </div>
  );
};

export default AccountPage;



