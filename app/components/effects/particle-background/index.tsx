'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { cn } from '@/app/lib/utils';

type ParticleBackgroundProps = {
    variant?: 'hero' | 'section' | 'subtle';
    className?: string;
};

type VariantConfig = {
    particles: number;
    linkDistance: number;
    speed: number;
    aurora: boolean;
    shootingStars: boolean;
    mouseInfluence: number;
};

const VARIANT_CONFIG: Record<NonNullable<ParticleBackgroundProps['variant']>, VariantConfig> = {
    hero: {
        particles: 72,
        linkDistance: 140,
        speed: 0.35,
        aurora: true,
        shootingStars: true,
        mouseInfluence: 0.018,
    },
    section: {
        particles: 48,
        linkDistance: 115,
        speed: 0.28,
        aurora: true,
        shootingStars: false,
        mouseInfluence: 0.012,
    },
    subtle: {
        particles: 24,
        linkDistance: 90,
        speed: 0.2,
        aurora: false,
        shootingStars: false,
        mouseInfluence: 0,
    },
};

type Rgb = { r: number; g: number; b: number };

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    pulse: number;
    pulseSpeed: number;
    accentMix: number;
};

type ShootingStar = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
};

type RuntimeConfig = VariantConfig & {
    particleCount: number;
    linkDistance: number;
    mouseInfluence: number;
    shootingStars: boolean;
};

function parseRgb(value: string): Rgb {
    const [r, g, b] = value.trim().split(/\s+/).map(Number);
    return { r: r || 75, g: g || 117, b: b || 255 };
}

function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
    return {
        r: Math.round(a.r + (b.r - a.r) * t),
        g: Math.round(a.g + (b.g - a.g) * t),
        b: Math.round(a.b + (b.b - a.b) * t),
    };
}

function rgba(color: Rgb, alpha: number) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function isCoarsePointer() {
    return window.matchMedia('(pointer: coarse)').matches;
}

function isMobileViewport(width: number) {
    return width < 768;
}

function resolveRuntimeConfig(base: VariantConfig, width: number): RuntimeConfig {
    const mobile = isMobileViewport(width) || isCoarsePointer();
    const density = mobile ? 0.45 : 1;

    return {
        ...base,
        particleCount: Math.max(16, Math.round(base.particles * density)),
        linkDistance: mobile ? Math.min(base.linkDistance, width * 0.26) : base.linkDistance,
        mouseInfluence: mobile ? 0 : base.mouseInfluence,
        shootingStars: mobile ? false : base.shootingStars,
    };
}

function createParticles(count: number, width: number, height: number, speed: number): Particle[] {
    return Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = (Math.random() * 0.5 + 0.3) * speed;

        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            radius: Math.random() < 0.22 ? Math.random() * 1.6 + 1.2 : Math.random() * 0.9 + 0.35,
            opacity: Math.random() * 0.4 + 0.22,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.018 + 0.006,
            accentMix: Math.random(),
        };
    });
}

function wrapParticle(p: Particle, width: number, height: number) {
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
}

function AuroraLayer({
    variant,
    compact,
}: {
    variant: NonNullable<ParticleBackgroundProps['variant']>;
    compact: boolean;
}) {
    const intensity = variant === 'hero' ? 1 : 0.65;

    return (
        <div className={cn('absolute inset-0 overflow-hidden', compact && 'particle-aurora--compact')} aria-hidden>
            <div
                className="particle-aurora particle-aurora--primary"
                style={{ opacity: (compact ? 0.08 : 0.12) * intensity }}
            />
            <div
                className="particle-aurora particle-aurora--accent"
                style={{ opacity: (compact ? 0.07 : 0.1) * intensity }}
            />
            {!compact && (
                <div
                    className="particle-aurora particle-aurora--mesh"
                    style={{ opacity: 0.06 * intensity }}
                />
            )}
        </div>
    );
}

