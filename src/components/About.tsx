"use client";

import { Globe, Users, TrendingUp, Award } from "lucide-react";

const highlights: Array<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Technical Translator",
    description:
      "Bridging the gap between accounting guidance and business reality—turning complex standards into practical, scalable solutions",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Builder",
    description:
      "Built and scaled accounting teams across Revenue, Cost, and Billing Operations",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-Jurisdictional Expertise",
    description:
      "Operated under AASB (Australia), ASPE & IFRS (Canada), and US GAAP—navigating diverse regulatory and audit frameworks",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Process Automation Pioneer",
    description:
      "Reduced financial close from 45 to 5 days through automation at Stripe",
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
            I'm an Australian expat based in Seattle, driven by a passion for solving 
            complex business problems that sit at the intersection of accounting, 
            operations, and technology. Currently, I lead Revenue Accounting and 
            Order to Cash operations at{" "}
            <span className="font-semibold text-neutral-900">Cursor</span>, where 
            I'm helping build the financial infrastructure for one of the fastest-growing 
            AI developer tools companies.
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
