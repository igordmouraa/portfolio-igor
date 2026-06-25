'use client';

import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';

type HorizontalDividerProps = {
    className?: string;
};

export const HorizontalDivider = ({ className }: HorizontalDividerProps) => {
    return (
        <motion.div
            className={cn('w-full h-px bg-gradient-to-r from-transparent via-border to-transparent', className)}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
        />
    );
};
