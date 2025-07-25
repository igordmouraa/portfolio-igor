'use client'

import { motion } from "framer-motion";

type NavItemProps = {
    label: string;
    href: string;
    isActive: boolean;
    onClick: () => void;
};

export const NavItem = ({ label, href, isActive, onClick }: NavItemProps) => {
    const baseClasses = "text-gray-400 flex items-center gap-2 font-medium font-mono hover:text-gray-50 transition-colors relative";
    const activeClasses = isActive ? "text-gray-50" : "";

    return (
        <a
            href={href}
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`${baseClasses} ${activeClasses}`.trim()}
        >
            <span className="text-purple-600">#</span>
            {label}
            {isActive && (
                <motion.div
                    layoutId="header-underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-purple-600"
                />
            )}
        </a>
    );
};