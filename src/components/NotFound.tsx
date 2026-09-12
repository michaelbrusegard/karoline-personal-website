import { Link } from '@tanstack/react-router';

import { PageShell } from '@/components/PageShell';
import { Button } from '@/components/ui/button';

function NotFound() {
  return (
    <PageShell title='Not found'>
      <p className='text-lg text-muted-foreground'>That page does not exist.</p>
      <div>
        <Button render={<Link to='/' />}>Go home</Button>
      </div>
    </PageShell>
  );
}

export { NotFound };
