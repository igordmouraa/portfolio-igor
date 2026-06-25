'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/app/i18n/LanguageContext';
import { HtmlLang } from '@/app/components/layout/html-lang';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <LanguageProvider>
                <HtmlLang />
                {children}
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        className: '!bg-surface !text-foreground !border !border-border',
                    }}
                />
            </LanguageProvider>
        </ThemeProvider>
    );
}
