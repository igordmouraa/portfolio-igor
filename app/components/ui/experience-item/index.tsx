'use client';

import { motion } from 'framer-motion';
import { TechBadge } from '@/app/components/ui/tech-badge';
import { Experience } from '@/app/lib/experiences';
import { formatExperienceDuration } from '@/app/lib/utils';
import { useLanguage } from '@/app/i18n/LanguageContext';

type ExperienceItemProps = {
    experience: Experience;
    index: number;
};

export const ExperienceItem = ({ experience, index }: ExperienceItemProps) => {
    const { t, language } = useLanguage();
    const { company, technologies, startDate, endDate } = experience;
    const experienceContent = t.experiences[index] || experience;
    const duration = formatExperienceDuration(
        startDate,
        endDate,
        language,
        t.experienceSection.present
    );

    return (
        <motion.div
            className="grid grid-cols-[40px,1fr] md:grid-cols-[1fr,40px,1fr] gap-4 md:gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="hidden md:flex flex-col items-end">
                <p className="text-lg text-muted text-right">{experienceContent.role}</p>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-primary w-4 h-4 border-4 border-background shadow-glow" />
                <div className="h-full w-px bg-border" />
            </div>

            <div className="flex flex-col gap-2 pb-8">
                <div className="flex flex-col">
                    <p className="text-lg text-muted md:hidden">{experienceContent.role}</p>
                    <h3 className="text-xl font-display font-bold text-foreground">@{company}</h3>
                    <span className="text-sm text-muted">{duration}</span>
                </div>
                <p className="text-muted text-base leading-relaxed whitespace-pre-line">
                    {experienceContent.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {technologies.map((tech) => (
                        <TechBadge key={`${company}-${tech}`} name={tech} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
