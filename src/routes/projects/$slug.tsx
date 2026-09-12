import { ArrowLeft02Icon, LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, createFileRoute, notFound } from '@tanstack/react-router';

import { PageShell } from '@/components/PageShell';
import { Button } from '@/components/ui/button';
import { getProject } from '@/lib/projects';

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) {
      // eslint-disable-next-line typescript/only-throw-error -- TanStack Router's notFound() is designed to be thrown
      throw notFound();
    }
    return { project };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();

  return (
    <PageShell title={project.title}>
      <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
        <span>{project.year}</span>
        <span aria-hidden>·</span>
        {project.tags.map((tag) => (
          <span key={tag} className='rounded-full bg-muted px-2 py-0.5'>
            {tag}
          </span>
        ))}
      </div>
      <p className='max-w-prose text-lg'>{project.description}</p>
      <div className='flex gap-2'>
        <Button variant='outline' render={<Link to='/projects' />}>
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} data-icon='inline-start' />
          All projects
        </Button>
        {project.link ? (
          <Button render={<a href={project.link} target='_blank' rel='noreferrer' />}>
            Visit
            <HugeiconsIcon icon={LinkSquare02Icon} strokeWidth={2} data-icon='inline-end' />
          </Button>
        ) : null}
      </div>
    </PageShell>
  );
}
