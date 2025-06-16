import React, { useState, useRef, useEffect, Suspense, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import ToggleButton from './ToggleButton';
import { Environment, Sky, PerspectiveCamera, PointerLockControls, DragControls, OrbitControls, useGLTF, Stats } from '@react-three/drei';
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

const Rig = ({ userName, socket, position, setPosition, isWalking }) => {
  const rigRef = useRef();
  const mobileControlsRef = useRef();
  const { camera } = useThree();
  const lastUpdateRef = useRef(Date.now());
  const UPDATE_INTERVAL = 500;
  const cameraTargetRef = useRef(new THREE.Vector3());
  const [isColliding, setIsColliding] = useState(false);

  // Function to check if position is within boundary
  const isWithinBoundary = (x, z) => {
    const distance = Math.sqrt(x * x + z * z);
    return distance <= 20; // 2-meter radius
  };

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

      // Only update position if within boundary
      if (isWithinBoundary(newX, newZ)) {
        const newPosition = {
          x: newX,
          y: rigRef.current.position.y,
          z: newZ
        };
        
        rigRef.current.position.x = newPosition.x;
        rigRef.current.position.z = newPosition.z;

        // Update camera target position
        cameraTargetRef.current.set(newPosition.x, newPosition.y, newPosition.z);
        
        // Smoothly interpolate camera position
        camera.position.lerp(cameraTargetRef.current, 0.1);
        
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
      {isPC ? (
        <PointerLockControls />
      ) : (
        <OrbitControls 
          ref={mobileControlsRef}
          position={[position.x, position.y, position.z]}
          target={[position.x, position.y, position.z]}
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
        'plant1': '/models/plants/plant1.glb',
        'plant2': '/models/plants/plant2.glb',
        'plant3': '/models/plants/plant3.glb',
        'fertilizer1': '/models/fertilizers/fertilizer1.glb',
        'fertilizer2': '/models/fertilizers/fertilizer2.glb',
        'waterJug': '/models/assets/waterJug1.glb',
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

// Create a hook to use the model registry
const useModelRegistry = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModelRegistry must be used within a ModelRegistry');
  }
  return context;
};

export default function VRScene ({ roomId, userName, users, toggleView, socket }) {
  const [isWalking, setIsWalking] = useState(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 2, z: 5 });
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
    if (!isPointerLocked) {
      canvasRef.current?.requestPointerLock();
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

      const handleDrop = (e) => {
        e.preventDefault();
        if (!draggedModel || !dropIndicatorPosition) return;

        setPlacedModels(prev => [
          ...prev,
          {
            ...draggedModel,
            position: dropIndicatorPosition,
            id: `${draggedModel.id}-${Date.now()}`
          }
        ]);

        setDraggedModel(null);
        setDropIndicatorPosition(null);
      };

      // Add event listeners for both mouse and touch events
      const canvas = canvasRef.current;
      canvas.addEventListener('dragover', handleDragOver);
      canvas.addEventListener('touchmove', handleDragOver);
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

  const handleModelPositionChange = (id, newPosition) => {
    setPlacedModels(prev =>
      prev.map(model =>
        model.id === id ? { ...model, position: newPosition } : model
      )
    );
  };

  function GhostModel({ modelPath, position }) {
    const { scene } = useGLTF(modelPath);
  
    return (
      <primitive
        object={scene}
        position={position}
        scale={[1, 1, 1]}
        opacity={0.5}
        transparent
      />
    );
  }

  // Component to handle raycasting and hover position
  const RaycasterHandler = () => {
    const { camera } = useThree();
    const groundRef = useRef();

    useFrame(({ mouse, raycaster }) => {
      if (draggedModel && groundRef.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(groundRef.current);
        if (intersects.length > 0) {
          setHoverPosition(intersects[0].point.toArray());
        }
      }
    });

    return (
      <mesh 
        ref={groundRef} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
        visible={false}
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    );
  };

  // Handle placing held items
  const handlePlaceHeldItem = (position) => {
    if (heldItem) {
      setPlacedModels(prev => [
        ...prev,
        {
          ...heldItem,
          position,
          id: `${heldItem.id}-${Date.now()}`
        }
      ]);
      setHeldItem(null);
    }
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
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 2, 0]
          }}
          style={{ height: '100%' }}
          onDoubleClick={handleCanvasClick}
        >
          <Stats />
          <DragHandler />
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[50, 50, 25]}
            intensity={1}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={100}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <fog attach="fog" args={['#000000', 1, 500]} />
          <Sky sunPosition={[100, 20, 100]} turbidity={8} />
          <gridHelper args={[100, 100]} position={[0, 0, 0]} />
          <axesHelper args={[5]} />

          <Rig
            userName={userName}
            socket={socket}
            position={position}
            setPosition={setPosition}
            isWalking={isWalking}
          />

          <WaterPipe 
            position={[15, 0, 15]} 
            onRefill={handleRefillWater}
          />

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
    
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>

          <Garden ref={gardenRef} scale={0.5} />

          {/* Drop indicator */}
          {dropIndicatorPosition && (
            <DropIndicator position={dropIndicatorPosition} />
          )}

          {/* Add placed models */}
          {placedModels.map((model) => (
            <DroppedModel
              key={model.id}
              modelPath={model.stages[0].modelPath || model.modelPath}
              position={model.position}
              name={model.name}
              description={model.description}
              onPositionChange={(newPosition) => handleModelPositionChange(model.id, newPosition)}
              setSelectedModel={setSelectedModel}
              setSelectedModelDetails={setSelectedModelDetails}
              heldItem={heldItem}
            />
          ))}
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

      <Minimap
        currentUser={{
          name: userName,
          position: { x: position.x, y: position.y, z: position.z },
          rotation: { y: canvasRef.current?.camera?.rotation.y || 0 }
        }}
        users={users.map(user => ({
          ...user,
          position: {
            x: user.position?.x || 0,
            y: user.position?.y || 2,
            z: user.position?.z || 0
          },
          rotation: {
            y: user.rotation?.y || 0
          }
        }))}
        mapSize={100}
        backgroundImage="/maps/garden.png"
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
      {heldItem && heldItem.type === 'waterJug' && (
        <div style={{
          position: 'absolute',
          top: '20px',
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
    </div>
  );
};
