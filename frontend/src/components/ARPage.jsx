import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore, useXR, XROrigin } from "@react-three/xr";
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

export const store = createXRStore()

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
              <pre style={{ maxWidth: '300px', overflow: 'auto', fontSize: '12px', background: 'rgba(0,0,0,0.5)' }}>
                {this.state.error?.message || String(this.state.error)}
              </pre>
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

  // Handle Environment Logic: Hide background in AR mode to show camera feed
  return (
    <>
      {/* Lights - always needed */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        castShadow
        position={sunPosition || [10, 10, 5]}
        intensity={directionalIntensity}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Environment/Sky - ONLY for VR or Non-AR modes */}
      {mode !== 'ar' && (
        <>
          {envPreset && envPreset !== 'none' ? (
            <React.Suspense fallback={null}>
              <Environment
                preset={envPreset}
                background // This makes it opaque!
                onError={() => {
                  console.warn('Environment preset failed, using fallback lighting');
                  setEnvironmentError(true);
                }}
              />
            </React.Suspense>
          ) : (
            <>
              {/* Fallback lights already present above */}
            </>
          )}

          {/* Sky component */}
          {sunPosition && (
            <React.Suspense fallback={null}>
              <Sky sunPosition={sunPosition} turbidity={skyTurbidity || 10} />
            </React.Suspense>
          )}
        </>
      )}
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
  setEnterAr,
  arPreviewModel,
  ...rest
}) {

  const [mode, setMode] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, requesting, running, error
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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

  // Auto-enter AR when the component becomes active
  useEffect(() => {
    if (enterAr) {
      const existingSession = store.getState().session;
      if (existingSession) {
        // Session already started by App.jsx
        setMode('ar');
        setStatus('running');
        return;
      }

      const enterARSession = async () => {
        try {
          setStatus('requesting');
          await store.enterAR();
          setMode('ar');
          setStatus('running');
        } catch (e) {
          console.error("Failed to auto-enter AR:", e);
          setStatus('error'); // Will show manual button
          setErrorMessage(e.message || "Unknown AR Error");
        }
      };

      // Attempt auto-entry (might fail if no gesture)
      enterARSession();
    }
  }, [enterAr]);

  const handleManualStart = async () => {
    try {
      setStatus('requesting');
      setErrorMessage('');
      await store.enterAR();
      setMode('ar');
      setStatus('running');
    } catch (e) {
      console.error("Failed to manual-enter AR:", e);
      setStatus('error');
      setErrorMessage(e.message || "Manual Start Failed");
      // Allow retry after a short delay or immediately by resetting status if needed, 
      // but 'error' status already shows the retry button.
    }
  };

  const handleExitVR = () => {
    const session = store.getState().session;
    if (session) {
      session.end();
      setStatus('idle');
      setMode(null);
    }
  };

  const handleBack = () => {
    // Exit AR session if active
    const session = store.getState().session;
    if (session) {
      session.end();
    }

    // Cleanly exit AR mode using state setter from App.jsx
    if (setEnterAr) {
      setEnterAr(false);
    } else {
      // Fallback if prop missing
      window.location.reload();
    }
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100vw", height: "100vh", position: "relative", backgroundColor: mode === 'ar' ? 'transparent' : 'black' }}>

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

      {/* Only show full VR UI if NOT in single model preview mode */}
      {!arPreviewModel && (
        <VRUI
          {...uiProps} // Pass all props at once
        />
      )}

      {/* --- Overlay UI for connection status --- */}
      {status !== 'running' && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 90, color: 'white'
        }}>
          {status === 'requesting' && <p>Requesting AR Session...</p>}
          {status === 'error' && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ff6b6b', marginBottom: '10px' }}>AR Error: {errorMessage}</p>
              <button
                onClick={handleManualStart}
                style={{
                  padding: '12px 24px', background: 'white', color: 'black',
                  border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer'
                }}
              >
                Try Starting Manually
              </button>
            </div>
          )}
          {status === 'idle' && (
            <button
              onClick={handleManualStart}
              style={{
                padding: '12px 24px', background: '#4CAF50', color: 'white',
                border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer'
              }}
            >
              Start AR Session
            </button>
          )}
        </div>
      )}

      <Canvas
        performance={{ min: 0.5 }} // Allow frame rate to drop to 30fps if needed
        dpr={[1, 2]} // Limit device pixel ratio for better performance
        gl={{ alpha: true, preserveDrawingBuffer: true }} // Transparent canvas for AR
        style={{ pointerEvents: 'none', background: 'transparent' }} // Ensure clicks pass through (except on meshes)
      >
        <XR store={store}>
          <XROrigin position={[position.x, 0, position.z]} />
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

              {/* --- 3D Scene Objects --- */}
              {/* If a specific model is selected from marketplace, show ONLY that model */}
              {arPreviewModel ? (
                <DroppedModel
                  key="preview"
                  modelPath={arPreviewModel.modelPath}
                  position={[0, 0, 0]} // Fixed distance in front of camera
                  scale={[5, 5, 5]} // Make it visible
                  name={arPreviewModel.name}
                  description={arPreviewModel.description || "Preview"}
                  setSelectedModel={setSelectedModel}
                  setSelectedModelDetails={setSelectedModelDetails}
                />
              ) : (
                <>
                  {/* Standard Social AR Scene */}
                  {users.map((user) => (
                    user.name !== userName && <Avatar key={user.id} {...user} />
                  ))}


                  {/* Placed Garden Models */}
                  {/* {placedModels.map( ... )} mapped below in comments but let's uncomment or handle standard logic here if needed. 
                      For now I'll just keep the existing structure but wrap in fragment.
                  */}
                </>
              )}

              {/* --- Player Rig (only for non-XR modes AND if not viewing single model) --- */}
              {!arPreviewModel && mode !== 'vr' && mode !== 'ar' && (
                <Rig {...{ userName, socket, position, setPosition, isWalking, enterAr }} />
              )}

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