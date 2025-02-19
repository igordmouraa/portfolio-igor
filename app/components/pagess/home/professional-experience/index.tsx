'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from "@/app/components/section_title"
import { TechBadge } from "@/app/components/tech_badge"

const experiences = [
    {
        company: "Workwolf",
        role: "Desenvolvedor Front-End",
        duration: "out 2022 - Momento atual • (2 anos e 4 meses)",
        description: "Desenvolvimento e manutenção de Interfaces utilizando React, Next, Tailwind, Typescript e Figma. Para o planejamento dos sprints, é utilizado o Jira.",
        technologies: ["Next.js", "Next Auth", "Stitches", "Radix", "Typescript"]
    }
]

export const ProfessionalExperience = () => {
    return (
        <section className="container py-16">
            <SectionTitle title="Experiência Profissional" subtitle="experiências" />

            <div className="mt-12">
                <p className="text-gray-400 mb-16 max-w-[600px]">
                    Estou sempre aberto a novos desafios e projetos emocionantes. Vamos trabalhar juntos para criar soluções incríveis para sua empresa!
                </p>

                <div className="relative">
                    {/* Linha do tempo centralizada */}
                    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gray-800/50 transform -translate-x-1/2" />

                    {experiences.map((experience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative pl-4 mb-16"
                        >
                            {/* Ponto da linha do tempo */}
                            <div className="absolute left-1/2 top-1 w-3 h-3 rounded-full bg-purple-500 border-4 border-[#09090B] z-10 transform -translate-x-1/2" />

                            {/* Conteúdo à direita */}
                            <div className="ml-[calc(50%+20px)] pl-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-gray-100">@{experience.company}</h3>
                                    <h4 className="text-lg text-gray-300">{experience.role}</h4>
                                    <span className="text-sm text-gray-500">{experience.duration}</span>
                                </div>

                                <p className="text-gray-400 mt-4 leading-relaxed">
                                    {experience.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {experience.technologies.map((tech, techIndex) => (
                                        <TechBadge
                                            key={techIndex}
                                            name={tech}
                                            className="bg-purple-900/20 text-purple-400 border border-purple-500/30 text-xs py-1 px-2"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}