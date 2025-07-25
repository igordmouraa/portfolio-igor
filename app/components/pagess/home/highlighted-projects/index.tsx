'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from "@/app/components/section_title"
import { HorizontalDivider } from "@/app/components/divider";
import { ProjectCard } from '@/app/components/project_card'; // Importe o novo componente
import { projects } from '@/app/lib/projects'; // Importe os dados

export const HighlightedProjects = () => {
    return (
        <section className="container py-16 sm:py-24" id="projects">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <SectionTitle title="Projetos em Destaque" subtitle="destaques" />
            </motion.div>

            <HorizontalDivider className="my-12" />

            <div className="flex flex-col gap-16 sm:gap-24">
                {projects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                ))}
            </div>
        </section>
    )
}