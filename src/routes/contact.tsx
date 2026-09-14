import { createFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/editorial/Container';
import { Headline } from '@/components/editorial/Headline';
import { PillLink } from '@/components/editorial/PillLink';
import { Reveal } from '@/components/editorial/Reveal';
import { TextReveal } from '@/components/editorial/TextReveal';
import { SiteNav } from '@/components/layout/SiteNav';
import { site } from '@/content/site';

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: 'Contact · Karoline Z.L.H' }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className='flex flex-1 items-center'>
        <Container className='grid gap-12 py-[clamp(3rem,8vw,7rem)] md:grid-cols-[1fr_auto] md:items-end'>
          <Reveal when='mount' className='flex flex-col items-start gap-10'>
            <Headline as='h1' size='display' className='-ml-[0.04em] max-w-[10ch]'>
              <TextReveal when='mount'>Let’s talk</TextReveal>
            </Headline>
            <p className='max-w-[36ch] text-statement'>
              Collaboration, freelance, a question, or just to say hi. The fastest way to reach me
              is email.
            </p>
            <div className='flex flex-wrap gap-3'>
              <PillLink size='lg' render={<a href={`mailto:${site.email}`} />}>
                {site.email}
              </PillLink>
              <PillLink
                size='lg'
                render={<a href={site.resumeHref} target='_blank' rel='noreferrer' />}
              >
                View resume
              </PillLink>
            </div>
          </Reveal>
          <Reveal when='mount' delay={0.15}>
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
            <p className='mt-10 text-caption text-muted-foreground uppercase'>{site.location}</p>
          </Reveal>
        </Container>
      </main>
    </>
  );
}
