'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { MdOutlineEmail } from 'react-icons/md';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';
import { SectionTitle } from '@/app/components/ui/section-title';
import { Button } from '@/app/components/ui/button';
import { ParticleBackground } from '@/app/components/effects/particle-background';
import { useLanguage } from '@/app/i18n/LanguageContext';
import { cn } from '@/app/lib/utils';

const createContactSchema = (messages: {
    nameMin: string;
    emailInvalid: string;
    messageMin: string;
}) =>
    z.object({
        name: z.string().trim().min(2, messages.nameMin).max(100),
        email: z.string().trim().email(messages.emailInvalid).max(254),
        message: z.string().trim().min(10, messages.messageMin).max(2000),
        website: z.string().max(0).optional(),
    });

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

export const ContactSection = () => {
    const { t } = useLanguage();

    const schema = createContactSchema(t.contact.validation);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed');

            toast.success(t.contact.success);
            reset();
        } catch {
            toast.error(t.contact.error);
        }
    };

    return (
        <section id="contact" className="relative py-16 sm:py-24 overflow-hidden">
            <ParticleBackground variant="section" />

            <div className="container relative z-10">
                <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <p className="text-muted text-lg leading-relaxed">{t.contact.description}</p>

                        <div className="space-y-4">
                            <a
                                href="mailto:igordmoura_@hotmail.com"
                                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                            >
                                <MdOutlineEmail size={22} className="text-primary" />
                                igordmoura_@hotmail.com
                            </a>
                            <a
                                href="https://github.com/igordmouraa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                            >
                                <TbBrandGithub size={22} className="text-primary" />
                                github.com/igordmouraa
                            </a>
                            <a
                                href="https://www.linkedin.com/in/igordmoura/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                            >
                                <TbBrandLinkedin size={22} className="text-primary" />
                                linkedin.com/in/igordmoura
                            </a>
                        </div>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-5 bg-surface border border-border rounded-xl p-6 sm:p-8"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                {t.contact.nameLabel}
                            </label>
                            <input
                                id="name"
                                {...register('name')}
                                placeholder={t.contact.namePlaceholder}
                                className={cn(
                                    'w-full px-4 py-3 rounded-lg bg-background border border-border',
                                    'text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors'
                                )}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                {t.contact.emailLabel}
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                placeholder={t.contact.emailPlaceholder}
                                className={cn(
                                    'w-full px-4 py-3 rounded-lg bg-background border border-border',
                                    'text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors'
                                )}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                {t.contact.messageLabel}
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                {...register('message')}
                                placeholder={t.contact.messagePlaceholder}
                                className={cn(
                                    'w-full px-4 py-3 rounded-lg bg-background border border-border resize-none',
                                    'text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors'
                                )}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                            )}
                        </div>

                        <input
                            type="text"
                            {...register('website')}
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                        />

                        <Button as="button" type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                            {isSubmitting ? t.contact.sending : t.contact.submit}
                        </Button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};
