import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Initializing application...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Failed to find root element');
  throw new Error('Failed to find the root element');
}

console.log('Root element found, creating React root...');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log('Application rendered');