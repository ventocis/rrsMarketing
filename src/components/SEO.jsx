import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../config/urls.js';

const IS_QA = import.meta.env.VITE_IS_QA === 'true';

export default function SEO({ 
  title, 
  description, 
  keywords = '', 
  image = '/assets/rrs (1200 x 630 px).png',
  url = '',
  type = 'website',
  publishedTime = '',
  modifiedTime = '',
  author = 'Road Ready Safety',
  /** When true, use `title` as the full document title (no "– Road Ready Safety" suffix). */
  exactTitle = false
}) {
  const siteTitle = 'Road Ready Safety';
  const trimmedTitle = typeof title === 'string' ? title.trim() : title;
  const fullTitle = exactTitle && trimmedTitle
    ? trimmedTitle
    : !trimmedTitle
      ? siteTitle
      : trimmedTitle.endsWith('| Road Ready Safety')
        ? trimmedTitle
        : `${trimmedTitle} – ${siteTitle}`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags - Remove if no Twitter account */}
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@roadreadysafety" /> */}
      
      {/* Additional Meta Tags */}
      <meta name="author" content={author} />
      {IS_QA
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      }
      <link rel="canonical" href={fullUrl} />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
}
