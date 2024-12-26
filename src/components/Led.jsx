import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Led = ({ position, scale, onClick, isSelected }) => {
  const ref = useRef(); // Reference to the LED model
  const boxHelperRef = useRef(); // Reference to the bounding box helper
  const { scene } = useGLTF('/models/Led.glb'); // Load the LED model

  // Recalculate bounding box whenever scale, position, or selection changes
  useEffect(() => {
    if (ref.current) {
      ref.current.name = 'led';
      // Remove any existing bounding box helper
      if (boxHelperRef.current) {
        boxHelperRef.current.parent.remove(boxHelperRef.current);
        boxHelperRef.current = null;
      }

      if (isSelected) {
        // Recalculate the bounding box
        const box3 = new THREE.Box3().setFromObject(ref.current);
        const boxHelper = new THREE.Box3Helper(box3, 'yellow');
        ref.current.add(boxHelper); // Attach the bounding box helper to the object
        boxHelperRef.current = boxHelper; // Store the helper reference
      }
    }
  }, [isSelected, position, scale]);

  return (
    <primitive
      ref={ref}
      object={scene} // The 3D LED object
      position={position} // Set position
      scale={scale} // Set scale
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling to the background
        onClick(ref.current); // Notify the parent component
      }}
    />
  );
};

export default Led;
