import React from 'react';
import { Circle } from '@react-three/drei';

const DropIndicator = ({ position }) => {
  if (!position) return null;

  return (
    <group position={position}>
      {/* Circular indicator */}
      <Circle args={[1, 32]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#4CAF50" transparent opacity={0.5} />
      </Circle>
      
      {/* Crosshair lines */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.1, 2, 0.01]} />
          <meshBasicMaterial color="#4CAF50" transparent opacity={0.7} />
        </mesh>
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.1, 2, 0.01]} />
          <meshBasicMaterial color="#4CAF50" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
};

export default DropIndicator; 