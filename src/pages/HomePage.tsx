import {Link} from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calculator,
  CheckCircle2,
  Compass,
  FileSearch,
  Server,
  Target,
} from 'lucide-react';
import {PageMeta} from '../components/PageMeta';
import {EditorialImage} from '../components/EditorialImage';
import {MEDIA} from '../lib/media';
import {trackAuditRequestClick, trackDiscoveryCallClick} from '../lib/analytics';

const INDUSTRIES = [
  {
    icon: Server,
    title: 'IT Support & Managed Service Providers',
    summary:
      'Small MSPs and IT support firms whose buyers search for specific managed services, Microsoft 365 support, or cybersecurity continuity rather than generic tech jargon.',
    focus: 'Service-specific search visibility and clear SLA enquiry pathways.',
  },
  {
    icon: Calculator,
    title: 'Bookkeeping & Accounting Support Firms',
    summary:
      'Specialist bookkeeping practices looking to attract established small-business retainers and BAS/payroll clients instead of price-shopping one-off queries.',
    focus: 'Trust-oriented service pages and qualified consultation requests.',
  },
  {
    icon: Briefcase,
    title: 'Professional Advisory & Consulting Businesses',
    summary:
      'Boutique B2B advisers, HR consultants, and operational specialists seeking consistent inbound enquiries to reduce reliance on sporadic word-of-mouth referrals.',
    focus: 'Expertise-led content structure and clearer buyer conversion paths.',
  },
];

const PROBLEMS = [
  {
    number: '01',
    title: 'Weak Search Visibility',
    description:
      'Your website ranks for broad brand terms or nothing at all, leaving high-intent service searches to larger competitors.',
  },
  {
    number: '02',
    title: 'Unclear Service Messaging',
    description:
      'Prospective clients land on vague capability statements and leave without knowing who you serve or what happens next.',
  },
  {
    number: '03',
    title: 'Inconsistent Enquiries',
    description:
      'Pipeline relies heavily on referrals, creating quiet quarters whenever network activity slows down.',
  },
  {
    number: '04',
    title: 'Limited Performance Visibility',
    description:
      'Analytics tools are either unconfigured or track raw page views without showing which pages generate genuine enquiries.',
  },
];

const SOLUTIONS = [
  {
    icon: FileSearch,
    title: 'Website & SEO Audits',
    description:
      'A structured diagnostic of technical accessibility, service-page clarity, search intent alignment, and conversion barriers.',
    linkTo: '/services#audit',
    linkLabel: 'Review audit scope',
  },
  {
    icon: Compass,
    title: '90-Day Content & Conversion Roadmaps',
    description:
      'A practical, prioritised plan detailing which service pages to refine, which topics to publish, and how to guide visitors toward an enquiry.',
    linkTo: '/services#roadmap',
    linkLabel: 'Explore roadmap planning',
  },
  {
    icon: BarChart3,
    title: 'Measurement & Performance Reporting',
    description:
      'Clean GA4 event tracking and plain-English reporting focused on qualified leads, traffic intent, and actionable next steps.',
    linkTo: '/services#reporting',
    linkLabel: 'See reporting approach',
  },
];

const PROCESS_STEPS = [
  {
    step: '01. Diagnose',
    detail: 'Assess search visibility, website content and conversion barriers.',
  },
  {
    step: '02. Explain',
    detail: 'Identify priorities and communicate findings clearly in plain English.',
  },
  {
    step: '03. Improve',
    detail: 'Develop practical recommendations and a focused 90-day action roadmap.',
  },
  {
    step: '04. Measure',
    detail: 'Review meaningful indicators and identify further improvements over time.',
  },
];

