'use client';

import Image from 'next/image';
import { FiArrowUpRight, FiGlobe } from 'react-icons/fi';
import { TbBrandGithub } from 'react-icons/tb';
import { Project } from '@/app/lib/projects';
import { useLanguage, interpolate } from '@/app/i18n/LanguageContext';
import { cn } from '@/app/lib/utils';

type ProjectShowcaseProps = {
    project: Project;
    index: number;
    isActive?: boolean;
};

export const ProjectShowcase = ({ project, index, isActive = true }: ProjectShowcaseProps) => {
    const { t } = useLanguage();
    const projectContent = t.projects[index] || project;

    return (
        <article
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            aria-hidden={!isActive}
        >
            <a
                href={project.demo || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    'group block relative aspect-[16/10] rounded-2xl overflow-hidden border border-border shadow-glow',
                    project.imageFit === 'contain' ? 'bg-surface' : 'bg-background'
                )}
                aria-label={interpolate(t.a11y.viewProject, { title: projectContent.title })}
                tabIndex={isActive ? 0 : -1}
            >
                <Image
                    src={project.image}
                    alt={interpolate(t.a11y.projectThumbnail, { title: projectContent.title })}
                    fill
                    priority={index === 0}
                    quality={92}
                    className={cn(
                        'transition-transform duration-700 group-hover:scale-[1.02]',
                        project.imageFit === 'contain'
                            ? 'object-contain p-6 sm:p-8'
                            : 'object-cover object-top'
                    )}
                    sizes="(max-width: 1024px) 100vw, 560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <FiArrowUpRight size={18} />
                </span>
            </a>

            <div className="flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-foreground leading-tight">
                    {projectContent.title}
                </h3>

                <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">
                    {projectContent.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <li
                            key={tech}
                            className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                        tabIndex={isActive ? 0 : -1}
                    >
                        <TbBrandGithub size={18} />
                        {t.projectsSection.repository}
                    </a>
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
                            tabIndex={isActive ? 0 : -1}
                        >
                            <FiGlobe size={18} />
                            {t.projectsSection.viewProject}
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};
