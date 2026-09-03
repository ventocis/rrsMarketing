/**
 * Translated Texas guide pages.
 *
 * Each JSON in src/data/i18n/texas/ is one page in one language and renders at
 * /texas/<slug> via src/pages/texas/[i18n].astro. These are translations of the
 * English guides for accessibility; the course itself is delivered in English and
 * every translated page says so.
 */
export interface TranslatedPage {
  slug: string;          // e.g. "ticket-dismissal-es"
  source: string;        // English page path, e.g. "/texas/ticket-dismissal"
  lang: string;          // BCP-47: es, vi, zh-Hans, ar
  dir?: 'ltr' | 'rtl';
  langName: string;      // native name, e.g. "Español"
  title: string;
  description: string;
  keywords?: string;
  h1: string;
  intro: string[];       // HTML paragraphs
  notice: string;        // translation + not-legal-advice notice (HTML)
  sections: { h2: string; html: string }[];
  faqs: { q: string; a: string }[];
  faqHeading: string;
  nextStep: {
    heading: string; approvedTitle: string; approvedText: string; approvedBtn: string;
    notYetTitle: string; step1: string; step2: string; step2Link: string;
    reminderLabel: string; placeholder: string; send: string; sent: string; error: string;
    ineligibleNote: string; ineligibleLabel: string; ineligibleHref: string;
  };
  cta: { h2: string; text: string; primary: string; secondary: string; secondaryHref: string };
  footer: { provider: string; sources: string };
  dateModified: string;
}

const modules = import.meta.glob<{ default: TranslatedPage }>('../data/i18n/texas/*.json', { eager: true });

export const translatedPages: TranslatedPage[] = Object.values(modules).map(m => m.default);

const LANG_LABEL: Record<string, string> = { en: 'English', es: 'Español', vi: 'Tiếng Việt', 'zh-Hans': '中文', ar: 'العربية' };
export const langLabel = (lang: string) => LANG_LABEL[lang] ?? lang;

/** hreflang set for an English source page and all of its translations (reciprocal). */
export function alternatesFor(source: string): { lang: string; href: string }[] {
  const tr = translatedPages.filter(p => p.source === source);
  if (!tr.length) return [];
  return [
    { lang: 'en', href: source },
    { lang: 'x-default', href: source },
    ...tr.map(p => ({ lang: p.lang, href: `/texas/${p.slug}` })),
  ];
}

export function translationsOf(source: string): TranslatedPage[] {
  return translatedPages.filter(p => p.source === source);
}
