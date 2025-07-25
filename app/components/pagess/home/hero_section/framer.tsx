'use client'

import {useMemo} from 'react';
import {motion} from "framer-motion";

export const Framer = () => {
    // Gera as propriedades das partículas uma única vez
    const particles = useMemo(() => {
        return Array.from({length: 50}).map((_, i) => ({
            id: `particle-${i}`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 5 + 3,
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
        }));
    }, []);

    // Gera as propriedades das linhas uma única vez
    const lines = useMemo(() => {
        return Array.from({length: 30}).map((_, i) => ({
            id: `line-${i}`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 10}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            duration: Math.random() * 3 + 2,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 bg-primary rounded-full" // Usando a cor do tema
                    style={{top: p.top, left: p.left}}
                    animate={{
                        x: p.x,
                        y: p.y,
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <div className="absolute inset-0">
                {lines.map((l) => (
                    <motion.div
                        key={l.id}
                        className="absolute h-[1px] bg-gradient-to-r from-primary to-transparent" // Usando a cor do tema
                        style={{
                            top: l.top,
                            left: l.left,
                            width: l.width,
                            transform: l.transform
                        }}
                        animate={{opacity: [0, 0.5, 0]}}
                        transition={{
                            duration: l.duration,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}