// ARPage.jsx
import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Box, Grid, Sparkles, Html, useGLTF } from "@react-three/drei";
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import L from "leaflet";
import { getAllPlantInstances } from '../services/plantService';
import { localToGeo, geoToLocal } from "../geoUtils";

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

export default function ARPage({coords, onExit}) {
  const [mode, setMode] = useState(null);
  const [color, setColor] = useState("orange");
  const [placedModels, setPlacedModels] = useState([]);
  const randomColor = () => setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`);

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

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100vw", height: "100vh", position: "relative" }}>
      <button onClick={() => { setMode("vr"); store.enterVR(); }}>Enter VR</button>
      <button onClick={() => { setMode("ar"); store.enterAR(); }}>Enter AR</button>
      <button onClick={randomColor}>Change Cube Color</button>
      <Canvas>
        {mode && (
          <XR store={store} mode={mode}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <Grid position={[0, -0.5, 0]} args={[10, 10]} cellSize={0.5} cellThickness={1} cellColor="#6f6" sectionColor="#444" />
            {/* Render all dropped plant models in AR at their real-world positions */}
            {placedModels && coords && placedModels.map((model, idx) => {
              if (!model.position) return null;
              const [x, y, z] = model.position;
              const [lat, lng] = localToGeo([x, z], [0, 0]);
              const [lx, ly, lz] = geoToLocal([lat, lng], coords);
              if (model.modelPath) {
                try {
                  const PlantModel = () => {
                    const gltf = useGLTF(model.modelPath);
                    return <primitive object={gltf.scene} scale={0.2} position={[lx, 0, lz]} />;
                  };
                  return <PlantModel key={model.instanceId || idx} />;
                } catch (e) {
                  // fallback to box if model fails to load
                }
              }
              return (
                <Box key={model.instanceId || idx} position={[lx, 0, lz]} scale={[0.2, 0.2, 0.2]}>
                  <meshStandardMaterial color="green" />
                  <Html position={[0, 0.3, 0]} center>
                    <div style={{ background: "rgba(0,0,0,0.7)", color: "#fff", padding: "2px 8px", borderRadius: 8 }}>
                      🌱
                    </div>
                  </Html>
                </Box>
              );
            })}
          </XR>
        )}
      </Canvas>
      <div style={{ position: 'fixed', bottom: 20, right: 20, width: 250, height: 180, background: 'rgba(0,0,0,0)', borderRadius: 8, overflow: 'hidden', zIndex: 2000, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', padding: 8 }}>
        <WorldMap coords={coords} placedModels={placedModels} userMarkerPosition={coords} />
      </div>
    </div>
  );
}
