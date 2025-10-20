import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 'page1';
    const allowed = ['page1', 'page2', 'page3'];
    if (!allowed.includes(page)) {
      return NextResponse.json({ error: 'Invalid page' }, { status: 400 });
    }

    const projectRoot = process.cwd();
    // Prefer public/source/bi then fallback to public/bi
    const candidates = [
      path.join(projectRoot, 'public', 'source', 'bi', `${page}.png`),
      path.join(projectRoot, 'public', 'bi', `${page}.png`),
    ];

    let filePath: string | null = null;
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        filePath = c;
        break;
      }
    }

    if (!filePath) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const buffer = fs.readFileSync(filePath);
    const b64 = buffer.toString('base64');
    const dataUri = `data:image/png;base64,${b64}`;
    return NextResponse.json({ data: dataUri });
  } catch (err: any) {
    console.error('page-image error', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
