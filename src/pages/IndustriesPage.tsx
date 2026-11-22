import {Link} from 'react-router-dom';
import {ArrowRight, Briefcase, Calculator, Server} from 'lucide-react';
import {PageMeta} from '../components/PageMeta';
import {trackAuditRequestClick} from '../lib/analytics';

const SECTOR_PROFILES = [
  {
    icon: Server,
    name: 'IT Support Providers & Managed Service Providers (MSPs)',
    keywordContext: 'SEO for IT support companies',
    challenges: [
      'Service pages often group managed IT, cloud migration, and cybersecurity onto one generic page, obscuring specific capabilities.',
      'Technical acronyms replace plain business outcomes that office managers and directors actually search for.',
      'Low-value residential computer repair enquiries slip through unclear contact forms when B2B qualifying criteria are missing.',
    ],
    approach: [
      'Separate core commercial capabilities (e.g. Managed IT Support, Microsoft 365 Administration, Cyber Readiness) into focused landing pages.',
      'Align page headings and regional Australian service statements with B2B decision-maker search intent.',
      'Introduce brief team-size and service-fit prompts on enquiry forms to filter out consumer repair noise.',
    ],
    recommendedService: 'Website & SEO Audit + 90-Day Content & Conversion Roadmap',
    serviceHref: '/services#audit',
  },
  {
    icon: Calculator,
    name: 'Bookkeeping & Accounting Support Firms',
    keywordContext: 'Marketing for bookkeeping firms',
    challenges: [
      'Prospective clients struggle to tell the difference between basic compliance data entry and structured ongoing advisory bookkeeping.',
      'Heavy dependence on accountant referrals leaves the website under-utilised as an independent lead channel.',
      'Outdated service pages rarely address practical switching questions such as software compatibility or onboarding handover.',
    ],
    approach: [
      'Clarify retainer structures, cloud accounting platforms supported, and ideal small-business profile right on primary service pages.',
      'Publish concise pre-sales guides explaining how clean onboarding works without exposing sensitive client examples.',
      'Configure GA4 conversion tracking on discovery call and quote requests so practice principals can measure organic enquiry trends.',
    ],
    recommendedService: '90-Day Content & Conversion Roadmap',
    serviceHref: '/services#roadmap',
  },
  {
    icon: Briefcase,
    name: 'Professional Advisers & Specialist B2B Consultants',
    keywordContext: 'B2B digital marketing consultant Australia',
    challenges: [
      'Deep specialist expertise often stays locked in partner heads or PDFs rather than searchable, buyer-oriented web pages.',
      'High-consideration buyers visit multiple times before enquiring, yet websites provide little next-step clarity beyond a generic email form.',
      'Analytics frequently fail to distinguish engaged prospective clients from casual readers of thought-leadership posts.',
    ],
    approach: [
      'Connect practical advisory articles directly to well-structured commercial service pages using clear internal links.',
      'Replace abstract positioning slogans with concrete problem-and-outcome explanations tailored to Australian SMEs.',
      'Implement non-PII GA4 event tracking across key reading and consultation pathways.',
    ],
    recommendedService: 'Website & SEO Audit + GA4 Measurement Planning',
    serviceHref: '/services#reporting',
  },
];

export function IndustriesPage() {
  return (
    <>
      <PageMeta
        title="B2B Industries | IT Support & Bookkeeping – Signal & Scale"
        description="Strategic SEO for IT support companies, marketing for bookkeeping firms, and conversion guidance for Australian professional B2B advisers."
        path="/industries"
      />

      {/* Header */}
      <section className="bg-white border-b border-[#14243A]/10 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              Industry Focus &amp; Strategic Observations
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#14243A] leading-tight">
              Tailored B2B Strategy for Three Core Australian Service Sectors
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              The observations below reflect Signal &amp; Scale&apos;s strategic planning hypotheses
              for 1–20 person B2B firms—not published empirical industry studies or client case
              statistics. Each engagement validates priorities against your actual website data.
            </p>
          </div>
        </div>
      </section>

      {/* Sector Profiles */}
      <section className="py-14 lg:py-18 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {SECTOR_PROFILES.map((sector) => {
            const Icon = sector.icon;
            return (
              <article
                key={sector.name}
                className="bg-white rounded-2xl border border-[#14243A]/10 p-7 sm:p-10 space-y-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#14243A]/10">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#14243A] text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Focus Area: {sector.keywordContext}</p>
                      <h2 className="text-2xl font-bold text-[#14243A]">{sector.name}</h2>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-[#14243A]">
                      Common Digital Marketing Challenges
                    </h3>
                    <ul className="space-y-3 text-sm text-[#4B5563]">
                      {sector.challenges.map((item) => (
                        <li key={item} className="leading-relaxed flex items-start gap-2.5">
                          <span className="font-mono text-xs text-[#E5A85B] font-bold mt-0.5">
                            &bull;
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-[#14243A]">
                      Relevant Signal &amp; Scale Approach
                    </h3>
                    <ul className="space-y-3 text-sm text-[#374151]">
                      {sector.approach.map((item) => (
                        <li key={item} className="leading-relaxed flex items-start gap-2.5">
                          <span className="font-mono text-xs text-[#087E83] font-bold mt-0.5">
                            &bull;
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#14243A]/10 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-[#4B5563]">
                    Recommended starting point:{' '}
                    <strong className="text-[#14243A]">{sector.recommendedService}</strong>
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to={sector.serviceHref}
                      className="text-sm font-semibold text-[#14243A] hover:text-[#087E83]"
                    >
                      Review service scope
                    </Link>
                    <Link
                      to="/contact?intent=audit"
                      onClick={() => trackAuditRequestClick(`industries_${sector.keywordContext}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors"
                    >
                      <span>Request an SEO Audit</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
