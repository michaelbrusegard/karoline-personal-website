import { cn } from 'cn';

type TagProps = React.ComponentProps<'span'>;

/** Outlined uppercase chip used under project titles. */
function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-current/55 px-3 py-1.5 text-tag uppercase',
        className,
      )}
      {...props}
    />
  );
}

function TagList({ tags, className }: { tags: readonly string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}

export { Tag, TagList };
