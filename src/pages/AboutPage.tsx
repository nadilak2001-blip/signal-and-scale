import {Link} from 'react-router-dom';
import {ArrowRight, Compass, Eye, Layers, LineChart, ShieldCheck} from 'lucide-react';
import {PageMeta} from '../components/PageMeta';
import {EditorialImage} from '../components/EditorialImage';
import {MEDIA} from '../lib/media';
import {trackDiscoveryCallClick} from '../lib/analytics';

const CORE_VALUES = [
  {
    icon: Eye,
    title: 'Clarity',
    description:
      'Every audit, roadmap, and report is written in plain Australian business English—explaining what matters, why it matters, and what to do next.',
  },
  {
    icon: ShieldCheck,
    title: 'Accountability',
    description:
      'Deliverables, scope boundaries, and limitations are stated upfront. We do not hide behind opaque metrics or inflated claims.',
  },
  {
    icon: Layers,
    title: 'Practicality',
    description:
      'Recommendations are calibrated for small teams of 1–20 staff without assuming full-time internal marketing resources.',
  },
  {
    icon: LineChart,
    title: 'Evidence-Based Decision-Making',
    description:
      'Priorities are informed by technical observation, search intent structure, and clean analytics rather than marketing trends.',
  },
  {
    icon: Compass,
    title: 'Continuous Improvement',
    description:
      'Digital growth is iterative: diagnose bottlenecks, ship focused improvements, review lead quality, and refine what works.',
  },
];

const METHODOLOGY_STAGES = [
  {
    step: '01. Diagnosis',
    summary: 'Structured website, technical SEO, and conversion review',
    detail:
      'We inspect how search engines crawl your site, how service pages align with commercial buyer queries, and where prospective enquiries encounter hesitation or friction.',
  },
  {
    step: '02. Prioritisation',
    summary: 'Impact vs effort sequencing for small teams',
    detail:
      'Rather than handing over an overwhelming checklist of minor warnings, we rank actions so high-leverage service-page and tracking fixes happen first.',
  },
  {
    step: '03. Implementation Planning',
    summary: '90-day roadmaps with concrete page briefs',
    detail:
      'Each priority translates into clear copy, structure, and internal linking guidance that your team or web developer can execute cleanly.',
  },
  {
    step: '04. Measurement',
    summary: 'GA4 lead tracking and enquiry quality review',
    detail:
      'We track meaningful conversion actions—without collecting unnecessary personal data—and compare traffic trends against real sales conversations.',
  },
];

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Signal & Scale | Australian B2B Consultancy Approach"
        description="Learn about Signal & Scale's proposed mission, core values, and practical methodology for Australian micro and small B2B service businesses."
        path="/about"
      />

      {/* Header & Concept Transparency */}
      <section className="bg-white border-b border-[#14243A]/10 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              About Signal &amp; Scale · Proposed Consultancy Concept
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#14243A] leading-tight">
              Built for Small Australian B2B Teams Who Value Substance Over Hype
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Signal &amp; Scale is a proposed remote-first Australian digital marketing consultancy
              concept dedicated to micro and small B2B service firms—specifically IT support
              providers, bookkeeping practices, and professional advisers.
            </p>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Many small firms have strong technical or advisory expertise, yet struggle to get
              straightforward marketing guidance without committing to expensive full-service agency
              retainers. Signal &amp; Scale focuses on clear diagnostics, structured 90-day plans,
              and honest measurement.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full min-h-[260px] rounded-2xl overflow-hidden border border-[#14243A]/10">
              <EditorialImage
                src={MEDIA.advisoryRoom.src}
                alt={MEDIA.advisoryRoom.alt}
                aspectClass="aspect-[4/3]"
                className="lg:h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-[#14243A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-semibold tracking-wide text-[#E5A85B]">Our Mission</p>
          <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            &ldquo;Help Australian B2B service businesses make clearer digital marketing decisions
            through practical strategy, measurable outcomes and transparent communication.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">Core Values</p>
            <h2 className="text-3xl font-bold text-[#14243A]">
              Principles Guiding Every Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className="bg-white rounded-xl border border-[#14243A]/10 p-7 space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#087E83]/10 text-[#087E83] flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#14243A]">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4B5563]">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Methodology */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#14243A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-[#087E83]">Methodology</p>
                <h2 className="text-3xl font-bold text-[#14243A]">
                  How Diagnosis Connects to Measurable Execution
                </h2>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  Instead of jumping straight to blog posts or ad spend, our methodology follows a
                  deliberate loop so every recommendation has a clear rationale.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#14243A]/10">
                <EditorialImage
                  src={MEDIA.auditDesk.src}
                  alt={MEDIA.auditDesk.alt}
                  aspectClass="aspect-[4/3]"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              {METHODOLOGY_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="p-6 rounded-xl bg-[#F5F7FA] border border-[#14243A]/10 space-y-2"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-[#14243A]">{stage.step}</h3>
                    <span className="text-xs font-medium text-[#087E83]">{stage.summary}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4B5563]">{stage.detail}</p>
                </div>
              ))}

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact?intent=discovery"
                  onClick={() => trackDiscoveryCallClick('about_methodology')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors"
                >
                  <span>Book a 20-Minute Discovery Call</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/evidence"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A] hover:text-[#087E83]"
                >
                  <span>View sample deliverables &amp; KPIs</span>
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
