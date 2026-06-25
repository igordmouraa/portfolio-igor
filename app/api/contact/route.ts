import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const MAX_BODY_BYTES = 8_192;

const contactSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(10).max(2000),
    website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
        }

        const contentLength = Number(request.headers.get('content-length') ?? 0);
        if (contentLength > MAX_BODY_BYTES) {
            return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
        }

        const body = await request.json();
        const data = contactSchema.parse(body);

        if (data.website) {
            return NextResponse.json({ success: true });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL;
        const isProduction = process.env.NODE_ENV === 'production';

        if (isProduction && (!apiKey || !contactEmail)) {
            console.error('[contact] Missing RESEND_API_KEY or CONTACT_EMAIL in production');
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
        }

        if (!apiKey) {
            console.warn('[contact] RESEND_API_KEY not configured — message discarded in dev mode');
            return NextResponse.json({ success: true, mode: 'dev' });
        }

        const resend = new Resend(apiKey);

        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: contactEmail!,
            replyTo: data.email,
            subject: `Portfolio contact from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }
        console.error('[contact] Error sending message');
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
