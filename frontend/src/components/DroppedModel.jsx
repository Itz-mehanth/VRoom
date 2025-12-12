import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGLTF, PresentationControls, DragControls, Billboard, Text, OrbitControls, Center } from '@react-three/drei';
import { useThree, useLoader } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ModelIndicator from './ModelIndicator';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getModelStats } from '../services/plantService'; // adjust path as needed

const DroppedModel = ({ modelPath, position, onClick, name, scale }) => {
  const modelRef = useRef();
  const [modelHeight, setModelHeight] = useState(0);

  const gltf = useLoader(GLTFLoader, modelPath);

  // Create a clone of the model when it's loaded
  const modelClone = useMemo(() => {
    if (gltf) {
      return gltf.scene.clone();
    }
    return null;
  }, [gltf]);

  // Calculate model height on load
  useEffect(() => {
    if (modelClone) {
      const box = new THREE.Box3().setFromObject(modelClone);
      const height = box.max.y - box.min.y;
      setModelHeight(height);

      // Enable shadows on all meshes in the model
      modelClone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [modelClone]);

  const handleClick = (e) => {
    e.stopPropagation();
    onClick?.();
  };

  // Calculate adjusted position to place model on ground
  const adjustedPosition = [
    position[0],
    position[1],
    position[2]
  ];

  // Calculate scaling factor safely
  const scaleVal = scale || 0.4;

  return (
    <>
      <mesh ref={modelRef} castShadow receiveShadow position={adjustedPosition}>
        <Center bottom>
          <primitive
            scale={8}
            object={modelClone}
          />
        </Center>
      </mesh>

      {/* ModelIndicator */}
      <ModelIndicator
        position={[
          0,
          1, // Place above scaled model
          0
        ]}
        name={name}
        isHovered={false} // Static in AR view
        modelStats={null}
        heldItem={null}
      />
    </>
  );
};

export default DroppedModel;
