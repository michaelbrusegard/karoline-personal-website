import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';

import { CaseStudyHero } from '@/components/case-study/CaseStudyHero';
import { CaseStudySection } from '@/components/case-study/CaseStudySection';
import { Container } from '@/components/editorial/Container';
import { Eyebrow } from '@/components/editorial/Eyebrow';
import { Headline } from '@/components/editorial/Headline';
import { PillLink } from '@/components/editorial/PillLink';
import { Reveal } from '@/components/editorial/Reveal';
import { SiteNav } from '@/components/layout/SiteNav';
import { getProject, projects } from '@/content/projects';

/**
 * Projects whose case study is the design artifact itself get a bespoke page with the
 * project's own design system. Lazy so their fonts and code load only on that page.
 */
const showcases: Record<string, React.ComponentType> = {
  pastael: lazy(async () => {
    const { PastaelShowcase } = await import('@/components/case-study/PastaelShowcase');
    return { default: PastaelShowcase };
  }),
};

/**
 * Project-specific typefaces from the Figma frames, fetched only when that project's page
 * loads. The matching `theme-<slug>` rules live in app.css.
 */
const projectFonts: Record<string, () => Promise<unknown>> = {
  sit: () =>
    Promise.all([
      import('@fontsource-variable/public-sans'),
      import('@fontsource/zalando-sans-semiexpanded/latin-600.css'),
    ]),
};

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) {
      // eslint-disable-next-line typescript/only-throw-error -- TanStack Router's notFound() is designed to be thrown
      throw notFound();
    }
    void projectFonts[params.slug]?.();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.project.title} · Karoline Z.L.H` }] : [],
  }),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { project } = Route.useLoaderData();
  const Showcase = showcases[project.slug];

  return (
    <>
      <SiteNav />
      <main className={`theme-${project.slug}`}>
        <CaseStudyHero project={project} />
        {Showcase ? (
          <Suspense fallback={null}>
            <Showcase />
          </Suspense>
        ) : null}
        {project.sections.map((section, index) => (
          // Sections are static content; index is a stable key here.
          // eslint-disable-next-line react/no-array-index-key
          <CaseStudySection key={index} section={section} />
        ))}
        {project.link ? (
          <Container className='py-[clamp(3rem,6vw,5rem)]'>
            <Reveal className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
              <Headline size='headline'>{project.link.label}</Headline>
              <PillLink
                size='lg'
                render={<a href={project.link.href} target='_blank' rel='noreferrer' />}
              >
                Link
              </PillLink>
            </Reveal>
          </Container>
        ) : null}
        <NextProject slug={project.slug} />
      </main>
    </>
  );
}

/** Keeps the reader moving through the portfolio instead of dead-ending at the footer. */
function NextProject({ slug }: { slug: string }) {
  const index = projects.findIndex((project) => project.slug === slug);
  const next = projects[(index + 1) % projects.length];

  if (!next) {
    return null;
  }

  return (
    <Container className='pb-[clamp(3rem,6vw,5rem)]'>
      <Reveal>
        <Link
          to='/work/$slug'
          params={{ slug: next.slug }}
          className='group flex items-end justify-between gap-6 border-t border-current/20 pt-8'
        >
          <span>
            <Eyebrow>Next project</Eyebrow>
            <Headline as='h2' size='title' className='mt-3'>
              {next.cardTitle}
            </Headline>
          </span>
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            strokeWidth={1.5}
            className='mb-1 size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-2'
            aria-hidden
          />
        </Link>
      </Reveal>
    </Container>
  );
}
