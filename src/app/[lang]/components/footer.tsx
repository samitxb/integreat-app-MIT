// \components\footer.tsx - Footer 
import React from "react";
import { Locale } from "../../../../i18n-config";
import Link from "next/link";

// Definiert Props
interface FooterProps {
  lang: Locale;
  dictionary: any;
}

const Footer = ({ lang, dictionary }: FooterProps) => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-2 bg-thd-dark-grey border-t border-gray-200 shadow hidden md:flex items-center justify-between md:p-3 dark:bg-gray-800 dark:border-gray-600">
      <div className="hidden xl:visible fixed xl:flex items-center space-x-2">
        <div className="bg-green-600 rounded-full h-7 w-7 transition-transform transform hover:translate-y-[-6px]"></div>
        <div className="bg-red-700 rounded-full h-7 w-7 transition-transform transform hover:translate-y-[-6px]"></div>
        <div className="bg-yellow-400 rounded-full h-7 w-7 transition-transform transform hover:translate-y-[-6px]"></div>
        <div className="bg-sky-600 rounded-full h-7 w-7 transition-transform transform hover:translate-y-[-6px]"></div>
        <div className="bg-purple-900 rounded-full h-7 w-7 transition-transform transform hover:translate-y-[-6px]"></div>
        <div className="bg-amber-500 rounded-full h-7 w-7 transition-transform transform hover:translate-y-[-6px]"></div>
        <div className="bg-rose-500 rounded-full h-7 w-7 transition-transform transform hover:translate-y-[-6px]"></div>
        <div className="bg-cyan-600 rounded-full h-7 w-7 transition-transform transform hover:translate-y-[-6px]"></div>
      </div>
      <ul className="flex mx-auto flex-wrap items-center mt-3 text-sm font-medium text-gray-400 dark:text-gray-400 ">
        <li>
          <Link href={`/${lang}/impressum`} className="hover:underline me-4 md:me-6">
            {dictionary.footerpages.imprint}
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/about`} className="hover:underline me-4 md:me-6">
            {dictionary.footerpages.about.heading}
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/datasecurity`} className="hover:underline me-4 md:me-6">
            {dictionary.footerpages.dataprotection.heading}
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/licences`} className="hover:underline me-4 md:me-6">
            {dictionary.footerpages.openSourceLicences.heading}
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
