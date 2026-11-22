
export type AnalyticsConsentStatus = 'unset' | 'granted' | 'denied';

export type GA4EventName =
  | 'page_view'
  | 'audit_request_click'
  | 'service_view'
  | 'discovery_call_click'
  | 'contact_form_submit'
  | 'insight_to_service_click';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = 'G-M6C4BMCYP1';
const CONSENT_KEY = 'signal_scale_analytics_consent_v1';

let lastPageKey = '';

export function isConfiguredMeasurementId(
  id: string = MEASUREMENT_ID
): boolean {
  return /^G-[A-Z0-9]{6,}$/i.test(id.trim());
}

export function getAnalyticsConsent(): AnalyticsConsentStatus {
  if (typeof window === 'undefined') return 'unset';
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied'
      ? value
      : 'unset';
  } catch {
    return 'unset';
  }
}

export function initializeGA4(): void {
  if (typeof window === 'undefined') return;

  window.gtag?.('consent', 'update', {
    analytics_storage:
      getAnalyticsConsent() === 'granted' ? 'granted' : 'denied',
  });
}

export function setAnalyticsConsent(
  status: 'granted' | 'denied'
): void {
  try {
    localStorage.setItem(CONSENT_KEY, status);
  } catch {
    // Continue without persistent storage.
  }

  initializeGA4();
  lastPageKey = '';

  if (status === 'granted') {
    trackPageView(
      window.location.hash.split('?')[0].replace(/^#/, '') || '/',
      document.title
    );
  }
}

function sendEvent(
  name: GA4EventName,
  params: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;
  if (getAnalyticsConsent() !== 'granted') return;

  window.gtag?.('event', name, {
    ...params,
    send_to: MEASUREMENT_ID,
  });
}

export function trackPageView(
  routePath: string,
  pageTitle: string
): void {
  if (typeof window === 'undefined') return;
  if (getAnalyticsConsent() !== 'granted') return;

  const path = routePath || '/';
  const key = `${path}|${pageTitle}`;

  if (lastPageKey === key) return;
  lastPageKey = key;

  sendEvent('page_view', {
    page_path: path,
    page_title: pageTitle,
    page_location: window.location.href,
  });
}

export function trackAuditRequestClick(location: string): void {
  sendEvent('audit_request_click', {cta_location: location});
}

export function trackServiceView(
  serviceId: string,
  serviceTitle: string
): void {
  sendEvent('service_view', {
    service_id: serviceId,
    service_name: serviceTitle,
  });
}

export function trackDiscoveryCallClick(location: string): void {
  sendEvent('discovery_call_click', {cta_location: location});
}

export function trackContactFormSubmit(
  sector: string,
  primaryChallenge: string
): void {
  sendEvent('contact_form_submit', {
    business_sector: sector,
    primary_challenge: primaryChallenge,
  });
}

export function trackInsightToServiceClick(
  guideSlug: string,
  targetService: string
): void {
  sendEvent('insight_to_service_click', {
    insight_slug: guideSlug,
    target_service: targetService,
  });
}
