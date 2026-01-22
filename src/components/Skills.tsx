"use client";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Revenue & Accounting",
    skills: [
      "ASC 606 Revenue Recognition",
      "SaaS Revenue Accounting",
      "Usage-Based Billing",
      "Technical Accounting",
      "Financial Close",
      "GAAP Compliance",
    ],
  },
  {
    title: "Operations & Systems",
    skills: [
      "Revenue Automation",
      "Order to Cash",
      "Billing Operations",
      "System Design",
      "Process Optimization",
      "ERP Implementation",
    ],
  },
  {
    title: "Business Partnership",
    skills: [
      "GTM Accounting",
      "Product Finance",
      "Deal Desk Support",
      "Monetization Strategy",
      "Cross-Functional Leadership",
      "Executive Communication",
    ],
  },
  {
    title: "Compliance & Audit",
    skills: [
      "External Audit Support",
      "SOX Compliance",
      "Internal Controls",
      "ISO 9001/14001/18001",
      "Risk Assessment",
      "Policy Development",
    ],
  },
];

export default function Skills(): JSX.Element {
  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Deep expertise in{" "}
            <span className="gradient-text">SaaS finance</span>
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Specialized skills developed across high-growth technology
            companies, from revenue recognition to process automation.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="p-8 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white text-neutral-700 text-sm rounded-full border border-neutral-200 hover:border-neutral-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "45→5", label: "Days close reduction at Stripe" },
            { value: "1,500+", label: "Customers migrated to automated billing" },
            { value: "14+", label: "Years of experience" },
            { value: "4", label: "Countries worked in" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
