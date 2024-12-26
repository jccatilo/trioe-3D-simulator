import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Resistor = ({ position, scale, onClick, isSelected }) => {
  const ref = useRef(); // Reference to the Resistor model
  const boxRef = useRef(); // Reference to the bounding box
  const { scene } = useGLTF('/models/resistor.glb'); // Load the Resistor model

  // Recalculate bounding box whenever scale, position, or selection changes
  useEffect(() => {
    if (ref.current) {
      ref.current.name = 'resistor';
      // Remove any existing bounding box
      if (boxRef.current) {
        ref.current.remove(boxRef.current);
      }

      if (isSelected) {
        // Calculate the bounding box based on the updated scale and position
        const box3 = new THREE.Box3().setFromObject(ref.current);
        const boxHelper = new THREE.Box3Helper(box3, 'yellow');
        boxHelper.visible = true;
        ref.current.add(boxHelper); // Attach the new bounding box
        boxRef.current = boxHelper; // Store the reference to the bounding box
      }
    }
  }, [isSelected, position, scale]);

  return (
    <primitive
      ref={ref}
      object={scene} // The 3D Resistor object
      position={position} // Set position
      scale={scale} // Set scale
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling to the background
        onClick(ref.current); // Notify the parent component
      }}
    />
  );
};

export default Resistor;
