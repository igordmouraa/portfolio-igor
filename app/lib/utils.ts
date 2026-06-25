import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { intervalToDuration, format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export function getRelativeTimeString(
    date: Date | number | string,
    lang: string = 'pt-BR'
): string {
    let timeMs: number;
    if (typeof date === 'number') {
        timeMs = date;
    } else if (typeof date === 'string') {
        timeMs = new Date(date).getTime();
    } else {
        timeMs = date.getTime();
    }

    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const units: Array<{ unit: Intl.RelativeTimeFormatUnit; seconds: number }> = [
        { unit: 'year', seconds: 31557600 },
        { unit: 'month', seconds: 2629746 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ];

    const supportedLocales = Intl.RelativeTimeFormat.supportedLocalesOf(lang);
    const locale = supportedLocales.length > 0 ? lang : 'pt-BR';

    for (const { unit, seconds } of units) {
        if (Math.abs(deltaSeconds) >= seconds || unit === 'second') {
            const value = Math.round(deltaSeconds / seconds);
            const rtf = new Intl.RelativeTimeFormat(locale, {
                numeric: 'always',
                style: 'long',
            });

            let result = rtf.format(value, unit);
            if (locale === 'pt-BR') {
                result = result.replace('passado', 'atrás');
                result = result.replace(' atrás', '');
                result = result.replace('há ', '');
            } else if (locale.includes('en')) {
                result = result.replace(' ago', '');
                result = result.replace('in ', '');
            }

            return result;
        }
    }

    return new Intl.RelativeTimeFormat(locale).format(0, 'second');
}

export const formatExperienceDuration = (
    start: Date,
    end: Date | null,
    lang: 'pt-BR' | 'en-US' = 'pt-BR',
    presentLabel?: string
): string => {
    const endDate = end || new Date();
    const duration = intervalToDuration({ start, end: endDate });
    const locale = lang === 'pt-BR' ? ptBR : enUS;
    const present = presentLabel ?? (lang === 'pt-BR' ? 'O momento' : 'Present');

    const startDateFormatted = format(start, 'MMM yyyy', { locale });
    const endDateFormatted = end ? format(end, 'MMM yyyy', { locale }) : present;

    let durationText = '';
    if (duration.years && duration.years > 0) {
        durationText += `${duration.years} ${lang === 'pt-BR' ? 'ano' : 'year'}${duration.years > 1 ? 's' : ''}`;
    }
    if (duration.months && duration.months > 0) {
        if (durationText) durationText += lang === 'pt-BR' ? ' e ' : ' and ';
        durationText += `${duration.months} ${lang === 'pt-BR' ? (duration.months > 1 ? 'meses' : 'mês') : duration.months > 1 ? 'months' : 'month'}`;
    }

    if (!durationText && duration.days && duration.days > 0) {
        const lessThanMonth = lang === 'pt-BR' ? 'Menos de 1 mês' : 'Less than 1 month';
        return `${startDateFormatted.charAt(0).toUpperCase() + startDateFormatted.slice(1)} - ${endDateFormatted} • (${lessThanMonth})`;
    }

    return `${startDateFormatted.charAt(0).toUpperCase() + startDateFormatted.slice(1)} - ${endDateFormatted} • (${durationText})`;
};

const HEADER_SCROLL_OFFSET = 96;

export function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
}
