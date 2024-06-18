// \(footer-content)\datasecurity\page.tsx - Datenschutz - Übersicht
'use server'
import React from 'react';
import { Locale } from '../../../../../i18n-config';
import { getDictionary } from '@/app/utils/i18n';

const PrivacyPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang)
    return (
        <div className='container mx-auto my-12 '>
            <h2 className="text-[28px] font-orator font-bold mb-4">{dictionary.footerpages.dataprotection.heading}</h2>
            <div className='mt-8 sm:w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%]'>
                <p className="text-sm leading-[1.4rem]">
                {dictionary.footerpages.dataprotection.content[0]}
                </p>
                <p className="text-sm mt-4 leading-[1.4rem]">
                {dictionary.footerpages.dataprotection.content[1]}
                </p>
                <p className="text-sm mt-4 leading-[1.4rem]">
                {dictionary.footerpages.dataprotection.content[2]}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPage;