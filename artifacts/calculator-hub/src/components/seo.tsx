import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { getPageSEO, SITE_NAME, SITE_URL, calculatorSEO } from "@/lib/seo";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  jsonLd?: object | object[];
  noIndex?: boolean;
  keywords?: string[];
}

export function SEO({ title, description, canonical, jsonLd, noIndex, keywords }: SEOProps) {
  const [location] = useLocation();
  const pageSEO = getPageSEO(location);

  const resolvedTitle = title ?? pageSEO.title;
  const resolvedDesc = description ?? pageSEO.description;
  const resolvedCanonical = canonical ?? pageSEO.canonical;

  const calcId = location.replace(/^\//, "");
  const calcData = calculatorSEO[calcId];
  const resolvedKeywords = keywords ?? calcData?.keywords;

  const calcDisplayName = calcData?.title.split(" — ")[0].split(" | ")[0] ?? resolvedTitle;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      ...(calcData
        ? [
            { "@type": "ListItem", "position": 2, "name": calcData.category, "item": `${SITE_URL}${calcData.categoryPath}` },
            { "@type": "ListItem", "position": 3, "name": calcDisplayName, "item": resolvedCanonical },
          ]
        : []),
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Free online calculators for finance, health, math, and everyday decisions.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${resolvedCanonical}#webpage`,
    "url": resolvedCanonical,
    "name": resolvedTitle,
    "description": resolvedDesc,
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    ...(calcData ? { "dateModified": calcData.updatedDate } : {}),
  };

  const faqSchema = calcData?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": calcData.faq.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
      }
    : null;

  const softwareSchema = calcData
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": calcDisplayName,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "url": resolvedCanonical,
        "description": resolvedDesc,
        "dateModified": calcData.updatedDate,
      }
    : null;

  const schemas = [
    webSiteSchema,
    webPageSchema,
    breadcrumbSchema,
    faqSchema,
    softwareSchema,
    ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
  ].filter(Boolean);

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <link rel="canonical" href={resolvedCanonical} />
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      {resolvedKeywords && resolvedKeywords.length > 0 && (
        <meta name="keywords" content={resolvedKeywords.join(", ")} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />

      {/* JSON-LD structured data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
