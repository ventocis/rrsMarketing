import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function StructuredData({ type, data }) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Road Ready Safety",
          "url": "https://roadreadysafety.com",
          "logo": "https://roadreadysafety.com/assets/logo.svg",
          "description": "State-approved traffic school and defensive driving courses built to be simple.",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-888-885-5707",
            "contactType": "customer service",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.facebook.com/roadreadysafety"
          ]
        };
      
      case 'course':
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": data.course_name,
          "description": data.subhead || `${data.course_name} online course`,
          "provider": {
            "@type": "Organization",
            "name": data.provider_type === 'Partner' ? data.provider_name : "Road Ready Safety"
          },
          "educationalLevel": "Beginner",
          "timeRequired": `PT${data.duration_hours}H`,
          "courseMode": "online",
          "inLanguage": "en-US",
          "url": `https://roadreadysafety.com/courses/${data.slug}`,
          "offers": {
            "@type": "Offer",
            "price": data.price_usd,
            "priceCurrency": "USD",
            "availability": "https://schema.org/OnlineOnly",
            "url": `https://roadreadysafety.com/courses/${data.slug}`
          }
        };
      
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "author": {
            "@type": "Organization",
            "name": "Road Ready Safety"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Road Ready Safety",
            "logo": {
              "@type": "ImageObject",
              "url": "https://roadreadysafety.com/assets/logo.svg"
            }
          },
          "datePublished": data.date,
          "dateModified": data.date,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://roadreadysafety.com/blog/${data.slug}`
          }
        };
      
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Road Ready Safety",
          "url": "https://roadreadysafety.com",
          "description": "State-approved traffic school and defensive driving courses",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://roadreadysafety.com/find/{state}/{courseType}",
            "query-input": "required name=state name=courseType"
          }
        };
      
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
