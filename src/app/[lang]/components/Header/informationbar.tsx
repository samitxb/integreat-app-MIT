// \components\Header\informationbar.tsx - Enthält Lokale-Informationen, News, Veranstaltungen und FAQ
import React from "react";
import Link from "next/link";

import { Locale } from "../../../../../i18n-config";

// Definiert Props
interface InformationBarProps {
  lang: Locale;
  dictionary: any;
}

const Informationbar = ({ lang, dictionary }: InformationBarProps) => {

  return (
    <div className="flex mx-auto top-0 sticky overflow-x-auto pt-2 ">
      <nav id="information-bar" className="flex mb-3 text-center">
          <Link className="flex flex-col items-center transform transition-transform hover:scale-105 mx-1 md:mx-6" href={`/${lang}`}>
            <div className="bg-light-grey2 border-2 border-light-grey2 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                direction="ltr"
                className="dark:text-black"
              >
                <g id="signpost">
                  <path
                    id="Vector"
                    d="M13 10H18L21 7L18 4H13V2H11V4H4V10H11V12H6L3 15L6 18H11V22H13V18H20V12H13V10ZM6 6H17.17L18.17 7L17.17 8H6V6ZM18 16H6.83L5.83 15L6.83 14H18V16Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
            <span className="text-white mt-3 w-24 md:w-full">
              {dictionary.localeInformations}
            </span>
          </Link>
          <Link className="flex flex-col items-center transform transition-transform hover:scale-105 mx-1 md:mx-6" href={`/${lang}/news`}>
            <div className="bg-light-grey2 border-2 border-light-grey2 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                direction="ltr"
                className="dark:text-black"
              >
                <path
                  d="M4.07175 21.2033C3.44204 21.2033 2.90544 20.9816 2.46195 20.5381C2.01849 20.0946 1.79675 19.558 1.79675 18.9283V5.07178C1.79675 4.44206 2.0185 3.90546 2.462 3.46198C2.90547 3.01849 3.44206 2.79675 4.07178 2.79675H19.9283C20.558 2.79675 21.0946 3.01849 21.5381 3.46198C21.9816 3.90546 22.2033 4.44206 22.2033 5.07178V18.9283C22.2033 19.558 21.9816 20.0946 21.5381 20.5381C21.0946 20.9816 20.558 21.2033 19.9283 21.2033H4.07175ZM4.07175 18.9283H19.9283V5.07178H4.07175V18.9283ZM6.03588 16.9642H17.9641V14.9642H6.03588V16.9642ZM6.03588 13H10.0359V7.0359H6.03588V13ZM12 13H17.9641V11H12V13ZM12 9.0359H17.9641V7.0359H12V9.0359Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span className="text-white mt-3 w-24 md:w-full">{dictionary.news}</span>
          </Link>
          <Link className="flex flex-col items-center transform transition-transform hover:scale-105 mx-1 md:mx-6" href={`/${lang}/events`}>
            <div className="bg-light-grey2 border-2 border-light-grey2 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                direction="ltr"
                className="dark:text-black"
              >
                <g id="event">
                  <path
                    id="Vector"
                    d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
            <span className="text-white mt-3 w-24 md:w-full">{dictionary.events}</span>
          </Link>
          <Link className="flex flex-col items-center transform transition-transform hover:scale-105 mx-1 md:mx-6" href={`/${lang}/faq`}>
            <div className="bg-light-grey2 border-2 border-light-grey2 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 122.88 97.85"
              >
                <g>
                  <path d="M45.44,0H15.95c-4.4,0-8.17,1.55-11.3,4.65C1.51,7.75,0,11.52,0,15.95v28c0,4.44,1.55,8.21,4.65,11.3 c3.1,3.1,6.87,4.65,11.3,4.65h13.11c-0.92,3.52-2.04,6.87-3.45,10c-1.37,3.17-3.73,6.2-6.97,9.09c6.23-1.62,11.76-4.05,16.66-7.25 c4.86-3.17,9.09-7.15,12.57-11.83h10.56c4.4,0,8.17-1.58,11.3-4.65c3.13-3.1,4.65-6.87,4.65-11.3v-28c0-4.4-1.55-8.17-4.65-11.3 C66.64,1.51,62.87,0,58.43,0H45.44L45.44,0z M98.04,56.71h-9.34l-1.34,4.16h-8.41l10.04-25.22h9.02l9.99,25.22h-8.63L98.04,56.71 L98.04,56.71z M96.3,51.25l-2.91-9.06l-2.92,9.06H96.3L96.3,51.25z M48.41,37.7c1.09,0.72,1.81,1.18,2.14,1.36 c0.5,0.27,1.18,0.58,2.02,0.94l-2.43,4.65c-1.22-0.56-2.44-1.23-3.64-2c-1.2-0.78-2.04-1.36-2.52-1.74 c-1.94,0.79-4.37,1.19-7.29,1.19c-4.32,0-7.73-1.06-10.22-3.19c-2.95-2.51-4.42-6.05-4.42-10.6c0-4.42,1.29-7.86,3.87-10.31 c2.58-2.45,6.18-3.67,10.81-3.67c4.72,0,8.35,1.19,10.92,3.59c2.57,2.39,3.85,5.82,3.85,10.27C51.5,32.14,50.47,35.31,48.41,37.7 L48.41,37.7z M41.68,33.44c0.7-1.18,1.05-2.95,1.05-5.31c0-2.71-0.54-4.64-1.6-5.8c-1.07-1.16-2.54-1.74-4.42-1.74 c-1.75,0-3.17,0.59-4.25,1.78c-1.09,1.18-1.63,3.03-1.63,5.55c0,2.93,0.53,4.99,1.59,6.17c1.06,1.18,2.52,1.78,4.37,1.78 c0.6,0,1.16-0.06,1.69-0.16c-0.74-0.68-1.9-1.31-3.5-1.91l1.38-2.98c0.78,0.13,1.39,0.3,1.82,0.49c0.44,0.19,1.28,0.71,2.55,1.54 C41.01,33.03,41.33,33.23,41.68,33.44L41.68,33.44z M122.88,32.15v28c0,2.54-0.46,4.93-1.37,7.15c-0.92,2.22-2.25,4.23-4.09,6.02 c-0.77,0.77-1.62,1.48-2.46,2.08c-0.88,0.63-1.8,1.16-2.71,1.62c-0.04,0.04-0.11,0.04-0.14,0.07c-1.2,0.56-2.43,0.95-3.7,1.23 c-1.34,0.28-2.71,0.42-4.12,0.42H90.79c0.18,0.56,0.35,1.13,0.56,1.69c0.53,1.55,1.16,3.1,1.83,4.61v0.04 c0.6,1.41,1.44,2.75,2.47,4.09c1.06,1.37,2.32,2.71,3.84,4.09c1.09,0.95,1.2,2.61,0.21,3.7c-0.67,0.77-1.69,1.06-2.61,0.81 c-3.24-0.85-6.34-1.9-9.23-3.17c-2.89-1.27-5.63-2.75-8.21-4.44c-2.54-1.66-4.93-3.56-7.15-5.63c-1.87-1.76-3.63-3.7-5.28-5.74 h-9.23c-1.73,0-3.42-0.21-5-0.63c-1.58-0.42-3.1-1.09-4.54-1.97c-1.23-0.74-1.62-2.36-0.88-3.59c0.74-1.23,2.36-1.62,3.59-0.88 c0.99,0.6,2.04,1.06,3.2,1.37c1.13,0.32,2.36,0.46,3.63,0.46h10.53c0.81,0,1.58,0.35,2.11,1.06c1.66,2.22,3.49,4.26,5.49,6.13 c1.97,1.87,4.12,3.56,6.44,5.07c2.22,1.44,4.58,2.75,7.08,3.87c-0.49-0.81-0.88-1.62-1.27-2.43c-0.7-1.62-1.37-3.28-1.97-5.04 c-0.56-1.66-1.09-3.38-1.55-5.11c-0.11-0.28-0.14-0.6-0.14-0.92c0-1.44,1.16-2.64,2.64-2.64h16.94c1.06,0,2.04-0.11,2.99-0.32 c0.92-0.21,1.76-0.49,2.57-0.85c0.04-0.04,0.07-0.04,0.11-0.07c0.67-0.32,1.34-0.7,1.94-1.13c0.63-0.46,1.23-0.95,1.8-1.55 c1.3-1.3,2.29-2.75,2.92-4.3c0.63-1.55,0.95-3.28,0.95-5.14v-28c0-1.87-0.32-3.59-0.95-5.14c-0.63-1.55-1.62-2.99-2.92-4.3 c-1.3-1.3-2.75-2.29-4.3-2.92c-1.55-0.63-3.28-0.95-5.14-0.95H86.57c-1.44,0-2.64-1.16-2.64-2.64c0-1.44,1.16-2.64,2.64-2.64h17.72 c2.54,0,4.9,0.46,7.11,1.37c2.22,0.92,4.19,2.25,6.02,4.05c1.8,1.8,3.17,3.8,4.05,6.02c0.92,2.22,1.37,4.58,1.37,7.11H122.88 L122.88,32.15z" />
                </g>
              </svg>
            </div>
            <span className="text-white mt-3 w-24 md:w-full">FAQ</span>
          </Link>
      </nav>
    </div>
  );
};

