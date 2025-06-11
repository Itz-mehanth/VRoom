import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, PresentationControls, DragControls, Billboard, Text, OrbitControls } from '@react-three/drei';
import { useThree, useLoader } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ModelIndicator from './ModelIndicator';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const DroppedModel = ({ modelPath, position, onClick, name, description, setSelectedModel, setSelectedModelDetails, heldItem }) => {
  const meshRef = useRef();
  const modelRef = useRef();
  const draggableRef = useRef();
  const { gl } = useThree();
  const { camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [modelHeight, setModelHeight] = useState(0);
  const originalMaterial = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [modelStats, setModelStats] = useState({
    water: 0,
    fertilizer1: 0,
  });

  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    console.log("GLTFLoader loaded: ", loader);
  }, (error) => {
    console.error("Error loading GLTF: ", error);
  });

  // Calculate model height on load
  useEffect(() => {
    console.log("modelPath received: ", modelPath);
    if (gltf) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const height = box.max.y - box.min.y;
      setModelHeight(height);
    }
  }, [gltf]);

  // Set initial material reference
  useFrame(() => {
    if (modelRef.current && !originalMaterial.current) {
      const mesh = modelRef.current;
      if (mesh.material) {
        originalMaterial.current = mesh.material.clone();
      }
    }
  });

  // Handle item application
  const handleClick = (e) => {
    e.stopPropagation();
    if (heldItem) {
      // Update stats based on held item type
      setModelStats(prev => {
        const newStats = { ...prev };
        if (heldItem.type === 'asset') {
          newStats.water += 1; // Add 1 liter of water
        } else if (heldItem.type === 'fertilizer') {
          if (heldItem.id === 'fertilizer1') {
            newStats.fertilizer1 += 100; // Add 100g of fertilizer1
          }
        }
        return newStats;
      });
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
    position[1] + (modelHeight/2) + 0.1, // Add half the model height to raise it to ground level
    position[2]
  ];

  // Raycasting for hover detection
  useFrame(({ raycaster, camera }) => {
    if (meshRef.current) {
      const intersects = raycaster.intersectObject(meshRef.current, true);
      setIsHovered(intersects.length > 0);
    }
  });

  if (!gltf) return null;

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
        onDragEnd={(e) => {
          e.stopPropagation();
          setIsDragging(false);
          const mesh = modelRef.current;
          if (mesh && originalMaterial.current) {
            mesh.material = originalMaterial.current.clone();
          }
        }}
      >
        <group
          ref={meshRef}
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
        >
          <primitive ref={modelRef} object={gltf.scene} />
          <Billboard position={[0, modelHeight + 0.5, 0]}>
            <Text fontSize={0.5} color="white" anchorX="center" anchorY="middle">
              {name}
            </Text>
          </Billboard>
          <ModelIndicator 
            position={adjustedPosition}
            isHovered={isHovered}
            modelStats={modelStats}
            heldItem={heldItem}
          />
        </group>
      </DragControls>
    </>
  );
};

export default DroppedModel;
