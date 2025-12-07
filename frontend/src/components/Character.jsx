import React, { useRef, forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

// Adapted from Avatar.jsx but to be used as a controlled component
const Character = forwardRef((props, ref) => {
    const { nodes, materials } = useGLTF('/models/character.glb')
    return (
        <group ref={ref} {...props} dispose={null}>
            <group {...props} rotation={[-Math.PI / 2, 0, Math.PI]} dispose={null}>
                <primitive object={nodes.Hips} />
                <skinnedMesh
                    name="EyeLeft"
                    geometry={nodes.EyeLeft.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeLeft.skeleton}
                    morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    name="EyeRight"
                    geometry={nodes.EyeRight.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeRight.skeleton}
                    morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    name="Wolf3D_Head"
                    geometry={nodes.Wolf3D_Head.geometry}
                    material={materials.Wolf3D_Skin}
                    skeleton={nodes.Wolf3D_Head.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    name="Wolf3D_Teeth"
                    geometry={nodes.Wolf3D_Teeth.geometry}
                    material={materials.Wolf3D_Teeth}
                    skeleton={nodes.Wolf3D_Teeth.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Facewear.geometry}
                    material={materials.Wolf3D_Facewear}
                    skeleton={nodes.Wolf3D_Facewear.skeleton}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Headwear.geometry}
                    material={materials.Wolf3D_Headwear}
                    skeleton={nodes.Wolf3D_Headwear.skeleton}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Top.geometry}
                    material={materials.Wolf3D_Outfit_Top}
                    skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                    material={materials.Wolf3D_Outfit_Bottom}
                    skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                    material={materials.Wolf3D_Outfit_Footwear}
                    skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Body.geometry}
                    material={materials.Wolf3D_Body}
                    skeleton={nodes.Wolf3D_Body.skeleton}
                    castShadow
                    receiveShadow
                />
            </group>
        </group>
    )
})

useGLTF.preload('/models/character.glb')

export { Character }
