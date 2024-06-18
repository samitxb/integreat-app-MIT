// \components\Header\navbar.tsx - Enthält LocaleSwitcher, DarkModeSwitcher und Login/Account-Seite
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import DarkModeToggle from './darkModeToggle';
import checkLogin from '@lib/utils/checkLogin';

import { getDictionary } from '@/app/utils/i18n';
import { Locale } from '../../../../../i18n-config';

import LocaleSwitcher from './localeSwitcher';

// Definiert Props
interface HeaderProps {
  lang: Locale;
  toggleMenu: () => void;
}

const Navbar = ({ lang, toggleMenu }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dictionary, setDictionary] = useState<{
    profile?: string;
    loginSign?: string;
  }>({});

  // Holt Client-Seitig die Dictionary-Daten und Überprüft User-Login-Status
  useEffect(() => {
    const fetchData = async () => {
      const dictionaryData = await getDictionary(lang);
      setDictionary(dictionaryData);
    };

    fetchData();

    const user = checkLogin();
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [lang, window.location.pathname]);

  return (
    <nav className="">
      <ul className="flex flex-col md:flex-row md:space-x-4 items-end md:items-center p-4 space-y-4 md:space-y-0">
        <li className='bg-light-grey2 border-2 border-light-grey2 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau dark:text-black'>
          <LocaleSwitcher />
        </li>
        <li className='bg-light-grey2 border-2 border-light-grey2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau'>
          <DarkModeToggle />
        </li>
        <li className='dark:text-black bg-light-grey2 border-2 border-light-grey2 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau'>
          {isLoggedIn ? (
            <Link href={`/${lang}/useraccount`} passHref onClick={toggleMenu}>
              <button type="button" aria-label="Profile" className=''>
                {dictionary.profile}
              </button>
            </Link>
          ) : (
            <Link href={`/${lang}/login`} passHref onClick={toggleMenu}>
              <button type="button" aria-label="Login" className=''>
                <p className=''>{dictionary.loginSign}</p>
              </button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

