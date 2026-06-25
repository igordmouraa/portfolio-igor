'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { projects } from '@/app/lib/projects';
import { useLanguage, interpolate } from '@/app/i18n/LanguageContext';
import { ProjectShowcase } from './project-showcase';
import { cn } from '@/app/lib/utils';

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 120 : -120,
        opacity: 0,
        filter: 'blur(6px)',
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -120 : 120,
        opacity: 0,
        filter: 'blur(6px)',
    }),
};

export const ProjectSlider = () => {
    const { t } = useLanguage();
    const [[activeIndex, direction], setSlide] = useState([0, 0]);
    const dragStartX = useRef(0);
    const total = projects.length;

    const paginate = useCallback(
        (next: number) => {
            setSlide(([current]) => {
                const nextIndex = (current + next + total) % total;
                return [nextIndex, next];
            });
        },
        [total]
    );

    const goTo = useCallback(
        (index: number) => {
            setSlide(([current]) => {
                if (index === current) return [current, 0];
                return [index, index > current ? 1 : -1];
            });
        },
        []
    );

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') paginate(-1);
            if (e.key === 'ArrowRight') paginate(1);
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [paginate]);

    const handlePointerDown = (e: React.PointerEvent) => {
        dragStartX.current = e.clientX;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        const delta = e.clientX - dragStartX.current;
        if (Math.abs(delta) < 50) return;
        paginate(delta < 0 ? 1 : -1);
    };

    return (
        <div
            className="relative"
            role="region"
            aria-roledescription="carousel"
            aria-label={t.projectsSection.title}
        >
            <div className="flex items-center gap-3 sm:gap-5">
                <button
                    type="button"
                    onClick={() => paginate(-1)}
                    className="hidden sm:flex shrink-0 h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-muted hover:text-primary hover:border-primary transition-colors"
                    aria-label={t.projectsSection.prev}
                >
                    <HiChevronLeft size={22} />
                </button>

                <div
                    className="flex-1 min-w-0 overflow-hidden touch-pan-y"
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                >
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full"
                            aria-live="polite"
                        >
                            <ProjectShowcase
                                project={projects[activeIndex]}
                                index={activeIndex}
                                isActive
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    type="button"
                    onClick={() => paginate(1)}
                    className="hidden sm:flex shrink-0 h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-muted hover:text-primary hover:border-primary transition-colors"
                    aria-label={t.projectsSection.next}
                >
                    <HiChevronRight size={22} />
                </button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 sm:hidden w-full">
                    <button
                        type="button"
                        onClick={() => paginate(-1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-muted"
                        aria-label={t.projectsSection.prev}
                    >
                        <HiChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => paginate(1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-muted"
                        aria-label={t.projectsSection.next}
                    >
                        <HiChevronRight size={20} />
                    </button>
                    <span className="ml-auto font-mono text-xs text-muted">
                        {interpolate(t.projectsSection.slideCounter, {
                            current: String(activeIndex + 1),
                            total: String(total),
                        })}
                    </span>
                </div>

                <div
                    className="flex items-center gap-2 mx-auto sm:mx-0 sm:ml-auto"
                    role="tablist"
                    aria-label={t.projectsSection.title}
                >
                    {projects.map((project, index) => (
                        <button
                            key={project.title}
                            type="button"
                            role="tab"
                            aria-selected={index === activeIndex}
                            aria-label={interpolate(t.a11y.projectSlide, {
                                title: (t.projects[index] || project).title,
                                current: String(index + 1),
                                total: String(total),
                            })}
                            onClick={() => goTo(index)}
                            className={cn(
                                'h-2 rounded-full transition-all duration-300',
                                index === activeIndex
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-border hover:bg-primary/40'
                            )}
                        />
                    ))}
                </div>

                <span className="hidden sm:block font-mono text-xs text-muted tabular-nums">
                    {interpolate(t.projectsSection.slideCounter, {
                        current: String(activeIndex + 1),
                        total: String(total),
                    })}
                </span>
            </div>
        </div>
    );
};
