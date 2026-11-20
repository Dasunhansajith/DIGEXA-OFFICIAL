export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  filterCategories: string[];
  description: string;
  overview: string;
  features: string[];
  techStack: string[];
  websiteUrl?: string;
  image: string;
  gallery: string[];
  featured: boolean;
}

export const CATEGORY_FILTERS = [
  'SEE ALL',
  'E-COMMERCE',
  'BOOKING',
  'MAJOR PROJECTS',
  'EVENT PLATFORMS',
  'LIVE DASHBOARDS',
  'WEB APPLICATIONS',
] as const;

export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'exvo',
    slug: 'exvo',
    number: '01',
    title: 'EXVO',
    category: 'Event Management Platform',
    filterCategories: ['BOOKING', 'EVENT PLATFORMS', 'WEB APPLICATIONS'],
    description:
      'A next-generation digital event platform for discovering live experiences, exploring event categories, booking tickets, and managing events through modern organizer tools.',
    overview:
      'EXVO is an end-to-end event discovery, ticketing, and attendee management platform. Engineered with a high-speed responsive React interface and robust microservices architecture, it empowers event organizers with real-time ticket inventory, tiered visual seating plans, attendee check-in QR validation, and live attendance analytics.',
    features: [
      'Interactive event discovery catalog with real-time category filtering',
      'Tiered seating plan architecture and instant ticket booking engine',
      'Organizer dashboard with QR code check-in and attendee verification',
      'Live event analytics, ticket revenue monitoring, and capacity tracking',
      'Secure token-based authentication and user ticket wallet',
    ],
    techStack: [
      'React 19',
      'Vite 8',
      'Tailwind CSS',
      '.NET 8 Web API',
      'C#',
      'PostgreSQL',
      'Docker',
    ],
    image: '/images/projects/exvo.jpg',
    gallery: ['/images/projects/exvo.jpg'],
    featured: true,
  },
  {
    id: 'xchange',
    slug: 'xchange',
    number: '02',
    title: 'XCHANGE',
    category: 'E-Commerce Marketplace',
    filterCategories: ['E-COMMERCE', 'WEB APPLICATIONS'],
    description:
      'A modern multi-vendor digital marketplace connecting customers with products and services through intuitive shopping experiences, category navigation, and vendor-focused functionality.',
    overview:
      'XCHANGE is a multi-vendor digital commerce marketplace engineered to connect independent vendors, store operators, and shoppers in one fluid ecosystem. Featuring a modular product catalog, faceted search, cashier-level order handling, and vendor settlement portals, it ensures high-throughput transactional velocity.',
    features: [
      'Multi-vendor product catalog with real-time stock availability',
      'High-performance faceted search and category filtering',
      'Dedicated vendor management portal for sales, orders, and payouts',
      'Optimized frictionless checkout flow and transaction pipeline',
      'Granular inventory control and cashier POS operational workflows',
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Spring Boot',
      'Java',
      'Tailwind CSS',
    ],
    image: '/images/projects/xchange.jpg',
    gallery: ['/images/projects/xchange.jpg'],
    featured: true,
  },
  {
    id: 'titan-2026',
    slug: 'titan-2026',
    number: '03',
    title: 'TITAN 2026',
    category: 'Event Website / Robotics Competition',
    filterCategories: ['MAJOR PROJECTS', 'EVENT PLATFORMS', 'WEB APPLICATIONS'],
    description:
      'A cinematic robot combat competition website featuring event information, registration, countdown timers, prize showcases, competition rules, organizing partners, and interactive content.',
    overview:
      'TITAN 2026 is an adrenaline-fueled combat robotics competition website engineered with Three.js 3D interactive graphics and fluid GSAP choreography. It serves as the primary hub for competitor team registrations, arena specifications, rulebooks, prize pool showcases, and organizing partner highlights.',
    features: [
      'Interactive 3D combat robot model viewer with Three.js and React Three Fiber',
      'Live arena battle countdown and match scheduling timeline',
      'Automated competitor team registration and weight-class selector',
      'Tiered prize pool showcase and arena combat rulebook handbook',
      'Organizing partner highlights and responsive media gallery',
    ],
    techStack: [
      'React 19',
      'Three.js',
      'React Three Fiber',
      'GSAP ScrollTrigger',
      'Tailwind CSS',
      'Vite',
    ],
    image: '/images/projects/titan.jpg',
    gallery: ['/images/projects/titan.jpg'],
    featured: true,
  },
  {
    id: 'battle-of-the-greens-2026',
    slug: 'battle-of-the-greens-2026',
    number: '04',
    title: 'BATTLE OF THE GREENS 2026',
    category: 'Sports Website / Live Dashboard',
    filterCategories: ['MAJOR PROJECTS', 'LIVE DASHBOARDS', 'WEB APPLICATIONS'],
    description:
      'An interactive cricket event website featuring live scoreboards, batting and bowling statistics, match information, and a dynamic match center.',
    overview:
      'Battle of the Greens 2026 is a live cricket scoring dashboard and tournament hub. Built for high-frequency real-time match updates, it delivers ball-by-ball commentary, player performance statistics, interactive wagon wheels, and comprehensive tournament bracket tracking for sports spectators.',
    features: [
      'Real-time live cricket scoreboard with ball-by-ball commentary feeds',
      'Comprehensive batting strike rates, bowling economies, and fall of wickets',
      'Live tournament standings, match fixtures, and historical head-to-head records',
      'Mobile-optimized live spectator interface with low-latency updates',
      'Player profile cards with tournament statistics and milestones',
    ],
    techStack: [
      'React',
      'TypeScript',
      'WebSockets',
      'Tailwind CSS',
      'Vite',
    ],
    image: '/images/projects/battle-of-greens.jpg',
    gallery: ['/images/projects/battle-of-greens.jpg'],
    featured: true,
  },
];

export interface TallProject {
  id: string;
  slug?: string;
  name: string;
  category: string;
  filterCategories: string[];
  image: string;
}

export const TALL_PROJECTS: TallProject[] = [
  {
    id: 'exvo',
    slug: 'exvo',
    name: 'EXVO',
    category: 'EVENT MANAGEMENT PLATFORM',
    filterCategories: ['BOOKING', 'EVENT PLATFORMS', 'WEB APPLICATIONS'],
    image: '/images/projects/exvo-tall.jpg',
  },
  {
    id: 'xchange',
    slug: 'xchange',
    name: 'XCHANGE',
    category: 'E-COMMERCE MARKETPLACE',
    filterCategories: ['E-COMMERCE', 'FINANCIAL', 'WEB APPLICATIONS'],
    image: '/images/projects/xchange-tall.jpg',
  },
  {
    id: 'titan-2026',
    slug: 'titan-2026',
    name: 'TITAN 2026',
    category: 'EVENT WEBSITE',
    filterCategories: ['MAJOR PROJECTS', 'EVENT PLATFORMS', 'WEB APPLICATIONS'],
    image: '/images/projects/titan-tall.jpg',
  },
  {
    id: 'battle-of-the-greens-2026',
    slug: 'battle-of-the-greens-2026',
    name: 'BATTLE OF THE GREENS 2026',
    category: 'LIVE SPORTS DASHBOARD',
    filterCategories: ['MAJOR PROJECTS', 'LIVE DASHBOARDS', 'WEB APPLICATIONS'],
    image: '/images/projects/battle-of-greens-tall.jpg',
  },
];
