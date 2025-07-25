'use client'

import {motion} from 'framer-motion'
import {SectionTitle} from "@/app/components/section_title"
import {KnowTechCard} from '@/app/components/know_tech_card'
import {techs} from '@/app/lib/techs'

const containerVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.05}}
}

const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {y: 0, opacity: 1}
}

export const KnowTechs = () => {
    return (
        <section className="container py-16 sm:py-24" id="techs">
            <motion.div
                initial={{opacity: 0, x: -50}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
                viewport={{once: true}}
            >
                <SectionTitle title="Conhecimentos" subtitle="competências"/>
            </motion.div>

            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
            >
                {techs.map((tech) => (
                    <motion.div key={tech.name} variants={itemVariants}>
                        <KnowTechCard tech={tech}/>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}