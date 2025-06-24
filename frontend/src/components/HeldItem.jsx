import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function HeldItem({ item, onPlace, waterCapacity = 0 }) {
  const { camera } = useThree();
  const modelRef = useRef();
  
  // Get the model path from the first stage if it exists
  const modelPath = item.stages?.[0]?.modelPath || item.modelPath;
  console.log("HeldItem modelPath:", modelPath);

  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    // Optional loader configuration can go here
  }, (error) => {
    console.error('Error loading model:', error);
  });

  // Update position to follow camera
  useFrame(() => {
    if (!modelRef.current) return;

    // Get camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    // Position the item in front of the camera
    const distance = 2;
    const targetPosition = new THREE.Vector3(
      camera.position.x + direction.x * distance,
      camera.position.y + direction.y * distance - 0.5, // Slightly lower than camera
      camera.position.z + direction.z * distance
    );
    
    // Update model position
    modelRef.current.position.copy(targetPosition);
    
    // Make the model face the same direction as the camera
    modelRef.current.rotation.y = camera.rotation.y;
  });

  // Handle click events for placing the item
  const handleClick = (e) => {
    e.stopPropagation();
    if (onPlace) {
      // If it's a water jug, check if it has water
      if (item.category === 'waterJug' && item.currentCapacity <= 0) {
        console.log('Water jug is empty! Go to the water pipe to refill.');
        return;
      }
      onPlace(e);
    }
  };

  // Only render if we have a valid model path and the model has loaded
  if (!modelPath || !gltf) return null;

  return (
    <group ref={modelRef} onClick={handleClick}>
      <primitive object={gltf.scene} />
    </group>
  );
} 