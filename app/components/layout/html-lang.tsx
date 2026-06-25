'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/app/i18n/LanguageContext';

export function HtmlLang() {
    const { language } = useLanguage();

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return null;
}
