'use client'
import { motion } from 'framer-motion'
import { SectionTitle } from "@/app/components/section_title"
import { KnowTech } from "@/app/components/pagess/home/know_techs/know_tech"
import {
    TbBrandDocker, TbBrandFigma,
    TbBrandFirebase, TbBrandGit,
    TbBrandJavascript,
    TbBrandMongodb,
    TbBrandMysql,
    TbBrandNextjs, TbBrandReact, TbBrandReactNative, TbBrandTailwind,
    TbBrandTypescript, TbBrandVercel
} from "react-icons/tb"
import { SiGooglecloud, SiNestjs, SiNodedotjs } from "react-icons/all"
import React from "react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
}

const techs = [
    { icon: <SiNodedotjs />, name: 'Node.js', startDate: '2023-03-10' },
    { icon: <TbBrandTypescript />, name: 'Typescript', startDate: '2024-05-10' },
    { icon: <TbBrandJavascript />, name: 'Javascript', startDate: '2023-03-10' },
    { icon: <TbBrandFirebase />, name: 'Firebase', startDate: '2024-05-10' },
    { icon: <TbBrandMongodb />, name: 'Mongo DB', startDate: '2023-07-10' },
    { icon: <TbBrandMysql />, name: 'MySQL', startDate: '2023-07-10' },
    { icon: <SiNestjs />, name: 'Nest.js', startDate: '2024-03-10' },
    { icon: <TbBrandDocker />, name: 'Docker', startDate: '2024-03-10' },
    { icon: <TbBrandReact />, name: 'React', startDate: '2023-07-10' },
    { icon: <TbBrandNextjs />, name: 'Next.js', startDate: '2024-05-10' },
    { icon: <TbBrandTailwind />, name: 'Tailwind CSS', startDate: '2023-07-10' },
    { icon: <TbBrandReactNative />, name: 'React Native', startDate: '2024-02-20' },
    { icon: <TbBrandGit />, name: 'Git', startDate: '2023-03-10' },
    { icon: <TbBrandVercel />, name: 'Vercel', startDate: '2024-07-10' },
    { icon: <SiGooglecloud />, name: 'Google Cloud', startDate: '2024-02-20' },
    { icon: <TbBrandFigma />, name: 'Figma', startDate: '2023-03-20' }
]

export const KnowTechs = () => {
    return (
        <section className="container py-16">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <SectionTitle title="Conhecimentos" subtitle="Competências" />
            </motion.div>

            <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {techs.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <KnowTech
                            tech={{
                                ...tech,
                                icon: React.cloneElement(tech.icon, {
                                    className: 'text-4xl transition-colors group-hover:text-purple-400'
                                })
                            }}
                            className="group h-full p-6 bg-[#0a0a0a] border border-gray-800 hover:border-purple-500/30 rounded-lg transition-all cursor-pointer"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}