/**
 * Case study content model.
 *
 * Every project is a hero + ordered list of sections. Sections are discriminated by `kind`,
 * so the page renderer stays a small switch and new layouts can be added without touching
 * existing content.
 */

type Fact = { label: string; value: string };

/**
 * Per-card art direction, lifted verbatim from the Figma frames. Cards default to the
 * neutral bone/hairline treatment when no colors are given.
 */
type Card = {
  title: string;
  body: string;
  /** CSS colors from the design. `dark` switches the ghost numeral to the light treatment. */
  background?: string;
  color?: string;
  borderColor?: string;
  dark?: boolean;
  /** Small color chip before the title (Tempo's persona board confetti). */
  swatch?: string;
  /** Column span on desktop. */
  span?: 1 | 2 | 3;
};

type CaseImage = { src: string; alt: string; width: number; height: number };

/** Individual Figma exports live under `public/images/projects/<slug>/`. */
function image(path: string, [width, height]: [number, number], alt: string): CaseImage {
  return { src: `/images/projects/${path}.webp`, alt, width, height };
}

type Section =
  | {
      kind: 'text';
      eyebrow: string;
      title: string;
      body: string[];
      aside?: string;
    }
  | {
      kind: 'numbered';
      eyebrow: string;
      title: string;
      intro?: string;
      items: { title: string; body: string; tag?: string }[];
    }
  | {
      kind: 'cards';
      eyebrow: string;
      title: string;
      intro?: string;
      /** Hand-drawn doodle rendered beside the title (e.g. Sit's question mark). */
      icon?: CaseImage;
      columns?: 3 | 4;
      items: Card[];
    }
  | {
      kind: 'features';
      eyebrow: string;
      title: string;
      intro?: string;
      items: { title: string; body: string; image?: CaseImage }[];
    }
  | {
      kind: 'before-after';
      eyebrow: string;
      title: string;
      before: string[];
      after: string[];
      beforeImages?: CaseImage[];
      afterImages?: CaseImage[];
      beforeNote?: string;
      afterNote?: string;
    }
  | {
      kind: 'gallery';
      images: CaseImage[];
      caption?: string;
      /** Renders the images full-bleed on a colored band, like the design's mockup strips. */
      background?: string;
    }
  | {
      kind: 'reflection';
      reflection: string;
      learning: string;
    }
  | {
      kind: 'quote';
      quote: string;
      attribution?: string;
    };

type Project = {
  slug: string;
  title: string;
  /** Short title used on the home grid. */
  cardTitle: string;
  summary: string;
  year: number;
  tags: string[];
  cover: { src: string; alt: string; background: string };
  /** Full-bleed composition at the top of the case study. */
  hero: { src: string; width: number; height: number };
  facts: Fact[];
  sections: Section[];
  link?: {
    /** Headline for the closing call to action. */
    label: string;
    href: string;
    /** Button text. */
    action: string;
    /** Extra detail under the button, e.g. length and language of a report. */
    note?: string;
  };
};

