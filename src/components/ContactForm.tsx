import { SentIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  message: z.string().trim().min(10, 'Please write at least 10 characters.'),
});

type ContactValues = z.infer<typeof contactSchema>;

const defaultValues: ContactValues = {
  name: '',
  email: '',
  message: '',
};

function ContactForm() {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: ({ value, formApi }) => {
      const subject = encodeURIComponent(`Message from ${value.name}`),
        body = encodeURIComponent(`${value.message}\n\n— ${value.name} <${value.email}>`);
      window.location.href = `mailto:karoline@email.tld?subject=${subject}&body=${body}`;
      toast.success('Opening your email client…');
      formApi.reset();
    },
  });

  return (
    <form
      className='w-full max-w-xl'
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name='name'>
          {(field) => {
            const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={invalid || undefined}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  autoComplete='name'
                  aria-invalid={invalid}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                  }}
                />
                {invalid ? <FieldError errors={field.state.meta.errors} /> : null}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name='email'>
          {(field) => {
            const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={invalid || undefined}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type='email'
                  autoComplete='email'
                  aria-invalid={invalid}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                  }}
                />
                {invalid ? <FieldError errors={field.state.meta.errors} /> : null}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name='message'>
          {(field) => {
            const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={invalid || undefined}>
                <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={6}
                  aria-invalid={invalid}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                  }}
                />
                {invalid ? <FieldError errors={field.state.meta.errors} /> : null}
              </Field>
            );
          }}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <div>
              <Button type='submit' size='lg' disabled={isSubmitting}>
                Send
                <HugeiconsIcon icon={SentIcon} strokeWidth={2} data-icon='inline-end' />
              </Button>
            </div>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}

export { ContactForm };
