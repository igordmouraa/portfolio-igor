'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from './nav-item';
import { useLanguage } from '@/app/i18n/LanguageContext';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';
import { scrollToSection } from '@/app/lib/utils';

const HEADER_OFFSET = 120;
const SCROLL_SPY_LOCK_MS = 900;

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState('home');
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });
    const { t, language, setLanguage } = useLanguage();
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const navRef = useRef<HTMLElement>(null);
    const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
    const scrollSpyLocked = useRef(false);
    const scrollSpyLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => setMounted(true), []);

    const navItems = useMemo(
        () => [
            { label: t.nav.home, href: '#home', id: 'home' },
            { label: t.nav.skills, href: '#skills', id: 'skills' },
            { label: t.nav.projects, href: '#projects', id: 'projects' },
            { label: t.nav.experience, href: '#experience', id: 'experience' },
            { label: t.nav.contact, href: '#contact', id: 'contact' },
        ],
        [t]
    );

    const updateIndicator = useCallback((id: string) => {
        const nav = navRef.current;
        const el = itemRefs.current.get(id);
        if (!nav || !el) return;

        const navRect = nav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        setIndicator({
            left: elRect.left - navRect.left,
            width: elRect.width,
        });
    }, []);

    const resolveActiveSection = useCallback(() => {
        const scrollPosition = window.scrollY + HEADER_OFFSET;

        for (let i = navItems.length - 1; i >= 0; i--) {
            const section = document.getElementById(navItems[i].id);
            if (section && section.offsetTop <= scrollPosition) {
                return navItems[i].id;
            }
        }

        return navItems[0]?.id ?? 'home';
    }, [navItems]);

    const lockScrollSpy = useCallback(() => {
        scrollSpyLocked.current = true;
        if (scrollSpyLockTimer.current) {
            clearTimeout(scrollSpyLockTimer.current);
        }
        scrollSpyLockTimer.current = setTimeout(() => {
            scrollSpyLocked.current = false;
        }, SCROLL_SPY_LOCK_MS);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollSpyLocked.current) return;

            const nextId = resolveActiveSection();
            setActiveId((current) => (current === nextId ? current : nextId));
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [resolveActiveSection]);

    useEffect(() => {
        updateIndicator(activeId);
    }, [activeId, updateIndicator, t]);

    useEffect(() => {
        const handleResize = () => updateIndicator(activeId);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeId, updateIndicator]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        return () => {
            if (scrollSpyLockTimer.current) {
                clearTimeout(scrollSpyLockTimer.current);
            }
        };
    }, []);

    const handleLinkClick = useCallback(
        (id: string) => {
            setIsMobileMenuOpen(false);
            setActiveId(id);
            lockScrollSpy();
            scrollToSection(id);
            requestAnimationFrame(() => updateIndicator(id));
        },
        [lockScrollSpy, updateIndicator]
    );

    const setItemRef = useCallback((id: string, el: HTMLAnchorElement | null) => {
        if (el) {
            itemRefs.current.set(id, el);
        } else {
            itemRefs.current.delete(id);
        }
    }, []);

    return (
        <>
            <motion.header
                initial={false}
                className="fixed top-0 w-full z-40 h-24 flex items-center bg-background/50 backdrop-blur-md border-b border-border/50"
            >
                <div className="container flex items-center justify-between">
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick('home');
                        }}
                    >
                        <motion.div
                            className="flex items-center gap-2 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-2xl text-foreground font-display font-bold">Igor Moura</span>
                            <span className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono">
                                {'</>'}
                            </span>
                        </motion.div>
                    </a>

                    <nav ref={navRef} className="hidden lg:flex items-center gap-8 relative pb-1">
                        {navItems.map((item) => (
                            <NavItem
                                {...item}
                                key={item.id}
                                ref={(el) => setItemRef(item.id, el)}
                                isActive={activeId === item.id}
                                onClick={() => handleLinkClick(item.id)}
                            />
                        ))}

                        {indicator.width > 0 && (
                            <motion.span
                                className="absolute bottom-0 h-0.5 bg-primary rounded-full pointer-events-none"
                                animate={{ left: indicator.left, width: indicator.width }}
                                initial={false}
                                transition={{ type: 'spring', stiffness: 420, damping: 38, mass: 0.8 }}
                            />
                        )}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <button
                            onClick={() => setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR')}
                            className="text-muted hover:text-primary transition-colors flex items-center gap-2"
                            aria-label={t.a11y.toggleLanguage}
                        >
                            <MdLanguage size={20} />
                            <span className="text-sm font-medium">{language === 'pt-BR' ? 'PT' : 'EN'}</span>
                        </button>

                        <button
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                            className="text-muted hover:text-primary transition-colors"
                            aria-label={t.a11y.toggleTheme}
                        >
                            {mounted && (resolvedTheme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />)}
                        </button>
                    </div>

                    <div className="lg:hidden">
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 relative"
                            aria-label={isMobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
                        >
                            <motion.div
                                className="w-6 h-0.5 bg-foreground rounded-full"
                                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}
                                animate={isMobileMenuOpen ? 'open' : 'closed'}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="w-6 h-0.5 bg-foreground rounded-full"
                                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                                animate={isMobileMenuOpen ? 'open' : 'closed'}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.div
                                className="w-6 h-0.5 bg-foreground rounded-full"
                                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}
                                animate={isMobileMenuOpen ? 'open' : 'closed'}
                                transition={{ duration: 0.3 }}
                            />
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
                        className="fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center z-30 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <nav className="flex flex-col items-center gap-10">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLinkClick(item.id);
                                    }}
                                    className={
                                        activeId === item.id
                                            ? 'text-2xl text-primary font-display font-semibold'
                                            : 'text-2xl text-muted hover:text-primary transition-colors font-display'
                                    }
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                                >
                                    <span className="text-primary/60">#</span>
                                    {item.label}
                                </motion.a>
                            ))}

                            <div className="flex items-center gap-8 mt-8">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR');
                                    }}
                                    className="text-muted hover:text-primary transition-colors flex items-center gap-2"
                                    aria-label={t.a11y.toggleLanguage}
                                >
                                    <MdLanguage size={24} />
                                    <span className="text-lg font-medium">{language === 'pt-BR' ? 'PT' : 'EN'}</span>
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
                                    }}
                                    className="text-muted hover:text-primary transition-colors"
                                    aria-label={t.a11y.toggleTheme}
                                >
                                    {mounted && (resolvedTheme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />)}
                                </button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
