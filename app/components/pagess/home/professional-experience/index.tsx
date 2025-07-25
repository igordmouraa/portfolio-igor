'use client'

import {motion} from 'framer-motion'
import {SectionTitle} from "@/app/components/section_title"
import {TechBadge} from "@/app/components/tech_badge"

const experiences = [
    {
        company: "N2 Sistemas - Soluções comerciais e empresariais",
        role: "Estagiário de Desenvolvimento de Software",
        duration: "Julho 2025 - Momento Atual • (1 mês)",
        description: "Atuação no desenvolvimento de soluções desktop com Pascal e Lazarus, e desenvolvimento de banco de dados com SQL Server.",
        technologies: ['Pascal', 'Lazarus', 'SQL Server', 'Linux']
    },
    {
        company: "Freelancer",
        role: "Desenvolvedor Fullstack",
        duration: "Março 2023 - Momento atual • (1 ano e 11 meses)",
        description: "Atuação no desenvolvimento e manutenção de interfaces web responsivas utilizando React, Next.js, Tailwind CSS e TypeScript, com prototipação feita no Figma. No backend, desenvolvimento de APIs escaláveis com Node.js e NestJS, integrando bancos de dados como PostgreSQL e Firebase. Utilização de Docker para ambientes isolados e Vercel para deploys ágeis.\n" +
            "Planejamento de sprints e versionamento realizados via GitHub Projects e Git.",
        technologies: ['Node.js', 'NestJs', 'Typescript', 'PostgreSQL', 'Firebase', 'Docker', 'Next.js', 'Tailwind CSS', 'Vercel']
    }

]

export const ProfessionalExperience = () => {
    return (
        <section className="container py-12 md:py-16">
            <SectionTitle title="Experiência Profissional" subtitle="experiências"/>

            <div className="mt-8 md:mt-12">
                <p className="text-gray-400 mb-8 md:mb-12 max-w-[600px] text-sm md:text-base">
                    Estou aberto a novos desafios e projetos que façam a diferença. Busco uma posição como Desenvolvedor
                    Full Stack onde possa contribuir para a criação de aplicações escaláveis e gerar impacto real nos
                    resultados da empresa.
                </p>

                <div className="relative">
                    <div
                        className="absolute left-4 md:left-1/2 top-0 w-[2px] h-full bg-gray-800/50 md:transform md:-translate-x-1/2"/>

                    {experiences.map((experience, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: index * 0.2}}
                            className="relative pl-8 md:pl-0 mb-12 md:mb-16"
                        >
                            <div
                                className="absolute left-0 md:left-1/2 top-1 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#09090B] z-10 md:transform md:-translate-x-1/2"/>

                            <div className="md:ml-[calc(50%+24px)]">
                                <div className="space-y-1 md:space-y-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-100">@{experience.company}</h3>
                                    <h4 className="text-base md:text-lg text-gray-300">{experience.role}</h4>
                                    <span className="text-xs md:text-sm text-gray-500">{experience.duration}</span>
                                </div>

                                <p className="text-gray-400 mt-3 md:mt-4 text-sm md:text-base leading-relaxed">
                                    {experience.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
                                    {experience.technologies.map((tech, techIndex) => (
                                        <TechBadge
                                            key={techIndex}
                                            name={tech}
                                            className="bg-purple-900/20 text-purple-400 border border-purple-500/30 text-xs px-2 py-1"
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