export function ParticleBackground({ variant = 'hero', className }: ParticleBackgroundProps) {
    const baseConfig = VARIANT_CONFIG[variant];
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const shootingStarRef = useRef<ShootingStar | null>(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const colorsRef = useRef({ primary: parseRgb('75 117 255'), accent: parseRgb('6 182 212') });
    const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
    const runtimeRef = useRef<RuntimeConfig>(resolveRuntimeConfig(baseConfig, 360));
    const lastSizeRef = useRef({ width: 0, height: 0 });
    const nextStarAtRef = useRef(0);

    const [mounted, setMounted] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [compact, setCompact] = useState(false);

    const readThemeColors = useCallback(() => {
        const style = getComputedStyle(document.documentElement);
        colorsRef.current = {
            primary: parseRgb(style.getPropertyValue('--color-primary')),
            accent: parseRgb(style.getPropertyValue('--color-accent')),
        };
    }, []);

    const spawnShootingStar = useCallback((width: number, height: number) => {
        const fromLeft = Math.random() > 0.5;
        shootingStarRef.current = {
            x: fromLeft ? -20 : width + 20,
            y: Math.random() * height * 0.55,
            vx: fromLeft ? Math.random() * 4 + 6 : -(Math.random() * 4 + 6),
            vy: Math.random() * 2 + 1.5,
            life: 0,
            maxLife: Math.random() * 20 + 35,
        };
        nextStarAtRef.current = performance.now() + Math.random() * 12000 + 8000;
    }, []);

    const seedParticles = useCallback(
        (width: number, height: number) => {
            const runtime = resolveRuntimeConfig(baseConfig, width);
            runtimeRef.current = runtime;
            particlesRef.current = createParticles(
                runtime.particleCount,
                width,
                height,
                runtime.speed
            );
            shootingStarRef.current = null;
            nextStarAtRef.current = performance.now() + 4000;
        },
        [baseConfig]
    );

    useEffect(() => {
        setMounted(true);
        setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        setCompact(isCoarsePointer() || isMobileViewport(window.innerWidth));
        readThemeColors();

        const observer = new MutationObserver(readThemeColors);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style'],
        });

        return () => observer.disconnect();
    }, [readThemeColors]);

    useEffect(() => {
        if (!mounted || reducedMotion) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);
            const width = Math.max(rect.width, 1);
            const height = Math.max(rect.height, 1);

            sizeRef.current = { width, height, dpr };
            setCompact(isCoarsePointer() || isMobileViewport(width));

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const prev = lastSizeRef.current;
            const sizeChanged =
                prev.width === 0 ||
                Math.abs(width - prev.width) / Math.max(prev.width, 1) > 0.18 ||
                Math.abs(height - prev.height) / Math.max(prev.height, 1) > 0.18;

            if (particlesRef.current.length === 0 || sizeChanged) {
                seedParticles(width, height);
            }

            lastSizeRef.current = { width, height };
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        window.addEventListener('orientationchange', resize);

        const handleMouseMove = (e: MouseEvent) => {
            if (runtimeRef.current.mouseInfluence <= 0) return;

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

            mouseRef.current = { x, y, active: inside };
        };

        if (!isCoarsePointer()) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
        }

        const draw = (time: number) => {
            const { width, height } = sizeRef.current;
            const runtime = runtimeRef.current;
            const { primary, accent } = colorsRef.current;
            const particles = particlesRef.current;
            const lineAlphaScale = compact ? 0.14 : 0.22;

            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {
                p.pulse += p.pulseSpeed;
                p.x += p.vx;
                p.y += p.vy;

                if (mouseRef.current.active && runtime.mouseInfluence > 0) {
                    const dx = mouseRef.current.x - p.x;
                    const dy = mouseRef.current.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    if (dist < 160) {
                        const force = (160 - dist) * runtime.mouseInfluence;
                        p.vx += (dx / dist) * force * 0.018;
                        p.vy += (dy / dist) * force * 0.018;
                    }
                }

                p.vx *= 0.996;
                p.vy *= 0.996;

                const speed = Math.hypot(p.vx, p.vy);
                const maxSpeed = runtime.speed * 2;
                if (speed > maxSpeed) {
                    p.vx = (p.vx / speed) * maxSpeed;
                    p.vy = (p.vy / speed) * maxSpeed;
                }

                wrapParticle(p, width, height);
            }

            for (let i = 0; i < particles.length; i++) {
                let links = 0;
                const maxLinks = compact ? 3 : 5;

                for (let j = i + 1; j < particles.length; j++) {
                    if (links >= maxLinks) break;

                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist > runtime.linkDistance) continue;

                    links += 1;
                    const alpha = (1 - dist / runtime.linkDistance) * lineAlphaScale;
                    const lineColor = mixRgb(primary, accent, (a.accentMix + b.accentMix) / 2);

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = rgba(lineColor, alpha);
                    ctx.lineWidth = compact ? 0.45 : 0.6;
                    ctx.stroke();
                }
            }

            for (const p of particles) {
                const twinkle = 0.55 + Math.sin(p.pulse) * 0.4;
                const color = mixRgb(primary, accent, p.accentMix);
                const alpha = p.opacity * twinkle;

                if (p.radius > 1 && !compact) {
                    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
                    glow.addColorStop(0, rgba(color, alpha * 0.3));
                    glow.addColorStop(1, rgba(color, 0));
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = rgba(color, alpha);
                ctx.fill();
            }

            if (runtime.shootingStars) {
                if (!shootingStarRef.current && time >= nextStarAtRef.current) {
                    spawnShootingStar(width, height);
                }

                const star = shootingStarRef.current;
                if (star) {
                    star.life += 1;
                    star.x += star.vx;
                    star.y += star.vy;

                    const progress = star.life / star.maxLife;
                    const fade = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;

                    const tailX = star.x - star.vx * 8;
                    const tailY = star.y - star.vy * 8;
                    const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
                    gradient.addColorStop(0, rgba(accent, 0));
                    gradient.addColorStop(0.6, rgba(accent, fade * 0.5));
                    gradient.addColorStop(1, rgba(primary, fade * 0.9));

                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY);
                    ctx.lineTo(star.x, star.y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.lineCap = 'round';
                    ctx.stroke();

                    if (star.life >= star.maxLife || star.x < -60 || star.x > width + 60) {
                        shootingStarRef.current = null;
                    }
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        animationRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationRef.current);
            resizeObserver.disconnect();
            window.removeEventListener('orientationchange', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mounted, reducedMotion, baseConfig, compact, seedParticles, spawnShootingStar]);

    const showGrid = useMemo(() => !compact, [compact]);

    if (!mounted) return null;

    if (reducedMotion) {
        return (
            <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--color-primary)/0.06),transparent_60%)]" />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
        >
            {baseConfig.aurora && <AuroraLayer variant={variant} compact={compact} />}

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

            <div className="particle-vignette" aria-hidden />
            {showGrid && <div className="particle-grid" aria-hidden />}
        </div>
    );
}
