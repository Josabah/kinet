import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resetScrollForPath } from '@/lib/sectionNavigation';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    resetScrollForPath(pathname);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
