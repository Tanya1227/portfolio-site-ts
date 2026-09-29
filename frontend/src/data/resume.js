export const RESUME = {
  profile: {
    name: 'Tanya Singh',
    initials: 'TS',
    title: 'Software Engineer',
    subtitle: 'React.js & TypeScript',
    tagline:
      'Software Engineer specialising in scalable, component-based web applications built with React.js, TypeScript, and JavaScript — reusable UI systems, RESTful API integration, and real-time, AI-powered features.',
    location: 'Bangalore, Karnataka, India',
    phone: '+91-9131414080',
    email: 'tanyasinghwork1227@gmail.com',
    linkedin: 'https://linkedin.com/in/tanya-singh-9b5492225',
    github: 'https://github.com/Tanya1227',
    years_experience: '2+',
    availability: 'Available from 20 Sep 2026',
    avatar: '/assets/memoji-avatar-transparent.webp',
  },

  summary:
    'Software Engineer specialising in scalable, component-based web applications built with React.js, TypeScript, and JavaScript. Develops reusable UI systems, integrates RESTful APIs, manages asynchronous application state, and debugs cross-system data flows. Works to Agile/SDLC practices, with hands-on experience delivering real-time and AI-powered web features and early exposure to Node.js/Express.js on the backend.',

  currently: 'Building React/TypeScript UI systems at 47Billion',
  coreFocus: 'Component architecture & API integration',

  metrics: [
    { value: '02+', label: 'Years Experience' },
    { value: '04+', label: 'Major Projects' },
    { value: '10+', label: 'Open Source Repos' },
    { value: '15+', label: 'Team Members Led' },
  ],

  skills: [
    {
      category: 'Languages',
      items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frontend',
      items: ['React.js', 'Redux', 'Tailwind CSS', 'Component-Based Architecture', 'Responsive Design'],
    },
    {
      category: 'Backend',
      items: ['Node.js (Beginner)', 'Express.js (Beginner)', 'RESTful APIs', 'JSON', 'WebSocket'],
    },
    {
      category: 'Testing',
      items: ['Jest', 'Vitest', 'React Testing Library'],
    },
    {
      category: 'Tools',
      wide: true,
      items: ['Git', 'GitHub', 'Postman', 'Figma', 'Claude Code', 'GitHub Copilot', 'Cursor'],
    },
    {
      category: 'Practices',
      items: ['Agile/Scrum', 'SDLC', 'Debugging', 'API Integration', 'AI-Assisted Development'],
    },
  ],

  experience: [
    {
      company: '47Billion Information Technologies Pvt. Ltd.',
      role: 'Software Engineer',
      location: 'Indore, India',
      period: 'Jan 2025 – Present',
      projects: [
        {
          slug: 'reusable-component-api-systems',
          name: 'Reusable Component & API Systems',
          subtitle: 'Type-safe React/TypeScript UI systems for cross-team delivery',
          tag: 'Frontend Platform',
          stack: ['React.js', 'TypeScript', 'RESTful APIs', 'Agile/Scrum'],
          highlights: [
            'Developed reusable, type-safe React.js/TypeScript components using clean-code and design-pattern best practices, reducing duplicate UI implementation and improving frontend consistency.',
            'Reduced REST API integration effort by 65% through centralized state management, reusable asynchronous hooks, and systematic debugging of cross-system data flows.',
            'Improved design-to-development handoff by 60% by building componentized UI and optimizing applications for performance, scalability, and cross-browser compatibility.',
            'Collaborated with product managers and cross-functional teams to translate requirements into maintainable frontend features, participate in code reviews, and improve sprint estimation within Agile/SDLC workflows.',
          ],
          case_study: {
            problem:
              'Frontend teams were duplicating UI implementations and re-integrating the same REST endpoints across applications, with inconsistent state handling slowing delivery.',
            role: 'Software Engineer — owned the shared component library and the API integration layer.',
            architecture: [
              {
                title: 'Component Library',
                body: 'Type-safe, reusable React.js/TypeScript components built with clean-code and design-pattern best practices, reducing duplicate UI implementation.',
              },
              {
                title: 'API Integration Layer',
                body: 'Centralized state management and reusable asynchronous hooks, cutting REST API integration effort by 65% and systematically debugging cross-system data flows.',
              },
              {
                title: 'Delivery Workflow',
                body: 'Componentized UI and performance/cross-browser optimization improved design-to-development handoff by 60% within Agile/SDLC sprints.',
              },
            ],
          },
        },
      ],
    },
    {
      company: '47Billion Information Technologies Pvt. Ltd.',
      role: 'Software Development Intern',
      location: 'Indore, India',
      period: 'Jun 2024 – Aug 2024',
      projects: [
        {
          slug: 'arvr-learning-experience',
          name: 'AR/VR Learning Experience',
          subtitle: 'Immersive WebXR learning module',
          tag: 'AR/VR',
          stack: ['React.js', 'Three.js', 'WebXR'],
          highlights: [
            'Built an immersive AR/VR learning experience using React.js, Three.js, and WebXR, implementing surface detection, object placement, and 3D model rendering.',
          ],
          case_study: {
            problem: 'Learners needed an immersive, spatial way to interact with 3D learning content directly in the browser.',
            role: 'Software Development Intern — built the AR/VR experience end-to-end.',
            architecture: [
              {
                title: 'Surface Detection & Placement',
                body: 'WebXR-based surface detection and object placement for anchoring content in physical space.',
              },
              {
                title: '3D Rendering',
                body: 'Three.js-driven 3D model rendering integrated into a React.js application shell.',
              },
            ],
          },
        },
        {
          slug: 'github-time-tracking-extension',
          name: 'GitHub Time-Tracking Chrome Extension',
          subtitle: 'One-click project time tracking on GitHub',
          tag: 'Dev Tooling',
          stack: ['JavaScript', 'Chrome Extension APIs'],
          highlights: [
            'Developed a Chrome extension using JavaScript and Chrome Extension APIs that enabled one-click project time tracking directly within GitHub pages.',
          ],
          case_study: {
            problem: 'Engineers had no lightweight way to track time against projects without leaving GitHub.',
            role: 'Software Development Intern — designed and built the extension solo.',
            architecture: [
              {
                title: 'Browser Integration',
                body: 'Chrome Extension APIs injected one-click time-tracking controls directly into GitHub pages.',
              },
            ],
          },
        },
      ],
    },
  ],

  projects: [
    {
      slug: '7seers-ai',
      name: '7Seers.ai',
      subtitle: 'AI-Powered Learning Management System',
      tag: 'AI / EdTech',
      stack: ['React.js', 'TypeScript', 'Redux', 'WebSocket', 'REST APIs', 'GenAI'],
      highlights: [
        'Built an AI-powered learning and mock-interview platform using component-based React architecture and Redux state management.',
        'Implemented real-time WebSocket communication for live AI-driven interview feedback and REST APIs for asynchronous assessment workflows.',
        'Developed reusable frontend components and integrated GenAI-powered assessment functionality.',
      ],
      case_study: {
        problem:
          'Learners needed adaptive, real-time feedback during mock interviews rather than static, one-size-fits-all assessments.',
        role: 'Built the platform using component-based React architecture and Redux state management.',
        architecture: [
          { title: 'Live Feedback Channel', body: 'Real-time WebSocket communication powering live AI-driven interview feedback.' },
          { title: 'Assessment API', body: 'REST APIs driving asynchronous, GenAI-powered assessment workflows.' },
          { title: 'Component System', body: 'Reusable frontend components built on a component-based React architecture with Redux state management.' },
        ],
      },
    },
    {
      slug: 'equipnet',
      name: 'EquipNet',
      subtitle: 'Medical Equipment Rental Platform',
      tag: 'Healthcare / Marketplace',
      stack: ['React.js', 'JavaScript', 'REST APIs', 'Google Maps API'],
      highlights: [
        'Shortlisted for the Google Solution Challenge India Regional Bootcamp 2024 for a full-stack medical equipment marketplace.',
        'Built a responsive React.js frontend with location-based search using Google Maps API and integrated third-party REST endpoints.',
      ],
      case_study: {
        problem: 'Healthcare providers and renters had no reliable way to discover nearby medical equipment.',
        role: 'Built the responsive React.js frontend and location-based search experience.',
        architecture: [
          { title: 'Location Search', body: 'Google Maps API-based location search for discovering nearby equipment.' },
          { title: 'API Integration', body: 'Third-party REST endpoints integrated into a responsive React.js frontend.' },
        ],
      },
    },
  ],

  certifications: [
    {
      name: 'Google Developer Student Clubs Lead',
      issuer: 'Medi-Caps University',
      period: '',
      points: ['Led a 15+ member team and organized Google Cloud, GenAI, and hands-on technical workshops and challenges.'],
    },
    {
      name: 'Hacktoberfest Open-Source Contributor',
      issuer: 'GitHub',
      period: '',
      points: ['Merged 6 pull requests across 10+ open-source React.js repositories, delivering feature additions and UI/UX improvements.'],
    },
    {
      name: 'Smart India Hackathon — Round 1 Qualifier',
      issuer: 'Smart India Hackathon',
      period: '2023',
      points: [],
    },
    {
      name: 'Programming in Java — Elite with Silver',
      issuer: 'NPTEL',
      period: '',
      points: [],
    },
  ],

  education: [
    {
      institution: 'Medi-Caps University',
      location: 'Indore, India',
      degree: 'B.Tech, Computer Science & Engineering — CGPA 9.1 / 10',
      period: '2021 – 2025',
    },
  ],
};

export const ALL_SKILLS = (() => {
  const seen = new Set();
  const flat = [];
  RESUME.skills.forEach((group) => {
    group.items.forEach((item) => {
      if (!seen.has(item)) {
        seen.add(item);
        flat.push(item);
      }
    });
  });
  return flat;
})();

export default RESUME;
