'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

type NavItemProps = {
    label: string;
    href: string;
    delay?: number;
};

export const NavItem = ({ label, href, delay = 0 }: NavItemProps) => {
    const pathName = usePathname();
    const isActive = pathName === href;

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay }}
        >
            <Link
                href={href}
                className={cn(
                    "text-gray-400 flex items-center gap-2 font-medium font-mono hover:text-gray-50 transition-colors relative",
                    isActive && "text-gray-50"
                )}
            >
                <span className="text-purple-600">#</span>
                {label}
                {isActive && (
                    <motion.span
                        layoutId="underline"
                        className="absolute left-0 top-full mt-1 h-[2px] w-full bg-purple-600"
                    />
                )}
            </Link>
        </motion.div>
    );
};