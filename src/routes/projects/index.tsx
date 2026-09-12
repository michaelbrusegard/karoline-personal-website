import { Link, createFileRoute } from '@tanstack/react-router';

import { PageShell } from '@/components/PageShell';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projects } from '@/lib/projects';

export const Route = createFileRoute('/projects/')({
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell title='Projects'>
      <ul className='grid gap-4 sm:grid-cols-2'>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to='/projects/$slug' params={{ slug: project.slug }} className='block h-full'>
              <Card className='h-full transition-transform hover:-translate-y-1'>
                <CardHeader>
                  <CardTitle className='font-heading text-2xl'>{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
