import React, { useState, useRef, useEffect, Suspense, createContext, useContext, Fragment } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import ToggleButton from './ToggleButton';
import { Environment, Sky, PerspectiveCamera, PointerLockControls, DragControls, OrbitControls, useGLTF, Stats, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import Avatar from './Avatar';
import Garden from './Garden';
import { RigidBody, Physics } from '@react-three/rapier';
import ModelList from './ModelList';
import DroppedModel from './DroppedModel';
import DropIndicator from './DropIndicator';
import WalkingIndicator from './WalkingIndicator';
import Minimap from './Minimap';
import HeldItem from './HeldItem';
import WaterPipe from './WaterPipe';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import PlantBot from './PlantBot';
import { createPlantInstance, updatePlantInstance, getAllPlantInstances } from '../services/plantService';
import { useAuth } from '../contexts/AuthContext';
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import L from "leaflet";
import {XR} from '@react-three/xr';
import { localToGeo, geoToLocal } from '../geoUtils';

function WorldMap({coords, placedModels = [], userMarkerPosition = null, peers = []}) {
  // Fallback center if coords is not valid
  const hasCoords = Array.isArray(coords) && coords.length === 2 && coords.every(Number.isFinite);
  const center = hasCoords ? coords : [0, 0];
  const zoom = hasCoords ? 20 : 2;
  const origin = [0, 0];

  // Custom emoji marker component
  function EmojiMarker({ position, emoji, label, isPeer }) {
    return (
      <Marker position={position} icon={L.divIcon({
        className: '',
        html: isPeer
          ? `<div style='display: flex; flex-direction: column; align-items: center;'>\
                <span style='display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: #1976d2; color: #fff; font-size: 18px; font-weight: bold; border: 2px solid #fff;'>${label}</span>\
             </div>`
          : `<span style='font-size: 32px; line-height: 1;'>${emoji}</span>`
      })} />
    );
  }

  return (
    <Fragment>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* User marker: use userMarkerPosition if provided, else coords */}
        {userMarkerPosition && <EmojiMarker position={userMarkerPosition} emoji="🔵" label={`${userMarkerPosition[0]}, ${userMarkerPosition[1]}`} />}
        {placedModels && placedModels.map((model, idx) => {
          if (!model.position) return null;
          const [x, , z] = model.position;
          const [lat, lng] = localToGeo([x, z], origin);
          return <EmojiMarker key={model.instanceId || idx} position={[lat, lng]} emoji="🟢" label={`${lat}, ${lng}`} />;
        })}
      </MapContainer>
    </Fragment>
  )
}

const Rig = ({ userName, socket, position, setPosition, isWalking, enterAr }) => {
  const rigRef = useRef();
  const mobileControlsRef = useRef();
  const { camera } = useThree();
  const lastUpdateRef = useRef(Date.now());
  const UPDATE_INTERVAL = 500;
  const cameraTargetRef = useRef(new THREE.Vector3());
  const [isColliding, setIsColliding] = useState(false);

  // Only update OrbitControls target when teleporting or entering a new room
  useEffect(() => {
    if (mobileControlsRef.current && !(isPC && !enterAr)) {
      // Set target to a point in front of the new position
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      const target = new THREE.Vector3(position.x, position.y, position.z).add(forward);
      mobileControlsRef.current.target.copy(target);
      mobileControlsRef.current.update();
    }
  }, [position.x, position.y, position.z, camera, enterAr]);

  useFrame((state, delta) => {
    if (!rigRef.current) return;

    // Calculate 2D angle from camera direction
    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)
    let angleDeg = THREE.MathUtils.radToDeg(Math.atan2(dir.x, dir.z))
    if (angleDeg < 0) angleDeg += 360;

    // Convert back to radians for rotation
    const angleRad = THREE.MathUtils.degToRad(angleDeg)

    const now = Date.now();
    const shouldUpdate = socket && now - lastUpdateRef.current >= UPDATE_INTERVAL;

    if (isWalking && !isColliding) {
      const speed = 2;

      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(camera.quaternion);
      forward.y = 0;
      forward.normalize();

      // Calculate new position
      const newX = rigRef.current.position.x + forward.x * speed * delta;
      const newZ = rigRef.current.position.z + forward.z * speed * delta;

        const newPosition = {
          x: newX,
          y: rigRef.current.position.y,
          z: newZ
        };

        rigRef.current.position.x = newPosition.x;
        rigRef.current.position.z = newPosition.z;

        // Only update camera position if using PointerLockControls (PC)
        if (isPC && !enterAr) {
          cameraTargetRef.current.set(newPosition.x, newPosition.y, newPosition.z);
          camera.position.lerp(cameraTargetRef.current, 0.1);
        }
        setPosition(newPosition);

        if (shouldUpdate) {
          const newRotation = {
            x: 0,
            y: angleRad,
            z: 0,
          };

          socket.emit('update-transform', { 
            position: newPosition, 
            userName,
            rotation: newRotation,
            isWalking
          });
          lastUpdateRef.current = now;
        }
    } else if (shouldUpdate) {
      // Send updates even when not walking to sync state
      const newRotation = {
        x: 0,
        y: angleRad,
        z: 0,
      };

      socket.emit('update-transform', {
        position: rigRef.current.position, 
        userName,
        rotation: newRotation,
        isWalking
      });
      lastUpdateRef.current = now;
    }
  });

  return (
    <group ref={rigRef} position={[position.x, position.y, position.z]}>
      {isPC && !enterAr ? (
        <PointerLockControls />
      ) : (
        <OrbitControls 
          ref={mobileControlsRef}
          // position={[position.x, position.y, position.z]}
          // target={cameraTargetRef.current}
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
        />
      )}
    </group>
  );
};

