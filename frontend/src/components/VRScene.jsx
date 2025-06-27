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
import { ModelRegistry, ModelContext } from '../contexts/ModelRegistry';
import Scene from './Scene';
import VRUI from './VRUI';
import ARPage from './ARPage';
import { useNavigate } from 'react-router-dom';

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
          if (!model.position || !Array.isArray(model.position)) return null;
          const [x, , z] = model.position;
          const [lat, lng] = localToGeo([x, z], origin);
          return <EmojiMarker key={model.instanceId || idx} position={[lat, lng]} emoji="🟢" label={`${lat}, ${lng}`} />;
        })}
        {/* Peer markers */}
        {peers && Array.isArray(peers) && peers.map((peer, idx) => {
          if (!peer.position || !Array.isArray(peer.position)) return null;
          const [x, , z] = peer.position;
          const [lat, lng] = localToGeo([x, z], origin);
          return <EmojiMarker key={peer.id || peer.name || idx} position={[lat, lng]} emoji={null} label={peer.name || 'Peer'} isPeer />;
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

export default function VRScene({
  roomId,
  userName,
  users,
  toggleView,
  socket,
  enterAr,
  coords,
  placedModels,
  setPlacedModels,
  heldItem,
  setHeldItem,
  isPointerLocked,
  setIsPointerLocked,
  selectedModel,
  setSelectedModel,
  selectedModelDetails,
  setSelectedModelDetails,
  draggedModel,
  setDraggedModel,
  position,
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
  envPreset,
  ambientIntensity,
  directionalIntensity,
  skyTurbidity,
  sunPosition,
  setPosition,
  isWalking,
  setIsWalking,
  ...rest
}) {
  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      { !enterAr &&
      <>
        <ModelRegistry>
          <Scene
            envPreset={envPreset}
            sunPosition={sunPosition}
            skyTurbidity={skyTurbidity}
            directionalIntensity={directionalIntensity}
            position={position}
            setPosition={setPosition}
            isWalking={isWalking}
            setIsWalking={setIsWalking}
            enterAr={enterAr}
            userName={userName}
            socket={socket}
            users={users}
            waterInHand={waterInHand}
            setWaterInHand={setWaterInHand}
            fertilizerInHand={fertilizerInHand}
            setFertilizerInHand={setFertilizerInHand}
            coords={coords}
            heldItem={heldItem}
            dropIndicatorPosition={dropIndicatorPosition}
            setDropIndicatorPosition={setDropIndicatorPosition}
            placedModels={placedModels}
            setPlacedModels={setPlacedModels}
            setSelectedModel={setSelectedModel}
            setSelectedModelDetails={setSelectedModelDetails}
            waterJugCapacity={waterJugCapacity}
            feedPlant={feedPlant}
            handleModelPositionChange={handleModelPositionChange}
            refillResourceFromAdvice={refillResourceFromAdvice}
            draggedModel={draggedModel}
            setDraggedModel={setDraggedModel}
            isPointerLocked={isPointerLocked}
            setIsPointerLocked={setIsPointerLocked}
          />
        </ModelRegistry>
        <VRUI
          isPC={isPC}
          isWalking={isWalking}
          setIsWalking={setIsWalking}
          coords={coords}
          placedModels={placedModels}
          position={position}
          users={users}
          userName={userName}
          isPlantListOpen={isPlantListOpen}
          setIsPlantListOpen={setIsPlantListOpen}
          isFertilizerListOpen={isFertilizerListOpen}
          setIsFertilizerListOpen={setIsFertilizerListOpen}
          isAssetListOpen={isAssetListOpen}
          setIsAssetListOpen={setIsAssetListOpen}
          draggedModel={draggedModel}
          setDraggedModel={setDraggedModel}
          dropIndicatorPosition={dropIndicatorPosition}
          setDropIndicatorPosition={setDropIndicatorPosition}
          heldItem={heldItem}
          setHeldItem={setHeldItem}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedModelDetails={selectedModelDetails}
          setSelectedModelDetails={setSelectedModelDetails}
          waterInHand={waterInHand}
          fertilizerInHand={fertilizerInHand}
          enterAr={enterAr}
        />
        </>
      }
    </div>
  );
};