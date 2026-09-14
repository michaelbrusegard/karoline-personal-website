import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/work/')({
  beforeLoad: () => {
    // eslint-disable-next-line typescript/only-throw-error -- TanStack Router's redirect() is designed to be thrown
    throw redirect({ to: '/', hash: 'work' });
  },
});
