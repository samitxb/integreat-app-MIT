// \login\page.tsx - Serverseitige Anmelde- und Registrierungsseite
import React from 'react';

import { getDictionary } from '@/app/utils/i18n';
import { Locale } from '../../../../../i18n-config';

import LoginPage from './loginPage';


const Login = async ({ params: { lang } }: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang);

    return <LoginPage dictionary={dictionary} lang={lang}/>
};

export default Login;
