import { useEffect, useRef } from 'react';

type ImageTrailOptions = {
  /** Image sources cycled through as the pointer moves. */
  sources: readonly string[];
  /** Minimum pointer travel (px) between spawns. */
  threshold?: number;
  /** How long a spawned image stays visible (ms). */
  lifetime?: number;
};

/**
 * Spawns a short-lived image at the pointer each time it travels `threshold` px inside the
 * container. The container must be `position: relative` and clip overflow.
 * Disabled on touch devices and under reduced motion.
 */
function useImageTrail<T extends HTMLElement>({
  sources,
  threshold = 90,
  lifetime = 900,
}: ImageTrailOptions) {
  const ref = useRef<T>(null);
  const sourceKey = sources.join('|');

  useEffect(() => {
    const host = ref.current;
    if (!host) {
      return;
    }
    const capable = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    if (!capable.matches) {
      return;
    }

    const layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.className = 'pointer-events-none absolute inset-0 overflow-hidden';
    host.append(layer);

    const trailSources = sourceKey.split('|');

    // Images download on first pointer movement, never competing with the page load.
    let pool: HTMLImageElement[] | null = null;
    const ensurePool = () => {
      pool ??= trailSources.map((src) => {
        const image = new Image();
        image.src = src;
        image.alt = '';
        image.decoding = 'async';
        image.draggable = false;
        image.className =
          'absolute w-[clamp(120px,15vw,220px)] -translate-x-1/2 -translate-y-1/2 rounded-md object-contain opacity-0 shadow-lg';
        layer.append(image);
        return image;
      });
      return pool;
    };

    let index = 0;
    let lastX = Number.NaN;
    let lastY = Number.NaN;
    const active = new Map<HTMLImageElement, Animation>();

    const spawn = (x: number, y: number) => {
      const images = ensurePool();
      const image = images[index % images.length];
      if (!image) {
        return;
      }
      index += 1;
      active.get(image)?.cancel();
      image.style.left = `${x}px`;
      image.style.top = `${y}px`;
      const animation = image.animate(
        [
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.6) rotate(-4deg)' },
          { opacity: 1, transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', offset: 0.15 },
          { opacity: 1, transform: 'translate(-50%, -55%) scale(1) rotate(0deg)', offset: 0.7 },
          { opacity: 0, transform: 'translate(-50%, -70%) scale(0.9) rotate(3deg)' },
        ],
        { duration: lifetime, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
      );
      active.set(image, animation);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }
      ensurePool();
      const bounds = host.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (Number.isNaN(lastX) || Math.hypot(x - lastX, y - lastY) >= threshold) {
        lastX = x;
        lastY = y;
        spawn(x, y);
      }
    };

    const onPointerLeave = () => {
      lastX = Number.NaN;
      lastY = Number.NaN;
    };

    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave);

    return () => {
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      for (const animation of active.values()) {
        animation.cancel();
      }
      layer.remove();
    };
  }, [sourceKey, threshold, lifetime]);

  return ref;
}

export { useImageTrail };
