import { useCanvasCursor } from '@/hooks/useCanvasCursor';

/**
 * Spring-trail cursor. Drawn in white with `mix-blend-mode: difference` so it reads as a dark
 * line on light surfaces and a light line on dark ones.
 */
function CanvasCursor() {
  const ref = useCanvasCursor();

  return (
    <canvas
      ref={ref}
      aria-hidden
      className='pointer-events-none fixed inset-0 z-50 mix-blend-difference'
    />
  );
}

export { CanvasCursor };
