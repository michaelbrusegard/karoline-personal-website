import { Link } from '@tanstack/react-router';

import { Container } from '@/components/editorial/Container';
import { Headline } from '@/components/editorial/Headline';
import { PillLink } from '@/components/editorial/PillLink';
import { SiteNav } from '@/components/layout/SiteNav';

function NotFound() {
  return (
    <>
      <SiteNav />
      <main className='flex flex-1 items-center'>
        <Container className='flex flex-col items-start gap-8 py-24'>
          <Headline as='h1' size='display'>
            Not found
          </Headline>
          <p className='text-body text-muted-foreground'>That page does not exist.</p>
          <PillLink render={<Link to='/' />}>Go home</PillLink>
        </Container>
      </main>
    </>
  );
}

export { NotFound };
