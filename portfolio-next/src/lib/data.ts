import type { CommunityRole, Project, SkillGroup, TimelineItem } from "./types";

export const site = {
  name: "Jawad Hossain Mahi",
  role: "Full Stack Developer",
  tagline: "I build scalable, user-centric web apps — from a Laravel-leaning backend to a React/Next.js frontend — and ship real products, not just demos.",
  location: "Narayanganj, Bangladesh",
  email: "jawadhossainmahi@gmail.com",
  phone: "+8801820245632",
  phoneDisplay: "+880 1820-245632",
  github: "https://github.com/jawadhossainmahi",
  linkedin: "https://www.linkedin.com/in/jawadhossainmahi/",
  resumeHref: "/resume.pdf",
} as const;

export const projects: Project[] = [
  {
    id: "eduself",
    title: "EduSelf",
    role: "Founder & Full Stack Developer",
    summary:
      "A multi-school, multi-branch School Management Software product, live in production.",
    problem:
      "Institutions running academics, HRM, accounting, exams, and student portals across separate spreadsheets and disconnected tools, with no single system covering a whole school — let alone multiple branches.",
    solution:
      "Designed and built a full School Management System covering Core, HRM, Accounting, Frontend, Academic, and Exam modules with student dashboards and secure authentication. Currently developing a dynamic React + TypeScript frontend module consuming Laravel REST APIs for real-time academic, accounting, and student data with type-safe, reusable components.",
    tech: ["Laravel", "React.js", "TypeScript", "Bootstrap", "jQuery", "Yajra DataTable", "REST APIs"],
    live: "https://eduself.top",
    github: "https://github.com/Eduself-V2",
    flagship: true,
    team: "Built with a 2-person core dev team",
    icon: "school",
  },
  {
    id: "webshinez",
    title: "Webshinez Technologies",
    role: "Frontend Developer",
    summary: "The company's public-facing website — responsive, animation-rich, built for a polished first impression.",
    problem: "Webshinez needed a company site that reflected the quality of the software it builds — fast, modern, and visually confident, not a generic template.",
    solution: "Built a responsive, animation-rich site with React.js, Tailwind CSS, and GSAP, using LightGallery for optimized media presentation across the site.",
    tech: ["React.js", "Tailwind CSS", "GSAP", "LightGallery"],
    live: "https://webshinez.com",
    icon: "briefcase",
  },
  {
    id: "markaj",
    title: "Markaj U Talimis Sunnah",
    role: "Full Stack Developer",
    summary: "A full-stack institutional platform with a rich, interactive frontend.",
    problem: "The institution needed a public platform with rich UI/UX (carousels, galleries) backed by a proper content and data layer, not a static brochure site.",
    solution: "Built a Vite + React.js frontend backed by a Laravel API, using Bootstrap, jQuery, Swiper, and Owl Carousel for a rich, interactive UI/UX.",
    tech: ["React.js", "Vite", "Laravel", "Bootstrap", "jQuery", "Swiper", "Owl Carousel"],
    icon: "building",
  },
  {
    id: "grocery-cpp",
    title: "Grocery Shop Management System",
    role: "Data Structures Course Project",
    summary: "A console-based inventory and order management system built entirely on singly linked lists.",
    problem: "Model a real inventory/order workflow using dynamic, memory-efficient data structures instead of static arrays — a core Data Structures course project.",
    solution: "Implemented product CRUD, ID-based search, a shopping-cart workflow, end-to-end order tracking, and persistent file handling for products, employees, customers, and orders — all on singly linked lists.",
    tech: ["C++", "Linked Lists", "File Handling"],
    github: "https://github.com/jawadhossainmahi/grocery_shop_management_in_cpp",
    icon: "cart",
  },
];

export const skillGroups: SkillGroup[] = [
  { label: "Languages", icon: "code", skills: ["C", "C++", "Python", "JavaScript", "PHP"] },
  { label: "Frontend", icon: "layout", skills: ["React.js", "Next.js", "Angular.js", "Tailwind CSS", "Bootstrap", "GSAP"] },
  { label: "Backend", icon: "server", skills: ["Laravel", "CodeIgniter", "FastAPI", "REST APIs"] },
  { label: "Databases & Realtime", icon: "database", skills: ["MySQL", "MongoDB", "WebSockets", "Laravel Reverb"] },
  { label: "Tools & Libraries", icon: "wrench", skills: ["Git", "jQuery", "Yajra DataTable", "Axios", "AJAX", "Popper.js", "Livewire"] },
  { label: "Mobile", icon: "smartphone", skills: ["Flutter (basic)"] },
];

export const timeline: TimelineItem[] = [
  {
    period: "2023 — Present",
    title: "Full Stack Developer",
    org: "Webshinez Technologies",
    desc: "Developing and maintaining dynamic web applications spanning frontend (React.js/Vite) and backend (Laravel) work, ensuring efficient performance and scalability.",
  },
  {
    period: "2024 — 2028",
    title: "B.Sc. in Computer Science & Engineering",
    org: "Green University of Bangladesh",
    desc: "Currently in 2nd year. CGPA: 3.49.",
  },
  {
    period: "2023",
    title: "Higher Secondary Certificate — Science",
    org: "Narayanganj College",
    desc: "GPA 4.83 / 5.0.",
  },
  {
    period: "2021",
    title: "Secondary School Certificate — Science",
    org: "Adarsha School",
    desc: "GPA 4.83 / 5.0.",
  },
];

export const community: CommunityRole[] = [
  {
    org: "GUCC",
    orgFull: "Green University Computer Club",
    role: "Programming & Development Secretary — 2026 Executive Committee",
    url: "https://gucc.green.edu.bd",
    points: [
      "Serving on the 2026 executive committee, leading programming initiatives and maintaining the official GUCC website.",
      "Personally built and shipped a dynamic Form Builder feature for event registrations.",
      "Anchored the Inauguration Program and the Farewell Program on stage, and helped plan, coordinate, and volunteer across other club events.",
    ],
  },
  {
    org: "GUBCPC",
    orgFull: "GUB Competitive Programming Community",
    role: "Web & Dashboard Contributor",
    url: "https://gubcpc.com",
    points: [
      "Helped build and maintain the GUBCPC website, enhancing the UI and the backend admin dashboard.",
      "Volunteered at community events including the July Memorial Programming Contest 2026.",
    ],
  },
];

export const achievement = "2nd Place — Green University Inter-Department Programming Contest";

export const languages = [
  { name: "Bengali", level: "Native" },
  { name: "English", level: "Conversational" },
  { name: "Hindi", level: "Conversational" },
];
