'use client'

import {motion} from 'framer-motion'
import {SectionTitle} from "@/app/components/section_title"
import {Button} from "@/app/components/button"
import {TbBrandGithub} from "react-icons/tb"
import {FiGlobe} from "react-icons/fi"
import Image from "next/image"
import {HorizontalDivider} from "@/app/components/divider";

const projects = [
    {
        title: "PetExpress - Sistema de gerenciador de Pet Shops",
        description: "Este sistema para pet shops foi construído com foco em proporcionar uma experiência fluida e completa para gerenciar pets, produtos, agendamentos, pedidos e pagamentos – tudo em um só lugar. Com uma interface amigável e intuitiva, o sistema possibilita que os usuários naveguem facilmente entre funcionalidades, sempre com foco na praticidade e na eficiência.",
        technologies: ["React", "Vite", "Node.js", "Javascript", "Sequelize", "JWT", "MySQL", "Firebase", "Github Actions", "CI/CD", "Vercel"],
        github: "https://github.com/TypeBlast/projectWeb",
        demo: "https://petexpress-typeblast.vercel.app/",
        image: "/images/petexpress.png"
    },
    {
        title: "Projeto Marvel Comics",
        description: "O projeto foi estruturado de forma modular, com uma organização clara de pastas e componentes reutilizáveis. Além disso, a integração com a API da Marvel foi feita de forma eficiente, garantindo uma experiência fluida para o usuário.",
        technologies: ["Next.js", "React", "TypeScript", "Marvel API", "Framer Motion", "Lucide Icons", "Tailwind CSS"],
        github: "https://github.com/igordmouraa/marvel-comics",
        demo: "https://marvel-comics-lac.vercel.app/",
        image: "/images/marvel-pic.png"
    },

]

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
}

const projectVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: 'spring', stiffness: 120, damping: 20}
    }
}

export const HighlightedProjects = () => {
    return (
        <section className="container py-16" id="projects">
            <motion.div
                initial={{opacity: 0, x: -50}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
                viewport={{once: true}}
            >
                <SectionTitle title="Projetos em destaque" subtitle="destaques"/>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 gap-16 mt-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={projectVariants}
                        className="flex flex-col md:flex-row gap-8 items-center"
                    >
                        {/* Lado esquerdo - Imagem */}
                        <motion.div
                            className="md:w-1/2 relative group"
                            whileHover={{scale: 1.05}}
                            transition={{type: 'spring', stiffness: 200}}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="w-full h-64 object-cover rounded-xl shadow-2xl"
                            />
                        </motion.div>

                        {/* Lado direito - Conteúdo */}
                        <div className="md:w-1/2 space-y-6">
                            <h3 className="text-3xl font-bold text-gray-100">{project.title}</h3>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                    <span
                                        key={techIndex}
                                        className="text-sm py-1 px-3 bg-transparent border border-purple-500/20 text-purple-400 rounded-full"
                                    >
                    {tech}
                  </span>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Button
                                    className="text-gray-100 hover:text-purple-400 bg-transparent hover:bg-purple-500/10 px-6 py-3"
                                    href={project.github}
                                >
                                    <TbBrandGithub className="mr-2 text-lg"/>
                                    Repositório
                                </Button>

                                <Button
                                    className="text-gray-100 hover:text-purple-400 bg-transparent hover:bg-purple-500/10 px-6 py-3"
                                    href={project.demo}
                                >
                                    <FiGlobe className="mr-2 text-lg"/>
                                    Ver projeto
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <HorizontalDivider/>
        </section>
    )
}