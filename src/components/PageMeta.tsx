import {useEffect} from 'react';
import {SITE_CONFIG} from '../config/siteConfig';
import {trackPageView} from '../lib/analytics';

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
}

function upsertMetaTag(
  selector: string,
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function PageMeta({title, description, path, jsonLd}: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    upsertMetaTag('meta[name="description"]', 'name', 'description', description);
    upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    const normalizedBase = SITE_CONFIG.canonicalBaseUrl.replace(/\/$/, '');
    const normalizedPath = path === '/' ? '/' : `/#${path}`;
    const canonicalUrl = `${normalizedBase}${normalizedPath}`;

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    const existingScript = document.getElementById('page-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'page-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    trackPageView(path, title);
  }, [title, description, path, jsonLd]);

  return null;
}
