import React, { useEffect, useRef, memo } from 'react'
import { Billboard, Text, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

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
  const { nodes, materials } = useGLTF('/models/character.glb')
  const mixer = useRef(null)
  const walkingAction = useRef(null)
  const idleAction = useRef(null)

  // Initialize current position and rotation refs
  const currentPosition = useRef(
    position ? new THREE.Vector3(position.x, position.y, position.z) : new THREE.Vector3()
  )

  const currentRotation = useRef(rotation?.y || 0)

  // Load and setup walking animation
  useEffect(() => {
    const loader = new FBXLoader()
    loader.load('/animations/Walking-InPlace.fbx', (fbx) => {
      if (group.current) {
        const animation = fbx.animations[0]
        mixer.current = new THREE.AnimationMixer(group.current)
        walkingAction.current = mixer.current.clipAction(animation)
        walkingAction.current.setEffectiveTimeScale(1)
        walkingAction.current.setEffectiveWeight(1)
        walkingAction.current.clampWhenFinished = true
      }
    })

    loader.load('/animations/Breathing Idle.fbx', (fbx) => {
      if (group.current) {
        const animation = fbx.animations[0]
        idleAction.current = mixer.current.clipAction(animation)
        idleAction.current.setEffectiveTimeScale(1)
        idleAction.current.setEffectiveWeight(1)
        idleAction.current.clampWhenFinished = true
        idleAction.current.play()
      }
    })
  }, [])

  // Handle walking animation
  useEffect(() => {
    if(!walkingAction.current && !idleAction.current) return

    if (isWalking) {
      idleAction.current.fadeOut(0.3);
      walkingAction.current.reset().fadeIn(0.3).play();
    } else {
      walkingAction.current.fadeOut(0.3);
      idleAction.current.reset().fadeIn(0.3).play();
    }
  }, [isWalking])

  // Update animation mixer
  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta)
    }
  })

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
      if (mixer.current) {
        mixer.current.stopAllAction()
      }
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
      <group rotation={[Math.PI/2, Math.PI, 0]} position={[0, 0, 0]} scale={[0.6, 0.6, 0.6]}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      </group>
    </group>
  )
}

// Preload the model
useGLTF.preload('/models/character.glb')

export default memo(Avatar, arePropsEqual);
