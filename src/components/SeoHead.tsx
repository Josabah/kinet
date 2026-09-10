import { Helmet } from 'react-helmet-async';
import {
  INDEXING_ROBOTS,
  absoluteUrl,
  assetUrl,
  brand,
  siteSeo,
} from '@/config/seo';
import { stringifyJsonLd } from '@/lib/seoJsonLd';

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  keywords?: string;
  publishedTime?: string;
  jsonLd?: unknown;
};

const SeoHead = ({
  title,
  description,
  path,
  ogType = 'website',
  image,
  imageAlt,
  noindex = false,
  keywords,
  publishedTime,
  jsonLd,
}: SeoHeadProps) => {
  const canonical = absoluteUrl(path);
  const ogImage = assetUrl(image);
  const alt = imageAlt ?? siteSeo.ogImageAlt;
  const robots = noindex ? 'noindex, nofollow' : INDEXING_ROBOTS;
  const isDefaultImage = ogImage === siteSeo.ogImage;

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords ? <meta name="keywords" content={keywords} /> : null}
        <meta name="author" content={brand.name} />
        <meta name="robots" content={robots} />
        <meta name="application-name" content={brand.name} />
        <meta name="apple-mobile-web-app-title" content={brand.shortName} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        {isDefaultImage && <meta property="og:image:width" content={String(siteSeo.ogImageWidth)} />}
        {isDefaultImage && <meta property="og:image:height" content={String(siteSeo.ogImageHeight)} />}
        <meta property="og:image:alt" content={alt} />
        <meta property="og:locale" content={siteSeo.locale} />
        <meta property="og:site_name" content={siteSeo.siteName} />
        {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}

        <meta name="twitter:card" content={siteSeo.twitterCard} />
        <meta name="twitter:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={alt} />
      </Helmet>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(jsonLd) }} />
      ) : null}
    </>
  );
};

export default SeoHead;
