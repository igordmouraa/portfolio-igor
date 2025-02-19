'use client'

import { useForm, UseFormRegister, FieldError } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from 'react'

interface ContactFormData {
    name: string
    email: string
    message: string
}

interface ContactFormErrors {
    name?: FieldError
    email?: FieldError
    message?: FieldError
}

export const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactFormData>()
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

    const onSubmit = async (data: ContactFormData) => {
        if (!recaptchaToken) {
            toast.error('Por favor, complete o reCAPTCHA')
            return
        }

        const notification = toast.loading('Enviando mensagem...')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    recaptchaToken
                }),
            })

            if (response.ok) {
                toast.success('Mensagem enviada com sucesso!', { id: notification })
                reset()
            } else {
                throw new Error('Falha no envio')
            }
        } catch (error) {
            toast.error('Erro ao enviar mensagem', { id: notification })
        }
    }

    return (
        <section className="bg-gray-900 py-16">
            <div className="container max-w-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-100 mb-4">Vamos trabalhar juntos?</h2>
                    <p className="text-gray-400">Entre em contato</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-300 mb-2">Nome</label>
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
                            placeholder="Seu nome completo"
                        />
                        {errors.name && <span className="text-red-400 text-sm">Este campo é obrigatório</span>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2">E-mail</label>
                        <input
                            {...register('email', {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            })}
                            type="email"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
                            placeholder="seu@email.com"
                        />
                        {errors.email && (
                            <span className="text-red-400 text-sm">
                {errors.email.type === 'required'
                    ? 'Este campo é obrigatório'
                    : 'Insira um e-mail válido'}
              </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-gray-300 mb-2">Mensagem</label>
                        <textarea
                            {...register('message', { required: true })}
                            rows={5}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
                            placeholder="Descreva sua proposta ou mensagem..."
                        ></textarea>
                        {errors.message && <span className="text-red-400 text-sm">Este campo é obrigatório</span>}
                    </div>

                    <div className="flex justify-center">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={(token) => setRecaptchaToken(token)}
                            className="recaptcha"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        Enviar mensagem
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>
        </section>
    )
}