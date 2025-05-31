import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { PainDataProvider } from './contexts/PainDataContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PainDataProvider>
        <App />
      </PainDataProvider>
    </ThemeProvider>
  </StrictMode>
);