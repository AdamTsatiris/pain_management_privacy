import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
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

  // Create base geometries for body parts
  const geometries = useMemo(() => ({
    head: new THREE.SphereGeometry(0.15, 32, 32),
    neck: new THREE.CylinderGeometry(0.08, 0.1, 0.2, 32),
    torso: new THREE.CylinderGeometry(0.25, 0.2, 0.6, 32),
    arm: new THREE.CylinderGeometry(0.06, 0.05, 0.3, 32),
    forearm: new THREE.CylinderGeometry(0.05, 0.04, 0.3, 32),
    hand: new THREE.SphereGeometry(0.05, 32, 16),
    leg: new THREE.CylinderGeometry(0.09, 0.07, 0.4, 32),
    calf: new THREE.CylinderGeometry(0.07, 0.05, 0.4, 32),
    foot: new THREE.BoxGeometry(0.08, 0.04, 0.15),
  }), []);

  // Create materials
  const materials = useMemo(() => {
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0xe0c8b0,
      shininess: 30,
      specular: 0x444444,
    });

    const highlightMaterial = baseMaterial.clone();
    highlightMaterial.color.set(0xf0d8c0);

    const selectedMaterial = baseMaterial.clone();
    selectedMaterial.emissive.set(getPainColor(painIntensity));
    selectedMaterial.emissiveIntensity = 0.5;

    return { baseMaterial, highlightMaterial, selectedMaterial };
  }, [painIntensity]);

  // Handle hover effects
  const handlePointerOver = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    hoveredRef.current = mesh.name;
    mesh.material = materials.highlightMaterial;
  };

  const handlePointerOut = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    hoveredRef.current = null;
    if (mesh.name !== selectedRegion) {
      mesh.material = materials.baseMaterial;
    }
  };

  // Handle click selection
  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    selectRegion(mesh.name as BodyRegion);
  };

  // Create body parts with proper positioning
  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    group.position.y = -1; // Center the model

    // Clear existing meshes
    while (group.children.length) {
      group.remove(group.children[0]);
    }

    // Create and position body parts
    const createBodyPart = (
      name: string,
      geometry: THREE.BufferGeometry,
      position: [number, number, number],
      rotation: [number, number, number] = [0, 0, 0]
    ) => {
      const mesh = new THREE.Mesh(geometry, materials.baseMaterial);
      mesh.name = name;
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    };

    // Head and neck
    createBodyPart('head', geometries.head, [0, 1.8, 0]);
    createBodyPart('neck', geometries.neck, [0, 1.6, 0]);

    // Torso
    createBodyPart('chest', geometries.torso, [0, 1.2, 0]);
    createBodyPart('abdomen', geometries.torso, [0, 0.8, 0]);

    // Arms
    createBodyPart('shoulder_left', geometries.arm, [-0.3, 1.4, 0], [0, 0, -0.3]);
    createBodyPart('shoulder_right', geometries.arm, [0.3, 1.4, 0], [0, 0, 0.3]);
    createBodyPart('arm_upper_left', geometries.arm, [-0.4, 1.2, 0], [0, 0, -0.1]);
    createBodyPart('arm_upper_right', geometries.arm, [0.4, 1.2, 0], [0, 0, 0.1]);
    createBodyPart('arm_lower_left', geometries.forearm, [-0.45, 0.9, 0]);
    createBodyPart('arm_lower_right', geometries.forearm, [0.45, 0.9, 0]);
    createBodyPart('hand_left', geometries.hand, [-0.45, 0.7, 0]);
    createBodyPart('hand_right', geometries.hand, [0.45, 0.7, 0]);

    // Legs
    createBodyPart('leg_upper_left', geometries.leg, [-0.15, 0.4, 0]);
    createBodyPart('leg_upper_right', geometries.leg, [0.15, 0.4, 0]);
    createBodyPart('leg_lower_left', geometries.calf, [-0.15, 0, 0]);
    createBodyPart('leg_lower_right', geometries.calf, [0.15, 0, 0]);
    createBodyPart('foot_left', geometries.foot, [-0.15, -0.2, 0.05]);
    createBodyPart('foot_right', geometries.foot, [0.15, -0.2, 0.05]);

    // Add event listeners to all meshes
    group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.addEventListener('pointerover', handlePointerOver);
        object.addEventListener('pointerout', handlePointerOut);
        object.addEventListener('click', handleClick);
      }
    });
  }, [geometries, materials]);

  // Update materials based on selection
  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.traverse((object) => {
      if (object instanceof THREE.Mesh) {
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
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  return <group ref={groupRef} />;
};

export default HumanModel;