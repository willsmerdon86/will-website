"use client";

import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function TeachingFinanceTeams(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-sm text-neutral-500 mb-8">
            <Link href="/blog" className="hover:text-neutral-900 transition-colors">Writing</Link>
            <span className="mx-2">/</span>
            <span>Playbook</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Teaching Finance Teams to Use AI: A Training Playbook
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              March 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              14 min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Training", "Playbook", "Teams"].map((tag) => (
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

            <p>
              Most AI training for finance teams fails because it starts with the technology and hopes the use cases will follow. It should be the other way around. Start with work the team already does, show how AI accelerates it, and let people experience the &ldquo;aha&rdquo; moment with their own domain knowledge.
            </p>
            <p>
              I&apos;ve run hands-on AI training sessions for finance teams &mdash; accounting, FP&amp;A, tax, billing operations &mdash; and refined the approach through iteration. This article is the playbook: the session structure, the demo sequence, the prompt patterns, and the design decisions that make the training stick.
            </p>

            <h2>The 30-Second Pitch</h2>
            <p>
              Before any demo, you need a framing that resonates with finance professionals. Here&apos;s what works:
            </p>

            <blockquote>
              <p>
                An AI coding assistant is a workspace where you describe what you need in plain English and get working SQL, policy memos, reconciliations, journal entries, data models, and automation scripts back. You don&apos;t need to be a developer. You need to know your domain &mdash; and you already do.
              </p>
            </blockquote>

            <p>
              This framing works because it positions domain expertise as the prerequisite, not technical skill. Finance professionals already have the hard part &mdash; years of accounting knowledge, understanding of their company&apos;s data, and judgment about what matters. The AI handles the implementation.
            </p>

            <h2>Session Structure</h2>
            <p>
              A 60-90 minute session, structured in four parts:
            </p>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Part</th>
                    <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Duration</th>
                    <th className="text-left py-3 font-semibold text-neutral-900">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700">
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4"><strong>1. What Is This?</strong></td>
                    <td className="py-3 pr-4">10 min</td>
                    <td className="py-3">Framing, key concepts, what finance teams actually use it for</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4"><strong>2. Live Demos</strong></td>
                    <td className="py-3 pr-4">40-50 min</td>
                    <td className="py-3">3-5 demos showing real accounting workflows, chosen by audience interest</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4"><strong>3. Patterns &amp; Tips</strong></td>
                    <td className="py-3 pr-4">10 min</td>
                    <td className="py-3">Reusable prompt patterns, validation techniques, what still needs judgment</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4"><strong>4. Hands-On Practice</strong></td>
                    <td className="py-3 pr-4">20 min</td>
                    <td className="py-3">Participants try it themselves with sample data and guided exercises</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>The Demo Sequence</h2>
            <p>
              The demo order matters. You want to build from &ldquo;impressive but accessible&rdquo; to &ldquo;genuinely complex.&rdquo; Each demo should make the audience think &ldquo;I do that manually today.&rdquo;
            </p>

            <h3>Demo 1: From English to SQL (10 min) &mdash; Start Here</h3>
            <p>
              <strong>The setup:</strong> Open three data files &mdash; contracts, invoices, and monthly usage data. Describe a deferred revenue waterfall in plain English, including the ASC 606 logic for seat vs. usage recognition.
            </p>
            <p>
              <strong>The moment:</strong> The AI generates working SQL with proper joins, window functions, and accounting rationale &mdash; in about 90 seconds. Then iterate: &ldquo;Add a per-customer breakdown.&rdquo; &ldquo;Transpose so months are columns.&rdquo; &ldquo;Which customers will exhaust their precommit?&rdquo;
            </p>
            <p>
              <strong>Why it works:</strong> Everyone on a finance team has spent hours building waterfall schedules in Excel. Seeing it done in two minutes with correct accounting logic is the &ldquo;aha&rdquo; moment. It&apos;s the demo that converts skeptics.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-teal-900 mb-3">Demo 1 Prompt Template</h4>
              <p className="text-neutral-700">
                &ldquo;I have three CSV files open: contracts (enterprise SaaS contracts with seat fees and prepaid usage), invoices (all invoices issued against those contracts), and monthly usage (token consumption and precommit drawdown). Write me a SQL query that produces a monthly deferred revenue waterfall with opening balance, additions, seat recognition (straight-line), usage recognition (consumption-based, capped at precommit), on-demand usage, closing balance, and a validation column. Explain the ASC 606 basis.&rdquo;
              </p>
            </div>

            <h3>Demo 2: The Detective Story (10 min)</h3>
            <p>
              <strong>The setup:</strong> Show subscription data that includes anomalies &mdash; subscriptions with no payments, subscriptions that should have been cancelled, subscriptions with suspicious patterns.
            </p>
            <p>
              <strong>The moment:</strong> Walk through the investigation like a forensic analyst. Start with &ldquo;identify subscriptions that have never received a payment.&rdquo; Then quantify the financial impact. Then draft the remediation plan and the bug report for the engineering team.
            </p>
            <p>
              <strong>Why it works:</strong> Every finance team has a &ldquo;zombie&rdquo; problem they haven&apos;t had time to investigate &mdash; stale subscriptions, phantom invoices, billing anomalies sitting on the backlog. This demo shows the AI as a tool for the things you never have time for.
            </p>

            <h3>Demo 3: Audit-Ready Memos (8 min)</h3>
            <p>
              <strong>The setup:</strong> Open contract data and ask the AI to generate a five-step ASC 606 revenue recognition analysis.
            </p>
            <p>
              <strong>The moment:</strong> The output is a proper technical memo with citations &mdash; not a summary. It addresses performance obligations, material rights, contract liabilities, and recognition patterns. It&apos;s the kind of memo that takes a senior accountant a full day to write.
            </p>
            <p>
              <strong>Why it works:</strong> Writing policy memos is slow, high-skill work. Seeing a solid first draft in 90 seconds reframes what&apos;s possible. The accountant&apos;s job shifts from drafting to reviewing and refining.
            </p>

            <h3>Demo 4: CECL in a Chat Window (8 min)</h3>
            <p>
              <strong>The setup:</strong> Open AR aging data and dispute data. Ask the AI to build a three-population CECL framework.
            </p>
            <p>
              <strong>The moment:</strong> The AI separates ASC 606 variable consideration (disputes) from CECL (credit risk) from fraud reserves, builds the aging-based reserve rates from historical data, and writes the journal entries.
            </p>
            <p>
              <strong>Why it works:</strong> Reserve calculations are judgment-heavy and audit-sensitive. The AI doesn&apos;t replace the judgment but does the mechanical work and explains the &ldquo;why&rdquo; &mdash; which makes the judgment easier and better documented.
            </p>

            <h3>Demo 5: Close the Books Faster (8 min)</h3>
            <p>
              <strong>The setup:</strong> Run through multiple close tasks in a single conversation: unbilled accruals, DR roll-forward, revenue cutoff, and reconciliation prep.
            </p>
            <p>
              <strong>The moment:</strong> For each task, the AI generates SQL, journal entries, and audit documentation. The close checklist that takes days becomes a conversation that takes minutes.
            </p>
            <p>
              <strong>Why it works:</strong> Month-end close is the universal finance pain point. Shaving days off close is real money and real quality of life.
            </p>

            <h2>The Prompt Patterns</h2>
            <p>
              After the demos, teach four reusable patterns that work across any finance workflow:
            </p>

            <h3>Pattern 1: The Context Stack</h3>
            <p>
              The more context you give the AI, the better the output. Before asking a question:
            </p>
            <ol>
              <li>Open your data files (CSVs, SQL scripts, exports)</li>
              <li>Open your reference docs (policy memos, SOPs, chart of accounts)</li>
              <li>Open your GL mapping or trial balance</li>
              <li>Then ask your question &mdash; the AI sees everything and connects the dots</li>
            </ol>
            <p>
              Most underwhelming AI outputs happen because the AI didn&apos;t have enough context. Loading the workspace with relevant files before you prompt is the single highest-leverage habit.
            </p>

            <h3>Pattern 2: Explain Then Build</h3>
            <p>
              Ask the AI to explain the accounting treatment <em>first</em>, then build the analysis:
            </p>
            <ol>
              <li>&ldquo;How should we treat prepaid usage under ASC 606?&rdquo;</li>
              <li>&ldquo;Now write the SQL that implements that treatment against our data&rdquo;</li>
              <li>&ldquo;Generate the journal entries&rdquo;</li>
              <li>&ldquo;Write the memo documenting this for auditors&rdquo;</li>
            </ol>
            <p>
              This pattern builds understanding and catches errors early. If the AI&apos;s explanation of the accounting is wrong, you correct it before any code is written.
            </p>

            <h3>Pattern 3: Iterate, Don&apos;t Restart</h3>
            <p>
              The first prompt gets you 80% of the way. Then:
            </p>
            <ul>
              <li>&ldquo;Add a column for variance to prior month&rdquo;</li>
              <li>&ldquo;Break this out by business unit&rdquo;</li>
              <li>&ldquo;Now write the journal entry for this accrual&rdquo;</li>
              <li>&ldquo;Format this as a table I can paste into a memo&rdquo;</li>
            </ul>
            <p>
              Each follow-up builds on the full conversation context. You&apos;re refining, not starting over. This is where the productivity multiplier comes from.
            </p>

            <h3>Pattern 4: The Validation Loop</h3>
            <p>
              Always ask the AI to validate its own work:
            </p>
            <ul>
              <li>&ldquo;Add a check column that proves debits equal credits&rdquo;</li>
              <li>&ldquo;Write a reconciliation query that ties this back to the GL&rdquo;</li>
              <li>&ldquo;What edge cases might break this logic?&rdquo;</li>
            </ul>
            <p>
              This is where professional skepticism meets AI. The AI is a fast, tireless analyst &mdash; but you&apos;re the auditor. Train the habit of validating every output.
            </p>

            <h2>Designing the Sample Data</h2>
            <p>
              The sample data makes or breaks the training. Here&apos;s what I&apos;ve learned about designing it:
            </p>

            <h3>Use Realistic Structure, Fictional Values</h3>
            <p>
              The data should look like real SaaS financial data &mdash; proper column names, realistic relationships, plausible amounts &mdash; but with fictional customers and numbers. People can&apos;t learn if the data feels fake, but you can&apos;t use production data in a training setting.
            </p>

            <h3>Embed Anomalies</h3>
            <p>
              Include data quality issues that mirror real-world problems:
            </p>
            <ul>
              <li>A subscription with no associated payment (the zombie)</li>
              <li>An invoice amount that doesn&apos;t match the contract rate (a billing error)</li>
              <li>A customer with usage above their precommit but no on-demand charges (a cap issue)</li>
              <li>Duplicate invoice lines (a common data quality problem)</li>
            </ul>
            <p>
              When participants discover these anomalies during the hands-on exercise, it reinforces the value &mdash; &ldquo;the AI found something I would have missed.&rdquo;
            </p>

            <h3>Keep It Small but Complete</h3>
            <p>
              I&apos;ve found that 10-20 contracts, 30-40 invoices, and 60-70 usage records is the sweet spot. Enough to be realistic, small enough to verify by hand if someone wants to spot-check the AI&apos;s work.
            </p>

            <h3>Include Multiple Data Types</h3>
            <p>
              A good sample data set for finance training includes:
            </p>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-3 pr-4 font-semibold text-neutral-900">File</th>
                    <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Purpose</th>
                    <th className="text-left py-3 font-semibold text-neutral-900">Records</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700">
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Contracts</td>
                    <td className="py-3 pr-4">Enterprise contracts with terms, rates, seat counts</td>
                    <td className="py-3">~12</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Invoices</td>
                    <td className="py-3 pr-4">Invoice line items (seat, usage, true-up) with payment status</td>
                    <td className="py-3">~30</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Monthly Usage</td>
                    <td className="py-3 pr-4">Token consumption and precommit drawdown per contract</td>
                    <td className="py-3">~65</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Self-Serve Subscriptions</td>
                    <td className="py-3 pr-4">Billing subscriptions including potential zombies</td>
                    <td className="py-3">~20</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">AR Aging</td>
                    <td className="py-3 pr-4">Receivables by aging bucket with dispute flags</td>
                    <td className="py-3">~17</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Trial Balance</td>
                    <td className="py-3 pr-4">GL accounts (revenue, COGS, AR, DR, reserves)</td>
                    <td className="py-3">~19</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Disputes</td>
                    <td className="py-3 pr-4">Payment disputes with reasons and outcomes</td>
                    <td className="py-3">~20</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>The Hands-On Exercises</h2>
            <p>
              After the demos and patterns, give participants 20 minutes to try it themselves. Design exercises for different roles:
            </p>

            <h3>For Revenue Accountants</h3>

            <blockquote>
              <p>
                Open the contracts and usage data. Ask: &ldquo;Which customers will exhaust their prepaid usage before their contract ends? Show me the projected exhaustion month and the on-demand cost if they maintain current usage levels.&rdquo;
              </p>
            </blockquote>

            <h3>For Controllers</h3>

            <blockquote>
              <p>
                Open the trial balance. Ask: &ldquo;Review this trial balance for a SaaS company. What&apos;s the gross margin? What&apos;s net revenue after contra items? Does anything look unusual compared to typical SaaS benchmarks?&rdquo;
              </p>
            </blockquote>

            <h3>For FP&amp;A Analysts</h3>

            <blockquote>
              <p>
                Open the usage data. Ask: &ldquo;Create a cohort analysis of usage growth by contract vintage month. Show how usage ramps in months 1, 2, 3... after contract start. Is there a pattern?&rdquo;
              </p>
            </blockquote>

            <h3>For Tax Analysts</h3>

            <blockquote>
              <p>
                Ask: &ldquo;Our SaaS company has customers in California, Texas, New York, and the UK. For each jurisdiction, what are our tax obligations for SaaS revenue? Include registration thresholds, rates, and filing frequencies.&rdquo;
              </p>
            </blockquote>

            <h2>What Still Needs Human Judgment</h2>
            <p>
              Close the session by being explicit about the boundaries. This builds trust and prevents the &ldquo;AI will replace us&rdquo; anxiety:
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-amber-900 mb-3">AI Is Great At (Finance Edition)</h4>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex gap-2"><span>•</span><span>SQL from business requirements (any dialect)</span></li>
                <li className="flex gap-2"><span>•</span><span>Technical accounting memos and analyses</span></li>
                <li className="flex gap-2"><span>•</span><span>Data reconciliation and gap analysis</span></li>
                <li className="flex gap-2"><span>•</span><span>Building automation (scripts, APIs, dashboards)</span></li>
                <li className="flex gap-2"><span>•</span><span>Explaining complex accounting to non-accountants</span></li>
                <li className="flex gap-2"><span>•</span><span>Iterating on analyses without starting over</span></li>
              </ul>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-teal-900 mb-3">Still Needs Human Judgment</h4>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex gap-2"><span>•</span><span>Accounting policy decisions (the AI provides analysis; you make the call)</span></li>
                <li className="flex gap-2"><span>•</span><span>Materiality thresholds</span></li>
                <li className="flex gap-2"><span>•</span><span>Auditor relationship management</span></li>
                <li className="flex gap-2"><span>•</span><span>Business context that isn&apos;t in the data</span></li>
                <li className="flex gap-2"><span>•</span><span>Anything requiring professional skepticism</span></li>
              </ul>
            </div>

            <h2>Lessons from Running Sessions</h2>

            <h3>Start with the DR Waterfall Demo</h3>
            <p>
              I&apos;ve tried different opening demos. The deferred revenue waterfall consistently gets the strongest reaction. It&apos;s universally understood by finance professionals, it&apos;s painful to build manually, and the live iteration (adding per-customer views, transposing) shows the power of conversational refinement.
            </p>

            <h3>Let People Choose Their Demos</h3>
            <p>
              After the first demo, ask the room which topics interest them most. A room full of revenue accountants will want different demos than a room of FP&amp;A analysts. Having 8-10 demos prepared and running 3-5 based on audience interest keeps engagement high.
            </p>

            <h3>The Skeptics Convert When They Try It</h3>
            <p>
              The hands-on portion is where skeptics convert. Someone who&apos;s been quiet through the demos will type their own question, see a result that reflects their domain knowledge, and suddenly get it. Allocate at least 20 minutes for hands-on time &mdash; don&apos;t cut it short for more demos.
            </p>

            <h3>Follow Up with Use Case Office Hours</h3>
            <p>
              The training session plants the seed. The real adoption happens when people try it with their actual work. Offering drop-in office hours in the two weeks after training &mdash; &ldquo;bring your real problems, we&apos;ll work through them together&rdquo; &mdash; dramatically increases adoption rates.
            </p>

            <h3>Share the Sample Data and Prompts</h3>
            <p>
              Give participants the full data set and all demo prompts after the session. They&apos;ll re-run the demos on their own, modify the prompts for their use cases, and share them with colleagues who weren&apos;t in the room.
            </p>

            <h2>Building Your Own Training Kit</h2>
            <p>
              If you want to run this at your company:
            </p>
            <ol>
              <li><strong>Create realistic sample data</strong> that mirrors your company&apos;s financial structure (but with fictional values)</li>
              <li><strong>Write 8-10 demo prompts</strong> covering your team&apos;s main workflows &mdash; close tasks, reconciliations, reserves, investigations, memo writing</li>
              <li><strong>Design role-specific exercises</strong> so everyone has something relevant to try</li>
              <li><strong>Prepare the four prompt patterns</strong> (Context Stack, Explain Then Build, Iterate Don&apos;t Restart, Validation Loop) as a one-page reference</li>
              <li><strong>Schedule 90 minutes</strong> &mdash; 60 if you must, but the hands-on time is where conversion happens</li>
            </ol>
            <p>
              The investment is maybe a day to build the training kit. The return is a finance team that can build analyses, memos, and tools at 10x the speed they could before.
            </p>

          </article>
        </div>
      </section>

      <section className="py-12 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <Link href="/blog/building-a-contract-provisioning-queue" className="text-neutral-500 hover:text-neutral-900 transition-colors">
            &larr; Previous: Contract Provisioning Queue
          </Link>
          <Link href="/blog" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
            All Articles &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
