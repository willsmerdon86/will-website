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
// UPDATE YOUR LINKEDIN POSTS HERE
// ============================================================
// To add a new post:
// 1. Copy the URL from LinkedIn (three dots on your post → "Copy link to post")
// 2. Add a new entry to the array below
// 3. Update the engagement numbers periodically if you want them accurate
//
// For fully automated live updates, see README.md for options:
// - Zapier integration
// - LinkedIn API
// - Manual webhook updates
// ============================================================

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
  // Add more posts here:
  // {
  //   id: "4",
  //   content: "Your post text preview here...",
  //   url: "https://www.linkedin.com/feed/update/urn:li:activity:XXXXXXXXX/",
  //   date: "Jan 2026",
  //   likes: 50,
  //   comments: 10,
  // },
];

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(posts);
}
