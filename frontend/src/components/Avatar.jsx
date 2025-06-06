import React, { useEffect, useRef, memo } from 'react'
import { useGLTF, useFBX, useAnimations, Billboard, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Custom comparison function for memo
const arePropsEqual = (prevProps, nextProps) => {
  // Only re-render if these specific properties change
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
  const avatarRef = useRef()
  const { nodes, materials } = useGLTF('/models/character.glb')

  // const { animations: walkingAnimation } = useFBX('/animations/Walking-InPlace.fbx')
  // const { animations: idleAnimation } = useFBX('/animations/Breathing Idle.fbx')

  // walkingAnimation[0].name = 'Walking'
  // idleAnimation[0].name = 'Idle'

  // const { actions } = useAnimations([walkingAnimation[0], idleAnimation[0]], avatarRef)
  // const targetPosition = useRef(new THREE.Vector3())
  // const currentAction = useRef('Idle')
  // const lastPosition = useRef(new THREE.Vector3())
  // const lastRotation = useRef(0)

  // // Initial setup of animations
  // useEffect(() => {
  //   if (!actions) return
  //   console.log(`[${userName}] Setting up animations for user`)

  //   // Configure animations
  //   actions.Walking.setLoop(THREE.LoopRepeat)
  //   actions.Walking.clampWhenFinished = false
  //   actions.Walking.timeScale = 1
  //   actions.Walking.stop()

  //   actions.Idle.setLoop(THREE.LoopRepeat)
  //   actions.Idle.clampWhenFinished = false
  //   actions.Idle.timeScale = 1

  //   // Start with idle
  //   actions.Walking.stop()
  //   actions.Walking.reset()
  //   actions.Idle.reset().play()
  //   currentAction.current = 'Idle'


  //   // // Log initial state
  //   // console.log(`[${userName}] Initial animation state:`, {
  //   //   isWalking: isWalking,
  //   //   currentAction: currentAction.current,
  //   //   walkingIsRunning: actions.Walking.isRunning(),
  //   //   idleIsRunning: actions.Idle.isRunning()
  //   // })

  //   return () => {
  //     // Cleanup animations
  //     if (actions && actions.Walking) {
  //       actions.Walking.stop()
  //     }
  //     if (actions && actions.Idle) {
  //       actions.Idle.stop()
  //     }
  //   }
  // }, [actions, userName])

  // // Handle animation changes based on isWalking prop
  // useEffect(() => {
  //   if (!actions) return

  //   console.log(`[${userName}] Animation state before change:`, {
  //     isWalking: isWalking,
  //     currentAction: currentAction.current,
  //     walkingIsRunning: actions.Walking.isRunning(),
  //     idleIsRunning: actions.Idle.isRunning()
  //   })

  //   const switchToWalking = () => {
  //     if (currentAction.current !== 'Walking') {
  //       actions.Idle.stop()
  //       actions.Walking.reset().play()
  //       currentAction.current = 'Walking'
  //     }
  //   }

  //   const switchToIdle = () => {
  //     if (currentAction.current !== 'Idle') {
  //       actions.Walking.stop()
  //       actions.Idle.reset().play()
  //       currentAction.current = 'Idle'
  //     }
  //   }

  //   if (isWalking) {
  //     console.log(`[${userName}] Switching to walking animation`)
  //     switchToWalking()
  //   } else {
  //     console.log(`[${userName}] Switching to idle animation`)
  //     switchToIdle()
  //   }

  //   // Verify the change
  //   console.log(`[${userName}] Animation state after change:`, {
  //     isWalking: isWalking,
  //     currentAction: currentAction.current,
  //     walkingIsRunning: actions.Walking.isRunning(),
  //     idleIsRunning: actions.Idle.isRunning()
  //   })
  // }, [isWalking, actions])

  // Update target position when position prop changes
  useEffect(() => {
    if (position) {
      console.log('position changed', position)
      targetPosition.current.set(position.x, position.y - 1, position.z)
    }
  }, [position])

  useFrame(() => {
    if (!group.current || !position || !rotation) return

    // Smooth position interpolation
    const currentPos = group.current.position
    const targetPos = new THREE.Vector3(position.x, position.y - 1, position.z)
    
    // Only update if there's significant movement
    const distanceToTarget = currentPos.distanceTo(targetPos)
    if (distanceToTarget > 0.01) {
      currentPos.lerp(targetPos, 0.1)
      lastPosition.current.copy(currentPos)
    }

    // Smooth rotation interpolation with shortest path
    const targetRotation = rotation.y - Math.PI
    const currentRotation = group.current.rotation.y
    
    // Calculate the shortest angle difference (negated for clockwise rotation)
    let rotationDiff = (((targetRotation - currentRotation + Math.PI) % (Math.PI * 2)) - Math.PI)
    
    if (Math.abs(rotationDiff) > 0.01) {
      // Apply smooth rotation using the shortest path
      group.current.rotation.y += rotationDiff * 0.1
      lastRotation.current = group.current.rotation.y
    }
  })
  
  return (
    <group ref={group}>
      <Billboard position={[0, 2, 0]}>
        <Text
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {userName}
        </Text>
        <mesh>
          <planeGeometry args={[2, 1]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </Billboard>
      <group 
        ref={avatarRef} 
        dispose={null}
      >
        <group rotation={[0, 3.14, 0]} name="Scene">
          <group name="Armature">
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="blue" />
            </mesh>
            {/* <primitive object={nodes.Hips} />
            <skinnedMesh
              name="Wolf3D_Body"
              geometry={nodes.Wolf3D_Body.geometry}
              material={materials.Wolf3D_Body}
              skeleton={nodes.Wolf3D_Body.skeleton}
              bindMode="attached"
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Bottom"
              geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
              material={materials.Wolf3D_Outfit_Bottom}
              skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
              bindMode="attached"
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Footwear"
              geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
              material={materials.Wolf3D_Outfit_Footwear}
              skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
              bindMode="attached"
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Top"
              geometry={nodes.Wolf3D_Outfit_Top.geometry}
              material={materials.Wolf3D_Outfit_Top}
              skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
              bindMode="attached"
            />
            <skinnedMesh
              name="Wolf3D_Hair"
              geometry={nodes.Wolf3D_Hair.geometry}
              material={materials.Wolf3D_Hair}
              skeleton={nodes.Wolf3D_Hair.skeleton}
              bindMode="attached"
            />
            <skinnedMesh
              name="EyeLeft"
              geometry={nodes.EyeLeft.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeLeft.skeleton}
              morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
              morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
              bindMode="attached"
            />
            <skinnedMesh
              name="EyeRight"
              geometry={nodes.EyeRight.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeRight.skeleton}
              morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
              morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
              bindMode="attached"
            />
            <skinnedMesh
              name="Wolf3D_Head"
              geometry={nodes.Wolf3D_Head.geometry}
              material={materials.Wolf3D_Skin}
              skeleton={nodes.Wolf3D_Head.skeleton}
              morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
              morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
              bindMode="attached"
            />
            <skinnedMesh
              name="Wolf3D_Teeth"
              geometry={nodes.Wolf3D_Teeth.geometry}
              material={materials.Wolf3D_Teeth}
              skeleton={nodes.Wolf3D_Teeth.skeleton}
              morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
              morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
              bindMode="attached"
            /> */}
          </group>
        </group>
      </group>
    </group>
  )
}

export default memo(Avatar, arePropsEqual);
useGLTF.preload('/models/character.glb')

