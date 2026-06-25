import { cn } from '@/app/lib/utils';

type TechBadgeProps = {
    name: string;
    className?: string;
};

export const TechBadge = ({ name, className }: TechBadgeProps) => {
    return (
        <span
            className={cn(
                'text-sm py-1.5 px-3 bg-primary/10 text-primary border border-primary/20 rounded-lg font-medium',
                className
            )}
        >
            {name}
        </span>
    );
};
