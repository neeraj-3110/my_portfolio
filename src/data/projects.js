// `github` empty => disabled placeholder button. `live` empty => no Live Demo button.
export const projects = [
  {
    id: 'tripsplitter',
    title: 'TripSplitter',
    featured: true,
    visual: 'trip',
    description:
      'A travel expense splitting web application designed to make group trip expenses easier to manage and settle.',
    tech: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'JavaScript', 'Vercel'],
    features: [
      'Create trips',
      'Invite friends',
      'Add shared expenses',
      'Track who paid',
      'Calculate settlements',
      'Show who owes whom',
      'Authentication',
      'Invite links',
      'Responsive interface',
    ],
    problem:
      'Group trips involve many shared payments, and working out who paid what and who owes whom quickly becomes messy.',
    solution:
      'TripSplitter lets a group create a trip, invite friends by link, log shared expenses with who paid, and see calculated settlements showing who owes whom.',
    live: 'https://tripsplitter-phi.vercel.app/',
    github: '', // TODO: repository URL
  },
  {
    id: 'ai-assistant',
    title: 'AI Personal Assistant',
    featured: false,
    visual: 'ai',
    description:
      'Developed an AI-powered personal assistant capable of understanding natural-language queries and providing intelligent, context-aware responses.',
    tech: ['Python', 'OpenAI API', 'MySQL'],
    features: [
      'Integrated Python with AI APIs and MySQL',
      'Processed user requests',
      'Managed conversation data',
      'Securely stored user information',
      'Implemented automated task handling',
      'Implemented conversational interaction',
      'Implemented database-driven record management',
    ],
    problem:
      'Users need a way to interact with software using natural language and get context-aware answers, with their conversations and records kept organised.',
    solution:
      'A Python assistant that sends user requests to an AI API, keeps conversation data and user information in MySQL, and handles tasks automatically.',
    live: '',
    github: '', // TODO: repository URL
  },
  {
    id: 'portfolio-v1',
    title: 'Personal Portfolio Website',
    featured: false,
    visual: 'web',
    description:
      'Designed and developed a responsive portfolio website to showcase technical skills, projects, certifications, and achievements.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    features: ['Responsive design', 'Mobile-friendly UI', 'Project showcase', 'Skills presentation', 'Certifications section'],
    problem: 'A single, presentable place was needed to showcase technical skills, projects, and certifications.',
    solution:
      'A responsive, mobile-friendly website built with HTML, CSS, and JavaScript that presents skills, projects, and certifications in one place.',
    live: '',
    github: '', // TODO: repository URL
  },
]
