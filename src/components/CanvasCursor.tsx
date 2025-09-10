'use client';

import { useCanvasCursor } from '@/hooks/useCanvasCursor';

function CanvasCursor() {
  useCanvasCursor();

  return <canvas className='pointer-events-none fixed inset-0' id='canvas' />;
}

export { CanvasCursor };
