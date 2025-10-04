import Image from 'next/image';
import type { LinksLinkContent } from '@/types/contentful';

interface LinkButtonProps {
  link: LinksLinkContent;
  theme: {
    backgroundColor?: string;
    textColor?: string;
  };
}

export function LinkButton({ link, theme }: LinkButtonProps) {
  const { title, url, description, image, imageStyle } = link.fields;
  
  const buttonStyle = {
    backgroundColor: theme.backgroundColor || '#ffffff',
    color: theme.textColor || '#000000',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-md mx-auto mb-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md overflow-hidden"
      style={buttonStyle}
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
