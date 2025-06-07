import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import HumanModel from './HumanModel';
import ModelLoader from './ModelLoader';
import { usePainData } from '../../contexts/PainDataContext';

const BodyModelViewer: React.FC = () => {
  const { selectedRegion } = usePainData();
  
  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        {/* Environment */}
        <Environment preset="studio" />
        <ContactShadows
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        
        {/* Model */}
        <Suspense fallback={<ModelLoader />}>
          <HumanModel selectedRegion={selectedRegion} />
        </Suspense>
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Instructions overlay */}
      {!selectedRegion && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl p-6 text-center max-w-sm mx-4 border border-neutral-200/50 dark:border-neutral-700/50">
            <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
              Interactive 3D Body Model
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Click on any body region to select it and get personalized exercise recommendations.
            </p>
            <div className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
              Drag to rotate • Scroll to zoom
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyModelViewer;