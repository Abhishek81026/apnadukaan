# ApnaDukaan

ApnaDukaan is a modern second-hand marketplace UI built with React and Vite. It is designed as a polished frontend showcase with a premium shopping experience, smooth interactions, and fully local data handling for demo purposes.

## Overview

This project focuses on a clean marketplace flow where users can browse products, search and filter listings, open quick views, manage a wishlist and cart, and explore product/store/profile screens. The app is fully responsive and optimized for a presentation-style demo.

## Key Features

- Marketplace-style React interface with multiple pages and reusable components
- Product search, filters, sorting, and quick preview interactions
- Wishlist, cart, recently viewed items, and compare tray
- Dark mode with persistent preferences
- Motion-enhanced UI with Framer Motion transitions
- Responsive layout for desktop and mobile screens
- Skeleton loaders, toast notifications, and floating support UI
- Client-side data generation with localStorage persistence

## Tech Stack

- React 18
- Vite
- JavaScript
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React
- react-window

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the app at `http://localhost:5173/`.

## Production Build

```bash
npm run build
npm run preview
```

## Project Notes

- This is a frontend-only project.
- There is no backend, database, or authentication layer.
- Product data and demo interactions are generated on the client.
- Wishlist, cart, and theme settings are saved in localStorage.

## Suggested Folder Structure

- `src/components` for shared UI pieces
- `src/context` for app-wide state
- `src/data` for mock data and constants
- `src/hooks` for custom hooks
- `src/pages` or page-level route components if added later

## Deployment

The project can be deployed as a static Vite app on platforms like Vercel, Netlify, or GitHub Pages after running a production build.

## License

This project is part of your personal portfolio/demo work. Add a license here if you want the repository to be public and reusable.
