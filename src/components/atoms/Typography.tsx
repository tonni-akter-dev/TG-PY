'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      body: 'leading-7 [&:not(:first-child)]:mt-6',
      small: 'text-sm font-medium leading-none',
      caption: 'text-xs text-muted-foreground',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      muted: 'text-sm text-muted-foreground'
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
      gradient: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left'
  }
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, align, as, ...props }, ref) => {
    const Tag = (as ||
      (variant?.startsWith('h') ? variant : 'div')) as keyof React.JSX.IntrinsicElements;

    return React.createElement(Tag, {
      className: cn(typographyVariants({ variant, color, align, className })),
      ref,
      ...props
    });
  }
);
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
