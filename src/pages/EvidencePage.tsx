import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AlertTriangle, ArrowRight, FileCheck2, Gauge, SearchCheck, Split} from 'lucide-react';
import {PageMeta} from '../components/PageMeta';
import {trackAuditRequestClick} from '../lib/analytics';

type DemoScenario = 'baseline' | 'target_model';

const DEMO_SCENARIOS: Record<
  DemoScenario,
  {
    label: string;
    note: string;
    metrics: {
      name: string;
      value: string;
      context: string;
    }[];
    channelRows: {
      channel: string;
      sessions: string;
      enquiries: string;
      convRate: string;
      fitNotes: string;
    }[];
  }
> = {
  baseline: {
    label: 'Fictional Baseline Example (Month 0)',
    note: 'Illustrative fictional starting state showing a typical small B2B website before SEO and conversion updates.',
    metrics: [
      {
        name: 'Organic Service-Page Visits (Monthly)',
        value: '210',
        context: 'Fictional example · mostly branded searches',
      },
      {
        name: 'Tracked Qualified Enquiries',
        value: '2',
        context: 'Fictional example · incomplete form tracking',
      },
      {
        name: 'Service-Page Enquiry Rate',
        value: '0.95%',
        context: 'Fictional example · unclear CTA hierarchy',
      },
      {
        name: 'Core Technical Checks Passed',
        value: '11 / 18',
        context: 'Fictional example · metadata & mobile gaps',
      },
    ],
    channelRows: [
      {
        channel: 'Organic Search (Commercial Pages)',
        sessions: '210',
        enquiries: '2',
        convRate: '0.95%',
        fitNotes: 'Fictional baseline: thin service descriptions',
      },
      {
        channel: 'Organic Search (Blog / General)',
        sessions: '380',
        enquiries: '0',
        convRate: '0.00%',
        fitNotes: 'Fictional baseline: informational mismatch',
      },
      {
        channel: 'Direct & Referral Links',
        sessions: '145',
        enquiries: '3',
        convRate: '2.07%',
        fitNotes: 'Fictional baseline: existing network referrals',
      },
    ],
  },
  target_model: {
    label: 'Fictional Target Model Example (Illustrative Month 6)',
    note: 'Fictional demonstration illustration showing how reporting tracks progress after implementing audit and roadmap priorities. Not a guarantee or historical result.',
    metrics: [
      {
        name: 'Organic Service-Page Visits (Monthly)',
        value: '460',
        context: 'Fictional example · expanded commercial coverage',
      },
      {
        name: 'Tracked Qualified Enquiries',
        value: '9',
        context: 'Fictional example · verified GA4 lead events',
      },
      {
        name: 'Service-Page Enquiry Rate',
        value: '1.96%',
        context: 'Fictional example · tighter buyer messaging',
      },
      {
        name: 'Core Technical Checks Passed',
        value: '17 / 18',
        context: 'Fictional example · clean indexation & titles',
      },
    ],
    channelRows: [
      {
        channel: 'Organic Search (Commercial Pages)',
        sessions: '460',
        enquiries: '9',
        convRate: '1.96%',
        fitNotes: 'Fictional model: clearer service-page intent',
      },
      {
        channel: 'Organic Search (Decision Guides)',
        sessions: '310',
        enquiries: '2',
        convRate: '0.65%',
        fitNotes: 'Fictional model: internal links to audit CTA',
      },
      {
        channel: 'Direct & Referral Links',
        sessions: '165',
        enquiries: '4',
        convRate: '2.42%',
        fitNotes: 'Fictional model: improved form clarity',
      },
    ],
  },
};

const AUDIT_FRAMEWORK = [
  {
    icon: SearchCheck,
    title: '01. Technical Accessibility & Indexation',
    points: [
      'Crawlability, robots.txt, XML sitemap hygiene, and canonical URL alignment',
      'Mobile viewport usability, tap spacing, and Core Web Vitals bottlenecks',
      'Clean semantic headings (single H1, logical H2/H3 structure)',
    ],
  },
  {
    icon: Split,
    title: '02. Search Intent & On-Page Clarity',
    points: [
      'Alignment between service pages and commercial Australian B2B search terms',
      'Title tags, meta descriptions, and internal linking between guides and services',
      'Identification of overlapping or cannibalised pages',
    ],
  },
  {
    icon: Gauge,
    title: '03. Conversion Pathway Friction',
    points: [
      'Above-the-fold clarity: who the service is for and what outcome it supports',
      'CTA specificity, form field burden, and visible privacy reassurance',
      'Removal of distracting navigation dead-ends on commercial landing pages',
    ],
  },
  {
    icon: FileCheck2,
    title: '04. Measurement Integrity',
    points: [
      'Verification that GA4 records form submissions and call clicks without duplicate events',
      'Confirmation that personally identifiable information is excluded from analytics payloads',
      'Simple lead-fit classification outside GA4 to evaluate enquiry quality',
    ],
  },
];

