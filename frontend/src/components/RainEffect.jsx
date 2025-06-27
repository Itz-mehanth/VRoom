import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef, useMemo } from "react";

const RAIN_COUNT = 1000;
const AREA_SIZE = 20;
const RAIN_HEIGHT = 15;
const RAIN_BOTTOM = -15;
const RAIN_SPEED = 0.45; // Higher = faster

export default function RainEffect({ position = [0, 5, 0] }) {
  const rainRef = useRef();
  // Memoize initial positions
  const positions = useMemo(() => {
    const arr = new Float32Array(RAIN_COUNT * 3);
    for (let i = 0; i < RAIN_COUNT; i++) {
      arr[i * 3] = Math.random() * AREA_SIZE - AREA_SIZE / 2; // x
      arr[i * 3 + 1] = Math.random() * RAIN_HEIGHT; // y
      arr[i * 3 + 2] = Math.random() * AREA_SIZE - AREA_SIZE / 2; // z
    }
    return arr;
  }, []);

  // Store Y velocities for each drop
  const velocities = useMemo(() => {
    const arr = new Float32Array(RAIN_COUNT);
    for (let i = 0; i < RAIN_COUNT; i++) {
      arr[i] = RAIN_SPEED + Math.random() * 0.15; // Slight variation
    }
    return arr;
  }, []);

  useFrame(() => {
    const geom = rainRef.current.geometry;
    const pos = geom.attributes.position.array;
    for (let i = 0; i < RAIN_COUNT; i++) {
      pos[i * 3 + 1] -= velocities[i];
      if (pos[i * 3 + 1] < RAIN_BOTTOM) {
        pos[i * 3 + 1] = RAIN_HEIGHT;
        pos[i * 3] = Math.random() * AREA_SIZE - AREA_SIZE / 2;
        pos[i * 3 + 2] = Math.random() * AREA_SIZE - AREA_SIZE / 2;
      }
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={rainRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={RAIN_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#aee7ff"
        size={0.07}
        sizeAttenuation={true}
        transparent
        opacity={0.7}
      />
    </points>
  );
}
