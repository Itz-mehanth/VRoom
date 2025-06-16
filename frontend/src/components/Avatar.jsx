import React, { useEffect, useRef, memo } from 'react'
import { Billboard, Text, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Custom comparison function for memo
const arePropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.userName === nextProps.userName &&
    prevProps.isWalking === nextProps.isWalking &&
    (prevProps.position?.x === nextProps.position?.x &&
     prevProps.position?.y === nextProps.position?.y &&
     prevProps.position?.z === nextProps.position?.z) &&
    (prevProps.rotation?.y === nextProps.rotation?.y)
  );
};

const Avatar = ({ position, userName, rotation, isWalking }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/head.glb')
  
  // Initialize current position and rotation refs
  const currentPosition = useRef(
    position ? new THREE.Vector3(position.x, position.y, position.z) : new THREE.Vector3()
  )
  const currentRotation = useRef(rotation?.y || 0)

  // Cleanup function for materials and geometries
  useEffect(() => {
    const cleanup = () => {
      Object.values(materials).forEach(material => {
        if (material.dispose) {
          material.dispose()
        }
      })
      Object.values(nodes).forEach(node => {
        if (node.geometry && node.geometry.dispose) {
          node.geometry.dispose()
        }
      })
    }
    return cleanup
  }, [materials, nodes])

  useFrame((state, delta) => {
    if (!group.current || !position || !rotation) return

    // Constant speed movement
    if (position) {
      const targetPos = new THREE.Vector3(position.x, position.y - 1, position.z)
      const currentPos = currentPosition.current
      
      // Calculate direction and distance to target
      const direction = new THREE.Vector3()
      direction.subVectors(targetPos, currentPos)
      const distanceToTarget = direction.length()

      if (distanceToTarget > 0.01) {
        // Normalize direction and apply constant speed
        direction.normalize()
        const speed = 2.5 // Units per second
        const movement = direction.multiplyScalar(Math.min(speed * delta, distanceToTarget))
        
        currentPos.add(movement)
        group.current.position.copy(currentPos)
      }
    }

    // Smooth rotation interpolation
    if (rotation) {
      const targetRotation = rotation.y - Math.PI
      
      // Calculate the shortest angle difference
      let rotationDiff = (((targetRotation - currentRotation.current + Math.PI) % (Math.PI * 2)) - Math.PI)
      
      // Use constant angular speed
      const rotationSpeed = 3 // Radians per second
      if (Math.abs(rotationDiff) > 0.01) {
        const rotationStep = Math.sign(rotationDiff) * Math.min(Math.abs(rotationDiff), rotationSpeed * delta)
        currentRotation.current += rotationStep
        group.current.rotation.y = currentRotation.current
      }
    }
  })
  
  return (
    <group ref={group}>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[0, 0.5, 0]}
      >
        <Text
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {userName}
        </Text>
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[1, 0.5, 0.01]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </Billboard>
      <group rotation={[0, Math.PI, 0]} position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_2.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_3.geometry}
          material={materials['Material.004']}
        />
      </group>
    </group>
  )
}

// Preload the model
useGLTF.preload('/models/head.glb')

export default memo(Avatar, arePropsEqual);
