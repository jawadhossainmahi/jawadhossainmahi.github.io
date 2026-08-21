// Single source of truth for all portfolio content.
// Every fact here is sourced directly from Jawad's CV — nothing invented.
// Fields left empty/placeholder are intentionally editable rather than guessed.

export interface Project {
  id: string
  order: string
  name: string
  tagline: string
  role: string
  description: string[]
  tech: string[]
  live?: string
  github?: string
  accent: 'mint' | 'violet' | 'sky' | 'amber'
  featured: boolean
}

export interface ExperienceEntry {
  company: string
  role: string
  location: string
  period: string
  bullets: string[]
  tech: string[]
}

export interface LeadershipEntry {
  org: string
  role: string
  meta: string
  url?: string
  bullets: string[]
}

export interface FocusArea {
  title: string
  description: string
  tags: string[]
}

export interface Stat {
  label: string
  value: number
  suffix: string
  decimals?: number
}

const RESUME_URL = '/Jawad_Hossain_Mahi_Resume.pdf'

export const portfolio = {
  personal: {
    name: 'Jawad Hossain Mahi',
    title: 'Full Stack Developer & Product Builder',
    subtitle: 'CS Undergraduate at Green University of Bangladesh',
    location: 'Narayanganj, Bangladesh',
    email: 'jawadhossainmahi@gmail.com',
    phone: '+880 1820-245632',
    availability: 'Available for opportunities',
  },

  hero: {
    eyebrow: 'Available for opportunities',
    headingLines: ['FULL STACK', 'DEVELOPER', '& PRODUCT BUILDER'],
    description:
      "I build scalable web products, school and business management systems, and modern full-stack applications — from Laravel backends to type-safe React frontends.",
    primaryCta: { label: 'Explore My Work', href: '#work' },
    secondaryCta: { label: 'Download CV', href: RESUME_URL },
  },

  stats: [
    { label: 'Public Repositories', value: 44, suffix: '' },
    { label: 'GitHub Organizations', value: 3, suffix: '' },
    { label: 'Current CGPA', value: 3.49, suffix: '', decimals: 2 },
    { label: 'Pull Shark Achievement', value: 2, suffix: '×' },
  ] satisfies Stat[],

  about: {
    eyebrow: 'About',
    heading: "I build software that solves real operational problems.",
    paragraphs: [
      "Resourceful full-stack developer with hands-on industry experience building scalable, user-centric web applications, and a founder's mindset — currently building EduSelf, a multi-school management software product live in production.",
      "Proficient across the full stack, from responsive frontends with React.js, Next.js and Tailwind CSS to robust backends with Laravel and CodeIgniter. Blends strong data structures & algorithms fundamentals with real-world product delivery and active university tech leadership.",
    ],
    pillars: [
      { label: 'Frontend', detail: 'React.js, Next.js, TypeScript, Tailwind CSS' },
      { label: 'Backend', detail: 'Laravel, CodeIgniter, REST APIs, FastAPI' },
      { label: 'Architecture', detail: 'Multi-tenant systems, service/repository layers' },
      { label: 'Product', detail: "Founder of EduSelf — live in production" },
    ],
  },

  focus: [
    {
      title: 'SaaS Platforms',
      description:
        'Multi-tenant, multi-branch products designed and shipped end-to-end — from data model to production deployment.',
      tags: ['EduSelf', 'CommerceFlow', 'Multi-tenant architecture'],
    },
    {
      title: 'Business & Institutional Systems',
      description:
        'Core, HRM, accounting, academic and exam modules built for real organizations with secure authentication and role-based access.',
      tags: ['HRM', 'Accounting', 'Academic Systems', 'Role-based access'],
    },
    {
      title: 'APIs & Integrations',
      description:
        'Dashboard-driven systems where admin panels control public-facing sites automatically — no manual syncing required.',
      tags: ['REST APIs', 'Google Sheets API', 'Dynamic API integration'],
    },
    {
      title: 'Real-Time & Backend Systems',
      description:
        'Backend services built for performance and scale, from real-time channels to type-safe data layers.',
      tags: ['WebSockets', 'Laravel Reverb', 'FastAPI'],
    },
  ] satisfies FocusArea[],

  skills: {
    Languages: ['C', 'C++', 'Python', 'JavaScript', 'PHP'],
    Frameworks: ['React.js', 'Next.js', 'Angular.js', 'Laravel', 'CodeIgniter', 'Flutter (basic)'],
    Styling: ['Tailwind CSS', 'Bootstrap', 'GSAP', 'LightGallery', 'Swiper', 'Owl Carousel'],
    Tools: ['Git', 'Axios', 'AJAX', 'jQuery', 'Popper.js', 'Livewire', 'Yajra DataTable'],
    Databases: ['MySQL', 'MongoDB'],
    Other: ['WebSockets', 'Laravel Reverb', 'FastAPI', 'REST APIs'],
  },

  projects: [
    {
      id: 'eduself',
      order: '01',
      name: 'EduSelf',
      tagline: 'Multi-School Management Software',
      role: 'Founder & Full Stack Developer',
      description: [
        'Designed and built a full multi-school, multi-branch School Management System covering Core, HRM, Accounting, Frontend, Academic, and Exam modules with student dashboards and secure authentication.',
        'Now developing a dynamic React + TypeScript frontend module consuming Laravel REST APIs for real-time academic, accounting, and student data with type-safe, reusable components.',
      ],
      tech: ['Laravel', 'React.js', 'TypeScript', 'Bootstrap', 'jQuery', 'Yajra DataTable', 'REST APIs'],
      live: 'https://eduself.top',
      accent: 'mint',
      featured: true,
    },
    {
      id: 'commerceflow',
      order: '02',
      name: 'CommerceFlow',
      tagline: 'AI-Powered Multi-Tenant Retail ERP',
      role: 'Full Stack Developer',
      description: [
        'Built a multi-tenant, multi-branch retail ERP combining a customer storefront, role-aware admin dashboard, POS terminal, and inventory management on one layered Service → Repository data architecture.',
        'Implemented an AI shopping/business assistant that recommends products and surfaces real sales and inventory insights, using the Anthropic SDK with a local rule-based fallback when no API key is configured.',
        'Designed a branch- and role-based permission system (Super Admin down to Cashier/Delivery Staff) enforced centrally in the service layer, and covered the core scoping logic with Vitest unit tests.',
      ],
      tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Recharts', 'React Hook Form', 'Zod', 'TanStack Table', 'Anthropic SDK'],
      live: 'https://ai-ecommerce-site-eta.vercel.app',
      github: 'https://github.com/jawadhossainmahi/ai-ecommerce-site',
      accent: 'violet',
      featured: true,
    },
    {
      id: 'gubcpc-iupc',
      order: '03',
      name: 'GUBCPC IUPC 2026',
      tagline: 'Contest Registration Platform',
      role: 'Full Stack Developer',
      description: [
        'Built the IUPC 2026 contest website, dynamically connected to the GUBCPC.com backend via contest slug and API key so admins fully control contest details from a single dashboard.',
        'Implemented the integration so admins create a contest on the GUBCPC admin panel and it automatically drives registration, content, and status on the public IUPC site — no manual syncing required.',
      ],
      tech: ['React', 'Next.js', 'Dynamic API Integration'],
      live: 'https://gubcpc-iupc-2026.vercel.app',
      accent: 'sky',
      featured: true,
    },
    {
      id: 'gucc-form-builder',
      order: '04',
      name: 'GUCC Form Builder',
      tagline: 'Dynamic Form Builder & Sponsors Page',
      role: 'Full Stack Developer',
      description: [
        'Designed and built a dynamic Form Builder for the GUCC website that lets admins create custom event/registration forms (Google Forms-style) and auto-generates a shareable registration link for each form.',
        'Integrated the Form Builder with Google Sheets so submitted responses sync automatically for easy tracking and reporting.',
        'Built the GUCC Sponsors page to showcase club sponsors and partners on the official site.',
      ],
      tech: ['Web Platform Development', 'Google Sheets API'],
      live: 'https://gucc.green.edu.bd',
      accent: 'amber',
      featured: true,
    },
    {
      id: 'grocery-cpp',
      order: '05',
      name: 'Grocery Shop Management',
      tagline: 'Inventory & Order Management System',
      role: 'Data Structures Course Project',
      description: [
        'Built a console-based inventory and order management system entirely on singly linked lists instead of static arrays, for dynamic, memory-efficient data handling.',
        'Implemented product CRUD, ID-based search, a shopping-cart workflow, end-to-end order tracking, and persistent file handling for products, employees, customers, and orders.',
      ],
      tech: ['C++', 'Linked Lists', 'File Handling'],
      github: 'https://github.com/jawadhossainmahi/grocery_shop_management_in_cpp',
      accent: 'sky',
      featured: false,
    },
    {
      id: 'webshinez',
      order: '06',
      name: 'Webshinez Technologies',
      tagline: 'Company Website',
      role: 'Frontend Developer',
      description: [
        'Designed and built a responsive, animation-rich company website with a smooth, polished user experience.',
      ],
      tech: ['React.js', 'Tailwind CSS', 'GSAP', 'LightGallery'],
      live: 'https://webshinez.com',
      accent: 'violet',
      featured: false,
    },
  ] satisfies Project[],

  experience: [
    {
      company: 'Webshinez Technologies',
      role: 'Software Developer',
      location: 'Narayanganj, Bangladesh',
      period: 'Current',
      bullets: [
        'Developing and maintaining EduSelf — a multi-school, multi-branch School Management Software — alongside Webshinez Technologies\' own client-facing websites.',
        'Built Markaj U Talimis Sunnah, a full-stack institutional platform (Vite + React.js frontend, Laravel backend) with Bootstrap, jQuery, Swiper, and Owl Carousel for a rich UI/UX.',
        'Contributed to EduSelf LMS, a Laravel-based multi-school, multi-branch system covering authentication, academics, accounting, exams, homework, HRM, and student portals.',
        'Developed and maintained dynamic web applications ensuring efficient performance and scalability, spanning both frontend and backend work.',
      ],
      tech: ['Laravel', 'React.js', 'TypeScript', 'Bootstrap', 'jQuery', 'Swiper', 'Owl Carousel'],
    },
  ] satisfies ExperienceEntry[],

  leadership: [
    {
      org: 'Green University Computer Club (GUCC)',
      role: 'Programming & Development Secretary',
      meta: '2026 Executive Committee',
      url: 'https://gucc.green.edu.bd',
      bullets: [
        'Serve on the 2026 executive committee, leading programming initiatives and development activities for the club, and actively contribute to club projects on the GUCC GitHub organization.',
        'Maintain and continuously improve the official GUCC website, including building the Form Builder feature (with Google Sheets sync) and the Sponsors page.',
        'Anchored the Inauguration Program and the Farewell Program on stage, and helped plan, coordinate, and volunteer across other club events.',
      ],
    },
    {
      org: 'Green University Bangladesh Competitive Programming Club (GUBCPC)',
      role: 'Web & Dashboard Contributor',
      meta: 'gubcpc.com',
      url: 'https://gubcpc.com',
      bullets: [
        'Helped maintain the GUBCPC website, enhancing the UI and improving the backend admin dashboard.',
        'Built the GUBCPC IUPC 2026 contest platform with dynamic API-driven integration to the main GUBCPC admin backend.',
        'Volunteered at community events including the July Memorial Programming Contest 2026.',
      ],
    },
  ] satisfies LeadershipEntry[],

  achievements: [
    { label: '2nd Place', detail: 'Green University Inter-Department Programming Contest' },
    { label: '44', detail: 'Public Repositories on GitHub' },
    { label: '3', detail: 'GitHub Organizations' },
    { label: 'Pull Shark ×2', detail: 'GitHub Achievement' },
    { label: "Active since '22", detail: 'Consistent Contributor on GitHub' },
  ],

  education: {
    degree: {
      institution: 'Green University of Bangladesh',
      program: 'B.Sc. in Computer Science & Engineering',
      period: 'September 2024 – September 2028',
      status: 'Currently in 2nd Year (Ongoing)',
      score: 'CGPA 3.49',
    },
    prior: [
      { institution: 'Narayanganj College', program: 'Higher Secondary Certificate (HSC)', period: '2023', score: 'GPA 4.83 / 5.00' },
      { institution: 'Adarsha School', program: 'Secondary School Certificate (SSC)', period: '2021', score: 'GPA 4.83 / 5.00' },
    ],
    coursework: [
      'Data Structures & Lab — A+',
      'Algorithms & Lab — A+ / A-',
      'Database & Lab — A- / A+',
      'Object Oriented Programming — A',
      'Structured Programming & Lab — A+',
    ],
  },

  languages: [
    { name: 'Bengali', level: 'Native' },
    { name: 'English', level: 'Conversational' },
    { name: 'Hindi', level: 'Conversational' },
  ],

  social: {
    github: 'https://github.com/jawadhossainmahi',
    linkedin: 'https://linkedin.com/in/jawadhossainmahi',
    facebook: 'https://facebook.com/jawadhossainmahi',
    portfolio: 'https://jawadhossainmahi.vercel.app',
    email: 'mailto:jawadhossainmahi@gmail.com',
  },

  contact: {
    eyebrow: "Let's talk",
    headingLines: ['LET\'S BUILD', 'SOMETHING', 'USEFUL.'],
    description: 'Have a product, platform, or engineering problem in mind? I\'m open to new opportunities and collaborations.',
  },

  resumeUrl: RESUME_URL,
}

export type Portfolio = typeof portfolio
