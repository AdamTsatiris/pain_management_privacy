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
  const { painIntensity } = usePainData();

  // Enhanced geometries with smooth, rounded shapes
  const geometries = useMemo(() => ({
    // Head - egg-shaped with subtle facial features
    head: new THREE.SphereGeometry(0.14, 32, 32).scale(1, 1.15, 0.95),
    neck: new THREE.CylinderGeometry(0.07, 0.09, 0.12, 32),
    
    // Torso - anatomically curved
    chest: (() => {
      const geometry = new THREE.CylinderGeometry(0.24, 0.20, 0.32, 32);
      geometry.scale(1, 1, 0.75);
      return geometry;
    })(),
    abdomen: (() => {
      const geometry = new THREE.CylinderGeometry(0.20, 0.18, 0.22, 32);
      geometry.scale(1, 1, 0.8);
      return geometry;
    })(),
    
    // Arms - tapered for natural look
    shoulder: new THREE.SphereGeometry(0.09, 32, 16),
    upperArm: (() => {
      const geometry = new THREE.CylinderGeometry(0.07, 0.055, 0.26, 32);
      return geometry;
    })(),
    forearm: (() => {
      const geometry = new THREE.CylinderGeometry(0.055, 0.045, 0.24, 32);
      return geometry;
    })(),
    hand: (() => {
      const geometry = new THREE.SphereGeometry(0.045, 32, 16);
      geometry.scale(1, 1.3, 0.7);
      return geometry;
    })(),
    
    // Legs - anatomically tapered
    hip: new THREE.SphereGeometry(0.08, 32, 16),
    thigh: (() => {
      const geometry = new THREE.CylinderGeometry(0.09, 0.07, 0.32, 32);
      return geometry;
    })(),
    knee: new THREE.SphereGeometry(0.06, 32, 16),
    calf: (() => {
      const geometry = new THREE.CylinderGeometry(0.07, 0.05, 0.30, 32);
      return geometry;
    })(),
    foot: (() => {
      const geometry = new THREE.BoxGeometry(0.07, 0.04, 0.14);
      geometry.translate(0, 0, 0.03);
      return geometry;
    })(),
    
    // Back regions (invisible collision boxes)
    backUpper: new THREE.BoxGeometry(0.38, 0.32, 0.08),
    backLower: new THREE.BoxGeometry(0.34, 0.22, 0.08),
  }), []);

  // Enhanced materials with soft skin tone and realistic shading
  const materials = useMemo(() => {
    const skinColor = 0xF7DDD4; // Soft, warm skin tone
    
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: skinColor,
      shininess: 8,
      specular: 0x222222,
      transparent: true,
      opacity: 0.98,
    });

    const highlightMaterial = baseMaterial.clone();
    highlightMaterial.color.set(0xFFE8DC);
    highlightMaterial.emissive.set(0x4A90E2);
    highlightMaterial.emissiveIntensity = 0.15;

    const selectedMaterial = baseMaterial.clone();
    const painColor = getPainColor(painIntensity);
    selectedMaterial.color.set(painColor);
    selectedMaterial.emissive.set(painColor);
    selectedMaterial.emissiveIntensity = 0.3;

    // Invisible material for back regions
    const invisibleMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    });

    return { baseMaterial, highlightMaterial, selectedMaterial, invisibleMaterial };
  }, [painIntensity]);

  // Create enhanced anatomical body with natural posture
  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    group.position.y = -0.6;
    group.scale.setScalar(1.3);

    // Clear existing meshes
    while (group.children.length) {
      group.remove(group.children[0]);
    }

    // Create body part with enhanced positioning
    const createBodyPart = (
      name: string,
      geometry: THREE.BufferGeometry,
      position: [number, number, number],
      rotation: [number, number, number] = [0, 0, 0],
      material: THREE.Material = materials.baseMaterial
    ) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = name; // CRITICAL: Set the name for click detection
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      console.log(`🏗️ Created body part: ${name} at position:`, position); // Debug log
      
      group.add(mesh);
    };

    // HEAD AND NECK
    createBodyPart('head', geometries.head, [0, 1.52, 0]);
    createBodyPart('neck', geometries.neck, [0, 1.32, 0]);

    // TORSO with natural curves
    createBodyPart('chest', geometries.chest, [0, 1.02, 0]);
    createBodyPart('abdomen', geometries.abdomen, [0, 0.68, 0]);

    // SHOULDERS with natural positioning
    createBodyPart('shoulder_left', geometries.shoulder, [-0.26, 1.18, 0]);
    createBodyPart('shoulder_right', geometries.shoulder, [0.26, 1.18, 0]);

    // ARMS - Left side with natural pose
    createBodyPart('arm_upper_left', geometries.upperArm, [-0.38, 0.92, 0], [0, 0, -0.15]);
    createBodyPart('arm_lower_left', geometries.forearm, [-0.46, 0.58, 0.05], [0, 0, -0.1]);
    createBodyPart('hand_left', geometries.hand, [-0.48, 0.36, 0.08]);

    // ARMS - Right side with natural pose
    createBodyPart('arm_upper_right', geometries.upperArm, [0.38, 0.92, 0], [0, 0, 0.15]);
    createBodyPart('arm_lower_right', geometries.forearm, [0.46, 0.58, 0.05], [0, 0, 0.1]);
    createBodyPart('hand_right', geometries.hand, [0.48, 0.36, 0.08]);

    // BACK REGIONS (invisible but clickable)
    createBodyPart('back_upper', geometries.backUpper, [0, 1.02, -0.14], [0, 0, 0], materials.invisibleMaterial);
    createBodyPart('back_lower', geometries.backLower, [0, 0.68, -0.14], [0, 0, 0], materials.invisibleMaterial);

    // HIPS
    createBodyPart('hip_left', geometries.hip, [-0.13, 0.48, 0]);
    createBodyPart('hip_right', geometries.hip, [0.13, 0.48, 0]);

    // LEGS - Left side
    createBodyPart('leg_upper_left', geometries.thigh, [-0.13, 0.22, 0]);
    createBodyPart('knee_left', geometries.knee, [-0.13, 0.02, 0]);
    createBodyPart('leg_lower_left', geometries.calf, [-0.13, -0.18, 0]);
    createBodyPart('foot_left', geometries.foot, [-0.13, -0.36, 0.03]);

    // LEGS - Right side
    createBodyPart('leg_upper_right', geometries.thigh, [0.13, 0.22, 0]);
    createBodyPart('knee_right', geometries.knee, [0.13, 0.02, 0]);
    createBodyPart('leg_lower_right', geometries.calf, [0.13, -0.18, 0]);
    createBodyPart('foot_right', geometries.foot, [0.13, -0.36, 0.03]);

    console.log(`✅ Created ${group.children.length} body parts`); // Debug log

  }, [geometries, materials]);

  // Update materials based on selection with smooth transitions
  useEffect(() => {
    if (!groupRef.current) return;

    console.log('🎨 Updating materials for selection:', selectedRegion); // Debug log

    groupRef.current.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material !== materials.invisibleMaterial) {
        if (object.name === selectedRegion) {
          object.material = materials.selectedMaterial;
          console.log(`🔴 Selected material applied to: ${object.name}`); // Debug log
        } else if (object.name !== hoveredRef.current) {
          object.material = materials.baseMaterial;
        }
      }
    });
  }, [selectedRegion, materials]);

  // Gentle breathing animation when no region is selected
  useFrame(({ clock }) => {
    if (groupRef.current && !selectedRegion) {
      const breathingScale = 1 + Math.sin(clock.getElapsedTime() * 0.8) * 0.02;
      groupRef.current.scale.setScalar(1.3 * breathingScale);
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  return <group ref={groupRef} />;
};

export default HumanModel;