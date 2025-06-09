import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePainData } from '../../contexts/PainDataContext';
import { BodyRegion } from '../../models/types';

const ClickHandler: React.FC = () => {
  const { camera, scene, gl } = useThree();
  const { selectRegion } = usePainData();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handleClick = (event: MouseEvent) => {
    console.log('🖱️ Canvas clicked!'); // Debug log
    
    // Get canvas bounds
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    console.log('🎯 Mouse position:', mouse.current.x, mouse.current.y); // Debug log
    
    // Update the raycaster with camera and mouse position
    raycaster.current.setFromCamera(mouse.current, camera);
    
    // Find intersections with all objects in the scene
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    
    console.log('🔍 Intersections found:', intersects.length); // Debug log
    
    if (intersects.length > 0) {
      const firstIntersect = intersects[0];
      const clickedObject = firstIntersect.object;
      
      console.log('✅ Clicked object:', clickedObject); // Debug log
      console.log('📝 Object name:', clickedObject.name); // Debug log
      console.log('🏷️ Object userData:', clickedObject.userData); // Debug log
      
      // Check if the clicked object has a name (body part identifier)
      if (clickedObject.name && clickedObject.name !== '') {
        console.log('🎯 Body part selected:', clickedObject.name); // Debug log
        
        // Validate that it's a valid body region
        const bodyRegion = clickedObject.name as BodyRegion;
        
        // List of valid body regions for validation
        const validRegions: BodyRegion[] = [
          'head', 'neck', 'shoulder_left', 'shoulder_right',
          'arm_upper_left', 'arm_upper_right', 'arm_lower_left', 'arm_lower_right',
          'hand_left', 'hand_right', 'chest', 'abdomen',
          'back_upper', 'back_lower', 'hip_left', 'hip_right',
          'leg_upper_left', 'leg_upper_right', 'knee_left', 'knee_right',
          'leg_lower_left', 'leg_lower_right', 'foot_left', 'foot_right'
        ];
        
        if (validRegions.includes(bodyRegion)) {
          console.log('✅ Valid body region selected:', bodyRegion); // Debug log
          selectRegion(bodyRegion);
        } else {
          console.log('❌ Invalid body region:', bodyRegion); // Debug log
        }
      } else {
        console.log('⚠️ Clicked object has no name'); // Debug log
      }
    } else {
      console.log('❌ No intersections found'); // Debug log
    }
  };

  // Set up click event listener
  React.useEffect(() => {
    const canvas = gl.domElement;
    
    console.log('🔧 Setting up click handler on canvas:', canvas); // Debug log
    
    canvas.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [gl.domElement]);

  // This component doesn't render anything visible
  return null;
};

export default ClickHandler;