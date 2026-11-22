export interface SiteConfig {
  brandName: string;
  tagline: string;
  regionLabel: string;
  /**
   * Central Google Analytics 4 Measurement ID configuration.
   * Replace 'G-XXXXXXXXXX' with your live GA4 Measurement ID (e.g. 'G-ABC123DEF4')
   * or set VITE_GA4_MEASUREMENT_ID at build time.
   */
  ga4MeasurementId: string;
  /**
   * Optional form endpoint (e.g. Formspree, Getform, or custom webhook URL).
   * When empty, the contact form runs in clearly labelled demonstration mode
   * and does not claim external message delivery.
   */
  contactFormEndpoint: string;
  /**
   * Optional external booking link (e.g. Calendly or Microsoft Bookings URL).
   * When empty, scheduling controls remain clearly labelled as unconfigured placeholders.
   */
  schedulingUrl: string;
  /**
   * Canonical origin + base path used after GitHub Pages deployment.
   * Replace with your live GitHub Pages or custom domain URL.
   */
  canonicalBaseUrl: string;
}

export const SITE_CONFIG: SiteConfig = {
  brandName: 'Signal & Scale',
  tagline: 'Transforming business expertise into measurable digital growth.',
  regionLabel: 'Remote-first Australian B2B consultancy concept',
  ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-M6C4BMCYP1',
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '',
  schedulingUrl: import.meta.env.VITE_SCHEDULING_URL || '',
  canonicalBaseUrl:
    import.meta.env.VITE_CANONICAL_BASE_URL || 'https://example.github.io/signal-and-scale',
};
