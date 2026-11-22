import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ArrowRight, Check, Minus} from 'lucide-react';
import {PageMeta} from '../components/PageMeta';
import {trackAuditRequestClick, trackDiscoveryCallClick, trackServiceView} from '../lib/analytics';

interface ServiceDetail {
  id: string;
  anchor: string;
  number: string;
  title: string;
  tagline: string;
  whoItIsFor: string;
  challengeAddressed: string;
  scopeOfWork: string[];
  deliverables: string[];
  excluded: string[];
  ctaLabel: string;
  ctaIntent: 'audit' | 'discovery';
}

const SERVICES: ServiceDetail[] = [
  {
    id: 'website-seo-audit',
    anchor: 'audit',
    number: '01',
    title: 'Website & SEO Audit',
    tagline:
      'A comprehensive diagnostic of search visibility, messaging clarity, and conversion barriers across your core pages.',
    whoItIsFor:
      'Australian B2B service firms (1–20 staff) with an existing website that generates few qualified enquiries or lacks clarity on technical and on-page gaps.',
    challengeAddressed:
      'Hidden crawl issues, unaligned service-page titles, confusing navigation, and subtle conversion friction that quietly cost you qualified leads.',
    scopeOfWork: [
      'Website structure review covering navigation hierarchy, page depth, and service-page separation',
      'On-page SEO assessment for core commercial pages (titles, headings, metadata, internal context)',
      'Service-page messaging review evaluating clarity, buyer relevance, and differentiation',
      'Mobile usability check across navigation, tap targets, readability, and form completion',
      'Technical SEO observations covering indexability, canonical signals, speed bottlenecks, and broken links',
      'Conversion friction identification across contact forms, CTAs, and trust signals',
      'Prioritised recommendations ranked by likely business impact and implementation effort',
    ],
    deliverables: [
      'Written Website & B2B SEO Audit Report (plain-English executive summary + page-by-page notes)',
      'Prioritised Issue & Action Register spreadsheet (Impact vs Effort)',
      '30-minute walkthrough session to review findings and answer implementation questions',
    ],
    excluded: [
      'Direct website code edits or CMS development work (quoted separately if required)',
      'Paid advertising management (Google Ads / LinkedIn Ads)',
      'Off-site link purchasing or automated directory blasts',
    ],
    ctaLabel: 'Request a Small Business Website SEO Audit',
    ctaIntent: 'audit',
  },
  {
    id: 'content-conversion-roadmap',
    anchor: 'roadmap',
    number: '02',
    title: '90-Day Content & Conversion Roadmap',
    tagline:
      'A practical quarter-by-quarter plan connecting buyer search intent with structured service pages and conversion pathways.',
    whoItIsFor:
      'Service businesses ready to strengthen core service pages, answer buyer questions systematically, and move away from ad-hoc blog publishing.',
    challengeAddressed:
      'Publishing disconnected articles or generic service descriptions that fail to match how Australian B2B buyers evaluate IT, bookkeeping, or advisory providers.',
    scopeOfWork: [
      'Audience and search-intent alignment mapping commercial, transactional, and informational topics',
      'Content opportunities audit identifying missing service sub-pages and decision-stage guides',
      'Service-page improvements outlining clearer structure, proof points, and buyer objection handling',
      'Internal linking recommendations connecting educational guides back to high-intent service pages',
      'Conversion-focused messaging adjustments for headlines, calls to action, and enquiry forms',
      'Prioritised 90-day implementation roadmap sequenced into practical 30-day sprints',
    ],
    deliverables: [
      '90-Day Content & Conversion Roadmap document with sprint milestones',
      'Page-level wireframes and messaging briefs for up to 5 priority service or guide pages',
      'Internal linking blueprint and CTA placement guide',
    ],
    excluded: [
      'Full-scale copywriting production for large article libraries (available as scoped add-on)',
      'Brand visual identity redesign or custom web application engineering',
      'Social media scheduling or community management',
    ],
    ctaLabel: 'Discuss a 90-Day Roadmap',
    ctaIntent: 'discovery',
  },
  {
    id: 'measurement-reporting',
    anchor: 'reporting',
    number: '03',
    title: 'Measurement & Performance Reporting',
    tagline:
      'Reliable Google Analytics 4 configuration and plain-English performance reviews centred on genuine enquiry outcomes.',
    whoItIsFor:
      'B2B owners and practice managers tired of dashboards full of raw session counts that do not explain where real enquiries originate.',
    challengeAddressed:
      'Broken or incomplete GA4 tracking, duplicate page views, missing conversion events, and inability to separate qualified B2B leads from noise.',
    scopeOfWork: [
      'GA4 measurement planning aligned to discovery calls, audit requests, and contact form submissions',
      'Lead-generation event tracking specification without transmitting personally identifiable information',
      'Traffic-source interpretation distinguishing organic search intent, direct visits, and referral channels',
      'Enquiry quality assessment framework combining GA4 events with manual lead-outcome tagging',
      'Plain-English reporting template designed for 15-minute leadership reviews',
      'Continuous improvement recommendations based on observed conversion bottlenecks',
    ],
    deliverables: [
      'GA4 Measurement Plan & Event Specification Sheet',
      'Verified event testing checklist and privacy/consent alignment review',
      'Plain-English Performance Review brief with prioritised next-step hypotheses',
    ],
    excluded: [
      'Enterprise CRM software licensing or custom data warehouse engineering',
      'Attribution modelling for offline print or outbound cold-calling campaigns',
      'Guaranteed ranking or traffic volume promises',
    ],
    ctaLabel: 'Plan Your GA4 Measurement Scope',
    ctaIntent: 'discovery',
  },
];

