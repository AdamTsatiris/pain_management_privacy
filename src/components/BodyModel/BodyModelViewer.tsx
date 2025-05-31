import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HumanModel from './HumanModel';
import ModelLoader from './ModelLoader';
import { usePainData } from '../../contexts/PainDataContext';

const BodyModelViewer: React.FC = () => {
  const { selectedRegion } = usePainData();
  
  return (
    <div className="w-full h-full canvas-container">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        shadows
        className="bg-neutral-100 dark:bg-neutral-800 rounded-lg"
      >
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <Suspense fallback={<ModelLoader />}>
          <HumanModel selectedRegion={selectedRegion} />
        </Suspense>
        <OrbitControls 
          enablePan={false}
          minDistance={1.5}
          maxDistance={4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};

export default BodyModelViewer;