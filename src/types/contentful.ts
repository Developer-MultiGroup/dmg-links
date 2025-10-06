// Color Palette Types
export interface ColorPalette {
  primary: string;
  secondary: string;
  tertiary: string;
}

// Contentful Types
export interface ContentfulAsset {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface LinksLinkContent {
  fields: {
    title: string;
    url: string;
    description?: string;
    displayOrder: number;
    image?: ContentfulAsset;
    imageStyle?: 'Icon Sized' | 'Big';
    icon?: string;
    active: boolean;
  };
  sys: {
    id: string;
    type: string;
  };
}

export interface LinksMain {
  fields: {
    title: string;
    avatar: ContentfulAsset;
    bio?: string;
    siteTitle?: string;
    siteIcon?: ContentfulAsset;
    ogImage?: ContentfulAsset;
    instagram?: string;
    linkedIn?: string;
    twitter?: string;
    youtube?: string;
    links: LinksLinkContent[];
    colorPalette?: ColorPalette;
  };
  sys: {
    id: string;
    type: string;
  };
}

// API Response Types
export interface ContentfulResponse<T> {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: T[];
  includes?: {
    Asset?: ContentfulAsset[];
  };
}

// Component Props Types
export interface LinkButtonProps {
  link: LinksLinkContent;
  colorPalette?: ColorPalette;
}

export interface LinktreePageProps {
  linksMain: LinksMain;
}

// Default color palette for fallback
export const defaultColorPalette: ColorPalette = {
  primary: '#1f2937',
  secondary: '#64748b',
  tertiary: '#f8fafc',
};
