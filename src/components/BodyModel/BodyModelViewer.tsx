import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import HumanModel from './HumanModel';
import ModelLoader from './ModelLoader';
import { usePainData } from '../../contexts/PainDataContext';

const BodyModelViewer: React.FC = () => {
  const { selectedRegion } = usePainData();
  
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-blue-50/30 to-white/50 dark:from-blue-900/10 dark:to-neutral-800/50">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
        
        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.3} color="#e6f3ff" />
        <pointLight position={[5, -5, -5]} intensity={0.2} color="#fff5e6" />
        
        {/* Environment for realistic reflections */}
        <Environment preset="studio" />
        
        {/* Ground shadow */}
        <ContactShadows
          opacity={0.2}
          scale={8}
          blur={2}
          far={4}
          resolution={256}
          color="#1a365d"
          position={[0, -2, 0]}
        />
        
        {/* Enhanced Human Model */}
        <Suspense fallback={<ModelLoader />}>
          <HumanModel selectedRegion={selectedRegion} />
        </Suspense>
        
        {/* Enhanced Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={2.5}
          maxDistance={6}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI - Math.PI / 8}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.8}
          zoomSpeed={0.8}
        />
      </Canvas>
      
      {/* Non-blocking Instructions - Only show when no region selected */}
      {!selectedRegion && (
        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
          <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md rounded-2xl p-4 border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
                Interactive 3D Body Model
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                Click on any body region to select it and get personalized exercise recommendations.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-blue-600 dark:text-blue-400">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Drag to rotate
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Scroll to zoom
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyModelViewer;