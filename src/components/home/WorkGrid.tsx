import { Container } from '@/components/editorial/Container';
import { Headline } from '@/components/editorial/Headline';
import { Reveal } from '@/components/editorial/Reveal';
import { TextReveal } from '@/components/editorial/TextReveal';
import { ProjectCard } from '@/components/home/ProjectCard';
import { projects } from '@/content/projects';

function WorkGrid() {
  const years = projects.map((project) => project.year);
  const range = `${Math.min(...years)}–${Math.max(...years)}`;

  return (
    <section id='work' className='scroll-mt-8 bg-white'>
      <Container className='py-[clamp(3rem,8vw,6rem)]'>
        <Reveal>
          <p className='text-body'>{range}</p>
          <Headline size='display' className='-ml-[0.04em]'>
            <TextReveal>Work</TextReveal>
          </Headline>
        </Reveal>
        <ul className='mt-[clamp(3rem,6vw,5rem)] grid gap-x-8 gap-y-[clamp(3rem,7vw,6.5rem)] md:grid-cols-2'>
          {projects.map((project, index) => (
            <Reveal as='li' key={project.slug} delay={(index % 2) * 0.1}>
              <ProjectCard project={project} priority={index < 2} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export { WorkGrid };
