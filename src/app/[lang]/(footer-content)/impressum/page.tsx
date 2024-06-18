// \(footer-content)\impressum\page.tsx - Impressum Übersicht
'use server'
import React from 'react';
import { Locale } from '../../../../../i18n-config';
import { getDictionary } from '@/app/utils/i18n';

const ImprintPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang)
    return (
        <div className="container mx-auto my-12">
            <h2 className="text-[28px] font-orator font-bold mb-4">{dictionary.footerpages.imprint}</h2>
            <h3 className="text-[20px] font-orator font-bold mb-6">{dictionary.footerpages.studyprojekt}</h3>
            <div className='text-sm sm:w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%]'>
                <p className="">{dictionary.footerpages.thd}</p>
                <p className="mt-4">Dieter-Görlitz-Platz 1</p>
                <p className="">94469 Deggendorf</p>
                <p className="">{dictionary.footerpages.germany}</p>
                <p className="mt-4">Max Weichselgartner</p>
                <p className="">E-Mail: max.weichselgartner@stud.th-deg.de</p>
                <p className="mt-4">Sami Taieb</p>
                <p className="">E-Mail: sami.taieb@stud.th-deg.de</p>
            </div>
        </div>
    );
};

export default ImprintPage;