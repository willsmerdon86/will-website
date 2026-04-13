"use client";

import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function BuildingAContractProvisioningQueue(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-sm text-neutral-500 mb-8">
            <Link href="/blog" className="hover:text-neutral-900 transition-colors">Writing</Link>
            <span className="mx-2">/</span>
            <span>Deep Dive</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Building an Automated Contract Provisioning Queue
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              March 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              18 min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Deep Dive", "Automation", "Enterprise"].map((tag) => (
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

            <p><em>Note: This deep dive is drawn from real work but generalized &mdash; specific system details, field names, customer data, and proprietary configurations have been removed. The architecture, thought process, and patterns are what matter.</em></p>

            <p>
              This article is a deep dive on building one specific tool end-to-end: an automated contract provisioning queue. It takes everything from the earlier articles &mdash; the build/use decision framework, the infrastructure progression, the AI-assisted development process &mdash; and applies it to a real, complex problem.
            </p>
            <p>
              I chose this example because it touches every layer: CRM integration, AI-powered document extraction, database-backed queue state, automated workflows, human review UI, reconciliation, and audit logging. If you understand how this system was built, you can build anything in the same category.
            </p>

            <h2>The Problem</h2>
            <p>
              Every enterprise SaaS company has the same contract provisioning bottleneck. A deal closes in the CRM, an order form (PDF) gets signed, and someone on the operations team needs to:
            </p>
            <ol>
              <li>Find the order form attachment in the CRM opportunity</li>
              <li>Read it and extract the key terms: seat count, contract dates, prepaid usage commitment, billing frequency, rates</li>
              <li>Compare the extracted terms to what&apos;s in the CRM fields (they often don&apos;t match &mdash; sales reps make data entry errors, the order form has terms the CRM doesn&apos;t capture)</li>
              <li>Provision the customer&apos;s access in the billing and platform systems</li>
              <li>Confirm everything ties: CRM &rarr; order form &rarr; billing system &rarr; platform access</li>
            </ol>
            <p>
              Before automation, each contract took 30-60 minutes of manual work &mdash; reading the PDF, typing values into spreadsheets, toggling between systems, double-checking numbers. With 10-20 new contracts per week during growth periods, that&apos;s an entire person&apos;s time just on provisioning. And mistakes were common: a misread seat count, a wrong start date, a missed precommit amount.
            </p>

            <h2>Why This Was a &ldquo;Build&rdquo; Decision</h2>
            <p>
              Applying the framework from <Link href="/blog/the-accountant-builder">Article 01</Link>: this is clearly a Mode 2 problem. It repeats on every deal close. Multiple people interact with the queue. The logic is stable (extract, validate, provision) but the data changes every time. It has workflow states. It needs an audit trail. And it replaces a manual handoff between people and systems.
            </p>
            <p>
              A one-time AI conversation couldn&apos;t solve this &mdash; it required a persistent system.
            </p>

            <h2>The Architecture</h2>
            <p>
              The system has five core components, plus several supporting surfaces that were added as the system matured:
            </p>

            <h3>1. Automated Ingestion</h3>
            <p>
              A cron job runs every five minutes, checking the CRM for newly closed deals. When it finds one, it snapshots the key commercial fields (account, deal value, dates, quantities, product type, transaction type) and inserts a row into the queue database with status <code>new</code>. The system handles multiple transaction types &mdash; new business, renewals, amendments, and expansions &mdash; with distinct handling for each.
            </p>
            <p>
              The key design decision: <strong>snapshot the CRM data at ingestion time.</strong> Don&apos;t query the CRM live on every page load. CRM data changes (reps update fields after close), and you want to know what the data looked like when the contract entered the queue. This also means the queue loads instantly instead of waiting for CRM API calls.
            </p>
            <p>
              The ingestion logic also checks provisioning state automatically &mdash; cross-referencing the CRM deal against the billing and platform systems to determine whether it&apos;s already provisioned, partially provisioned, or not yet set up. This means items that are already handled can be auto-dismissed, keeping the active queue focused on what actually needs attention.
            </p>

            <h3>2. AI-Powered PDF Extraction</h3>
            <p>
              This is the core of the system. When a queue item has a PDF attachment, the auto-processing cron job picks it up and sends the PDF to an AI model with a structured extraction prompt.
            </p>
            <p>
              The prompt is versioned and stored in the database &mdash; not hardcoded. This was a critical early decision. As we discovered edge cases (order forms with different layouts, addendums, multi-product deals), we could update the prompt without deploying code. The prompt includes:
            </p>
            <ul>
              <li>The specific commercial terms to extract (customer, dates, quantities, rates, commitment amounts, billing frequency, payment terms, pricing model, renewal terms)</li>
              <li>Instructions for handling ambiguity (&ldquo;If the order form references a master agreement for the term, note this and extract what&apos;s available&rdquo;)</li>
              <li>Output format (structured data with confidence scores per field)</li>
              <li>Non-standard terms detection &mdash; the extraction flags unusual clauses, non-standard commitments, or atypical pricing structures with severity levels so the reviewer is alerted to anything that needs special attention</li>
            </ul>
            <p>
              The confidence scores matter. If the AI is highly confident on one field but uncertain on another, the reviewer knows where to focus their attention.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg my-8 not-prose">
              <h4 className="font-semibold text-teal-900 mb-3">The Prompt Lab</h4>
              <p className="text-neutral-700">
                The prompt versioning evolved into a full prompt lab &mdash; a dedicated tab where you can browse version history, edit prompts, test them against specific PDFs, and compare extraction results across versions side-by-side. Each version tracks its parent, change notes, and the model it was designed for. This turned prompt iteration from a code deployment into a workflow that the accounting team owns directly.
              </p>
            </div>

            <h3>3. Automated Validation</h3>
            <p>
              After extraction, the system automatically compares the AI-extracted terms to the corresponding CRM deal data. Discrepancies are flagged with severity levels:
            </p>
            <ul>
              <li><strong>Critical:</strong> Key quantities don&apos;t match, contract amount differs materially, dates are off by more than a month, pricing model mismatch between the order form and the CRM</li>
              <li><strong>Warning:</strong> Minor differences in billing frequency, payment terms not captured in CRM</li>
              <li><strong>Info:</strong> Fields present in the order form but not in the CRM (common for usage rates, precommit details)</li>
            </ul>
            <p>
              The validation also performs internal consistency checks on the extracted data itself &mdash; for example, flagging when a contract start date doesn&apos;t align with the signing date, or when pricing terms are internally contradictory. The discrepancy count and severity roll up to the queue card, so the reviewer can see at a glance which contracts need attention and which are clean.
            </p>

            <h3>4. Human Review Queue</h3>
            <p>
              The UI is a queue of contract cards, each showing:
            </p>
            <ul>
              <li>Customer name, deal details, and transaction type badge (new business, renewal, amendment, expansion) from CRM</li>
              <li>Current status through the workflow</li>
              <li>Discrepancy indicators (count and severity)</li>
              <li>Provisioning status &mdash; whether the account is already set up in the billing and platform systems</li>
            </ul>
            <p>
              Opening a contract shows the PDF side-by-side with extracted terms and a detailed comparison table &mdash; the extracted values vs. the CRM values, with discrepancies highlighted. The reviewer can:
            </p>
            <ul>
              <li><strong>Provision</strong> &mdash; generates a pre-populated link to the provisioning system with all the extracted terms filled in, so the operator doesn&apos;t re-enter data manually</li>
              <li><strong>Dismiss</strong> &mdash; requires a reason (duplicates, cancelled deals, already provisioned) and can be restored later if the reason changes</li>
              <li><strong>Re-scan</strong> &mdash; re-run the extraction if the PDF was updated or a new prompt version is available</li>
              <li><strong>Add notes</strong> &mdash; per-item notes for context that persists through the workflow</li>
            </ul>
            <p>
              The reviewer&apos;s job shifted from &ldquo;read the PDF and type values into a spreadsheet&rdquo; to &ldquo;verify the AI&apos;s extraction and resolve flagged discrepancies.&rdquo; On a clean contract with no discrepancies, the review takes two minutes instead of thirty. On a complex one with issues, the reviewer focuses only on the flagged fields.
            </p>

            <h3>5. Reconciliation and Coverage</h3>
            <p>
              Two supporting views complete the picture:
            </p>
            <ul>
              <li><strong>Reconciliation tab:</strong> Compares CRM closed-won deals against provisioned accounts to find gaps &mdash; contracts that closed but never got provisioned, provisioned accounts with no matching CRM record, or mismatches between what was sold and what was set up.</li>
              <li><strong>Coverage widget:</strong> Embedded on the queue itself, shows live coverage statistics &mdash; what percentage of CRM deals are in the queue, which ones are excluded and why (already provisioned, zero commitment, missing data). Prevents things from falling through cracks without requiring a separate navigation.</li>
            </ul>
            <p>
              Additional supporting tabs include a full <strong>audit log</strong> (every action, who did it, when), a <strong>data explorer</strong> for ad hoc analysis of queue data, and the prompt lab mentioned above.
            </p>

            <h2>The Build Process</h2>
            <p>
              This system didn&apos;t emerge fully formed. It was built iteratively over about two weeks, following the infrastructure progression from <Link href="/blog/from-localhost-to-internal-tool">Article 03</Link>.
            </p>

            <h3>Day 1-2: PDF Extraction Prototype</h3>
            <p>
              I started with the hardest part: can AI reliably extract structured data from order form PDFs? I grabbed five order forms, pointed the AI at them, and iterated on the extraction prompt until the results were accurate. This was a local prototype &mdash; just me testing extraction quality.
            </p>

            <h3>Day 3-4: Queue and Database</h3>
            <p>
              With extraction working, I built the queue. Described the data model to the AI: &ldquo;I need a table for contract queue items with CRM snapshot fields, extraction results, status tracking, and reviewer metadata.&rdquo; It generated the schema, migrations, and CRUD functions.
            </p>

            <h3>Day 5-7: CRM Integration and Cron Jobs</h3>
            <p>
              Connected the CRM for automatic ingestion. Set up the OAuth flow, wrote the ingestion cron job, and added auto-processing so new contracts get extracted without manual trigger.
            </p>

            <h3>Week 2: Validation, UI Polish, and Deployment</h3>
            <p>
              Added the validation logic (comparing extracted terms to CRM fields), built the review UI with side-by-side PDF viewing, added the reconciliation and coverage tabs, and deployed. The team started using it immediately.
            </p>

            <h3>Ongoing: Prompt Iteration</h3>
            <p>
              The first extraction prompt handled maybe 80% of order forms cleanly. Over the next few weeks, we encountered edge cases: multi-year deals with different rates per year, addendums that modify the base agreement, order forms that reference a master agreement for the term. Each edge case was a prompt update &mdash; stored in the database, no deployment needed.
            </p>

            <h2>The Status Progression</h2>
            <p>
              The queue has a well-defined status flow:
            </p>

            <div className="bg-neutral-100 rounded-lg p-4 font-mono text-sm my-8 not-prose overflow-x-auto">
              <pre className="text-neutral-800">{`new → pending → auto_scanning → pending_review → reviewed → provisioned
       ↓            ↓                                          ↓
  pdf_updated  extraction_failed                           exception`}</pre>
            </div>

            <p>
              Each transition is logged in the audit trail with the actor, timestamp, and any notes. This matters for compliance &mdash; auditors want to know who approved what, when.
            </p>
            <p>
              Items can also be dismissed (with a reason) if they shouldn&apos;t be in the queue &mdash; duplicates, cancelled deals, non-standard arrangements handled outside the normal flow. Dismissed items can be restored if the reason changes. The system also handles PDF updates gracefully &mdash; if a revised order form is attached to the CRM deal, the item status resets so the new version gets extracted and validated.
            </p>

            <h2>How the System Evolved</h2>
            <p>
              The initial build covered the core provisioning workflow. But once the team was using it daily, it became clear that the queue was a natural hub for adjacent workflows. Over the following weeks, the system grew:
            </p>

            <h3>ASC 606 Accounting Review</h3>
            <p>
              Certain contract structures require formal revenue recognition assessment &mdash; new pricing models, non-standard terms, material rights, multi-element arrangements. The system now flags contracts that need accounting review based on configurable rules (deal size thresholds, non-standard terms detected during extraction, specific product types). These flagged contracts flow into a parallel accounting review workflow with their own statuses (pending review, in review, reviewed, escalated) and AI-generated draft assessments that the accountant reviews and finalizes.
            </p>

            <h3>Early Renewal and Amendment Handling</h3>
            <p>
              Renewals and amendments turned out to be different enough from new business that they needed their own handling. Early renewals involve proration credit calculations &mdash; how much of the existing contract term is remaining, what credit does the customer receive, how does that affect the new contract&apos;s billing. This became a separate queue surface with its own extraction logic, linked to the parent contract.
            </p>

            <h3>Pricing Model Validation</h3>
            <p>
              As the company&apos;s pricing evolved, the validation layer needed to understand different pricing models &mdash; not just &ldquo;do the numbers match between the order form and the CRM?&rdquo; but &ldquo;is the pricing model consistent?&rdquo; The comparison table now shows rate comparisons, discount structures, and commitment tiers, catching cases where the order form reflects one pricing structure but the CRM has another.
            </p>

            <h2>What Went Right</h2>

            <h3>Versioned Prompts</h3>
            <p>
              Being able to update the extraction prompt without deploying code was transformative. When we found an order form format the AI struggled with, I&apos;d open the prompt lab tab, refine the prompt, test it against the problem PDF, and save the new version. The next extraction would use the updated prompt automatically.
            </p>

            <h3>Snapshot Over Live Query</h3>
            <p>
              Snapshotting CRM data at ingestion time (rather than querying live on every page load) was the right call. It made the queue fast, provided a point-in-time record, and meant CRM outages didn&apos;t break the tool.
            </p>

            <h3>Discrepancy-Driven Review</h3>
            <p>
              Shifting the reviewer&apos;s focus from &ldquo;check everything&rdquo; to &ldquo;resolve flagged discrepancies&rdquo; dramatically reduced review time and improved accuracy. When you&apos;re checking 15 fields manually, you miss things. When the system highlights the three fields that don&apos;t match, you catch them.
            </p>

            <h2>What I&apos;d Do Differently</h2>

            <h3>Start with the Validation Logic Earlier</h3>
            <p>
              I built extraction first, then validation. In hindsight, I should have built them together from day one. The validation logic catches extraction errors, so having it earlier would have accelerated prompt iteration.
            </p>

            <h3>Build the Reconciliation Tab Sooner</h3>
            <p>
              The reconciliation tab (CRM closed-won vs. provisioned) was added later, but it&apos;s what gives the team confidence that nothing fell through the cracks. It should have been part of the initial build.
            </p>

            <h2>The Before and After</h2>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Metric</th>
                    <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Before</th>
                    <th className="text-left py-3 font-semibold text-neutral-900">After</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700">
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Time per contract (clean deal)</td>
                    <td className="py-3 pr-4">30-45 min</td>
                    <td className="py-3">2-5 min</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Time per contract (complex deal)</td>
                    <td className="py-3 pr-4">45-90 min</td>
                    <td className="py-3">10-15 min</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Missed discrepancies</td>
                    <td className="py-3 pr-4">Common (manual comparison)</td>
                    <td className="py-3">Rare (automated validation)</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Contracts falling through cracks</td>
                    <td className="py-3 pr-4">Periodic (manual tracking)</td>
                    <td className="py-3">Zero (auto-ingestion + reconciliation)</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Audit trail</td>
                    <td className="py-3 pr-4">Spreadsheet notes</td>
                    <td className="py-3">Timestamped, per-action log</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Time to build</td>
                    <td className="py-3 pr-4">N/A</td>
                    <td className="py-3">~2 weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Replicating This at Your Company</h2>
            <p>
              The contract provisioning queue is specific to enterprise SaaS, but the pattern applies to any queue-based workflow in finance:
            </p>
            <ul>
              <li><strong>AP invoice processing:</strong> Ingest vendor invoices, AI-extract terms, validate against PO data, route for approval</li>
              <li><strong>Revenue contract review:</strong> Flag new contracts for ASC 606 assessment, extract terms, compare to recognition policy</li>
              <li><strong>Expense report review:</strong> Ingest submissions, AI-categorize, validate against policy, flag exceptions</li>
              <li><strong>Journal entry approval:</strong> Queue manual JEs, validate against thresholds, route for approval with supporting documentation</li>
            </ul>
            <p>
              The building blocks are the same every time: ingestion (get data into the queue), extraction (AI understands the content), validation (compare against source of truth), human review (focused on exceptions), and audit trail (who did what, when).
            </p>
            <p>
              If you can describe the workflow in those terms, you can build it with an AI coding assistant in a couple of weeks.
            </p>

          </article>
        </div>
      </section>

      <section className="py-12 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <Link href="/blog/from-localhost-to-internal-tool" className="text-neutral-500 hover:text-neutral-900 transition-colors">
            &larr; Previous: From Localhost to Internal Tool
          </Link>
          <Link href="/blog/teaching-finance-teams" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
            Next: Teaching Finance Teams &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
