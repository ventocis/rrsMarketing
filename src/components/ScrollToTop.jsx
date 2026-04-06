import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      if (!id) {
        window.scrollTo(0, 0);
        return;
      }
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      };
      // Defer so routed content (e.g. Home + #how-it-works) is in the DOM after navigation
      const t0 = setTimeout(scrollToTarget, 0);
      const t1 = setTimeout(scrollToTarget, 100);
      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
      };
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
