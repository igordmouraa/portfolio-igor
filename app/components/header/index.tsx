'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { NavItem } from "@/app/components/header/nav_item";

const nav_items = [
    { label: 'Home', href: '/' },
    { label: 'Projetos', href: '/projects' }
];

// Animations configuration
const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.3
        }
    }
};

export const Header = () => {
    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="fixed top-0 w-full z-50 h-24 bg-gradient-to-b from-gray-900/80 to-transparent backdrop-blur-sm"
        >
            <div className="container mx-auto px-4 h-full flex justify-between items-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl text-gray-400 font-bold   ">
              Igor Moura
            </span>
                        <span className=" text-xl bg-gradient-to-r from-purple-400 to-pink-600  bg-clip-text text-transparent font-mono transition-transform group-hover:rotate-180">
              {"</>"}
            </span>
                    </Link>
                </motion.div>

                <nav className="flex items-center gap-6">
                    {nav_items.map((item, index) => (
                        <NavItem
                            {...item}
                            key={item.label}
                            delay={index * 0.1} // Stagger effect
                        />
                    ))}
                </nav>
            </div>
        </motion.header>
    );
};