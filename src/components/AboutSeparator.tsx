import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';

const REPEAT_COUNT = 12;

function MarqueeItems({ ref }: { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className='flex min-w-max shrink-0 gap-16 pr-16'>
      {Array.from({ length: REPEAT_COUNT }, (_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- static, identical items
        <span key={index} className='flex shrink-0 items-center justify-center gap-4 px-8'>
          <span className='size-[clamp(2rem,3vw,3rem)] rounded-full bg-primary' />
          <span className='text-[clamp(1.125rem,1.5vw,1.25rem)] font-semibold'>ABOUT</span>
        </span>
      ))}
    </div>
  );
}

function AboutSeparator() {
  const containerRef = useRef<HTMLDivElement>(null),
    [contentWidth, setContentWidth] = useState(0),
    reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setContentWidth(entry.borderBoxSize[0]?.inlineSize ?? entry.contentRect.width);
      }
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  const animate = contentWidth > 0 && !reducedMotion;

  return (
    <Link
      to='/about'
      aria-label='About'
      className='relative flex h-[clamp(6rem,10vw,8rem)] w-full items-center overflow-hidden border-y bg-background'
    >
      <motion.div
        className='flex shrink-0'
        animate={animate ? { x: [0, -contentWidth] } : { x: 0 }}
        transition={animate ? { duration: 25, ease: 'linear', repeat: Infinity } : { duration: 0 }}
      >
        <MarqueeItems ref={containerRef} />
        <MarqueeItems />
      </motion.div>
    </Link>
  );
}

export { AboutSeparator };
