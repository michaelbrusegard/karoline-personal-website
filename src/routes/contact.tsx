import { createFileRoute } from '@tanstack/react-router';

import { ContactForm } from '@/components/ContactForm';
import { PageShell } from '@/components/PageShell';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell title='Contact'>
      <ContactForm />
    </PageShell>
  );
}
