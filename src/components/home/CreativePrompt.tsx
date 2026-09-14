import { Link } from '@tanstack/react-router';

import { Container } from '@/components/editorial/Container';
import { Headline } from '@/components/editorial/Headline';
import { PillLink } from '@/components/editorial/PillLink';
import { Reveal } from '@/components/editorial/Reveal';
import { TextReveal } from '@/components/editorial/TextReveal';
import { creative } from '@/content/creative';

/** Teaser for the creative corner between the work grid and the footer. */
function CreativePrompt() {
  return (
    <section className='bg-ash'>
      <Container className='grid gap-10 py-[clamp(4rem,10vw,8rem)] md:grid-cols-2 md:items-end'>
        <Reveal>
          <Headline size='headline'>
            <TextReveal>Creative corner</TextReveal>
          </Headline>
        </Reveal>
        <Reveal delay={0.1} className='flex flex-col items-start gap-8'>
          <p className='max-w-[36ch] text-body'>{creative.intro}</p>
          <PillLink render={<Link to='/creative-corner' />}>Check out</PillLink>
        </Reveal>
      </Container>
    </section>
  );
}

export { CreativePrompt };
