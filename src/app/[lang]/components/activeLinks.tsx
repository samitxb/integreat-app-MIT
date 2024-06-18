// \components\activeLinks.tsx - Links, um z.B von einem Artikel zur Übersicht zurückzukommen
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Locale } from '../../../../i18n-config'
import { getDictionary } from '@/app/utils/i18n'
import { useEffect, useState } from 'react'

// Definiert Props
interface LinkProps {
  params: {
    lang: Locale;
  };
}

export function Links({ params }: LinkProps) {
  const [dictionary, setDictionary] = useState<{
    cityPassau?: string;
    dailylife?: string;
    questionsOverview?: string;
  }>({});
  const lang = params.lang
  const pathname = usePathname()

  /**
   * Holt Dictionary client-Seitig
   */
  useEffect(() => {
    const fetchData = async () => {
      const dictionaryData = await getDictionary(lang);
      setDictionary(dictionaryData);
    };
    fetchData();
  }, []);
  
  return (
    <nav className='flex flex-row'>
      <ul className='flex'>
        {/* Prüfe, ob sich die Seite auf einer einzelnen Frage befindet */}
        {pathname.startsWith(`/${lang}/faq/`) && !pathname.endsWith('/faq') && (
          <li className='mr-2 text-lg font-medium'>
            <Link href={`/${lang}/faq`} className={pathname.startsWith('/faq/') ? 'active' : ''} passHref>
              {'>'} {dictionary.questionsOverview}
            </Link>
          </li>
        )}
        {!pathname.startsWith(`/${lang}/faq/`) && (
          <>
            <li className='mr-2 text-lg font-medium'>
              <Link href={`/${lang}`} className={pathname === '/' ? 'active' : ''} passHref>
                {'>'} {dictionary.cityPassau}
              </Link>
            </li>
            {pathname.startsWith(`/${lang}/dailylife`) && !pathname.endsWith('/dailylife') && (
              <li className='mr-2 text-lg font-medium'>
                <Link href={`/${lang}/dailylife`} className={pathname.startsWith('/dailylife/') ? 'active' : ''} passHref>
                  {'>'} {dictionary.dailylife}
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  )
}
