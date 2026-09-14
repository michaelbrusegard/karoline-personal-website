import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';

type PillLinkProps = {
  render: React.ReactElement;
  children: React.ReactNode;
  size?: 'default' | 'lg';
  className?: string;
};

/**
 * The outlined pill CTA from the design ("Get in touch ↗").
 * `render` supplies the underlying anchor/Link so routing stays typed.
 */
function PillLink({ render, children, size = 'default', className }: PillLinkProps) {
  return (
    <Button
      variant='outline'
      render={render}
      className={cn(
        'group h-auto justify-between gap-6 rounded-full border-current bg-transparent px-5 py-3.5 text-caption font-medium uppercase hover:bg-current/5',
        size === 'lg' && 'px-8 py-5 text-lg tracking-normal normal-case',
        className,
      )}
    >
      <span>{children}</span>
      <HugeiconsIcon
        icon={ArrowUpRight01Icon}
        strokeWidth={2}
        className={cn(
          'size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
          size === 'lg' && 'size-6',
        )}
      />
    </Button>
  );
}

export { PillLink };
