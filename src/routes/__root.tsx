import { Outlet, createRootRoute } from '@tanstack/react-router';

import { CanvasCursor } from '@/components/CanvasCursor';
import { Header } from '@/components/Header';
import { NotFound } from '@/components/NotFound';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <TooltipProvider>
      <CanvasCursor />
      <div className='relative flex min-h-dvh flex-col'>
        <Header />
        <Outlet />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
