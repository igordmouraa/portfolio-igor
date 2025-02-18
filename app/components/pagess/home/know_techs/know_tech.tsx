import {ReactNode} from "react";
import {getRelativeTimeString} from "@/app/utils/get-relative-time";

type KnowTechProps = {
    tech: {
        icon: ReactNode
        name: string
        startDate: string
    }
}

export const KnowTech = ({tech}: KnowTechProps) => {
    const relativeTime = getRelativeTimeString(new Date(tech.startDate), 'pt-BR')

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <p>{tech.name}</p>
                {tech.icon}
            </div>
            <span>{relativeTime}</span>

        </div>
    )
}