import React, { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useAuth } from '../contexts/AuthContext';
import { createPlantInstance, getAllPlantInstances } from '../services/plantService';
import Avatar from './Avatar';
import { Canvas } from '@react-three/fiber';
import { Environment, Sky, PerspectiveCamera, Stats } from '@react-three/drei';
import Rig from './Rig';
import PlantBot from './PlantBot';
import HeldItem from './HeldItem';
import DropIndicator from './DropIndicator';
import DroppedModel from './DroppedModel';
import Garden from './Garden';
import { useThree } from '@react-three/fiber';
export default function Scene({
  envPreset,
  sunPosition,
  skyTurbidity,
  directionalIntensity,
  position,
  setPosition,
  isWalking,
  setIsWalking,
  draggedModel,
  setDraggedModel,
  enterAr,
  userName,
  socket,
  users,
  heldItem,
  dropIndicatorPosition,
  setDropIndicatorPosition,
  placedModels,
  setPlacedModels,
  setSelectedModel,
  setSelectedModelDetails,
  waterJugCapacity,
  feedPlant,
  handleModelPositionChange,
  refillResourceFromAdvice,
  isPointerLocked,
  setIsPointerLocked,
}) {

  const canvasRef = useRef();
  const usersRef = useRef(users);
  const raycaster = new THREE.Raycaster();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const { currentUser } = useAuth();


  const isPC = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // Keep usersRef updated
  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  // Handle transform updates
  useEffect(() => {
    if (!socket) return;

    const handleTransform = ({ userName: updatedUserName, position, rotation, isWalking }) => {
      const userToUpdate = usersRef.current.find(u => u.name === updatedUserName);
      if (userToUpdate) {
        userToUpdate.position = position;
        userToUpdate.rotation = rotation;
        userToUpdate.isWalking = isWalking;
      }
    };

    socket.on('user-transform', handleTransform);
    return () => socket.off('user-transform', handleTransform);
  }, [socket]);

  useEffect(() => {
    const handleLockChange = () => {
      const locked = document.pointerLockElement != null;
      setIsPointerLocked(locked);
      if (!locked) {
        setIsWalking(false); // Stop walking when pointer lock is released
      }
    };

    document.addEventListener('pointerlockchange', handleLockChange);
    return () => {
      document.removeEventListener('pointerlockchange', handleLockChange);
    };
  }, []);

  // PC: W key toggle walking
  useEffect(() => {
    if (!isPC) return;

    const handleKeyDown = (e) => {
      if (e.key === 'w' && isPointerLocked) {
        setIsWalking(prev => !prev); // Toggle walking state
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPC, isPointerLocked]);

  // Create a component to handle drag operations with access to the camera
  const DragHandler = () => {
    const { camera } = useThree();

    useEffect(() => {
      const handleDragOver = (e) => {
        e.preventDefault();
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        // Get coordinates from either mouse or touch event
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const mouse = new THREE.Vector2(
          ((clientX - rect.left) / rect.width) * 2 - 1,
          -((clientY - rect.top) / rect.height) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        const intersectionPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(groundPlane, intersectionPoint);

        setDropIndicatorPosition([intersectionPoint.x, 0, intersectionPoint.z]);
      };

      const handleDragLeave = () => {
        setDropIndicatorPosition(null);
      };

      const handleDrop = async (e) => {
        e.preventDefault();
        if (!draggedModel || !dropIndicatorPosition) return;

        if (draggedModel.type === 'plant') {
          try {
            console.log('[DEBUG] Drag-drop: Attempting to add plant to Firestore:', {
              plantId: draggedModel.id,
              position: dropIndicatorPosition,
              stage: draggedModel.stages?.[0]?.id || 'seed',
              water: 0,
              nutrients: {},
              userEmail: currentUser?.email || 'unknown',
              modelPath: draggedModel.modelPath,
            });
            const instance = await createPlantInstance({
              plantId: draggedModel.id,
              position: dropIndicatorPosition,
              stage: draggedModel.stages?.[0]?.id || 'seed',
              water: 0,
              nutrients: {},
              userEmail: currentUser?.email || 'unknown',
              modelPath: 'hi',
            });
            console.log('[DEBUG] Drag-drop: Plant added to Firestore with id:', instance.id, instance);
            setPlacedModels(prev => [
              ...prev,
              {
                ...draggedModel,
                position: dropIndicatorPosition,
                id: instance.id,
                plantId: draggedModel.id, // Store plantId for future reference
              }
            ]);
          } catch (e) {
            console.error('[DEBUG] Drag-drop: Failed to plant:', e);
            alert('Failed to plant: ' + e.message);
          }
        } else {
          setPlacedModels(prev => [
            ...prev,
            {
              ...draggedModel,
              position: dropIndicatorPosition,
              id: `${draggedModel.id}-${Date.now()}`
            }
          ]);
        }

        setDraggedModel(null);
        setDropIndicatorPosition(null);
      };

      // Add event listeners for both mouse and touch events
      const canvas = canvasRef.current;
      canvas.addEventListener('dragover', handleDragOver);
      canvas.addEventListener('touchmove', handleDragOver, { passive: true });
      canvas.addEventListener('dragleave', handleDragLeave);
      canvas.addEventListener('touchend', handleDragLeave);
      canvas.addEventListener('drop', handleDrop);
      canvas.addEventListener('touchend', handleDrop);

      return () => {
        canvas.removeEventListener('dragover', handleDragOver);
        canvas.removeEventListener('touchmove', handleDragOver);
        canvas.removeEventListener('dragleave', handleDragLeave);
        canvas.removeEventListener('touchend', handleDragLeave);
        canvas.removeEventListener('drop', handleDrop);
        canvas.removeEventListener('touchend', handleDrop);
      };
    }, [camera, draggedModel]);

    return null;
  };

  useEffect(() => {
    // 1. Load plant catalog at startup
    const loadPlants = async () => {
      try {
        const plants = await getAllPlantInstances();
        // Plant instances now include all plant catalog data directly
        console.log('placed models: ', plants);
        setPlacedModels(plants);
      } catch (e) {
        console.error('[DEBUG] Failed to load plant instances from Firestore:', e);
      }
    };
    loadPlants();
  }, []);

  useEffect(() => {
    console.log('[DEBUG] Current position:', position);
  }, [position]);

  // Clean up VR state when switching to AR
  useEffect(() => {
    if (enterAr) {
      // Wait for next tick to ensure VR UI/components are unmounted before ARPage mounts
      setTimeout(() => {
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
        setIsWalking(false);
        setIsPointerLocked(false);
        // Add any additional VR-specific cleanup here
      }, 0);
    }
  }, [enterAr]);

  const handleCanvasClick = () => {
    if (
      !isPointerLocked &&
      canvasRef.current &&
      document.body.contains(canvasRef.current) &&
      !enterAr // <-- Add this guard
    ) {
      canvasRef.current.requestPointerLock();
    }
  };

  return (
    <Canvas
      shadows
      ref={canvasRef}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: true,
        logarithmicDepthBuffer: true
      }}
      style={{ height: '100%' }}
      onDoubleClick={handleCanvasClick}
    >
      <Stats/>
      <Environment preset={envPreset} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={sunPosition}
        intensity={directionalIntensity}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <DragHandler/>
      <PerspectiveCamera makeDefault position={[position.x, position.y, position.z]} />
      <Sky sunPosition={sunPosition} turbidity={skyTurbidity} />
      <Rig
        userName={userName}
        socket={socket}
        position={position}
        setPosition={setPosition}
        isWalking={isWalking}
        enterAr={enterAr}
      />
      <PlantBot position={[2, 0, 2]} refillResourceFromAdvice={refillResourceFromAdvice} />
      {heldItem && (
        <HeldItem
          item={heldItem}
          waterCapacity={waterJugCapacity}
        />
      )}
      {users.map((user) => {
        if (user.name === userName) return null;
        return (
          <Avatar
            key={user.id}
            position={user.position}
            userName={user.name}
            rotation={user.rotation}
            isWalking={user.isWalking}
          />
        );
      })}
      <mesh
        position={[position.x, 0, position.z]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2500, 2500]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <Garden scale={0.5} />

      {placedModels.map((model) => (
        <DroppedModel
          plantId={model.plantId}
          instanceId={model.instanceId}
          key={model.instanceId}
          modelPath={model.modelPath}
          position={model.position || [0, 0, 0]}
          name={model.name}
          description={model.description}
          onPositionChange={(newPosition) => handleModelPositionChange(model.id, newPosition)}
          setSelectedModel={setSelectedModel}
          setSelectedModelDetails={setSelectedModelDetails}
          heldItem={heldItem}
          feedPlant={feedPlant}
        />
      ))}
    </Canvas>
  );
}
