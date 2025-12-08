import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { useAuth } from '../contexts/AuthContext';
import { extend, useThree, useFrame, Canvas } from '@react-three/fiber';
import { EffectComposer, RenderPass, UnrealBloomPass, ShaderPass } from 'three-stdlib';
import { GammaCorrectionShader } from 'three-stdlib';

extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass });
import { Environment, Sky, PerspectiveCamera, Stats, PerformanceMonitor, AdaptiveDpr, AdaptiveEvents, BakeShadows, Bvh, Preload } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { Joystick } from "react-joystick-component";
import { Leva, useControls } from 'leva';
import axios from 'axios';
import { DateTime } from "luxon";

import { createPlantInstance, getAllPlantInstances } from '../services/plantService';
import { geoToLocal } from '../geoUtils';
import RemotePlayer from './RemotePlayer';
import FirstPersonController from './FirstPersonController';
import PlantBot from './PlantBot';
import HeldItem from './HeldItem';
import DropIndicator from './DropIndicator';
import DroppedModel from './DroppedModel';
import Garden from './Garden';
import RealtimeEnvironment from './RealtimeEnvironment';
import ProceduralTerrain from './ProceduralTerrain';


const Effects = () => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();

  useEffect(() => {
    if (composer.current) {
      composer.current.setSize(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (composer.current) {
      composer.current.render();
    }
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attach="passes-0" args={[scene, camera]} />
      {/* <unrealBloomPass attach="passes-1" args={[undefined, 0.4, 1, 0.9]} /> */}
      <shaderPass attach="passes-2" args={[GammaCorrectionShader]} />
    </effectComposer>
  );
};

// Define raycaster and ground plane once to avoid re-creation on renders
const raycaster = new THREE.Raycaster();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

/**
 * A component to handle drag-and-drop operations onto the 3D canvas.
 */
export const DragHandler = ({
  draggedModel,
  setDraggedModel,
  setPlacedModels,
  setDropIndicatorPosition,
  canvasRef,
  currentUser,
}) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const canvasElement = canvasRef.current;
    // Exit if the canvas isn't ready or if nothing is being dragged
    if (!canvasElement || !draggedModel) {
      // Ensure the indicator is hidden when not dragging
      if (setDropIndicatorPosition) setDropIndicatorPosition(null);
      return;
    }

    // --- Event Handler for Dragging Over the Canvas ---
    const handleDragOver = (e) => {
      e.preventDefault(); // Necessary to allow dropping

      // Get mouse/touch position relative to the canvas
      const rect = canvasElement.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      // Convert screen coordinates to normalized device coordinates (-1 to +1)
      const mouse = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );

      // Update the raycaster with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate the intersection point with the ground plane
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(groundPlane, intersectionPoint);

      // Update the position of the visual drop indicator
      if (setDropIndicatorPosition) {
        setDropIndicatorPosition([intersectionPoint.x, 0, intersectionPoint.z]);
      }
    };

    // --- Event Handler for When the Drag Leaves the Canvas ---
    const handleDragLeave = () => {
      if (setDropIndicatorPosition) {
        setDropIndicatorPosition(null);
      }
    };

    // --- Event Handler for the Drop Action ---
    const handleDrop = async (e) => {
      e.preventDefault();
      if (!draggedModel) return;

      // To ensure accuracy, we recalculate the drop position on the final event
      const rect = canvasElement.getBoundingClientRect();
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      const mouse = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const finalDropPosition = new THREE.Vector3();
      raycaster.ray.intersectPlane(groundPlane, finalDropPosition);
      const dropPositionArray = [finalDropPosition.x, 0, finalDropPosition.z];

      // Logic to handle planting a plant model
      if (draggedModel.type === 'plant') {
        try {
          const instance = await createPlantInstance({
            plantId: draggedModel.id,
            position: dropPositionArray,
            stage: draggedModel.stages?.[0]?.id || 'seed',
            water: 0,
            nutrients: {},
            userEmail: currentUser?.email || 'unknown',
            modelPath: draggedModel.modelPath || 'default/path.glb',
          });

          if (setPlacedModels) {
            setPlacedModels(prev => [
              ...prev,
              {
                ...draggedModel,
                position: dropPositionArray,
                id: instance.id, // Use the real ID from Firestore
                instanceId: instance.id,
                plantId: draggedModel.id,
              }
            ]);
          }

          // Smart Shadow Update: Briefly re-enable shadow map updating to catch the new object
          // forcing a single frame update for static shadows
          gl.shadowMap.needsUpdate = true;
        } catch (error) {
          console.error('[DragHandler] Failed to plant:', error);
          alert('Failed to plant: ' + error.message);
        }
      } else {
        // Logic to handle dropping other asset types
        if (setPlacedModels) {
          setPlacedModels(prev => [
            ...prev,
            {
              ...draggedModel,
              position: dropPositionArray,
              id: `${draggedModel.id}-${Date.now()}` // Create a temporary unique ID
            }
          ]);
        }
      }

      // Reset drag-related states
      if (setDraggedModel) setDraggedModel(null);
      if (setDropIndicatorPosition) setDropIndicatorPosition(null);
    };

    // --- Add Event Listeners ---
    // We listen for both mouse and touch events for broad compatibility
    canvasElement.addEventListener('dragover', handleDragOver);
    canvasElement.addEventListener('touchmove', handleDragOver, { passive: false });
    canvasElement.addEventListener('dragleave', handleDragLeave);
    canvasElement.addEventListener('drop', handleDrop);
    canvasElement.addEventListener('touchend', handleDrop); // Use touchend for the drop action on touch devices

    // --- Cleanup Function ---
    // This runs when the component unmounts or dependencies change
    return () => {
      canvasElement.removeEventListener('dragover', handleDragOver);
      canvasElement.removeEventListener('touchmove', handleDragOver);
      canvasElement.removeEventListener('dragleave', handleDragLeave);
      canvasElement.removeEventListener('drop', handleDrop);
      canvasElement.removeEventListener('touchend', handleDrop);
    };
  }, [camera, draggedModel, canvasRef, currentUser, setDraggedModel, setDropIndicatorPosition, setPlacedModels]); // Dependencies for the effect

  return null; // This component does not render any visible elements
};

