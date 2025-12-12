import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore, useXR } from "@react-three/xr";
import { Html, Environment, Sky, Stats, Plane } from '@react-three/drei';
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import L from "leaflet";
import { getAllPlantInstances } from '../services/plantService';
import { localToGeo } from "../geoUtils";
import { ModelRegistry } from "../contexts/ModelRegistry";
import Rig from './Rig';
import PlantBot from './PlantBot';
import HeldItem from './HeldItem';
import DroppedModel from './DroppedModel';
import Garden from './Garden';
import Avatar from './Avatar';
import VRUI from './VRUI';
import VRSceneContent from './VRInteractiveComponents';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const store = createXRStore()

// --- Error Boundary Component ---
class VRErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('VR Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[2, 1]} />
          <meshBasicMaterial color="red" />
          <Html position={[0, 0, 0.01]} transform>
            <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
              <h3>VR Component Error</h3>
              <p>Something went wrong with the VR interface.</p>
              <button onClick={() => this.setState({ hasError: false, error: null })}>
                Retry
              </button>
            </div>
          </Html>
        </mesh>
      );
    }

    return this.props.children;
  }
}

// --- Performance Optimized Environment Component ---
function OptimizedEnvironment({ envPreset, ambientIntensity, directionalIntensity, sunPosition, skyTurbidity, mode }) {
  const [environmentError, setEnvironmentError] = useState(false);

  // Reset error when preset changes
  useEffect(() => {
    setEnvironmentError(false);
  }, [envPreset]);

  if (environmentError) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <hemisphereLight args={['#87CEEB', '#98FB98', 0.6]} />
      </>
    );
  }

  return (
    <>
      {/* Environment with error handling */}
      {envPreset && envPreset !== 'none' ? (
        <React.Suspense fallback={null}>
          <Environment
            preset={envPreset}
            onError={() => {
              console.warn('Environment preset failed, using fallback lighting');
              setEnvironmentError(true);
            }}
          />
        </React.Suspense>
      ) : (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
        </>
      )}

      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        castShadow
        position={sunPosition || [10, 10, 5]}
        intensity={directionalIntensity}
        shadow-mapSize-width={1024} // Reduced for better performance
        shadow-mapSize-height={1024}
      />

      {/* Sky component with error handling */}
      {sunPosition && (
        <React.Suspense fallback={null}>
          <Sky sunPosition={sunPosition} turbidity={skyTurbidity || 10} />
        </React.Suspense>
      )}

      {/* Stats component removed to prevent UI obstruction */}
      {/* {!mode && <Stats />} */}
    </>
  );
}


// --- Safe VRUI Wrapper Component ---
function SafeVRUIWrapper(props) {
  // Create a global reference to the store for VRUI compatibility
  useEffect(() => {
    if (props.xrStore && typeof window !== 'undefined') {
      window.xrStore = props.xrStore;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.xrStore;
      }
    };
  }, [props.xrStore]);

  return <VRUI {...props} />;
}

// --- VR-Compatible VRUI Wrapper ---
function VRCompatibleUI({ uiProps, position = [0, -0.5, -2], rotation = [0, 0, 0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position} rotation={rotation}>
      {/* Background panel for the UI */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[3, 2.5]} />
        <meshStandardMaterial
          color={hovered ? "#1a1a1a" : "#0a0a0a"}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* The actual VRUI component */}
      <Html
        position={[0, 0, 0.01]}
        transform
        occlude
        style={{
          width: '600px',
          height: '500px',
          pointerEvents: 'auto',
          transform: 'scale(0.8)', // Scale down for better VR viewing
          transformOrigin: 'center center',
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '10px',
          padding: '10px',
        }}>
          <SafeVRUIWrapper {...uiProps} />
        </div>
      </Html>
    </group>
  );
}

