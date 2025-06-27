import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const isPC = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

export default function Rig({ userName, socket, position, setPosition, isWalking, enterAr }) {
  const rigRef = useRef();
  const mobileControlsRef = useRef();
  const { camera } = useThree();
  const lastUpdateRef = useRef(Date.now());
  const UPDATE_INTERVAL = 500;
  const [isColliding, setIsColliding] = useState(false);

  useEffect(() => {
    if (mobileControlsRef.current && !(isPC && !enterAr)) {
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      const target = new THREE.Vector3(position.x, position.y, position.z).add(forward);
      mobileControlsRef.current.target.copy(target);
      mobileControlsRef.current.update();
    }
  }, [position.x, position.y, position.z, camera, enterAr]);

  useFrame((state, delta) => {
    if (!rigRef.current) return;
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    let angleDeg = THREE.MathUtils.radToDeg(Math.atan2(dir.x, dir.z));
    if (angleDeg < 0) angleDeg += 360;
    const angleRad = THREE.MathUtils.degToRad(angleDeg);
    const now = Date.now();
    const shouldUpdate = socket && now - lastUpdateRef.current >= UPDATE_INTERVAL;
    if (isWalking && !isColliding) {
      const speed = 5;
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(camera.quaternion);
      forward.y = 0; // Prevent vertical movement
      if (forward.lengthSq() > 0) forward.normalize();
      // Only move if horizontal forward vector is significant
      if (forward.length() > 0.1) {
        const newX = rigRef.current.position.x + forward.x * speed * delta;
        const newZ = rigRef.current.position.z + forward.z * speed * delta;
        const newPosition = {
          x: newX,
          y: rigRef.current.position.y,
          z: newZ
        };
        rigRef.current.position.x = newPosition.x;
        rigRef.current.position.z = newPosition.z;

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
      }
    } else if (shouldUpdate) {
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
          enableZoom={false}
          enablePan={false}
          enableDamping={false}
          enableRotate={true}
          keys={{ LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' }}
          touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
        />
      )}
    </group>
  );
}
