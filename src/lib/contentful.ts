import { createClient, Entry } from 'contentful';
import { unstable_cache } from 'next/cache';
import type { LinksMain, LinksLinkContent } from '@/types/contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const contentfulClient = client;

export async function getLinksMain(): Promise<LinksMain | null> {
  try {
    const response = await client.getEntries({
      content_type: 'linksMain',
      limit: 1,
      include: 10, // Include all referenced content
    });

    if (response.items.length === 0) {
      return null;
    }

    return response.items[0] as unknown as LinksMain;
  } catch (error) {
    console.error('Error fetching linksMain:', error);
    return null;
  }
}

export async function getAllLinks(): Promise<LinksLinkContent[]> {
  try {
    const response = await client.getEntries({
      content_type: 'linksLinkContent',
      'fields.active': true,
      order: ['fields.displayOrder'],
      include: 10,
    });

    return response.items as unknown as LinksLinkContent[];
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
}

// Cached versions with tags for webhook invalidation
export const getCachedLinksMain = unstable_cache(
  getLinksMain,
  ['links-main'],
  {
    tags: ['links-main', 'links-content'],
    revalidate: 3600, // 1 hour fallback
  }
);

export const getCachedAllLinks = unstable_cache(
  getAllLinks,
  ['links-content'],
  {
    tags: ['links-content'],
    revalidate: 3600, // 1 hour fallback
  }
);
