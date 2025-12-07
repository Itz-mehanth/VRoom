import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGLTF, PresentationControls, DragControls, Billboard, Text, OrbitControls } from '@react-three/drei';
import { useThree, useLoader } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ModelIndicator from './ModelIndicator';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getModelStats } from '../services/plantService'; // adjust path as needed

const DroppedModel = ({ plantId, instanceId, modelPath, position, onClick, name, description, setSelectedModel, setSelectedModelDetails, heldItem, onPositionChange, feedPlant }) => {
  const meshRef = useRef();
  const modelRef = useRef();
  const draggableRef = useRef();
  const { gl } = useThree();
  const { camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [modelHeight, setModelHeight] = useState(0);
  const [modelWidth, setModelWidth] = useState(0);
  const originalMaterial = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [modelStats, setModelStats] = useState(null);
  const [modelError, setModelError] = useState(false);

  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    if (!modelPath) {
      console.warn('No modelPath provided for DroppedModel');
      return null;
    }

    try {
      // Use a simple loader for now to avoid WebGL issues
      return null; // We'll handle loading differently
    } catch (error) {
      console.error('Error loading model:', error);
      setModelError(true);
      return null;
    }
  }
  );

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
      const width = box.max.x - box.min.x;
      setModelHeight(height);
      setModelWidth(width);

      // Enable shadows on all meshes in the model
      modelClone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [modelClone]);

  // Calculate model height on load
  useEffect(() => {
    if (modelClone) {
      const box = new THREE.Box3().setFromObject(modelClone);
      const height = box.max.y - box.min.y;
      const width = box.max.x - box.min.x;
      setModelHeight(height);
      setModelWidth(width);
    } else {
      // Default dimensions if no model
      setModelHeight(1);
      setModelWidth(1);
    }
  }, [modelClone]);

  // Set initial material reference
  useFrame(() => {
    if (modelRef.current && !originalMaterial.current) {
      const mesh = modelRef.current;
      if (mesh.material) {
        originalMaterial.current = mesh.material.clone();
      }
    }
  });

  useEffect(() => {
    let isMounted = true;
    console.log('plantId:', plantId, 'instanceId:', instanceId);
    if (plantId && instanceId) {
      getModelStats(plantId, instanceId).then(stats => {
        console.log('model stats: ', stats);
        if (isMounted) setModelStats(stats);
      });
    }
    return () => { isMounted = false; };
  }, [modelPath, plantId, instanceId]);

  // Handle item application
  const handleClick = (e) => {
    e.stopPropagation();
    if (heldItem && heldItem.type && heldItem.category) {
      // Use the specific type as the stat key
      handleFeed(heldItem.type, 1); // You may want to adjust the amount based on item type
    } else if (!isDragging) {
      setSelectedModel(modelPath);
      setSelectedModelDetails({
        name,
        description,
        position: adjustedPosition,
        modelPath,
        stats: modelStats
      });
      onClick?.();
    }
  };

  // Calculate adjusted position to place model on ground
  const adjustedPosition = [
    position[0],
    position[1] + (modelHeight / 2) + 0.1, // Add half the model height to raise it to ground level
    position[2]
  ];

  // Raycasting for hover detection
  useFrame(({ raycaster, camera }) => {
    if (meshRef.current) {
      const intersects = raycaster.intersectObject(meshRef.current, true);
      setIsHovered(intersects.length > 0);
    }
  });

  // Handle drag end to update position
  const handleDragEnd = (e) => {
    e.stopPropagation();
    setIsDragging(false);
    const mesh = modelRef.current;
    if (mesh && originalMaterial.current) {
      mesh.material = originalMaterial.current.clone();
    }

    // Update position if onPositionChange is provided
    if (onPositionChange && meshRef.current) {
      const newPosition = meshRef.current.position.toArray();
      onPositionChange(newPosition);
    }
  };

  const handleFeed = async (type, amount) => {
    await feedPlant(plantId, instanceId, type, amount);
    const updatedStats = await getModelStats(plantId, instanceId);
    setModelStats(updatedStats);
  };

  // If there's an error or no modelPath, render a placeholder
  if (modelError || !modelPath || !modelClone) {
    return (
      <mesh position={adjustedPosition}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name || 'Model'}
        </Text>
      </mesh>
    );
  }

  return (
    <>
      <DragControls
        axisLock='y'
        transformGroup={true}
        object={draggableRef}
        args={[draggableRef.current?.children, camera, gl.domElement]}
        onDragStart={(e) => {
          e.stopPropagation();
          setIsDragging(true);
          const mesh = modelRef.current;
          if (mesh) {
            mesh.material = mesh.material.clone();
            mesh.material.emissive = new THREE.Color(0x00ffff);
          }
        }}
        onDragEnd={handleDragEnd}
      >
        <mesh ref={modelRef} castShadow receiveShadow>
          <primitive
            ref={meshRef}
            scale={0.4}
            position={adjustedPosition}
            onClick={handleClick}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'grab';
              setIsHovered(true);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'auto';
              setIsHovered(false);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setIsHovered(true);
              handleClick(e);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              setIsHovered(false);
            }}
            object={modelClone} />
        </mesh>
      </DragControls>

      {/* ModelIndicator outside the DragControls */}
      <ModelIndicator
        position={[
          adjustedPosition[0],
          adjustedPosition[1] + 1, // Increased height to separate from name label
          adjustedPosition[2]
        ]}
        name={name}
        isHovered={isHovered}
        modelStats={modelStats}
        heldItem={heldItem}
      />
    </>
  );
};

export default DroppedModel;
