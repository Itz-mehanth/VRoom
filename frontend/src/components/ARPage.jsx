// ARPage.jsx
import React, { useState, useRef } from "react";
import { Canvas} from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import L from "leaflet";
import { getAllPlantInstances } from '../services/plantService';
import { localToGeo} from "../geoUtils";
import { ModelRegistry } from "../contexts/ModelRegistry";
import { Environment, Sky, PerspectiveCamera, Stats } from '@react-three/drei';
import Rig from './Rig';
import PlantBot from './PlantBot';
import HeldItem from './HeldItem';
import DropIndicator from './DropIndicator';
import DroppedModel from './DroppedModel';
import Garden from './Garden';
import Dep from './Dep';

const store = createXRStore();

function WorldMap({coords, placedModels = [], userMarkerPosition = null}) {
  const hasCoords = Array.isArray(coords) && coords.length === 2 && coords.every(Number.isFinite);
  const center = hasCoords ? coords : [0, 0];
  const zoom = hasCoords ? 20 : 2;
  const origin = [0, 0];
 
  function EmojiMarker({ position, emoji, label }) {
    return (
      <Marker position={position} icon={L.divIcon({
        className: '',
        html: `<span style='font-size: 32px; line-height: 1;'>${emoji}</span>`
      })} />
    );
  }
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userMarkerPosition && <EmojiMarker position={userMarkerPosition} emoji="🔵" label={`${userMarkerPosition[0]}, ${userMarkerPosition[1]}`} />}
        {placedModels && placedModels.map((model, idx) => {
          if (!model.position) return null;
          const [x, , z] = model.position;
          const [lat, lng] = localToGeo([x, z], origin);
          return <EmojiMarker key={model.instanceId || idx} position={[lat, lng]} emoji="🟢" label={`${lat}, ${lng}`} />;
        })}
      </MapContainer>
    </div>
  );
}

export default function ARPage({
  coords,
  placedModels,
  isWalking,
  setIsWalking,
  setPlacedModels,
  heldItem,
  userName,
  socket,
  enterAr,
  envPreset,
  setHeldItem,
  selectedModel,
  setSelectedModel,
  selectedModelDetails,
  setSelectedModelDetails,
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
  isPlantListOpen,
  setIsPlantListOpen,
  isFertilizerListOpen,
  setIsFertilizerListOpen,
  isAssetListOpen,
  setIsAssetListOpen,
  handleModelPositionChange,
  refillResourceFromAdvice,
  feedPlant,
  ambientIntensity,
  directionalIntensity,
  skyTurbidity,
  sunPosition,
  position,
  setPosition,
  users,
  ...rest
}) {
  
  const [mode, setMode] = useState(null);
  const [color, setColor] = useState("orange");
  const [initialHeading, setInitialHeading] = useState(null); // in radians
  const [arStarted, setArStarted] = useState(false);
  const randomColor = () => setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`);

  // Listen for device orientation to get compass heading at AR session start
  React.useEffect(() => {
    function handleOrientation(event) {
      if (typeof event.alpha === 'number' && !arStarted) {
        // event.alpha: 0 is north, increases clockwise
        setInitialHeading(-event.alpha * Math.PI / 180); // store as radians, negative to rotate scene
      }
    }
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [arStarted]);

  React.useEffect(() => {
    async function loadPlants() {
      try {
        const plants = await getAllPlantInstances();
        setPlacedModels(plants);
      } catch (e) {
        console.error('[ARPage] Failed to load plant instances:', e);
      }
    }
    loadPlants();
  }, []);

  // When AR mode is entered, lock in the heading and actually start the XR session
  const handleEnterAR = () => {
    setMode("ar");
    setArStarted(true);
    if (store && typeof store.enterAR === 'function') {
      store.enterAR();
    }
  };

  const handleEnterVR = () => {
    setMode("vr");
    setArStarted(false);
    setInitialHeading(null);
    if (store && typeof store.enterVR === 'function') {
      store.enterVR();
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100vw", height: "100vh", position: "relative", backgroundColor: 'black' }}>
      <button onClick={handleEnterVR}>Enter VR</button>
      <button onClick={handleEnterAR}>Enter AR</button>
      <Canvas>
        {mode && (
          <XR store={store} mode={mode}>
            <ModelRegistry>
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

              {/* <Dep/> */}
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
            </ModelRegistry>
          </XR>
        )}
        
      </Canvas>
      <div style={{ position: 'fixed', top: 0, left: 0, width: 120, height: 120, background: 'rgba(0,0,0,0)', borderRadius: 8, overflow: 'hidden', zIndex: 2000, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', padding: 8 }}>
        <WorldMap coords={coords} placedModels={placedModels} userMarkerPosition={coords} />
      </div>
    </div>
  );
}
