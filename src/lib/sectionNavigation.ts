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

function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  if (sectionId === 'hero') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const element = document.getElementById(sectionId);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

export function scrollToPath(pathname: string, behavior: ScrollBehavior = 'smooth') {
  const sectionId = PATH_TO_SECTION_ID[pathname];
  if (!sectionId) return;

  requestAnimationFrame(() => {
    scrollToSection(sectionId, behavior);
  });
}
