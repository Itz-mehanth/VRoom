import React, { useRef, forwardRef, useEffect, useMemo } from 'react'
import { Billboard, Cylinder, Sphere, Text, useGLTF, Instances, Instance } from '@react-three/drei'
import { Plant } from './Plant'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'

const TubeLight = React.memo(({ position }) => (
  <group position={position}>
    <pointLight intensity={0.1} distance={3} color="#7cdaffff" decay={2} />
    <Instance rotation={[Math.PI / 2, 0, 0]} />
  </group>
));

const Garden = forwardRef(({ onSelect, ...props }, ref) => {
  const { nodes, materials } = useGLTF('/models/environment.glb')
  const collider = useGLTF('/models/garden_collider.glb')

  const handlePlantClick = () => {
    if (onSelect) {
      onSelect({
        name: 'Garden Plant',
        description: 'A thriving green plant growing in the hydroponic rack.',
        modelPath: '/models/plantpot.glb'
      });
    }
  };

  return (
    <Instances range={100}>
      <cylinderGeometry args={[0.008, 0.008, 0.2, 16]} />
      <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={5} toneMapped={false} />

      {/* Visual Garden - no physics */}
      <group ref={ref} {...props} dispose={null}>
        <Billboard position={[0, 25, 0]}>
          <Text fontSize={4} color="black" anchorX="center" anchorY="middle">
            Herbal Garden
            <mesh position={[0, 0, -0.05]}>
              <boxGeometry args={[30, 5, 0.01]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </Text>
        </Billboard>

        {/* Plant pots on the racks */}
        <group>
          {/* <group position={[1.33, -0.5, -0.27]}>
            <TubeLight position={[-0.85, 0.68, -0.1]} />
            <group position={[0, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
            <group position={[0.08, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
          </group>
          <group position={[1.33, -0.5, 0.01]}>
            <TubeLight position={[-0.85, 0.68, -0.1]} />
            <group position={[0, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
            <group position={[0.08, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
          </group> */}
          <group position={[1.33, -0.5, 0.26]}>
            <TubeLight position={[-0.85, 0.68, -0.1]} />
            <group position={[0, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
            <group position={[0.08, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
          </group>
          <group position={[1.33, -0.5, 0.53]}>
            <TubeLight position={[-0.85, 0.68, -0.1]} />
            <group position={[0, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
            <group position={[0.08, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
          </group>
          {/* <group position={[1.33, -0.5, 0.82]}>
            <TubeLight position={[-0.85, 0.68, -0.1]} />
            <group position={[0, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
            <group position={[0.08, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
          </group>
          <group position={[1.33, -0.5, 1.1]}>
            <TubeLight position={[-0.85, 0.68, -0.1]} />
            <group position={[0, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
            <group position={[0.08, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
          </group>
          <group position={[1.33, -0.5, 1.39]}>
            <TubeLight position={[-0.85, 0.68, -0.1]} />
            <group position={[0, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
            <group position={[0.08, 0, 0]}>
              <Plant onClick={handlePlantClick} position={[0, 0, 0]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.08]} />
              <Plant onClick={handlePlantClick} position={[0, 0, 0.16]} />
            </group>
          </group> */}
        </group>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane005.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane008.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane010.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane011.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane013.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane014.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane015.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane016.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane017.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane018.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane019.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane020.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane021.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.191, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane022.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.37, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane023.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.549, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane024.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.191, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane025.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.37, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane026.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.549, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane027.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.191, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane028.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.37, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane029.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.549, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane030.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.191, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane031.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.37, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane032.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.549, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane033.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.032, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane034.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.032, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane035.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.032, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane036.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.032, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane269.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.096, 1.53]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane270.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.096, 1.259]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane271.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.096, 0.988]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane272.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.096, 0.717]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane273.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.271, 1.801]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane274.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.271, 1.53]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane275.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.271, 1.259]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane276.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.096, 1.801]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane277.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.271, 0.988]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane278.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.271, 0.717]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane279.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.446, 1.801]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane280.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.446, 1.53]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane281.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.446, 1.259]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane282.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.446, 0.988]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane283.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.446, 0.717]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane284.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.622, 1.801]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane285.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.622, 1.53]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane286.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.622, 1.259]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane287.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.622, 0.988]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane288.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.622, 0.717]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane289.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.191, 1.675]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane290.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.37, 1.675]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane291.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.549, 1.675]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane292.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.191, 1.405]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane293.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.37, 1.405]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane294.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.549, 1.405]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane295.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.191, 1.134]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane296.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.37, 1.134]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane297.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.549, 1.134]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane298.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.191, 0.863]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane299.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.37, 0.863]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane300.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.549, 0.863]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane301.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.032, 1.675]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane302.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.032, 1.405]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane303.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.032, 1.134]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane304.geometry}
          material={materials['Material.002']}
          position={[-1.422, 0.032, 0.863]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane233.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, 1.518]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane234.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, 1.247]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane235.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, 0.976]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane236.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, 0.704]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane237.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, 1.789]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane238.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, 1.518]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane239.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, 1.247]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane240.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.096, 1.789]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane241.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, 0.976]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane242.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.271, 0.704]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane243.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, 1.789]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane244.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, 1.518]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane245.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, 1.247]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane246.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, 0.976]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane247.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.446, 0.704]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane248.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, 1.789]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane249.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, 1.518]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane250.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, 1.247]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane251.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, 0.976]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane252.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.622, 0.704]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane253.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.191, 1.663]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane254.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.37, 1.663]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane255.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.549, 1.663]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane256.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.191, 1.392]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane257.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.37, 1.392]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane258.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.549, 1.392]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane259.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.191, 1.121]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane260.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.37, 1.121]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane261.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.549, 1.121]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane262.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.191, 0.851]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane263.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.37, 0.851]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane264.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.549, 0.851]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane265.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.032, 1.663]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane266.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.032, 1.392]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane267.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.032, 1.121]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane268.geometry}
          material={materials['Material.002']}
          position={[1.33, 0.032, 0.851]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane073.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane074.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane075.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane076.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane077.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane078.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane079.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane080.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane081.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane082.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane083.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane084.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane085.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane086.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane087.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane088.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane089.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane090.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane091.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane092.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane093.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.191, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane094.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.37, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane095.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.549, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane096.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.191, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane097.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.37, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane098.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.549, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane099.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.191, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane100.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.37, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane101.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.549, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane102.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.191, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane103.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.37, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane104.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.549, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.032, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane106.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.032, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane107.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.032, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane108.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.032, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane109.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane110.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane111.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane113.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane114.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane115.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane116.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.096, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane117.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane118.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.271, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane119.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane120.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane121.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane122.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane123.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.446, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane124.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane125.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane126.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane127.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane128.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.622, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane129.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.191, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane130.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.37, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane131.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.549, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane132.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.191, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane133.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.37, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane134.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.549, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane135.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.191, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane136.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.37, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane137.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.549, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane138.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.191, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane139.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.37, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane140.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.549, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane141.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.032, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane142.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.032, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane143.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.032, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane144.geometry}
          material={materials['Material.002']}
          position={[-1.414, 0.032, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane037.geometry}
          material={materials['Material.002']}
          position={[0.198, 0.096, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane038.geometry}
          material={materials['Material.002']}
          position={[-0.073, 0.096, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane039.geometry}
          material={materials['Material.002']}
          position={[-0.344, 0.096, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane040.geometry}
          material={materials['Material.002']}
          position={[-0.615, 0.096, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane041.geometry}
          material={materials['Material.002']}
          position={[0.469, 0.271, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane042.geometry}
          material={materials['Material.002']}
          position={[0.198, 0.271, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane043.geometry}
          material={materials['Material.002']}
          position={[-0.073, 0.271, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane044.geometry}
          material={materials['Material.002']}
          position={[0.469, 0.096, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane045.geometry}
          material={materials['Material.002']}
          position={[-0.344, 0.271, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane046.geometry}
          material={materials['Material.002']}
          position={[-0.615, 0.271, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane047.geometry}
          material={materials['Material.002']}
          position={[0.469, 0.446, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane048.geometry}
          material={materials['Material.002']}
          position={[0.198, 0.446, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane049.geometry}
          material={materials['Material.002']}
          position={[-0.073, 0.446, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane050.geometry}
          material={materials['Material.002']}
          position={[-0.344, 0.446, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane051.geometry}
          material={materials['Material.002']}
          position={[-0.615, 0.446, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane052.geometry}
          material={materials['Material.002']}
          position={[0.469, 0.622, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane053.geometry}
          material={materials['Material.002']}
          position={[0.198, 0.622, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane054.geometry}
          material={materials['Material.002']}
          position={[-0.073, 0.622, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane055.geometry}
          material={materials['Material.002']}
          position={[-0.344, 0.622, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane056.geometry}
          material={materials['Material.002']}
          position={[-0.615, 0.622, -0.923]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane057.geometry}
          material={materials['Material.002']}
          position={[0.343, 0.191, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane058.geometry}
          material={materials['Material.002']}
          position={[0.343, 0.37, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane059.geometry}
          material={materials['Material.002']}
          position={[0.343, 0.549, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane060.geometry}
          material={materials['Material.002']}
          position={[0.073, 0.191, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane061.geometry}
          material={materials['Material.002']}
          position={[0.073, 0.37, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane062.geometry}
          material={materials['Material.002']}
          position={[0.073, 0.549, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane063.geometry}
          material={materials['Material.002']}
          position={[-0.198, 0.191, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane064.geometry}
          material={materials['Material.002']}
          position={[-0.198, 0.37, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane065.geometry}
          material={materials['Material.002']}
          position={[-0.198, 0.549, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane066.geometry}
          material={materials['Material.002']}
          position={[-0.469, 0.191, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane067.geometry}
          material={materials['Material.002']}
          position={[-0.469, 0.37, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane068.geometry}
          material={materials['Material.002']}
          position={[-0.469, 0.549, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane069.geometry}
          material={materials['Material.002']}
          position={[0.343, 0.032, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane070.geometry}
          material={materials['Material.002']}
          position={[0.073, 0.032, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane071.geometry}
          material={materials['Material.002']}
          position={[-0.198, 0.032, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane072.geometry}
          material={materials['Material.002']}
          position={[-0.469, 0.032, -0.923]}
          rotation={[0, 0, Math.PI]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane145.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane146.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane147.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane148.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane149.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane150.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane151.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane152.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane153.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane154.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane155.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane156.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane157.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane158.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane159.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane160.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane161.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane162.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane163.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane164.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane165.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane166.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane167.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane168.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane169.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane170.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane171.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane172.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane173.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane174.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane175.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane176.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane177.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane178.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane179.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane180.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane181.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane182.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane183.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane184.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane185.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane186.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane187.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane188.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane309.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.096, 1.396]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane312.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.096, 1.125]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane315.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.096, 0.854]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane316.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.096, 0.583]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane331.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.271, 1.396]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane334.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.271, 1.125]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane338.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.271, 0.854]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane345.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.271, 0.583]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane351.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.191, 1.271]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane352.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.37, 1.271]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane353.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.191, 1]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane354.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.37, 1]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane355.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.191, 0.729]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane356.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.37, 0.729]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane358.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.032, 1.271]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane359.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.032, 1]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane360.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.032, 0.729]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane361.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.096, 1.396]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane362.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.096, 1.125]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane363.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.096, 0.854]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane364.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.096, 0.583]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane366.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.271, 1.396]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane367.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.271, 1.125]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane369.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.271, 0.854]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane370.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.271, 0.583]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane373.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.191, 1.271]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane374.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.37, 1.271]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane375.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.191, 1]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane376.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.37, 1]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane377.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.191, 0.729]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane378.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.37, 0.729]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane380.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.032, 1.271]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane381.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.032, 1]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane382.geometry}
          material={materials['Material.002']}
          position={[0.451, 0.032, 0.729]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane305.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 1.432]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane306.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 1.16]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane307.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.889]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane308.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.618]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane310.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 1.432]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane311.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 1.16]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane313.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.889]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane314.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.618]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane317.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 1.306]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane318.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 1.306]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane319.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 1.035]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane320.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 1.035]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane321.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 0.764]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane322.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 0.764]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane324.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 1.306]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane325.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 1.035]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane326.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 0.764]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane327.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 1.432]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane328.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 1.16]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane329.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.889]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane330.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.096, 0.618]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane332.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 1.432]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane333.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 1.16]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane335.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.889]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane336.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.271, 0.618]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane339.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 1.306]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane340.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 1.306]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane341.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 1.035]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane342.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 1.035]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane343.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.191, 0.764]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane344.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.37, 0.764]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane346.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 1.306]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane347.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 1.035]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane348.geometry}
          material={materials['Material.002']}
          position={[-0.549, 0.032, 0.764]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane189.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane190.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane191.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane192.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane193.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane194.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane195.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane196.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane197.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane198.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane199.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.191, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane200.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.37, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane201.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.191, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane202.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.37, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane203.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.191, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane204.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.37, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane205.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.191, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane206.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.37, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane207.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.032, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane208.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.032, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane209.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.032, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane210.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.032, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane211.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane212.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane213.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane214.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane215.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane216.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, 0.291]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane217.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, 0.02]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane218.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.096, 0.562]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane219.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, -0.251]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane220.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.271, -0.522]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[0.008, 0.138, 0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane221.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.191, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane222.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.37, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane223.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.191, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane224.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.37, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane225.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.191, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane226.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.37, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane227.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.191, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane228.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.37, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane229.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.032, 0.437]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane230.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.032, 0.166]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane231.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.032, -0.105]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane232.geometry}
          material={materials['Material.002']}
          position={[0.455, 0.032, -0.376]}
          rotation={[-Math.PI, -1.571, 0]}
          scale={[0.011, 0.211, 0.067]}
        />
        <group position={[-0.039, 0.028, -0.02]} scale={[1.518, 1, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials.celing}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials['floor.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials.wall}
          />
        </group>
      </group>
    </Instances>
  )
})

Garden.displayName = 'Garden'

export default React.memo(Garden)

useGLTF.preload('/models/environment.glb')