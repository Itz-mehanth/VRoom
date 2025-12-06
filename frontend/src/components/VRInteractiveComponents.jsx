import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Text, RoundedBox, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import * as THREE from 'three';

// Curved Panel Component (like Quest's curved UI panels)
function CurvedPanel({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  width = 2, 
  height = 1.5, 
  radius = 3,
  children,
  color = "#1a1a1a",
  opacity = 0.9
}) {
  const geometry = useMemo(() => {
    const curve = new THREE.CylinderGeometry(radius, radius, height, 32, 1, true, 0, Math.PI * (width / radius));
    return curve;
  }, [width, height, radius]);

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geometry}>
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      {children}
    </group>
  );
}

// Quest-style Button with proper materials and lighting
function QuestButton({ 
  position = [0, 0, 0], 
  children, 
  onClick,
  size = [0.8, 0.3, 0.05],
  color = "#2196F3",
  hoverColor = "#1976D2",
  disabled = false
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const buttonColor = disabled ? "#666666" : (hovered ? hoverColor : color);

  return (
    <group position={position}>
      <RoundedBox
        args={size}
        radius={0.05}
        smoothness={4}
        onPointerOver={() => !disabled && setHovered(true)}
        onPointerOut={() => !disabled && setHovered(false)}
        onPointerDown={() => !disabled && setPressed(true)}
        onPointerUp={() => !disabled && setPressed(false)}
        onClick={() => !disabled && onClick?.()}
      >
        <meshStandardMaterial 
          color={buttonColor}
          roughness={0.3}
          metalness={0.1}
          emissive={hovered && !disabled ? color : "#000000"}
          emissiveIntensity={hovered && !disabled ? 0.1 : 0}
        />
      </RoundedBox>
      
      <Text
        position={[0, 0, size[2] + 0.01]}
        fontSize={0.08}
        color={disabled ? "#999999" : "white"}
        anchorX="center"
        anchorY="middle"
      >
        {children}
      </Text>
    </group>
  );
}

// Floating Glass Panel (like Quest's translucent panels)
function GlassPanel({ 
  position = [0, 0, 0], 
  size = [2, 1.5, 0.02],
  children 
}) {
  return (
    <group position={position}>
      <RoundedBox args={size} radius={0.05}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={0.1}
          metalness={0}
          transmission={0.9}
          thickness={0.02}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
      
      {/* Subtle border glow */}
      <RoundedBox args={[size[0] + 0.02, size[1] + 0.02, size[2]]} radius={0.06}>
        <meshStandardMaterial
          color="#4FC3F7"
          transparent
          opacity={0.3}
          emissive="#4FC3F7"
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {children}
    </group>
  );
}

// Quest-style Toggle Switch
function QuestToggle({ 
  position = [0, 0, 0], 
  value, 
  onChange, 
  label 
}) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={position}>
      {/* Toggle background track */}
      <RoundedBox
        args={[0.5, 0.15, 0.05]}
        radius={0.075}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onChange(!value)}
      >
        <meshStandardMaterial 
          color={value ? "#4CAF50" : "#424242"}
          roughness={0.2}
          metalness={0.1}
          emissive={value ? "#2E7D32" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0.1}
        />
      </RoundedBox>
      
      {/* Toggle switch handle */}
      <group position={[value ? 0.15 : -0.15, 0, 0.03]}>
        <RoundedBox args={[0.12, 0.12, 0.06]} radius={0.06}>
          <meshStandardMaterial
            color="white"
            roughness={0.1}
            metalness={0.1}
          />
        </RoundedBox>
      </group>

      {/* Label */}
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.06}
        color="#E0E0E0"
        anchorX="center"
        anchorY="bottom"
      >
        {label}
      </Text>
    </group>
  );
}

// Quest-style Slider
function QuestSlider({ 
  position = [0, 0, 0], 
  value, 
  onChange, 
  min = 0, 
  max = 1,
  label,
  width = 1
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Slider track */}
      <RoundedBox
        args={[width, 0.05, 0.03]}
        radius={0.025}
      >
        <meshStandardMaterial 
          color="#424242"
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>
      
      {/* Slider handle */}
      <group position={[((value - min) / (max - min) - 0.5) * width, 0, 0.02]}>
        <RoundedBox
          args={[0.08, 0.15, 0.06]}
          radius={0.04}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
        >
          <meshStandardMaterial
            color={hovered || isDragging ? "#64B5F6" : "#2196F3"}
            roughness={0.2}
            metalness={0.2}
            emissive="#1976D2"
            emissiveIntensity={hovered ? 0.2 : 0.1}
          />
        </RoundedBox>
      </group>

      {/* Label and value */}
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.06}
        color="#E0E0E0"
        anchorX="center"
        anchorY="bottom"
      >
        {label}: {value.toFixed(2)}
      </Text>
    </group>
  );
}

