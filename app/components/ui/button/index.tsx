import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';

type ButtonProps = (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
    href?: string;
    as: 'button' | 'a';
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    target?: string;
};

const variantClasses = {
    primary: 'bg-primary text-white hover:opacity-90 shadow-glow',
    secondary: 'bg-surface border border-border text-foreground hover:border-primary hover:text-primary',
    ghost: 'bg-transparent text-foreground hover:bg-primary/10 hover:text-primary',
};

export const Button = ({ children, className, href, variant = 'primary', target, ...props }: ButtonProps) => {
    const combinedClasses = cn(
        'px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 font-medium',
        variantClasses[variant],
        className
    );

    if (href) {
        const isExternal = href.startsWith('http') || href.startsWith('mailto:');

        if (isExternal) {
            return (
                <a href={href} className={combinedClasses} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {children}
                </a>
            );
        }

        return (
            <Link href={href} className={combinedClasses} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
};
