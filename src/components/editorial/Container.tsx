import { cn } from 'cn';

type ContainerProps = React.ComponentProps<'div'>;

/** Page-width wrapper with the design's fluid gutter. */
function Container({ className, ...props }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-[1440px] px-gutter', className)} {...props} />;
}

export { Container };
