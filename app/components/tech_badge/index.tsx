type TechBadgeProps = {
    name: string;
}

export const TechBadge = ({name} : TechBadgeProps) => {
    return (
        <span className={'text-purple-600 bg-purple-950/80 text-sm py-1 px-3 rounded-lg'}>
            {name}
        </span>
    )
}