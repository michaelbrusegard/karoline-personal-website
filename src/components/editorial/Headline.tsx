import { cn } from 'cn';

type HeadlineProps<T extends 'h1' | 'h2' | 'h3'> = React.ComponentProps<T> & {
  as?: T;
  size?: 'display' | 'headline' | 'title' | 'subtitle';
};

const sizeClass = {
  display: 'text-display',
  headline: 'text-headline',
  title: 'text-title',
  subtitle: 'text-subtitle',
} as const;

/** Uppercase editorial heading. Defaults to an h2 at "headline" size. */
function Headline<T extends 'h1' | 'h2' | 'h3' = 'h2'>({
  as,
  size = 'headline',
  className,
  ...props
}: HeadlineProps<T>) {
  const Tag = (as ?? 'h2') as 'h2';
  return <Tag className={cn('text-balance uppercase', sizeClass[size], className)} {...props} />;
}

export { Headline };
