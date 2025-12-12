import React, { useRef } from 'react';
import { Billboard, Text, RoundedBox } from '@react-three/drei';
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
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(time.current * 2) * 0.05;
    }
  });

  // Calculate dimensions
  const hasText = !!text;
  const panelWidth = 2.0;
  const panelHeight = hasText ? 0.8 : 0.5;

  return (
    <group ref={groupRef} position={position}>
      {/* Connecting line (3D) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 1, 8]} />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Anchor Dot (3D) */}
      <mesh position={[0, -1, 0]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* 3D Billboard Label */}
      <Billboard>
        <group position={[0, hasText ? 0 : 0.15, 0]}>

          {/* Glass-like Background Panel */}
          <RoundedBox args={[panelWidth, panelHeight, 0.02]} radius={0.1} smoothness={4}>
            <meshBasicMaterial
              color="#1a1a1a"
              transparent
              opacity={0.8}
            />
          </RoundedBox>

          {/* Text Content */}
          <group position={[0, 0, 0.03]}>
            {/* Name */}
            <Text
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.015} // Slightly reduced outline
              outlineColor="black"
              // font="Inter-Bold.ttf" // Use default font for safety
              position={[0, hasText ? 0.15 : 0, 0]}
              maxWidth={panelWidth - 0.2}
              textAlign="center"
            >
              {name}
            </Text>

            {/* Detail Text */}
            {hasText && (
              <Text
                fontSize={0.12}
                color="#e0e0e0"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.01}
                outlineColor="black"
                position={[0, -0.15, 0]}
                maxWidth={panelWidth - 0.2}
                textAlign="center"
              >
                {text}
              </Text>
            )}
          </group>
        </group>
      </Billboard>
    </group>
  );
};

export default LabelBillboard; 