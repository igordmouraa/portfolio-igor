// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface ContactRequest {
    name: string
    email: string
    message: string
    recaptchaToken: string
}

interface RecaptchaResponse {
    success: boolean
    'error-codes'?: string[]
}

interface DiscordEmbedField {
    name: string
    value: string
}

interface DiscordEmbed {
    title: string
    color: number
    fields: DiscordEmbedField[]
    timestamp: string
}

interface DiscordWebhookPayload {
    embeds: DiscordEmbed[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' })
    }

    const { name, email, message, recaptchaToken } = req.body as ContactRequest

    try {
        // Verificação reCAPTCHA
        const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`

        const recaptchaResponse = await axios.post<RecaptchaResponse>(recaptchaUrl)

        if (!recaptchaResponse.data.success) {
            return res.status(400).json({
                error: 'Falha na verificação reCAPTCHA',
                codes: recaptchaResponse.data['error-codes']
            })
        }

        // Configurar mensagem para o Discord
        const discordPayload: DiscordWebhookPayload = {
            embeds: [
                {
                    title: '📨 Nova mensagem de contato',
                    color: 5814783, // Cor roxa em decimal
                    fields: [
                        { name: '👤 Nome', value: name },
                        { name: '📧 E-mail', value: email },
                        { name: '💬 Mensagem', value: message }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        }

        // Enviar para o webhook do Discord
        await axios.post(process.env.DISCORD_WEBHOOK_URL!, discordPayload)

        return res.status(200).json({ success: true })

    } catch (error) {
        console.error('Erro no processamento:', error)

        if (axios.isAxiosError(error)) {
            return res.status(500).json({
                error: 'Erro na comunicação com serviços externos',
                details: error.response?.data
            })
        }

        return res.status(500).json({ error: 'Erro interno no servidor' })
    }
}