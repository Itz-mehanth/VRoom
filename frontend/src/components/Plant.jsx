import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

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

    return <primitive object={clone} {...props} />
}

useGLTF.preload('/models/plantpot.glb')
