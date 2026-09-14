import { cn } from 'cn';

type EyebrowProps = React.ComponentProps<'p'>;

/** Small uppercase label that sits above a headline, e.g. "02 / Context". */
function Eyebrow({ className, ...props }: EyebrowProps) {
  return <p className={cn('text-caption text-muted-foreground uppercase', className)} {...props} />;
}

export { Eyebrow };