// Plant List Component
function PlantList({ 
  position = [0, 0, 0], 
  uiProps,
  onClose
}) {
  const plants = [
    { name: "Rose Bush", type: "flower", id: "rose" },
    { name: "Oak Tree", type: "tree", id: "oak" },
    { name: "Sunflower", type: "flower", id: "sunflower" },
    { name: "Pine Tree", type: "tree", id: "pine" },
    { name: "Tulip", type: "flower", id: "tulip" },
    { name: "Maple Tree", type: "tree", id: "maple" }
  ];

  const [selectedPlant, setSelectedPlant] = useState(-1);

  const handlePlantSelect = (plant, index) => {
    setSelectedPlant(index);
    if (uiProps.setHeldItem) {
      uiProps.setHeldItem(plant);
    }
    // Close plant list after selection
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <group position={position}>
      <GlassPanel size={[2.5, 3, 0.02]}>
        <Text
          position={[0, 1.3, 0.02]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Plant Library
        </Text>
        
        {plants.map((plant, index) => (
          <QuestButton
            key={index}
            position={[0, 1 - index * 0.3, 0.05]}
            color={selectedPlant === index ? "#4CAF50" : "#333333"}
            hoverColor="#4CAF50"
            onClick={() => handlePlantSelect(plant, index)}
            size={[2.2, 0.25, 0.05]}
          >
            {plant.name}
          </QuestButton>
        ))}

        <QuestButton
          position={[0, -1.3, 0.05]}
          color="#F44336"
          onClick={onClose}
          size={[1.5, 0.3, 0.05]}
        >
          Close
        </QuestButton>
      </GlassPanel>
    </group>
  );
}

// Settings Panel Component
function SettingsPanel({ 
  position = [0, 0, 0], 
  uiProps,
  onClose
}) {
  const [settings, setSettings] = useState({
    volume: 0.7,
    brightness: 0.8,
    walkSpeed: 1.0,
    haptics: true,
    autoWalk: uiProps.isWalking || false
  });

  return (
    <group position={position}>
      <GlassPanel size={[2.5, 3, 0.02]}>
        <Text
          position={[0, 1.3, 0.02]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Settings
        </Text>
        
        <QuestSlider
          position={[0, 0.8, 0.05]}
          value={settings.volume}
          onChange={(val) => setSettings(prev => ({...prev, volume: val}))}
          label="Volume"
          width={1.8}
        />
        
        <QuestSlider
          position={[0, 0.4, 0.05]}
          value={settings.brightness}
          onChange={(val) => setSettings(prev => ({...prev, brightness: val}))}
          label="Brightness"
          width={1.8}
        />
        
        <QuestSlider
          position={[0, 0, 0.05]}
          value={settings.walkSpeed}
          onChange={(val) => setSettings(prev => ({...prev, walkSpeed: val}))}
          min={0.1}
          max={2.0}
          label="Walk Speed"
          width={1.8}
        />
        
        <QuestToggle
          position={[-0.5, -0.5, 0.05]}
          value={settings.haptics}
          onChange={(val) => setSettings(prev => ({...prev, haptics: val}))}
          label="Haptic Feedback"
        />
        
        <QuestToggle
          position={[0.5, -0.5, 0.05]}
          value={settings.autoWalk}
          onChange={(val) => {
            setSettings(prev => ({...prev, autoWalk: val}));
            uiProps.setIsWalking?.(val);
          }}
          label="Auto Walk"
        />

        <QuestButton
          position={[0, -1.2, 0.05]}
          color="#F44336"
          onClick={onClose}
          size={[1.5, 0.3, 0.05]}
        >
          Close
        </QuestButton>
      </GlassPanel>
    </group>
  );
}

// Fixed UI that can be repositioned to face the camera
function FixedUI({ children, position = [0, 1.5, -2.5], shouldReposition, onRepositioned }) {
  const groupRef = useRef();
  const { camera } = useThree();
  const { player } = useXR();
  const [currentPosition, setCurrentPosition] = useState(new THREE.Vector3(...position));
  const [currentRotation, setCurrentRotation] = useState(new THREE.Euler(0, 0, 0));

  useEffect(() => {
    if (shouldReposition && groupRef.current) {
      // Get the camera or VR headset position
      const cameraPosition = player?.head?.position || camera.position;
      const cameraRotation = player?.head?.rotation || camera.rotation;
      
      // Calculate position in front of camera
      const distance = 2.5;
      const direction = new THREE.Vector3(0, 0, -distance);
      direction.applyEuler(cameraRotation);
      const newPosition = new THREE.Vector3().copy(cameraPosition).add(direction);
      
      // Set the new position and rotation
      setCurrentPosition(newPosition);
      setCurrentRotation(new THREE.Euler(cameraRotation.x, cameraRotation.y, cameraRotation.z));
      
      // Notify that repositioning is complete
      onRepositioned?.();
    }
  }, [shouldReposition, camera, player, onRepositioned]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(currentPosition);
      groupRef.current.rotation.copy(currentRotation);
    }
  }, [currentPosition, currentRotation]);

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}

