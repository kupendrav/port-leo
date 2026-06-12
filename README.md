<div align="center">

# 🚀 KVR • Orbit — Space-Themed Portfolio

**An immersive portfolio powered by GSAP, React, Tailwind CSS, and TypeScript**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-kupendra.netlify.app-blue?style=for-the-badge)](https://kupendra.netlify.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## 📖 About The Project

A space-themed portfolio website featuring scroll-triggered GSAP animations, a custom animated cursor, a loading screen, interactive photo section pulling images from Google Drive, a dedicated photo gallery, and smooth dark/light theme switching. Built with React 19, TypeScript, Vite, and Tailwind CSS.

Visit the live site: **[kupendra.netlify.app](https://kupendra.netlify.app/)**

---

## ✨ Features

- 🎯 **Scroll-Triggered Animations** — Smooth section reveals and card staggers powered by GSAP ScrollTrigger
- 🖱️ **Custom Animated Cursor** — Radial glow cursor with click/press feedback, themed per mode
- 🌗 **Dark/Light Theme Toggle** — Seamless full-site theme switching
- 🖼️ **Interactive Hero Photo** — Starts greyscale; click to shuffle through 32 Google Drive photos with GSAP crossfade transitions
- 🌠 **Star Click Effect** — Burst particles on every click
- ⏳ **Cinematic Loading Screen** — SVG circle progress + scanlines intro
- 📸 **Photo Gallery Page** — Greyscale-to-colour hover gallery of hackathon & event photos
- 💼 **Domain-Grouped Project Showcase** — Projects organized by domain with tech pills and live links
- 📄 **Downloadable CV** — One-click resume download
- 📱 **Fully Responsive** — Mobile-first layouts from 320 px to 1440 px+
- 🎨 **Neon Text Selection** — Custom `::selection` highlight with cyan/violet glow
- ⚡ **Lightning-Fast Builds** — Vite + Tailwind CSS for instant HMR and tiny bundles
- 🔗 **Backend API** — Express + MongoDB visitor tracking (optional)

---

## 🎬 Screenshots & Demo

> **Live Demo:** [kupendra.netlify.app](https://kupendra.netlify.app/)

The portfolio features:
- **Hero Section** — Animated copy, stat cards, and a clickable photo that shuffles Drive images
- **Work Section** — Projects grouped by domain (Full-stack, AI/ML, Web3)
- **About Section** — Bio, bullet highlights, and toolbox chip grid
- **Contact Section** — Email CTA, GitHub/LinkedIn icons, location badge
- **Gallery Page** — Greyscale photo cards that reveal colour on hover

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kupendrav/Space_ship-PORT.git
   cd Space_ship-PORT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Backend (optional — for visitor tracking)

```bash
cd server
npm install
node index.js      # Starts on http://localhost:3001
```

The Vite dev server proxies `/api` requests to port 3001 automatically.

---

## 💻 Usage

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory, ready for deployment.

---

## 📁 Project Structure

```
port-leo/
├── public/                     # Static assets
│   ├── cv.pdf                 # Downloadable CV
│   ├── profile.jpeg           # Fallback profile photo
│   ├── twitter.png            # Social icon
│   └── vite.svg               # Vite logo
├── server/                     # Express backend (optional)
│   ├── index.js               # Visitor API + MongoDB
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Gallery.tsx        # Photo gallery page (greyscale → colour)
│   │   ├── GLSLBackground.tsx # GLSL shader background
│   │   ├── LoadingScreen.tsx  # SVG circle progress intro
│   │   └── StarClickEffect.tsx# Burst particles on click
│   ├── data/
│   │   ├── gallery.ts         # Local gallery photo data
│   │   └── projects.ts        # Project definitions & domain order
│   ├── lib/
│   │   └── gsap.ts            # GSAP config (ScrollTrigger, ScrollToPlugin)
│   ├── photos/                # Local event/hackathon photos + hero image
│   ├── App.tsx                # Main component (hero, work, about, contact)
│   ├── App.css                # All component styles + responsive breakpoints
│   ├── index.css              # Global resets, CSS variables, neon selection
│   └── main.tsx               # React entry point
├── index.html                 # HTML shell
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite + Tailwind + API proxy
├── eslint.config.js           # Linting rules
└── LICENSE                    # MIT
```

---

## 🛠️ Technologies Used

### Core
- **[React 19.2.0](https://reactjs.org/)** — UI framework
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** — Type safety
- **[Vite 7.2.4](https://vitejs.dev/)** — Build tool & dev server
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS (via `@tailwindcss/vite`)

### Animation
- **[GSAP 3.14.2](https://greensock.com/gsap/)** — ScrollTrigger, ScrollToPlugin, crossfade transitions
- **[@gsap/react 2.1.2](https://www.npmjs.com/package/@gsap/react)** — `useGSAP` hook

### UI & Icons
- **[React Icons 5.5.0](https://react-icons.github.io/react-icons/)** — Lucide icon set
- **Custom CSS** — Cursor, loading screen, card hover effects, neon selection

### Backend (optional)
- **[Express 4.21.0](https://expressjs.com/)** — REST API
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** — Visitor name persistence

---

## 🎨 Customization Guide

### Personal Information

1. **Hero Photo** — Replace `src/photos/image.jpeg` with your photo (displayed in greyscale)

2. **CV/Resume** — Replace `public/cv.pdf`; the "Download CV" button uses `/cv.pdf`

3. **Contact Email** — Update `contactEmail` in `src/App.tsx`
   ```typescript
   const contactEmail = 'your-email@example.com'
   ```

4. **Social Links** — Update `socialLinks` in `src/App.tsx`
   ```typescript
   const socialLinks = {
     github: 'https://github.com/yourusername',
     linkedin: 'https://linkedin.com/in/yourprofile',
   }
   ```

5. **Drive Photo IDs** — Update the `drivePhotoIds` array in `src/App.tsx` with your own Google Drive file IDs (public sharing required)

### Projects

Edit `src/data/projects.ts` to customise your project showcase:

```typescript
export const projects: Project[] = [
  {
    title: 'Your Project',
    domain: 'Full-stack & Product',
    description: 'Project description',
    tech: ['React', 'TypeScript', 'Node.js'],
    links: [
      { label: 'GitHub', href: 'https://github.com/...' },
      { label: 'Live', href: 'https://...' },
    ],
  },
]
```

### Gallery Photos

Add event photos to `src/photos/` and register them in `src/data/gallery.ts`.

### Theme Colours

Modify CSS custom properties in `src/index.css`:

```css
:root {
  --bg: #05060a;
  --accent: #7dd3fc;
  --accent-2: #a78bfa;
  --text: #e5ecff;
  --muted: #9fb3d8;
}
```

---

## 🌐 Deployment

### Deploy to Netlify (current)

1. Build: `npm run build`
2. Deploy the `dist/` folder via [Netlify](https://app.netlify.com/drop) or connect the Git repo for auto-deploys.

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
# Add to scripts: "predeploy": "npm run build", "deploy": "gh-pages -d dist"
npm run deploy
```

---

## 👨‍💻 Author

**Kupendra V R**

- 🌐 Portfolio: [kupendra.netlify.app](https://kupendra.netlify.app/)
- 💼 GitHub: [@kupendrav](https://github.com/kupendrav)
- 💼 LinkedIn: [kupendrav99](https://www.linkedin.com/in/kupendrav99/)
- 📧 Email: kupendravr@zohomail.in

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **GSAP** team for professional animation tools
- **Tailwind CSS** for utility-first styling
- **Vite** team for the blazing-fast build tool
- **React Icons** for the Lucide set
- All open-source contributors who made this project possible

---

<div align="center">

**[⬆ Back to Top](#-kvr--orbit--space-themed-portfolio)**

Made with 💜 and ☕ by [Kupendra V R](https://kupendra.netlify.app/)

</div>
