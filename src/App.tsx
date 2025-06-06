import React from 'react';
import { Activity } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BodyModel from './components/BodyModel/BodyModel';
import PainIntensitySlider from './components/UI/PainIntensitySlider';
import { PainDataProvider } from './contexts/PainDataContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <PainDataProvider>
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
          <header className="p-4 bg-white dark:bg-neutral-800 shadow-sm">
            <div className="flex items-center gap-2">
              <Activity className="text-primary-500" />
              <h1 className="text-xl font-semibold">Pain Management Assistant</h1>
            </div>
          </header>
          
          <main className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 3D Model Container */}
              <div className="lg:w-[70%] aspect-square bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <BodyModel />
                  <OrbitControls 
                    enablePan={false}
                    minDistance={2}
                    maxDistance={5}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI - Math.PI / 4}
                  />
                </Canvas>
              </div>
              
              {/* Side Panel */}
              <div className="lg:w-[30%] space-y-4">
                <PainIntensitySlider />
                
                {/* Privacy Notice */}
                <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    🔒 Privacy Notice: All data is processed locally - nothing is sent to servers.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </PainDataProvider>
    </ThemeProvider>
  );
}

export default App;