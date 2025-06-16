import React, { useRef } from 'react';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const LabelBillboard = ({ 
  position,
  text, 
  name,
  isHovered,
  targetPosition, 
  color = '#2C3E50',
  maxDistance = 50,
  minOpacity = 0.3
}) => {
  const groupRef = useRef();
  const { camera } = useThree();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    
    if (groupRef.current) {
      // Calculate distance from camera
      const distance = camera.position.distanceTo(groupRef.current.position);
      
      // Calculate opacity based on distance
      const distanceOpacity = Math.max(
        minOpacity,
        1 - (distance / maxDistance)
      );

      // Update materials' opacity
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity = distanceOpacity;
        }
      });

      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(time.current * 2) * 0.05;
    }
  });

  // Create a darker version of the color for shadows
  const shadowColor = new THREE.Color(color).multiplyScalar(0.7);

  return (
    <group ref={groupRef} position={position}>
      {/* Connecting line */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Circle marker at the bottom */}
      <mesh position={[0, -1, 0]}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Billboard container */}
      <Billboard>
        {/* Background shadow */}
        <mesh position={[0.02, -0.02, -0.01]}>
          <planeGeometry args={[2.2, 1.2]} />
          <meshBasicMaterial
            color={shadowColor}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Main background */}
        <mesh>
          <planeGeometry args={[2, 1]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Border */}
        <mesh>
          <planeGeometry args={[2.1, 1.1]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Content */}
        <group position={[0, 0, 0.01]}>
          <Text
            fontSize={0.25}
            color={color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#FFFFFF"
            // font="/fonts/Inter-Bold.ttf"
            lineHeight={1.2}
            letterSpacing={0.05}
            textAlign='center'
            position={[0, 0.2, 0]}
          >
            {name}{'\n'}
          </Text>
          <Text
            fontSize={0.2}
            color={color}
            position={[0, -0.2, 0]}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#FFFFFF"
            // font="/fonts/Inter-Bold.ttf"
            letterSpacing={0.05}
            textAlign='center'
          >
            {text}
          </Text>
        </group>
      </Billboard>
    </group>
  );
};

export default LabelBillboard; 