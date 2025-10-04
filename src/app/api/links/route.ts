import { NextResponse } from 'next/server';
import { getLinksMain } from '@/lib/contentful';

export async function GET() {
  try {
    const linksMain = await getLinksMain();
    
    if (!linksMain) {
      return NextResponse.json(
        { error: 'No active links main found' },
        { status: 404 }
      );
    }

    return NextResponse.json(linksMain);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch link data' },
      { status: 500 }
    );
  }
}
