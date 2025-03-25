'use client';

import NextLink from 'next/link';
import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
}

export function Link({ href, children, className, target }: LinkProps) {
  // If external link or special target, use regular anchor
  if (href.startsWith('http') || target === '_blank') {
    return (
      <a href={href} className={className} target={target || '_blank'} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  // Otherwise use Next.js Link
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
} 