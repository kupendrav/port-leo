# Design notes — premium space overhaul

Patterns were adapted from award-winning portfolios. Layout, imagery, and branding remain original to this site.

## Dennis Snellenberg — [dennissnellenberg.com](https://dennissnellenberg.com/) (Awwwards SOTD)

Snellenberg’s site treats work as an editorial selection, not a dump: large type hierarchy, generous rhythm, and a short list of strongest case studies. Magnetic buttons make hover feel tactile without turning the UI into a toy. We adapted the *curation + magnetic micro-interaction* idea — six featured projects across domains, and a shared 3D/magnetic hover language on nav and cards — while keeping Kupendra’s existing section order, copy, and space theme.

## Bruno Simon — [bruno-simon.com](https://bruno-simon.com/) (Awwwards SOTM)

Bruno’s portfolio treats WebGL as a lived-in world rather than a hero gimmick. The craft lesson is restraint and performance: 3D supports the identity, it does not replace information. We adapted that by mounting an ambient starfield/nebula (enhanced `GLSLBackground` via `@react-three/fiber`) as the environment behind the same Hero / Work / About / Contact story, with particle caps, DPR limits, and `prefers-reduced-motion` so the space still reads on a phone.

## Cuberto — magnetic cursor language

Cuberto’s well-known magnetic cursor and 3D hover work (see their public [mouse-follower](https://github.com/Cuberto/mouse-follower) and magnetic demos) set the bar for premium pointer craft: small pull toward the cursor, depth, glow, and an equivalent focus treatment. We adapted the *feel* — `preserve-3d` tilt, springy magnetic offset, focus-visible glow — on the nav and project cards, without cloning their blob cursor, branding, or layout.

## Lusion / Active Theory — layered depth on scroll

Sites in the Lusion / Active Theory tier use scroll-linked parallax and stacked planes (starfield / midground haze / foreground dust) so the page has cinematic depth without a new narrative. We adapted layered GSAP `ScrollTrigger` parallax on CSS nebula orbs and dust, sitting above the WebGL field, and paused or flattened those layers when the user prefers reduced motion.
