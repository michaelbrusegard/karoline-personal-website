import { Link } from '@tanstack/react-router';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { projects } from '@/lib/projects';

type ListItemProps = {
  title: string;
  children: React.ReactNode;
  render: React.ReactElement;
};

function ListItem({ title, children, render }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink className='block rounded-md p-3' render={render}>
        <div className='mb-1 text-sm leading-none font-medium'>{title}</div>
        <p className='text-xs leading-snug text-muted-foreground'>{children}</p>
      </NavigationMenuLink>
    </li>
  );
}

const triggerClassName = 'font-heading text-base uppercase';

function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-40 flex justify-end px-[clamp(1rem,4vw,6rem)] py-4'>
      <NavigationMenu align='end'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink render={<Link to='/' />} className={triggerClassName}>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={triggerClassName}>Projects</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[min(90vw,28rem)] gap-1'>
                <ListItem title='All projects' render={<Link to='/projects' />}>
                  Everything in one place.
                </ListItem>
                {projects.map((project) => (
                  <ListItem
                    key={project.slug}
                    title={project.title}
                    render={<Link to='/projects/$slug' params={{ slug: project.slug }} />}
                  >
                    {project.summary}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink render={<Link to='/about' />} className={triggerClassName}>
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={triggerClassName}>Contact</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[min(90vw,18rem)] gap-1'>
                <ListItem title='Email' render={<a href='mailto:karoline@email.tld' />}>
                  Get in touch for collaboration, freelance, or questions.
                </ListItem>
                <ListItem title='Contact form' render={<Link to='/contact' />}>
                  Fill out the form for a quick response.
                </ListItem>
                <ListItem
                  title='LinkedIn'
                  render={
                    <a href='https://linkedin.com/in/karoline' target='_blank' rel='noreferrer' />
                  }
                >
                  Connect for professional networking.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

export { Header };
