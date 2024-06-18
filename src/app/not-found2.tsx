// Sollte als Möglichkeit dienen, bei einer Nicht-Erreichbaren Seite angezeigt zu werden. 
// Funktioniert noch nicht
import Footer from "./[lang]/components/footer"
import dynamic from 'next/dynamic';
import type { Metadata } from 'next'

import './[lang]/globals.css'

export const metadata: Metadata = {
    title: 'Integreat',
    description: 'Testapp',
  }
  

const DynamicHeader = dynamic(() => import("@/app/[lang]/components/Header/header"), {
    ssr: false,
});

export default function NotFound() {
    return (
        <html lang={"en"}>
            <DynamicHeader lang={""} dictionary={undefined} />
            <div>
                <h1>Sry this page does not exist</h1>
            </div>
            <Footer lang={""} dictionary={undefined}></Footer>
        </html>
    )
}