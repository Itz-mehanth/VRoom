import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

const TubeLight = ({ position }) => (
    <group position={position}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
            <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={5} toneMapped={false} />
        </mesh>
    </group>
);

export function Plant(props) {
    const { scene } = useGLTF('/models/plantpot.glb')

    // Clone the scene for this instance
    const clone = useMemo(() => {
        const cloned = SkeletonUtils.clone(scene)
        cloned.scale.setScalar(1)

        // Enable shadows on all meshes
        cloned.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })

        return cloned
    }, [scene])

    return <>
        <primitive
            object={clone}
            {...props}
            onClick={(e) => {
                e.stopPropagation();
                props.onClick && props.onClick();
            }}
        />
    </>
}

useGLTF.preload('/models/plantpot.glb')
