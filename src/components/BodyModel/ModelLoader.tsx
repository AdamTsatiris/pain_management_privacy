import React from 'react';
import { Html } from '@react-three/drei';

const ModelLoader: React.FC = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p>Loading 3D model...</p>
      </div>
    </Html>
  );
};

export default ModelLoader;