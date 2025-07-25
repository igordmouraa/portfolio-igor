'use client'

import {motion} from 'framer-motion';
import {TechBadge} from '../tech_badge';
import {Experience} from '@/app/lib/experiences';
import {formatExperienceDuration} from '@/app/lib/utils';

type ExperienceItemProps = {
    experience: Experience;
};

export const ExperienceItem = ({experience}: ExperienceItemProps) => {
    const {company, role, description, technologies, startDate, endDate} = experience;
    const duration = formatExperienceDuration(startDate, endDate);

    return (
        <motion.div
            className="grid grid-cols-[40px,1fr] md:grid-cols-[1fr,40px,1fr] gap-4 md:gap-10"
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            viewport={{once: true}}
        >
            <div className="hidden md:flex flex-col items-end">
                <p className="text-lg text-gray-400 text-right">{role}</p>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-purple-500 w-4 h-4 border-4 border-gray-900"/>
                <div className="h-full w-[1px] bg-gray-700"/>
            </div>

            <div className="flex flex-col gap-2 pb-8">
                <div className="flex flex-col">
                    <p className="text-lg text-gray-400 md:hidden">{role}</p> {/* Visível apenas no mobile */}
                    <h3 className="text-xl font-bold text-gray-50">@{company}</h3>
                    <span className="text-sm text-gray-500">{duration}</span>
                </div>
                <p className="text-gray-400 text-base leading-relaxed" style={{whiteSpace: 'pre-line'}}>
                    {description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {technologies.map((tech) => (
                        <TechBadge key={`${company}-${tech}`} name={tech}/>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};