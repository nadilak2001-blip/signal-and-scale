import {SITE_CONFIG} from '../config/siteConfig';

export type AnalyticsConsentStatus = 'unset' | 'granted' | 'denied';

export type GA4EventName =
  | 'page_view'
  | 'audit_request_click'
  | 'service_view'
  | 'discovery_call_click'
  | 'contact_form_submit'
  | 'insight_to_service_click';

const CONSENT_STORAGE_KEY = 'signal_scale_analytics_consent_v1';
const PLACEHOLDER_ID = 'G-XXXXXXXXXX';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let scriptInjected = false;
let lastTrackedPageKey = '';

export function isConfiguredMeasurementId(id: string = SITE_CONFIG.ga4MeasurementId): boolean {
  if (!id || id === PLACEHOLDER_ID) return false;
  return /^G-[A-Z0-9]{6,}$/i.test(id.trim());
}

export function getAnalyticsConsent(): AnalyticsConsentStatus {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') {
      return stored;
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }
  return 'unset';
}

export function setAnalyticsConsent(status: 'granted' | 'denied'): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // Ignore storage access errors
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: status === 'granted' ? 'granted' : 'denied',
    });
  }

  if (status === 'granted') {
    initializeGA4();
  }
}

export function initializeGA4(): void {
  if (typeof window === 'undefined') return;

  const measurementId = SITE_CONFIG.ga4MeasurementId.trim();
  const consent = getAnalyticsConsent();

  // Only inject Google Analytics script when a real Measurement ID is configured
  // AND the visitor has explicitly granted analytics consent.
  if (!isConfiguredMeasurementId(measurementId) || consent !== 'granted') {
    return;
  }

  if (scriptInjected) return;
  scriptInjected = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  window.gtag('js', new Date());
  // Disable automatic page_view to prevent duplicate events with SPA routing
  window.gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

function sendEvent(
  eventName: GA4EventName,
  params: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') return;

  const consent = getAnalyticsConsent();
  if (consent !== 'granted' || !isConfiguredMeasurementId()) {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackPageView(routePath: string, pageTitle: string): void {
  const normalizedPath = routePath || '/';
  const key = `${normalizedPath}|${pageTitle}`;

  // Prevent duplicate page_view events on React re-renders or StrictMode double-mounts
  if (lastTrackedPageKey === key) {
    return;
  }
  lastTrackedPageKey = key;

  sendEvent('page_view', {
    page_path: normalizedPath,
    page_title: pageTitle,
  });
}

export function trackAuditRequestClick(ctaLocation: string): void {
  sendEvent('audit_request_click', {
    cta_location: ctaLocation,
  });
}

export function trackServiceView(serviceId: string, serviceTitle: string): void {
  sendEvent('service_view', {
    service_id: serviceId,
    service_name: serviceTitle,
  });
}

export function trackDiscoveryCallClick(ctaLocation: string): void {
  sendEvent('discovery_call_click', {
    cta_location: ctaLocation,
  });
}

/**
 * Records a successful contact form submission using only non-PII categorical fields.
 * Never transmits names, email addresses, business names, or free-text messages.
 */
export function trackContactFormSubmit(sector: string, primaryChallenge: string): void {
  sendEvent('contact_form_submit', {
    business_sector: sector,
    primary_challenge: primaryChallenge,
  });
}

export function trackInsightToServiceClick(guideSlug: string, targetService: string): void {
  sendEvent('insight_to_service_click', {
    insight_slug: guideSlug,
    target_service: targetService,
  });
}
