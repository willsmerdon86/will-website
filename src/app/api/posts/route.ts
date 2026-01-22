import { NextResponse } from "next/server";

interface PostItem {
  id: string;
  content: string;
  url: string;
  date: string;
  likes?: number;
  comments?: number;
}

// ============================================================
// YOUR LINKEDIN POSTS
// ============================================================
// To add a new post:
// 1. Copy the URL from LinkedIn (three dots on your post → "Copy link to post")
// 2. Add a new entry to the array below
// 3. Update the engagement numbers periodically if you want them accurate
// ============================================================

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

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(posts);
}
