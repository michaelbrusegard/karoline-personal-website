import { Link, createFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/editorial/Container';
import { Headline } from '@/components/editorial/Headline';
import { PillLink } from '@/components/editorial/PillLink';
import { Reveal } from '@/components/editorial/Reveal';
import { TextReveal } from '@/components/editorial/TextReveal';
import { SiteNav } from '@/components/layout/SiteNav';
import { about } from '@/content/about';

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: 'About me · Karoline Z.L.H' }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Portrait />
        <WhyIDesign />
        <Process />
        <Hobbies />
        <CreativeCornerPrompt />
      </main>
    </>
  );
}

function Portrait() {
  const [noteLeft, noteTopRight, noteBottomRight] = about.notes;

  return (
    <section className='bg-parchment'>
      <Container className='py-[clamp(2rem,5vw,4rem)]'>
        <div className='grid gap-8 md:grid-cols-2 md:items-end'>
          <Reveal when='mount'>
            <Headline as='h1' size='display' className='-ml-[0.04em]'>
              <TextReveal when='mount'>About me</TextReveal>
            </Headline>
          </Reveal>
          <Reveal when='mount' delay={0.1}>
            <p className='max-w-[40ch] text-statement'>{about.intro}</p>
          </Reveal>
        </div>

        {/*
          Side annotations live in grid columns beside the polaroid rather than at
          negative offsets, so they can never overflow the viewport. Each arrow is
          pinned to the column edge the photo sits on, which is what makes it read
          as pointing at her. Below lg there is no room for margins, so the notes
          drop under the photo instead.
        */}
        <Reveal
          when='mount'
          delay={0.2}
          className='mx-auto mt-12 grid max-w-6xl grid-cols-1 lg:grid-cols-[1fr_minmax(0,30rem)_1fr]'
        >
          <div className='relative hidden lg:block'>
            <Note className='top-[20%] right-[10%] -rotate-12'>{noteLeft}</Note>
            <Arrow
              src='arrow-left'
              w={315}
              h={268}
              className='top-[31%] -right-[4%] w-[min(76%,12rem)]'
            />
          </div>

          <img
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={604}
            height={819}
            fetchPriority='high'
            className='w-full'
          />

          <div className='relative hidden lg:block'>
            <Note className='top-[14%] left-[14%] rotate-6'>{noteTopRight}</Note>
            <Arrow
              src='arrow-right'
              w={194}
              h={172}
              className='top-[52%] -left-[5%] w-[min(52%,8rem)] -scale-x-100'
            />
            <Note className='top-[73%] left-[18%] rotate-3'>{noteBottomRight}</Note>
          </div>
        </Reveal>

        <ul className='mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:hidden'>
          {about.notes.map((note, index) => (
            <li
              key={note}
              className='max-w-[18ch] text-center text-[0.8rem] leading-tight tracking-wide'
              style={{ rotate: `${[-3, 2, -2][index] ?? 0}deg` }}
            >
              {note}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

type NoteProps = {
  className?: string;
  children: React.ReactNode;
};

/** Hand-written aside pinned beside the portrait. */
function Note({ className, children }: NoteProps) {
  return (
    <span
      className={`pointer-events-none absolute max-w-[14ch] text-[0.8rem] leading-tight tracking-wide ${className ?? ''}`}
    >
      {children}
    </span>
  );
}

/** Hand-drawn arrow linking a note to the photo. */
function Arrow({
  src,
  w,
  h,
  className,
}: {
  src: string;
  w: number;
  h: number;
  className?: string;
}) {
  return (
    <img
      src={`/images/about/${src}.webp`}
      alt=''
      width={w}
      height={h}
      className={`pointer-events-none absolute ${className ?? ''}`}
    />
  );
}

function WhyIDesign() {
  return (
    <section className='bg-linen'>
      <Container className='grid gap-8 py-[clamp(3rem,7vw,6rem)] md:grid-cols-2 md:gap-16'>
        <Reveal>
          <Headline size='headline'>
            <TextReveal>Why I design</TextReveal>
          </Headline>
        </Reveal>
        <Reveal delay={0.1}>
          <p className='max-w-[52ch] text-body'>{about.whyIDesign}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Process() {
  return (
    <section className='bg-linen'>
      <Container className='py-[clamp(3rem,7vw,6rem)]'>
        <div className='grid gap-8 md:grid-cols-2 md:gap-16'>
          <Reveal>
            <Headline size='headline'>
              <TextReveal>My process</TextReveal>
            </Headline>
          </Reveal>
          <Reveal delay={0.1}>
            <p className='max-w-[36ch] text-statement'>{about.process.intro}</p>
          </Reveal>
        </div>
        <ol className='mt-[clamp(3rem,8vw,7rem)] border-t border-current/30'>
          {about.process.steps.map((step, index) => (
            <Reveal
              as='li'
              key={step.title}
              delay={index * 0.04}
              className='grid grid-cols-[3rem_1fr] gap-x-6 gap-y-2 border-b border-current/30 py-5 md:grid-cols-[18.5%_42%_1fr] md:items-start'
            >
              <span className='text-tag text-muted-foreground'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='text-subtitle uppercase'>{step.title}</h3>
              <p className='col-start-2 max-w-[28ch] text-sm leading-snug text-muted-foreground md:col-start-3'>
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Hobbies() {
  const [budapest, bilbao, aardal, brunch] = about.hobbies.photos;

  return (
    <section className='bg-linen'>
      <Container className='py-[clamp(3rem,7vw,6rem)]'>
        <div className='grid gap-8 border-t border-current/30 pt-8 md:grid-cols-2 md:gap-16'>
          <Reveal>
            <Headline size='headline'>
              <TextReveal>Hobbies</TextReveal>
            </Headline>
          </Reveal>
          <Reveal delay={0.1}>
            <p className='max-w-[52ch] text-body'>{about.hobbies.intro}</p>
          </Reveal>
        </div>
        <div className='mt-[clamp(3rem,8vw,7rem)] grid gap-4 md:grid-cols-[1.86fr_1fr_1fr] md:grid-rows-[auto_auto]'>
          <Photo photo={budapest} className='max-md:aspect-square md:row-span-2 md:h-full' />
          <Photo photo={bilbao} className='aspect-[2.85/1] md:col-span-2' />
          <Photo photo={aardal} className='aspect-square' />
          <Photo photo={brunch} className='aspect-square' />
        </div>
      </Container>
    </section>
  );
}

function Photo({
  photo,
  className,
}: {
  photo: (typeof about.hobbies.photos)[number];
  className?: string;
}) {
  return (
    <Reveal as='figure' className={`group relative overflow-hidden ${className ?? ''}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading='lazy'
        decoding='async'
        className='size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]'
      />
      <figcaption className='absolute bottom-3 left-3 rounded-full bg-linen/90 px-3 py-1 text-tag uppercase backdrop-blur'>
        {photo.caption}
      </figcaption>
    </Reveal>
  );
}

function CreativeCornerPrompt() {
  return (
    <section className='bg-linen'>
      <Container className='flex flex-col gap-8 py-[clamp(3rem,7vw,6rem)] md:flex-row md:items-center md:justify-between'>
        <Reveal>
          <Headline size='headline'>
            <TextReveal>Creative corner</TextReveal>
          </Headline>
        </Reveal>
        <Reveal delay={0.1}>
          <PillLink size='lg' render={<Link to='/creative-corner' />}>
            Check out
          </PillLink>
        </Reveal>
      </Container>
    </section>
  );
}
