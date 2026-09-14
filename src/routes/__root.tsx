import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';

import { CanvasCursor } from '@/components/CanvasCursor';
import { NotFound } from '@/components/layout/NotFound';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const Route = createRootRoute({
  head: () => ({ meta: [{ title: 'Karoline Z.L.H · UX/UI designer' }] }),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <>
      <HeadContent />
      <CanvasCursor />
      <div className='flex min-h-svh flex-col'>
        <Outlet />
        <SiteFooter />
      </div>
    </>
  );
}
