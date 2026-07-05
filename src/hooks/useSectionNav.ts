import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToPath } from '@/lib/sectionNavigation';

/** Scroll to the in-page section when the user clicks a nav link for the current route. */
export function useSectionNav(onNavigate?: () => void) {
  const { pathname } = useLocation();

  return useCallback(
    (path: string) => {
      onNavigate?.();
      if (pathname === path) {
        scrollToPath(path);
      }
    },
    [onNavigate, pathname],
  );
}
