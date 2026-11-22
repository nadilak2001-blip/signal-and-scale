import {useEffect, useState, type FormEvent} from 'react';
import {useSearchParams} from 'react-router-dom';
import {AlertCircle, Calendar, CheckCircle2, Info, Lock} from 'lucide-react';
import {PageMeta} from '../components/PageMeta';
import {SITE_CONFIG} from '../config/siteConfig';
import {trackContactFormSubmit, trackDiscoveryCallClick} from '../lib/analytics';

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  sector: string;
  challenge: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  businessName?: string;
  email?: string;
  sector?: string;
  challenge?: string;
}

const SECTORS = [
  'IT Support / Managed Service Provider',
  'Bookkeeping / Accounting Support Firm',
  'Professional Advisory / Consulting',
  'Other Australian B2B Service Business',
];

const CHALLENGES = [
  'Low search visibility for core services',
  'Website gets traffic but few qualified enquiries',
  'Need a Website & SEO Audit before rebuilding',
  'Unclear GA4 tracking and lead measurement',
  'Over-reliance on referrals for new clients',
];

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialIntent = searchParams.get('intent');
  const initialService = searchParams.get('service');

  const resolveDefaultChallenge = (intent: string | null, service: string | null): string => {
    if (service === 'measurement-reporting') return 'Unclear GA4 tracking and lead measurement';
    if (service === 'content-conversion-roadmap')
      return 'Website gets traffic but few qualified enquiries';
    if (service === 'website-seo-audit' || intent === 'audit') {
      return 'Need a Website & SEO Audit before rebuilding';
    }
    return '';
  };

  const [form, setForm] = useState<FormState>({
    fullName: '',
    businessName: '',
    email: '',
    sector: '',
    challenge: resolveDefaultChallenge(initialIntent, initialService),
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'sent_live' | 'demo_validated' | 'error'
  >('idle');
  const [submitErrorMsg, setSubmitErrorMsg] = useState('');
  const [schedulingNoticeVisible, setSchedulingNoticeVisible] = useState(
    initialIntent === 'discovery',
  );

  const hasLiveEndpoint = Boolean(SITE_CONFIG.contactFormEndpoint.trim());
  const hasLiveScheduling = Boolean(SITE_CONFIG.schedulingUrl.trim());

  useEffect(() => {
    const resolved = resolveDefaultChallenge(initialIntent, initialService);
    if (resolved) {
      setForm((prev) => ({
        ...prev,
        challenge: resolved,
      }));
    }
    if (initialIntent === 'discovery') {
      setSchedulingNoticeVisible(true);
    }
  }, [initialIntent, initialService]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.fullName.trim()) {
      next.fullName = 'Please enter your full name.';
    }
    if (!form.businessName.trim()) {
      next.businessName = 'Please enter your business name.';
    }
    const emailTrimmed = form.email.trim();
    if (!emailTrimmed) {
      next.email = 'Please enter a valid work email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      next.email = 'Please enter an email address in a standard format (e.g. name@company.com.au).';
    }
    if (!form.sector) {
      next.sector = 'Please select your business sector.';
    }
    if (!form.challenge) {
      next.challenge = 'Please select your primary marketing challenge.';
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitErrorMsg('');

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitState('error');
      setSubmitErrorMsg('Please review the highlighted fields before continuing.');
      return;
    }

    if (!hasLiveEndpoint) {
      // Honest Demonstration State: do NOT claim a message was delivered
      // and do NOT record contact_form_submit when no backend/form service is configured.
      setSubmitState('demo_validated');
      return;
    }

    setSubmitState('submitting');
    try {
      const response = await fetch(SITE_CONFIG.contactFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          businessName: form.businessName.trim(),
          email: form.email.trim(),
          sector: form.sector,
          challenge: form.challenge,
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      // Only record contact_form_submit after verified successful delivery,
      // and transmit ONLY non-PII categorical fields.
      trackContactFormSubmit(form.sector, form.challenge);
      setSubmitState('sent_live');
      setForm({
        fullName: '',
        businessName: '',
        email: '',
        sector: '',
        challenge: '',
        message: '',
      });
    } catch {
      setSubmitState('error');
      setSubmitErrorMsg(
        'The configured form endpoint could not accept this submission right now. Please try again later.',
      );
    }
  };

  const handleDiscoveryCallAction = () => {
    trackDiscoveryCallClick('contact_page_primary_cta');
    if (hasLiveScheduling) {
      window.location.href = SITE_CONFIG.schedulingUrl;
    } else {
      setSchedulingNoticeVisible(true);
      const formEl = document.getElementById('enquiry-form-section');
      if (formEl) {
        formEl.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  };

  return (
    <>
      <PageMeta
        title="Contact & Discovery Call | Signal & Scale Australia"
        description="Request a B2B SEO audit or discovery call with Signal & Scale to discuss practical search visibility and conversion improvements in Australia."
        path="/contact"
      />

      {/* Page Header */}
      <section className="bg-white border-b border-[#14243A]/10 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold tracking-wide text-[#087E83]">
              Contact &amp; Discovery
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#14243A] leading-tight">
              Let&apos;s Discuss Your Next Stage of Digital Growth.
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Share a brief overview of your business and current digital priorities. Whether you
              need a diagnostic SEO audit or want to talk through lead quality, we start with a
              clear, practical conversation.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleDiscoveryCallAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Request a Discovery Call</span>
              </button>
              <a
                href="#enquiry-form-section"
                className="inline-flex items-center px-5 py-3.5 text-sm font-semibold text-[#14243A] bg-[#F5F7FA] hover:bg-[#E8EEF4] border border-[#14243A]/15 rounded-lg transition-colors whitespace-nowrap"
              >
                Complete Enquiry Form Below
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Scheduling Configuration Section */}
      <section id="enquiry-form-section" className="py-14 lg:py-18 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#14243A]/10 p-7 sm:p-10 space-y-6">
            <div className="space-y-2 pb-4 border-b border-[#14243A]/10">
              <h2 className="text-2xl font-bold text-[#14243A]">Send a Project Enquiry</h2>
              <p className="text-sm text-[#4B5563]">
                All fields marked with an asterisk (*) are required so we can understand your sector
                and challenge before replying.
              </p>
            </div>

            {!hasLiveEndpoint && (
              <div
                role="note"
                className="p-4 rounded-xl bg-[#F5F7FA] border border-[#14243A]/15 flex items-start gap-3 text-xs sm:text-sm text-[#374151]"
              >
                <Info className="w-5 h-5 text-[#087E83] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="font-semibold text-[#14243A]">
                    Demonstration Form Mode (No Endpoint Configured)
                  </p>
                  <p className="leading-relaxed">
                    Because this static site is currently running without an external form backend,
                    submitting this form validates your inputs locally and displays a demonstration
                    preview rather than sending a live message. Configure{' '}
                    <code className="font-mono text-xs text-[#14243A]">
                      VITE_CONTACT_FORM_ENDPOINT
                    </code>{' '}
                    to enable live delivery.
                  </p>
                </div>
              </div>
            )}

            {submitState === 'error' && submitErrorMsg && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-sm text-red-900"
              >
                <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{submitErrorMsg}</span>
              </div>
            )}

            {submitState === 'sent_live' && (
              <div
                role="status"
                className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-sm text-emerald-950"
              >
                <CheckCircle2
                  className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="font-semibold">Enquiry submitted successfully</p>
                  <p>
                    Your enquiry has been transmitted to the configured endpoint and recorded as a
                    non-PII conversion event.
                  </p>
                </div>
              </div>
            )}

            {submitState === 'demo_validated' && (
              <div
                role="status"
                className="p-5 rounded-xl bg-[#FFFBEB] border border-[#E5A85B]/70 flex items-start gap-3 text-sm text-[#78350F]"
              >
                <Info className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-2">
                  <p className="font-semibold text-[#78350F]">
                    Demonstration Mode Only — Enquiry Not Delivered
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Your inputs passed client-side validation. Because no external form backend is
                    configured yet, <strong>this enquiry has not been sent or stored</strong>, and
                    no <code className="font-mono text-xs">contact_form_submit</code> GA4 event was
                    recorded.
                  </p>
                  <p className="text-xs">
                    Prepared summary: <strong>{form.sector}</strong> &middot;{' '}
                    <strong>{form.challenge}</strong>
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-full-name"
                    className="block text-sm font-medium text-[#14243A]"
                  >
                    Full name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                    value={form.fullName}
                    onChange={(e) => {
                      setForm({...form, fullName: e.target.value});
                      if (errors.fullName) setErrors({...errors, fullName: undefined});
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14243A]/20 bg-white text-[#14243A] focus:border-[#087E83]"
                  />
                  {errors.fullName && (
                    <p id="error-full-name" className="text-xs text-red-700 font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-business-name"
                    className="block text-sm font-medium text-[#14243A]"
                  >
                    Business name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-business-name"
                    name="businessName"
                    type="text"
                    autoComplete="organization"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.businessName)}
                    aria-describedby={errors.businessName ? 'error-business-name' : undefined}
                    value={form.businessName}
                    onChange={(e) => {
                      setForm({...form, businessName: e.target.value});
                      if (errors.businessName) setErrors({...errors, businessName: undefined});
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14243A]/20 bg-white text-[#14243A] focus:border-[#087E83]"
                  />
                  {errors.businessName && (
                    <p id="error-business-name" className="text-xs text-red-700 font-medium">
                      {errors.businessName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-[#14243A]"
                >
                  Email address <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  value={form.email}
                  onChange={(e) => {
                    setForm({...form, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: undefined});
                  }}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14243A]/20 bg-white text-[#14243A] focus:border-[#087E83]"
                />
                {errors.email && (
                  <p id="error-email" className="text-xs text-red-700 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-sector"
                    className="block text-sm font-medium text-[#14243A]"
                  >
                    Business sector <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-sector"
                    name="sector"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.sector)}
                    aria-describedby={errors.sector ? 'error-sector' : undefined}
                    value={form.sector}
                    onChange={(e) => {
                      setForm({...form, sector: e.target.value});
                      if (errors.sector) setErrors({...errors, sector: undefined});
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14243A]/20 bg-white text-[#14243A] focus:border-[#087E83]"
                  >
                    <option value="">Select your sector</option>
                    {SECTORS.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <p id="error-sector" className="text-xs text-red-700 font-medium">
                      {errors.sector}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-challenge"
                    className="block text-sm font-medium text-[#14243A]"
                  >
                    Primary marketing challenge <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-challenge"
                    name="challenge"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.challenge)}
                    aria-describedby={errors.challenge ? 'error-challenge' : undefined}
                    value={form.challenge}
                    onChange={(e) => {
                      setForm({...form, challenge: e.target.value});
                      if (errors.challenge) setErrors({...errors, challenge: undefined});
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14243A]/20 bg-white text-[#14243A] focus:border-[#087E83]"
                  >
                    <option value="">Select primary challenge</option>
                    {CHALLENGES.map((challenge) => (
                      <option key={challenge} value={challenge}>
                        {challenge}
                      </option>
                    ))}
                  </select>
                  {errors.challenge && (
                    <p id="error-challenge" className="text-xs text-red-700 font-medium">
                      {errors.challenge}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[#14243A]"
                >
                  Optional message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  placeholder="Share your current website URL or key priorities (optional)."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14243A]/20 bg-white text-[#14243A] focus:border-[#087E83]"
                />
              </div>

              {/* Visible Privacy Notice */}
              <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#14243A]/10 flex items-start gap-3 text-xs text-[#4B5563]">
                <Lock className="w-4 h-4 text-[#087E83] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">
                  <strong className="text-[#14243A]">Privacy Notice:</strong> Details entered here
                  are used solely to evaluate and respond to your enquiry. Signal &amp; Scale never
                  transmits names, email addresses, business names, or message text to Google
                  Analytics 4.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#14243A] hover:bg-[#0E1A2B] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap"
                >
                  {submitState === 'submitting'
                    ? 'Sending Enquiry...'
                    : hasLiveEndpoint
                      ? 'Send an Enquiry'
                      : 'Test Enquiry Form (Demonstration)'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Discovery Call Placeholder & Expectations */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#14243A]/10 p-7 space-y-4">
              <h2 className="text-xl font-bold text-[#14243A]">
                20-Minute Discovery Call Scheduling
              </h2>
              <p className="text-sm leading-relaxed text-[#4B5563]">
                Discovery calls are intended for Australian B2B service businesses exploring a
                Website &amp; SEO Audit, 90-Day Roadmap, or GA4 Measurement review.
              </p>

              {hasLiveScheduling ? (
                <a
                  href={SITE_CONFIG.schedulingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDiscoveryCallClick('contact_sidebar_scheduling')}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Open Live Scheduling Calendar</span>
                </a>
              ) : (
                <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#14243A]/15 space-y-2">
                  <p className="text-xs font-semibold text-[#14243A]">
                    Configurable Scheduling Placeholder
                  </p>
                  <p className="text-xs leading-relaxed text-[#4B5563]">
                    Live calendar booking is not connected yet. Set{' '}
                    <code className="font-mono text-[#14243A]">VITE_SCHEDULING_URL</code> (e.g.
                    Calendly or Microsoft Bookings) in your environment configuration to activate
                    direct time-slot booking here.
                  </p>
                  {schedulingNoticeVisible && (
                    <p className="text-xs font-medium text-[#087E83]">
                      In the meantime, please use the demonstration enquiry form alongside to test
                      your discovery request details.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-[#14243A]/10 p-7 space-y-4">
              <h2 className="text-lg font-semibold text-[#14243A]">Operating Model</h2>
              <p className="text-sm leading-relaxed text-[#4B5563]">
                Signal &amp; Scale is structured as a remote-first Australian consultancy concept
                without a physical storefront or public telephone reception line. Communication is
                initiated via structured enquiry or scheduled video call once live endpoints are
                connected.
              </p>
              <div className="pt-3 border-t border-[#14243A]/10 space-y-2 text-xs text-[#4B5563]">
                <p>
                  <strong className="text-[#14243A]">What we cover first:</strong> Current website
                  goals, service priorities, and lead-quality bottlenecks.
                </p>
                <p>
                  <strong className="text-[#14243A]">No obligation:</strong> We will tell you
                  honestly if an SEO audit is not yet the highest-priority spend for your stage.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