const PROPOSED_KPIS = [
  {
    metric: 'Qualified Enquiry Conversion Rate',
    definition: 'Percentage of commercial service-page sessions resulting in a valid discovery or audit request.',
    whyItMatters: 'Measures whether messaging and page structure convince relevant B2B buyers to act.',
  },
  {
    metric: 'Commercial Landing-Page Organic Traffic',
    definition: 'Organic search visits landing directly on dedicated service or industry pages.',
    whyItMatters: 'Separates buyer-intent visibility from broad educational blog traffic.',
  },
  {
    metric: 'Enquiry Fit Ratio (Qualitative)',
    definition: 'Proportion of website enquiries matching the firm’s target business size and Australian service area.',
    whyItMatters: 'Prevents optimising solely for enquiry volume when lead quality is what drives revenue.',
  },
  {
    metric: 'Search Impression Share on Priority Topics',
    definition: 'Google Search Console visibility trends across agreed commercial and advisory topic clusters.',
    whyItMatters: 'Provides an early directional indicator before full ranking maturity occurs.',
  },
];

export function EvidencePage() {
  const [scenario, setScenario] = useState<DemoScenario>('baseline');
  const activeDemo = DEMO_SCENARIOS[scenario];

  return (
    <>
      <PageMeta
        title="Evidence & Methodology | Signal & Scale Australia"
        description="Inspect Signal & Scale's SEO audit framework, sample deliverables, fictional demonstration dashboard, proposed KPIs, and reporting limitations."
        path="/evidence"
      />

      {/* Header */}
      <section className="bg-white border-b border-[#14243A]/10 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              Evidence &amp; Methodology
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#14243A] leading-tight">
              How Signal &amp; Scale Evaluates SEO &amp; Conversion Performance
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Signal &amp; Scale is a proposed consultancy concept. Rather than inventing past
              client case studies, this page sets out our proposed evaluation framework, sample
              deliverables, and a clearly labelled fictional reporting demonstration.
            </p>
          </div>

          <div
            role="note"
            className="p-4 rounded-xl bg-[#FFFBEB] border border-[#E5A85B]/60 flex items-start gap-3 text-sm text-[#78350F] max-w-4xl"
          >
            <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong>Transparency Statement:</strong> All numbers shown in the demonstration
              dashboard below are <strong>fictional examples</strong> created solely to illustrate
              our proposed reporting layout. Verified client case studies will only be published
              when reliable real-world results and explicit client permission are available.
            </p>
          </div>
        </div>
      </section>

      {/* Illustrative SEO Audit Framework */}
      <section className="py-14 lg:py-18 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              Illustrative SEO Audit Framework
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A]">
              Four Diagnostic Lenses Applied to Every Website Review
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AUDIT_FRAMEWORK.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="bg-white rounded-xl border border-[#14243A]/10 p-7 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#087E83]/10 text-[#087E83] flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#14243A]">{pillar.title}</h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-[#4B5563]">
                    {pillar.points.map((point) => (
                      <li key={point} className="leading-relaxed flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#087E83] font-bold mt-0.5">
                          &bull;
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fictional Demonstration Performance Dashboard */}
      <section className="py-16 bg-white border-y border-[#14243A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#B45309]">
                Fictional Demonstration Dashboard &middot; Sample Data Only
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A]">
                Proposed Plain-English Performance Reporting View
              </h2>
              <p className="text-sm text-[#4B5563] leading-relaxed">{activeDemo.note}</p>
            </div>

            <div
              role="group"
              aria-label="Demonstration scenario selector"
              className="inline-flex p-1 bg-[#F5F7FA] rounded-lg border border-[#14243A]/10 shrink-0"
            >
              <button
                type="button"
                onClick={() => setScenario('baseline')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  scenario === 'baseline'
                    ? 'bg-[#14243A] text-white'
                    : 'text-[#4B5563] hover:text-[#14243A]'
                }`}
              >
                Fictional Baseline (M0)
              </button>
              <button
                type="button"
                onClick={() => setScenario('target_model')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  scenario === 'target_model'
                    ? 'bg-[#14243A] text-white'
                    : 'text-[#4B5563] hover:text-[#14243A]'
                }`}
              >
                Fictional Target Model (M6)
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[#14243A]/15 bg-[#F5F7FA] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#14243A]/10">
              <span className="text-sm font-semibold text-[#14243A]">{activeDemo.label}</span>
              <span className="font-mono text-xs text-[#B45309] font-medium">
                NON-CLIENT ILLUSTRATIVE EXAMPLE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {activeDemo.metrics.map((metric) => (
                <div
                  key={metric.name}
                  className="bg-white rounded-xl border border-[#14243A]/10 p-5 space-y-2"
                >
                  <p className="text-xs font-medium text-[#6B7280]">{metric.name}</p>
                  <p className="font-mono text-2xl font-bold text-[#14243A] tabular-nums">
                    {metric.value}
                  </p>
                  <p className="text-xs text-[#4B5563]">{metric.context}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#14243A]/10 bg-white">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#14243A]/10 text-xs font-semibold text-[#4B5563] bg-[#F5F7FA]">
                    <th scope="col" className="py-3.5 px-4">
                      Traffic Segment (Fictional)
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-right">
                      Monthly Sessions
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-right">
                      Qualified Enquiries
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-right">
                      Conversion Rate
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Illustrative Observation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14243A]/10 text-sm">
                  {activeDemo.channelRows.map((row) => (
                    <tr key={row.channel}>
                      <th scope="row" className="py-3.5 px-4 font-medium text-[#14243A]">
                        {row.channel}
                      </th>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#374151]">
                        {row.sessions}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#374151]">
                        {row.enquiries}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#087E83] font-medium">
                        {row.convRate}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[#4B5563]">{row.fitNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Proposed KPIs & Sample Deliverables */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wide text-[#087E83]">Proposed KPIs</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A]">
                Metrics Prioritised in Reporting Methodology
              </h2>
            </div>

            <div className="space-y-4">
              {PROPOSED_KPIS.map((kpi) => (
                <div
                  key={kpi.metric}
                  className="bg-white rounded-xl border border-[#14243A]/10 p-6 space-y-2"
                >
                  <h3 className="text-base font-semibold text-[#14243A]">{kpi.metric}</h3>
                  <p className="text-sm text-[#4B5563]">
                    <strong className="text-[#14243A]">Definition:</strong> {kpi.definition}
                  </p>
                  <p className="text-sm text-[#4B5563]">
                    <strong className="text-[#14243A]">Why it matters:</strong> {kpi.whyItMatters}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#14243A]/10 p-7 space-y-4">
              <h2 className="text-xl font-bold text-[#14243A]">Sample Deliverables Checklist</h2>
              <ul className="space-y-3 text-sm text-[#374151]">
                <li>
                  <strong className="text-[#14243A]">1. Audit Summary Brief:</strong> Plain-English
                  diagnosis of top commercial and technical gaps.
                </li>
                <li>
                  <strong className="text-[#14243A]">2. Impact/Effort Register:</strong> Prioritised
                  spreadsheet of page, metadata, and UX tasks.
                </li>
                <li>
                  <strong className="text-[#14243A]">3. 90-Day Sprint Plan:</strong> Sequenced
                  service-page updates and guide topics.
                </li>
                <li>
                  <strong className="text-[#14243A]">4. GA4 Event Spec:</strong> Privacy-safe event
                  taxonomy aligned to real enquiries.
                </li>
              </ul>
            </div>

            <div className="bg-[#14243A] text-white rounded-2xl p-7 space-y-4">
              <h2 className="text-xl font-bold text-white">Limitations &amp; Assumptions</h2>
              <ul className="space-y-2.5 text-sm text-white/80 leading-relaxed">
                <li>
                  &bull; Search rankings depend on external market competition, site history, and
                  consistent implementation—no ranking position can be guaranteed.
                </li>
                <li>
                  &bull; Small B2B websites often have modest monthly traffic volumes, meaning
                  conversion trends require multi-month observation rather than weekly overreaction.
                </li>
                <li>
                  &bull; Analytics consent settings and privacy blockers limit 100% session
                  visibility; qualitative enquiry tracking complements GA4 data.
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/contact?intent=audit"
                  onClick={() => trackAuditRequestClick('evidence_page_cta')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#14243A] bg-[#E5A85B] hover:bg-[#d9994a] rounded-lg transition-colors"
                >
                  <span>Request a Tailored Audit Scope</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
