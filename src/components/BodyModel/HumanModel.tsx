import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, ThreeElements } from '@react-three/fiber';
import { Mesh, Color, MeshStandardMaterial, Group } from 'three';
import { BodyRegion } from '../../models/types';
import { usePainData } from '../../contexts/PainDataContext';
import { getPainColor } from '../../utils/colorUtils';

// Model URL - using a basic placeholder model that would be replaced with a proper anatomical model
const MODEL_URL = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/person/model.gltf';

interface HumanModelProps {
  selectedRegion: BodyRegion | null;
}

// Map region names to mesh names in the 3D model
const regionToMeshMap: Record<BodyRegion, string> = {
  head: 'Head',
  neck: 'Neck',
  shoulder_left: 'ShoulderLeft',
  shoulder_right: 'ShoulderRight',
  arm_upper_left: 'ArmUpperLeft',
  arm_upper_right: 'ArmUpperRight',
  arm_lower_left: 'ArmLowerLeft',
  arm_lower_right: 'ArmLowerRight',
  hand_left: 'HandLeft',
  hand_right: 'HandRight',
  chest: 'Chest',
  abdomen: 'Abdomen',
  back_upper: 'BackUpper',
  back_lower: 'BackLower',
  hip_left: 'HipLeft',
  hip_right: 'HipRight',
  leg_upper_left: 'LegUpperLeft',
  leg_upper_right: 'LegUpperRight',
  leg_lower_left: 'LegLowerLeft',
  leg_lower_right: 'LegLowerRight',
  foot_left: 'FootLeft',
  foot_right: 'FootRight'
};

const HumanModel: React.FC<HumanModelProps> = ({ selectedRegion }) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);
  const { selectRegion, painIntensity } = usePainData();
  
  // Clone the model to avoid modifying the original
  const model = scene.clone();
  
  // For demonstration, we'll use a simplified model approach
  // In a real implementation, this would work with the actual GLTF model's parts
  
  useEffect(() => {
    // Reset all materials to default
    model.traverse((node) => {
      if (node instanceof Mesh) {
        if (node.material instanceof MeshStandardMaterial) {
          node.material.color.set(new Color(0xcccccc));
          node.material.emissive.set(new Color(0x000000));
        }
      }
    });
    
    // Highlight selected region if any
    if (selectedRegion) {
      const meshName = regionToMeshMap[selectedRegion];
      const regionMesh = model.getObjectByName(meshName);
      
      if (regionMesh && regionMesh instanceof Mesh) {
        if (regionMesh.material instanceof MeshStandardMaterial) {
          // Set color based on pain intensity
          const painColor = getPainColor(painIntensity);
          regionMesh.material.color.set(new Color(painColor));
          regionMesh.material.emissive.set(new Color(painColor));
          regionMesh.material.emissiveIntensity = 0.2;
        }
      }
    }
  }, [model, selectedRegion, painIntensity]);
  
  // Gentle rotation animation
  useFrame(({ clock }) => {
    if (groupRef.current && !selectedRegion) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
    }
  });
  
  // Handle clicking on body parts
  const handleClick = (e: ThreeElements['mesh']) => {
    e.stopPropagation();
    const meshName = e.object.name;
    
    // Find the corresponding region for the clicked mesh
    const region = Object.entries(regionToMeshMap).find(
      ([_, value]) => value === meshName
    )?.[0] as BodyRegion | undefined;
    
    if (region) {
      selectRegion(region);
    }
  };
  
  // Apply click handlers to all meshes
  useEffect(() => {
    model.traverse((node) => {
      if (node instanceof Mesh) {
        // @ts-ignore - we're adding our own property
        node.clickable = true;
      }
    });
  }, [model]);
  
  return (
    <group ref={groupRef} dispose={null}>
      <primitive 
        object={model} 
        scale={[0.01, 0.01, 0.01]} 
        position={[0, -1, 0]} 
        onClick={handleClick}
      />
    </group>
  );
};

export default HumanModel;