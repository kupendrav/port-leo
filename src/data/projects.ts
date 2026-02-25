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
  // ── Web3 ──
  {
    title: 'cryptX',
    description: 'Experiments in crypto dashboards and transaction flows with TypeScript.',
    tech: ['TypeScript', 'Web3'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/cryptX' },
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
