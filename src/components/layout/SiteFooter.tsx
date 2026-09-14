import { Link } from '@tanstack/react-router';

import { Container } from '@/components/editorial/Container';
import { Headline } from '@/components/editorial/Headline';
import { PillLink } from '@/components/editorial/PillLink';
import { Reveal } from '@/components/editorial/Reveal';
import { TextReveal } from '@/components/editorial/TextReveal';
import { site } from '@/content/site';

const footerLinks = [
  { to: '/', label: 'Work', hash: 'work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

/** The dark "Let's make something meaningful." closer used at the bottom of every page. */
function SiteFooter() {
  return (
    <footer className='surface-dark'>
      <Container className='grid min-h-[min(56rem,100svh)] grid-cols-1 grid-rows-[auto_1fr_auto] gap-y-12 py-6 md:grid-cols-[1fr_auto]'>
        <nav
          aria-label='Footer'
          className='text-caption uppercase md:col-start-2 md:justify-self-end'
        >
          <ul className='flex gap-4 md:flex-col md:items-end md:gap-1'>
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  {...('hash' in link ? { hash: link.hash } : {})}
                  className='link-underline'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Reveal className='flex flex-col gap-10 self-center md:col-start-1 md:row-start-2'>
          <Headline size='headline' className='max-w-[12ch] font-normal tracking-[-0.045em]'>
            <TextReveal>Let’s make something meaningful.</TextReveal>
          </Headline>
          <div className='flex flex-wrap gap-3'>
            <PillLink render={<Link to='/contact' />}>Get in touch</PillLink>
            <PillLink render={<a href={site.resumeHref} target='_blank' rel='noreferrer' />}>
              View resume
            </PillLink>
          </div>
        </Reveal>

        <div className='self-end md:col-start-2 md:row-start-2 md:justify-self-end'>
          <p className='text-tag text-muted-foreground uppercase'>Find me</p>
          <ul className='mt-2 text-subtitle leading-tight'>
            {site.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel='noreferrer'
                  className='link-underline'
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='md:col-span-2'>
          <p
            aria-hidden
            className='-ml-[0.04em] text-[clamp(4rem,15vw,15rem)] leading-[0.85] font-light tracking-[-0.06em] uppercase select-none'
          >
            {site.firstName}
          </p>
          <div className='mt-10 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-current/20 pt-4 text-tag text-muted-foreground uppercase'>
            <span>
              ©{site.year} — {site.name}
            </span>
            <span>
              {site.role} — {site.location}
            </span>
            <span>NO</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };
