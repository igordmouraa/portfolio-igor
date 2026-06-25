'use client';

import { motion } from 'framer-motion';
import { IoMdHeart } from 'react-icons/io';
import { ParticleBackground } from '@/app/components/effects/particle-background';
import { useLanguage } from '@/app/i18n/LanguageContext';

export const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="relative h-24 w-full flex items-center justify-center bg-gradient-to-r from-background via-primary/10 to-background bg-gradient-animated overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <ParticleBackground variant="subtle" />
            <div className="relative z-10 flex flex-col items-center gap-2 text-xs sm:text-sm font-mono text-muted">
                <div className="flex items-center gap-1.5">
                    <span>{t.footer.madeWith}</span>
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                        }}
                    >
                        <IoMdHeart size={14} className="text-primary" />
                    </motion.div>
                    <span>{t.footer.by}</span>
                    <a
                        href="https://github.com/igordmouraa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                        Igor Moura
                    </a>
                </div>
                <span>© {currentYear} {t.footer.rights}</span>
            </div>
        </motion.footer>
    );
};
