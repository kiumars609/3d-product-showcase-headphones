# 3D Product Showcase — Headphones

Interactive 3D product showcase built with **React**, **Three.js**, **Sass**, and **Framer Motion**.  
This demo uses procedural Three.js primitives to render a stylized headphones model (no external GLB required), supports rotation, zoom, and color variants — perfect for portfolio/showcase use.

## Features
- Interactive 3D viewer (mouse & touch) with OrbitControls
- Color presets to customize the product
- Smooth ambient lighting & animated rotation
- Responsive layout and polished Sass styling
- Ready-to-deploy with Vercel (instructions below)

## Quick start
```bash
git clone https://github.com/YourUsername/3d-product-showcase-headphones.git
cd 3d-product-showcase-headphones
npm install
npm run dev
```

## Notes
- The model is generated from Three.js primitives (torus + cylinders) so you can replace it with a GLB model in `public/model.glb` and update `Product3D.jsx` to load it using `GLTFLoader`.
- For production quality image exports or higher fidelity, consider swapping the procedural model with a high-poly GLB and using environment maps (HDRI) for reflections.
