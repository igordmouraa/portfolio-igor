'use client';

import { SectionTitle } from '@/app/components/ui/section-title';
import { ParticleBackground } from '@/app/components/effects/particle-background';
import { techs } from '@/app/lib/techs';
import { useLanguage } from '@/app/i18n/LanguageContext';

const MARQUEE_SPEED = 45;

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
    const items = reverse ? [...techs].reverse() : techs;
    const track = [...items, ...items];

    return (
        <div className="skills-marquee__row" aria-hidden>
            <div
                className={`skills-marquee__track ${reverse ? 'skills-marquee__track--reverse' : ''}`}
                style={{ animationDuration: `${MARQUEE_SPEED}s` }}
            >
                {track.map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                        <span key={`${tech.name}-${i}`} className="skills-marquee__item">
                            <Icon className="text-2xl sm:text-3xl shrink-0" />
                            <span className="font-display text-lg sm:text-xl font-medium whitespace-nowrap">
                                {tech.name}
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export const SkillsSection = () => {
    const { t } = useLanguage();

    return (
        <section id="skills" className="relative py-20 sm:py-28 overflow-hidden">
            <ParticleBackground variant="section" />
            <div className="container relative z-10">
                <SectionTitle title={t.skills.title} subtitle={t.skills.subtitle} />
            </div>

            <div className="skills-marquee mt-14 sm:mt-16 relative z-10">
                <MarqueeRow />
                <MarqueeRow reverse />
            </div>
        </section>
    );
};
