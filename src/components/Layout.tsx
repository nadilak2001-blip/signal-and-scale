import {useEffect, useState, type ReactNode} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Menu, ShieldCheck, X} from 'lucide-react';
import {BrandMark} from './BrandMark';
import {SITE_CONFIG} from '../config/siteConfig';
import {
  getAnalyticsConsent,
  isConfiguredMeasurementId,
    setAnalyticsConsent,
  trackAuditRequestClick,
  trackPageView,
  type AnalyticsConsentStatus,
} from '../lib/analytics';

const PRIMARY_NAV = [
  {to: '/', label: 'Home'},
  {to: '/services', label: 'Services'},
  {to: '/about', label: 'About'},
  {to: '/insights', label: 'Insights'},
  {to: '/contact', label: 'Contact'},
];

const SECONDARY_NAV = [
  {to: '/industries', label: 'Industries'},
  {to: '/evidence', label: 'Evidence & Methodology'},
];

export function Layout({children}: {children: ReactNode}) {
  const [mobileOpen, setMobileOpen] = useState(false);
    const [privacyPanelOpen, setPrivacyPanelOpen] = useState(
    () => getAnalyticsConsent() === 'unset'
  );
  const [consent, setConsent] = useState<AnalyticsConsentStatus>(() => getAnalyticsConsent());
  const location = useLocation();
    useEffect(() => {
    if (consent !== 'granted') return;

    const pageTitle =
      document.title || 'Signal & Scale';

    trackPageView(location.pathname, pageTitle);
  }, [location.pathname, consent]);

  useEffect(() => {
    setMobileOpen(false);
    if (location.hash) {
      const targetId = location.hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
        return;
      }
    }
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [location.pathname, location.hash]);

  const handleConsentChange = (choice: 'granted' | 'denied') => {
    setAnalyticsConsent(choice);
    setConsent(choice);
  };

  const gaConfigured = isConfiguredMeasurementId();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#1F2937]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#14243A] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-sm border-b border-[#14243A]/10">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#14243A] whitespace-nowrap shrink-0"
          >
            <BrandMark className="w-6 h-6 shrink-0" />
            <span>Signal &amp; Scale</span>
          </Link>

          {/* Zone 2: 5 concise single-line primary navigation links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
            {PRIMARY_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({isActive}) =>
                  `relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#14243A] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#087E83]'
                      : 'text-[#4B5563] hover:text-[#14243A]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1 primary CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact?intent=audit"
              onClick={() => trackAuditRequestClick('header_primary_cta')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              Request an SEO Audit
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#14243A]/15 text-[#14243A] hover:bg-[#F5F7FA] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Menu */}
        {mobileOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden bg-white border-b border-[#14243A]/10 shadow-lg"
          >
            <nav aria-label="Mobile navigation" className="px-4 py-5 space-y-1">
              {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({isActive}) =>
                    `block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F5F7FA] text-[#087E83] font-semibold'
                        : 'text-[#14243A] hover:bg-[#F5F7FA]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-3 mt-3 border-t border-[#14243A]/10">
                <Link
                  to="/contact?intent=audit"
                  onClick={() => trackAuditRequestClick('mobile_menu_cta')}
                  className="block w-full text-center px-4 py-3 text-sm font-semibold text-white bg-[#087E83] hover:bg-[#066367] rounded-lg transition-colors"
                >
                  Request an SEO Audit
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="bg-[#14243A] text-white/85 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-4">
              <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-bold text-white">
                <BrandMark className="w-6 h-6" />
                <span>Signal &amp; Scale</span>
              </Link>
              <p className="text-sm leading-relaxed text-white/75 max-w-md">
                {SITE_CONFIG.tagline}
              </p>
              <p className="text-xs leading-relaxed text-white/60 max-w-md">
                Proposed remote-first Australian B2B digital marketing consultancy concept serving
                IT support providers, bookkeeping firms, and professional advisers.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h2 className="text-sm font-semibold text-white">Primary Pages</h2>
              <ul className="space-y-2 text-sm">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-white/75 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h2 className="text-sm font-semibold text-white">Specialisation &amp; Standards</h2>
              <ul className="space-y-2 text-sm">
                {SECONDARY_NAV.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-white/75 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/contact?intent=audit"
                    onClick={() => trackAuditRequestClick('footer_link')}
                    className="text-[#E5A85B] hover:text-white transition-colors font-medium"
                  >
                    Request an SEO Audit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-white/65">
            <p>
              &copy; {new Date().getFullYear()} Signal &amp; Scale. Proposed Australian digital
              marketing consultancy.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => setPrivacyPanelOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white underline underline-offset-4 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Analytics &amp; Privacy Settings</span>
              </button>
            </div>
          </div>

          {privacyPanelOpen && (
            <div
              role="region"
              aria-label="Analytics and privacy configuration"
              className="mt-6 p-5 rounded-xl bg-[#0E1A2B] border border-white/15 text-sm text-white/85"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <p className="font-semibold text-white">Google Analytics 4 Consent Preference</p>
                  <p className="text-xs leading-relaxed text-white/70">
                    Signal &amp; Scale prepares GA4 event tracking without collecting personally
                    identifiable information. Current GA4 Measurement ID:{' '}
                    <code className="font-mono text-[#E5A85B]">{SITE_CONFIG.ga4MeasurementId}</code>{' '}
                    ({gaConfigured ? 'configured' : 'placeholder — inactive until replaced with a live ID'}).
                    Current consent state: <strong className="text-white">{consent}</strong>.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleConsentChange('granted')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      consent === 'granted'
                        ? 'bg-[#087E83] text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Allow Analytics
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConsentChange('denied')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      consent === 'denied'
                        ? 'bg-white text-[#14243A]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Decline Analytics
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrivacyPanelOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs text-white/70 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
