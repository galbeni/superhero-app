import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroesProvider } from './context/heroes/heroesProvider';
import { FavoritesProvider } from './context/favorites/favoritesProvider';
import { UIProvider } from './context/ui/uiProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroesProvider>
      <FavoritesProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </FavoritesProvider>
    </HeroesProvider>
  </StrictMode>,
)