export default function Scene({
  sunPosition,
  skyTurbidity,
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
  isMarketplaceOpen,
}) {

  const canvasRef = useRef();
  const usersRef = useRef(users);
  const raycaster = new THREE.Raycaster();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const { currentUser } = useAuth();
  const [lat, lng] = coords || [0, 0];
  const initXZ = coords ? geoToLocal([lat, lng], [0, 0]) : [0, 0];
  const initPosition = [
    initXZ[0],
    -2, // Assuming ground level is 0
    initXZ[2]
  ]

  const checkMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 512;

  const [isMobile, setIsMobile] = useState(checkMobile());
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile());
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isFirstPerson, setIsFirstPerson] = useState(true); // Default to 1st person
  const joystickDataRef = useRef({ x: 0, y: 0 });
  const controllerRef = useRef(); // Ref for FirstPersonController

  const handleJoystickMove = (e) => {
    joystickDataRef.current = {
      x: e.x,
      y: e.y
    };
  };

  const handleJoystickStop = () => {
    joystickDataRef.current = { x: 0, y: 0 };
  };

  // Handle 'toggleView' event
  useEffect(() => {
    const handleToggle = () => setIsFirstPerson(prev => !prev);
    window.addEventListener('toggleView', handleToggle);
    return () => window.removeEventListener('toggleView', handleToggle);
  }, []);

  // Keep usersRef updated
  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  // Handle transform updates
  useEffect(() => {
    if (!socket) return;

    const handleTransform = ({ userName: updatedUserName, position, rotation, isWalking }) => {
      console.log('[Scene] Received transform:', updatedUserName, position);
      const userToUpdate = usersRef.current.find(u => u.name === updatedUserName || u.userId === updatedUserName);

      if (userToUpdate) {
        // console.log('[Scene] Updating user:', userToUpdate.name);
        // Ensure position is stowhite as [x, y, z] array to match RemotePlayer expectation
        const newPos = Array.isArray(position) ? position : [position.x, position.y, position.z];
        userToUpdate.position = newPos;
        userToUpdate.rotation = rotation;
        userToUpdate.isWalking = isWalking;
      } else {
        console.warn('[Scene] User not found for update:', updatedUserName, usersRef.current.map(u => u.name));
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
    if (isMobile) return;

    const handleKeyDown = (e) => {
      if (e.key === 'w' && isPointerLocked) {
        setIsWalking(prev => !prev); // Toggle walking state
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, isPointerLocked]);


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
      <Leva hidden />
      <Canvas
        frameloop={isMarketplaceOpen ? "never" : "always"}
        shadows="soft"
        dpr={dpr}
        ref={canvasRef}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true,
          logarithmicDepthBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.5,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        frameBufferType={THREE.HalfFloatType}
        style={{ height: '100%' }}
        onDoubleClick={handleCanvasClick}
      >

        <Stats />
        <PerformanceMonitor onDecline={() => setDpr(0.5)} onIncline={() => setDpr(1.5)} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <BakeShadows />
        <Preload all />
        {/* <RealtimeEnvironment
          lat={lat}
          lng={lng}
          position={position}
          useRealtime={levaControls.useRealtime}
          customEnv={levaControls}
          onBackgroundIntensityChange={setBackgroundIntensity}
          localHour={localHour}
          zoneName={zoneName} // <-- pass the timezone name as a prop
        /> */}

        {/* Darker Environment */}
        {/* <Environment environmentIntensity={0.05} backgroundIntensity={0.05} files={'/hdr/the_sky_is_on_fire_4k.exr'} /> */}

        {/* Minimal lighting for shadows */}
        <ambientLight intensity={0.1} />
        <group>
          <directionalLight
            position={[-8, 15, 10]}
            intensity={1}
            rotation={[Math.PI / 2, 0, 0]}
            color={'white'}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
          <directionalLight
            position={[-8, 15, 0]}
            intensity={1}
            rotation={[Math.PI / 2, 0, 0]}
            color={'white'}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
        </group>
        <group>
          <directionalLight
            position={[8, 15, 10]}
            intensity={1}
            rotation={[Math.PI / 2, 0, 0]}
            color={'white'}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
          <directionalLight
            position={[8, 15, 0]}
            intensity={1}
            rotation={[Math.PI / 2, 0, 0]}
            color={'white'}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
        </group>
        <group>
          <directionalLight
            position={[12, 25, 10]}
            intensity={1}
            rotation={[0, 0, 0]}
            color={'white'}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
          <directionalLight
            position={[12, 25, 0]}
            intensity={1}
            rotation={[0, 0, 0]}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
        </group>
        <group>
          <directionalLight
            position={[-25, 25, 10]}
            intensity={1}
            rotation={[0, 0, 0]}
            color={'white'}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
          <directionalLight
            position={[-25, 25, 0]}
            intensity={1}
            rotation={[0, 0, 0]}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
        </group>
        <group>
          <directionalLight
            position={[-35, 25, 10]}
            intensity={1}
            rotation={[0, 0, 0]}
            color={'white'}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
          <directionalLight
            position={[-35, 25, 0]}
            intensity={1}
            rotation={[0, 0, 0]}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
            shadow-bias={-0.0001}
          />
        </group>

        <DragHandler
          draggedModel={draggedModel}
          canvasRef={canvasRef}
        />


        <Bvh firstHitOnly>
          <Physics gravity={[0, -9.81, 0]}>
            <FirstPersonController
              ref={controllerRef}
              startPosition={[position.x, position.y, position.z - 2]} // Start slightly higher to avoid floor clip
              socket={socket}
              userName={userName}
              isMobile={isMobile}
              isFirstPerson={isFirstPerson}
              aimActiveRef={{ current: false }} // Stub
              joystickDataRef={joystickDataRef}
              isMenuOpen={false}
            />

            {usersRef.current.map((user) => {
              // Don't render self as remote player if userId/name matches
              if (user.userId === socket?.id || user.name === userName) return null;

              return (
                <RemotePlayer
                  key={user.userId || user.name}
                  player={user}
                  playerId={user.userId || user.name}
                />
              );
            })}

            <CuboidCollider args={[1000, 1, 1000]} position={[0, -3, 0]} /> {/* Invisible Floor */}

            {/* Visible ground plane for shadow receiving */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.99, 0]}>
              <planeGeometry args={[2000, 2000]} />
              <meshStandardMaterial
                color="#4a5f3a"
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>

            {/* <PlantBot position={[2, 0, 2]} refillResourceFromAdvice={refillResourceFromAdvice} /> */}
            {heldItem && (
              <HeldItem
                item={heldItem}
                waterCapacity={waterJugCapacity}
              />
            )}
            {users.map((user) => {
              if (user.name === userName) return null;
              return (
                <RemotePlayer
                  key={user.id}
                  player={user}
                  playerId={user.id}
                />
              );
            })}

            {/* <ProceduralTerrain
              bbox={memoizedBBox}
              position={memoizedInitPosition}
              envIntensity={backgroundIntensity}
            /> */}
            <Garden scale={2} position={[0, 2, 0]} onSelect={setSelectedModel} />

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
          </Physics>
        </Bvh>

        {/* Manual Post-Processing */}
        {/* <Effects /> */}
      </Canvas>
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: isLandscape ? '40px' : '160px',
          left: '40px',
          zIndex: 2000,
          pointerEvents: 'auto'
        }}>
          <Joystick
            size={100}
            sticky={false}
            baseColor="rgba(255, 255, 255, 0.1)"
            stickColor="rgba(255, 255, 255, 0.3)"
            move={handleJoystickMove}
            stop={handleJoystickStop}
          />
        </div>
      )}

    </>
  );
}
