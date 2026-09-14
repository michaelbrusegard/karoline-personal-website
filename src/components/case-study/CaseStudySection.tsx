import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Container } from '@/components/editorial/Container';
import { Eyebrow } from '@/components/editorial/Eyebrow';
import { Headline } from '@/components/editorial/Headline';
import { Reveal } from '@/components/editorial/Reveal';
import { TextReveal } from '@/components/editorial/TextReveal';

import type { CaseImage, Section } from '@/content/projects';

function SectionHeader({
  eyebrow,
  title,
  titleClassName,
}: {
  eyebrow: string;
  title: string;
  titleClassName?: string;
}) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className='mt-4 border-t border-current/20' />
      <Headline size='headline' className={cn('mt-8 max-w-[14ch]', titleClassName)}>
        <TextReveal>{title}</TextReveal>
      </Headline>
    </>
  );
}

function Figure({ image, className }: { image: CaseImage; className?: string }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading='lazy'
      className={cn('h-auto w-full', className)}
      // Never upscale far past the export's native resolution.
      style={{ maxWidth: `min(100%, ${String(Math.round(image.width * 1.25))}px)` }}
    />
  );
}

const galleryCols: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

function Prose({ paragraphs, className }: { paragraphs: readonly string[]; className?: string }) {
  return (
    <div className={cn('flex max-w-[52ch] flex-col gap-4 text-body', className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </div>
  );
}

function TwoColumn({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className='grid gap-10 md:grid-cols-2 md:gap-16'>
      <Reveal>{left}</Reveal>
      <Reveal delay={0.1} className='md:pt-14'>
        {right}
      </Reveal>
    </div>
  );
}

function CaseStudySection({ section }: { section: Section }) {
  switch (section.kind) {
    case 'text': {
      return (
        <Container className='py-[clamp(3rem,6vw,5rem)]'>
          <TwoColumn
            left={<SectionHeader eyebrow={section.eyebrow} title={section.title} />}
            right={
              <div className='flex flex-col gap-8'>
                {section.aside ? (
                  <p className='max-w-[36ch] border-l border-current/30 pl-5 text-statement'>
                    {section.aside}
                  </p>
                ) : null}
                <Prose paragraphs={section.body} />
              </div>
            }
          />
        </Container>
      );
    }
    case 'numbered': {
      return (
        <Container className='py-[clamp(3rem,6vw,5rem)]'>
          <Reveal>
            <SectionHeader eyebrow={section.eyebrow} title={section.title} />
            {section.intro ? <p className='mt-6 max-w-[52ch] text-body'>{section.intro}</p> : null}
          </Reveal>
          <ol className='mt-12 border-t border-current/20'>
            {section.items.map((item, index) => (
              <Reveal
                as='li'
                key={item.title}
                delay={index * 0.05}
                className='grid grid-cols-[3rem_1fr] gap-x-6 gap-y-2 border-b border-current/20 py-6 md:grid-cols-[6rem_1fr_1fr_6rem] md:items-start'
              >
                <span className='text-tag text-muted-foreground'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className='text-subtitle uppercase'>{item.title}</h3>
                <p className='col-start-2 max-w-[52ch] text-body md:col-start-3'>{item.body}</p>
                {item.tag ? (
                  <span className='col-start-2 text-tag text-muted-foreground uppercase md:col-start-4 md:text-right'>
                    {item.tag}
                  </span>
                ) : null}
              </Reveal>
            ))}
          </ol>
        </Container>
      );
    }
    case 'cards': {
      const header = (
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          // Icon blocks are the design's hand-drawn research asides; themes may restyle them.
          {...(section.icon ? { titleClassName: 'case-icon-title' } : {})}
        />
      );
      return (
        <Container className='py-[clamp(3rem,6vw,5rem)]'>
          <TwoColumn
            left={
              section.icon ? (
                <div className='flex gap-6'>
                  <img
                    src={section.icon.src}
                    alt=''
                    width={section.icon.width}
                    height={section.icon.height}
                    loading='lazy'
                    className='h-[clamp(4.5rem,8vw,7rem)] w-auto shrink-0'
                  />
                  <div className='min-w-0 flex-1'>{header}</div>
                </div>
              ) : (
                header
              )
            }
            right={section.intro ? <p className='max-w-[52ch] text-body'>{section.intro}</p> : null}
          />
          <ul
            className={cn(
              'mt-12 grid gap-4 sm:grid-cols-2',
              section.columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
            )}
          >
            {section.items.map((item, index) => (
              <Reveal
                as='li'
                key={item.title}
                delay={index * 0.05}
                className={cn(
                  'relative flex min-h-44 flex-col gap-3.5 rounded-[14px] p-7 md:min-h-64',
                  !item.background && !item.borderColor && 'border border-current/20 bg-white',
                  item.borderColor && 'border',
                  item.span === 2 && 'lg:col-span-2',
                  item.span === 3 && 'lg:col-span-3',
                )}
                style={{
                  ...(item.background ? { background: item.background } : {}),
                  ...(item.color ? { color: item.color } : {}),
                  ...(item.borderColor ? { borderColor: item.borderColor } : {}),
                }}
              >
                {item.swatch ? (
                  <span
                    aria-hidden
                    className='size-3 rounded-[4px]'
                    style={{ background: item.swatch }}
                  />
                ) : null}
                <h3 className='max-w-[16ch] text-[clamp(1.4rem,2.1vw,1.875rem)] leading-[1.07] font-light tracking-[-0.04em] break-words'>
                  {item.title}
                </h3>
                <p className='max-w-[44ch] text-sm leading-relaxed'>{item.body}</p>
                <span
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute right-6 bottom-3 text-[clamp(4rem,7vw,6.3rem)] leading-none font-light tracking-[-0.04em]',
                    item.dark ? 'text-[#fafafa]/60' : 'text-carbon/15',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </Reveal>
            ))}
          </ul>
        </Container>
      );
    }
    case 'features': {
      return (
        <Container className='py-[clamp(3rem,6vw,5rem)]'>
          <TwoColumn
            left={<SectionHeader eyebrow={section.eyebrow} title={section.title} />}
            right={section.intro ? <p className='max-w-[52ch] text-body'>{section.intro}</p> : null}
          />
          <ul className='mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
            {section.items.map((item, index) => (
              <Reveal as='li' key={item.title} delay={index * 0.05} className='flex flex-col'>
                <span className='text-tag text-muted-foreground'>
                  Concept {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className='mt-3 text-statement font-medium'>{item.title}</h3>
                <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>{item.body}</p>
                {item.image ? (
                  <Figure image={item.image} className='mx-auto mt-8 max-w-[15rem]' />
                ) : null}
              </Reveal>
            ))}
          </ul>
        </Container>
      );
    }
    case 'before-after': {
      return (
        <Container className='py-[clamp(3rem,6vw,5rem)]'>
          <Reveal>
            <SectionHeader eyebrow={section.eyebrow} title={section.title} />
          </Reveal>
          <div className='mt-12 grid gap-8 md:grid-cols-2'>
            {(
              [
                ['Before', section.before, section.beforeImages, section.beforeNote],
                ['After', section.after, section.afterImages, section.afterNote],
              ] as const
            ).map(([label, items, images, note], column) => (
              <Reveal key={label} delay={column * 0.1} className='border-t border-current/20 pt-4'>
                <h3 className='text-tag text-muted-foreground uppercase'>{label}</h3>
                <ul className='mt-4 flex flex-col gap-2'>
                  {items.map((item) => (
                    <li key={item} className='flex gap-3 text-body'>
                      <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        strokeWidth={2}
                        className='mt-1 size-4 shrink-0'
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {images ? (
                  <div className='mt-8 flex flex-wrap gap-4'>
                    {images.map((img) => (
                      <Figure key={img.src} image={img} className='w-[clamp(8rem,14vw,11rem)]' />
                    ))}
                  </div>
                ) : null}
                {note ? <p className='mt-3 text-caption text-muted-foreground'>{note}</p> : null}
              </Reveal>
            ))}
          </div>
        </Container>
      );
    }
    case 'gallery': {
      if (section.background) {
        return (
          <section style={{ background: section.background }}>
            <div className='flex flex-wrap items-center justify-center gap-[clamp(1.5rem,4vw,4rem)] px-gutter py-[clamp(3rem,7vw,6rem)]'>
              {section.images.map((img, index) => (
                <Reveal key={img.src} delay={index * 0.08} className='w-[clamp(9rem,20vw,19rem)]'>
                  <Figure image={img} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      }
      return (
        <Container className='py-[clamp(2rem,4vw,3rem)]'>
          <div
            className={cn(
              'grid items-center gap-[clamp(1rem,2.5vw,2rem)]',
              galleryCols[section.images.length],
            )}
          >
            {section.images.map((img, index) => (
              <Reveal key={img.src} delay={index * 0.08}>
                <Figure image={img} className='mx-auto' />
              </Reveal>
            ))}
          </div>
          {section.caption ? (
            <Reveal delay={0.15}>
              <p className='mt-4 text-caption text-muted-foreground'>{section.caption}</p>
            </Reveal>
          ) : null}
        </Container>
      );
    }
    case 'reflection': {
      return (
        <Container className='py-[clamp(3rem,6vw,5rem)]'>
          <Eyebrow>Reflection and learning</Eyebrow>
          <div className='mt-4 grid overflow-hidden rounded-[20px] border border-current/20 md:grid-cols-2'>
            <Reveal className='p-8 md:p-10'>
              <h3 className='text-statement font-medium uppercase'>Reflection.</h3>
              <p className='mt-6 text-body'>{section.reflection}</p>
            </Reveal>
            <Reveal delay={0.1} className='surface-dark p-8 md:p-10'>
              <h3 className='text-statement font-medium uppercase'>Learning.</h3>
              <p className='mt-6 text-body'>{section.learning}</p>
            </Reveal>
          </div>
        </Container>
      );
    }
    case 'quote': {
      return (
        <Container className='py-[clamp(2rem,4vw,3rem)]'>
          <Reveal as='figure' className='mx-auto max-w-[40ch] text-center'>
            <blockquote className='text-statement text-balance'>“{section.quote}”</blockquote>
            {section.attribution ? (
              <figcaption className='mt-4 text-tag text-muted-foreground uppercase'>
                — {section.attribution}
              </figcaption>
            ) : null}
          </Reveal>
        </Container>
      );
    }
  }
}

export { CaseStudySection };
