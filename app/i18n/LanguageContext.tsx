'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import ptBR from './dictionaries/pt-BR.json';
import enUS from './dictionaries/en-US.json';

export type Language = 'pt-BR' | 'en-US';
export type Dictionary = typeof ptBR;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Dictionary;
}

const dictionaries: Record<Language, Dictionary> = {
    'pt-BR': ptBR,
    'en-US': enUS,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>('pt-BR');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && dictionaries[savedLanguage]) {
            setLanguage(savedLanguage);
        } else if (navigator.language.includes('en')) {
            setLanguage('en-US');
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: dictionaries[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const interpolate = (template: string, values: Record<string, string>) =>
    Object.entries(values).reduce(
        (result, [key, value]) => result.replace(`{${key}}`, value),
        template
    );
