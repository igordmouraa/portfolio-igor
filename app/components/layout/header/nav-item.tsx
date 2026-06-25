'use client';

import { forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

type NavItemProps = {
    label: string;
    href: string;
    isActive: boolean;
    onClick: () => void;
};

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
    ({ label, href, isActive, onClick }, ref) => {
        return (
            <a
                ref={ref}
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                className={cn(
                    'relative font-mono text-sm transition-colors duration-200 py-1 whitespace-nowrap',
                    isActive ? 'text-primary' : 'text-muted hover:text-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
            >
                <span className={cn('transition-colors duration-200', isActive ? 'text-primary' : 'text-primary/60')}>
                    #
                </span>
                {label}
            </a>
        );
    }
);

NavItem.displayName = 'NavItem';