const isPC = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

// Create a separate component for the model preview
const ModelPreviewContent = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={1}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={2}
      />
      <primitive object={gltf.scene} scale={1.5} position={[0, 0, 0]} />
    </>
  );
};

const ModelPreview = ({ modelPath }) => {
  return (
    <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
      <Suspense fallback={null}>
        <ModelPreviewContent modelPath={modelPath} />
      </Suspense>
    </Canvas>
  );
};

// Add ModelRegistry component at the top level
const ModelRegistry = ({ children }) => {
  const [models, setModels] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      const modelPaths = {
        'head': '/models/head.glb',
        'waterJug': '/models/environment.glb',
      };

      const loader = new GLTFLoader();
      const loadedModels = {};

      try {
        for (const [key, path] of Object.entries(modelPaths)) {
          const gltf = await loader.loadAsync(path);
          loadedModels[key] = gltf;
        }
        setModels(loadedModels);
      } catch (error) {
        console.error('Error loading models:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  // Create a context to provide the models to children
  return (
    <ModelContext.Provider value={{ models, isLoading }}>
      {children}
    </ModelContext.Provider>
  );
};

// Create a context for the model registry
const ModelContext = createContext();

export default function VRScene ({ roomId, userName, users, toggleView, socket, enterAr, coords }) {
  const [isWalking, setIsWalking] = useState(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isPlantListOpen, setIsPlantListOpen] = useState(false);
  const [isFertilizerListOpen, setIsFertilizerListOpen] = useState(false);
  const [isAssetListOpen, setIsAssetListOpen] = useState(false);
  const [placedModels, setPlacedModels] = useState([]);
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState(null);
  const [draggedModel, setDraggedModel] = useState(null);
  const [heldItem, setHeldItem] = useState(null);
  const [waterJugCapacity, setWaterJugCapacity] = useState(0);
  const canvasRef = useRef();
  const usersRef = useRef(users);
  const raycaster = new THREE.Raycaster();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedModelDetails, setSelectedModelDetails] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const gardenRef = useRef();
  const { currentUser } = useAuth();
  const [waterInHand, setWaterInHand] = useState(0);
  const [fertilizerInHand, setFertilizerInHand] = useState({});
  const inventory = {
    waterjug: waterInHand,
    fertilizer: fertilizerInHand,
  }

  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDayPhase());

  function getTimeOfDayPhase() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  }


  // Set initial position based on coords and update when coords change
  const [position, setPosition] = useState(() => {
    const origin = [0, 0];
    if (coords) {
      const [x, y, z] = geoToLocal(coords, origin);
      return { x, y: 1.7, z };
    }
    return { x: 0, y: 1.7, z: 5 };
  });

  // Only update position from coords when coords actually change (teleport/new room)
  const lastCoordsRef = useRef(null);
  useEffect(() => {
    const origin = [0, 0];
    if (coords) {
      const coordsString = coords.join(',');
      if (lastCoordsRef.current !== coordsString) {
        lastCoordsRef.current = coordsString;
        const [x, y, z] = geoToLocal(coords, origin);
        setPosition({ x, y: 1.7, z });
      }
    }
  }, [coords]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDayPhase());
    }, 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Choose environment preset and lighting based on timeOfDay
  let envPreset = 'sunset';
  let ambientIntensity = 0.5;
  let directionalIntensity = 1;
  let skyTurbidity = 8;
  let sunPosition = [100, 20, 100];

  if (timeOfDay === 'dawn') {
    envPreset = 'sunset';
    ambientIntensity = 0.3;
    directionalIntensity = 0.5;
    skyTurbidity = 10;
    sunPosition = [50, 10, 50];
  } else if (timeOfDay === 'morning') {
    envPreset = 'forest';
    ambientIntensity = 0.7;
    directionalIntensity = 1.2;
    skyTurbidity = 6;
    sunPosition = [100, 30, 100];
  } else if (timeOfDay === 'afternoon') {
    envPreset = 'city';
    ambientIntensity = 1;
    directionalIntensity = 1.5;
    skyTurbidity = 4;
    sunPosition = [150, 50, 150];
  } else if (timeOfDay === 'evening') {
    envPreset = 'sunset';
    ambientIntensity = 0.4;
    directionalIntensity = 0.7;
    skyTurbidity = 12;
    sunPosition = [80, 10, 80];
  } else if (timeOfDay === 'night') {
    envPreset = 'night';
    ambientIntensity = 0.1;
    directionalIntensity = 0.2;
    skyTurbidity = 20;
    sunPosition = [0, -10, 0];
  }

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

  const handleModelPositionChange = async (id, newPosition) => {
    setPlacedModels(prev =>
      prev.map(model =>
        model.id === id ? { ...model, position: newPosition } : model
      )
    );
    // Find the model to check if it's a plant
    const model = placedModels.find(m => m.id === id);
    if (model && model.type === 'plant' && model.plantId) {
      try {
        console.log('[DEBUG] Updating plant position in Firestore:', id, newPosition);
        await updatePlantInstance(model.plantId, id, { position: newPosition });
        console.log('[DEBUG] Plant position updated in Firestore:', id);
      } catch (e) {
        console.error('[DEBUG] Failed to update plant position in Firestore:', e);
      }
    }
  };

  // Handle placing held items
  const handlePlaceHeldItem = async (position) => {
    // if (heldItem) {
    //   // Only add to Firestore if it's a plant
    //   if (heldItem.type === 'plant') {
    //     try {
    //       const instance = await createPlantInstance({
    //         plantId: heldItem.id,
    //         position,
    //         stage: heldItem.stages?.[0]?.id || 'seed',
    //         water: 0,
    //         nutrients: {},
    //         userEmail: currentUser?.email || 'unknown',
    //         modelPath: heldItem.modelPath,
    //       });

    //       setPlacedModels(prev => [
    //         ...prev,
    //         {
    //           ...heldItem,
    //           position,
    //           id: instance.id,
    //           plantId: heldItem.id, // Store plantId for future reference
    //         }
    //       ]);
    //     } catch (e) {
    //       alert('Failed to plant: ' + e.message);
    //     }
    //   } else {
    //     setPlacedModels(prev => [
    //       ...prev,
    //       {
    //         ...heldItem,
    //         position,
    //         id: `${heldItem.id}-${Date.now()}`
    //       }
    //     ]);
    //   }
    //   setHeldItem(null);
    // }
  };

  const handleRefillWater = () => {
    if (heldItem && heldItem.type === 'waterJug') {
      // Update the water jug's capacity
      setHeldItem(prev => ({
        ...prev,
        currentCapacity: prev.maxCapacity
      }));
      setWaterJugCapacity(heldItem.maxCapacity);
      alert('Water jug refilled');
    }
  };

  // Function to refill water/fertilizer in hand from PlantBot advice
  const refillResourceFromAdvice = (type, amount, category) => {
    if (type === 'water') {
      setWaterInHand(amount);
      console.log('[DEBUG] Water in hand refilled to', amount);
    } else if (type === 'fertilizer') {
      setFertilizerInHand(
        prev => ({ ...prev, [category]: (prev[category] || 0) + amount })
      );
      console.log('[DEBUG] Fertilizer in hand refilled to', amount);
    }
  };

  // Feeding logic (called when user tries to feed a plant)
  const feedPlant = async (plantId, instanceId, type, amount) => {
    // Use a generic inventory object keyed by type
    console.log('[DEBUG] Feeding plant', type, 'with amount', amount);
    console.log('[DEBUG] Current inventory:', inventory);

    if (!inventory[type] || inventory[type] < amount) {
      alert(`Not enough ${type} in hand!`);
      return;
    }

    try {
      const model = placedModels.find(m => m.id === plantId);
      if (model && model.plantId) {
        // Update the correct stat in the plant instance
        await updatePlantInstance(plantId, instanceId, type, amount);
      }

      console.log('[DEBUG] Fed plant', type, plantId, amount);
    } catch (e) {
      console.error(`[DEBUG] Failed to feed plant ${type}:`, e);
    }
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

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ModelRegistry>
        <Canvas
          ref={canvasRef}
          shadows
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
          {/* <XR> */}
          <Stats/>
          <DragHandler/>
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

          {/* Held Item */}
          {heldItem && (
            <HeldItem
              item={heldItem}
              onPlace={handlePlaceHeldItem}
              waterCapacity={waterJugCapacity}
            />
          )}

          {users.map((user) => {
            if (user.name === userName) {
              return null;
            }
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

          <Garden ref={gardenRef} scale={0.5} />

          {/* Drop indicator */}
          {dropIndicatorPosition && (
            <DropIndicator position={dropIndicatorPosition} />
          )}

          {/* Add placed models */}
          {placedModels.map((model) => {
            return (
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
                feedPlant = {feedPlant}
              />
            );
          })}
          {/* </XR> */}
        </Canvas>
      </ModelRegistry>

      <WalkingIndicator isWalking={isWalking} />
      
      {/* Mobile Walk Button */}
      {!isPC && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '20px',
          zIndex: 1000
        }}>
          <button
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: isWalking ? '#4CAF50' : '#2196F3',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              opacity: 0.8,
              touchAction: 'none'
            }}
            onClick={() => setIsWalking(prev => !prev)}
          >
            {isWalking ? '⏹' : '▶'}
          </button>
        </div>
      )}

      {/* Add WorldMap overlay in the bottom-right corner */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 250,
          height: 180,
          background: 'rgba(0,0,0,0)',
          borderRadius: 8,
          overflow: 'hidden',
          zIndex: 2000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          padding: 8,
        }}
      >
        <WorldMap
          coords={coords}
          placedModels={placedModels}
          userMarkerPosition={(() => {
            if (position && Array.isArray(coords) && coords.length === 2) {
              const origin = [0, 0];
              const [lat, lng] = localToGeo([position.x, position.z], origin);
              return [lat, lng];
            }
            return coords;
          })()}
        />
      
      </div>

      <ModelList
        isPlantListOpen={isPlantListOpen}
        isFertilizerListOpen={isFertilizerListOpen}
        isAssetListOpen={isAssetListOpen}
        onPlantClose={() => {setIsPlantListOpen(!isPlantListOpen); setIsFertilizerListOpen(false); setIsAssetListOpen(false)}}
        onFertilizerClose={() => {setIsFertilizerListOpen(!isFertilizerListOpen); setIsPlantListOpen(false); setIsAssetListOpen(false)}}
        onAssetClose={() => {setIsAssetListOpen(!isAssetListOpen); setIsPlantListOpen(false); setIsFertilizerListOpen(false)}}
        setDraggedModel={setDraggedModel}
        draggedModel={draggedModel}
        hoverPosition={dropIndicatorPosition}
        setHoverPosition={setDropIndicatorPosition}
        setHeldItem={setHeldItem}
        heldItem={heldItem}
      />

      {isPointerLocked && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Model Preview Panel */}
      {selectedModel && selectedModelDetails && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            width: '400px',
            height: '600px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <button
            onClick={() => {
              setSelectedModel(null);
              setSelectedModelDetails(null);
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            ×
          </button>
          
          <div style={{ height: '300px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <ModelPreview modelPath={selectedModel} />
          </div>

          <div style={{ padding: '20px 0' }}>
            <h2 style={{ marginBottom: '10px', fontSize: '24px' }}>
              {selectedModelDetails.name}
            </h2>
            <p style={{
              fontSize: '16px', 
              lineHeight: '1.6',
              color: '#cccccc'
            }}>
              {selectedModelDetails.description}
            </p>
          </div>

          <div style={{ 
            marginTop: 'auto',
            padding: '20px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ fontSize: '14px', color: '#999' }}>
              Position: X: {selectedModelDetails.position[0].toFixed(2)}, 
              Y: {selectedModelDetails.position[1].toFixed(2)}, 
              Z: {selectedModelDetails.position[2].toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Water capacity indicator */}
      {heldItem && heldItem.type === 'asset' && (
        <div style={{
          position: 'absolute',
          top: '150px',
          right: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'Arial',
          fontSize: '14px'
        }}>
          Water Level: {heldItem.currentCapacity}/{heldItem.maxCapacity}L
        </div>
      )}

      {/* For demo: add a button to feed the first plant in placedModels (if any) */}
      {placedModels.length > 0 && (
        <div style={{ position: 'absolute', top: 100, left: '50%', zIndex: 1000 }}>
          <div>Water in hand: {waterInHand}</div>
          <div>
            Fertilizer in hand:{" "}
            {Object.keys(fertilizerInHand).length === 0
              ? "None"
              : Object.entries(fertilizerInHand)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
          </div>
        </div>
      )}

      {heldItem && heldItem.category && (
        <div>
          {heldItem.category.charAt(0).toUpperCase() + heldItem.category.slice(1)} in hand: {fertilizerInHand[heldItem.category] || 0}
        </div>
      )}
    </div>
  );
};