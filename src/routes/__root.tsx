import Page from '@/routes';

import { CanvasCursor } from '@/components/CanvasCursor';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/Toaster';

export default function Root() {
  return (
    <>
      <CanvasCursor />
      <ScrollArea className='h-full w-full'>
        <div className='h-screen w-screen'>
          <Header/>
          <Page />
          <Toaster />
        </div>
      </ScrollArea>
    </>
  );
}
