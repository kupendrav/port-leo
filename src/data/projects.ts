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

export const DOMAIN_ORDER = ['Full-stack', 'AI / ML', 'Web3'] as const

export const projects: Project[] = [
  // ── Full-stack ──
  {
    title: 'pro-pdfs',
    description: 'Professional PDF generation and management tool for creating polished documents with full-stack architecture.',
    tech: ['TypeScript', 'React', 'Node.js', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/pro-pdfs' },
      { label: 'Live', href: 'https://propdfs.netlify.app/' },
    ],
    domain: 'Full-stack',
  },
  {
    title: '365-smiles',
    description: 'Habit and gratitude tracker built for logging daily wins and small joys across the year.',
    tech: ['TypeScript', 'React', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/365-smiles' },
      { label: 'Live', href: 'https://365-smiles.vercel.app/' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'studX',
    description: 'Bus pass management system with streamlined flows for students and admins—deployed in production.',
    tech: ['TypeScript', 'React', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/studX' },
      { label: 'Live', href: 'https://stud-x.vercel.app/' },
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
  // ── AI / ML ──
  {
    title: 'code-reviewer-pro',
    description: 'AI-powered code review tool analyzing code for best practices, bugs, and improvements using LLMs.',
    tech: ['TypeScript', 'React', 'AI', 'LLM', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/code-reviewer-pro' },
      { label: 'Live', href: 'https://codepro-mu.vercel.app/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'ProfileGuard-AI',
    description: 'AI-driven platform that diagnoses and reinstates suspended Google Business Profiles with actionable fixes.',
    tech: ['TypeScript', 'AI Ops', 'LLM', 'Automation'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/ProfileGuard-AI' },
      { label: 'Live', href: 'https://kupendrav.github.io/ProfileGuard-AI/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'natasha-ai',
    description: 'AI-powered conversational assistant with modern web technologies and LLM integration.',
    tech: ['TypeScript', 'React', 'AI', 'LLM'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/natasha-ai-copy' },
      { label: 'Live', href: 'https://kupendrav.github.io/natasha-ai-copy/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'AI-image-enhancer',
    description: 'JavaScript-based image enhancer using AI-driven filters for progressive image quality improvement.',
    tech: ['JavaScript', 'AI', 'Image Processing'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/AI-image-enhancer' },
      { label: 'Live', href: 'https://ai-image-enhancer-gamma.vercel.app/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'Capestone-project-Kaggle-x-Google',
    description: 'Data science capstone notebook demonstrating ML workflows and statistical analysis from Kaggle Google collaboration.',
    tech: ['Python', 'Data Science', 'Pandas', 'ML'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/Capestone-project-Kaggle-x-Google-' },
    ],
    domain: 'AI / ML',
  },
  // ── Web3 ──
  {
    title: 'HealthChain',
    description: 'Decentralized health management application tracking health data on blockchain with Web3 integration.',
    tech: ['TypeScript', 'React', 'Web3', 'Blockchain'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/HealthChain' },
      { label: 'Live', href: 'https://kupendrav.github.io/HealthChain/' },
    ],
    domain: 'Web3',
  },
  {
    title: 'cryptX',
    description: 'Crypto dashboard experiments with transaction flows and Web3 primitives in TypeScript.',
    tech: ['TypeScript', 'Web3', 'React'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/cryptX' },
      { label: 'Live', href: 'https://cryptgame.netlify.app/' },
    ],
    domain: 'Web3',
  },
]
