import React, { lazy, Suspense, useEffect, useState } from 'react';

const Page1 = lazy(() => import('./Page1')); // Lazy load page components
const Page2 = lazy(() => import('./Page2'));
const Page3 = lazy(() => import('./Page3'));

const PageLoader = ({ page, isActive, onPageChange }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false); // Reset loaded state when page changes
  }, [page]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isActive) {
      // Preload next page's content
      switch (page) {
        case 1:
          import('./Page2');
          import('./Page3');
          break;
        case 2:
          import('./Page3');
          break;
        default:
          break;
      }
    }
  }, [isActive, page]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isActive && (
        <>
          {page === 1 && <Page1 onLoad={handleLoad} />}
          {page === 2 && <Page2 onLoad={handleLoad} />}
          {page === 3 && <Page3 onLoad={handleLoad} />}
        </>
      )}
    </Suspense>
  );
};

export default PageLoader;
