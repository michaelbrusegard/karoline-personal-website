import { cn } from 'cn';
import { motion, stagger, useReducedMotion, type Variants } from 'motion/react';

type Segment = { text: string; emphasis?: boolean };

type TextRevealProps = {
  /** Plain text, or segments when parts of the text need emphasis. */
  children: string | Segment[];
  /** Delay in seconds before the first word starts. */
  delay?: number;
  /** Trigger once when scrolled into view (default) or immediately on mount. */
  when?: 'in-view' | 'mount';
};

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { delayChildren: stagger(0.06, { startDelay: delay }) },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function toWords(children: string | Segment[]): Segment[] {
  const segments = typeof children === 'string' ? [{ text: children }] : children;
  return segments.flatMap(({ text, emphasis }) =>
    text
      .split(' ')
      .filter(Boolean)
      .map((part): Segment => (emphasis ? { text: part, emphasis } : { text: part })),
  );
}

/**
 * Staggered word-by-word reveal: each word fades in from a blur.
 * The full text stays available to screen readers; words animate `aria-hidden`.
 */
function TextReveal({ children, delay = 0, when = 'in-view' }: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = toWords(children);
  const plain = words.map((item) => item.text).join(' ');

  if (reduced) {
    return typeof children === 'string' ? (
      children
    ) : (
      <>
        {words.map((item, index) => (
          <span
            key={`${item.text}-${String(index)}`}
            className={cn(item.emphasis && 'font-semibold')}
          >
            {item.text}{' '}
          </span>
        ))}
      </>
    );
  }

  const trigger =
    when === 'mount'
      ? { animate: 'visible' as const }
      : { whileInView: 'visible' as const, viewport: { once: true, amount: 0.4 } };

  return (
    <motion.span custom={delay} initial='hidden' variants={container} {...trigger}>
      <span className='sr-only'>{plain}</span>
      {words.map((item, index) => (
        <span
          key={`${item.text}-${String(index)}`}
          aria-hidden
          className='inline-block whitespace-pre'
        >
          <motion.span
            variants={word}
            className={cn('inline-block', item.emphasis && 'font-semibold')}
          >
            {item.text}
          </motion.span>{' '}
        </span>
      ))}
    </motion.span>
  );
}

export { TextReveal };
