/**
 * Converte uma data para uma string de tempo relativo (ex: "há 1 minuto", "daqui a 2 horas")
 * usando Intl.RelativeTimeFormat com suporte aprimorado para português brasileiro
 */
export function getRelativeTimeString(
    date: Date | number,
    lang: string = 'pt-BR' // Forçamos o padrão para pt-BR
): string {
    const timeMs = typeof date === 'number' ? date : date.getTime()
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

    // Valores mais precisos considerando:
    // - Ano: 365.25 dias
    // - Mês: 30.44 dias
    const units: Array<{ unit: Intl.RelativeTimeFormatUnit; seconds: number }> = [
        { unit: 'year', seconds: 31557600 }, // 365.25 * 24 * 60 * 60
        { unit: 'month', seconds: 2629746 },  // 30.44 * 24 * 60 * 60
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ]

    // Verifica se o locale é suportado, caso contrário usa inglês
    const supportedLocales = Intl.RelativeTimeFormat.supportedLocalesOf(lang)
    const locale = supportedLocales.length > 0 ? lang : 'pt-BR'

    for (const { unit, seconds } of units) {
        if (Math.abs(deltaSeconds) >= seconds || unit === 'second') {
            const value = Math.round(deltaSeconds / seconds)

            // Força o uso de estilo numérico para evitar variações linguísticas
            const rtf = new Intl.RelativeTimeFormat(locale, {
                numeric: 'always', // Altera para sempre mostrar números
                style: 'long'
            })

            // Correção adicional para pluralização em pt-BR
            let result = rtf.format(value, unit)
            if (locale === 'pt-BR') {
                result = result.replace('passado', 'atrás') // Corrige "1 ano passado" para "1 ano atrás"
            }

            return result
        }
    }

    return new Intl.RelativeTimeFormat(locale).format(0, 'second')
}