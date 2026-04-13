"use client";

import { Globe, Users, TrendingUp, Award } from "lucide-react";

const highlights: Array<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "QTC/OTC Expert",
    description:
      "End-to-end expertise across accounting, operations, and data — from quote through cash application and revenue recognition",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "0→1 Functions Built",
    description:
      "Built revenue accounting and operations from scratch at hypergrowth companies, including the founding accounting team at Cursor",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "15+ Tools Built with AI",
    description:
      "Built internal tools the accounting team uses daily — dashboards, provisioning queues, fraud monitoring, automated workflows",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Scale & Complexity",
    description:
      "Stripe, Fivetran, Cursor — multi-dimensional billing, usage-based revenue, compliance at speed across hypergrowth environments",
  },
];

export default function About(): JSX.Element {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Where accounting meets{" "}
            <span className="gradient-text">engineering</span>
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            I&apos;ve spent 15 years working at the intersection of accounting, operations, 
            and technology — from audit through to building and leading Quote-to-Cash and 
            Order-to-Cash functions at some of the fastest-growing, most complex companies 
            in the world. The companies I&apos;ve worked at —{" "}
            <span className="font-semibold text-neutral-900">Stripe</span>,{" "}
            <span className="font-semibold text-neutral-900">Fivetran</span>,{" "}
            <span className="font-semibold text-neutral-900">Cursor</span> — are known 
            for exceptional product, hypergrowth, and operating at massive scale. I bring a 
            technology-forward approach to process design and automation, and I&apos;m motivated 
            by making finance functions that don&apos;t just keep up, but create leverage.
          </p>
        </div>


        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors card-hover"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 text-neutral-700 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
