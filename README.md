# DMG Links - Personal Link Collection Platform

A modern, customizable link-in-bio page built with Next.js and powered by Contentful CMS. Create your own personalized link collection similar to Linktree, but with full control over design and content management.

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
CONTENTFUL_WEBHOOK_SECRET=your_webhook_secret_here

# Optional: Google Analytics 4 tracking
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
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
│   └── LinkButton.tsx      # Individual link button with smart display logic
├── lib/               # Utilities
│   ├── contentful.ts      # Contentful client and API calls
│   └── icons.tsx          # Heroicons integration and icon mapping
└── types/             # TypeScript definitions
    └── contentful.ts      # Contentful data types
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Key Features

- **Dynamic Metadata**: Page title, description, and favicon from Contentful
- **Custom Color Palette**: Dynamic Primary, secondary, and tertiary color system maintained in Contentful
- **Smart Icon System**: Heroicons integration with intelligent image/icon display logic
- **Link Tracking**: Google Analytics 4 integration with custom analytics API
- **Social Media Icons**: Instagram, LinkedIn, X (Twitter), YouTube with hover effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Image Optimization**: Next.js Image component for optimal loading
- **Type Safety**: Full TypeScript support with Contentful types
- **Cache Invalidation**: Automatic cache updates via Contentful Webhooks
- **Performance**: Optimized caching with Next.js unstable_cache and Contentful Webhooks

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
| `colorPalette` | Color Palette | JSON Object | No | Custom color scheme (see Color Palette section) |

#### LinksLinkContent Content Type

Create a content type called `linksLinkContent` with these fields:

| Field ID | Field Name | Field Type | Required | Help Text |
|----------|------------|------------|----------|-----------|
| `title` | Title | Short text | Yes | Link button title |
| `url` | URL | Short text | Yes | Destination URL |
| `description` | Description | Long text | No | Link description |
| `image` | Image | Media | No | Icon or preview image |
| `imageStyle` | Image Style | Short text, list | No | "Icon Sized" or "Big" |
| `icon` | Icon | Short text | No | Heroicons icon slug (see Icon Reference) |
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
   - **Icon**: Optional Heroicons icon slug (see Icon Reference section)
   - **Display Order**: Number for sorting (1, 2, 3...)
   - **Active**: Toggle to show/hide

3. **Publish** all link entries

### 6. Connect Links to Main Entry

1. Edit your **LinksMain** entry
2. In the **Links** field, add references to your link entries
3. **Publish** the updated entry

## 🎯 Icon System & LinkButton Behavior

