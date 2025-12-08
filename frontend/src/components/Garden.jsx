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

        <group scale={[1.45,1,1]} position={[0,0.04,-0.03]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.celing}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_1.geometry}
          material={materials['floor.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_2.geometry}
          material={materials.wall}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_3.geometry}
          material={materials['Material.002']}
        />
      </group>
      </group>
    </Instances>
  )
})

Garden.displayName = 'Garden'

export default React.memo(Garden)

useGLTF.preload('/models/environment.glb')