'use client';

import { motion } from 'framer-motion';
import { SectionTitle } from '@/app/components/ui/section-title';
import { ParticleBackground } from '@/app/components/effects/particle-background';
import { ExperienceItem } from '@/app/components/ui/experience-item';
import { experiences } from '@/app/lib/experiences';
import { useLanguage } from '@/app/i18n/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ExperienceSection = () => {
    const { t } = useLanguage();

    return (
        <section id="experience" className="relative pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
            <ParticleBackground variant="section" />
            <div className="container relative z-10">
                <SectionTitle title={t.experienceSection.title} subtitle={t.experienceSection.subtitle} />

                <motion.div
                    className="mt-12 flex flex-col gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {experiences.map((exp, index) => (
                        <motion.div key={exp.company} variants={itemVariants}>
                            <ExperienceItem experience={exp} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
