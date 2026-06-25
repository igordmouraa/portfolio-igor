'use client';

import { motion } from 'framer-motion';
import { getRelativeTimeString } from '@/app/lib/utils';
import { Tech } from '@/app/lib/techs';
import { useLanguage } from '@/app/i18n/LanguageContext';
import { cn } from '@/app/lib/utils';

type KnowTechCardProps = {
    tech: Tech;
    featured?: boolean;
};

export const KnowTechCard = ({ tech, featured = false }: KnowTechCardProps) => {
    const { t, language } = useLanguage();
    const Icon = tech.icon;
    const relativeTime = getRelativeTimeString(tech.startDate, language);

    const startDate = new Date(tech.startDate);
    const now = new Date();
    const monthsDiff = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
    const experiencePercent = Math.min(Math.max((monthsDiff / 36) * 100, 10), 100);

    return (
        <motion.div
            className={cn(
                'group flex flex-col gap-3 p-5 sm:p-6 bg-surface border border-border rounded-xl',
                'hover:border-primary hover:shadow-glow transition-all duration-300',
                featured && 'sm:p-8'
            )}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="flex items-center justify-between gap-3">
                <p className={cn(
                    'font-medium text-foreground group-hover:text-primary transition-colors',
                    featured ? 'text-lg' : 'text-base'
                )}>
                    {tech.name}
                </p>
                <Icon className={cn(
                    'text-muted group-hover:text-primary transition-colors shrink-0',
                    featured ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'
                )} />
            </div>

            <div className="space-y-2">
                <div className="h-1 bg-border rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${experiencePercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    />
                </div>
                <span className="text-sm text-muted">
                    {relativeTime} {t.skills.experienceText}
                </span>
            </div>
        </motion.div>
    );
};
