import {useEffect, useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {ArrowRight, ChevronDown} from 'lucide-react';
import {PageMeta} from '../components/PageMeta';
import {EditorialImage} from '../components/EditorialImage';
import {MEDIA} from '../lib/media';
import {trackInsightToServiceClick} from '../lib/analytics';

interface GuideItem {
  id: 'traffic-vs-enquiries' | 'it-support-seo';
  category: string;
  readTime: string;
  title: string;
  subtitle: string;
  targetServiceLabel: string;
  targetServiceUrl: string;
  targetServiceId: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

const GUIDES: GuideItem[] = [
  {
    id: 'traffic-vs-enquiries',
    category: 'Conversion Strategy',
    readTime: '6 min read',
    title: 'Why Your B2B Website Gets Traffic but Few Enquiries',
    subtitle:
      'How to diagnose search intent mismatch, vague value propositions, and hidden friction when visits fail to convert into qualified leads.',
    targetServiceLabel: 'Explore the Website & SEO Audit',
    targetServiceUrl: '/services#audit',
    targetServiceId: 'website-seo-audit',
    sections: [
      {
        heading: '1. Search Intent Mismatch',
        paragraphs: [
          'Not all organic traffic represents active buying intent. Many small B2B websites attract visitors through broad educational articles, glossary definitions, or location-unrelated queries that never align with a decision to hire an Australian service provider.',
          'When evaluating how to get B2B leads online, the first check is whether landing pages match what commercial buyers are actually trying to solve. Someone searching for general tax rules has very different intent from a business owner looking for ongoing Xero bookkeeping support.',
        ],
      },
      {
        heading: '2. Weak Value Propositions',
        paragraphs: [
          'B2B decision-makers typically evaluate multiple providers in a short session. If your homepage or service page opens with generic statements such as "innovative solutions tailored to your success", visitors cannot tell what you actually deliver, who you serve best, or why they should shortlist you.',
        ],
        bullets: [
          'State your core service clearly in plain language above the fold.',
          'Specify the types of businesses and team sizes you work with best.',
          'Explain the practical operational outcome rather than abstract slogans.',
        ],
      },
      {
        heading: '3. Unclear Calls to Action',
        paragraphs: [
          'Vague buttons like "Learn More" or "Submit" ask buyers to guess what happens next. High-intent visitors want clarity on whether an action leads to a brief scoping call, an audit request, or a general email inbox.',
          'Pairing a clear primary CTA (such as requesting an audit or scheduling a 20-minute discovery call) with brief expectation-setting copy reduces hesitation before someone commits their details.',
        ],
      },
      {
        heading: '4. Poor Service-Page Structure',
        paragraphs: [
          'Combining five distinct capabilities onto a single overview page weakens both search relevance and human readability. Dedicated service pages allow buyers to confirm you handle their exact problem, see what is included, and understand how engagements are structured.',
        ],
      },
      {
        heading: '5. Conversion Friction on Desktop and Mobile',
        paragraphs: [
          'Even interested buyers abandon enquiries when forms request too many upfront fields, bury privacy expectations, fail to validate clearly on mobile screens, or force visitors to hunt for contact pathways across disconnected menus.',
        ],
      },
      {
        heading: '6. Practical Improvements to Improve Service Website Conversions',
        paragraphs: [
          'Before commissioning new traffic campaigns, tighten the conversion path on your highest-intent existing pages:',
        ],
        bullets: [
          'Review your top five landing pages in Google Search Console and GA4 to check whether enquiries occur on commercial pages or drop off after informational posts.',
          'Rewrite primary service headlines so a time-poor buyer grasps scope and audience within five seconds.',
          'Reduce enquiry forms to essential qualifying fields and add a clear expectation of next steps.',
          'Track enquiry clicks and completed submissions cleanly in GA4 so improvements can be judged on real conversion behaviour.',
        ],
      },
    ],
  },
  {
    id: 'it-support-seo',
    category: 'Industry SEO Guide',
    readTime: '6 min read',
    title: 'SEO Priorities for Australian IT Support Businesses',
    subtitle:
      'A practical framework for managed service providers and small IT support firms seeking consistent commercial enquiries.',
    targetServiceLabel: 'See our 90-Day Content & Conversion Roadmap',
    targetServiceUrl: '/services#roadmap',
    targetServiceId: 'content-conversion-roadmap',
    sections: [
      {
        heading: '1. Service-Specific Search Intent',
        paragraphs: [
          'Small business owners rarely search for broad internal industry labels when an IT issue disrupts their week. Instead, SEO for IT support companies works best when pages mirror specific commercial needs: managed IT support, Microsoft 365 administration, cybersecurity posture reviews, cloud backup, or workstation onboarding.',
          'Grouping distinct services onto dedicated pages prevents topics from competing with each other and helps search engines connect specific queries to the most relevant landing page.',
        ],
      },
      {
        heading: '2. Local and Australian Commercial Relevance',
        paragraphs: [
          'Australian buyers frequently prefer providers who understand local business hours, compliance expectations, and onsite/remote hybrid coverage across specific cities or regions. Clearly stating the Australian regions you support—without stuffing city names into unnatural lists—improves buyer confidence and geographic relevance.',
        ],
      },
      {
        heading: '3. Service-Page Optimisation for Decision Makers',
        paragraphs: [
          'An IT director or operations manager evaluating a 5–20 person MSP wants clarity on response workflows, onboarding transitions, and scope boundaries. Effective service pages balance concise technical competence with accessible business explanations:',
        ],
        bullets: [
          'Use a single descriptive H1 reflecting the primary service and Australian B2B context.',
          'Break capabilities into scannable H2 sections covering what is included, onboarding steps, and typical team fit.',
          'Keep titles and meta descriptions clear and aligned with commercial buyer intent.',
        ],
      },
      {
        heading: '4. Useful Educational Content That Supports Sales',
        paragraphs: [
          'Rather than publishing generic tech news summaries, focus educational content on pre-sales questions buyers ask before switching IT providers—such as how to plan a smooth MSP handover, what to review before migrating file servers, or common Microsoft 365 security gaps in small offices.',
        ],
      },
      {
        heading: '5. Intentional Internal Linking',
        paragraphs: [
          'Educational guides should not sit in an isolated blog archive. Link naturally from problem-focused guides back to the corresponding managed service or audit page using descriptive anchor text so both readers and crawlers understand the commercial pathway.',
        ],
      },
      {
        heading: '6. Measurement and Lead Quality',
        paragraphs: [
          'For small IT support firms, ten poorly matched consumer repair enquiries are less valuable than two qualified 15-seat business enquiries. Pair GA4 enquiry tracking with simple internal tagging (commercial fit vs out-of-scope) so SEO priorities stay anchored to pipeline quality rather than raw click counts.',
        ],
      },
    ],
  },
];

const FAQS = [
  {
    question: 'What happens during a Website & SEO Audit?',
    answer:
      'We review your site structure, technical accessibility, on-page SEO signals, service-page messaging, mobile usability, and conversion friction. You receive a written diagnostic report, a prioritised action register ranked by impact and effort, and a 30-minute walkthrough.',
  },
  {
    question: 'How long does it take to see measurable improvements from SEO and conversion work?',
    answer:
      'Conversion clarity and tracking fixes—such as clearer service-page headlines, reduced form friction, and verified GA4 event tracking—can improve enquiry capture as soon as they are published. Search visibility gains typically develop more gradually over several months depending on competition, site history, and implementation pace.',
  },
  {
    question: 'Do we need a large content budget or weekly blog posts?',
    answer:
      'No. For most 1–20 person Australian B2B firms, strengthening existing commercial service pages and publishing a small number of focused, high-intent guides outperforms high-volume generic blogging.',
  },
  {
    question: 'What does Google Analytics 4 reporting focus on?',
    answer:
      'Rather than overwhelming teams with dozens of vanity charts, GA4 reporting centres on meaningful conversion events (audit requests, discovery call clicks, contact form submissions), the search and referral channels driving those actions, and practical interpretation for next steps.',
  },
  {
    question: 'What should we expect from an introductory discovery call?',
    answer:
      'A 20-minute discovery call is an exploratory conversation about your services, target clients, current website barriers, and whether a fixed-scope audit or roadmap is the sensible next step. There is no high-pressure sales script or obligation to proceed.',
  },
];

export function InsightsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const guideParam = searchParams.get('guide');
  const activeGuide =
    GUIDES.find((g) => g.id === guideParam) ?? GUIDES[0];

  useEffect(() => {
    if (guideParam && GUIDES.some((g) => g.id === guideParam)) {
      document.getElementById('insights-reader')?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, [guideParam]);

  const handleSelectGuide = (guideId: GuideItem['id']) => {
    setSearchParams({guide: guideId});
  };

  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    [],
  );

  return (
    <>
      <PageMeta
        title="Insights & B2B SEO Guides | Signal & Scale Australia"
        description="Practical guides on how to get B2B leads online, improve service website conversions, and prioritise SEO for Australian IT support companies."
        path="/insights"
        jsonLd={faqJsonLd}
      />

      {/* Header */}
      <section className="bg-white border-b border-[#14243A]/10 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              Insights &amp; Knowledge Hub
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#14243A] leading-tight">
              Practical Guides for Australian B2B Service Websites
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Original field notes on conversion clarity, service-page SEO, and measurement—written
              for small B2B practices that prefer grounded explanations over marketing jargon.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-[#14243A]/10 aspect-[4/3]">
              <EditorialImage
                src={MEDIA.auditDesk.src}
                alt={MEDIA.auditDesk.alt}
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Guide Selector & Reader */}
      <section id="insights-reader" className="scroll-mt-20 py-14 lg:py-18 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sidebar Guide Switcher */}
          <aside aria-label="Guide directory" className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold text-[#14243A]">Educational Guides</h2>
            <div className="space-y-3">
              {GUIDES.map((guide) => {
                const isActive = guide.id === activeGuide.id;
                return (
                  <button
                    key={guide.id}
                    type="button"
                    onClick={() => handleSelectGuide(guide.id)}
                    aria-pressed={isActive}
                    className={`w-full text-left p-5 rounded-xl border transition-colors ${
                      isActive
                        ? 'bg-[#14243A] text-white border-[#14243A]'
                        : 'bg-white text-[#14243A] border-[#14243A]/10 hover:border-[#087E83]/50'
                    }`}
                  >
                    <p
                      className={`text-xs mb-2 ${
                        isActive ? 'text-[#E5A85B]' : 'text-[#6B7280]'
                      }`}
                    >
                      {guide.category} &middot; {guide.readTime}
                    </p>
                    <p className="text-base font-semibold leading-snug">{guide.title}</p>
                  </button>
                );
              })}
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#14243A]/10 space-y-3">
              <p className="text-sm font-semibold text-[#14243A]">
                Applying these ideas to your own site?
              </p>
              <p className="text-xs leading-relaxed text-[#4B5563]">
                Our fixed-scope audit evaluates how these principles perform across your actual
                service pages and enquiry flow.
              </p>
              <Link
                to="/services#audit"
                onClick={() => trackInsightToServiceClick(activeGuide.id, 'website-seo-audit')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087E83] hover:text-[#066367]"
              >
                <span>View audit deliverables</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>

          {/* Active Guide Content */}
          <article className="lg:col-span-8 bg-white rounded-2xl border border-[#14243A]/10 p-7 sm:p-10 space-y-8">
            <header className="space-y-3 pb-6 border-b border-[#14243A]/10">
              <p className="text-xs text-[#6B7280]">
                {activeGuide.category} &middot; {activeGuide.readTime}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A] leading-snug">
                {activeGuide.title}
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">{activeGuide.subtitle}</p>
            </header>

            <div className="space-y-7">
              {activeGuide.sections.map((section) => (
                <section key={section.heading} className="space-y-3">
                  <h3 className="text-xl font-semibold text-[#14243A]">{section.heading}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-[#374151]">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 pl-5 list-disc text-sm sm:text-base text-[#374151]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <footer className="pt-6 border-t border-[#14243A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-[#4B5563]">
                Related service:{' '}
                <strong className="text-[#14243A] font-semibold">
                  {activeGuide.targetServiceLabel}
                </strong>
              </p>
              <Link
                to={activeGuide.targetServiceUrl}
                onClick={() =>
                  trackInsightToServiceClick(activeGuide.id, activeGuide.targetServiceId)
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>{activeGuide.targetServiceLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </footer>
          </article>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#14243A]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              Frequently Asked Questions
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14243A]">
              Common Questions About Audits, Reporting &amp; Timelines
            </h2>
          </div>

          <div className="divide-y divide-[#14243A]/10 border-y border-[#14243A]/10">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const panelId = `faq-panel-${index}`;
              return (
                <div key={faq.question} className="py-4">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full py-2 flex items-center justify-between gap-4 text-left text-base font-semibold text-[#14243A] hover:text-[#087E83] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#087E83]' : 'text-[#6B7280]'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div id={panelId} className="pt-2 pb-2 pr-8 text-sm leading-relaxed text-[#4B5563]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