const COMPARISON_ROWS = [
  {
    criterion: 'Primary Purpose',
    audit: 'Diagnose visibility, UX & conversion barriers',
    roadmap: 'Plan content & messaging improvements',
    reporting: 'Track enquiries & interpret performance',
  },
  {
    criterion: 'Ideal Starting Point',
    audit: 'Unsure why website enquiries are low',
    roadmap: 'Audit complete; ready for structured action',
    reporting: 'Need reliable GA4 lead tracking & clarity',
  },
  {
    criterion: 'Core Output',
    audit: 'Audit report + prioritised action register',
    roadmap: '90-day sprint plan + page messaging briefs',
    reporting: 'GA4 event spec + plain-English review',
  },
  {
    criterion: 'Scope & Investment',
    audit: 'Request a tailored scope',
    roadmap: 'Request a tailored scope',
    reporting: 'Request a tailored scope',
  },
];

const ROADMAP_PHASES = [
  {
    phase: 'Days 1–30 · Foundation & Friction Removal',
    items: [
      'Resolve high-priority crawl, mobile usability, and page-speed issues identified in the B2B SEO audit.',
      'Deploy clean GA4 lead-generation event tracking (form submissions, discovery call clicks, audit requests).',
      'Tighten primary service-page headlines, calls to action, and enquiry form fields.',
    ],
  },
  {
    phase: 'Days 31–60 · Service Clarity & Search Intent',
    items: [
      'Restructure core commercial service pages around specific Australian buyer needs and decision criteria.',
      'Publish 1–2 high-utility decision guides answering common pre-sales questions.',
      'Establish clean internal links between informational guides and commercial service pages.',
    ],
  },
  {
    phase: 'Days 61–90 · Refinement & Lead Quality Review',
    items: [
      'Review early GA4 conversion and Search Console impression trends without overreacting to short-term noise.',
      'Evaluate enquiry quality with business owners to refine messaging and qualifying questions.',
      'Set the next quarter’s priorities based on observed evidence rather than guesswork.',
    ],
  },
];

