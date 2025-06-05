import React from 'react';
import { Activity } from 'lucide-react';

function App() {
  console.log('Rendering App component');
  
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <header className="p-4 bg-white dark:bg-neutral-800 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="text-primary-500" />
          <h1 className="text-xl font-semibold">PainRelief</h1>
        </div>
      </header>
      <main className="p-4">
        <p className="text-neutral-700 dark:text-neutral-300">
          Welcome to PainRelief
        </p>
      </main>
    </div>
  );
}

export default App;