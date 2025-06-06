import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePainData } from '../../contexts/PainDataContext';
import { BodyRegion } from '../../models/types';

const BodyModel: React.FC = () => {
  const { selectedRegion, selectRegion } = usePainData();
  const groupRef = useRef<THREE.Group>(null);

  // Materials
  const materials = {
    head: new THREE.MeshPhongMaterial({ color: '#FFD1DC' }), // Light pink
    torso: new THREE.MeshPhongMaterial({ color: '#ADD8E6' }), // Light blue
    arms: new THREE.MeshPhongMaterial({ color: '#90EE90' }), // Light green
    legs: new THREE.MeshPhongMaterial({ color: '#FFFFE0' }), // Light yellow
    selected: new THREE.MeshPhongMaterial({ color: '#FF4444' }), // Red
    hover: new THREE.MeshPhongMaterial({ color: '#FFFFFF', emissive: '#666666' })
  };

  // Handle hover effects
  const handlePointerOver = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    mesh.material = materials.hover;
  };

  const handlePointerOut = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    const region = mesh.name as BodyRegion;
    mesh.material = region === selectedRegion ? materials.selected : getDefaultMaterial(region);
  };

  // Handle click selection
  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    selectRegion(mesh.name as BodyRegion);
  };

  // Get default material based on body region
  const getDefaultMaterial = (region: string) => {
    if (region.includes('head')) return materials.head;
    if (region.includes('torso')) return materials.torso;
    if (region.includes('arm')) return materials.arms;
    if (region.includes('leg')) return materials.legs;
    return materials.torso;
  };

  // Gentle rotation animation
  useFrame(({ clock }) => {
    if (groupRef.current && !selectedRegion) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh
        name="head"
        position={[0, 1.6, 0]}
        material={selectedRegion === 'head' ? materials.selected : materials.head}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.15, 32, 32]} />
      </mesh>

      {/* Torso */}
      <mesh
        name="torso"
        position={[0, 1, 0]}
        material={selectedRegion === 'torso' ? materials.selected : materials.torso}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[0.4, 0.8, 0.2]} />
      </mesh>

      {/* Arms */}
      {[[-0.3, 1.2, 0], [0.3, 1.2, 0]].map((position, index) => (
        <mesh
          key={`arm_${index}`}
          name={`arm_${index === 0 ? 'left' : 'right'}`}
          position={position as [number, number, number]}
          material={
            selectedRegion === `arm_${index === 0 ? 'left' : 'right'}` 
              ? materials.selected 
              : materials.arms
          }
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <cylinderGeometry args={[0.05, 0.05, 0.4, 32]} />
        </mesh>
      ))}

      {/* Legs */}
      {[[-0.1, 0.5, 0], [0.1, 0.5, 0]].map((position, index) => (
        <mesh
          key={`leg_${index}`}
          name={`leg_${index === 0 ? 'left' : 'right'}`}
          position={position as [number, number, number]}
          material={
            selectedRegion === `leg_${index === 0 ? 'left' : 'right'}`
              ? materials.selected
              : materials.legs
          }
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <cylinderGeometry args={[0.07, 0.07, 0.5, 32]} />
        </mesh>
      ))}
    </group>
  );
};

export default BodyModel;