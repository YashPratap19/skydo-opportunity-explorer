import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

async function ensureDataDir(): Promise<void> {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

async function readLeads(): Promise<any[]> {
    try {
        await ensureDataDir();
        const content = await fs.readFile(LEADS_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err: any) {
        if (err.code === 'ENOENT') return [];
        console.error('Error reading leads file:', err);
        return [];
    }
}

async function writeLeads(leads: any[]): Promise<void> {
    await ensureDataDir();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, countryCode, product, country } = body;

        if (!name || !email || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check for duplicate email + product combination
        const existing = await readLeads();
        const isDuplicate = existing.some(
            (lead) => lead.email === email && lead.product === product
        );
        if (isDuplicate) {
            return NextResponse.json({ success: true, lead: { id: 'existing' } });
        }

        const newLead = {
            id: Date.now().toString(),
            submittedAt: new Date().toISOString(),
            name,
            email,
            phone: `${countryCode} ${phone}`,
            product: product || '',
            countryOfInterest: country || '',
        };

        existing.push(newLead);
        await writeLeads(existing);

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        console.error('Error saving lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        // Simple token-based auth for admin API
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');
        const adminToken = process.env.ADMIN_TOKEN || 'admin123';

        if (token !== adminToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const leads = await readLeads();
        return NextResponse.json({ leads });
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
