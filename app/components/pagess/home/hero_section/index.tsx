'use client'

import { motion } from 'framer-motion'
import Image from "next/image"
import Typewriter from 'typewriter-effect'
import { TechBadge } from "@/app/components/tech_badge"
import { Button } from "@/app/components/button"
import { Framer } from "./framer"
import { HiArrowNarrowRight } from 'react-icons/hi'
import { MdOutlineEmail } from 'react-icons/md'
import { TbBrandGithub, TbBrandInstagram, TbBrandLinkedin } from 'react-icons/tb'

const MOCK_CONTACTS = [
    { url: 'https://github.com/igordmouraa', icon: TbBrandGithub, label: 'GitHub' },
    { url: 'https://www.linkedin.com/in/igordmoura/', icon: TbBrandLinkedin, label: 'LinkedIn' },
    { url: 'mailto:igordmoura_@hotmail.com', icon: MdOutlineEmail, label: 'Email' },
    { url: 'https://www.instagram.com/igordmouraa/', icon: TbBrandInstagram, label: 'Instagram' },
]

const TECHS = ['Node.js', 'NestJs', 'Typescript', 'PostgreSQL', 'Firebase', 'Docker', 'Next.js', 'Tailwind CSS', 'Vercel'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
}

export const HeroSection = () => {
    const handleContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <section className="w-full min-h-screen flex flex-col justify-center py-32 lg:py-0 relative">
            <Framer />

            <div className="container flex items-center justify-between flex-col-reverse lg:flex-row">
                <motion.div
                    className="w-full lg:max-w-[530px] z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p className="font-mono text-primary mb-2" variants={itemVariants}>
                        Olá, meu nome é
                    </motion.p>

                    <motion.h1 className="text-4xl font-medium" variants={itemVariants}>
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

                    <motion.p className="text-gray-300 my-6 text-sm sm:text-base" variants={itemVariants}>
                        Sou um desenvolvedor full-stack em constante evolução, com foco em Node.js, React e TypeScript. Busco contribuir com soluções escaláveis e de alta qualidade em projetos desafiadores.
                    </motion.p>

                    <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
                        {TECHS.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                        ))}
                    </motion.div>

                    <motion.div className="mt-6 lg:mt-10 flex items-center gap-5" variants={containerVariants}>
                        <motion.div variants={itemVariants}>
                            <Button as="button" className="w-max group" onClick={handleContact}>
                                Entre em contato
                                <HiArrowNarrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>

                        <motion.div className="flex items-center gap-4" variants={containerVariants}>
                            {MOCK_CONTACTS.map((contact) => {
                                const Icon = contact.icon;
                                return (
                                    <motion.a
                                        key={contact.label}
                                        href={contact.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-primary transition-colors"
                                        variants={itemVariants}
                                        aria-label={`Visitar ${contact.label}`}
                                        whileHover={{ scale: 1.2, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Icon size={24} />
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative w-[300px] h-[300px] lg:w-[420px] lg:h-[404px] mb-6 lg:mb-0 z-10"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src="/images/igor-pic.png"
                        alt="Foto de Igor Moura"
                        fill
                        className="rounded-lg object-cover"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    )
}