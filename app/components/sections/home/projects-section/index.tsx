'use client';

import { SectionTitle } from '@/app/components/ui/section-title';
import { ParticleBackground } from '@/app/components/effects/particle-background';
import { useLanguage } from '@/app/i18n/LanguageContext';
import { ProjectSlider } from './project-slider';

export const ProjectsSection = () => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="relative pt-20 sm:pt-28 pb-4 sm:pb-6 overflow-hidden">
            <ParticleBackground variant="section" />
            <div className="container relative z-10">
                <SectionTitle title={t.projectsSection.title} subtitle={t.projectsSection.subtitle} />

                <div className="mt-12 sm:mt-14">
                    <ProjectSlider />
                </div>
            </div>
        </section>
    );
};
