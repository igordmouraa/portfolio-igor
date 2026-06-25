import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: NextRequest): string {
    return (
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        request.headers.get('x-real-ip') ??
        'unknown'
    );
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (!entry || now >= entry.resetAt) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }

    if (entry.count >= RATE_LIMIT) {
        return true;
    }

    entry.count += 1;
    return false;
}

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/api/contact' && request.method === 'POST') {
        if (isRateLimited(getClientIp(request))) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/contact',
};
