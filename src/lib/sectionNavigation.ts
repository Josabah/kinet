const PATH_TO_SECTION_ID: Record<string, string> = {
  '/': 'hero',
  '/process': 'process',
  '/services': 'services',
  '/capabilities': 'services',
  '/tech': 'services',
  '/why-kinet': 'why-kinet',
  '/faq': 'faq',
  '/contact': 'contact',
};

const HEADER_OFFSET_PX = 64;

function scrollToSection(sectionId: string) {
  if (sectionId === 'hero') {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return;
  }

  const element = document.getElementById(sectionId);
  if (!element) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'auto' });
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
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}
