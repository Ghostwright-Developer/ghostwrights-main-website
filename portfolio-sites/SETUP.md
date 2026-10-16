# Portfolio Sites Setup

This folder contains all the custom-coded websites you want to showcase in your portfolio.

## Folder Structure

Each site should be organized like this:

```
portfolio-sites/
├── site-1-elite-roofing/
│   ├── components/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── ... (other shared components)
│   ├── pages/
│   │   ├── home.tsx
│   │   ├── services.tsx
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   └── ... (other pages)
│   ├── styles/
│   │   └── styles.css (if needed)
│   ├── config.ts (site config - see below)
│   └── index.ts (exports all components)
├── site-2-next-site/
│   └── ... (same structure)
```

## Site Config File (`config.ts`)

Each site folder needs a `config.ts` file with this structure:

```typescript
export const siteConfig = {
  id: "elite-roofing",
  name: "Elite Roofing",
  type: "Roofing Contractor",
  tagline: "Your Trusted Roofing Professionals",
  description: "Custom description of the business",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  colors: {
    primary: "#8B4513",
    secondary: "#654321",
    accent: "#CD853F",
    text: "#1a1a1a",
    background: "#faf8f5",
  },
}
```

## Component Exports (`index.ts`)

Each site folder needs an `index.ts` that exports all pages:

```typescript
export { HomePage } from './pages/home'
export { ServicesPage } from './pages/services'
export { AboutPage } from './pages/about'
export { ContactPage } from './pages/contact' from './config'
```

## How to Add Your Site

1. Create a new folder: `site-1-elite-roofing/`
2. Inside, create subfolders: `components/`, `pages/`, `styles/` (optional)
3. Copy your site code into these folders
4. Create `config.ts` with the site metadata
5. Create `index.ts` that exports your pages and config
6. I'll update the portfolio page to auto-load your site

Just provide me the code and I'll organize it into this structure!
