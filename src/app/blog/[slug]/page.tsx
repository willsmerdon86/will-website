"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

// Blog post content - add your posts here
const postsContent: Record<
  string,
  {
    title: string;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
  }
> = {
  welcome: {
    title: "Welcome to My Blog",
    date: "Jan 2026",
    readTime: "2 min read",
    tags: ["Personal", "Introduction"],
    content: `
## Why I'm Writing

After 14+ years working at the intersection of accounting, operations, and technology, I've accumulated a lot of thoughts on how to build scalable finance functions at high-growth companies.

This blog is where I'll share:

- **Lessons learned** from scaling finance at Stripe, Fivetran, and now Cursor
- **Technical deep-dives** on revenue recognition, automation, and process design
- **Perspectives** on the evolving role of finance in tech companies

## What to Expect

I'll be writing about topics like:

1. How to think about ASC 606 implementation in practice
2. Building automation that actually works (and doesn't create more problems)
3. The art of translating between technical accounting guidance and business reality
4. Cross-functional partnership between finance and engineering

## Let's Connect

If you're working on similar problems or just want to chat about finance and technology, feel free to reach out through the [contact form](/#contact) or connect with me on [LinkedIn](https://www.linkedin.com/in/willsmerdon/).

Thanks for reading!
    `,
  },
  // Add more posts here
};

export default function BlogPostPage(): JSX.Element {
  const params = useParams();
  const slug = params.slug as string;
  const post = postsContent[slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-teal-600 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-neutral-100 rounded-full text-sm font-medium text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose prose-lg prose-neutral max-w-none prose-headings:font-semibold prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }} />
          </article>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-neutral-600 mb-4">Enjoyed this post?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}

// Simple markdown parser
function parseMarkdown(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/gim, '</p><p>')
    .replace(/^(?!<[hloua])/gim, '<p>')
    .replace(/$/gim, '</p>')
    .replace(/<p><\/p>/gim, '')
    .replace(/<p>(<[hloua])/gim, '$1')
    .replace(/(<\/[hli]>)<\/p>/gim, '$1');
}
