'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';
import { TbBrandGithub } from 'react-icons/tb';
import { Button } from '@/app/components/ui/button';
import { Project } from '@/app/lib/projects';
import { useLanguage, interpolate } from '@/app/i18n/LanguageContext';

type ProjectCardProps = {
    project: Project;
    index: number;
};

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const { t } = useLanguage();
    const isEven = index % 2 === 0;
    const animationDirection = isEven ? -100 : 100;
    const projectContent = t.projects[index] || project;

    const cardVariants = {
        hidden: { opacity: 0, x: animationDirection },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <motion.div
            className={`flex flex-col lg:flex-row gap-10 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
        >
            <motion.div
                className="w-full lg:w-1/2 h-80 sm:h-96 relative rounded-xl overflow-hidden group border border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <a
                    href={project.demo || project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={interpolate(t.a11y.viewProject, { title: projectContent.title })}
                >
                    <Image
                        src={project.image}
                        alt={interpolate(t.a11y.projectThumbnail, { title: projectContent.title })}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                </a>
            </motion.div>

            <div className="w-full lg:w-1/2">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                    {projectContent.title}
                </h3>
                <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
                    {projectContent.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                        <span
                            key={`${project.title}-${tech}`}
                            className="text-sm py-1 px-3 bg-transparent border border-primary/20 text-primary rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4">
                    <Button
                        as="a"
                        href={project.github}
                        target="_blank"
                        variant="ghost"
                        className="px-6 py-3 flex items-center gap-2"
                    >
                        <TbBrandGithub className="text-lg" />
                        {t.projectsSection.repository}
                    </Button>
                    {project.demo && (
                        <Button
                            as="a"
                            href={project.demo}
                            target="_blank"
                            variant="ghost"
                            className="px-6 py-3 flex items-center gap-2"
                        >
                            <FiGlobe className="text-lg" />
                            {t.projectsSection.viewProject}
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
