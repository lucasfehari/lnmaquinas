import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useStore } from '../store';

interface SEOProps {
  page: string;
}

export const SEO: React.FC<SEOProps> = ({ page }) => {
  const { seoSettings, fetchSEO } = useStore();

  useEffect(() => {
    if (seoSettings.length === 0) {
      fetchSEO();
    }
  }, [seoSettings.length, fetchSEO]);

  const currentSEO = seoSettings.find(s => s.page === page);

  if (!currentSEO) return null;

  return (
    <Helmet>
      <title>{currentSEO.title}</title>
      {currentSEO.description && (
        <meta name="description" content={currentSEO.description} />
      )}
      {currentSEO.keywords && (
        <meta name="keywords" content={currentSEO.keywords} />
      )}
    </Helmet>
  );
};
