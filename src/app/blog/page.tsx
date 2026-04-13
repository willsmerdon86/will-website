"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface Article {
  number: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

const articles: Article[] = [
  {
    number: "01",
    slug: "the-accountant-builder",
    title: "The Accountant-Builder",
    excerpt:
      "Two modes of AI value for finance teams, a decision framework for when to build vs. use, and why domain expertise is the real prerequisite.",
    date: "March 2026",
    readTime: "15 min read",
    tags: ["Framework", "AI", "Finance"],
  },
  {
    number: "02",
    slug: "ai-as-force-multiplier",
    title: "AI as Force Multiplier: You Don\u2019t Need to Build Anything",
    excerpt:
      "Concrete, quantified examples of using AI for investigation and analysis. From Slack message to root cause to remediation in 15 minutes.",
    date: "March 2026",
    readTime: "14 min read",
    tags: ["Investigation", "Automation", "SaaS"],
  },
  {
    number: "03",
    slug: "from-localhost-to-internal-tool",
    title: "From Localhost to Internal Tool",
    excerpt:
      "The infrastructure progression: local prototype to deployed tool. Covers data connections, cron automation, security governance, and working with engineering.",
    date: "March 2026",
    readTime: "12 min read",
    tags: ["Infrastructure", "Deployment", "Security"],
  },
  {
    number: "04",
    slug: "building-a-contract-provisioning-queue",
    title: "Building an Automated Contract Provisioning Queue",
    excerpt:
      "A deep dive: CRM ingestion, AI-powered PDF extraction, automated validation, human review queue, and how the system evolved.",
    date: "March 2026",
    readTime: "18 min read",
    tags: ["Deep Dive", "Automation", "Enterprise"],
  },
  {
    number: "05",
    slug: "teaching-finance-teams",
    title: "Teaching Finance Teams to Use AI: A Training Playbook",
    excerpt:
      "Session structure, demo sequence, prompt patterns, and sample data design for hands-on AI training.",
    date: "March 2026",
    readTime: "14 min read",
    tags: ["Training", "Playbook", "Teams"],
  },
];

export default function WritingPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
          >
            &larr; Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Writing
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Thoughts on finance, technology, and building scalable systems at
            the intersection of accounting and operations.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
              AI in Finance Operations &mdash; A 5-Part Series
            </span>
          </div>

          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group p-8 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="flex items-start gap-6">
                    <span className="text-3xl font-bold text-neutral-200 group-hover:text-teal-200 transition-colors shrink-0 pt-1">
                      {article.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-neutral-900 mb-3 group-hover:text-teal-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
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
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
