import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ToggleButton from './ToggleButton';
import { PointerLockControls, Text, Billboard, PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import * as THREE from 'three';
import Avatar from './Avatar';
import { Environment } from '@react-three/drei';

const WalkingIndicator = ({ isWalking }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: isWalking ? '#4CAF50' : '#f44336',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '20px',
      fontWeight: 'bold',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: isWalking ? 1 : 0.5
      }} />
      {isWalking ? 'Walking' : 'Idle'}
    </div>
  );
};

const Rig = ({ userName, socket, position, setPosition, isWalking }) => {
  const rigRef = useRef();
  const { camera } = useThree();
  const lastUpdateRef = useRef(Date.now());
  const UPDATE_INTERVAL = 517;

  useFrame((state, delta) => {
    if (!rigRef.current) return;

    // Calculate 2D angle from camera direction
    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)
    let angleDeg = THREE.MathUtils.radToDeg(Math.atan2(dir.x, dir.z))
    if (angleDeg < 0) angleDeg += 360;

    // angleDeg = (360 - angleDeg) % 360;
    
    // Convert back to radians for rotation
    const angleRad = THREE.MathUtils.degToRad(angleDeg)

    const now = Date.now();
    const shouldUpdate = socket && now - lastUpdateRef.current >= UPDATE_INTERVAL;

    if (isWalking) {
      const speed = 2;

      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(camera.quaternion);
      forward.y = 0;
      forward.normalize();

      const newPosition = {
        x: rigRef.current.position.x + forward.x * speed * delta,
        y: rigRef.current.position.y,
        z: rigRef.current.position.z + forward.z * speed * delta
      };
      
      rigRef.current.position.x = newPosition.x;
      rigRef.current.position.z = newPosition.z;
      camera.position.copy(rigRef.current.position);
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
      <PointerLockControls />
    </group>
  );
};

export default function VRScene ({ roomId, userName, users, toggleView, socket }) {
  const [isWalking, setIsWalking] = useState(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 2, z: 5 });
  const canvasRef = useRef();
  const usersRef = useRef(users);

  // Keep usersRef updated
  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  // Handle transform updates
  useEffect(() => {
    if (!socket) return;

    const handleTransform = ({ userName: updatedUserName, position, rotation, isWalking }) => {
      const userToUpdate = usersRef.current.find(u => u.name === updatedUserName);
      if (userToUpdate) {
        userToUpdate.position = position;
        userToUpdate.rotation = rotation;
        userToUpdate.isWalking = isWalking;
      }
    };

    socket.on('user-transform', handleTransform);
    return () => socket.off('user-transform', handleTransform);
  }, [socket]);

  const isPC = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  useEffect(() => {
    const handleLockChange = () => {
      const locked = document.pointerLockElement != null;
      setIsPointerLocked(locked);
      if (!locked) {
        setIsWalking(false); // Stop walking when pointer lock is released
      }
    };

    document.addEventListener('pointerlockchange', handleLockChange);
    return () => {
      document.removeEventListener('pointerlockchange', handleLockChange);
    };
  }, []);

  // PC: W key toggle walking
  useEffect(() => {
    if (!isPC) return;

    const handleKeyDown = (e) => {
      if (e.key === 'w' && isPointerLocked) {
        setIsWalking(prev => !prev); // Toggle walking state
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPC, isPointerLocked]);

  const handleCanvasClick = () => {
    if (!isPointerLocked) {
      canvasRef.current?.requestPointerLock();
    }
  };


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        ref={canvasRef}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true,
          logarithmicDepthBuffer: true
        }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 2, 0]
        }}
      >
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[50, 50, 25]}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />
        <fog attach="fog" args={['#000000', 1, 500]} />
        <Sky sunPosition={[100, 20, 100]} turbidity={8} />
  
        <Rig
          userName={userName}
          socket={socket}
          position={position}
          setPosition={setPosition}
          isWalking={isWalking}
        />
  
        {users.map((user) => {
          if (user.name === userName) {
            return null;
          }
          return (
            <Avatar
              key={user.id}
              position={user.position}
              userName={user.name}
              rotation={user.rotation}
              isWalking={user.isWalking}
            />
          );
        })}
  
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        <gridHelper args={[100, 100]} position={[0, 0, 0]} />
        <axesHelper args={[5]} />
      </Canvas>
      <ToggleButton onClick={toggleView} />
      <WalkingIndicator isWalking={isWalking} />
  
      {isPointerLocked && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
      )}
  
      {!isPointerLocked && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '1.2rem',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          Click to enter VR mode<br />
          Press W to toggle walking<br />
          Mouse to look around
        </div>
      )}
    </div>
  );
};
