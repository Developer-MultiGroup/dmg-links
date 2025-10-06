'use client';
import Image from 'next/image';
import type { LinksLinkContent, ColorPalette } from '@/types/contentful';
import { defaultColorPalette } from '@/types/contentful';
import { getIcon } from '@/lib/icons';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface LinkButtonProps {
  link: LinksLinkContent;
  colorPalette?: ColorPalette;
}

export function LinkButton({ link, colorPalette }: LinkButtonProps) {
  const { title, url, description, image, imageStyle, icon } = link.fields;
  const palette = colorPalette || defaultColorPalette;

  // Track link clicks
  const handleLinkClick = () => {
    // Google Analytics 4 tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Link',
        event_label: title,
        value: url,
        custom_parameter_1: imageStyle || 'none',
        custom_parameter_2: icon || 'none'
      });
    }

    // Send to custom analytics endpoint
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/link-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          url, 
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          referer: document.referrer
        })
      }).catch(error => {
        console.error('Analytics tracking failed:', error);
      });
    }
  };

  const buttonStyle = {
    backgroundColor: palette.tertiary,
    color: palette.primary,
    borderColor: palette.secondary,
  };

  const hasImage = image?.fields;
  const hasIcon = icon;

  // If image exists AND icon exists: Force image to be big on top
  const forceBigImage = hasImage && hasIcon;

  // Image display logic
  const showBigImage = forceBigImage || (hasImage && imageStyle === 'Big');
  const showIconSizedImage = hasImage && !forceBigImage && imageStyle === 'Icon Sized';

  // Icon only shows on left if it exists
  const showIconOnLeft = hasIcon;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-md mx-auto mb-4 rounded-lg border transition-all duration-200 hover:shadow-md overflow-hidden"
      style={buttonStyle}
      onClick={handleLinkClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = palette.primary;
        e.currentTarget.style.color = palette.tertiary;
        e.currentTarget.style.borderColor = palette.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = palette.tertiary;
        e.currentTarget.style.color = palette.primary;
        e.currentTarget.style.borderColor = palette.secondary;
      }}
    >
      {showBigImage && (
        <div className="relative w-full h-32">
          <Image
            src={`https:${image.fields.file.url}`}
            alt={image.fields.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center space-x-3">
          {showIconOnLeft && (
            <div className="flex-shrink-0">
              {getIcon(icon, "w-6 h-6")}
            </div>
          )}

          {showIconSizedImage && (
            <div className="flex-shrink-0">
              <Image
                src={`https:${image.fields.file.url}`}
                alt={image.fields.title}
                width={24}
                height={24}
                className="rounded"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{title}</h3>
            {description && (
              <p className="text-sm opacity-75">{description}</p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}