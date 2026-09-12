type PageShellProps = {
  title: string;
  children: React.ReactNode;
};

function PageShell({ title, children }: PageShellProps) {
  return (
    <main className='mx-auto flex w-full max-w-(--breakpoint-2xl) flex-1 flex-col gap-8 px-[clamp(1rem,4vw,6rem)] pt-28 pb-16'>
      <h1 className='text-[clamp(3rem,8vw,6rem)] leading-none font-medium uppercase'>{title}</h1>
      {children}
    </main>
  );
}

export { PageShell };
