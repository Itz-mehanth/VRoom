import React, { useRef } from 'react';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const HolographicIndicator = ({ position, children, color = '#00ffff' }) => {
  const groupRef = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(time.current * 2) * 0.05;
    }
  });

  // Create a brighter version of the color for glow effects
  const brightColor = new THREE.Color(color).multiplyScalar(2);

  return (
    <group ref={groupRef} position={position}>
      {/* Connecting line */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
        <meshBasicMaterial
          color={brightColor}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Circle marker at the bottom */}
      <mesh position={[0, -1, 0]}>
        <ringGeometry args={[0.2, 0.25, 32]} />
        <meshBasicMaterial
          color={brightColor}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner circle */}
      <mesh position={[0, -1, 0.01]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial
          color={brightColor}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Holographic display box */}
      <Billboard>
        {/* Outer glow */}
        <mesh>
          <planeGeometry args={[2.4, 1.4]} />
          <meshBasicMaterial
            color={brightColor}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Main display */}
        <mesh>
          <planeGeometry args={[2, 1]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Glowing border */}
        <mesh>
          <planeGeometry args={[2.1, 1.1]} />
          <meshBasicMaterial
            color={brightColor}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Digital scan lines */}
        <mesh>
          <planeGeometry args={[2, 1, 32, 16]} />
          <meshBasicMaterial
            color={brightColor}
            transparent
            opacity={0.5}
            wireframe
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Corner accents */}
        {[
          [-0.9, 0.4], [0.9, 0.4], // Top corners
          [-0.9, -0.4], [0.9, -0.4] // Bottom corners
        ].map(([x, y], index) => (
          <mesh key={index} position={[x, y, 0.01]}>
            <boxGeometry args={[0.2, 0.2, 0.01]} />
            <meshBasicMaterial
              color={brightColor}
              transparent
              opacity={1}
            />
          </mesh>
        ))}

        {/* Content */}
        <group position={[0, 0, 0.02]}>
          {children}
        </group>
      </Billboard>
    </group>
  );
};

export default HolographicIndicator; 