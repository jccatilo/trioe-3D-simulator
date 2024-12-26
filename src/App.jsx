import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Arduino from './components/Arduino';
import Resistor from './components/Resistor';
import LED from './components/Led'; // Import the new LED component
import TrioeMainBoard from './components/TrioeMainBoard'; // Import the new LED component
import TrioeBreadBoard from './components/TrioeBreadBoard'; // Import the new LED component
import pushbutton from './components/PushButton'; // Import the new LED component
import PushButton from './components/PushButton';

const App = () => {
  const [selectedObject, setSelectedObject] = useState(null); // Track selected object
  const [dragging, setDragging] = useState(false); // Track dragging state
  const [lastMousePosition, setLastMousePosition] = useState(null); // Track last mouse position
  const [movementMode, setMovementMode] = useState(null); // Track movement mode (rotation, translation)

  const handleObjectClick = (object) => {
    setSelectedObject(object); // Set the clicked object as selected
    console.log(`Selected object: ${object.name}`); // Log selected object name
  };

  const handleDeselect = () => {
    setSelectedObject(null); // Deselect object on background click
    console.log("Deselected object"); // Log deselection
  };

  const handlePointerDown = (e) => {
    if (selectedObject) {
      setDragging(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY }); // Capture starting mouse position

      // Set movement mode based on key modifiers
      if (e.ctrlKey) {
        setMovementMode('translateXY'); // Move in X-Y plane
        console.log("Ctrl+Click: Moving in X-Y plane");
      } else if (e.shiftKey) {
        setMovementMode('translateZ'); // Move along Z-axis
        console.log("Shift+Click: Moving along Z-axis");
      } else {
        setMovementMode('rotate'); // Rotate by default
        console.log("Default Click: Rotating object");
      }
    }
  };

  const handlePointerMove = (e) => {
    if (dragging && selectedObject) {
      const deltaX = e.clientX - lastMousePosition.x; // Mouse movement in X
      const deltaY = e.clientY - lastMousePosition.y; // Mouse movement in Y

      if (movementMode === 'translateXY') {
        selectedObject.position.x += deltaX * 0.01; // Translate in X
        selectedObject.position.y -= deltaY * 0.01; // Translate in Y
        console.log(`Translating ${selectedObject.name} in X-Y:`, selectedObject.position);
      } else if (movementMode === 'translateZ') {
        selectedObject.position.z += deltaY * 0.01; // Translate in Z
        console.log(`Translating ${selectedObject.name} in Z:`, selectedObject.position);
      } else if (movementMode === 'rotate') {
        selectedObject.rotation.y += deltaX * 0.01; // Rotate around Y-axis
        selectedObject.rotation.x += deltaY * 0.01; // Rotate around X-axis
        selectedObject.rotation.z += deltaX * 0.005; // Add slight rotation on Z-axis
        console.log(`Rotating ${selectedObject.name}:`, selectedObject.rotation);
      }

      setLastMousePosition({ x: e.clientX, y: e.clientY }); // Update last mouse position
    }
  };

  const handlePointerUp = () => {
    setDragging(false); // Stop dragging
    setMovementMode(null); // Reset movement mode
    console.log("Stopped dragging");
  };

  return (
    <Canvas
      onPointerMissed={handleDeselect} // Deselect when clicking outside
      onPointerDown={handlePointerDown} // Start dragging
      onPointerMove={handlePointerMove} // Rotate/Translate on drag
      onPointerUp={handlePointerUp} // Stop dragging
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />

      {/* Render the Arduino model */}
      {/* <Arduino
        position={[2.75, 0.8, 1]} // Position for the Arduino
        scale={[1.75 , 1.75, 1.75]}
        onClick={(object) => handleObjectClick(object)} // Pass the clicked object
        isSelected={selectedObject && selectedObject.name === 'arduino'}
      /> */}

      {/* Render the Resistor model */}
      <Resistor
        position={[1.5, 1, 1]} // Position for the Resistor
        scale={[0.15, 0.15, 0.15]}
        onClick={(object) => handleObjectClick(object)} // Pass the clicked object
        isSelected={selectedObject && selectedObject.name === 'resistor'}
      />

      {/* Render the LED model */}
      <LED
        position={[1,0.5, 1]} // Position for the LED
        scale={[0.08, 0.08, 0.08]}
        onClick={(object) => handleObjectClick(object)} // Pass the clicked object
        isSelected={selectedObject && selectedObject.name === 'led'}
      />

      {/* Render the TRIOE model */}
      <TrioeMainBoard
        position={[-2.25, 0.8, 1]} // Position for the LED
        scale={[0.04, 0.04, 0.04]}
        onClick={(object) => handleObjectClick(object)} // Pass the clicked object
        isSelected={selectedObject && selectedObject.name === 'trioemainboard'}
      />
      <TrioeBreadBoard
        position={[0, 0.8, 1]} // Position for the LED
        scale={[0.04, 0.04, 0.04]}
        onClick={(object) => handleObjectClick(object)} // Pass the clicked object
        isSelected={selectedObject && selectedObject.name === 'trioebreadboard'}
      />
      <PushButton
        position={[1.85, 0.3, 1]} // Position for the Resistor
        scale={[0.05, 0.05, 0.05]}
        onClick={(object) => handleObjectClick(object)} // Pass the clicked object
        isSelected={selectedObject && selectedObject.name === 'resistor'}
      />

      {/* OrbitControls */}
      <OrbitControls enabled={!dragging} /> {/* Disable OrbitControls while dragging */}
    </Canvas>
  );
};

export default App;
