import React, { useState } from 'react';
import { Activity } from 'lucide-react';

function App() {
  console.log('Rendering App component');
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log('Button clicked');
    setCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <header className="p-4 bg-white dark:bg-neutral-800 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="text-primary-500" />
          <h1 className="text-xl font-semibold">PainRelief</h1>
        </div>
      </header>
      <main className="p-4">
        <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            Welcome to PainRelief. This is a test component to verify React is working properly.
          </p>
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Clicked {count} times
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;