import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import {Header} from "@/app/components/header";
import {Footer} from "@/app/components/footer";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata = {
    title: "Igor's Portfolio",
    icons: {
        icon: "/images/favicon-512x512.png",
        shortcut: "/images/favicon-256x256.png",
    },
    openGraph: {
        images: [
            {
                url: "/igor-metadata.png",
                width: 1200,
                height: 630,
                alt: "Igor's Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [
            {
                url: "/igor-metadata.png",
                width: 1200,
                height: 630,
                alt: "Igor's Portfolio",
            },
        ],
    },

};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
      <Header/>
        {children}
      <Footer/>
      </body>
    </html>
  )
}
