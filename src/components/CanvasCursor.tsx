import { useCanvasCursor } from '@/hooks/useCanvasCursor';

function CanvasCursor() {
  const ref = useCanvasCursor();

  return <canvas ref={ref} aria-hidden className='pointer-events-none fixed inset-0 z-50' />;
}

export { CanvasCursor };
