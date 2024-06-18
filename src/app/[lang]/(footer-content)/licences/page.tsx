// \(footer-content)\licences\page.tsx - Lizenzen Übersicht
import React from 'react';
import { Locale } from '../../../../../i18n-config';
import { getDictionary } from '@/app/utils/i18n';

const LicensesPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang)
    return (
        <div className='container mx-auto my-12'>
            <h2 className='text-[28px] font-orator font-bold mb-4'>{dictionary.footerpages.openSourceLicences.heading}</h2>
            <div className='mt-8 sm:w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%]'>
                <p className='text-sm'>
                    {dictionary.footerpages.openSourceLicences.introduction}
                </p>
                <ul className='list-disc list-inside mt-4 ml-8 text-sm'>
                    <li>
                        <strong>@integreat-app/react-sticky-headroom</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>@types/bcrypt</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>accept-language</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>bcrypt</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>clsx</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>cookie</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>i18next</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>i18next-resources-to-backend</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>js-cookie</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>mongodb</strong>: Apache-2.0 {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>negotiator</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>next</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>next-auth</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>next-intl</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>next-themes</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>react</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>react-dom</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>react-headroom</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>react-i18next</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>autoprefixer</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>babel-preset-next</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>eslint</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>eslint-config-next</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>postcss</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>tailwindcss</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                    <li>
                        <strong>typescript</strong>: MIT {dictionary.footerpages.openSourceLicences.license}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LicensesPage;