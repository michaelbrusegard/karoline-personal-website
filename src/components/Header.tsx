import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className='hover:bg-muted/20 focus:bg-muted/40 block rounded-md p-3 transition-colors'
        >
          <div className='mb-1 text-sm leading-none font-medium'>{title}</div>
          <p className='text-muted-foreground text-xs leading-snug'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

function Header() {
  return (
    <header className='clamp-[px-4-24-clamp] fixed flex w-full max-w-screen-2xl justify-end py-4'>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>PROJECTS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-1'>
                <ListItem href='/projects/webapp' title='Web App'>
                  A modern web application built with React, TypeScript, and
                  Tailwind CSS.
                </ListItem>
                <ListItem href='/projects/portfolio' title='Portfolio Site'>
                  A personal portfolio to showcase design, development, and
                  creative work.
                </ListItem>
                <ListItem href='/projects/opensource' title='Open Source'>
                  Contributions and personal open source projects.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>ABOUT</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[340px] gap-2'>
                <ListItem href='/about' title='Who am I?'>
                  Learn about my background, skills, and philosophy.
                </ListItem>
                <ListItem href='/about/resume' title='Resume'>
                  Professional experience, education, and skills overview.
                </ListItem>
                <ListItem href='/about/interests' title='Interests'>
                  Design, coding, art, and creative interests.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>CONTACT</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[260px] gap-2'>
                <ListItem href='mailto:karoline@email.tld' title='Email'>
                  Get in touch by email for collaboration, freelance, or
                  questions.
                </ListItem>
                <ListItem href='/contact' title='Contact Form'>
                  Fill out the form for a quick response.
                </ListItem>
                <ListItem
                  href='https://linkedin.com/in/karoline'
                  title='LinkedIn'
                >
                  Connect on LinkedIn for professional networking.
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
