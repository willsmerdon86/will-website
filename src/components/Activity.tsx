"use client";

import { useEffect, useState } from "react";
import { ExternalLink, MessageSquare, RefreshCw, Linkedin, ThumbsUp, MessageCircle } from "lucide-react";

interface PostItem {
  id: string;
  content: string;
  url: string;
  date: string;
  likes?: number;
  comments?: number;
}

// Your LinkedIn posts - update via API or manually
// To make this live, create an API route that fetches from /api/posts
const POSTS_API_URL = "/api/posts";

// Fallback posts if API fails - update these manually when you post
const fallbackPosts: PostItem[] = [
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

export default function Activity(): JSX.Element {
  const [posts, setPosts] = useState<PostItem[]>(fallbackPosts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Fetch posts from API
  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await fetch(POSTS_API_URL);
      if (response.ok) {
        const data: PostItem[] = await response.json();
        if (data && data.length > 0) {
          setPosts(data);
        }
      }
    } catch {
      // Use fallback posts if API fails
      console.log("Using fallback posts");
    }
  };

  // Set mounted state and fetch posts on client
  useEffect(() => {
    setIsMounted(true);
    setLastUpdated(new Date().toLocaleTimeString());
    fetchPosts();
  }, []);

  // Refresh function - fetches latest posts from API
  const handleRefresh = async (): Promise<void> => {
    setIsLoading(true);
    await fetchPosts();
    setLastUpdated(new Date().toLocaleTimeString());
    setIsLoading(false);
  };

  return (
    <section id="activity" className="py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
              Posts
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Latest from{" "}
              <span className="gradient-text">LinkedIn</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Recent thoughts and updates from my LinkedIn.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {isMounted && lastUpdated && (
              <span className="text-sm text-neutral-500">
                Updated {lastUpdated}
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 rounded-full bg-white border border-neutral-200 hover:border-neutral-300 transition-colors disabled:opacity-50"
              aria-label="Refresh posts"
            >
              <RefreshCw
                className={`w-4 h-4 text-neutral-600 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Posts feed */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-6 shadow-sm card-hover block"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-neutral-500">
                    {post.date}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed line-clamp-4 mb-4">
                {post.content}
              </p>
              {/* Engagement metrics */}
              {(post.likes !== undefined || post.comments !== undefined) && (
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                  {post.likes !== undefined && (
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                  )}
                  {post.comments !== undefined && (
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  )}
                </div>
              )}
            </a>
          ))}
        </div>

        {/* View more link */}
        <div className="mt-12 text-center">
          <a
            href="https://www.linkedin.com/in/willsmerdon/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            View All Posts on LinkedIn
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
