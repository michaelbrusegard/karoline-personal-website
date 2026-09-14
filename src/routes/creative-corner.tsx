import { createFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/editorial/Container';
import { Headline } from '@/components/editorial/Headline';
import { Reveal } from '@/components/editorial/Reveal';
import { TextReveal } from '@/components/editorial/TextReveal';
import { SiteNav } from '@/components/layout/SiteNav';
import { creative } from '@/content/creative';

export const Route = createFileRoute('/creative-corner')({
  head: () => ({ meta: [{ title: 'Creative corner · Karoline Z.L.H' }] }),
  component: CreativeCornerPage,
});

function CreativeCornerPage() {
  return (
    <>
      <SiteNav className='border-b border-current/30' />
      <main>
        <Container className='py-[clamp(2rem,5vw,4rem)]'>
          <div className='grid gap-8 md:grid-cols-[1fr_minmax(18rem,0.56fr)] md:items-end'>
            <Reveal when='mount'>
              <Headline as='h1' size='display' className='-ml-[0.04em]'>
                <TextReveal when='mount'>Creative corner</TextReveal>
              </Headline>
            </Reveal>
            <Reveal when='mount' delay={0.1}>
              <p className='max-w-[36ch] text-body'>{creative.intro}</p>
            </Reveal>
          </div>

          {/* Pieces render at the design's own sizes (sources are exactly 2x), paired per row. */}
          <ul className='mt-[clamp(3rem,7vw,6rem)] grid gap-x-8 gap-y-[clamp(3rem,7vw,6rem)] sm:grid-cols-2'>
            {creative.pieces.map((piece, index) => (
              <Reveal
                as='li'
                key={piece.src}
                delay={(index % 2) * 0.08}
                className={index === creative.pieces.length - 1 ? 'sm:col-span-2' : undefined}
              >
                <figure className='mx-auto w-full' style={{ maxWidth: piece.width }}>
                  <div className='bg-parchment' style={{ aspectRatio: piece.aspect }}>
                    <img
                      src={piece.src}
                      alt={piece.alt}
                      width={piece.width * 2}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding='async'
                      className='size-full object-cover'
                    />
                  </div>
                  <figcaption className='mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
                    <span className='text-statement font-medium'>{piece.title}</span>
                    <span className='text-tag text-muted-foreground uppercase'>{piece.medium}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </main>
    </>
  );
}
