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

export const DOMAIN_ORDER = ['Open Source', 'AI / ML', 'Full-stack', 'Cybersecurity', 'Web3'] as const

export const projects: Project[] = [
  // Open source and developer tooling
  {
    title: 'Tessera.io',
    description:
      'Open-source collaborative developer sandbox fork focused on real-time CRDT synchronization and secure remote code execution for human-AI pair programming.',
    tech: ['TypeScript', 'CRDT', 'Remote Execution', 'Open Source'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/Tessera.io' },
    ],
    domain: 'Open Source',
  },
  {
    title: 'port-leo',
    description:
      'Personal portfolio website inspired by a space theme, built in TypeScript with polished motion, SEO metadata, and project storytelling.',
    tech: ['TypeScript', 'React', 'Vite', 'SEO'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/port-leo' },
      { label: 'Live', href: 'https://kupendra.netlify.app/' },
    ],
    domain: 'Open Source',
  },
  // AI / ML
  {
    title: 'AI-Powered-Customer-Churn-Prediction-Platform',
    description:
      'ChurnAI platform for customer churn prediction, combining machine-learning workflows with a TypeScript product interface.',
    tech: ['TypeScript', 'Machine Learning', 'MLOps', 'SaaS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/AI-Powered-Customer-Churn-Prediction-Platform' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'ai-heart-disease-prediction',
    description:
      'Healthcare AI project for heart-disease prediction with an HTML interface and machine-learning project structure.',
    tech: ['HTML', 'Machine Learning', 'Healthcare AI'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/ai-heart-disease-prediction' },
      { label: 'Live', href: 'https://heart-ai.up.railway.app/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'Lifeline_ai_prediction',
    description:
      'Jupyter Notebook healthcare prediction project exploring AI-assisted lifeline and health-risk analysis.',
    tech: ['Jupyter Notebook', 'Python', 'AI', 'Healthcare AI'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/Lifeline_ai_prediction' },
      { label: 'Live', href: 'https://lifeline-ai.up.railway.app/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'ai-loan-prediction-system',
    description:
      'Python loan prediction system for classification and risk analysis across structured financial data.',
    tech: ['Python', 'Machine Learning', 'Loan Prediction'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/ai-loan-prediction-system' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'ProfileGuard-AI',
    description:
      'AI toolkit that protects, diagnoses, and reinstates Google Business Profiles from algorithmic suspensions and technical glitches.',
    tech: ['TypeScript', 'AI Agents', 'Automation'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/ProfileGuard-AI' },
      { label: 'Live', href: 'https://kupendrav.github.io/ProfileGuard-AI/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'code-reviewer-pro',
    description:
      'AI-powered code reviewer for code analysis, best-practice feedback, and developer productivity workflows.',
    tech: ['JavaScript', 'AI', 'Code Analysis'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/code-reviewer-pro' },
      { label: 'Live', href: 'https://codepro-mu.vercel.app/' },
    ],
    domain: 'AI / ML',
  },
  {
    title: 'AI-image-enhancer',
    description:
      'AI-powered image enhancement project for improving image quality through a lightweight JavaScript interface.',
    tech: ['JavaScript', 'AI', 'Image Processing'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/AI-image-enhancer' },
      { label: 'Live', href: 'https://ai-image-enhancer-gamma.vercel.app' },
    ],
    domain: 'AI / ML',
  },
  // Full-stack
  {
    title: 'pro-pdfs',
    description:
      'Open-source online PDF toolkit for conversion and processing workflows, published as a 100% free web tool.',
    tech: ['TypeScript', 'PDF', 'React', 'Open Source'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/pro-pdfs' },
      { label: 'Live', href: 'https://propdfs.netlify.app/' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'Glowlogics-Book-Store',
    description:
      'Mini project bookstore application with Java, Docker, Spring Boot topics, and a deployed Render instance.',
    tech: ['JavaScript', 'Spring Boot', 'Docker', 'Render'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/Glowlogics-Book-Store' },
      { label: 'Live', href: 'https://glowlogics-book-store.onrender.com' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'Glowlogics-Store',
    description:
      'Major e-commerce project using Spring Boot, Docker Compose, and SQLite-backed workflows for store operations.',
    tech: ['Java', 'Spring Boot', 'Docker Compose', 'SQLite'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/Glowlogics-Store' },
      { label: 'Live', href: 'https://glowlogics-store.onrender.com' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'Glowlogics-Learning-platform',
    description:
      'Learning platform project built with Java, Spring Boot patterns, Docker Compose, and Glowlogics product modules.',
    tech: ['Java', 'Spring Boot', 'Docker Compose'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/Glowlogics-Learning-platform' },
      { label: 'Live', href: 'https://glowlogics-learning-platform.onrender.com' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'studX',
    description:
      'Bus pass management system with TypeScript workflows for students and administrators.',
    tech: ['TypeScript', 'React', 'Full-stack'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/studX' },
      { label: 'Live', href: 'https://stud-x.vercel.app/' },
    ],
    domain: 'Full-stack',
  },
  {
    title: 'tjohn-hackathon',
    description:
      'Hackathon job platform connecting talent with opportunity through a modern full-stack TypeScript interface.',
    tech: ['TypeScript', 'Full-stack', 'Job Search'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/tjohn-hackathon' },
      { label: 'Live', href: 'https://tjohn-hackathon.vercel.app/' },
    ],
    domain: 'Full-stack',
  },
  // Cybersecurity
  {
    title: 'SecureAudit',
    description:
      'Security toolkit for cookie policy linting, payment webhook verification review, and exportable compliance audit logs.',
    tech: ['TypeScript', 'Security', 'Automation', 'Compliance'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/SecureAudit' },
      { label: 'Live', href: 'https://secure-audit-delta.vercel.app' },
    ],
    domain: 'Cybersecurity',
  },
  {
    title: 'AI-PUPPY-RAFFLE-CodeHawks',
    description:
      'Solidity CodeHawks security challenge repository for smart-contract vulnerability review and audit practice.',
    tech: ['Solidity', 'Security', 'Smart Contracts'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/AI-PUPPY-RAFFLE-CodeHawks' },
    ],
    domain: 'Cybersecurity',
  },
  // Web3
  {
    title: 'HealthChain',
    description:
      'Secure healthcare application exploring blockchain technology, data-science patterns, and health data workflows.',
    tech: ['Python', 'Security', 'Data Science', 'Blockchain'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/HealthChain' },
      { label: 'Live', href: 'https://kupendrav.github.io/HealthChain/' },
    ],
    domain: 'Web3',
  },
  {
    title: 'cryptX',
    description:
      'Encrypted text guessing game experimenting with Web3 themes, encryption, and TypeScript interaction design.',
    tech: ['TypeScript', 'Web3', 'Encryption'],
    links: [
      { label: 'GitHub', href: 'https://github.com/kupendrav/cryptX' },
      { label: 'Live', href: 'https://cryptgame.netlify.app/' },
    ],
    domain: 'Web3',
  },
]
