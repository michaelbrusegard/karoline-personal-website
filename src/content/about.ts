const about = {
  intro:
    'Strategist and designer turning small nudges into impactful solutions, from first idea to something people actually live with.',
  portrait: {
    src: '/images/about/polaroid.webp',
    alt: 'Polaroid of Karoline standing in a sunny park wearing a bunad, held up by a binder clip',
  },
  /** Hand-written notes pinned around the portrait. */
  notes: ['Love to dance but can’t dance', 'Matcha addict', 'A little social awkward'],
  whyIDesign:
    'I connect the dots between strategy, brand, and behavior — helping companies speak clearer and feel more human. I build nudges and visuals that catch attention and stick: small redirects, real impact. It’s a passion that keeps me eager for fresh challenges and new opportunities. Outside of that, I’m probably hiking, hunting down new food, or geeking out over a great record cover.',
  process: {
    intro:
      'A flexible process for turning ambiguity into work that feels clear, useful, and cohesive.',
    steps: [
      {
        title: 'Discovery',
        body: 'Understanding the brand’s purpose, audience and the objective forms for every creative and strategic design.',
      },
      {
        title: 'Market & competitor research',
        body: 'I analyze competitors and industry trends to identify the brand’s unique value proposition and differentiation.',
      },
      {
        title: 'Insights & strategy',
        body: 'Defining the company’s core messages and strategic direction to ensure every decision supports the goals.',
      },
      {
        title: 'Design & visual',
        body: 'Developing consistent visual systems that reflect the brand’s essence and ensure recognition across all mediums.',
      },
      {
        title: 'Execution across touchpoints',
        body: 'Implementing the brand through digital experiences, social media and marketing materials for maximum impact.',
      },
      {
        title: 'Evaluation & optimization',
        body: 'Monitor user testing feedback and refine the brand experience to maintain relevance and effectiveness.',
      },
    ],
  },
  hobbies: {
    intro:
      'Beyond that, I have a passion for unique architecture, culinary exploration (I’m a self-proclaimed foodie), cooking, hiking, and traveling.',
    photos: [
      {
        src: '/images/about/budapest.webp',
        alt: 'Karoline in Budapest with the parliament behind',
        caption: 'Budapest',
      },
      {
        src: '/images/about/bilbao.webp',
        alt: 'The Guggenheim museum in Bilbao',
        caption: 'Architecture',
      },
      {
        src: '/images/about/ovre-aardal.webp',
        alt: 'Karoline hiking above a fjord',
        caption: 'Øvre Årdal',
      },
      { src: '/images/about/brunch.webp', alt: 'Eggs benedict on toast', caption: 'Foodie' },
    ],
  },
} as const;

export { about };
