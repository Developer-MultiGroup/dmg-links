# DMG Links - Personal Link Collection Platform

A modern, customizable link-in-bio page built with Next.js and powered by Contentful CMS. Create your own personalized link collection similar to Linktree, but with full control over design and content management.

## 🎯 Why This Project Exists

This project provides a **self-hosted alternative** to commercial link-in-bio services, giving you:

- **Complete ownership** of your data and branding
- **Customizable design** with modern UI components
- **Content management** through Contentful's intuitive interface
- **Social media integration** with proper icons and links
- **SEO optimization** with dynamic metadata
- **Fast performance** with Next.js and modern web technologies

Perfect for creators, entrepreneurs, and anyone who wants a professional link collection page without monthly subscriptions.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Contentful account (free tier is more than enough)
- Git installed

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd dmg-links
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your link page.

## 📋 Development Guide

### Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page with dynamic metadata
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── LinktreePage.tsx    # Main page component
│   └── LinkButton.tsx      # Individual link button
├── lib/               # Utilities
│   └── contentful.ts      # Contentful client and API calls
└── types/             # TypeScript definitions
    └── contentful.ts      # Contentful data types
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Key Features

- **Dynamic Metadata**: Page title, description, and favicon from Contentful
- **Social Media Icons**: Instagram, LinkedIn, X (Twitter), YouTube with hover effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Image Optimization**: Next.js Image component for optimal loading
- **Type Safety**: Full TypeScript support with Contentful types

## 🎨 Contentful Setup Guide

Contentful is the **main hub** for managing all your content. Follow these steps to set up your content model and data.

### 1. Create Contentful Account

1. Go to [contentful.com](https://contentful.com)
2. Sign up for a free account
3. Create a new space

### 2. Get API Credentials

1. Go to **Settings** → **API keys**
2. Copy your **Space ID** and **Content Delivery API - access token**
3. Add these to your `.env.local` file

### 3. Create Content Models

#### LinksMain Content Type

Create a content type called `linksMain` with these fields:

| Field ID | Field Name | Field Type | Required | Help Text |
|----------|------------|------------|----------|-----------|
| `title` | Title | Short text | Yes | Your name or page title |
| `bio` | Bio | Long text | No | Brief description about you |
| `avatar` | Avatar | Media | No | Your profile picture |
| `siteTitle` | Site Title | Short text | No | Browser tab title |
| `siteIcon` | Site Icon | Media | No | Favicon for browser tab |
| `ogImage` | Open Graph Image | Media | No | Social media preview image (1200x630px recommended) |
| `instagram` | Instagram | Short text | No | Instagram username (without @) |
| `linkedIn` | LinkedIn | Short text | No | LinkedIn username |
| `twitter` | Twitter/X | Short text | No | Twitter/X username |
| `youtube` | YouTube | Short text | No | YouTube channel handle |
| `links` | Links | References | No | Reference to link entries |

#### LinksLinkContent Content Type

Create a content type called `linksLinkContent` with these fields:

| Field ID | Field Name | Field Type | Required | Help Text |
|----------|------------|------------|----------|-----------|
| `title` | Title | Short text | Yes | Link button title |
| `url` | URL | Short text | Yes | Destination URL |
| `description` | Description | Long text | No | Link description |
| `image` | Image | Media | No | Icon or preview image |
| `imageStyle` | Image Style | Short text, list | No | "Icon Sized" or "Big" |
| `displayOrder` | Display Order | Number | Yes | Sort order (lower = first) |
| `active` | Active | Boolean | Yes | Show/hide this link |

### 4. Create Your First Entry

1. Go to **Content** → **Add entry**
2. Select **LinksMain** content type
3. Fill in your information:
   - **Title**: Your name
   - **Bio**: Brief description
   - **Avatar**: Upload your profile picture
   - **Site Title**: Page title for browser tab
   - **Site Icon**: Upload favicon (32x32px recommended)
   - **Open Graph Image**: Upload social media preview image (1200x630px recommended)
   - **Social Media**: Add your usernames (without @ symbols)

4. **Publish** the entry

### 5. Add Your Links

1. Create new entries with **LinksLinkContent** type
2. For each link:
   - **Title**: Button text
   - **URL**: Destination (include https://)
   - **Description**: Optional description
   - **Image**: Optional icon or preview
   - **Image Style**: Choose "Icon Sized" (24px) or "Big" (preview)
   - **Display Order**: Number for sorting (1, 2, 3...)
   - **Active**: Toggle to show/hide

3. **Publish** all link entries

### 6. Connect Links to Main Entry

1. Edit your **LinksMain** entry
2. In the **Links** field, add references to your link entries
3. **Publish** the updated entry

### Content Management Tips

- **Images**: Use high-quality images, Contentful will optimize them
- **Open Graph Image**: Use 1200x630px for optimal social media sharing
- **URLs**: Always include `https://` in your URLs
- **Ordering**: Use display order numbers (1, 2, 3...) for easy sorting
- **Testing**: Use the preview feature to test before publishing
- **Backup**: Contentful automatically versions your content

### Troubleshooting

**Page shows "No Links Found"**
- Check your environment variables are correct
- Ensure your LinksMain entry is published
- Verify content type names match exactly

**Images not loading**
- Check image URLs in Contentful
- Ensure images are published
- Verify image file formats are supported

**Social links not working**
- Remove @ symbols from usernames
- Check URL formats are correct
- Ensure social media fields are filled

## 🚀 Deployment

1. Push your code to GitHub
2. Connect your repository to your hosting service
3. Add environment variables:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
4. Ship!

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components
- Change colors in `LinktreePage.tsx` and `LinkButton.tsx`

### Layout
- Adjust spacing and sizing in component files
- Modify the responsive breakpoints
- Add new sections to `LinktreePage.tsx`

### Features
- Add new social media platforms
- Implement custom themes
- Add analytics tracking
- Create multiple page layouts

## 📚 Next Steps

After setting up your basic link page, consider:

1. **Custom Domain**: Point your domain to the deployed app
2. **Analytics**: Add Google Analytics or similar tracking
3. **SEO**: Optimize meta tags and add structured data
4. **Themes**: Create multiple color schemes
5. **Advanced Features**: Add contact forms, newsletter signups, etc.

---

**Need help?** Check the [Next.js documentation](https://nextjs.org/docs) or [Contentful documentation](https://www.contentful.com/developers/docs/) for more advanced features.