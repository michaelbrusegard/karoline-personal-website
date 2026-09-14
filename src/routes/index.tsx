import { createFileRoute } from '@tanstack/react-router';

import { CreativePrompt } from '@/components/home/CreativePrompt';
import { Hero } from '@/components/home/Hero';
import { Manifesto } from '@/components/home/Manifesto';
import { WorkGrid } from '@/components/home/WorkGrid';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <WorkGrid />
      <CreativePrompt />
    </main>
  );
}
