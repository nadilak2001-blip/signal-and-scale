
import {SITE_CONFIG} from '../config/siteConfig';

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

let initialized = false;
let lastTrackedPageKey = '';

export function isConfiguredMeasurementId(
  id: string = MEASUREMENT_ID
): boolean {
  return /^G-[A-Z0-9]{6,}$/i.test(id.trim());
}

// Compatibility with existing website components.
// This version uses automatic analytics tracking.
export function getAnalyticsConsent(): AnalyticsConsentStatus {
  return 'granted';
}

export function setAnalyticsConsent(
  status: 'granted' | 'denied'
): void {
  if (status === 'granted') {
    initializeGA4();
  }
}

export function initializeGA4(): void {
  if (typeof window === 'undefined') return;
  if (initialized) return;
  if (!isConfiguredMeasurementId(MEASUREMENT_ID)) return;

  initialized = true;

  window.dataLayer = window.dataLayer || [];

  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());

  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: true,
    debug_mode: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src =
    'https://www.googletagmanager.com/gtag/js?id=' +
    MEASUREMENT_ID;

  document.head.appendChild(script);
}

function sendEvent(
  eventName: GA4EventName,
  params: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;

  initializeGA4();

  window.gtag?.('event', eventName, {
    ...params,
    send_to: MEASUREMENT_ID,
  });
}

export function trackPageView(
  routePath: string,
  pageTitle: string
): void {
  const normalizedPath = routePath || '/';
  const key = `${normalizedPath}|${pageTitle}`;

  if (lastTrackedPageKey === key) return;

  lastTrackedPageKey = key;

  // Initial page view is handled by gtag config.
  // Track subsequent SPA navigation manually.
  if (window.location.hash === '#/' &&
      normalizedPath === '/') {
    return;
  }

  sendEvent('page_view', {
    page_path: normalizedPath,
    page_title: pageTitle,
  });
}

export function trackAuditRequestClick(
  ctaLocation: string
): void {
  sendEvent('audit_request_click', {
    cta_location: ctaLocation,
  });
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

export function trackDiscoveryCallClick(
  ctaLocation: string
): void {
  sendEvent('discovery_call_click', {
    cta_location: ctaLocation,
  });
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
