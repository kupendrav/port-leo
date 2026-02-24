export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  description: string
  tech: string[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    title: 'SecureAudit',
    description:
      'Security toolkit for policy linting, payment webhook verification, and exportable audit logs focused on compliance.',
    tech: ['TypeScript', 'Security', 'Automation'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/SecureAudit' },
    ],
  },
  {
    title: 'ProfileGuard-AI',
    description:
      'AI assistant that protects and reinstates Google Business Profiles by diagnosing suspensions and generating fixes.',
    tech: ['TypeScript', 'AI Ops', 'Automation'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/ProfileGuard-AI' },
    ],
  },
  {
    title: '365-smiles',
    description: 'Habit and gratitude tracker built to log daily wins and small joys across the year.',
    tech: ['TypeScript', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/365-smiles' },
    ],
  },
  {
    title: 'studX',
    description: 'Bus pass management system with a streamlined flow for students and admins.',
    tech: ['TypeScript', 'React'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/studX' },
    ],
  },
  {
    title: 'cryptX',
    description: 'Experiments in crypto dashboards and transaction flows with TypeScript.',
    tech: ['TypeScript', 'Web3'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/cryptX' },
    ],
  },
  {
    title: 'CodeHawks-Token-0x',
    description: 'Solidity token challenge work from CodeHawks with an emphasis on secure contracts.',
    tech: ['Solidity', 'Security'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/CodeHawks-Token-0x' },
    ],
  },
  {
    title: 'AI-image-enhancer',
    description: 'JavaScript-based enhancer for improving images with AI-driven filters.',
    tech: ['JavaScript', 'AI'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/AI-image-enhancer' },
    ],
  },
  {
    title: 'Capestone-project-Kaggle-x-Google',
    description: 'Notebook-driven capstone for data insights in the Kaggle x Google collaboration.',
    tech: ['Python', 'Data'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/Capestone-project-Kaggle-x-Google-' },
    ],
  },
]
