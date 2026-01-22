import { NextResponse } from "next/server";

interface PostItem {
  id: string;
  content: string;
  url: string;
  date: string;
  likes?: number;
  comments?: number;
}

// Same posts data as the posts API - in production you'd want a shared data source
const posts: PostItem[] = [
  {
    id: "1",
    content:
      "Excited to share that I've joined Cursor to lead Revenue Accounting and Order to Cash operations. Looking forward to building the financial infrastructure for one of the fastest-growing AI developer tools companies...",
    url: "https://www.linkedin.com/in/willsmerdon/recent-activity/all/",
    date: "Nov 2025",
    likes: 127,
    comments: 23,
  },
  {
    id: "2",
    content:
      "After an incredible journey at Fivetran, I'm grateful for the opportunity to have scaled the revenue accounting function during a period of rapid growth. Thank you to everyone who made this chapter so rewarding...",
    url: "https://www.linkedin.com/in/willsmerdon/recent-activity/all/",
    date: "Nov 2025",
    likes: 89,
    comments: 15,
  },
  {
    id: "3",
    content:
      "Reflecting on my time at Stripe: From 700 employees to a global fintech leader. Key lesson learned - automation isn't just about efficiency, it's about enabling your team to focus on what matters most...",
    url: "https://www.linkedin.com/in/willsmerdon/recent-activity/all/",
    date: "2023",
    likes: 156,
    comments: 31,
  },
];

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseDateToRFC822(dateStr: string): string {
  // Handle formats like "Nov 2025" or "2023"
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  
  const parts = dateStr.split(" ");
  let date: Date;
  
  if (parts.length === 2) {
    // Format: "Nov 2025"
    const month = months[parts[0]] ?? 0;
    const year = parseInt(parts[1], 10);
    date = new Date(year, month, 1);
  } else if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
    // Format: "2023"
    date = new Date(parseInt(parts[0], 10), 0, 1);
  } else {
    date = new Date();
  }
  
  return date.toUTCString();
}

export async function GET(): Promise<NextResponse> {
  const siteUrl = "https://willsmerdon.com"; // Update with your actual domain
  const lastBuildDate = new Date().toUTCString();

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.content.substring(0, 100))}...</title>
      <link>${escapeXml(post.url)}</link>
      <guid isPermaLink="false">${post.id}</guid>
      <pubDate>${parseDateToRFC822(post.date)}</pubDate>
      <description>${escapeXml(post.content)}</description>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Will Smerdon - Revenue Accounting Leader</title>
    <link>${siteUrl}</link>
    <description>Updates and insights from Will Smerdon on revenue accounting, SaaS finance, and building finance operations at high-growth tech companies.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
