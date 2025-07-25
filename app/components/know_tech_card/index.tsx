'use client'

import {getRelativeTime} from '@/app/lib/utils';
import {Tech} from '@/app/lib/techs';

type KnowTechCardProps = {
    tech: Tech;
};

export const KnowTechCard = ({tech}: KnowTechCardProps) => {
    const Icon = tech.icon;
    const relativeTime = getRelativeTime(tech.startDate, 'pt-BR');

    return (
        <div
            className="group flex flex-col gap-3 p-6 bg-gray-900/80 border border-transparent rounded-lg hover:bg-gray-800/60 hover:border-purple-400 transition-all">
            <div className="flex items-center justify-between">
                <p className="font-medium text-gray-50 group-hover:text-purple-400 transition-colors">{tech.name}</p>
                <Icon className="text-3xl sm:text-4xl text-gray-500 group-hover:text-purple-400 transition-colors"/>
            </div>
            <span className="text-sm text-gray-400">{relativeTime} de experiência</span>
        </div>
    );
};