The platform includes a comprehensive icon system using [Heroicons](https://heroicons.com/) and smart display logic for images and icons.

### Icon Reference

Icons are powered by [Heroicons](https://heroicons.com/) - beautiful hand-crafted SVG icons by the makers of Tailwind CSS. Use the icon slugs from their website in your Contentful entries.

**Popular Icon Slugs:**
- `home` - Home icon
- `envelope` - Email icon  
- `phone` - Phone icon
- `globeAlt` - Website icon
- `documentText` - Document icon
- `photo` - Photo icon
- `videoCamera` - Video icon
- `musicalNote` - Music icon
- `shoppingBag` - Shopping icon
- `heart` - Heart icon
- `star` - Star icon
- `bookmark` - Bookmark icon
- `share` - Share icon
- `chatBubbleLeftRight` - Chat icon
- `user` - User icon
- `cog` - Settings icon
- `bell` - Notification icon
- `magnifyingGlass` - Search icon
- `plus` - Add icon
- `arrowRight` - Arrow icon

**Find more icons at:** [https://heroicons.com/](https://heroicons.com/)

### LinkButton Display Logic

The LinkButton component intelligently handles the combination of images and icons:

#### When Image + Icon + imageStyle is "Big":
- ✅ **Big image displayed on top** (full width, 128px height)
- ✅ **Icon displayed on the left** in the content area below
- This creates a prominent visual hierarchy

#### When Image + Icon + imageStyle is "Icon Sized":
- ✅ **Icon-sized image on the left** (24x24px)
- ✅ **Icon on the right** in the content area
- Both elements are displayed side by side

#### When only Image exists:
- **"Big" style**: Shows big image on top
- **"Icon Sized" style**: Shows icon-sized image on the left

#### When only Icon exists:
- ✅ **Icon on the right** in the content area

### Adding Icons to Your Links

1. In your **LinksLinkContent** entry, add the **Icon** field
2. Enter the icon slug from [Heroicons](https://heroicons.com/) (e.g., `home`, `envelope`, `phone`)
3. The icon will automatically appear with proper styling and color theming
4. Icons adapt to your color palette (primary color for normal state, tertiary for hover)

## 🎨 Color Palette System

The platform supports a flexible color palette system using three main colors: **Primary**, **Secondary**, and **Tertiary**.

### Adding a Color Palette

1. In your **LinksMain** entry, find the **Color Palette** field
2. Add a JSON object with your color scheme:

```json
{
  "primary": "#1f2937",
  "secondary": "#64748b",
  "tertiary": "#f8fafc"
}
```

### Color Usage

- **Primary**: Main text color, hover backgrounds, active states
- **Secondary**: Secondary text, borders, social icons
- **Tertiary**: Background colors, hover text

### Example Color Palettes

**Professional (Default):**
```json
{
  "primary": "#1f2937",
  "secondary": "#64748b",
  "tertiary": "#f8fafc"
}
```

**Vibrant Alternative:**
```json
{
  "primary": "#ff6b35",
  "secondary": "#f7931e",
  "tertiary": "#2d1b69"
}
```

**Dark Theme:**
```json
{
  "primary": "#ffffff",
  "secondary": "#a1a1aa",
  "tertiary": "#18181b"
}
```

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
   - `CONTENTFUL_WEBHOOK_SECRET`
4. Set up Contentful webhook (see Webhook Setup section)
5. Ship!

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔗 Webhook Setup (Cache Invalidation)

Set up automatic cache invalidation so your site updates immediately when you publish content in Contentful.

### 1. Create Webhook in Contentful

1. Go to **Settings** → **Webhooks** in your Contentful space
2. Click **Add webhook**
3. Configure the webhook:

**Basic Settings:**
- **Name**: `Cache Invalidation`
- **URL**: `https://yourdomain.com/api/webhook/contentful`
- **HTTP Method**: `POST`
- **Content Type**: `application/json`

**Headers:**
```
x-webhook-secret: your_webhook_secret_here
x-contentful-topic: ContentManagement.Entry.publish
```

**Triggers** (select these events):
- ✅ Entry publish
- ✅ Entry unpublish
- ✅ Entry delete
- ✅ Entry archive
- ✅ Entry unarchive

**Content Types** (select these):
- ✅ `linksMain`
- ✅ `linksLinkContent`

### 2. Get Webhook Secret

1. After creating the webhook, copy the **Webhook Secret**
2. Add it to your environment variables as `CONTENTFUL_WEBHOOK_SECRET`

### 3. Test the Webhook

```bash
# Test manual tag revalidation
curl "https://yourdomain.com/api/webhook/contentful?secret=your_secret&tag=links-main"

# Test with content type
curl "https://yourdomain.com/api/webhook/contentful?secret=your_secret&type=linksMain"
```

### How It Works

1. **Content Change**: You publish/unpublish content in Contentful
2. **Webhook Trigger**: Contentful sends a POST request to your webhook endpoint
3. **Cache Invalidation**: The webhook invalidates specific cache tags
4. **Fresh Content**: Next request fetches updated content from Contentful

## 📊 Link Tracking & Analytics

The platform includes comprehensive link tracking to help you understand which links are most popular and how users interact with your page.

### Google Analytics 4 Integration

**Setup:**
1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add it to your `.env.local` file:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

**What's Tracked:**
- ✅ **Link clicks** with title, URL, and metadata
- ✅ **Page views** and user sessions
- ✅ **User demographics** and behavior
- ✅ **Custom events** for image styles and icons
- ✅ **Real-time data** in GA4 dashboard

### Custom Analytics API

The platform also includes a custom analytics endpoint at `/api/analytics/link-click` that logs:
- Link title and URL
- Timestamp and user agent
- Referrer information
- IP address (for privacy-compliant analytics)

**To enable custom tracking:**
1. Uncomment the fetch call in `LinkButton.tsx`
2. Set up a database to store click data
3. Build a custom dashboard for your analytics

### Alternative Tracking Solutions

**Privacy-Focused Options:**
- **Plausible Analytics**: Privacy-first, GDPR compliant
- **Umami**: Self-hosted, open-source analytics
- **Fathom**: Simple, privacy-focused analytics

**Implementation:**
```html
<!-- Plausible -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>

<!-- Umami -->
<script async src="https://your-umami-instance.com/script.js" data-website-id="your-id"></script>
```

### Analytics Data You'll Get

**Link Performance:**
- Most clicked links
- Click-through rates
- Time of day patterns
- Geographic distribution

**User Behavior:**
- Session duration
- Bounce rate
- Device types
- Traffic sources

**Content Insights:**
- Which image styles perform best
- Icon vs. image preferences
- Description impact on clicks

## 🔧 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components
- Use the Color Palette system instead of hardcoded colors
- Customize hover effects and transitions

### Layout
- Adjust spacing and sizing in component files
- Modify the responsive breakpoints
- Add new sections to `LinktreePage.tsx`

### Features
- Add new social media platforms
- Create custom color palettes
- Add analytics tracking
- Create multiple page layouts
- Extend webhook functionality for new content types

## 📚 Next Steps

After setting up your basic link page, consider:

1. **Custom Domain**: Point your domain to the deployed app
2. **Analytics**: Add Google Analytics or similar tracking
3. **SEO**: Optimize meta tags and add structured data
4. **Color Palettes**: Create multiple color schemes for different moods
5. **Advanced Features**: Add contact forms, newsletter signups, etc.
6. **Performance**: Monitor cache hit rates and optimize webhook responses

---

**Need help?** Check the [Next.js documentation](https://nextjs.org/docs) or [Contentful documentation](https://www.contentful.com/developers/docs/) for more advanced features.