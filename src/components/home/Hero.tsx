import { motion, useReducedMotion } from 'motion/react';

import { TextReveal } from '@/components/editorial/TextReveal';
import { SiteNav } from '@/components/layout/SiteNav';
import { site } from '@/content/site';
import { useImageTrail } from '@/hooks/useImageTrail';

const trailImages = [
  '/images/projects/trail-youwell.webp',
  '/images/projects/trail-manafish.webp',
  '/images/projects/trail-sit.webp',
  '/images/projects/trail-pastael.webp',
  '/images/projects/trail-hospital.webp',
  '/images/projects/trail-tempo.webp',
  '/images/projects/trail-manafish-module.webp',
];

const lines = ['Hello, I’m', 'Karoline', 'Zhiwen', 'Lie Holm'];

/** Full-viewport dark hero. Project images trail the pointer behind the display copy. */
function Hero() {
  const trailRef = useImageTrail<HTMLElement>({ sources: trailImages });
  const reduced = useReducedMotion();

  return (
    <section
      ref={trailRef}
      className='relative isolate flex min-h-svh flex-col overflow-hidden surface-dark'
      aria-label='Introduction'
    >
      <SiteNav variant='overlay' />

      <div className='relative z-10 flex flex-1 items-center justify-center px-gutter py-32'>
        <h1 className='text-center text-display uppercase'>
          {lines.map((line, index) => (
            <span
              key={line}
              className='block'
              style={{ translate: reduced ? undefined : `${index * 3}% 0` }}
            >
              <TextReveal when='mount' delay={0.1 + index * 0.15}>
                {line}
              </TextReveal>
            </span>
          ))}
          <motion.span
            className='mt-6 block text-caption font-semibold tracking-[0.15em] text-bone/80 md:[translate:20%_0] md:text-right'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : 0.6 }}
          >
            {site.tagline}
          </motion.span>
        </h1>
      </div>

      <div className='relative z-10 flex items-center justify-between px-gutter pb-6 text-caption text-bone/80 uppercase'>
        <span>{site.shortName}</span>
        <span>©{site.year}</span>
      </div>
    </section>
  );
}

export { Hero };
