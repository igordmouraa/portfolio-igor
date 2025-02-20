import {ReactNode} from "react";
import {getRelativeTimeString} from "@/app/utils/get-relative-time";

type KnowTechProps = {
    tech: {
        icon: ReactNode;
        name: string;
        startDate: string;
    };
    className?: string;
}

export const KnowTech = ({tech}: KnowTechProps) => {
    const relativeTime = getRelativeTimeString(new Date(tech.startDate), 'pt-BR',
        ).replace('há', '')

    return (
        <div className='p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col hover:text-purple-500 hover:bg-gray-600/30'>
            <div className='flex items-center justify-between '>
                <p className={'font-medium'}>{tech.name}</p>
                {tech.icon}
            </div>
            <span>{relativeTime} de experiência</span>

        </div>
    )
}