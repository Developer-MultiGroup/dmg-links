import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, url, timestamp, userAgent, referer } = body;

    // Log the click event (you can replace this with database storage)
    console.log('Link Click Event:', {
      title,
      url,
      timestamp: new Date(timestamp).toISOString(),
      userAgent,
      referer,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });

    // Here you could save to a database:
    // await db.linkClicks.create({
    //   data: {
    //     title,
    //     url,
    //     timestamp: new Date(timestamp),
    //     userAgent,
    //     referer,
    //     ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    //   }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  }
}
