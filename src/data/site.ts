export const cvUrl = '/cv.pdf'
export const contactEmail = 'kupendravr@zohomail.in'

export const socialLinks = {
  github: 'https://github.com/kupendrav',
  linkedin: 'https://www.linkedin.com/in/kupendrav99/',
}

// Google Drive photo IDs — converted to thumbnail URLs
export const drivePhotoIds = [
  '125yU5rDweMtxOrGnqRc0samU1hLTw_hm',
  '14vGGA4q8Z3xe3IanBbwqGCS8E5CAFpeu',
  '15NcYx5KmGuuLSDu-AiHc3wG53BzIrtoi',
  '16ZXfXXEE-aG5_vamXeHDWgZd5_Pucz6p',
  '1DXoRQd0rVoZhV6Du7_bAuUDcoZwvzJ5m',
  '1Di9ZNPaCJyogoK9O74pKOdG7HeTlSxaZ',
  '1HnxCkPBlJsW7CeGnAdMAlshP8QYVTMn_',
  '1JjZkYJKPPzwNbVcTM08iVp_4pzXWVEvP',
  '1LOwWWei92bIEVSFc2BeLrKrGvBxjh_8q',
  '1MMiErtRLVKh9bR_qADglezdaKkgcYSIm',
  '1MYc0vdaSVfoO9qNbQQWWtV3JibTYY4HY',
  '1PQZn_Frx-Z545PZUrvCuVlvzhzuJXzyK',
  '1RCYslRZixJ7xvtGX0B6vjD4ZjTxqt_oV',
  '1UkTFAZKmHw4d3OyssuMe819LmquYNwPW',
  '1V4lTSYIeWsLCJxYMRnG4u7m1xtEmiAt-',
  '1Wrxi-5ldQlxdJgnaVwTagO3erEcLmyBU',
  '1XwV-pYTAeJGwDAkIO1372vcgIpGIdbmy',
  '1YKg77efNH0o_eWFrHF4tidQP0b78z2Wo',
  '1ZDjgLzd8bc3EgYdzF9K2wwTCYoXh7Y8V',
  '1ZMEMukb4rEaYdbQ0OhdbKY9d9Le9LBqZ',
  '1bG1erT3N-HtWKBXKrVZxNSZ3Ui-v4-k2',
  '1eKSRn26HUxsY1iV7GvjIdc2FF_jyXzFB',
  '1eRzIgd4T15c6rJmf_G7eEjR9S2LuHsyM',
  '1fDbGREwXpsn-nm2K16I5jm2NbSNrZPEE',
  '1fZGX4W8TVjcXuImyoiKWaBdA-FfrTqPC',
  '1iM88GqmerRifbYN6vhFFzCDBN1QtZRVP',
  '1ll4n47_VDubHmoRA7oznIx3eWCwNpjxC',
  '1s3EGNB50QvSAxs2GApgwFNM7JiKMyH5b',
  '1swRKMRL1jMhxtS1bH85FKHfiWO3DZLnT',
  '1tVIxEMEbR2uyOkfq3-Ai8_19taTJufHb',
  '1uBy7gzStDuvGY-81V7qcLxJiq4BE9MRm',
  '1w3A-teeITAfs5cS6p2ux-D-Uswk9dczo',
]

export const drivePhotoUrls = drivePhotoIds.map(
  (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
)

export type Stat = {
  label: string
  value: string
  detail?: string
}

export const stats: Stat[] = [
  { label: 'End-to-end AI systems', value: '8+', detail: 'ML ops, agentic workflows, API orchestration' },
  { label: 'Production deployments', value: '15+', detail: 'Web, API, data pipelines, automation' },
  { label: 'System integrations', value: '20+', detail: 'legacy workflows, ML platforms, cost optimizations' },
]

export const focusChips = ['AI Engineering', 'ML Ops', 'System Architecture', 'Full-stack', 'Security']

export const openSourceHighlights = [
  {
    title: '39 public GitHub repositories',
    description:
      'Maintains public work across TypeScript, Python, JavaScript, Java, Jupyter Notebook, and Solidity, with portfolio, AI/ML, security, Web3, and full-stack projects.',
  },
  {
    title: 'Tessera.io fork and ecosystem learning',
    description:
      'Publicly tracks work around an open-source collaborative developer sandbox focused on CRDT synchronization, secure remote execution, and human-AI pair programming.',
  },
  {
    title: 'Security challenge repositories',
    description:
      'Publishes CodeHawks Solidity challenge repos and security-focused tools such as SecureAudit, showing interest in smart-contract review and application security workflows.',
  },
]

export const navItems = [
  { href: '#work', label: 'Work' },
  { href: '#open-source', label: 'Open Source' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
] as const
