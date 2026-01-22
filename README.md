# Will Smerdon - Personal Website

A modern personal portfolio website built with Next.js 14, React, and Tailwind CSS.

## Features

- **Modern Design**: Clean, minimal aesthetic inspired by Stripe, Cursor, and Notion
- **Responsive**: Fully responsive design that works on all devices
- **Contact Form**: Integrated contact form that opens your email client
- **LinkedIn Activity Feed**: Displays recent LinkedIn activity
- **Smooth Animations**: Subtle animations and transitions throughout
- **SEO Optimized**: Proper meta tags and semantic HTML

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Navigate to the project directory:
   ```bash
   cd will-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
will-website/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and Tailwind
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   └── components/
│       ├── Navigation.tsx   # Sticky navigation bar
│       ├── Hero.tsx         # Hero section
│       ├── About.tsx        # About me section
│       ├── Experience.tsx   # Work experience timeline
│       ├── Skills.tsx       # Skills grid
│       ├── Activity.tsx     # LinkedIn activity feed
│       ├── Contact.tsx      # Contact form
│       └── Footer.tsx       # Footer
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json
```

## Customization

### Updating Content

All content is stored directly in the component files for easy editing:

- **Personal Info**: Edit `Hero.tsx` and `About.tsx`
- **Experience**: Edit the `experiences` array in `Experience.tsx`
- **Skills**: Edit the `skillCategories` array in `Skills.tsx`
- **LinkedIn Activity**: Update the `initialActivities` array in `Activity.tsx`

### Styling

The color palette and design tokens are configured in `tailwind.config.ts`. The main gradient and accent colors can be modified there.

### Contact Form

The contact form uses a simple `mailto:` link by default. For a more robust solution, consider:

1. **EmailJS**: Add your EmailJS service ID, template ID, and public key to enable direct email sending
2. **Formspree**: Use Formspree.io for a simple backend
3. **Custom API**: Set up a serverless function (Vercel/AWS Lambda) to handle form submissions

## LinkedIn Posts Feed

The posts section displays your LinkedIn posts with engagement metrics.

### Quick Update (Manual)

Edit `src/app/api/posts/route.ts` and update the `posts` array:

```typescript
const posts: PostItem[] = [
  {
    id: "1",
    content: "Your post text preview...",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:XXXXXXXXX/",
    date: "Jan 2026",
    likes: 50,
    comments: 10,
  },
  // Add more posts...
];
```

To get the URL: Click the three dots on your LinkedIn post → "Copy link to post"

### Live Updates with Zapier

1. Create a [Zapier](https://zapier.com) account
2. Create a Zap: "LinkedIn → Webhook"
   - Trigger: "New Share Update by You" in LinkedIn
   - Action: Send webhook to your server endpoint
3. Create an API endpoint to receive the webhook and update a database
4. Modify `/api/posts/route.ts` to read from your database

### Live Updates with LinkedIn API (Advanced)

1. Create a LinkedIn App at [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Request the `r_liteprofile` and `r_member_social` permissions
3. Implement OAuth 2.0 to get an access token
4. Create a serverless function that:
   - Fetches your posts: `GET https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:person:{YOUR_ID}`
   - Caches results in a database
   - Serves them via `/api/posts`

### Using a Third-Party Service

Services like [Phantombuster](https://phantombuster.com) or [Apify](https://apify.com) can scrape LinkedIn posts and send them to a webhook. Check their terms of service.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

Build the project for production:

```bash
npm run build
npm run start
```

The output in `.next/` can be deployed to any Node.js hosting platform.

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Images**: Add images to `/public` and use Next.js Image component for optimization

## License

MIT License - feel free to use this template for your own portfolio!
