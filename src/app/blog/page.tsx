"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Add your blog posts here
const posts: BlogPost[] = [
  {
    slug: "welcome",
    title: "Welcome to My Blog",
    excerpt:
      "Sharing thoughts on revenue accounting, process automation, and building finance functions at high-growth tech companies.",
    date: "Jan 2026",
    readTime: "2 min read",
    tags: ["Personal", "Introduction"],
  },
  // Add more posts here as you write them
];

export default function BlogPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Blog
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Thoughts on finance, technology, and building scalable systems at
            the intersection of accounting and operations.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-neutral-500 text-center py-12">
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group p-8 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-neutral-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white rounded-full text-xs font-medium text-neutral-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-teal-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
