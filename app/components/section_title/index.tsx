import {cn} from "@/app/lib/utils";

type SectionTitleProps = {
    title: string;
    subtitle: string;
    className?: string;
}

export const SectionTitle = ({title, subtitle, className}: SectionTitleProps) => {
    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <span className='text-sm text-purple-600 font-mono'>{`../${subtitle}`}</span>
            <h3 className='text-3xl font-medium'>{title}</h3>
        </div>
    )
}