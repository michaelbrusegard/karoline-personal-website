import { Container } from '@/components/editorial/Container';
import { TextReveal } from '@/components/editorial/TextReveal';

/** "Design as infrastructure" statement block. */
function Manifesto() {
  return (
    <section className='bg-linen'>
      <Container className='py-[clamp(4rem,10vw,8rem)]'>
        <h2 className='max-w-[14ch] text-subtitle uppercase'>
          <TextReveal>Design as infrastructure</TextReveal>
        </h2>
        <blockquote className='mt-10 max-w-[30ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-balance'>
          <TextReveal delay={0.2}>
            {[
              {
                text: '“There’s cooking, and there’s being a cook. There’s designing, and there’s',
              },
              { text: 'being a designer.', emphasis: true },
              { text: 'One does the task. The other' },
              { text: 'knows what’s missing', emphasis: true },
              { text: 'to make it great.”' },
            ]}
          </TextReveal>
        </blockquote>
      </Container>
    </section>
  );
}

export { Manifesto };
