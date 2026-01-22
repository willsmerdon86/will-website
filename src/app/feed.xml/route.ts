import { NextResponse } from "next/server";

interface PostItem {
  id: string;
  content: string;
  url: string;
  date: string;
  likes?: number;
  comments?: number;
}

// Same posts data as the posts API
const posts: PostItem[] = [
  {
    id: "1",
    content:
      "We investigated a finance anomaly in under an hour using Cursor + Databricks. This morning, finance flagged an unusual spike in customer credits. Nobody knew the cause. The entire investigation happened in a single Slack thread. Cursor connected to Databricks via MCP—discovering tables autonomously, understanding our data model, and building business logic conversationally. Faster than scheduling a meeting to discuss it.",
    url: "https://www.linkedin.com/posts/willsmerdon_cursor-ai-databricks-activity-7419629279803568129-k_Bn",
    date: "Jan 2026",
    likes: 419,
    comments: 26,
  },
  {
    id: "2",
    content:
      "Two weeks ago, I posted about being \"gobsmacked\" by what's possible when a non-developer gets access to tools like Cursor. Tuesday night, between finishing work and going to bed, I turned a simple idea into something that feels like a product. By the end, I had PDF extraction, multi-system validation, confidence scoring, Stripe reconciliation, exception workflows, and audit logging. Domain expertise became the input. Working software became the output.",
    url: "https://www.linkedin.com/posts/willsmerdon_cursor-accounting-ai-activity-7418115298656059394-ZdKt",
    date: "Jan 2026",
    likes: 106,
    comments: 3,
  },
  {
    id: "3",
    content:
      "We're growing the Revenue Accounting & Order to Cash team at Cursor, and I'm hiring for two founding roles that will help define how revenue actually works as we scale. This is a true build phase. The product is moving fast, growth is real, and the back office is early—which means a lot of opportunity to design things the right way from the start. I'm looking for people who've built before, care about being strong business partners, and want to understand the product and company.",
    url: "https://www.linkedin.com/posts/willsmerdon_cursor-accounting-revenueaccounting-activity-7414492576298389505-ECr6",
    date: "Jan 2026",
    likes: 154,
    comments: 4,
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
  // Handle formats like "Jan 2026" or "2023"
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  
  const parts = dateStr.split(" ");
  let date: Date;
  
  if (parts.length === 2) {
    // Format: "Jan 2026"
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
  const siteUrl = "https://will-website-iota.vercel.app";
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
