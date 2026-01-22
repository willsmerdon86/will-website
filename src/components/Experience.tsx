"use client";

import { ExternalLink } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  companyUrl?: string;
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    company: "Cursor",
    role: "Revenue Accounting & Order to Cash",
    period: "Nov 2025 - Present",
    location: "Seattle, WA",
    description:
      "Leading revenue accounting and order to cash operations at the AI-powered developer tools company, building scalable financial infrastructure to support hypergrowth.",
    highlights: [
      "Establishing revenue recognition frameworks for AI product offerings",
      "Building scalable order-to-cash processes",
      "Implementing financial controls and automation",
    ],
    companyUrl: "https://cursor.com",
    current: true,
  },
  {
    company: "Fivetran",
    role: "Senior Director, Revenue Accounting",
    period: "Jan 2023 - Nov 2025",
    location: "Oakland, CA",
    description:
      "Led revenue accounting function for the automated data movement platform, overseeing complex revenue recognition for usage-based and subscription models.",
    highlights: [
      "Scaled revenue accounting for rapid company growth",
      "Led technical accounting initiatives and audit support",
      "Drove process improvements and automation initiatives",
    ],
    companyUrl: "https://fivetran.com",
  },
  {
    company: "Stripe",
    role: "Head of GTM Accounting & SaaS",
    period: "Aug 2017 - Jan 2023",
    location: "San Francisco, CA",
    description:
      "Joined at ~700 employees. Led ASC 606 implementation, revenue accounting automation, and GTM accounting across product launches and new business models.",
    highlights: [
      "Led ASC 606 implementation with National Office review for gross vs net presentation",
      "Reduced financial close from 45 to 5 days through automation",
      "Migrated 1,500+ customers from manual to automated billing",
      "SME & DRI for end-to-end Revenue Accounting Automation",
      "In-house revenue recognition consultant for Stripe's Billing Product",
      "Advised product, finance, legal, sales, and engineering on accounting impact of new initiatives",
    ],
    companyUrl: "https://stripe.com",
  },
  {
    company: "Grant Thornton LLP",
    role: "Audit & Assurance Manager",
    period: "Jul 2011 - Aug 2017",
    location: "Adelaide / Vancouver / San Francisco",
    description:
      "Progressive career across three global offices, specializing in financial services and technology sector audits.",
    highlights: [
      "Managed audit engagements across financial services and tech sectors",
      "Developed expertise in revenue recognition and complex accounting",
      "Built strong foundation in SOX compliance and internal controls",
    ],
    companyUrl: "https://www.grantthornton.com",
  },
  {
    company: "Vectra Corporation",
    role: "Accounts Officer & ISO Management Representative",
    period: "Feb 2008 - Feb 2011",
    location: "Adelaide, Australia",
    description:
      "Dual role managing accounting functions and quality management systems for IT services company.",
    highlights: [
      "Managed accounts payable, receivable, and financial reporting",
      "Designed and implemented Quality Management System",
      "Maintained ISO 9001, 14001, and 18001 certifications",
    ],
  },
];

export default function Experience(): JSX.Element {
  return (
    <section id="experience" className="py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
            Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            14+ years building{" "}
            <span className="gradient-text">finance excellence</span>
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            From global public accounting to leading finance at some of the most
            innovative tech companies in the world.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-sm card-hover ${
                exp.current ? "ring-2 ring-teal-500/20" : ""
              }`}
            >
              {exp.current && (
                <div className="absolute -top-3 left-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
                    </span>
                    Current Role
                  </span>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Company info */}
                <div className="md:w-64 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {exp.company}
                    </h3>
                    {exp.companyUrl && (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500">{exp.period}</p>
                  <p className="text-sm text-neutral-500">{exp.location}</p>
                </div>

                {/* Role details */}
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-neutral-800 mb-3">
                    {exp.role}
                  </h4>
                  <p className="text-neutral-600 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-neutral-600"
                      >
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
