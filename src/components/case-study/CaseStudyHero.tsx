import { Container } from '@/components/editorial/Container';
import { Eyebrow } from '@/components/editorial/Eyebrow';
import { Headline } from '@/components/editorial/Headline';
import { Reveal } from '@/components/editorial/Reveal';
import { TagList } from '@/components/editorial/Tag';
import { TextReveal } from '@/components/editorial/TextReveal';

import type { Project } from '@/content/projects';

function CaseStudyHero({ project }: { project: Project }) {
  return (
    <>
      <Reveal
        when='mount'
        delay={0.1}
        className='w-full overflow-hidden'
        style={{ background: project.cover.background }}
      >
        <img
          src={project.hero.src}
          alt={project.cover.alt}
          width={project.hero.width}
          height={project.hero.height}
          fetchPriority='high'
          className='w-full'
        />
      </Reveal>

      <Container className='py-[clamp(3rem,6vw,5rem)]'>
        <Eyebrow>01 / Project overview</Eyebrow>
        <div className='mt-6 grid gap-10 border-t border-current/20 pt-8 md:grid-cols-2 md:gap-16'>
          <Reveal when='mount'>
            <Headline as='h1' size='headline' className='max-w-[12ch]'>
              <TextReveal when='mount' delay={0.2}>
                {project.title}
              </TextReveal>
            </Headline>
          </Reveal>
          <Reveal when='mount' delay={0.1} className='flex flex-col gap-8'>
            <p className='max-w-[52ch] text-body'>{project.summary}</p>
            <dl className='grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 text-tag uppercase'>
              {project.facts.map((fact) => (
                <div key={fact.label} className='contents'>
                  <dt className='text-muted-foreground'>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <TagList tags={project.tags} />
          </Reveal>
        </div>
      </Container>
    </>
  );
}

export { CaseStudyHero };
