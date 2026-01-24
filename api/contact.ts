import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limiting: simple in-memory store (resets on cold start)
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

function getClientIP(req: VercelRequest): string {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
        return forwarded.split(',')[0].trim();
    }
    return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const userSubmissions = submissions.get(ip) || [];

    // Clean old entries
    const recentSubmissions = userSubmissions.filter(
        timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );

    if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_WINDOW) {
        return true;
    }

    // Add current submission
    recentSubmissions.push(now);
    submissions.set(ip, recentSubmissions);

    return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = req.body;

        // 1. Honeypot check - if filled, it's a bot
        if (body._gotcha && body._gotcha.trim() !== '') {
            console.log('Bot detected: honeypot field filled');
            // Return success to not alert the bot
            return res.status(200).json({ success: true });
        }

        // 2. Timing check - form must be open for at least 3 seconds
        const formLoadTime = body._loadTime;
        if (formLoadTime) {
            const timeDiff = Date.now() - parseInt(formLoadTime);
            if (timeDiff < 3000) {
                console.log('Bot detected: form submitted too fast', timeDiff);
                return res.status(200).json({ success: true });
            }
        }

        // 3. Rate limiting
        const clientIP = getClientIP(req);
        if (isRateLimited(clientIP)) {
            console.log('Rate limited:', clientIP);
            return res.status(429).json({
                error: 'Liiga palju päringuid. Palun oota minut ja proovi uuesti.'
            });
        }

        // 4. Basic validation
        if (!body.name || body.name.trim() === '') {
            return res.status(400).json({ error: 'Nimi on kohustuslik' });
        }

        if (!body.phone && !body.email) {
            return res.status(400).json({ error: 'Telefon või email on kohustuslik' });
        }

        // 5. Clean the data before sending (remove internal fields)
        const cleanData = { ...body };
        delete cleanData._gotcha;
        delete cleanData._loadTime;

        // 6. Forward to Google Apps Script
        const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

        if (!GOOGLE_SCRIPT_URL) {
            console.error('GOOGLE_SCRIPT_URL not configured');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cleanData)
        });

        // Google Apps Script returns 302 redirect on success
        if (response.ok || response.status === 302) {
            return res.status(200).json({ success: true });
        }

        console.error('Google Script error:', response.status);
        return res.status(500).json({ error: 'Failed to submit form' });

    } catch (error) {
        console.error('Error processing form:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