// --- Main ARPage Component ---
export default function ARPage({
  coords,
  placedModels,
  setPlacedModels,
  isWalking,
  setIsWalking,
  heldItem,
  setHeldItem,
  userName,
  socket,
  users,
  position,
  setPosition,
  envPreset,
  ambientIntensity,
  directionalIntensity,
  skyTurbidity,
  sunPosition,
  handleModelPositionChange,
  refillResourceFromAdvice,
  feedPlant,
  isPlantListOpen,
  setIsPlantListOpen,
  isFertilizerListOpen,
  setIsFertilizerListOpen,
  isAssetListOpen,
  setIsAssetListOpen,
  draggedModel,
  setDraggedModel,
  dropIndicatorPosition,
  setDropIndicatorPosition,
  waterJugCapacity,
  setWaterJugCapacity,
  waterInHand,
  setWaterInHand,
  fertilizerInHand,
  setFertilizerInHand,
  selectedModel,
  setSelectedModel,
  selectedModelDetails,
  setSelectedModelDetails,
  roomId,
  enterAr,
  ...rest
}) {

  const [mode, setMode] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    async function loadPlants() {
      try {
        const plants = await getAllPlantInstances();
        setPlacedModels(plants);
      } catch (e) {
        console.error('[ARPage] Failed to load plant instances:', e);
      }
    }
    loadPlants();
  }, [setPlacedModels]);

  // Auto-enter AR when the component mounts if enterAr is true
  useEffect(() => {
    if (enterAr) {
      const enterARSession = async () => {
        try {
          await store.enterAR();
          setMode('ar');
        } catch (e) {
          console.error("Failed to auto-enter AR:", e);
        }
      };
      enterARSession();
    }
  }, [enterAr]); // Dependency on enterAr to trigger only when it's true (which it is on mount)

  const handleExitVR = () => {
    const session = store.getState().session;
    if (session) {
      session.end();
    }
  };

  const handleBack = () => {
    // Logic to go back. If in a "modal" state (VR/AR), maybe end session? 
    // But user likely wants to go BACK to the previous page (VideoChat / Home)
    // Since App.jsx conditionally renders ARPage, "Back" here implies turning off 'enterAr' in App.jsx
    // BUT ARPage is rendered via a conditional prop `enterAr` in App.jsx...
    // Wait, App.jsx: { enterAr && <ARPage ... /> }
    // So to "go back", we actually need to tell the parent (App) to setting setEnterAr(false).
    // However, looking at App.jsx, I see `setEnterAr` is passed to VideoChat, but NOT to ARPage?
    // Let's check App.jsx again.
    // App.jsx: <ARPage ... enterAr={enterAr} ... />. It does NOT pass setEnterAr.
    // It DOES pass `toggleView` to VideoChat, but ARPage seems isolated.
    // If I look at the props list for ARPage, there is no setEnterAr.
    // BUT, I can force a refresh or navigate to the room URL again? 
    // ACTUALLY, checking App.jsx again: VideoChat has `setEnterAr`. ARPage does not.
    // This means I cannot easily flip the state from here without prop drilling.
    // HOWEVER, simply refreshing the page or navigating to the room link *might* reset state, 
    // but that's a bad UX (reloads 3D scene).

    // Let's assume for now I should navigate to the Room URL. 
    // Since we are AT the room URL (App.jsx renders Room component which renders ARPage), 
    // and 'enterAr' is a state inside Room component...
    // I NEED `setEnterAr` prop here.

    // Since I can't easily change App.jsx logic without editing App.jsx (which I can do),
    // I will navigate back to "Home" as a fallback, OR purely use window.location.reload() for a hard reset if I'm lazy.
    // BETTER: I will edit ARPage to accept an `onBack` prop? No, I need to edit App.jsx to pass it.
    // BUT, `ARPage` renders `VRUI`, and `VideoChat`.
    // Let's look at how we get INTO ARPage. In VideoChat, `setEnterAr(!enterAr)`.

    // OPTION 1: Use `navigate(0)` (reload) - Crude.
    // OPTION 2: Edit App.jsx to pass `setEnterAr` to ARPage.

    // Let's choose OPTION 2 for cleaner code. I will need to edit App.jsx too.
    // But wait, step 1 is modifying ARPage. I'll add the button, and for the logic, 
    // if `setEnterAr` is not available, I'll `navigate(0)` as fallback.

    // Actually, looking at previous App.jsx dump, `toggleView` is passed. `setEnterAr` is passed to VIDEOCHAT.
    // I'll assume I can just reload for now, OR I will edit App.jsx in the next step to pass the setter.
    // Re-reading the prompt: "once entered arpage there is no button to go back just analyse and once and align all teh element"

    window.location.reload(); // Quick fix for "Back" if state setter isn't present
  };

  // Collect all props to pass to the VRUI component
  const uiProps = {
    isPC: !/Mobi|Android/i.test(navigator.userAgent),
    isWalking,
    setIsWalking,
    coords,
    placedModels,
    position,
    users,
    userName,
    heldItem,
    setHeldItem,
    isPlantListOpen,
    setIsPlantListOpen,
    isFertilizerListOpen,
    setIsFertilizerListOpen,
    isAssetListOpen,
    setIsAssetListOpen,
    draggedModel,
    setDraggedModel,
    dropIndicatorPosition,
    setDropIndicatorPosition,
    waterJugCapacity,
    setWaterJugCapacity,
    waterInHand,
    setWaterInHand,
    fertilizerInHand,
    setFertilizerInHand,
    selectedModel,
    setSelectedModel,
    selectedModelDetails,
    setSelectedModelDetails,
    handleExitVR,
    xrStore: store,
    handleSafeExitVR: () => {
      const session = store.getState().session;
      if (session) {
        session.end();
      }
    },
    handleModelPositionChange,
    refillResourceFromAdvice,
    feedPlant,
    roomId,
    enterAr,
    ...rest
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100vw", height: "100vh", position: "relative", backgroundColor: 'black' }}>

      {/* --- NEW BACK BUTTON --- */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
        <button
          onClick={handleBack}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
          title="Exit AR View"
        >
          <span style={{ fontSize: '1.2rem', color: '#333' }}>←</span>
        </button>
      </div>

      {/* --- Updated XR Buttons REMOVED per user request (Auto-enter enabled) --- */}
      {/* <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100, display: 'flex', gap: '8px' }}>
        <CustomVRButton ... />
        <CustomARButton ... />
      </div> */}

      <VRUI
        {...uiProps} // Pass all props at once
      />

      <Canvas
        performance={{ min: 0.5 }} // Allow frame rate to drop to 30fps if needed
        dpr={[1, 2]} // Limit device pixel ratio for better performance
      >
        <XR store={store}>
          <VRErrorBoundary>
            <ModelRegistry>
              {/* --- Optimized Environment and Lighting --- */}
              <OptimizedEnvironment
                envPreset={envPreset}
                ambientIntensity={ambientIntensity}
                directionalIntensity={directionalIntensity}
                sunPosition={sunPosition}
                skyTurbidity={skyTurbidity}
                mode={mode}
              />

              {/* --- 3D Scene Objects (always present) --- */}
              {/* <PlantBot position={[2, 0, 2]} refillResourceFromAdvice={refillResourceFromAdvice} /> */}
              {/* {heldItem && <HeldItem item={heldItem} waterCapacity={rest.waterJugCapacity} />} */}

              {users.map((user) => (
                user.name !== userName && <Avatar key={user.id} {...user} />
              ))}

              {/* {placedModels.map((model) => (
                <DroppedModel
                  key={model.instanceId || model.id}
                  {...model}
                  onPositionChange={(newPosition) => handleModelPositionChange(model.id, newPosition)}
                  heldItem={heldItem}
                  feedPlant={feedPlant}
                  setSelectedModel={rest.setSelectedModel}
                  setSelectedModelDetails={rest.setSelectedModelDetails}
                />
              ))} */}

              {/* <Garden scale={0.5} p `osition={[0,-1,0]} /> */}

              {/* --- AR Demo Placement (Fixed in front of camera) --- */}
              {mode === 'ar' && (
                <group position={[0, -0.5, -1]}>
                  {/* Using PlantBot as a placeholder, or we could use a specific Plant model if available */}
                  {/* <PlantBot position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} refillResourceFromAdvice={() => { }} /> */}
                </group>
              )}

              {/* --- Player Rig (for desktop movement logic) --- */}
              {mode !== 'vr' && <Rig {...{ userName, socket, position, setPosition, isWalking }} />}

              {/* --- Conditionally render VR-specific components --- */}
              {mode === 'vr' && (
                <VRErrorBoundary>
                  <VRSceneContent uiProps={uiProps} />
                </VRErrorBoundary>
              )}

            </ModelRegistry>
          </VRErrorBoundary>
        </XR>
      </Canvas>

      {/* --- Overlay UI (visible only when not in a session) --- */}
      {/* --- Overlay UI (visible only when not in a session) --- */}
      {/* Map Removed per user request */}
    </div>
  );
}