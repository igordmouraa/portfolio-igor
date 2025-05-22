'use client'

import {motion} from 'framer-motion'
import Image from "next/image"
import {TechBadge} from "@/app/components/tech_badge"
import {Button} from "@/app/components/button"
import {HiArrowNarrowRight, MdOutlineEmail, TbBrandGithub, TbBrandInstagram, TbBrandLinkedin} from "react-icons/all"
import Typewriter from 'typewriter-effect'
import {Framer} from "@/app/components/pagess/home/hero_section/framer" // Seu componente Framer

const Mock_Contacts = [
    {
        url: 'https://github.com/igordmouraa',
        icon: <TbBrandGithub size={24}/>,
        label: 'GitHub'
    },
    {
        url: 'https://www.linkedin.com/in/igordmoura/',
        icon: <TbBrandLinkedin size={24}/>,
        label: 'LinkedIn'
    },
    {
        url: 'mailto:igordmoura_@hotmail.com',
        icon: <MdOutlineEmail size={24}/>,
        label: 'Email'
    },
    {
        url: 'https://www.instagram.com/igordmouraa/',
        icon: <TbBrandInstagram size={24}/>,
        label: 'Instagram'
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

const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {type: 'spring', stiffness: 100}
    }
}

export const HeroSection = () => {
    const handleContact = () => {
        document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <section className="w-full lg:h-[755px] flex flex-col justify-end pb-10 sm:pb-32 py-32 lg:pb-[110px] relative">
            <Framer/>

            <div className="container flex items-start justify-between flex-col-reverse lg:flex-row">
                <motion.div
                    className="w-full lg:max-w-[530px] z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        className="font-mono text-purple-400 mb-2"
                        variants={itemVariants}
                    >
                        Olá, meu nome é
                    </motion.p>

                    <motion.h1
                        className="text-4xl font-medium text-gray-50"
                        variants={itemVariants}
                    >
                        <Typewriter
                            options={{
                                strings: ['Igor Moura'],
                                autoStart: true,
                                loop: true,
                                cursor: '_',
                                delay: 100
                            }}
                        />
                    </motion.h1>

                    <motion.p
                        className="text-gray-300 my-6 text-sm sm:text-base"
                        variants={itemVariants}
                    >
                        Sou um desenvolvedor full-stack em constante evolução, com foco em Node.js, React e TypeScript.
                        Busco contribuir com soluções escaláveis e de alta qualidade em projetos desafiadores.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-x-2 gap-y-3"
                        variants={containerVariants}
                    >
                        {['Node.js','NestJs','Typescript', 'PostgreSQL', 'Firebase', 'Docker', 'Next.js', 'Tailwind CSS', 'Vercel']
                            .map((tech, index) => (
                                <TechBadge
                                    key={index}
                                    name={tech}
                                    className="text-xs"
                                />
                            ))}
                    </motion.div>

                    <motion.div
                        className="mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <Button
                                className="w-max hover:bg-purple-800 group border border-purple-400"
                                onClick={handleContact}
                            >
                                Entre em contato
                                <HiArrowNarrowRight
                                    className="ml-2 transform group-hover:translate-x-1 transition-transform"/>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-3 mt-4 sm:mt-0"
                            variants={containerVariants}
                        >
                            {Mock_Contacts.map((contact, index) => (
                                <motion.a
                                    key={`contact-${index}`}
                                    href={contact.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-purple-400 transition-colors"
                                    variants={itemVariants}
                                    aria-label={`Visitar perfil no ${contact.label}`}
                                    whileHover={{scale: 1.2}}
                                    whileTap={{scale: 0.9}}
                                >
                                    {contact.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative w-[300px] h-[300px] lg:w-[420px] lg:h-[404px] mb-6 lg:mb-0 z-10"
                    variants={itemVariants}
                >
                    <Image
                        src="/images/igor-pic.png"
                        alt="Foto de Igor Moura"
                        layout="fill"
                        className="rounded-lg object-cover shadow-2xl"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    )
}