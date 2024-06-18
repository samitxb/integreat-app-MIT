// \components\content.tsx - Content Page 
import React from "react";
import Image from "next/image";
import Link from "next/link";

import alltagundwohnen from "@/app/Assets/alltagundwohnen_dunkelblau.png";
import gesundheit from "@/app/Assets/gesundheit_blau.png";
import willkommen from "@/app/Assets/willkommen_blau.png";

import { getDictionary } from "@/app/utils/i18n";
import { Locale } from "../../../../i18n-config";

// Definiert Props
interface ContentProps {
  params: {
    lang: Locale;
  };
}

const Content = async ({ params }: ContentProps) => {
  const lang = params.lang
  const dictionary = await getDictionary(lang);
  return (
    <main className="flex flex-col items-center justify-center mt-10 overflow-hidden">
      <div className="text-center overflow-hidden ">
        <h2 className="font-orator text-[28px] font-bold mb-12 p-2">{dictionary.localeInformations}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
          <div className="bg-white p-8 md:p-4 rounded-md shadow-md transform transition-transform hover:scale-105 dark:bg-gray-800 mx-auto">
            <Link href={`/${lang}`}>
              <div className="mb-2">
                <Image
                  alt="Willkommen"
                  src={willkommen}
                  style={{
                    maxWidth: "160px",
                    height: "160px",
                  }}
                  priority={true}
                />
              </div>
              <div className="">{dictionary.welcome}</div>
            </Link>
          </div>
          <div className="bg-white p-8 md:p-4 rounded-md shadow-md transform transition-transform hover:scale-105 dark:bg-gray-800 mx-auto">
            <Link href={`/${lang}/dailylife`}>
              <div className="mb-2">
                <Image
                  alt="Alltag und Wohnen"
                  src={alltagundwohnen}
                  style={{
                    maxWidth: "160px",
                    height: "160px",
                  }}
                  priority={true}
                />
              </div>
              <div className="">{dictionary.dailylife}</div>
            </Link>
          </div>
          <div className="bg-white p-8 md:p-4 rounded-md shadow-md transform transition-transform hover:scale-105 dark:bg-gray-800 mx-auto">
            <Link href={`/${lang}`}>
              <div className="mb-2">
                <Image
                  alt="Gesundheit"
                  src={gesundheit}
                  style={{
                    maxWidth: "160px",
                    height: "160px",
                  }}
                  priority={true}
                />
              </div>
              <div className="">{dictionary.health}</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Content;
