'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "./nav_item";

const NAV_ITEMS = [
    { label: 'Home', href: '#home' },
    { label: 'Tecnologias', href: '#techs' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Experiência', href: '#experience' }
];

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('Home');

    // Efeito para detectar o scroll e atualizar o link ativo
    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_ITEMS.map(item => document.querySelector(item.href) as HTMLElement);
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveLink(NAV_ITEMS[i].label);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // MELHORIA: Efeito para bloquear a rolagem do body quando o menu está aberto
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Função de limpeza para garantir que o scroll volte ao normal
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    const handleLinkClick = (href: string, label: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveLink(label);
        }
    };

    return (
        <>
            <motion.header
                // CORREÇÃO: Alterada a animação para 'opacity' para evitar bugs de layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 w-full z-40 h-24 flex items-center bg-gray-950/50 backdrop-blur-md"
            >
                <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('#home', 'Home'); }}>
                        <motion.div
                            className="flex items-center gap-2 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-2xl text-gray-100 font-bold">Igor Moura</span>
                            <span className="text-xl bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent font-mono transition-transform duration-500 group-hover:rotate-180">
                                {"</>"}
                            </span>
                        </motion.div>
                    </a>

                    <nav className="hidden lg:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <NavItem
                                {...item}
                                key={item.label}
                                isActive={activeLink === item.label}
                                onClick={() => handleLinkClick(item.href, item.label)}
                            />
                        ))}
                    </nav>

                    <div className="lg:hidden">
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            // z-50 para garantir que o botão fique na camada mais alta
                            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 relative"
                            aria-label="Abrir menu"
                        >
                            <motion.div className="w-6 h-0.5 bg-gray-100 rounded-full" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }} animate={isMobileMenuOpen ? "open" : "closed"} transition={{ duration: 0.3 }} />
                            <motion.div className="w-6 h-0.5 bg-gray-100 rounded-full" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} animate={isMobileMenuOpen ? "open" : "closed"} transition={{ duration: 0.2 }} />
                            <motion.div className="w-6 h-0.5 bg-gray-100 rounded-full" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }} animate={isMobileMenuOpen ? "open" : "closed"} transition={{ duration: 0.3 }} />
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        // z-30 para a sobreposição ficar abaixo do header (que é z-40)
                        className="fixed inset-0 bg-gray-950/80 backdrop-blur-md flex flex-col items-center justify-center z-30 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)} // Permite fechar clicando fora
                    >
                        <nav className="flex flex-col items-center gap-10">
                            {NAV_ITEMS.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Impede que o clique no link feche o menu
                                        handleLinkClick(item.href, item.label);
                                    }}
                                    className="text-2xl text-gray-300 hover:text-purple-400 transition-colors"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};