export function ServicesPage() {
  const location = useLocation();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('website-seo-audit');

  useEffect(() => {
    const hashAnchor = location.hash.replace(/^#/, '');
    if (!hashAnchor) return;
    const matched = SERVICES.find((s) => s.anchor === hashAnchor);
    if (matched) {
      setSelectedServiceId(matched.id);
      trackServiceView(matched.id, matched.title);
      requestAnimationFrame(() => {
        document.getElementById(matched.anchor)?.scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    }
  }, [location.hash]);

  const handleSelectService = (service: ServiceDetail) => {
    setSelectedServiceId(service.id);
    trackServiceView(service.id, service.title);
    const el = document.getElementById(service.anchor);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <>
      <PageMeta
        title="B2B SEO Audit & Conversion Services | Signal & Scale"
        description="Explore fixed-scope B2B SEO audits, 90-day content roadmaps, and GA4 measurement reporting tailored for Australian small B2B service firms."
        path="/services"
      />

      {/* Page Header */}
      <section className="bg-white border-b border-[#14243A]/10 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              Services &amp; Scope
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#14243A] leading-tight">
              Practical Digital Services Built Around Measurable Enquiries
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Signal &amp; Scale structures work into three clearly bounded services—covering
              diagnosis, 90-day execution planning, and GA4 measurement. Every engagement is scoped
              to your business size and current website maturity.
            </p>
          </div>

          {/* Interactive Service Quick-Jump Controls */}
          <div
            role="navigation"
            aria-label="Jump to service category"
            className="pt-2 flex flex-wrap items-center gap-2"
          >
            {SERVICES.map((service) => {
              const isActive = selectedServiceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleSelectService(service)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#14243A] text-white'
                      : 'bg-[#F5F7FA] text-[#14243A] hover:bg-[#E8EEF4] border border-[#14243A]/10'
                  }`}
                >
                  {service.number}. {service.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service Cards */}
      <section className="py-14 lg:py-18 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              id={service.anchor}
              className="scroll-mt-24 bg-white rounded-2xl border border-[#14243A]/10 p-7 sm:p-10 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-[#14243A]/10">
                <div className="space-y-3 max-w-3xl">
                  <p className="font-mono text-xs font-medium text-[#087E83]">
                    Service {service.number}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A]">
                    {service.title}
                  </h2>
                  <p className="text-base text-[#4B5563] leading-relaxed">{service.tagline}</p>
                </div>
                <div className="shrink-0 space-y-1 lg:text-right">
                  <p className="text-xs font-medium text-[#6B7280]">Engagement Pricing</p>
                  <p className="text-base font-semibold text-[#14243A]">
                    Request a tailored scope
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-[#14243A]">Who It Is For</h3>
                  <p className="text-sm leading-relaxed text-[#4B5563]">{service.whoItIsFor}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-[#14243A]">
                    Business Challenge Addressed
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4B5563]">
                    {service.challengeAddressed}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#14243A]">Scope of Work</h3>
                  <ul className="space-y-2.5 text-sm text-[#374151]">
                    {service.scopeOfWork.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="w-4 h-4 text-[#087E83] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#14243A]">Expected Deliverables</h3>
                  <ul className="space-y-2.5 text-sm text-[#374151]">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="w-4 h-4 text-[#14243A] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#14243A]">What Is Excluded</h3>
                  <ul className="space-y-2.5 text-sm text-[#6B7280]">
                    {service.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Minus className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#14243A]/10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-[#6B7280]">
                  Scope tailored to website size, sector complexity, and internal implementation capacity.
                </p>
                <Link
                  to={`/contact?intent=${service.ctaIntent}&service=${service.id}`}
                  onClick={() => {
                    if (service.ctaIntent === 'audit') {
                      trackAuditRequestClick(`service_card_${service.id}`);
                    } else {
                      trackDiscoveryCallClick(`service_card_${service.id}`);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Service Comparison Table */}
      <section className="py-16 bg-white border-y border-[#14243A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">Comparison</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A]">
              Comparing Signal &amp; Scale Engagements
            </h2>
            <p className="text-sm text-[#4B5563]">
              Start with an audit when you need clarity first, or combine planning and measurement
              once priorities are established.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#14243A]/10">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="bg-[#14243A] text-white text-sm">
                  <th scope="col" className="py-4 px-5 font-semibold">
                    Dimension
                  </th>
                  <th scope="col" className="py-4 px-5 font-semibold">
                    Website &amp; SEO Audit
                  </th>
                  <th scope="col" className="py-4 px-5 font-semibold">
                    90-Day Roadmap
                  </th>
                  <th scope="col" className="py-4 px-5 font-semibold">
                    Measurement &amp; Reporting
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14243A]/10 text-sm bg-white">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row" className="py-4 px-5 font-semibold text-[#14243A] bg-[#F5F7FA]">
                      {row.criterion}
                    </th>
                    <td className="py-4 px-5 text-[#374151]">{row.audit}</td>
                    <td className="py-4 px-5 text-[#374151]">{row.roadmap}</td>
                    <td className="py-4 px-5 text-[#374151]">{row.reporting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Illustrative 90-Day Roadmap */}
      <section className="py-16 lg:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              Illustrative Sequence · Example Structure
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A]">
              How a Typical 90-Day Roadmap Unfolds
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              The timeline below illustrates how Signal &amp; Scale sequences work for a small B2B
              service firm. Actual milestones depend on your starting website audit findings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROADMAP_PHASES.map((block) => (
              <div
                key={block.phase}
                className="bg-white rounded-xl border border-[#14243A]/10 p-7 space-y-4"
              >
                <h3 className="text-lg font-semibold text-[#14243A]">{block.phase}</h3>
                <ul className="space-y-3 text-sm text-[#4B5563]">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="font-mono text-xs text-[#087E83] font-semibold mt-0.5"
                        aria-hidden="true"
                      >
                        &bull;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#14243A]/10">
            <p className="text-sm text-[#4B5563]">
              Want to see how performance and audit findings are documented?
            </p>
            <Link
              to="/evidence"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#087E83] hover:text-[#066367]"
            >
              <span>Inspect our Evidence &amp; Methodology page</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
