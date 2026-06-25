'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import { ParticleBackground } from '@/app/components/effects/particle-background';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { MdOutlineEmail } from 'react-icons/md';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';
import { useLanguage, interpolate } from '@/app/i18n/LanguageContext';
import { scrollToSection } from '@/app/lib/utils';
import type { NowPlaying } from '@/app/lib/lastfm';

const SOCIAL_CONTACTS = [
    { url: 'https://github.com/igordmouraa', icon: TbBrandGithub, label: 'GitHub' },
    { url: 'https://www.linkedin.com/in/igordmoura/', icon: TbBrandLinkedin, label: 'LinkedIn' },
    { url: 'mailto:igordmoura_@hotmail.com', icon: MdOutlineEmail, label: 'Email' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
};

type HeroContentProps = {
    nowPlaying: NowPlaying | null;
};

export const HeroContent = ({ nowPlaying }: HeroContentProps) => {
    const { t } = useLanguage();
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % t.hero.roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [t.hero.roles.length]);

    return (
        <section id="home" className="w-full min-h-screen flex flex-col justify-center py-32 lg:py-0 relative">
            <ParticleBackground variant="hero" />

            <div className="container flex items-center justify-between flex-col-reverse lg:flex-row relative z-10">
                <motion.div
                    className="w-full lg:max-w-[530px]"
                    variants={containerVariants}
                    initial={false}
                    animate="visible"
                >
                    <motion.p className="font-mono text-primary mb-2" variants={itemVariants}>
                        {t.hero.greeting}
                    </motion.p>

                    <motion.h1
                        className="text-4xl sm:text-5xl font-display font-semibold text-foreground"
                        variants={itemVariants}
                    >
                        {t.hero.name}
                    </motion.h1>

                    <motion.div className="h-8 mt-2 overflow-hidden" variants={itemVariants}>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={roleIndex}
                                className="font-mono text-primary text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {t.hero.roles[roleIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>

                    {nowPlaying && (
                        <motion.a
                            href={nowPlaying.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            className="mt-3 inline-flex items-center gap-2.5 max-w-full group"
                            aria-label={interpolate(t.a11y.nowPlaying, {
                                artist: nowPlaying.artist,
                                track: nowPlaying.track,
                            })}
                        >
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                            </span>
                            <span className="text-sm truncate">
                                <span className="font-mono text-primary/80">{t.hero.nowPlayingLabel}</span>{' '}
                                <span className="text-foreground group-hover:text-primary transition-colors">
                                    {nowPlaying.artist}
                                </span>
                                <span className="text-muted"> — {nowPlaying.track}</span>
                            </span>
                        </motion.a>
                    )}

                    <motion.p
                        className="text-muted my-6 text-sm sm:text-base leading-relaxed"
                        variants={itemVariants}
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div className="mt-6 lg:mt-10 flex flex-wrap items-center gap-4" variants={itemVariants}>
                        <Button as="button" className="w-max group" onClick={() => scrollToSection('skills')}>
                            {t.hero.viewSkills}
                            <HiArrowNarrowRight className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <Button as="button" variant="secondary" onClick={() => scrollToSection('contact')}>
                            {t.hero.contact}
                        </Button>
                    </motion.div>

                    <motion.div className="flex items-center gap-4 mt-8" variants={itemVariants}>
                        {SOCIAL_CONTACTS.map((contact) => {
                            const Icon = contact.icon;
                            return (
                                <motion.a
                                    key={contact.label}
                                    href={contact.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-primary transition-colors"
                                    aria-label={interpolate(t.a11y.visitSocial, { label: contact.label })}
                                    whileHover={{ scale: 1.2, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Icon size={24} />
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative w-[280px] h-[360px] lg:w-[340px] lg:h-[440px] mb-6 lg:mb-0"
                    initial={false}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-lg" />
                    <Image
                        src="/images/igor.jpeg"
                        alt={t.a11y.profilePhoto}
                        fill
                        quality={95}
                        sizes="(max-width: 1024px) 280px, 340px"
                        className="rounded-2xl object-cover object-[center_15%] relative border border-border shadow-lg"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
};
