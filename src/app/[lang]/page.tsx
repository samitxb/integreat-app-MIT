// \src\app\[lang]\page.tsx - Hauptkomponente, die geladen wird beim Start der Seite
import Content from './components/content';
import { Locale } from '../../../i18n-config';

// Definiert Props
interface MainProps {
  params: {
    lang: Locale;
  };
}

export default function Home({ params }: MainProps) {
  const lang = params.lang
  return (
    <main className="">
      <Content params={{
        lang: lang
      }} />
    </main>
  )
}