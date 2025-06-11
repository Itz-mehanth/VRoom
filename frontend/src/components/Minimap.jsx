import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrthographicCamera, Text, Circle } from '@react-three/drei';
import * as THREE from 'three';

const MapBackground = ({ image, radius }) => {
  const texture = useLoader(THREE.TextureLoader, image);
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <boxGeometry args={[radius + 35, radius + 35, 0.1]} />
      <meshBasicMaterial map={texture} transparent opacity={1} />
    </mesh>
  );
};

const UserDot = ({ position, rotation, isCurrentUser, userName }) => {
  const color = isCurrentUser ? '#00ff00' : '#00ffff';
  const size = isCurrentUser ? 1.8 : 1.8;

  // Ensure position values are numbers and not undefined
  const x = Number(position?.x) || 0;
  const z = Number(position?.z) || 0;
  const rotationY = Number(rotation?.y) || 0;

  return (
    <group position={[x, 0, z]} rotation={[0, rotationY, 0]}>
      {/* User dot */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[size, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Direction indicator (arrow) */}
      <group>
        {/* Arrow body */}
        <mesh position={[0, 0, -size]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[size * 0.3, size * 1.5]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* Username label */}
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {userName.slice(0, 1)}
      </Text>
    </group>
  );
};

const BoundaryCircle = ({ radius }) => {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[radius + 1, radius + 1, 0.1]} />
        <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />
      </mesh>
      {/* Cardinal directions */}
      {['N', 'E', 'S', 'W'].map((direction, index) => {
        const angle = (index * Math.PI) / 2;
        const x = Math.sin(angle) * (radius + 1);
        const z = Math.cos(angle) * (radius + 1);
        return (
          <Text
            key={direction}
            position={[x, z, 0.1]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
            opacity={0.5}
          >
            {direction}
          </Text>
        );
      })}
    </group>
  );
};

const Minimap = ({ currentUser, users, mapSize = 50, backgroundImage = '/maps/garden.png' }) => {
  // Increase the map scale to show more area
  const mapScale = 0.4; // Changed from 0.2 to 0.4
  const boundaryRadius = mapSize * mapScale * 0.45;

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      width: '150px',
      height: '150px',
      backgroundColor: 'rgb(255, 255, 255)',
      overflow: 'hidden',
      border: '2px solid rgb(255, 255, 255)'
    }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        orthographic
        flat
        linear
      >
        <OrthographicCamera
          makeDefault
          position={[0, 10, 0]}
          zoom={3}
          near={0.1}
          far={1000}
          rotation={[-Math.PI / 2, 0, 0]}
        />

        {/* Background Image */}
        <MapBackground image={backgroundImage} radius={boundaryRadius} />

        {/* Boundary circle/ */}
        {/* <BoundaryCircle radius={boundaryRadius} /> */}

        {/* Current user */}
        <UserDot 
          position={currentUser.position}
          rotation={currentUser.rotation}
          isCurrentUser={true}
          userName={currentUser.name}
        />

        {/* Other users */}
        {users.filter(user => user && user.name !== currentUser.name).map((user) => (
          <UserDot
            key={user.name}
            position={user.position}
            rotation={user.rotation}
            isCurrentUser={false}
            userName={user.name}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Minimap; 