const WHY_POINTS = [
  {
    title: 'Fixed-Scope Engagements',
    description:
      'Clearly defined deliverables and exclusions upfront, so small teams know exactly what is included without open-ended retainers.',
  },
  {
    title: 'Practical Recommendations',
    description:
      'Prioritised changes designed for 1–20 person businesses without requiring a dedicated internal marketing department.',
  },
  {
    title: 'Transparent Reporting',
    description:
      'Clear separation between baseline observations, demonstration models, and verified website metrics.',
  },
  {
    title: 'Lead Quality Over Vanity Metrics',
    description:
      'Emphasis on attracting relevant Australian B2B enquiries rather than inflating impression counts with unrelated traffic.',
  },
  {
    title: 'Understandable Deliverables',
    description:
      'Every audit, roadmap, and GA4 review is written for business owners and decision-makers, not buried in agency jargon.',
  },
];

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Signal & Scale | B2B Digital Marketing Consultant Australia"
        description="Practical SEO, conversion strategy and GA4 performance insights for Australian B2B service businesses ready to attract better-qualified enquiries."
        path="/"
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-[#14243A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <p className="text-xs font-medium tracking-wide text-[#087E83]">
                Australian B2B Digital Marketing Consultancy · Remote-First Advisory
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#14243A] leading-[1.12]">
                Turn Your B2B Expertise Into Measurable Growth.
              </h1>
              <p className="text-lg leading-relaxed text-[#374151] max-w-2xl">
                Practical SEO, conversion strategy and performance insights for Australian service
                businesses ready to attract better-qualified enquiries.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact?intent=audit"
                  onClick={() => trackAuditRequestClick('home_hero_primary')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors duration-150 whitespace-nowrap"
                >
                  <span>Request an SEO Audit</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#14243A] bg-[#F5F7FA] hover:bg-[#E8EEF4] border border-[#14243A]/15 rounded-lg transition-colors duration-150 whitespace-nowrap"
                >
                  Explore Our Services
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-[280px] rounded-2xl overflow-hidden border border-[#14243A]/10 bg-[#E8EEF4]">
                <EditorialImage
                  src={MEDIA.heroWorkspace.src}
                  alt={MEDIA.heroWorkspace.alt}
                  loading="eager"
                  aspectClass="aspect-[16/9]"
                  className="lg:h-full"
                />
              </div>
            </div>
          </div>

          {/* Grounded 4-column Focus Strip */}
          <div className="mt-12 pt-8 border-t border-[#14243A]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Built For</p>
              <p className="mt-1 text-base font-semibold text-[#14243A]">
                1–20 Employee B2B Firms
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Engagement Style</p>
              <p className="mt-1 text-base font-semibold text-[#14243A]">
                Fixed-Scope &amp; Tailored
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Core Disciplines</p>
              <p className="mt-1 text-base font-semibold text-[#14243A]">
                SEO, Conversion &amp; GA4
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Operating Model</p>
              <p className="mt-1 text-base font-semibold text-[#14243A]">
                Proposed Australian Practice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 lg:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold tracking-wide text-[#087E83]">Who We Help</p>
              <h2 className="text-3xl font-bold text-[#14243A]">
                Focused on Australian Micro and Small B2B Service Firms
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                Signal &amp; Scale is designed for established service businesses that already have a
                website and strong client delivery, but lack dedicated in-house marketing capacity.
              </p>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087E83] hover:text-[#066367] whitespace-nowrap shrink-0"
            >
              <span>View industry challenges</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INDUSTRIES.map((sector) => {
              const Icon = sector.icon;
              return (
                <article
                  key={sector.title}
                  className="bg-white rounded-xl border border-[#14243A]/10 p-7 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-[#087E83]/10 text-[#087E83] flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#14243A]">{sector.title}</h3>
                    <p className="text-sm leading-relaxed text-[#4B5563]">{sector.summary}</p>
                  </div>
                  <p className="pt-4 border-t border-[#14243A]/10 text-xs font-medium text-[#14243A]">
                    Priority: {sector.focus}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 lg:py-20 bg-white border-y border-[#14243A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold tracking-wide text-[#087E83]">The Problem</p>
              <h2 className="text-3xl font-bold text-[#14243A]">
                Why Competent Service Businesses Struggle to Win Online Enquiries
              </h2>
              <p className="text-base leading-relaxed text-[#4B5563]">
                Many small B2B practices deliver excellent work for clients, yet their website acts
                like an outdated brochure. Without clear buyer messaging and reliable measurement,
                growth remains tied to unpredictable referrals.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PROBLEMS.map((item) => (
                <div
                  key={item.number}
                  className="p-6 rounded-xl bg-[#F5F7FA] border border-[#14243A]/10 space-y-2.5"
                >
                  <p className="font-mono text-xs font-medium text-[#087E83]">{item.number}</p>
                  <h3 className="text-lg font-semibold text-[#14243A]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4B5563]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 lg:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-10">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">Our Solution</p>
            <h2 className="text-3xl font-bold text-[#14243A]">
              Three Practical Pillars Built Around Lead Quality
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              Every engagement starts with clear diagnosis before prescribing content or technical
              work—helping you improve service website conversions step by step.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {SOLUTIONS.map((solution, index) => {
              const Icon = solution.icon;
              const colSpan = index === 0 ? 'lg:col-span-5' : index === 1 ? 'lg:col-span-4' : 'lg:col-span-3';
              return (
                <article
                  key={solution.title}
                  className={`${colSpan} bg-white rounded-xl border border-[#14243A]/10 p-7 flex flex-col justify-between space-y-6`}
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-[#14243A] text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#14243A]">{solution.title}</h3>
                    <p className="text-sm leading-relaxed text-[#4B5563]">{solution.description}</p>
                  </div>
                  <Link
                    to={solution.linkTo}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087E83] hover:text-[#066367]"
                  >
                    <span>{solution.linkLabel}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 lg:py-20 bg-[#14243A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-semibold tracking-wide text-[#E5A85B]">How We Work</p>
            <h2 className="text-3xl font-bold text-white">
              A Structured Four-Stage Consulting Process
            </h2>
            <p className="text-base text-white/75 leading-relaxed">
              Clear sequencing prevents wasted effort on content before technical and messaging
              foundations are sound.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-xl bg-white/5 border border-white/15 space-y-3"
              >
                <h3 className="text-lg font-semibold text-[#E5A85B]">{item.step}</h3>
                <p className="text-sm leading-relaxed text-white/80">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Signal & Scale */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#14243A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold tracking-wide text-[#087E83]">
                Why Signal &amp; Scale
              </p>
              <h2 className="text-3xl font-bold text-[#14243A]">
                Plain-English Strategy Without Agency Bloat
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                As a proposed SEO consultant for small business Australia, Signal &amp; Scale avoids
                unrealistic guarantees and vanity metrics in favour of transparent, verifiable work.
              </p>
              <div className="pt-2">
                <Link
                  to="/evidence"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087E83] hover:text-[#066367]"
                >
                  <span>Inspect our evaluation methodology and sample dashboard</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#14243A]/10 border-y border-[#14243A]/10">
              {WHY_POINTS.map((point) => (
                <div key={point.title} className="py-5 flex items-start gap-4">
                  <CheckCircle2
                    className="w-5 h-5 text-[#087E83] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-[#14243A]">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-[#4B5563]">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-16 bg-[#F5F7FA] border-b border-[#14243A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold tracking-wide text-[#087E83]">
                Featured Insights
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A]">
                Practical B2B Guides Before You Commit
              </h2>
            </div>
            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087E83] hover:text-[#066367] whitespace-nowrap"
            >
              <span>Browse all insights &amp; FAQs</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-white rounded-xl border border-[#14243A]/10 p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <p className="text-xs text-[#6B7280]">Conversion Strategy &middot; 6 min read</p>
                <h3 className="text-xl font-semibold text-[#14243A]">
                  Why Your B2B Website Gets Traffic but Few Enquiries
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  How search intent mismatch, vague value propositions, and form friction quietly
                  reduce qualified B2B leads—and what to fix first.
                </p>
              </div>
              <Link
                to="/insights?guide=traffic-vs-enquiries"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087E83] hover:text-[#066367]"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </article>

            <article className="bg-white rounded-xl border border-[#14243A]/10 p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <p className="text-xs text-[#6B7280]">Industry SEO Guide &middot; 6 min read</p>
                <h3 className="text-xl font-semibold text-[#14243A]">
                  SEO Priorities for Australian IT Support Businesses
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  Structuring managed IT service pages, local Australian relevance, and internal
                  links around commercial buyer intent.
                </p>
              </div>
              <Link
                to="/insights?guide=it-support-seo"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087E83] hover:text-[#066367]"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#087E83]">
            <Target className="w-4 h-4" aria-hidden="true" />
            <span>Next Step</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#14243A]">
            Ready to Make Your Digital Presence Work Harder?
          </h2>
          <p className="text-base text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
            Discuss your current website, search visibility, and lead quality goals in a focused
            introductory conversation—with no obligation or high-pressure sales pitch.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact?intent=discovery"
              onClick={() => trackDiscoveryCallClick('home_final_cta')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#14243A] hover:bg-[#0E1A2B] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Book a 20-Minute Discovery Call</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact?intent=audit"
              onClick={() => trackAuditRequestClick('home_final_secondary')}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#14243A] bg-[#F5F7FA] hover:bg-[#E8EEF4] border border-[#14243A]/15 rounded-lg transition-colors whitespace-nowrap"
            >
              Request an SEO Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
