// \useraccount\page.tsx
import React from 'react';

import { Locale } from '../../../../../i18n-config';
import { getDictionary } from '@/app/utils/i18n';

import AccountPage from './AccountPage';

// Serverseitige Komponente, um Dictionary zu Übergeben
const Account = async ({ params: { lang } }: { params: { lang: Locale } }) => {
    const dictionary = await getDictionary(lang)

    return <AccountPage dictionary={dictionary} lang={lang} />;
};

export default Account;



