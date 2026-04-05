import { faqs } from "@/data/faqs";
import { buildFaqPageJsonLd } from "@/lib/seoJsonLd";

/**
 * FAQPage structured data must match visible FAQ copy in FAQ.tsx (sourced from @/data/faqs).
 */
const SeoJsonLd = () => {
  const faqJsonLd = buildFaqPageJsonLd(faqs);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
  );
};

export default SeoJsonLd;
