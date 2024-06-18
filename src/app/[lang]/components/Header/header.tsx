// \components\newHeader\header.tsx - Header
'use client'
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";

import StickyHeadroom from '@integreat-app/react-sticky-headroom';
import { Locale } from '../../../../../i18n-config';

import thdlogo from "@/app/Assets/THDLogo.png";

import Navbar from './navbar';
import Informationbar from './informationbar';

// Definiert Props
interface HeaderProps {
    lang: Locale;
    dictionary: any;
}

const Header = ({ lang, dictionary }: HeaderProps) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(115);

    // Toggelt Menü bei kleineren Bildschirmen
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    // Setzt ScrollHight vom StickyHeader je nach Bildschirmgröße
    useEffect(() => {
        const handleResize = () => {
            // scrollHeight abhängig von der Bildschirmbreite
            const newScrollHeight = window.innerWidth >= 768 ? 115 : 70;
            setScrollHeight(newScrollHeight);
        };

        // Event Listener für das Resize Event 
        window.addEventListener("resize", handleResize);

        // Setze initiale scrollHeight beim Laden der Komponente
        handleResize();

        // Entferne den Event Listener bei Komponentenabbau
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <StickyHeadroom scrollHeight={scrollHeight}>
            <header className="bg-thd-dark-grey md:bg-[url('/studierende-hoersaal-feiern.png')] md:bg-cover md:bg-center overflow-hidden">
                <div id="blurcontainer" className="md:bg-slate-700 md:bg-opacity-50 dark:border-b-2 dark:md:border-b-0 border-light-grey">
                    <div className='p-3 flex border-b-2 md:border-b-0 border-light-grey'>
                        <Image className="hidden md:block"
                            alt="THDLogo"
                            src={thdlogo}
                            style={{
                                maxWidth: "367px",
                                height: "auto",
                            }}
                            priority={true}
                            placeholder="blur"
                        />
                        <h1 className="hidden md:block ml-8 text-4xl text-white mt-3 font-orator"> {dictionary.cityPassau} </h1>
                        <h1 className="text-2xl text-white md:hidden font-orator"> THD | {dictionary.cityPassau} </h1>
                        <div id='navbarcontainer' className='ml-auto'>
                            {/* Burgermenü für kleinere Bildschirme anzeigen */}
                            <div className="md:hidden flex">
                                <button onClick={toggleMenu} className="text-white focus:outline-none">
                                    ☰
                                </button>
                            </div>
                            <div id="NavbarInte" className="hidden md:flex ">
                                {/* Navbar anzeigen */}
                                <Navbar lang={lang} toggleMenu={toggleMenu} />
                            </div>
                        </div>
                    </div>
                    <div id="Informationbar" className="flex mx-auto">
                        <Informationbar lang={lang} dictionary={dictionary} />
                    </div>
                </div>

                {/* Burgermenü-Inhalte für kleinere Bildschirme */}
                {isMenuOpen && (
                    <div className="md:hidden left-0 w-full h-full border-t-2 border-light-grey">
                        {/* Navbar anzeigen */}
                        <Navbar lang={lang} toggleMenu={toggleMenu} />
                        <ul className="flex flex-col mt-10 mr-4 pb-8 text-sm font-medium text-white items-end space-y-4 ">
                            <li>
                                <Link href={`/${lang}/impressum`} className="" onClick={toggleMenu}>
                                    {dictionary.footerpages.imprint}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/about`} className="" onClick={toggleMenu}>
                                    {dictionary.footerpages.about.heading}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/datasecurity`} className="" onClick={toggleMenu}>
                                    {dictionary.footerpages.dataprotection.heading}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/licences`} className="" onClick={toggleMenu}>
                                    {dictionary.footerpages.openSourceLicences.heading}
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </StickyHeadroom>
    );
};

export default Header;
