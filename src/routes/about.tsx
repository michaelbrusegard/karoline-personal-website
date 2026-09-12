import { createFileRoute } from '@tanstack/react-router';

import { PageShell } from '@/components/PageShell';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell title='About'>
      <p className='max-w-prose text-lg text-muted-foreground'>
        Replace this with a short introduction: background, what you work on, and what you care
        about.
      </p>
    </PageShell>
  );
}
