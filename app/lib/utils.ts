import {twMerge} from "tailwind-merge";
import {clsx, ClassValue} from "clsx";
import {intervalToDuration, format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
}

export const getRelativeTime = (date: string, locale: string): string => {
    const now = new Date();
    const start = new Date(date);
    const duration = intervalToDuration({start, end: now});

    let result = '';
    if (duration.years && duration.years > 0) {
        result += `${duration.years} ano${duration.years > 1 ? 's' : ''}`;
    }
    if (duration.months && duration.months > 0) {
        if (result) result += ' e ';
        result += `${duration.months} ${duration.months > 1 ? 'meses' : 'mês'}`;
    }

    if (!result && (duration.weeks || 0) > 0) {
        return 'Menos de um mês';
    }
    if (!result) {
        return 'Iniciando';
    }

    return result;
};

export const formatExperienceDuration = (start: Date, end: Date | null): string => {
    const endDate = end || new Date(); // Usa a data atual se 'end' for nulo
    const duration = intervalToDuration({start, end: endDate});

    const startDateFormatted = format(start, "MMM yyyy", {locale: ptBR});
    const endDateFormatted = end ? format(end, "MMM yyyy", {locale: ptBR}) : "Momento";

    let durationText = '';
    if (duration.years && duration.years > 0) {
        durationText += `${duration.years} ano${duration.years > 1 ? 's' : ''}`;
    }
    if (duration.months && duration.months > 0) {
        if (durationText) durationText += ' e ';
        durationText += `${duration.months} ${duration.months > 1 ? 'meses' : 'mês'}`;
    }
    // Se for menos de um mês, calcula em dias para não ficar em branco
    if (!durationText && duration.days && duration.days > 0) {
        return `${startDateFormatted.charAt(0).toUpperCase() + startDateFormatted.slice(1)} - ${endDateFormatted} • (Menos de 1 mês)`;
    }

    return `${startDateFormatted.charAt(0).toUpperCase() + startDateFormatted.slice(1)} - ${endDateFormatted} • (${durationText})`;
};