const projects: Project[] = [
  {
    slug: 'youwell',
    title: 'Youwell digital course app',
    cardTitle: 'Digital app for drug addicts',
    summary:
      'In collaboration with Akershus University Hospital and Youwell. The brief was to translate Ahus’s existing Addiction and Coping course into a digital solution for patients waiting for addiction treatment.',
    year: 2025,
    tags: ['Product design', 'Healthcare', 'UX/UI'],
    cover: {
      src: '/images/projects/youwell-cover.webp',
      alt: 'Two phones showing the Youwell course app',
      background: 'var(--color-brand-youwell)',
    },
    hero: { src: '/images/projects/youwell-hero.webp', width: 1440, height: 985 },
    facts: [
      { label: 'Client', value: 'Ahus + Youwell' },
      { label: 'Role', value: 'Design lead' },
      { label: 'Method', value: 'Research / prototype / test' },
    ],
    sections: [
      {
        kind: 'gallery',
        caption: 'Her er vår tjeneste: the six-step patient journey the course supports.',
        images: [
          image('youwell/journey', [2575, 1149], 'Six-step patient journey diagram, in Norwegian'),
        ],
      },
      {
        kind: 'text',
        eyebrow: '02 / Context',
        title: 'From a physical course to digital experience.',
        aside:
          'How might the same knowledge feel manageable when concentration, structure, and motivation are already under pressure?',
        body: [
          'The brief was to explore how Akershus University Hospital’s existing course, Addiction and Coping, could be translated into a digital solution for patients waiting for addiction treatment.',
          'Akershus University Hospital owned the professional content. Our responsibility was design and user experience, developing design recommendations and a functional prototype for how the content could work digitally.',
          'We conducted 16 interviews with patients, peer support workers, healthcare professionals, course facilitators, researchers and students. We combined these findings with expert input and relevant research, then visualised the insights to identify patterns, gaps and design opportunities.',
        ],
      },
      {
        kind: 'text',
        eyebrow: '03 / Insights',
        title: 'Digitalisation is more than moving content online.',
        body: [
          'The research showed that the challenge was not a lack of information, but how patients were able to engage with it. Shame, low concentration and fluctuating motivation made a text heavy and rigid course easy to abandon. Many also had to repeatedly retell difficult experiences to new healthcare professionals before treatment had even begun.',
          'This changed our approach. We were not simply putting an existing course online, but finding a new way to communicate the same knowledge around the realities of the people using it.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'Sixteen interviews synthesised into patterns, gaps and design opportunities.',
        images: [
          image('youwell/insight-map', [634, 244], 'Insight map connecting research themes'),
          image('youwell/affinity-01', [350, 246], 'Affinity board with clustered sticky notes'),
          image(
            'youwell/affinity-02',
            [359, 257],
            'Affinity board grouping user needs and barriers',
          ),
        ],
      },
      {
        kind: 'numbered',
        eyebrow: '04 / The challenges',
        title: 'The challenges',
        intro: 'Research & design considerations',
        items: [
          {
            title: 'The crisis button',
            tag: 'Research',
            body: 'The crisis button was the most difficult feature to develop. Clinicians described patients’ crisis reactions in very different ways, and we lacked enough user data to make a confident decision. Research on coping strategies for people with substance use disorders by Setiawan et al. (2024) gave us the clinical foundation the interviews alone could not provide.',
          },
          {
            title: 'Finding the right tone',
            tag: 'Tone',
            body: 'The experience needed to feel warm and approachable while still maintaining professional credibility, without becoming childish or overly clinical.',
          },
          {
            title: 'Making language understandable',
            tag: 'Content',
            body: 'The original content was dense and heavily academic. We had to rethink how it was communicated to make it easier to understand and engage with.',
          },
          {
            title: 'The testing group',
            tag: 'Limitation',
            body: 'Most testing involved patients in relatively stable situations. We rarely reached those struggling the most, so we knew less about how low the threshold needed to be for the people who might need the solution most.',
          },
        ],
      },
      {
        kind: 'cards',
        eyebrow: '05 / Design principles',
        title: 'From insight to five principles.',
        intro:
          'We identify what others might overlook, understand why it matters, translate it into a design decision, and refine the direction through research and testing.',
        columns: 4,
        items: [
          {
            title: 'COGNITIVE SUPPORT',
            body: 'Low concentration and memory difficulties meant reducing cognitive load through short content blocks, simple navigation and visual communication instead of heavy text.',
            borderColor: '#3a00e5',
            color: '#3a00e5',
            span: 2,
          },
          {
            title: 'BRIDGING',
            body: 'Patients should not have to repeatedly tell their story. My Reflections collects their responses so healthcare professionals can review them in advance.',
            background: '#e3dbff',
            color: '#3916ff',
          },
          {
            title: 'SAFETY IN CHAOS',
            body: 'Relapse is often part of the recovery journey, not an exception. Research showed that support in moments of intense craving can make a real difference.',
            background: '#3a00e5',
            color: '#e3dbff',
            dark: true,
          },
          {
            title: 'VISIBLE PROGRESS',
            body: 'Personal development can be difficult to see. The Change Tree makes progress visible through a growing tree, turning an abstract process into something concrete and motivating.',
            background: '#3a00e5',
            color: '#e3dbff',
            dark: true,
          },
          {
            title: 'MODERN COMMUNICATION',
            body: 'Rather than presenting serious subject matter in a traditional healthcare format, we explored a familiar app based interaction style inspired by services such as Duolingo. This made the content more approachable while keeping the professional content intact.',
            borderColor: '#3a00e5',
            color: '#3a00e5',
            span: 3,
          },
        ],
      },
      {
        kind: 'features',
        eyebrow: '06 / The solution',
        title: 'Key features',
        intro: 'We brought these principles together in four core features of the app.',
        items: [
          {
            title: 'My Reflections',
            body: 'A log of the patient’s own responses. Patients can follow their development, while healthcare professionals can review their reflections in advance.',
            image: image(
              'youwell/screen-change-tree',
              [340, 629],
              'App screen: the Change Tree grows as the patient progresses',
            ),
          },
          {
            title: 'Crisis button',
            body: 'Breathing exercises and direct contact with a support person gathered in one place and accessible with one tap, during a crisis or relapse.',
            image: image(
              'youwell/screen-guide',
              [367, 724],
              'App screen: choosing a digital guide',
            ),
          },
          {
            title: 'Digital guide',
            body: 'A human companion providing support throughout the course and between sessions.',
            image: image(
              'youwell/screen-crisis',
              [359, 716],
              'App screen: the crisis button with ways to get help',
            ),
          },
          {
            title: 'Change Tree',
            body: 'A seed that gradually grows into a tree, visualising the patient’s progress throughout the course.',
            image: image(
              'youwell/screen-course',
              [340, 734],
              'App screen: reflections gathered from the course',
            ),
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: '07 / Impact',
        title: 'Impact',
        body: [
          'The prototype, research and synthesis gave Youwell a clearer picture of what matters most to this user group and why. It provided new insight into a complex user group, identified gaps between professional assumptions and patients’ actual needs, and translated these findings into concrete recommendations for further development.',
          'For users, this meant a solution designed around their actual circumstances: shorter and more accessible content, support during difficult moments, less repetition and a more visible sense of progress. For Youwell, the project created a research grounded foundation for future product decisions, connecting user needs, professional expertise and digital possibilities.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'Priority matrix: which features should the app prioritise?',
        images: [
          image(
            'youwell/priority-matrix',
            [2391, 1365],
            'Priority matrix plotting features by impact and effort',
          ),
        ],
      },
      {
        kind: 'before-after',
        eyebrow: '08 / Results',
        title: 'Before & after',
        before: [
          'Existing course content',
          'Limited understanding of the patient journey',
          'Expert perspective dominated',
          'Features not yet prioritised',
          'Physical course as starting point',
        ],
        after: [
          'Digital experience adapted to user needs',
          'Clearer connections and understanding of users, barriers and needs',
          'Gaps between expert and patient perspectives identified',
          'Key functions and design principles prioritised',
          'Created a foundation for future digital development',
        ],
        beforeImages: [
          image(
            'youwell/before-module',
            [222, 480],
            'The original course: a dense, text-heavy module list',
          ),
          image('youwell/before-module-02', [221, 477], 'The original course: long text passages'),
          image(
            'youwell/before-module-03',
            [222, 480],
            'The original course: crisis help buried in text',
          ),
        ],
        beforeNote: 'The original design from Youwell’s app Spillfri, for gambling addicts.',
        afterImages: [
          image(
            'youwell/after-overview',
            [220, 478],
            'The redesigned home screen with short content blocks',
          ),
          image('youwell/after-story', [220, 478], 'The redesigned course: stories in short steps'),
          image('youwell/after-help', [215, 466], 'The redesigned crisis support screen'),
        ],
      },
      {
        kind: 'reflection',
        reflection:
          'This was my first time leading a design team, and it taught me that leadership is not about having all the answers. There were moments where I felt unsure of the direction myself, but I learned that my role was to create clarity and confidence for the team, even when the process was uncertain. I became more comfortable making decisions, trusting our process and giving the team a sense of security while we figured things out together.',
        learning:
          'A key learning was how to balance the client’s goals with the users’ needs. When the client proposed an AI based conversational bot, our research suggested it could reduce trust among a vulnerable target group. I challenged the direction and used our research to argue for an alternative. This taught me that good design leadership is not only about driving the process forward, but also having the confidence to challenge decisions when the evidence points elsewhere.',
      },
    ],
    link: {
      label: 'See the prototype',
      action: 'Prototype',
      href: 'https://www.figma.com/proto/PWUONzsPHxYGZdS5bUKnkD/App-prototype?node-id=5333-3390&t=Ga6GUCH5HdrxnPuj-0&scaling=scale-down&content-scaling=fixed&page-id=5015%3A779&starting-point-node-id=5067%3A2126&show-proto-sidebar=1',
    },
  },
  {
    slug: 'manafish',
    title: 'Manafish start up',
    cardTitle: 'Manafish webdesign',
    summary:
      'Manafish is an existing modular build kit that lets users construct their own underwater drone, capable of diving to depths of up to 50 meters. This project involved developing a digital platform for the DIY underwater drone with a step-by-step assembly guide, while also serving as a sales showcase.',
    year: 2025,
    tags: ['UX/UI', 'Design system', 'Start up'],
    cover: {
      src: '/images/projects/manafish-cover.webp',
      alt: 'Laptop showing the Manafish website',
      background: 'var(--color-brand-manafish)',
    },
    hero: { src: '/images/projects/manafish-hero.webp', width: 1440, height: 963 },
    facts: [
      { label: 'Client', value: 'Manafish' },
      { label: 'Role', value: 'UX/UI designer' },
      { label: 'Method', value: 'Research / design system / concept development' },
    ],
    sections: [
      {
        kind: 'gallery',
        caption: 'The landing page explains the kit in three steps: get it, print it, assemble it.',
        images: [
          image(
            'manafish/how-it-works',
            [1274, 858],
            'Landing section explaining the kit in three steps: get the kit, 3D-print the parts, assemble the drone',
          ),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Context',
        title: 'Two audiences, one platform',
        body: [
          'Manafish is aimed at DIY enthusiasts, schools, and Maker Space communities. Although the platform’s primary target audience is existing owners who need a step-by-step assembly guide to build the drone, there is significant potential in using the same platform to recruit new buyers. The project therefore combines training and documentation with e-commerce and community building.',
        ],
      },
      {
        kind: 'gallery',
        caption:
          'Existing owners need the assembly guide; newcomers need a reason to trust the kit.',
        images: [
          image(
            'manafish/audiences',
            [854, 528],
            'Venn diagram of the two audiences: Manafish underwater owners and newcomers',
          ),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Problem statement and goals',
        title: 'Clarity, trust, and sales',
        body: [
          'The project centered on creating a clear, intuitive assembly overview that could safely guide users through the entire build process step by step. Alongside this, it was important to set clear expectations for potential buyers by showing exactly what the kit includes and what it’s capable of, ultimately helping to drive sales of the Manafish kit. The platform also needed to capture the creative spirit behind the product, giving users a way to showcase the drone’s versatility and share their builds with the wider Maker Space community.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'The sitemap: assembly guide, showcase, and store.',
        images: [
          image(
            'manafish/sitemap',
            [1051, 525],
            'Sitemap wireframes connecting the landing page, assembly guide, ordering, Maker Space and sign-in',
          ),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Process',
        title: 'Find the foundation first.',
        body: [
          'The main challenge was making the assembly guide genuinely easy to follow, so people wouldn’t get lost building a physical drone. At the same time, the site needed to be honest and convincing for people who hadn’t bought it yet, showing clearly what they’d get and what the drone could do. I also wanted the site to reflect the Maker Space spirit behind the product, a place that celebrated what people built, not just a store.',
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Solution',
        title: 'Four pieces, one platform.',
        body: [
          'The platform came together around four pieces. A step by step assembly guide with clear order, so people always knew where they were. A section showing what Manafish can actually do: exploration, underwater photography, environmental monitoring, made possible by the 50 meter dive depth. A transparent purchase flow laying out what’s in the kit, what buyers need to source themselves, and what they’ll end up with. And a Maker Space section showcasing mods and builds from the community.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'Module 1 of the assembly guide: choosing a design and 3D-printing the parts.',
        images: [
          image(
            'manafish/assembly-guide',
            [1295, 436],
            'Two screens from the step-by-step assembly guide, with tools, time estimate and checklist',
          ),
        ],
      },
      {
        kind: 'numbered',
        eyebrow: 'Impact',
        title: 'Guide, demonstration, and store in one portal',
        intro:
          'The end result is one web portal that ties together the assembly guide, product demonstration, and online store.',
        items: [
          {
            title: 'Efficient assembly',
            body: 'Existing users get an uninterrupted and pedagogical build experience.',
          },
          {
            title: 'Increased conversion',
            body: 'New visitors seeking information are exposed to the drone’s capabilities and inspired to purchase their own kit.',
          },
          {
            title: 'Clear expectations',
            body: 'Reduced barrier to purchase through transparent and complete product information.',
          },
        ],
      },
      {
        kind: 'gallery',
        images: [image('manafish/tablet', [747, 653], 'The Manafish landing page on a tablet')],
      },
      {
        kind: 'reflection',
        reflection:
          'I didn’t expect how differently two people could use the same site. One wants speed, the other wants reasons to trust the product. I kept designing for one and forgetting the other, which taught me to ask what each page was really for. I also underestimated how much trust mattered for a physical kit bought sight unseen.',
        learning:
          'I learned to turn a hands-on build process into something clear on screen, by finding where people get stuck and designing around it. I learned a good purchase flow isn’t persuasion, it’s honest information that lets people decide for themselves.',
      },
    ],
    link: {
      label: 'See the prototype',
      action: 'Prototype',
      href: 'https://www.figma.com/proto/OBPubyYTT0au7afzKDu8hi/Manafish?node-id=5265-366&t=RRqXubQgvZs1Go1w-0&scaling=min-zoom&content-scaling=fixed&page-id=5155%3A310',
    },
  },
  {
    slug: 'sit',
    title: 'Sit rebrand',
    cardTitle: 'Sit rebrand',
    summary:
      'Sit’s gym app has the right building blocks, but the experience underneath is full of small anxieties: not knowing if a gym is packed, no reason to keep coming back. I redesigned the app around removing that uncertainty. This was a concept redesign, not affiliated with Sit.',
    year: 2026,
    tags: ['UX/UI', 'Redesign', 'Rebrand'],
    cover: {
      src: '/images/projects/sit-cover.webp',
      alt: 'Three phones showing the redesigned Sit training app',
      background: 'var(--color-brand-sit)',
    },
    hero: { src: '/images/projects/sit-hero.webp', width: 1440, height: 936 },
    facts: [
      { label: 'Project', value: 'Sit Trening' },
      { label: 'Role', value: 'UX research / product design' },
      { label: 'Scope', value: 'Mobile app experience' },
    ],
    sections: [
      {
        kind: 'text',
        eyebrow: '01 / Discovery',
        title: 'A personal frustration became a shared problem.',
        body: [
          'It started with my own frustration, booking a popular class felt like a gamble. I ran a short survey and interviews with other Sit members to see if this was personal or shared, it was shared.',
        ],
      },
      {
        kind: 'cards',
        eyebrow: 'Survey + interviews',
        title: 'Current user frustrations',
        intro: 'What problems are users experiencing with existing gym apps and booking systems?',
        icon: image('sit/question-mark', [56, 135], ''),
        items: [
          { title: 'Classes fill up too quickly', body: 'Can’t get into popular sessions.' },
          { title: 'App crashes', body: 'During peak booking times.' },
          { title: 'Hard to find the right class', body: 'Nothing matches my fitness level.' },
          { title: 'Confusing cancellation', body: 'Policies and late fees are easy to miss.' },
          { title: 'No instructor ratings', body: 'Or any sense of class difficulty.' },
          { title: 'Disconnected progress', body: 'Tracking feels separate from actual workouts.' },
        ],
      },
      {
        kind: 'text',
        eyebrow: '02 / User pain points',
        title: 'The biggest pain point was uncertainty.',
        body: [
          'Members were not missing motivation, they were missing clarity. Booking felt uncertain because classes filled fast, crowding was hard to judge before leaving, cancellation rules were easy to miss, and progress tracking felt disconnected from the workout itself. For newer or more introverted members, even finding equipment could become a barrier.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'The current app: the information members need is buried or missing.',
        images: [
          image('sit/current-app-01', [286, 618], 'Current Sit app: gym front page'),
          image('sit/current-app-02', [286, 618], 'Current Sit app: class booking list'),
        ],
      },
      {
        kind: 'cards',
        eyebrow: '03 / Market research',
        title: 'Borrow the patterns, not the interface',
        intro:
          'Adjacent fitness apps revealed patterns worth borrowing: flexibility, community, low-pressure tone, smoother waitlists, and workout-connected tracking.',
        items: [
          {
            title: 'ClassPass',
            body: 'Cross-studio flexibility makes booking feel less locked-in.',
            background: '#f3f2ef',
            borderColor: 'rgba(17,17,17,0.55)',
          },
          {
            title: 'Peloton',
            body: 'Community and leaderboards give people a reason to return.',
            background: '#ddf772',
          },
          {
            title: 'Planet Fitness',
            body: 'A judgment-free tone lowers intimidation for newer members.',
            background: '#0e0e0f',
            color: '#f2f2f2',
            dark: true,
          },
          {
            title: 'Mindbody',
            body: 'Waitlists and notifications reduce stress around full classes.',
            background: '#e95386',
          },
          {
            title: 'MyFitnessPal',
            body: 'Tracking feels useful when it connects directly to the workout itself.',
            background: '#f3f2ef',
            borderColor: 'rgba(17,17,17,0.55)',
            span: 2,
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: '04 / Insights + strategy',
        title: 'The right data at the decision moment',
        body: [
          'Sit did not need new data, it needed the right data at the decision moment. Capacity stats already existed but lived apart from booking. The strategy became collapsing that gap, surfacing information in the flow itself.',
          'Sit’s tone is practical and student first, not intimidating. The narrative became training without second guessing yourself, every screen answering a hesitation before the member has to ask it.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'Capacity data already exists in the app today. It just lives away from booking.',
        images: [
          image('sit/audit-01', [283, 613], 'Current app: capacity statistics in a submenu'),
          image('sit/audit-02', [281, 606], 'Current app: gym overview separated from booking'),
        ],
      },
      {
        kind: 'cards',
        eyebrow: '05 / Design + visual',
        title: 'Four concepts. Four hesitations removed',
        intro: 'Each design concept turns a moment of uncertainty into a clear next action.',
        columns: 4,
        items: [
          {
            title: 'Capacity badges',
            body: 'Low, normal, and high capacity signals appear directly inside booking, paired with the next quieter option instead of a dead end.',
            background: '#ddf772',
          },
          {
            title: 'Calendar sync',
            body: 'One tap calendar sync keeps bookings, reminders, and cancellation windows visible after the class is booked.',
            background: '#0e0e0f',
            color: '#f2f2f2',
            dark: true,
          },
          {
            title: 'Friend passes',
            body: 'Up to three free visits create a low pressure way to bring someone before they commit to membership.',
            background: '#e95386',
          },
          {
            title: 'Equipment map',
            body: 'A future zone based equipment map helps newer and introverted members find apparatus without needing to ask staff.',
            background: '#f3f2ef',
            borderColor: 'rgba(17,17,17,0.55)',
          },
        ],
      },
      {
        kind: 'numbered',
        eyebrow: '06 / Execution across touchpoints',
        title: 'The useful information appears where the decision happens',
        items: [
          {
            title: 'Booking flow',
            body: 'Capacity and smart slot suggestions live directly in the booking flow.',
          },
          { title: 'Gym home', body: 'The gym home screen shows live status per location.' },
          {
            title: 'Calendar and notifications',
            body: 'Bookings, reminders, and cancellation windows sync automatically.',
          },
          {
            title: 'Post workout',
            body: 'A lightweight streak view rounds out the post workout screen without making progress feel gimmicky.',
          },
        ],
      },
      {
        kind: 'before-after',
        eyebrow: '07 / Results',
        title: 'Redesign: clearer timing, clearer decisions',
        before: ['Sit’s design', 'Capacity hidden away from booking', 'No tracking'],
        after: ['My redesign', 'Gym capacity moved to the front page', 'Added tracking'],
        beforeImages: [
          image('sit/redesign-01', [371, 859], 'Current profile screen without tracking'),
          image('sit/redesign-03', [413, 859], 'Current home screen: capacity out of sight'),
        ],
        afterImages: [
          image('sit/redesign-02', [376, 859], 'Redesigned profile with activity tracking'),
          image('sit/redesign-04', [392, 859], 'Redesigned home with door access and gym capacity'),
        ],
        afterNote: 'Added tracking. Moved the gym capacity to the front page.',
      },
      {
        kind: 'reflection',
        reflection:
          'Starting from a personal frustration made it easy to assume everyone shared it. Running the survey first kept the project honest about which problems were real and which were mine alone.',
        learning:
          'The most valuable information was already inside Sit’s system. Good product design is often about relocating information to where the decision actually happens, not inventing new data.',
      },
    ],
    link: {
      label: 'See the prototype',
      action: 'Prototype',
      href: 'https://www.figma.com/proto/4sgRPjCScnt8iWAzwLp2r7/SIT-Fitness-Center-Mobile-App-System?node-id=11-19&t=IkOhAfBlx1FP0hm2-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    },
  },
  {
    slug: 'hospital-at-home',
    title: 'Hospital at Home',
    cardTitle: 'Hospital at Home',
    summary:
      'Hospital at Home explores how healthcare can move to your own home. Through research across hospitals, municipalities and healthcare services, the project investigates how stronger collaboration, trust and infrastructure can make care at home a realistic and sustainable alternative across geographical distances to the hospital.',
    year: 2025,
    tags: ['Strategic design', 'Healthcare', 'Systems thinking'],
    cover: {
      src: '/images/projects/hospital-at-home-cover.webp',
      alt: 'St. Olavs Hospital — Hjemmesykehus',
      background: 'var(--color-brand-hospital)',
    },
    hero: { src: '/images/projects/hospital-at-home-hero.webp', width: 1440, height: 876 },
    facts: [
      { label: 'Client', value: 'St. Olav Hospital' },
      { label: 'Role', value: 'System designer, team' },
      { label: 'Method', value: 'Research / design thinking / concept development' },
    ],
    sections: [
      {
        kind: 'gallery',
        images: [
          image(
            'hospital-at-home/home-care-illustration',
            [1214, 809],
            'Illustration: hospital-level care delivered in the patient’s own living room',
          ),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Context',
        title: 'Specialist care at home, built to scale.',
        aside:
          'How can St. Olav Hospital provide sound, scalable Hospital at Home care across urban and rural areas?',
        body: [
          'Hospital at Home brings organised specialist care to a patient’s home. St. Olav Hospital needed one operating model that could work in Trondheim and rural districts with long travel distances.',
          'Interviews with healthcare professionals, field research, and the National Conference identified the conditions preventing a shared Hospital at Home model.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'Traditional patient flow versus Hjemmesykehus, where the stay happens at home.',
        images: [
          image(
            'hospital-at-home/patient-journey',
            [822, 425],
            'Patient journey map comparing traditional admission with hospital at home',
          ),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'The challenge',
        title: 'The original model was too narrow.',
        body: [
          'Direction 1 answered the original mandate: formally admit the patient to hospital while care happened at home, within the existing ISF reimbursement model. Under Norwegian regulations, legal admission requires daily physical attendance by clinical staff. Long rural travel distances made this difficult to sustain with already limited hospital capacity.',
          'It focused on patients already admitted. It did not prevent admission or support earlier discharge.',
        ],
      },
      {
        kind: 'gallery',
        caption:
          'Demonstration of strategy direction 1: a cross-disciplinary hospital-at-home unit.',
        images: [
          image(
            'hospital-at-home/direction-1',
            [2261, 912],
            'Diagram of direction 1: shared positions and a strengthened ambulance service',
          ),
        ],
      },
      {
        kind: 'cards',
        eyebrow: 'Research insights',
        title: 'Four bottlenecks hold the model back.',
        columns: 4,
        items: [
          {
            title: 'FUNDING',
            body: 'Hospital reimbursement and municipal block grants have no shared payment mechanism.',
            background: '#133b6f',
            color: '#dbe6f3',
            dark: true,
          },
          {
            title: 'TECHNOLOGY',
            body: 'No shared standards for field diagnostics, monitoring, or data exchange.',
            background: '#133b6f',
            color: '#dbe6f3',
            dark: true,
          },
          {
            title: 'RESPONSIBILITY',
            body: 'Clinical responsibility is unclear across hospital and municipal care.',
            background: '#133b6f',
            color: '#dbe6f3',
            dark: true,
          },
          {
            title: 'REGULATION + GEOGRAPHY',
            body: 'Legally admitted patients require daily physical attendance, which is difficult across rural distances.',
            background: '#133b6f',
            color: '#dbe6f3',
            dark: true,
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Strategic shift',
        title: 'Find the foundation first.',
        aside:
          'What was needed to make Hospital at Home work in the long term for rural districts?',
        body: [
          'The National Conference in Kristiansund widened the perspective. Instead of forcing one admission pathway through today’s funding structure, we asked what must be in place for Hospital at Home to work in the long term.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'The National Conference in Kristiansund, and the synthesis that followed.',
        images: [
          image(
            'hospital-at-home/conference',
            [325, 350],
            'The team at the National Hospital at Home conference',
          ),
          image('hospital-at-home/synthesis-board', [600, 510], 'Research synthesis board'),
          image(
            'hospital-at-home/stakeholder-map',
            [280, 198],
            'Stakeholder map across hospital and municipal care',
          ),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Direction two',
        title: 'Extended Hospital at Home.',
        body: [
          'Start with the conditions for care; make admission at home a later capability, not the first requirement. Direction 2 builds one operating model across hospital and municipalities. It expands the focus from already admitted patients to early diagnostics, early and safer discharge, preventing admission and more sustainable use of capacity.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'Direction 2, expansion of home hospital, became the chosen path.',
        images: [
          image(
            'hospital-at-home/direction-choice',
            [2130, 1005],
            'Comparison of direction 1 and direction 2, with direction 2 marked as the chosen path',
          ),
        ],
      },
      {
        kind: 'numbered',
        eyebrow: 'Potential impact',
        title: 'What this strategy can — and cannot — change.',
        intro:
          'A strategic direction does not solve every structural challenge. It makes the current system more coordinated, capable, and prepared to scale.',
        items: [
          {
            title: 'Reduce admissions',
            body: 'Reduce unnecessary admissions and shorten hospital stays.',
          },
          {
            title: 'Improve continuity',
            body: 'Improve continuity, predictability, and the patient experience.',
          },
          {
            title: 'Build competence',
            body: 'Build competence through collaboration and knowledge sharing.',
          },
          {
            title: 'Use capacity better',
            body: 'Use existing capacity better as the elderly population grows.',
          },
        ],
      },
      {
        kind: 'before-after',
        eyebrow: 'Strategic result',
        title: 'Before & after',
        before: [
          'Narrow admission concept',
          'Fragmented responsibilities',
          'One model for every place',
          'No agreed priorities',
          'Highlighted risks',
        ],
        after: [
          'Care system across the journey',
          'Shared coordination model',
          'Urban and rural adaptation',
          'Clear priorities for testing',
          'Found the systemic barriers',
        ],
      },
      {
        kind: 'reflection',
        reflection:
          'Clinical quality alone is not enough. For less critical conditions, impact also depends on capacity and reach: how many patients can actually benefit. Sustainable use of healthcare resources must be treated as equally important.',
        learning:
          'The key learning was having the confidence to challenge the brief and focus on what St. Olav’s actually needed. The value was not in the design methods themselves, but in the strategic decisions they enabled.',
      },
    ],
    link: {
      label: 'Read the whole story',
      action: 'Report (PDF)',
      href: '/reports/hjemmesykehus.pdf',
      note: '59 pages · Norwegian · 1.7 MB',
    },
  },
  {
    slug: 'tempo',
    title: 'Tempo neighbourhood café',
    cardTitle: 'Tempo service design',
    summary:
      'A low-threshold meeting place shaped around everyday life in Tempe/Sorgenfri, Trondheim. This service design project was conducted in 2025 in collaboration with Trondheim Municipality as part of a comprehensive area-development initiative.',
    year: 2025,
    tags: ['Service design', 'Graphic design', 'Inclusion'],
    cover: {
      src: '/images/projects/tempo-cover.webp',
      alt: 'Tempo Bydelskafé logo with Trondheim Kommune',
      background: 'var(--color-brand-tempo)',
    },
    hero: { src: '/images/projects/tempo-hero.webp', width: 1440, height: 907 },
    facts: [
      { label: 'Client', value: 'Trondheim Municipality' },
      { label: 'Role', value: 'Service designer, team' },
      { label: 'Method', value: 'Research / design thinking / concept development' },
    ],
    sections: [
      {
        kind: 'gallery',
        images: [
          image('tempo/neighbourhood-02', [590, 378], 'Playground in the Tempe area'),
          image('tempo/neighbourhood-03', [597, 376], 'Apartment blocks in Tempe'),
        ],
      },
      {
        kind: 'gallery',
        caption: 'Tempe/Sorgenfri: a district in the middle of an area-development initiative.',
        images: [
          image(
            'tempo/neighbourhood-01',
            [1171, 449],
            'Housing blocks and the kindergarten in the Tempe area',
          ),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Context',
        title: 'A place in a changing neighbourhood',
        body: [
          'This service design project was conducted in 2025 in collaboration with Trondheim Municipality, which at the time was working on a comprehensive area development initiative in the Tempe/Sorgenfri district. The project explored how service design could be used as a strategic tool to strengthen the local community and promote social inclusion.',
          'To achieve this, we sought a deeper understanding of the everyday lives of families with young children in the area, and examined how their local environment influenced their sense of belonging, participation, and community. As a methodological framework, Hverdagsreisen (developed by DOGA and Comte Bureau) was used to map residents’ needs in everyday situations and explore how physical environments and meeting places could best support them.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'Who lives in Tempe/Sorgenfri, and who lives crowded.',
        images: [
          image(
            'tempo/stat-households',
            [426, 286],
            'Share of households living in crowded conditions',
          ),
          image('tempo/stat-demographics', [386, 291], 'Age distribution in the district'),
        ],
      },
      {
        kind: 'quote',
        quote:
          'Hjemme blir det fort trangt, og det finnes egentlig ingen steder her jeg kan være med vennene mine. Vi ender alltid opp på skolen eller i sentrum.',
        attribution: 'Oskar, 13 år',
      },
      {
        kind: 'text',
        eyebrow: 'The problem',
        title: 'The original proposal was too narrow',
        aside:
          '“Home gets crowded quickly, and there are really no places here where I can hang out with my friends. We always end up at school or in the city centre.”',
        body: [
          'The original proposal was to turn Tempe Kindergarten into a meeting place. Research showed that its outdoor area was problematic in the evenings, the kindergarten was privately owned, and the solution only served families with children there.',
          'Overcrowding, cultural divides, expensive commercial venues, a motorway dividing the area, and the closure of the previous neighbourhood café all contributed to the lack of accessible meeting places.',
        ],
      },
      {
        kind: 'gallery',
        images: [
          image(
            'tempo/area-map',
            [500, 470],
            'Map of the Tempe/Sorgenfri district with the café, kindergartens and school marked',
          ),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Process',
        title: 'Find the right brief',
        body: [
          'The project initially focused on Tempe kindergarten as a potential inclusive meeting point, following Trondheim Municipality’s interest. However, a Design Jam revealed that the challenge extended beyond a single institution, leading us to focus on the neighbourhood’s wider need for accessible, low-threshold places to meet.',
          'To engage the area’s diverse families, including those facing language barriers, we hosted a face-painting event in the local park to build trust and gather insights. Using Crazy 8s, an Opportunity Solution Tree, and an impact matrix, we explored and prioritised potential solutions. The neighbourhood café emerged as the concept with the broadest impact and lowest barrier to participation, leading to the idea of reopening the previously closed café as Tempo.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'The impact matrix that pointed to the café.',
        images: [
          image('tempo/impact-matrix', [782, 496], 'Impact matrix comparing the proposed concepts'),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'The solution',
        title: 'Reopen the former café as Tempo',
        body: [
          'We chose to reopen the former café as Tempo. During our research, we also met Ole Edvard Hammeren, a local father willing to leave his job to run the café, turning the concept into something that could actually be realised.',
          'Tempo became a multifunctional neighbourhood hub with a sensory corner, swap library, printer, and activity board, supported by a new identity and greener interior. We designed the concept around different everyday needs and tested it through personas, a five-phase journey, and a service blueprint. We also identified practical triggers, such as information at the kindergarten and affordable dinners, to encourage families to use the café.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'From an empty space to the Tempo café.',
        images: [
          image('tempo/cafe-before', [549, 461], 'The closed café space before reopening'),
          image('tempo/cafe-visualisation', [636, 472], 'Visualisation of the reopened Tempo café'),
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Result',
        title: 'An empty space became a local hub',
        body: [
          'Tempo transformed an empty, closed space into a hub connecting people across age and background while fitting into their existing routines.',
          'The project moved us from knowing something was missing to having a concrete, tested concept with an operating model and identity the neighbourhood could take ownership of. A concept the neighbourhood could use, run, and recognise as its own.',
        ],
      },
      {
        kind: 'gallery',
        caption: 'The café floor plan: sensory corner, swap library, printer and activity board.',
        images: [
          image('tempo/floor-plan', [968, 655], 'Floor plan of the Tempo café with zones labelled'),
        ],
      },
      {
        kind: 'cards',
        eyebrow: 'Personas',
        title: 'A café for the whole neighbourhood',
        intro: 'The persona board, in the residents’ own words.',
        columns: 4,
        items: [
          {
            title: 'Pensjonisten',
            body: 'Et sted å ta en kaffe og føle på nærværet av andre mennesker.',
            swatch: '#e9b458',
          },
          {
            title: 'Ungdom',
            body: 'En plass ungdommen kan henge.',
            swatch: '#4db4ff',
          },
          {
            title: 'Naboen',
            body: 'Et sted å bli kjent med naboene sine og styrke lokalfellesskapet.',
            swatch: '#38d5a6',
          },
          {
            title: 'Besøkende',
            body: 'Et hyggelig sted som representerer det fine lokalmiljøet har å by på.',
            swatch: '#ffe082',
          },
          {
            title: 'Småbarnsforeldre',
            body: 'Et sted hvor foreldre kan bli kjent med andre mens småbarna leker.',
            swatch: '#de344b',
            span: 2,
          },
          {
            title: 'Innvandrerforeldre',
            body: 'En plass hvor man kan få mer kjennskap til nordmenn, øve på språkferdigheter og ta del i det norske samfunnet.',
            swatch: '#e9b458',
            span: 2,
          },
          {
            title: 'NAV-ere',
            body: 'En plass for å få arbeidserfaring, som kan gjøre det enklere å få fast jobb i fremtiden.',
            swatch: '#38d5a6',
          },
        ],
      },
      {
        kind: 'reflection',
        reflection:
          'I synthesised the research and identified patterns across individual insights. While analogue outreach helped us reach people with lower digital literacy, we still mainly captured those already engaged. Because testing happened through conversations rather than real use, we lack evidence of behavioural change. The operating model also remains dependent on one key individual and an incomplete financial plan.',
        learning:
          'The biggest learning was the importance of having the courage to challenge the original brief. Presenting to the municipal council also taught me that understanding a solution is different from communicating it in a way that makes others trust it.',
      },
    ],
    link: {
      label: 'Download report',
      action: 'Report (PDF)',
      href: '/reports/tempo-bydelskafe.pdf',
      note: '38 pages · Norwegian · 19 MB',
    },
  },
  {
    slug: 'pastael',
    title: 'Pastael newsletter',
    cardTitle: 'Pastael newsletter',
    summary:
      'Say bye to overfilled suitcases and desperately searching through unorganised clothes at security. Pastael packing cubes are designed to be as bright and colourful as your travel plans, while allowing your clothes to stay neatly packed and organised inside.',
    year: 2024,
    tags: ['Rebrand', 'Marketing', 'Info letter'],
    cover: {
      src: '/images/projects/pastael-cover.webp',
      alt: 'Pastael cherry edition packing cubes',
      background: 'var(--color-brand-pastael)',
    },
    hero: { src: '/images/projects/pastael-hero.webp', width: 1440, height: 1080 },
    facts: [
      { label: 'Project', value: 'Pastael — cherry edition' },
      { label: 'Role', value: 'Graphic design' },
      { label: 'Scope', value: 'Newsletter / product photography' },
    ],
    sections: [],
  },
];

function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export { projects, getProject, type Card, type CaseImage, type Project, type Section };
