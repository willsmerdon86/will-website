"use client";

import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function FromLocalhostToInternalTool(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-sm text-neutral-500 mb-8">
            <Link href="/blog" className="hover:text-neutral-900 transition-colors">Writing</Link>
            <span className="mx-2">/</span>
            <span>Infrastructure</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            From Localhost to Internal Tool
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              March 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              12 min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Infrastructure", "Deployment", "Security"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-neutral-100 rounded-full text-sm font-medium text-neutral-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose prose-lg prose-neutral max-w-none prose-headings:font-semibold prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline">

            <p><em>Note: Examples throughout this series are drawn from real work but generalized &mdash; specific company details, system internals, and proprietary configurations have been removed.</em></p>

            <p>
              The hardest part of building internal tools isn&apos;t building them. It&apos;s the gap between &ldquo;this works on my laptop&rdquo; and &ldquo;my team can use this.&rdquo; That gap is where most non-engineer builders get stuck, and it&apos;s the part that&apos;s least discussed. This article covers the practical infrastructure progression &mdash; how I went from local prototypes to deployed tools the team uses daily.
            </p>

            <h2>The Progression</h2>
            <p>
              Every tool I built went through roughly the same three stages. Understanding these stages helps you plan what you&apos;re building toward, even when you&apos;re just starting.
            </p>

            <h3>Stage 1: Local Prototype (Day 1)</h3>
            <p>
              This is where you start. You describe what you want to the AI, it builds a web app, and you run it on your laptop. For me, the AI suggested Next.js &mdash; a React framework that runs a local development server on <code>localhost:3000</code>. I didn&apos;t choose it deliberately; the AI recommended it and it worked.
            </p>
            <p>
              At this stage:
            </p>
            <ul>
              <li>The app runs when you type <code>npm run dev</code> in your terminal</li>
              <li>It&apos;s accessible at <code>localhost:3000</code> in your browser</li>
              <li>Data might be hardcoded, pulled from local CSV files, or hitting APIs directly</li>
              <li>Only you can see it &mdash; nobody else on your team</li>
              <li>If you close your laptop, the app stops</li>
            </ul>
            <p>
              This stage is valuable on its own. A local prototype that does the right accounting logic is already better than the spreadsheet it replaces. But it&apos;s a single-player tool.
            </p>

            <h3>Stage 2: Connected Prototype (Week 1-2)</h3>
            <p>
              The first upgrade is connecting to real data sources instead of hardcoded values. This is where the tool starts to be genuinely useful because it reflects live data.
            </p>
            <p>
              The connections I needed:
            </p>
            <ul>
              <li><strong>Data warehouse</strong> &mdash; for analytical queries (revenue waterfalls, aging analysis, usage calculations). I connected to Databricks via OAuth, so queries run against production data models.</li>
              <li><strong>Billing platform APIs</strong> &mdash; for real-time subscription data, invoice status, payment methods. API key authentication, wrapped in server-side routes so credentials aren&apos;t exposed to the browser.</li>
              <li><strong>CRM</strong> &mdash; for contract details, opportunity data, customer information. OAuth flow so individual users authenticate with their own permissions.</li>
              <li><strong>Support platform</strong> &mdash; for customer thread context on AR accounts. API integration for pulling thread summaries and sentiment.</li>
            </ul>
            <p>
              Each integration follows the same pattern: the AI writes the API route (a server-side function that handles authentication and data fetching), and the frontend calls that route. You don&apos;t need to understand the networking &mdash; you describe what data you need and the AI handles the plumbing.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-teal-900 mb-3">The Pattern for Every Data Connection</h4>
              <p className="text-neutral-700 mb-2">
                1. Store credentials in environment variables (never in code)<br />
                2. Create a server-side API route that authenticates and fetches data<br />
                3. Call that route from the frontend<br />
                4. Handle loading states and errors in the UI
              </p>
              <p className="text-neutral-700">The AI generates all four pieces from a single description of what you need.</p>
            </div>

            <h3>Stage 3: Deployed Tool (Week 2-4)</h3>
            <p>
              This is the leap from single-player to multiplayer. The tool runs on a server that&apos;s always on, accessible to your team via a URL, with proper authentication so only authorized people can access it.
            </p>
            <p>
              What deployment involves:
            </p>
            <ul>
              <li><strong>Hosting.</strong> A platform that runs your app 24/7. Vercel, Railway, Render, or your company&apos;s internal infrastructure. The AI can set up the deployment configuration &mdash; it&apos;s usually a few lines of config and a <code>git push</code>.</li>
              <li><strong>Environment variables.</strong> Your API keys and secrets need to be configured on the hosting platform, not just your laptop. Each platform has a UI for this.</li>
              <li><strong>Authentication.</strong> You need to control who can access the tool. This might be as simple as a shared password for a small team, or as proper as SSO integration with your company&apos;s identity provider. Start simple.</li>
              <li><strong>A database.</strong> If your tool needs to persist state &mdash; like a queue of contracts to review or an audit log of actions taken &mdash; you need a database. PostgreSQL is the standard choice. Managed database services make this straightforward.</li>
            </ul>

            <h2>The Stack (and Why It Doesn&apos;t Matter Much)</h2>
            <p>
              For full transparency, here&apos;s what I ended up using:
            </p>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Layer</th>
                    <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Technology</th>
                    <th className="text-left py-3 font-semibold text-neutral-900">Why</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700">
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Framework</td>
                    <td className="py-3 pr-4">Next.js (React)</td>
                    <td className="py-3">The AI suggested it. Works well for internal tools: handles both the frontend and API routes in one project.</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Database</td>
                    <td className="py-3 pr-4">PostgreSQL + Drizzle ORM</td>
                    <td className="py-3">Needed persistent state for queues and audit logs. Drizzle gives you type-safe queries.</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Styling</td>
                    <td className="py-3 pr-4">Tailwind CSS</td>
                    <td className="py-3">The AI generates Tailwind classes fluently. Quick to style without design skills.</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Hosting</td>
                    <td className="py-3 pr-4">Internal infrastructure</td>
                    <td className="py-3">Deployed alongside other internal tools. Vercel or Railway would work fine for most teams.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Cron Jobs</td>
                    <td className="py-3 pr-4">Built-in scheduler</td>
                    <td className="py-3">For automated tasks: data refresh, ingestion, monitoring. Runs on a timer (e.g., every 5 minutes).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              But here&apos;s the thing: <strong>the specific technologies matter far less than you think.</strong> I didn&apos;t evaluate frameworks. The AI picked Next.js, it works, and I&apos;ve never had a reason to change it. If the AI had suggested something else, I&apos;d be using that instead. The accounting logic is the hard part. The infrastructure is commodity.
            </p>

            <h2>Cron Jobs: The Automation Layer</h2>
            <p>
              Cron jobs are what turn a tool from &ldquo;something you check manually&rdquo; to &ldquo;something that works for you in the background.&rdquo; A cron job is just a task that runs on a schedule &mdash; every 5 minutes, every hour, daily at midnight.
            </p>
            <p>
              Examples from my tools:
            </p>
            <ul>
              <li><strong>Contract ingestion:</strong> Every 5 minutes, check the CRM for new Closed Won opportunities and add them to the provisioning queue</li>
              <li><strong>Auto-processing:</strong> Every 5 minutes, pick up queued contracts that have PDF attachments and run the AI extraction</li>
              <li><strong>AR refresh:</strong> Hourly, pull updated invoice and payment data from the billing platform</li>
              <li><strong>Fraud monitoring:</strong> Daily, scan for anomalous subscription patterns and flag for review</li>
            </ul>
            <p>
              The cron pattern is simple: it&apos;s an API route that gets called on a schedule, protected by a secret token so only the scheduler can trigger it. The AI sets this up in minutes.
            </p>
            <p>
              This is where the tools start to feel magical to the rest of the team. &ldquo;New contracts just appear in the queue.&rdquo; &ldquo;The AR dashboard already has today&apos;s data.&rdquo; &ldquo;I got an alert about a suspicious subscription.&rdquo; That&apos;s not because you&apos;re doing anything &mdash; it&apos;s the cron jobs running quietly in the background.
            </p>

            <h2>Database Design for Non-Engineers</h2>
            <p>
              Not every tool needs a database. If your tool just reads data from APIs and displays it, you don&apos;t need one. But if you need to track state &mdash; this contract has been reviewed, this dispute was flagged, this invoice was marked for follow-up &mdash; you need somewhere to store that state.
            </p>
            <p>
              The mental model is simple: a database table is a spreadsheet with strict column types. A row is a record. You insert rows, update rows, and query rows. If you can think in spreadsheets, you can think in database tables.
            </p>
            <p>
              What I needed databases for:
            </p>
            <ul>
              <li><strong>Queue state:</strong> Contract items with status (new &rarr; extracting &rarr; pending review &rarr; approved &rarr; provisioned)</li>
              <li><strong>Audit logs:</strong> Who did what, when, for compliance and debugging</li>
              <li><strong>Extracted data:</strong> AI extraction results saved for comparison and review</li>
              <li><strong>Configuration:</strong> Versioned prompts for AI extraction, threshold settings</li>
            </ul>
            <p>
              The AI designs the schema from your requirements. Describe what you need to track &mdash; items, statuses, extracted data, who reviewed what and when &mdash; and it writes the schema, the migrations, the types, and the query functions.
            </p>

            <h2>Security, Governance, and Doing This Properly</h2>
            <p>
              I want to be direct about this because it&apos;s the part that gets glossed over in most &ldquo;accountant builds tools&rdquo; narratives: <strong>we didn&apos;t just spin up a server and hope for the best.</strong> These tools handle financial data, connect to production systems, and are used for business decisions. They need to be built and deployed with the same rigor you&apos;d expect of any internal application.
            </p>
            <p>
              Here&apos;s how we structured it:
            </p>

            <h3>Authentication and Access Control</h3>
            <p>
              Every tool sits behind the company&apos;s SSO provider (Okta in our case) with group-based permissions restricted to accounting. If you&apos;re not in the accounting group, you don&apos;t get in. This wasn&apos;t optional or something we added later &mdash; it was part of the initial deployment setup, done in partnership with the security engineering team.
            </p>

            <h3>Code Review and PR Governance</h3>
            <p>
              Every change goes through a pull request. We established a risk-rating system for PRs:
            </p>
            <ul>
              <li><strong>High-risk PRs</strong> (changes to data-writing logic, API integrations, authentication flows, anything touching billing system interactions) require review and approval from an engineer on the security or platform team.</li>
              <li><strong>Low-risk PRs</strong> (UI changes, dashboard layout, copy updates, new read-only views) go through automated code review. We use an AI code review tool that scans for security issues, dependency vulnerabilities, and common anti-patterns. Issues flagged by the automated review must be resolved before the PR can merge.</li>
            </ul>
            <p>
              This gives us a sensible balance: engineering oversight where it matters (data integrity, security boundaries), automated guardrails for routine changes, and no bottleneck on the engineering team for low-risk UI work.
            </p>

            <h3>Infrastructure Setup</h3>
            <p>
              The deployment environment was structured with guidance from our security engineering team to mirror how other internal tools were set up:
            </p>
            <ul>
              <li>Secrets managed through the company&apos;s standard secrets infrastructure &mdash; never in code, never in environment files checked into version control</li>
              <li>Database access restricted to the application&apos;s service account with least-privilege permissions</li>
              <li>API credentials scoped to the minimum permissions needed for each integration</li>
              <li>Deployment pipeline follows the same CI/CD patterns as other internal services</li>
            </ul>

            <h3>Working With Engineering, Not Around Them</h3>
            <p>
              An important framing: building tools with AI doesn&apos;t mean bypassing engineering. It means changing the collaboration model. Instead of &ldquo;here are my requirements, please build this and come back in three weeks,&rdquo; the conversation becomes &ldquo;I&apos;ve built a working prototype that does X &mdash; can you review the infrastructure setup, the security boundaries, and the data access patterns?&rdquo;
            </p>
            <p>
              Engineers review the architecture and security-sensitive code. The accounting team owns the business logic and the domain-specific features. Everyone works in their zone of expertise. The AI handles the implementation mechanics that would otherwise require either team to context-switch into the other&apos;s domain.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-teal-900 mb-3">The Principle</h4>
              <p className="text-neutral-700">
                Move fast on the accounting logic and UI &mdash; that&apos;s where your domain expertise lives. Move carefully on security, data access, and production infrastructure &mdash; that&apos;s where you partner with engineering. AI helps you build; your security team helps you deploy safely.
              </p>
            </div>

            <h2>Common Gotchas</h2>

            <h3>Secrets Management</h3>
            <p>
              Never put API keys in your code files. Use your company&apos;s standard secrets management. Every hosting platform has a mechanism for this. This should be established in your initial setup with the security team, not added as an afterthought.
            </p>

            <h3>OAuth Flows</h3>
            <p>
              Some data sources (CRM, data warehouse) use OAuth &mdash; the flow where you click &ldquo;Authorize&rdquo; and get redirected back. These require callback URLs, client IDs, and scopes to be registered properly. The AI handles the code, but you&apos;ll need to register your app in the source system&apos;s admin settings and have the security team review the OAuth scopes. Budget time for this on your first integration.
            </p>

            <h3>Data Refresh Timing</h3>
            <p>
              Your tools are only as good as the data freshness. If the data warehouse refreshes at 6am and your team checks the dashboard at 7am, you&apos;re fine. If they check at 5am, they&apos;re seeing yesterday&apos;s data. Understand the upstream refresh schedules and set your cron jobs accordingly.
            </p>

            <h3>Error Handling</h3>
            <p>
              APIs go down. Queries time out. Tokens expire. Your tools need to fail gracefully &mdash; show a useful error message instead of a blank screen. Ask the AI to add error handling and loading states to every data connection. This is the difference between &ldquo;the tool is broken&rdquo; and &ldquo;the data warehouse is temporarily unavailable, showing cached data.&rdquo;
            </p>

            <h2>The Path for Your Team</h2>
            <p>
              If you&apos;re an accountant or finance professional considering this path:
            </p>
            <ol>
              <li><strong>Start local.</strong> Build something that runs on your laptop and solves a real problem. Don&apos;t worry about deployment yet.</li>
              <li><strong>Connect to real data.</strong> Replace hardcoded values with API calls to your actual systems. This is when the tool becomes genuinely useful.</li>
              <li><strong>Deploy when there&apos;s demand.</strong> When you find yourself screen-sharing the tool in every meeting, or teammates ask &ldquo;can I get access to that thing?&rdquo;, it&apos;s time to deploy.</li>
              <li><strong>Add automation after deployment.</strong> Once it&apos;s deployed, add cron jobs for data refresh, ingestion, and monitoring. This is when the tool starts working for you instead of the other way around.</li>
              <li><strong>Iterate based on usage.</strong> The team will tell you what&apos;s missing. Add it. The AI makes iteration fast.</li>
            </ol>
            <p>
              The entire progression from &ldquo;nothing&rdquo; to &ldquo;deployed tool the team uses daily&rdquo; can happen in a week or two. Not months. Not quarters. The infrastructure is no longer the bottleneck &mdash; your accounting expertise is the hard part, and you already have that.
            </p>

          </article>
        </div>
      </section>

      <section className="py-12 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <Link href="/blog/ai-as-force-multiplier" className="text-neutral-500 hover:text-neutral-900 transition-colors">
            &larr; Previous: AI as Force Multiplier
          </Link>
          <Link href="/blog/building-a-contract-provisioning-queue" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
            Next: Contract Provisioning Queue &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
