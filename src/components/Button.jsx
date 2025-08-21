import React from 'react';

const base = 'inline-flex items-center justify-center font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition';
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 focus:shadow-md focus:-translate-y-0.5',
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

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
