'use client'

import {motion} from 'framer-motion';
import {cn} from "@/app/lib/utils";

type HorizontalDividerProps = {
    className?: string
}

export const HorizontalDivider = ({className}: HorizontalDividerProps) => {
    return (
        <motion.div
            className={cn('w-full my-8 border-b border-b-gray-800', className)}
            initial={{opacity: 0, scaleX: 0}}
            whileInView={{opacity: 1, scaleX: 1}}
            transition={{duration: 0.5, ease: 'easeOut'}}
            viewport={{once: true}}
            style={{transformOrigin: 'center'}}
        />
    )
}