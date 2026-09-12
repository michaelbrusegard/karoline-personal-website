import '@/styles/app.css';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from '@/routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  // eslint-disable-next-line typescript/consistent-type-definitions -- module augmentation requires an interface
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.querySelector('#app');

if (rootElement instanceof HTMLElement && rootElement.innerHTML === '') {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
