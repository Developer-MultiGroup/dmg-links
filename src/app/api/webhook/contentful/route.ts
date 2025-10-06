import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

function assertEnv(name: string, value: string | undefined): string {
  if (!value) throw new Error(`${name} is not set`)
  return value
}

const CONTENTFUL_WEBHOOK_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET

type ContentfulWebhookBody = {
  sys?: {
    contentType?: { sys?: { id?: string } }
    type?: string
  }
  fields?: Record<string, unknown>
}

const typeToTags: Record<string, string[]> = {
  linksMain: ['links-main', 'links-content'],
  linksLinkContent: ['links-content'],
}

export async function POST(req: NextRequest) {
  try {
    // Basic secret validation. Configure this header in Contentful webhook settings.
    const secret = req.headers.get('x-webhook-secret') || req.nextUrl.searchParams.get('secret') || ''
    const expected = assertEnv('CONTENTFUL_WEBHOOK_SECRET', CONTENTFUL_WEBHOOK_SECRET)
    if (secret !== expected) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const topic = req.headers.get('x-contentful-topic') || ''
    const body = (await req.json().catch(() => ({}))) as ContentfulWebhookBody
    const contentTypeId = body?.sys?.contentType?.sys?.id || req.nextUrl.searchParams.get('type') || ''

    // Allow manual tag param to revalidate arbitrary tag(s)
    const manualTag = req.nextUrl.searchParams.get('tag')
    if (manualTag) {
      revalidateTag(manualTag)
      return NextResponse.json({ ok: true, revalidated: [manualTag] })
    }

    const tags = typeToTags[contentTypeId] || []

    // Revalidate on publish/update/archive/unpublish events
    const shouldRevalidate = topic.includes('ContentManagement.Entry') || topic.includes('ContentManagement.Asset')
    if (shouldRevalidate && tags.length > 0) {
      tags.forEach((t) => revalidateTag(t))
      return NextResponse.json({ ok: true, contentTypeId, topic, revalidated: tags })
    }

    // No-op if we cannot determine content type or tags
    return NextResponse.json({ ok: true, info: 'No tags revalidated', contentTypeId, topic })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? 'Unknown error' }, { status: 500 })
  }
}
