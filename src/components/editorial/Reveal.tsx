import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

type RevealTag = 'div' | 'li' | 'section' | 'article' | 'figure';

type RevealProps<T extends RevealTag> = Omit<HTMLMotionProps<T>, 'ref'> & {
  as?: T;
  /** Delay in seconds. */
  delay?: number;
  /** Trigger once when scrolled into view (default) or immediately on mount. */
  when?: 'in-view' | 'mount';
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Short opacity/vertical fade used for editorial reveals.
 * Renders content statically when the user prefers reduced motion.
 */
function Reveal<T extends RevealTag = 'div'>({
  as,
  delay = 0,
  when = 'in-view',
  ...props
}: RevealProps<T>) {
  const reduced = useReducedMotion();
  const Tag = motion[as ?? 'div'] as typeof motion.div;
  const motionProps = props as HTMLMotionProps<'div'>;

  if (reduced) {
    return <Tag {...motionProps} />;
  }

  const hidden = { opacity: 0, y: 24 };
  const visible = { opacity: 1, y: 0 };
  const transition = { duration: 0.7, delay, ease };

  return when === 'mount' ? (
    <Tag initial={hidden} animate={visible} transition={transition} {...motionProps} />
  ) : (
    <Tag
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={transition}
      {...motionProps}
    />
  );
}

export { Reveal };
