import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import HumanModel from './HumanModel';
import ModelLoader from './ModelLoader';
import { usePainData } from '../../contexts/PainDataContext';

const BodyModelViewer: React.FC = () => {
  const { selectedRegion } = usePainData();
  
  return (
    <div className="w-full h-full canvas-container">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment */}
        <Environment preset="studio" />
        <ContactShadows
          opacity={0.5}
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
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Instructions overlay */}
      {!selectedRegion && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-neutral-500 dark:text-neutral-400 pointer-events-none">
          <p>Rotate and click on a body region to select</p>
        </div>
      )}
    </div>
  );
};

export default BodyModelViewer;