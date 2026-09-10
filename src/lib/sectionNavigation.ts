const PATH_TO_SECTION_ID: Record<string, string> = {
  '/': 'hero',
  '/process': 'process',
  '/services': 'services',
  '/capabilities': 'services',
  '/tech': 'services',
  '/faq': 'faq',
  '/contact': 'contact',
};

const HEADER_OFFSET_PX = 64;
const SECTION_WAIT_MS = 1500;

let scrollGeneration = 0;

function applySectionScroll(sectionId: string): boolean {
  if (sectionId === 'hero') {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return true;
  }

  const element = document.getElementById(sectionId);
  if (!element) return false;

  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'auto' });
  return true;
}

function scrollToSection(sectionId: string) {
  const generation = ++scrollGeneration;
  if (applySectionScroll(sectionId)) return;

  const started = performance.now();
  const tick = () => {
    if (generation !== scrollGeneration) return;
    if (applySectionScroll(sectionId)) return;
    if (performance.now() - started < SECTION_WAIT_MS) {
      requestAnimationFrame(tick);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  requestAnimationFrame(tick);
}

/** Instant scroll to a homepage section. Returns true when the path is handled. */
export function scrollToPath(pathname: string): boolean {
  const sectionId = PATH_TO_SECTION_ID[pathname];
  if (!sectionId) return false;

  scrollToSection(sectionId);
  return true;
}

/** Reset scroll on navigation — section jump on homepage routes, top elsewhere. */
export function resetScrollForPath(pathname: string) {
  if (!scrollToPath(pathname)) {
    scrollGeneration += 1;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}
