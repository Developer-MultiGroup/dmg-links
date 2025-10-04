import { LinktreePage } from '@/components/LinktreePage';
import { getLinksMain } from '@/lib/contentful';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const linksMain = await getLinksMain();
  
  if (!linksMain) {
    return {
      title: 'DMG Links',
      description: 'Your personal link collection powered by Contentful',
    };
  }

  const { siteTitle, siteIcon, ogImage, title, bio } = linksMain.fields;
  
  return {
    title: siteTitle || title || 'Links Page',
    description: bio || 'Your personal link collection powered by Contentful',
    icons: siteIcon?.fields ? {
      icon: `https:${siteIcon.fields.file.url}`,
      shortcut: `https:${siteIcon.fields.file.url}`,
      apple: `https:${siteIcon.fields.file.url}`,
    } : undefined,
    openGraph: {
      title: siteTitle || title || 'Links Page',
      description: bio || 'Your personal link collection powered by Contentful',
      images: ogImage?.fields ? [
        {
          url: `https:${ogImage.fields.file.url}`,
          width: ogImage.fields.file.details.image?.width || 1200,
          height: ogImage.fields.file.details.image?.height || 630,
          alt: ogImage.fields.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle || title || 'Links Page',
      description: bio || 'Your personal link collection powered by Contentful',
      images: ogImage?.fields ? [`https:${ogImage.fields.file.url}`] : undefined,
    },
  };
}

export default async function Home() {
  const linksMain = await getLinksMain();

  if (!linksMain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Links Found
          </h1>
          <p className="text-gray-600">
            Please check your Contentful configuration.
          </p>
        </div>
      </div>
    );
  }

  return <LinktreePage linksMain={linksMain} />;
}
