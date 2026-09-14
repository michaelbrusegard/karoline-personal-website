import { Link } from '@tanstack/react-router';

import { TagList } from '@/components/editorial/Tag';

import type { Project } from '@/content/projects';

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Link
      to='/work/$slug'
      params={{ slug: project.slug }}
      className='group block outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
    >
      <div
        className='relative aspect-[650/450] overflow-hidden rounded-[20px] shadow-[0_18px_36px_rgba(42,42,42,0.12)] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1'
        style={{ background: project.cover.background }}
      >
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          width={1300}
          height={900}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          className='size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]'
        />
      </div>
      <h3 className='mt-5 text-subtitle uppercase'>{project.cardTitle}</h3>
      <TagList tags={project.tags} className='mt-3' />
    </Link>
  );
}

export { ProjectCard };
