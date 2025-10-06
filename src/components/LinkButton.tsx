'use client';

import Image from 'next/image';
import type { LinksLinkContent, ColorPalette } from '@/types/contentful';
import { defaultColorPalette } from '@/types/contentful';

interface LinkButtonProps {
  link: LinksLinkContent;
  colorPalette?: ColorPalette;
}

export function LinkButton({ link, colorPalette }: LinkButtonProps) {
  const { title, url, description, image, imageStyle } = link.fields;
  
  const palette = colorPalette || defaultColorPalette;
  
  const buttonStyle = {
    backgroundColor: palette.tertiary,
    color: palette.primary,
    borderColor: palette.secondary,
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-md mx-auto mb-4 rounded-lg border transition-all duration-200 hover:shadow-md overflow-hidden"
      style={buttonStyle}
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
      {image?.fields && imageStyle === 'Big' && (
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
          {image?.fields && imageStyle === 'Icon Sized' && (
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
