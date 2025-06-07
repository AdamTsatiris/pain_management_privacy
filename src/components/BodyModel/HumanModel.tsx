import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BodyRegion } from '../../models/types';
import { usePainData } from '../../contexts/PainDataContext';
import { getPainColor } from '../../utils/colorUtils';

interface HumanModelProps {
  selectedRegion: BodyRegion | null;
}

const HumanModel: React.FC<HumanModelProps> = ({ selectedRegion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const hoveredRef = useRef<string | null>(null);
  const { painIntensity, selectRegion } = usePainData();

  // Anatomically accurate geometries with proper proportions
  const geometries = useMemo(() => ({
    // Head - oval shape, not perfect sphere
    head: new THREE.SphereGeometry(0.12, 32, 32).scale(1, 1.2, 0.9),
    neck: new THREE.CylinderGeometry(0.06, 0.08, 0.15, 32),
    
    // Torso - anatomically shaped
    chest: new THREE.CylinderGeometry(0.22, 0.18, 0.35, 32).scale(1, 1, 0.7),
    abdomen: new THREE.CylinderGeometry(0.18, 0.16, 0.25, 32).scale(1, 1, 0.8),
    
    // Arms - proper proportions
    shoulder: new THREE.SphereGeometry(0.08, 32, 16),
    upperArm: new THREE.CylinderGeometry(0.06, 0.05, 0.28, 32),
    forearm: new THREE.CylinderGeometry(0.05, 0.04, 0.25, 32),
    hand: new THREE.SphereGeometry(0.04, 32, 16).scale(1, 1.2, 0.6),
    
    // Legs - anatomically correct
    hip: new THREE.SphereGeometry(0.07, 32, 16),
    thigh: new THREE.CylinderGeometry(0.08, 0.06, 0.35, 32),
    knee: new THREE.SphereGeometry(0.05, 32, 16),
    calf: new THREE.CylinderGeometry(0.06, 0.04, 0.32, 32),
    foot: new THREE.BoxGeometry(0.06, 0.03, 0.12),
    
    // Back regions (invisible collision boxes)
    backUpper: new THREE.BoxGeometry(0.35, 0.35, 0.08),
    backLower: new THREE.BoxGeometry(0.32, 0.25, 0.08),
  }), []);

  // Realistic skin-tone materials
  const materials = useMemo(() => {
    const skinColor = 0xFDBCB4; // Realistic skin tone
    
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: skinColor,
      shininess: 20,
      specular: 0x333333,
    });

    const highlightMaterial = baseMaterial.clone();
    highlightMaterial.color.set(0xFFD4C4);
    highlightMaterial.emissive.set(0x111111);
    highlightMaterial.emissiveIntensity = 0.1;

    const selectedMaterial = baseMaterial.clone();
    const painColor = getPainColor(painIntensity);
    selectedMaterial.color.set(painColor);
    selectedMaterial.emissive.set(painColor);
    selectedMaterial.emissiveIntensity = 0.4;

    // Invisible material for back regions
    const invisibleMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    });

    return { baseMaterial, highlightMaterial, selectedMaterial, invisibleMaterial };
  }, [painIntensity]);

  // Handle hover effects
  const handlePointerOver = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    hoveredRef.current = mesh.name;
    if (mesh.name !== selectedRegion && mesh.material !== materials.invisibleMaterial) {
      mesh.material = materials.highlightMaterial;
    }
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    hoveredRef.current = null;
    if (mesh.name !== selectedRegion && mesh.material !== materials.invisibleMaterial) {
      mesh.material = materials.baseMaterial;
    }
    document.body.style.cursor = 'default';
  };

  // Handle click selection
  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    selectRegion(mesh.name as BodyRegion);
  };

  // Create anatomically accurate body with proper proportions (head = 1/8 total height)
  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    group.position.y = -0.8; // Center the model
    group.scale.setScalar(1.2); // Scale for better visibility

    // Clear existing meshes
    while (group.children.length) {
      group.remove(group.children[0]);
    }

    // Create body part with proper positioning and connections
    const createBodyPart = (
      name: string,
      geometry: THREE.BufferGeometry,
      position: [number, number, number],
      rotation: [number, number, number] = [0, 0, 0],
      material: THREE.Material = materials.baseMaterial
    ) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = name;
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      // Add event listeners
      mesh.addEventListener('pointerover', handlePointerOver);
      mesh.addEventListener('pointerout', handlePointerOut);
      mesh.addEventListener('click', handleClick);
      
      group.add(mesh);
    };

    // HEAD AND NECK (1/8 of total height ≈ 0.2 units)
    createBodyPart('head', geometries.head, [0, 1.55, 0]);
    createBodyPart('neck', geometries.neck, [0, 1.35, 0]);

    // TORSO
    createBodyPart('chest', geometries.chest, [0, 1.05, 0]);
    createBodyPart('abdomen', geometries.abdomen, [0, 0.7, 0]);

    // SHOULDERS
    createBodyPart('shoulder_left', geometries.shoulder, [-0.25, 1.2, 0]);
    createBodyPart('shoulder_right', geometries.shoulder, [0.25, 1.2, 0]);

    // ARMS - Left side
    createBodyPart('arm_upper_left', geometries.upperArm, [-0.35, 0.95, 0], [0, 0, -0.1]);
    createBodyPart('arm_lower_left', geometries.forearm, [-0.42, 0.6, 0]);
    createBodyPart('hand_left', geometries.hand, [-0.42, 0.4, 0]);

    // ARMS - Right side
    createBodyPart('arm_upper_right', geometries.upperArm, [0.35, 0.95, 0], [0, 0, 0.1]);
    createBodyPart('arm_lower_right', geometries.forearm, [0.42, 0.6, 0]);
    createBodyPart('hand_right', geometries.hand, [0.42, 0.4, 0]);

    // BACK REGIONS (invisible but clickable)
    createBodyPart('back_upper', geometries.backUpper, [0, 1.05, -0.12], [0, 0, 0], materials.invisibleMaterial);
    createBodyPart('back_lower', geometries.backLower, [0, 0.7, -0.12], [0, 0, 0], materials.invisibleMaterial);

    // HIPS
    createBodyPart('hip_left', geometries.hip, [-0.12, 0.5, 0]);
    createBodyPart('hip_right', geometries.hip, [0.12, 0.5, 0]);

    // LEGS - Left side
    createBodyPart('leg_upper_left', geometries.thigh, [-0.12, 0.25, 0]);
    createBodyPart('knee_left', geometries.knee, [-0.12, 0.05, 0]);
    createBodyPart('leg_lower_left', geometries.calf, [-0.12, -0.15, 0]);
    createBodyPart('foot_left', geometries.foot, [-0.12, -0.35, 0.03]);

    // LEGS - Right side
    createBodyPart('leg_upper_right', geometries.thigh, [0.12, 0.25, 0]);
    createBodyPart('knee_right', geometries.knee, [0.12, 0.05, 0]);
    createBodyPart('leg_lower_right', geometries.calf, [0.12, -0.15, 0]);
    createBodyPart('foot_right', geometries.foot, [0.12, -0.35, 0.03]);

  }, [geometries, materials]);

  // Update materials based on selection
  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material !== materials.invisibleMaterial) {
        if (object.name === selectedRegion) {
          object.material = materials.selectedMaterial;
        } else if (object.name !== hoveredRef.current) {
          object.material = materials.baseMaterial;
        }
      }
    });
  }, [selectedRegion, materials]);

  // Gentle rotation animation when no region is selected
  useFrame(({ clock }) => {
    if (groupRef.current && !selectedRegion) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.08;
    }
  });

  return <group ref={groupRef} />;
};

export default HumanModel;