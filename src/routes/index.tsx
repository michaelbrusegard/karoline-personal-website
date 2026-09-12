import { createFileRoute } from '@tanstack/react-router';

import { AboutSeparator } from '@/components/AboutSeparator';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className='flex flex-1 flex-col'>
      <section className='mx-auto flex min-h-dvh w-full max-w-(--breakpoint-2xl) items-center justify-center px-[clamp(1rem,4vw,6rem)] py-6'>
        <h1 className='text-center text-[clamp(4.5rem,12vw,8rem)] leading-none font-medium'>
          KAROLINE ZHIWEN LIE HOLM
        </h1>
      </section>
      <AboutSeparator />
    </main>
  );
}
