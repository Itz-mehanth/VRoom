import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
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
import Dep from './Dep';
import { useThree } from '@react-three/fiber';
import RealtimeEnvironment from './RealtimeEnvironment';
import { Leva, useControls } from 'leva';
import ProceduralTerrain from './ProceduralTerrain';
import { geoToLocal } from '../geoUtils';
import axios from 'axios';
import { DateTime } from "luxon";

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
  coords,
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
  const [lat, lng] = coords || [0, 0];
  const initXZ = coords ? geoToLocal([lat, lng], [0, 0]) : [0,0];
  const initPosition = [
    initXZ[0],
     -2, // Assuming ground level is 0
     initXZ[2]
  ]

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


  const levaControls = useControls('Environment', {
    useRealtime: { label: 'Use Real-Time Weather', value: true },
    hour: { value: 12, min: 0, max: 23, step: 1, render: (get) => !get('useRealtime') },
    cloudiness: { value: 20, min: 0, max: 100, step: 1, render: (get) => !get('useRealtime') },
    isRaining: { value: false, render: (get) => !get('useRealtime') },
    isSnow: { value: false, render: (get) => !get('useRealtime') },
    isThunder: { value: false, render: (get) => !get('useRealtime') },
    temp: { value: 25, min: -20, max: 45, step: 1, render: (get) => !get('useRealtime') },
   });

  const [backgroundIntensity, setBackgroundIntensity] = useState(1);
  const [zoneName, setZoneName] = useState(null);
  const [localHour, setLocalHour] = useState(new Date().getUTCHours());

  // Memoize bbox and position so they are stable references
  const memoizedBBox = useMemo(() => [lat - 0.05, lng - 0.05, lat + 0.05, lng + 0.05], []);
  const memoizedInitPosition = useMemo(() => initPosition, [initPosition[0], initPosition[1], initPosition[2]]);

  // Timezone handling
  useEffect(() => {
    const fetchTimezone = async () => {
      if (!lat || !lng) return;

      try {
        const tzRes = await axios.get('https://api.timezonedb.com/v2.1/get-time-zone', {
          params: {
            key: 'A57Y73285BMN',
            format: 'json',
            by: 'position',
            lat,
            lng,
          }
        });
        const zoneName = tzRes.data.zoneName; // e.g. "Asia/Kolkata"
        console.log('[DEBUG] Fetched timezone:', zoneName);
        setZoneName(zoneName);
        // You can now use the zoneName for any timezone-specific logic
        const localHour = DateTime.now().setZone(zoneName).hour;
        setLocalHour(localHour);
      } catch (error) {
        console.error('[DEBUG] Failed to fetch timezone:', error);
      }
    };

    fetchTimezone();
  }, [lat, lng]);

  useEffect(() => {
    if (zoneName) {
      setLocalHour(DateTime.now().setZone(zoneName).hour);
    }
  }, [zoneName]);

  return (
    <>
      <Leva collapsed/>
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
        <RealtimeEnvironment
          lat={lat}
          lng={lng}
          position={position}
          useRealtime={levaControls.useRealtime}
          customEnv={levaControls}
          onBackgroundIntensityChange={setBackgroundIntensity}
          localHour={localHour}
          zoneName={zoneName} // <-- pass the timezone name as a prop
        />
        <DragHandler/>
        <Sky sunPosition={sunPosition} turbidity={skyTurbidity} />
        

        
        <PerspectiveCamera makeDefault position={[position.x, position.y, position.z]} />
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
        
        <ProceduralTerrain
          bbox={memoizedBBox}
          position={memoizedInitPosition}
          envIntensity={backgroundIntensity}
        />
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
    </>
  );
}
