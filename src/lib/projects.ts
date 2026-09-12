type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: number;
  tags: string[];
  link?: string;
};

const projects: Project[] = [
  {
    slug: 'web-app',
    title: 'Web App',
    summary: 'A modern web application built with React, TypeScript, and Tailwind CSS.',
    description:
      'A longer description of the web app project. Replace this with the real story: the problem, the approach, and the outcome.',
    year: 2025,
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    slug: 'portfolio',
    title: 'Portfolio Site',
    summary: 'A personal portfolio to showcase design, development, and creative work.',
    description:
      'A longer description of the portfolio project. Replace this with the real story: the problem, the approach, and the outcome.',
    year: 2025,
    tags: ['Design', 'Frontend'],
  },
  {
    slug: 'open-source',
    title: 'Open Source',
    summary: 'Contributions and personal open source projects.',
    description:
      'A longer description of open source work. Replace this with the real story: the problem, the approach, and the outcome.',
    year: 2024,
    tags: ['Open Source'],
  },
];

function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export { projects, getProject, type Project };
