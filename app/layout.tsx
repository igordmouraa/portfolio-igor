import { Outfit, DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { Providers } from '@/app/components/layout/providers';

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
    variable: '--font-dm-sans',
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

const plexMono = IBM_Plex_Mono({
    variable: '--font-plex-mono',
    subsets: ['latin'],
    weight: ['400', '500'],
});

const BASE_URL = 'https://devigormoura.vercel.app/';

export const metadata = {
    title: 'Portfólio | Igor Moura - Desenvolvedor Full-Stack',
    description:
        'Portfólio de Igor Moura, desenvolvedor Full-Stack especializado em Node.js, React, Next.js e TypeScript. Explore meus projetos, habilidades e trajetória profissional.',
    metadataBase: new URL(BASE_URL),
    icons: {
        icon: '/images/favicon-512x512.png',
        shortcut: '/images/favicon-192x192.png',
    },
    openGraph: {
        title: 'Portfólio | Igor Moura - Desenvolvedor Full-Stack',
        description: 'Explore os projetos e a carreira de Igor Moura.',
        url: BASE_URL,
        siteName: 'Igor Moura Portfólio',
        images: [
            {
                url: '/images/igor-metadata.png',
                width: 1200,
                height: 630,
                alt: 'Preview do Portfólio de Igor Moura',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfólio | Igor Moura - Desenvolvedor Full-Stack',
        description: 'Explore os projetos e a carreira de Igor Moura.',
        images: ['/images/igor-metadata.png'],
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="pt-BR"
            className={`${outfit.variable} ${dmSans.variable} ${plexMono.variable}`}
            suppressHydrationWarning
        >
            <body className="antialiased font-sans">
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
