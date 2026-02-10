import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, countryCode, product, country } = body;

        // Basic validation
        if (!name || !email || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newLead = {
            id: Date.now().toString(),
            submittedAt: new Date().toISOString(),
            name,
            email,
            phone: `${countryCode} ${phone}`,
            product,
            countryOfInterest: country
        };

        let leads = [];
        if (fs.existsSync(LEADS_FILE)) {
            const fileContent = fs.readFileSync(LEADS_FILE, 'utf-8');
            try {
                leads = JSON.parse(fileContent);
            } catch (e) {
                console.error("Error parsing leads file:", e);
                leads = [];
            }
        }

        leads.push(newLead);
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        console.error('Error saving lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        if (!fs.existsSync(LEADS_FILE)) {
            return NextResponse.json({ leads: [] });
        }
        const fileContent = fs.readFileSync(LEADS_FILE, 'utf-8');
        const leads = JSON.parse(fileContent);
        return NextResponse.json({ leads });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
