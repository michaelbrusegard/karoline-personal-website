import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

function AboutSeparator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContentWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const repeatCount = 12;
  const aboutItems = Array.from({ length: repeatCount });

  return (
    <div className='bg-background clamp-[h-24-32-clamp] relative flex w-full items-center overflow-hidden border-y'>
      <motion.div
        className='flex shrink-0'
        animate={contentWidth ? { x: [0, -(contentWidth + 64)] } : {}}
        transition={
          contentWidth
            ? {
                duration: 25,
                ease: 'linear',
                repeat: Infinity,
              }
            : undefined
        }
      >
        <div
          ref={containerRef}
          className='mr-16 flex min-w-max shrink-0 gap-16'
        >
          {aboutItems.map((_, idx) => (
            <div
              key={idx}
              className='flex shrink-0 items-center justify-center gap-4 px-8'
            >
              <div className='bg-primary clamp-[size-8-12-clamp] rounded-full' />
              <span className='clamp-[text-lg-xl-clamp] font-semibold'>
                ABOUT
              </span>
            </div>
          ))}
        </div>

        <div className='mr-16 flex min-w-max shrink-0 gap-16'>
          {aboutItems.map((_, idx) => (
            <div
              key={`dup-${idx}`}
              className='flex shrink-0 items-center justify-center gap-4 px-8'
            >
              <div className='bg-primary clamp-[size-8-12-clamp] rounded-full' />
              <span className='clamp-[text-lg-xl-clamp] font-semibold'>
                ABOUT
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export { AboutSeparator };
