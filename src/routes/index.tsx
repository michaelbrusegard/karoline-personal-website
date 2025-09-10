import { AboutSeparator } from '@/components/AboutSeparator';

export default function Page() {
  return (
    <>
      <main className='h-full w-full'>
        <section className='clamp-[px-4-24-clamp] mx-auto flex h-full w-full max-w-screen-2xl items-center justify-center py-6'>
          <h1 className='clamp-[text-7xl-9xl-clamp] font-medium'>
            KAROLINE ZHIWEN LIE HOLM
          </h1>
        </section>
        <AboutSeparator />
      </main>
    </>
  );
}
