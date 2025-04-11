# 🦸 Superhero App
This was another exciting homework!
I've built a simple yet functional web application using Vite, React, TypeScript, and Tailwind CSS that displays a list of superheroes. Users can explore them, filter by publisher, sort by power stats, and manage a list of their favorites. 
## Features
The application provides the following features:

- Displays a list of superheroes in card format
- Ability to **add/remove** heroes to/from favorites
- Favorites section that persists data via `localStorage`
- **Filtering** by publisher (e.g. *Marvel*, *DC Comics*, etc.)
- Sorting functionality by Powerstats (e.g. *intelligence*, *strength*, etc.)
- **Infinite scroll** – initially displays 10 cards, and loads more as you scroll down to improve performance
- Clean, responsive, minimalist UI for clarity and ease of use
- Data cleanup: Filtered out heroes with empty or duplicate publishers for a consistent filter list

## Refactor & Improvements (April 2025)
Since the initial version, the following improvements and refactors have been made:

- Constants extracted to a reusable GridConfig object (MIN_CARD_WIDTH, ROW_HEIGHT, etc.) to avoid duplication across components
- Virtualized list implemented using react-window and AutoSizer for performant rendering of large datasets
- InfiniteLoader integration for dynamic loading of additional heroes on scroll, with built-in SkeletonCard fallback
- SkeletonCard rendering improved: only displayed if new data is actually being loaded (avoids fake skeletons on short lists)
- New FavoritesList component created, sharing the same grid layout and virtualization logic as the main HeroList
- Module aliasing (@) configured via tsconfig and vite.config.ts for cleaner imports (e.g. @/components/...)
- Global Spinner component added to show loading feedback during infinite scroll
- Image preloading with placeholder added in the Card component to prevent flickering/sliced images
- Tailwind-responsive tweaks, e.g. flex-col below lg breakpoint

## Tech Stack & Libraries
The project setup was done using Vite for its fast build times and efficient developer workflow. Here's what I used:

- React for building UI components
- ```react-window``` for efficient list virtualization
- ```react-window-infinite-loader``` for dynamic infinite scrolling
- ```react-virtualized-auto-sizer``` to automatically size virtualized lists
- TypeScript for type safety and better development experience
- Tailwind CSS for rapid UI styling and utility-first CSS
- LocalStorage API to persist favorite heroes between sessions
- Custom hooks for state and logic separation (e.g. heroes, favorites)

I deployed the app with Vercel because it makes publishing projects from GitHub quick and effortless.
Feel free to explore the Live Demo below!

## API
This project uses the Superhero Database API, which provides superhero data through static JSON files:

- All heroes: https://akabab.github.io/superhero-api/api/all.json

## Future Improvements
- Dark mode toggle
- **Hero card modal:** clicking a hero card opens a detailed view in a modal using React Portal
- Custom Dropdown component instead HTML select
- Unit testing with Jest
- More visual stats representation

## Getting Started
Clone the repository and run the following commands to get it up and running:
### Install dependencies
```
npm install
```
### Start development server
```
npm start
```
### Build for production
```
npm build
```

## 🌐 Live Demo
The application has been deployed using Vercel for fast and hassle-free deployment from GitHub.

🔗 Live URL: https://superhero-app-react.vercel.app

## Screenshots
![Superhero App Screenshot](./public/screenshots/screenshot.png)

## Credits
API used: [Superhero API](https://akabab.github.io/superhero-api)

Built with ❤️ by Benjamin Gal © 2025 – https://codeapp.hu