// Main Quest-style VR Menu System integrated with your app
function IntegratedVRMenu({ uiProps }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activePanel, setActivePanel] = useState('main');
  const [shouldReposition, setShouldReposition] = useState(false);

  const handleRepositionMenu = () => {
    setShouldReposition(true);
  };

  const handleRepositionComplete = () => {
    setShouldReposition(false);
  };

  return (
    <>
      {/* Floating action buttons - always accessible */}
      <group position={[-1.5, -0.5, -1]}>
        <QuestButton
          position={[0, 0, 0]}
          onClick={() => setMenuVisible(!menuVisible)}
          color="#4CAF50"
          size={[0.8, 0.3, 0.05]}
        >
          {menuVisible ? 'Hide' : 'Menu'}
        </QuestButton>
        
        {menuVisible && (
          <QuestButton
            position={[0, -0.4, 0]}
            onClick={handleRepositionMenu}
            color="#FF9800"
            size={[0.8, 0.25, 0.05]}
          >
            Center UI
          </QuestButton>
        )}
      </group>

      {menuVisible && (
        <FixedUI 
          position={[0, 1.5, -2.5]} 
          shouldReposition={shouldReposition}
          onRepositioned={handleRepositionComplete}
        >
          {/* Main curved panel backdrop */}
          <CurvedPanel 
            position={[0, 0, -0.2]}
            width={4}
            height={3}
            radius={4}
            color="#0D1117"
            opacity={0.95}
          />

          {/* Navigation tabs */}
          <group position={[0, 1.2, 0]}>
            <QuestButton
              position={[-1.2, 0, 0]}
              color={activePanel === 'main' ? "#4CAF50" : "#333333"}
              hoverColor="#4CAF50"
              onClick={() => setActivePanel('main')}
              size={[1, 0.25, 0.05]}
            >
              Home
            </QuestButton>
            
            <QuestButton
              position={[0, 0, 0]}
              color={activePanel === 'plants' ? "#2196F3" : "#333333"}
              hoverColor="#2196F3"
              onClick={() => setActivePanel('plants')}
              size={[1, 0.25, 0.05]}
            >
              Plants
            </QuestButton>
            
            <QuestButton
              position={[1.2, 0, 0]}
              color={activePanel === 'settings' ? "#FF9800" : "#333333"}
              hoverColor="#FF9800"
              onClick={() => setActivePanel('settings')}
              size={[1, 0.25, 0.05]}
            >
              Settings
            </QuestButton>
          </group>

          {/* Panel content */}
          {activePanel === 'main' && (
            <group position={[0, 0, 0.1]}>
              <Text
                position={[0, 0.6, 0]}
                fontSize={0.12}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                VR Garden Dashboard
              </Text>
              
              <GlassPanel position={[0, 0, 0]} size={[2.5, 1.5, 0.02]}>
                <Text
                  position={[0, 0.5, 0.02]}
                  fontSize={0.08}
                  color="#E0E0E0"
                  anchorX="center"
                  anchorY="middle"
                >
                  Plants Placed: {uiProps.placedModels?.length || 0}
                </Text>
                
                <Text
                  position={[0, 0.2, 0.02]}
                  fontSize={0.08}
                  color="#E0E0E0"
                  anchorX="center"
                  anchorY="middle"
                >
                  Current User: {uiProps.userName || 'Guest'}
                </Text>
                
                <Text
                  position={[0, -0.1, 0.02]}
                  fontSize={0.08}
                  color="#E0E0E0"
                  anchorX="center"
                  anchorY="middle"
                >
                  Online Users: {uiProps.users?.length || 0}
                </Text>
                
                <Text
                  position={[0, -0.4, 0.02]}
                  fontSize={0.08}
                  color="#E0E0E0"
                  anchorX="center"
                  anchorY="middle"
                >
                  Water: {uiProps.waterInHand || 0}L
                </Text>
              </GlassPanel>

              <QuestToggle
                position={[0, -0.9, 0]}
                value={uiProps.isWalking}
                onChange={(value) => uiProps.setIsWalking?.(value)}
                label="Walking Mode"
              />

              <QuestButton
                position={[0, -1.4, 0]}
                color="#F44336"
                onClick={() => uiProps.handleSafeExitVR?.()}
                size={[1.5, 0.3, 0.05]}
              >
                Exit VR
              </QuestButton>
            </group>
          )}

          {activePanel === 'plants' && (
            <PlantList 
              position={[0, 0, 0.1]} 
              uiProps={uiProps}
              onClose={() => setActivePanel('main')}
            />
          )}

          {activePanel === 'settings' && (
            <SettingsPanel 
              position={[0, 0, 0.1]} 
              uiProps={uiProps}
              onClose={() => setActivePanel('main')}
            />
          )}

          {/* Ambient lighting for proper material rendering */}
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 2, 1]} intensity={0.8} />
          <pointLight position={[-2, 0, 2]} intensity={0.3} color="#4FC3F7" />
        </FixedUI>
      )}
    </>
  );
}

// Updated VRSceneContent component
function VRSceneContent({ uiProps }) {
  return (
    <group>
      {/* Controllers and hands are enabled by default */}
      
      {/* The ground plane for teleportation */}
      {/* <TeleportationPlane /> */}

      {/* Integrated Quest-style VR Menu System */}
      <IntegratedVRMenu uiProps={uiProps} />
    </group>
  );
}

export default VRSceneContent;