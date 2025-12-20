import React from 'react';

const base = 'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition';
const variants = {
  primary: 'bg-[#0667D1] text-white hover:bg-[#0556b3] rounded-[16px] transition-colors',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md hover:-translate-y-0.5 focus:shadow-md focus:-translate-y-0.5',
  link: 'bg-transparent text-blue-600 hover:text-blue-700 underline shadow-none px-0 py-0',
  custom: '', // No default styling, allows full custom className control
};
const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className = '',
  ...rest
}) {
  // #region agent log
  React.useEffect(() => {
    const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
    const safeLog = (data) => {
      fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
    };
    safeLog({location:'Button.jsx:render',message:'Button component rendered',data:{variant,size,href,className:className.substring(0,100),childrenText:typeof children === 'string' ? children : 'non-string',hasStyle:!!rest.style},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
  }, [variant, size, href, className, children, rest.style]);
  // #endregion
  
  let classes;
  
  if (variant === 'custom') {
    // Custom variant bypasses all default styling
    classes = className;
  } else {
    // Standard variants use default styling
    classes = [
      base,
      variants[variant] || variants.primary,
      sizes[size] || sizes.md,
      className,
      'motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:focus:transform-none',
    ].join(' ');
  }

  // #region agent log
  React.useEffect(() => {
    const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
    const safeLog = (data) => {
      fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
    };
    setTimeout(() => {
      const buttons = document.querySelectorAll('a[href="/courses/tx-defensive"], button[href="/courses/tx-defensive"]');
      buttons.forEach((btn, idx) => {
        const computed = window.getComputedStyle(btn);
        const rect = btn.getBoundingClientRect();
        const parent = btn.parentElement;
        const innerHTML = btn.innerHTML;
        const textNodes = Array.from(btn.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent);
        safeLog({location:'Button.jsx:dom-check',message:'Button DOM element found',data:{index:idx,textContent:btn.textContent?.trim(),innerHTML:innerHTML.substring(0,100),textNodes:textNodes,className:btn.className.substring(0,200),href:btn.href,computedHeight:computed.height,computedMinHeight:computed.minHeight,computedPaddingTop:computed.paddingTop,computedPaddingBottom:computed.paddingBottom,computedFontSize:computed.fontSize,computedLineHeight:computed.lineHeight,computedFontFamily:computed.fontFamily,computedTextAlign:computed.textAlign,computedVerticalAlign:computed.verticalAlign,hasNoUnderline:btn.className.includes('no-underline'),actualHeight:rect.height,actualWidth:rect.width,parentTag:parent?.tagName,parentClassName:parent?.className?.substring(0,100),isInHeader:btn.closest('header') !== null,isInHero:btn.closest('section')?.className?.includes('hero') || false},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'B'});
      });
    }, 1000);
  }, []);
  // #endregion

  // Add shadow style for primary variant
  const primaryShadowStyle = variant === 'primary' ? {
    boxShadow: '0 20px 25px -5px rgba(17, 23, 34, 0.10), 0 8px 10px -6px rgba(17, 23, 34, 0.05)'
  } : {};

  const combinedStyle = { ...primaryShadowStyle, ...rest.style };

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest} style={combinedStyle}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick} {...rest} style={combinedStyle}>
      {children}
    </button>
  );
}
