"use client";

import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function TheAccountantBuilder(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-sm text-neutral-500 mb-8">
            <Link href="/blog" className="hover:text-neutral-900 transition-colors">Writing</Link>
            <span className="mx-2">/</span>
            <span>The Accountant-Builder</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            The Accountant-Builder
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              March 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              15 min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Framework", "AI", "Finance"].map((tag) => (
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

            <p><em>Note: Examples throughout this series are drawn from real work but generalized &mdash; specific company details, system internals, customer names, and proprietary data have been removed. The methodology and thought process are what matter.</em></p>

            <p>
              When I joined a high-growth SaaS company to build the revenue accounting function from scratch, I had no engineering background. Fifteen years in audit, revenue accounting, and billing operations. I knew debits and credits, ASC 606, and how to close the books. I did not know how to build software.
            </p>
            <p>
              Within four months, I had built over fifteen internal tools the team uses daily and was using AI to complete investigations and analyses in minutes that previously took hours or days. This article explains the two distinct modes of value I&apos;ve found, and a framework for deciding which one fits which problem.
            </p>

            <h2>The False Start Problem</h2>
            <p>
              Before getting into the framework, I want to address something I hear constantly: &ldquo;I tried AI and it didn&apos;t work.&rdquo; There&apos;s a growing backlash where people feel they&apos;ve been oversold &mdash; they open an AI tool, ask it something vague, get a mediocre answer, and conclude the technology isn&apos;t ready. This is a false start, and it&apos;s almost always a framing problem, not a technology problem.
            </p>
            <p>
              The mental model that works: <strong>think of AI as an eager intern who has read everything but has never worked a day in your industry.</strong> They have encyclopedic knowledge &mdash; every accounting standard, every SQL pattern, every framework. But they have zero context about your business, your systems, your data, or what &ldquo;good&rdquo; looks like in your specific environment. If you hand them a vague assignment (&ldquo;help me with revenue recognition&rdquo;), you&apos;ll get a vague, textbook answer back. If you hand them a specific assignment with context (&ldquo;here&apos;s our contract structure, here&apos;s our billing system, here&apos;s the specific question I need answered, and here&apos;s the data to work with&rdquo;), you&apos;ll get something genuinely useful.
            </p>
            <p>
              The people who dismiss AI after a bad first experience almost always made the same mistake: they tested it without giving it the context it needed. They asked it a question the way they&apos;d ask Google, not the way they&apos;d brief a colleague. The gap between &ldquo;AI is useless&rdquo; and &ldquo;AI just saved me a full day of work&rdquo; is almost entirely about how you frame the problem and what context you provide. The domain expertise &mdash; the specificity, the judgment, the &ldquo;here&apos;s what actually matters&rdquo; &mdash; that&apos;s the part only you can bring.
            </p>

            <h2>Two Modes, Not One</h2>
            <p>
              Most conversations about AI in finance jump straight to building things: dashboards, apps, automation. But that&apos;s only half the picture. There are actually two distinct ways these tools create value, and confusing them leads to over-engineering simple problems or under-investing in ones that deserve a real system.
            </p>
            <p>
              Before diving in, an important framing: <strong>none of this is about building enterprise software.</strong> We&apos;re not trying to ship products or compete with engineering teams. The point is unlocking velocity and throughput without being bottlenecked by upstream or partner teams. When accounting needs a dashboard, a queue, or an investigation, we shouldn&apos;t have to wait in a sprint backlog for six months. Some of what you build will live on and become critical infrastructure the team relies on daily. Some of it will serve its purpose for a quarter and get replaced by something better &mdash; or by a proper engineering solution once the requirements are proven out. Both outcomes are fine. The value isn&apos;t in the permanence of the artifact; it&apos;s in the speed at which your team can move and the problems you can solve without waiting for someone else to prioritize your needs.
            </p>

            <h3>Mode 1: Using AI for Daily Work</h3>
            <p>
              This is the immediate, zero-infrastructure value. You open your AI coding assistant, describe what you need, and get a deliverable back. No deployment, no database, no ongoing maintenance. You use it once and move on.
            </p>
            <p>
              Examples from my own work:
            </p>
            <ul>
              <li><strong>A billing anomaly investigation</strong> &mdash; surfaced the root cause, quantified exposure across all affected accounts, wrote the SQL, produced the remediation plan, and drafted the bug report for engineering. Fifteen minutes. The old way: a full day of manual work.</li>
              <li><strong>Draft preparation for technical accounting memos</strong> &mdash; AI generates a structured first draft of an ASC 606 analysis or reserve methodology that I then review, refine, and apply professional judgment to. It accelerates the drafting phase; the conclusions are mine.</li>
              <li><strong>Month-end close analyses</strong> &mdash; unbilled accruals, revenue cutoff tests, DR roll-forwards. Each one takes minutes instead of hours, with manual validation against source systems before anything is booked.</li>
            </ul>
            <p>
              The defining characteristic: <strong>no permanent artifact.</strong> The output is a memo, a SQL query, a spreadsheet, a brief. You use it, file it, move on. The AI was a force multiplier for your existing skills, not a system you maintain.
            </p>

            <h3>Mode 2: Building Persistent Tools</h3>
            <p>
              This is where you build something that lives on, that your team interacts with, that runs on a schedule. A deferred revenue waterfall dashboard. An automated contract provisioning queue. A fraud monitoring system. An AP inbox that triages vendor invoices.
            </p>
            <p>
              These take more time to build, require infrastructure decisions, and create ongoing maintenance obligations. But they also compound: once the tool exists, it saves time every day, not just once.
            </p>

            <h2>The Decision Framework: Build vs. Use</h2>
            <p>
              This is the most important section of this article. Getting the build/use decision right determines whether you spend an afternoon building something transformative or a week building something nobody needs.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-teal-900 mb-3">Use AI conversationally (Mode 1) when:</h4>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex gap-2"><span>•</span><span>The task is <strong>one-time or infrequent</strong> &mdash; an investigation, a policy memo, a board-level analysis</span></li>
                <li className="flex gap-2"><span>•</span><span>The output is a <strong>document or decision</strong>, not a process</span></li>
                <li className="flex gap-2"><span>•</span><span>The data inputs change every time &mdash; different customer, different quarter, different question</span></li>
                <li className="flex gap-2"><span>•</span><span>You&apos;re the only consumer of the output</span></li>
                <li className="flex gap-2"><span>•</span><span>Speed of the first result matters more than repeatability</span></li>
              </ul>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-amber-900 mb-3">Build a persistent tool (Mode 2) when:</h4>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex gap-2"><span>•</span><span>The task <strong>repeats on a schedule</strong> &mdash; monthly close, daily monitoring, quarterly review</span></li>
                <li className="flex gap-2"><span>•</span><span>Multiple people need to interact with it, not just you</span></li>
                <li className="flex gap-2"><span>•</span><span>The logic is stable but the data refreshes &mdash; same calculation, new month</span></li>
                <li className="flex gap-2"><span>•</span><span>You need an <strong>audit trail</strong> &mdash; who reviewed what, when, with what result</span></li>
                <li className="flex gap-2"><span>•</span><span>The process has workflow states &mdash; pending, reviewed, approved, provisioned</span></li>
                <li className="flex gap-2"><span>•</span><span>You&apos;re replacing a manual handoff between people or systems</span></li>
              </ul>
            </div>

            <p>
              The mistake I see people make: building a tool for something that should have been a conversation. If you need a one-time reconciliation between two data sources, just describe it to the AI and get the answer. Don&apos;t build a reconciliation dashboard. Save the building for things that will run next month, and the month after that.
            </p>

            <h2>What I Built (and What I Didn&apos;t)</h2>
            <p>
              Applying this framework, here&apos;s roughly how the work split:
            </p>

            <h3>Things I Built (Mode 2)</h3>
            <p>
              These are the things that repeat, that the team uses, that run on a schedule:
            </p>
            <ul>
              <li><strong>Deferred revenue waterfall</strong> &mdash; runs monthly, used by the whole accounting team, reconciled to three systems, auditor-facing</li>
              <li><strong>Contract provisioning queue</strong> &mdash; every new enterprise contract flows through this: CRM ingestion, AI extraction of PDF terms, validation, human review, provisioning handoff</li>
              <li><strong>Dispute reserve calculator</strong> &mdash; monthly ASC 606 variable consideration calculation, automated data pull, trend analysis</li>
              <li><strong>Fraud monitoring dashboard</strong> &mdash; daily refresh, pattern detection, alert thresholds</li>
              <li><strong>AR dashboard with collections intelligence</strong> &mdash; aging, cash forecast, support thread analysis</li>
              <li><strong>AP inbox</strong> &mdash; syncs vendor emails, extracts invoice details, triages for approval</li>
              <li><strong>Tax compliance tracker</strong> &mdash; integration with tax automation platform, filing status, exemption management</li>
            </ul>

            <h3>Things I Used AI For Directly (Mode 1)</h3>
            <p>
              These are the investigations, analyses, and one-time deliverables where building a tool would have been overkill:
            </p>
            <ul>
              <li><strong>Billing anomaly investigations</strong> &mdash; usage stacking issues, subscription misconfigurations, payment method problems. Each one unique, each one fast.</li>
              <li><strong>Draft preparation for policy memos</strong> &mdash; ASC 606 assessments, CECL methodology docs, reserve analyses. AI accelerates the drafting; the accounting conclusions and judgment are applied by the accountant.</li>
              <li><strong>Auditor correspondence drafts</strong> &mdash; contract inception analysis, treatment confirmations. Drafted quickly, then refined with professional judgment and relationship context.</li>
              <li><strong>Data investigations</strong> &mdash; zombie subscription forensics, revenue leakage analysis, cross-system reconciliation one-offs. Always validated against source systems before acting on findings.</li>
              <li><strong>Board and executive materials</strong> &mdash; financial summaries, trend analyses, risk assessments.</li>
            </ul>

            <h2>Why Domain Expertise Is the Prerequisite</h2>
            <p>
              The common assumption is that AI tools require technical skill. The reality is the opposite: they require <strong>domain expertise</strong>. The AI can write SQL, build dashboards, draft memos, and structure analyses. What it can&apos;t do is know that prepaid usage commitments create contract liabilities under ASC 606, or that a chargeback reserve requires different accounting treatment than a bad debt allowance, or that a zombie subscription generates phantom invoices that inflate gross revenue.
            </p>
            <p>
              The specificity of your requirements determines the quality of the output. &ldquo;Build me a revenue dashboard&rdquo; produces something generic. &ldquo;Build me a monthly deferred revenue waterfall with opening balance, additions from seat and prepaid usage invoices, straight-line seat recognition over the contract term, consumption-based usage recognition capped at precommit, and a closing balance with a validation column that proves the math ties. Pull contract data from the CRM via API, invoice and payment data from the billing platform, and usage consumption from the data warehouse. The waterfall should reconcile to the GL trial balance and the billing system&apos;s deferred revenue balance, with a variance column that flags anything over $100&rdquo; produces something that actually works.
            </p>
            <p>
              That level of specificity comes from years of accounting experience, not from learning to code.
            </p>

            <h2>The Cost Equation</h2>
            <p>
              This is worth being explicit about because the numbers are striking. An AI coding assistant costs roughly $20-40 per month. A single investigation that would have taken a senior accountant a full day &mdash; loaded cost of $800-1,200 depending on your market &mdash; takes fifteen minutes and costs less than a dollar in AI inference. The return on that subscription is measured in orders of magnitude, not percentages.
            </p>
            <p>
              Building a persistent tool is more investment: maybe an afternoon to a few days for something substantial, plus the time to set up proper infrastructure, security review, and deployment governance (more on that in <Link href="/blog/from-localhost-to-internal-tool">Article 03</Link>). But compare that to the alternative &mdash; putting a request on the engineering backlog, waiting weeks for sprint prioritization, going through the requirements-build-review cycle. The tools I built in four months would have taken a year or more through traditional channels, if they got built at all. Most of them wouldn&apos;t have. They&apos;d still be on the backlog.
            </p>

            <h2>What Still Requires Human Judgment</h2>
            <p>
              AI is an accelerant, not a replacement. The things that still require an accountant:
            </p>
            <ul>
              <li><strong>Accounting policy decisions.</strong> The AI can lay out the five-step ASC 606 analysis. You decide how to apply it.</li>
              <li><strong>Materiality.</strong> What&apos;s worth building a tool for? What&apos;s a rounding difference vs. a real break?</li>
              <li><strong>Business context.</strong> Why did that customer&apos;s usage spike? Is that a billing error or legitimate growth? The AI sees data; you see the business.</li>
              <li><strong>Professional skepticism.</strong> When the reconciliation ties too perfectly, when the reserve feels low &mdash; that instinct comes from experience.</li>
              <li><strong>Auditor communication.</strong> AI can help structure and draft memos, but managing the relationship, understanding what satisfies your auditors, and applying the right level of rigor &mdash; that&apos;s human.</li>
              <li><strong>Validation.</strong> Every AI-generated analysis gets validated against source systems before it&apos;s acted on. The AI gives you speed; you provide the assurance that the output is correct.</li>
            </ul>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-teal-900 mb-3">The Series</h4>
              <p className="text-neutral-700">
                The rest of this series goes deeper on each mode. <Link href="/blog/ai-as-force-multiplier" className="font-semibold text-teal-800 hover:underline">Article 02</Link> covers the force multiplier mode &mdash; concrete examples of AI-assisted investigations and analyses with quantified time and cost savings. <Link href="/blog/from-localhost-to-internal-tool" className="font-semibold text-teal-800 hover:underline">Article 03</Link> covers the infrastructure you need when you do decide to build. <Link href="/blog/building-a-contract-provisioning-queue" className="font-semibold text-teal-800 hover:underline">Article 04</Link> is a deep dive on building one specific tool end-to-end. And <Link href="/blog/teaching-finance-teams" className="font-semibold text-teal-800 hover:underline">Article 05</Link> covers how to train your team.
              </p>
            </div>

          </article>
        </div>
      </section>

      <section className="py-12 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <Link href="/blog" className="text-neutral-500 hover:text-neutral-900 transition-colors">
            &larr; All Articles
          </Link>
          <Link href="/blog/ai-as-force-multiplier" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
            Next: AI as Force Multiplier &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
