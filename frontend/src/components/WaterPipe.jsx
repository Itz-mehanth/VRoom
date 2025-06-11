import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function WaterPipe({ position = [10, 0, 10], onRefill }) {
  const pipeRef = useRef();

  // Create a simple pipe model using Three.js geometries
  const pipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
  const spoutGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);
  const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);

  return (
    <group position={position} ref={pipeRef}>
      {/* Base */}
      <mesh 
        position={[0, 0.1, 0]} 
        castShadow 
        receiveShadow
        onClick={onRefill}
      >
        <primitive object={baseGeometry} />
        <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main pipe body */}
      <mesh 
        position={[0, 1.1, 0]} 
        castShadow 
        receiveShadow
        onClick={onRefill}
      >
        <primitive object={pipeGeometry} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Spout */}
      <mesh 
        position={[0.3, 1.8, 0]} 
        rotation={[0, 0, -Math.PI / 4]} 
        castShadow 
        receiveShadow
        onClick={onRefill}
      >
        <primitive object={spoutGeometry} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
} 