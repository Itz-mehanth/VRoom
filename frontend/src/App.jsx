import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Home from './Home';
import VRScene from './components/VRScene';
import VideoChat from './VideoChat';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ARPage from './components/ARPage';
import { useLocation } from "react-router-dom";
import { localToGeo, geoToLocal } from './geoUtils';
import Profile from './components/Profile';
import PlantDetailsHUD from './components/PlantDetailsHUD';
import PlantMarketplace from './components/PlantMarketplace';
import { store as arStore } from './components/ARPage';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Room = () => {
  const { roomId, userId } = useParams();
  const { currentUser } = useAuth();
  const [currentView, setCurrentView] = useState('vr');
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [enterAr, setEnterAr] = useState(false);
  const query = useQuery();
  const lat = query.get("lat");
  const lng = query.get("lng");
  const envParam = query.get("env"); // Get environment parameter
  const coords = lat && lng ? [parseFloat(lat), parseFloat(lng)] : null;

  // Shared state for AR/VR
  const [placedModels, setPlacedModels] = useState([]);
  const [heldItem, setHeldItem] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedModelDetails, setSelectedModelDetails] = useState(null);
  const [draggedModel, setDraggedModel] = useState(null);
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState(null);
  const [waterJugCapacity, setWaterJugCapacity] = useState(0);
  const [waterInHand, setWaterInHand] = useState(0);
  const [fertilizerInHand, setFertilizerInHand] = useState({});
  const [isPlantListOpen, setIsPlantListOpen] = useState(false);
  const [isFertilizerListOpen, setIsFertilizerListOpen] = useState(false);
  const [isAssetListOpen, setIsAssetListOpen] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [arPreviewModel, setArPreviewModel] = useState(null); // Separate state for AR Preview
  const inventory = {};

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
      return { x, y: 2, z };
    }
    return { x: 0, y: 0, z: 2 }; // Spawn at 0 height (WebXR uses physical height) and back z=2
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
    setEnterAr(false);
    setArPreviewModel(null);
  }, [roomId]);

  useEffect(() => {
    console.log("[App] enterAr changed to:", enterAr);
  }, [enterAr]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDayPhase());
    }, 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Choose environment preset and lighting
  // Priority: envParam > timeOfDay
  let envPreset = 'sunset';
  let ambientIntensity = 0.5;
  let directionalIntensity = 1;
  let skyTurbidity = 8;
  let sunPosition = [100, 20, 100];

  // Define logic for different presets
  const applyPreset = (preset) => {
    envPreset = preset;
    if (preset === 'night') {
      ambientIntensity = 0.1;
      directionalIntensity = 0.2;
      skyTurbidity = 20;
      sunPosition = [0, -10, 0];
    } else if (preset === 'sunset') {
      ambientIntensity = 0.3;
      directionalIntensity = 0.5;
      skyTurbidity = 10;
      sunPosition = [50, 10, 50];
    } else if (preset === 'forest') {
      ambientIntensity = 0.6;
      directionalIntensity = 0.8;
      skyTurbidity = 8;
      sunPosition = [100, 50, 100];
    } else {
      // General daylight mainly
      ambientIntensity = 0.7;
      directionalIntensity = 1.2;
      skyTurbidity = 2;
      sunPosition = [100, 80, 100];
    }
  };

  if (envParam) {
    applyPreset(envParam);
  } else {
    // Fallback to time of day logic
    if (timeOfDay === 'dawn') applyPreset('sunset'); // approximate
    else if (timeOfDay === 'morning') applyPreset('forest'); // approximate
    else if (timeOfDay === 'afternoon') applyPreset('city');
    else if (timeOfDay === 'evening') applyPreset('sunset');
    else if (timeOfDay === 'night') applyPreset('night');
  }

  // Manual override if envParam logic didn't catch specific time-of-day nuance
  // But applying generic preset logic is safer.


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


  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);

  // ... (rest of state)

  // Toggle view
  const toggleView = () => {
    setCurrentView(prev => prev === 'vr' ? 'video' : 'vr');
  };

  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    navigate('/');
  };

  if (!currentUser || currentUser.uid !== userId) {
    return <div>Unauthorized access</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100dvh', position: 'relative', overflow: 'hidden', margin: 0, padding: 0 }}>
      {/* Marketplace Overlay */}
      {isMarketplaceOpen && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5000 }}>
          <PlantMarketplace
            onClose={() => setIsMarketplaceOpen(false)}
            onViewInAR={async (plant) => {
              // Check mobile first
              const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
              if (!isMobile) {
                alert("AR feature not available on Desktop. Please try on mobile.");
                return;
              }

              // Set the selected model for AR Preview
              setArPreviewModel({
                ...plant,
                modelPath: plant.image
              });

              // Close marketplace
              setIsMarketplaceOpen(false);

              // Attempt to enter AR using the exported store (User Gesture captured here)
              try {
                await arStore.enterAR();
                setEnterAr(true);
              } catch (e) {
                console.error("Failed to start AR session:", e);
                alert("Could not start AR session. Please check browser permissions.");
                // Still open Page? No, fallback.
                // We can open page anyway to show Manual button if it failed?
                // But user didn't want manual button.
                // Let's open page as fallback.
                setEnterAr(true);
              }
            }}
          />
        </div>
      )}

      {!enterAr &&
        <>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: currentView === 'vr' ? 'auto' : 'none'
          }}>
            <VRScene
              coords={coords}
              setPosition={setPosition}
              roomId={roomId}
              envPreset={envPreset}
              isWalking={isWalking}
              setIsWalking={setIsWalking}
              userName={currentUser.displayName}
              users={users}
              toggleView={toggleView}
              ambientIntensity={ambientIntensity}
              directionalIntensity={directionalIntensity}
              skyTurbidity={skyTurbidity}
              sunPosition={sunPosition}
              position={position}
              socket={socket}
              enterAr={enterAr}
              isPointerLocked={isPointerLocked}
              setIsPointerLocked={setIsPointerLocked}
              placedModels={placedModels}
              setPlacedModels={setPlacedModels}
              heldItem={heldItem}
              setHeldItem={setHeldItem}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              selectedModelDetails={selectedModelDetails}
              setSelectedModelDetails={setSelectedModelDetails}
              draggedModel={draggedModel}
              setDraggedModel={setDraggedModel}
              dropIndicatorPosition={dropIndicatorPosition}
              setDropIndicatorPosition={setDropIndicatorPosition}
              waterJugCapacity={waterJugCapacity}
              setWaterJugCapacity={setWaterJugCapacity}
              waterInHand={waterInHand}
              setWaterInHand={setWaterInHand}
              fertilizerInHand={fertilizerInHand}
              setFertilizerInHand={setFertilizerInHand}
              isPlantListOpen={isPlantListOpen}
              setIsPlantListOpen={setIsPlantListOpen}
              isFertilizerListOpen={isFertilizerListOpen}
              setIsFertilizerListOpen={setIsFertilizerListOpen}
              isAssetListOpen={isAssetListOpen}
              setIsAssetListOpen={setIsAssetListOpen}
              handleModelPositionChange={handleModelPositionChange}
              refillResourceFromAdvice={refillResourceFromAdvice}
              feedPlant={feedPlant}
              onOpenMarketplace={() => setIsMarketplaceOpen(true)}
              isMarketplaceOpen={isMarketplaceOpen}
            />
          </div>
        </>
      }

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: enterAr ? 1000 : -1,
        visibility: enterAr ? 'visible' : 'hidden',
        pointerEvents: enterAr ? 'auto' : 'none'
      }}>
        <ARPage
          coords={coords}
          enterAr={enterAr}
          setEnterAr={setEnterAr}
          arPreviewModel={arPreviewModel}
          users={users}
          socket={socket}
          placedModels={placedModels}
          isWalking={isWalking}
          setIsWalking={setIsWalking}
          setPlacedModels={setPlacedModels}
          selectedModel={selectedModel}
          heldItem={heldItem}
          setHeldItem={setHeldItem}
          ambientIntensity={ambientIntensity}
          directionalIntensity={directionalIntensity}
          skyTurbidity={skyTurbidity}
          sunPosition={sunPosition}
          userName={currentUser.displayName}
          setSelectedModel={setSelectedModel}
          selectedModelDetails={selectedModelDetails}
          setSelectedModelDetails={setSelectedModelDetails}
          draggedModel={draggedModel}
          setDraggedModel={setDraggedModel}
          dropIndicatorPosition={dropIndicatorPosition}
          setDropIndicatorPosition={setDropIndicatorPosition}
          waterJugCapacity={waterJugCapacity}
          setWaterJugCapacity={setWaterJugCapacity}
          waterInHand={waterInHand}
          setWaterInHand={setWaterInHand}
          fertilizerInHand={fertilizerInHand}
          setFertilizerInHand={setFertilizerInHand}
          isPlantListOpen={isPlantListOpen}
          setIsPlantListOpen={setIsPlantListOpen}
          isFertilizerListOpen={isFertilizerListOpen}
          setIsFertilizerListOpen={setIsFertilizerListOpen}
          isAssetListOpen={isAssetListOpen}
          setIsAssetListOpen={setIsAssetListOpen}
          handleModelPositionChange={handleModelPositionChange}
          refillResourceFromAdvice={refillResourceFromAdvice}
          feedPlant={feedPlant}
          position={position}
          setPosition={setPosition}
          roomId={roomId}
          envPreset={envPreset}
        />
      </div>


      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        visibility: enterAr ? 'hidden' : 'visible' // Hide VideoChat overlay in AR mode
      }}>
        <VideoChat
          roomId={roomId}
          userName={currentUser.displayName}
          toggleView={toggleView}
          currentView={currentView}
          users={users}
          setUsers={setUsers}
          setSocket={setSocket}
          setEnterAr={setEnterAr}
          enterAr={enterAr}
          onLeaveRoom={handleLeaveRoom}
        />
      </div>

      <PlantDetailsHUD
        selectedModel={selectedModel}
        onClose={() => setSelectedModel(null)}
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId/user/:userId" element={<Room />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
