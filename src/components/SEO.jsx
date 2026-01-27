import React from 'react';
// #region agent log
// Import will fail if package is missing - error will be caught by global error handler
// #endregion
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords = '', 
  image = '/assets/rrs (1200 x 630 px).png',
  url = '',
  type = 'website',
  publishedTime = '',
  modifiedTime = '',
  author = 'Road Ready Safety'
}) {
  const siteTitle = 'Road Ready Safety';
  const fullTitle = title ? `${title} – ${siteTitle}` : siteTitle;
  const fullUrl = url ? `https://roadreadysafety.com${url}` : 'https://roadreadysafety.com';
  const fullImage = image.startsWith('http') ? image : `https://roadreadysafety.com${image}`;

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
      <meta name="robots" content="index, follow" />
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
