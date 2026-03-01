export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  description: string
  tech: string[]
  links: ProjectLink[]
  domain: string
}

export const DOMAIN_ORDER = ['Full-stack', 'AI / ML', 'Web3', 'Cybersecurity'] as const

export const projects: Project[] = [
  // ── Full-stack ──
  {
    title: '365-smiles',
    description: 'Habit and gratitude tracker built to log daily wins and small joys across the year.',
    tech: ['TypeScript', 'React', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/365-smiles' },
      { label: 'Live', href: 'https://365-smiles.vercel.app/' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'studX',
    description: 'Bus pass management system with a streamlined flow for students and admins.',
    tech: ['TypeScript', 'React'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/studX' },
      { label: 'Live', href: 'https://stud-x.vercel.app/' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'pro-pdfs',
    description: 'Professional PDF generation and management tool for creating polished documents.',
    tech: ['TypeScript', 'React', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/pro-pdfs' },
      { label: 'Live', href: 'https://propdfs.netlify.app/' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'job-seekz',
    description: 'Job seeking platform built during a hackathon to connect job seekers with opportunities.',
    tech: ['TypeScript', 'React', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/tjohn-hackathon' },
      { label: 'Live', href: 'https://tjohn-hackathon.vercel.app/' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'food-lovers',
    description: 'A food enthusiast web page showcasing recipes, restaurants, and culinary experiences.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/my_web_page_miniproject' },
      { label: 'Live', href: 'https://kupendrav.github.io/my_web_page_miniproject/' },
    ],
    domain: 'Full-stack',
  },
  // ── AI / ML ──
  {
    title: 'ProfileGuard-AI',
    description:
      'AI assistant that protects and reinstates Google Business Profiles by diagnosing suspensions and generating fixes.',
    tech: ['TypeScript', 'AI Ops', 'Automation'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/ProfileGuard-AI' },
      { label: 'Live', href: 'https://kupendrav.github.io/ProfileGuard-AI/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'natasha-ai',
    description: 'AI-powered conversational assistant built with modern web technologies.',
    tech: ['TypeScript', 'React', 'AI'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/natasha-ai-copy' },
      { label: 'Live', href: 'https://kupendrav.github.io/natasha-ai-copy/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'AI-image-enhancer',
    description: 'JavaScript-based enhancer for improving images with AI-driven filters.',
    tech: ['JavaScript', 'AI'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/AI-image-enhancer' },
      { label: 'Live', href: 'https://ai-image-enhancer-gamma.vercel.app/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'Capestone-project-Kaggle-x-Google',
    description: 'Notebook-driven capstone for data insights in the Kaggle x Google collaboration.',
    tech: ['Python', 'Data'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/Capestone-project-Kaggle-x-Google-' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'code-reviewer-pro',
    description: 'AI-powered code review tool that analyzes code for best practices, bugs, and improvements.',
    tech: ['TypeScript', 'AI', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/code-reviewer-pro' },
      { label: 'Live', href: 'https://codepro-mu.vercel.app/' },
    ],
    domain: 'AI / ML',
  },
  // ── Web3 ──
  {
    title: 'cryptX',
    description: 'Experiments in crypto dashboards and transaction flows with TypeScript.',
    tech: ['TypeScript', 'Web3'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/cryptX' },
      { label: 'Live', href: 'https://cryptgame.netlify.app/' },
    ],
    domain: 'Web3',
  },
  {
    title: 'HealthChain',
    description: 'Health management application for tracking and managing health-related data on the blockchain.',
    tech: ['TypeScript', 'React', 'Web3'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/HealthChain' },
      { label: 'Live', href: 'https://kupendrav.github.io/HealthChain/' },
    ],
    domain: 'Web3',
  },
  // ── Cybersecurity ──
  {
    title: 'SecureAudit',
    description:
      'Security toolkit for policy linting, payment webhook verification, and exportable audit logs focused on compliance.',
    tech: ['TypeScript', 'Security', 'Automation'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/SecureAudit' },
    ],
    domain: 'Cybersecurity',
  },
  {
    title: 'CodeHawks-Token-0x',
    description: 'Solidity token challenge work from CodeHawks with an emphasis on secure contracts.',
    tech: ['Solidity', 'Security'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/CodeHawks-Token-0x' },
    ],
    domain: 'Cybersecurity',
  },
]