export default Informationbar;

/**
 * <div className="flex mx-auto top-0 sticky overflow-x-auto">
      <nav id="information-bar" className="flex mb-3 text-center">
        <div className="mx-1 md:mx-4">
          <Link className="flex flex-col items-center transform transition-transform hover:scale-105" href={`/${lang}`}>
            <div className="bg-gray-400 border-2 border-gray-400 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                direction="ltr"
                className="dark:text-black"
              >
                <g id="signpost">
                  <path
                    id="Vector"
                    d="M13 10H18L21 7L18 4H13V2H11V4H4V10H11V12H6L3 15L6 18H11V22H13V18H20V12H13V10ZM6 6H17.17L18.17 7L17.17 8H6V6ZM18 16H6.83L5.83 15L6.83 14H18V16Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
            <span className="text-white mt-3 w-24 md:w-full">
              {dictionary.localeInformations}
            </span>
          </Link>
        </div>
        <div className="mx-1 md:mx-4">
          <Link className="flex flex-col items-center transform transition-transform hover:scale-105" href={`/${lang}/news`}>
            <div className="bg-gray-400 border-2 border-gray-400 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                direction="ltr"
                className="dark:text-black"
              >
                <path
                  d="M4.07175 21.2033C3.44204 21.2033 2.90544 20.9816 2.46195 20.5381C2.01849 20.0946 1.79675 19.558 1.79675 18.9283V5.07178C1.79675 4.44206 2.0185 3.90546 2.462 3.46198C2.90547 3.01849 3.44206 2.79675 4.07178 2.79675H19.9283C20.558 2.79675 21.0946 3.01849 21.5381 3.46198C21.9816 3.90546 22.2033 4.44206 22.2033 5.07178V18.9283C22.2033 19.558 21.9816 20.0946 21.5381 20.5381C21.0946 20.9816 20.558 21.2033 19.9283 21.2033H4.07175ZM4.07175 18.9283H19.9283V5.07178H4.07175V18.9283ZM6.03588 16.9642H17.9641V14.9642H6.03588V16.9642ZM6.03588 13H10.0359V7.0359H6.03588V13ZM12 13H17.9641V11H12V13ZM12 9.0359H17.9641V7.0359H12V9.0359Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span className="text-white mt-3 w-24 md:w-full">{dictionary.news}</span>
          </Link>
        </div>
        <div className="mx-1 md:mx-4">
          <Link className="flex flex-col items-center transform transition-transform hover:scale-105" href={`/${lang}/events`}>
            <div className="bg-gray-400 border-2 border-gray-400 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                direction="ltr"
                className="dark:text-black"
              >
                <g id="event">
                  <path
                    id="Vector"
                    d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
            <span className="text-white mt-3 w-24 md:w-full">{dictionary.events}</span>
          </Link>
        </div>
        <div className="mx-1 md:mx-4">
          <Link className="flex flex-col items-center transform transition-transform hover:scale-105" href={`/${lang}/faq`}>
            <div className="bg-gray-400 border-2 border-gray-400 p-2 rounded-full shadow-lg hover:border-2 hover:border-donau-blau">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 122.88 97.85"
              >
                <g>
                  <path d="M45.44,0H15.95c-4.4,0-8.17,1.55-11.3,4.65C1.51,7.75,0,11.52,0,15.95v28c0,4.44,1.55,8.21,4.65,11.3 c3.1,3.1,6.87,4.65,11.3,4.65h13.11c-0.92,3.52-2.04,6.87-3.45,10c-1.37,3.17-3.73,6.2-6.97,9.09c6.23-1.62,11.76-4.05,16.66-7.25 c4.86-3.17,9.09-7.15,12.57-11.83h10.56c4.4,0,8.17-1.58,11.3-4.65c3.13-3.1,4.65-6.87,4.65-11.3v-28c0-4.4-1.55-8.17-4.65-11.3 C66.64,1.51,62.87,0,58.43,0H45.44L45.44,0z M98.04,56.71h-9.34l-1.34,4.16h-8.41l10.04-25.22h9.02l9.99,25.22h-8.63L98.04,56.71 L98.04,56.71z M96.3,51.25l-2.91-9.06l-2.92,9.06H96.3L96.3,51.25z M48.41,37.7c1.09,0.72,1.81,1.18,2.14,1.36 c0.5,0.27,1.18,0.58,2.02,0.94l-2.43,4.65c-1.22-0.56-2.44-1.23-3.64-2c-1.2-0.78-2.04-1.36-2.52-1.74 c-1.94,0.79-4.37,1.19-7.29,1.19c-4.32,0-7.73-1.06-10.22-3.19c-2.95-2.51-4.42-6.05-4.42-10.6c0-4.42,1.29-7.86,3.87-10.31 c2.58-2.45,6.18-3.67,10.81-3.67c4.72,0,8.35,1.19,10.92,3.59c2.57,2.39,3.85,5.82,3.85,10.27C51.5,32.14,50.47,35.31,48.41,37.7 L48.41,37.7z M41.68,33.44c0.7-1.18,1.05-2.95,1.05-5.31c0-2.71-0.54-4.64-1.6-5.8c-1.07-1.16-2.54-1.74-4.42-1.74 c-1.75,0-3.17,0.59-4.25,1.78c-1.09,1.18-1.63,3.03-1.63,5.55c0,2.93,0.53,4.99,1.59,6.17c1.06,1.18,2.52,1.78,4.37,1.78 c0.6,0,1.16-0.06,1.69-0.16c-0.74-0.68-1.9-1.31-3.5-1.91l1.38-2.98c0.78,0.13,1.39,0.3,1.82,0.49c0.44,0.19,1.28,0.71,2.55,1.54 C41.01,33.03,41.33,33.23,41.68,33.44L41.68,33.44z M122.88,32.15v28c0,2.54-0.46,4.93-1.37,7.15c-0.92,2.22-2.25,4.23-4.09,6.02 c-0.77,0.77-1.62,1.48-2.46,2.08c-0.88,0.63-1.8,1.16-2.71,1.62c-0.04,0.04-0.11,0.04-0.14,0.07c-1.2,0.56-2.43,0.95-3.7,1.23 c-1.34,0.28-2.71,0.42-4.12,0.42H90.79c0.18,0.56,0.35,1.13,0.56,1.69c0.53,1.55,1.16,3.1,1.83,4.61v0.04 c0.6,1.41,1.44,2.75,2.47,4.09c1.06,1.37,2.32,2.71,3.84,4.09c1.09,0.95,1.2,2.61,0.21,3.7c-0.67,0.77-1.69,1.06-2.61,0.81 c-3.24-0.85-6.34-1.9-9.23-3.17c-2.89-1.27-5.63-2.75-8.21-4.44c-2.54-1.66-4.93-3.56-7.15-5.63c-1.87-1.76-3.63-3.7-5.28-5.74 h-9.23c-1.73,0-3.42-0.21-5-0.63c-1.58-0.42-3.1-1.09-4.54-1.97c-1.23-0.74-1.62-2.36-0.88-3.59c0.74-1.23,2.36-1.62,3.59-0.88 c0.99,0.6,2.04,1.06,3.2,1.37c1.13,0.32,2.36,0.46,3.63,0.46h10.53c0.81,0,1.58,0.35,2.11,1.06c1.66,2.22,3.49,4.26,5.49,6.13 c1.97,1.87,4.12,3.56,6.44,5.07c2.22,1.44,4.58,2.75,7.08,3.87c-0.49-0.81-0.88-1.62-1.27-2.43c-0.7-1.62-1.37-3.28-1.97-5.04 c-0.56-1.66-1.09-3.38-1.55-5.11c-0.11-0.28-0.14-0.6-0.14-0.92c0-1.44,1.16-2.64,2.64-2.64h16.94c1.06,0,2.04-0.11,2.99-0.32 c0.92-0.21,1.76-0.49,2.57-0.85c0.04-0.04,0.07-0.04,0.11-0.07c0.67-0.32,1.34-0.7,1.94-1.13c0.63-0.46,1.23-0.95,1.8-1.55 c1.3-1.3,2.29-2.75,2.92-4.3c0.63-1.55,0.95-3.28,0.95-5.14v-28c0-1.87-0.32-3.59-0.95-5.14c-0.63-1.55-1.62-2.99-2.92-4.3 c-1.3-1.3-2.75-2.29-4.3-2.92c-1.55-0.63-3.28-0.95-5.14-0.95H86.57c-1.44,0-2.64-1.16-2.64-2.64c0-1.44,1.16-2.64,2.64-2.64h17.72 c2.54,0,4.9,0.46,7.11,1.37c2.22,0.92,4.19,2.25,6.02,4.05c1.8,1.8,3.17,3.8,4.05,6.02c0.92,2.22,1.37,4.58,1.37,7.11H122.88 L122.88,32.15z" />
                </g>
              </svg>
            </div>
            <span className="text-white mt-3 w-24 md:w-full">FAQ</span>
          </Link>
        </div>
      </nav>
    </div>
 */