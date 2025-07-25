'use client'

import {motion} from 'framer-motion';
import {cn} from "@/app/lib/utils";

type SectionTitleProps = {
    title: string;
    subtitle: string;
    className?: string;
}

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.2}
    }
};

const subtitleVariants = {
    hidden: {opacity: 0, x: -20},
    visible: {opacity: 1, x: 0, transition: {duration: 0.5, ease: 'easeOut'}}
};

const titleVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5, ease: 'easeOut'}}
};

export const SectionTitle = ({title, subtitle, className}: SectionTitleProps) => {
    return (
        <motion.div
            className={cn('flex flex-col gap-2', className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
        >
            <motion.span
                className='text-sm text-primary font-mono'
                variants={subtitleVariants}
            >
                {`../${subtitle}`}
            </motion.span>
            <motion.h3
                className='text-3xl font-medium'
                variants={titleVariants}
            >
                {title}
            </motion.h3>
        </motion.div>
    )
}