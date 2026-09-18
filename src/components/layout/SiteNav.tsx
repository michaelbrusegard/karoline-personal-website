import { Link } from '@tanstack/react-router';
import { cn } from 'cn';

import { site } from '@/content/site';

const links = [
  { to: '/', label: 'Work', hash: 'work' },
  { to: '/about', label: 'About me' },
  { to: '/creative-corner', label: 'Creative corner' },
  { to: '/contact', label: 'Contact' },
] as const;

type SiteNavProps = {
  /** `overlay` floats over the hero on dark; `bar` is the standard in-flow header. */
  variant?: 'overlay' | 'bar';
  className?: string;
};

function SiteNav({ variant = 'bar', className }: SiteNavProps) {
  return (
    <header
      className={cn(
        'z-40 flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 px-gutter py-5 text-base uppercase md:py-6',
        variant === 'overlay' ? 'absolute inset-x-0 top-0 text-bone' : 'relative text-ink',
        className,
      )}
    >
      <Link to='/' className='link-underline shrink-0 font-medium'>
        {site.shortName}
      </Link>
      <nav aria-label='Primary'>
        <ul className='flex flex-wrap items-center gap-x-[clamp(0.75rem,3vw,2.5rem)] gap-y-1'>
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                {...('hash' in link ? { hash: link.hash } : {})}
                className='link-underline whitespace-nowrap'
                activeOptions={{ exact: link.to === '/' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export { SiteNav };
