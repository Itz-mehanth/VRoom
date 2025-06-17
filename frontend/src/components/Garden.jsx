import React, { useRef, forwardRef } from 'react'
import { Billboard, Text, useGLTF } from '@react-three/drei'

const Garden = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models/environment.glb')

  return (
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree.geometry}
        material={materials.fence}
        position={[0, 0.269, 0]}
        scale={3.839}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves.geometry}
          material={materials.leaf}
          position={[-0.214, 1.926, 0]}
          rotation={[0, 0, 0.908]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves001.geometry}
          material={materials.leaf}
          position={[-0.226, 2.437, 0]}
          rotation={[0, 0, 0.17]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves002.geometry}
          material={materials.leaf}
          position={[0.024, 2.282, 0]}
          rotation={[0, 0, -0.393]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves003.geometry}
          material={materials.leaf}
          position={[0.024, 2.282, 0]}
          rotation={[0, 0, -1.383]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves004.geometry}
          material={materials.leaf}
          position={[-0.085, 1.783, -0.083]}
          rotation={[Math.PI, -1.485, -2.233]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves005.geometry}
          material={materials.leaf}
          position={[-0.105, 2.377, -0.607]}
          rotation={[Math.PI, -1.485, 1.759]}
          scale={0.507}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree001.geometry}
        material={materials.fence}
        position={[-16.539, 0.269, -30.561]}
        scale={2.821}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves006.geometry}
          material={materials.leaf}
          position={[-0.214, 1.926, 0]}
          rotation={[0, 0, 0.908]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves007.geometry}
          material={materials.leaf}
          position={[-0.226, 2.437, 0]}
          rotation={[0, 0, 0.17]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves008.geometry}
          material={materials.leaf}
          position={[0.024, 2.282, 0]}
          rotation={[0, 0, -0.393]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves009.geometry}
          material={materials.leaf}
          position={[0.024, 2.282, 0]}
          rotation={[0, 0, -1.383]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves010.geometry}
          material={materials.leaf}
          position={[-0.085, 1.783, -0.083]}
          rotation={[Math.PI, -1.485, -2.233]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves011.geometry}
          material={materials.leaf}
          position={[-0.105, 2.377, -0.607]}
          rotation={[Math.PI, -1.485, 1.759]}
          scale={0.507}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree002.geometry}
        material={materials.fence}
        position={[-31.865, 0.269, 9.316]}
        scale={2.821}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves012.geometry}
          material={materials.leaf}
          position={[-0.214, 1.926, 0]}
          rotation={[0, 0, 0.908]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves013.geometry}
          material={materials.leaf}
          position={[-0.226, 2.437, 0]}
          rotation={[0, 0, 0.17]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves014.geometry}
          material={materials.leaf}
          position={[0.024, 2.282, 0]}
          rotation={[0, 0, -0.393]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves015.geometry}
          material={materials.leaf}
          position={[0.024, 2.282, 0]}
          rotation={[0, 0, -1.383]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves016.geometry}
          material={materials.leaf}
          position={[-0.085, 1.783, -0.083]}
          rotation={[Math.PI, -1.485, -2.233]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves017.geometry}
          material={materials.leaf}
          position={[-0.105, 2.377, -0.607]}
          rotation={[Math.PI, -1.485, 1.759]}
          scale={0.507}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree003.geometry}
        material={materials.fence}
        position={[1.914, 0.269, 36.058]}
        scale={2.821}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves018.geometry}
          material={materials.leaf}
          position={[-0.214, 1.926, 0]}
          rotation={[0, 0, 0.908]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves019.geometry}
          material={materials.leaf}
          position={[-0.226, 2.437, 0]}
          rotation={[0, 0, 0.17]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves020.geometry}
          material={materials.leaf}
          position={[0.024, 2.282, 0]}
          rotation={[0, 0, -0.393]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves021.geometry}
          material={materials.leaf}
          position={[0.024, 2.282, 0]}
          rotation={[0, 0, -1.383]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves022.geometry}
          material={materials.leaf}
          position={[-0.085, 1.783, -0.083]}
          rotation={[Math.PI, -1.485, -2.233]}
          scale={0.507}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves023.geometry}
          material={materials.leaf}
          position={[-0.105, 2.377, -0.607]}
          rotation={[Math.PI, -1.485, 1.759]}
          scale={0.507}
        />
      </mesh>
      <group position={[0.302, 0.348, -0.035]} scale={38.064}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003_1.geometry}
          material={materials['brown soil']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003_2.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003_3.geometry}
          material={materials['Material.008']}
        />
      </group>
      <group position={[-33.006, 0.812, -7.992]} scale={0.722}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials['brown rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-34.453, 0.812, -6.759]} scale={0.722}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials['yellow rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-34.174, 0.812, 0.107]} scale={0.722}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={materials['pink rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-34.522, 0.812, -4.573]} scale={0.722}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004.geometry}
          material={materials['red rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-36.047, 0.812, -3.196]} scale={0.722}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003_2.geometry}
          material={materials['pink rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003_3.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-34.099, 0.812, -2.227]} scale={0.722}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_2.geometry}
          material={materials['yellow rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_3.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-34.675, 0.812, -8.923]} scale={0.722}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004_2.geometry}
          material={materials['red rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004_3.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-33.07, 0.812, -11.362]} scale={0.722}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_2.geometry}
          material={materials['brown rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_3.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-24.51, 0.391, 25.47]} scale={0.587}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials['pink rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-26.3, 0.391, 23.562]} scale={0.587}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={materials['yellow rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-19.694, 0.391, 27.654]} scale={0.587}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006.geometry}
          material={materials['brown rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder006_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-23.935, 0.391, 22.516]} scale={0.587}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder008.geometry}
          material={materials['red rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder008_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-22.373, 0.391, 25.191]} scale={0.587}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005_2.geometry}
          material={materials['yellow rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005_3.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-27.914, 0.391, 22.045]} scale={0.587}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_2.geometry}
          material={materials['pink rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_3.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-3.433, 0.34, -36.601]}
        rotation={[0, 0.039, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-1.692, 0.34, -36.753]}
        rotation={[0, 0.039, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-4.945, 0.34, -36.457]}
        rotation={[0, 0.103, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-6.478, 0.34, -36.292]}
        rotation={[0, 0.147, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-9.457, 0.34, -35.537]}
        rotation={[0, 0.21, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-8.018, 0.34, -35.838]}
        rotation={[0, 0.21, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-10.946, 0.34, -35.182]}
        rotation={[0, 0.274, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-12.359, 0.34, -34.566]}
        rotation={[0, 0.318, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-3.126, 0.34, -35.123]}
        rotation={[0, 0.039, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-1.651, 0.34, -35.22]}
        rotation={[0, 0.039, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-4.639, 0.34, -34.979]}
        rotation={[0, 0.103, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-6.245, 0.34, -34.671]}
        rotation={[0, 0.147, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-9.149, 0.34, -34.015]}
        rotation={[0, 0.21, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-7.712, 0.34, -34.361]}
        rotation={[0, 0.185, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-10.615, 0.34, -33.616]}
        rotation={[0, 0.274, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-12.182, 0.34, -32.972]}
        rotation={[0, 0.318, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-2.705, 0.34, -33.512]}
        rotation={[0, 0.134, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-1.23, 0.34, -33.608]}
        rotation={[0, 0.039, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-4.217, 0.34, -33.368]}
        rotation={[0, 0.14, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-5.724, 0.34, -33.092]}
        rotation={[0, 0.147, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-8.727, 0.34, -32.404]}
        rotation={[0, 0.21, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-7.256, 0.34, -32.768]}
        rotation={[0, 0.135, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-10.193, 0.34, -32.005]}
        rotation={[0, 0.274, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-11.765, 0.34, -31.472]}
        rotation={[0, 0.318, 0]}
        scale={[0.694, 0.528, 0.694]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.concrete}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-25.257, 0.485, -24.543]} scale={0.519}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002.geometry}
          material={materials['brown rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002_1.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-27.297, 0.485, -22.005]} scale={0.519}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002_2.geometry}
          material={materials['brown rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002_3.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-20.725, 0.485, -26.252]} scale={0.519}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002_4.geometry}
          material={materials['brown rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002_5.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group position={[-29.338, 0.485, -17.093]} scale={0.519}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002_6.geometry}
          material={materials['brown rough']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002_7.geometry}
          material={materials['brown soil']}
        />
      </group>
      <group
        position={[-26.716, 1.655, 10.463]}
        rotation={[Math.PI, -0.353, Math.PI]}
        scale={[2.966, 2.966, 4.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials['red rough']}
          position={[-0.224, -0.051, 0.001]}
          rotation={[0, 0, 0.12]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={nodes.Plane002.material}
          position={[0.124, -0.277, -0.864]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.341}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={nodes.Plane003.material}
          position={[0.124, -0.277, 0.736]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.341}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={materials['red rough']}
          position={[-0.003, -0.04, 0.001]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane005.geometry}
          material={materials['red rough']}
          position={[0.218, -0.04, 0.001]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials['red rough']}
          position={[0.484, 0.514, 0.001]}
          rotation={[Math.PI, 0, 1.981]}
          scale={[0.071, 0.893, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials['red rough']}
          position={[0.428, 0.363, 0.001]}
          rotation={[Math.PI, 0, 1.861]}
          scale={[0.071, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane008.geometry}
          material={materials['red rough']}
          position={[0.382, 0.21, 0.001]}
          rotation={[Math.PI, 0, 1.861]}
          scale={[0.071, 0.897, 0.897]}
        />
      </group>
      <group
        position={[-25.796, 1.655, -9.156]}
        rotation={[-Math.PI, 0.32, -Math.PI]}
        scale={[2.966, 2.966, 4.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['red rough']}
          position={[-0.224, -0.051, 0.001]}
          rotation={[0, 0, 0.12]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane010.geometry}
          material={nodes.Plane010.material}
          position={[0.124, -0.277, -0.864]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.341}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane011.geometry}
          material={nodes.Plane011.material}
          position={[0.124, -0.277, 0.736]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.341}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={materials['red rough']}
          position={[-0.003, -0.04, 0.001]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane013.geometry}
          material={materials['red rough']}
          position={[0.218, -0.04, 0.001]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane014.geometry}
          material={materials['red rough']}
          position={[0.484, 0.514, 0.001]}
          rotation={[Math.PI, 0, 1.981]}
          scale={[0.071, 0.893, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane015.geometry}
          material={materials['red rough']}
          position={[0.428, 0.363, 0.001]}
          rotation={[Math.PI, 0, 1.861]}
          scale={[0.071, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane016.geometry}
          material={materials['red rough']}
          position={[0.382, 0.21, 0.001]}
          rotation={[Math.PI, 0, 1.861]}
          scale={[0.071, 0.897, 0.897]}
        />
      </group>
      <group
        position={[-14.438, 1.655, -25.852]}
        rotation={[-Math.PI, 1.007, -Math.PI]}
        scale={[2.966, 2.966, 4.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane017.geometry}
          material={materials['red rough']}
          position={[-0.224, -0.051, 0.001]}
          rotation={[0, 0, 0.12]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane018.geometry}
          material={nodes.Plane018.material}
          position={[0.124, -0.277, -0.864]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.341}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane019.geometry}
          material={nodes.Plane019.material}
          position={[0.124, -0.277, 0.736]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.341}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane020.geometry}
          material={materials['red rough']}
          position={[-0.003, -0.04, 0.001]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane021.geometry}
          material={materials['red rough']}
          position={[0.218, -0.04, 0.001]}
          scale={[0.098, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane022.geometry}
          material={materials['red rough']}
          position={[0.484, 0.514, 0.001]}
          rotation={[Math.PI, 0, 1.981]}
          scale={[0.071, 0.893, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane023.geometry}
          material={materials['red rough']}
          position={[0.428, 0.363, 0.001]}
          rotation={[Math.PI, 0, 1.861]}
          scale={[0.071, 0.897, 0.897]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane024.geometry}
          material={materials['red rough']}
          position={[0.382, 0.21, 0.001]}
          rotation={[Math.PI, 0, 1.861]}
          scale={[0.071, 0.897, 0.897]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.fence}
        position={[0.302, 1.416, -0.035]}
        rotation={[Math.PI / 2, 0, -1.291]}
        scale={[3.229, 3.229, 1.09]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane026.geometry}
        material={nodes.Plane026.material}
        position={[0.302, 0.371, -0.035]}
        rotation={[0, 0.058, 0]}
        scale={[0.191, 0.177, 0.969]}
      />
    </group>
  )
})

Garden.displayName = 'Garden'

export default Garden

useGLTF.preload('/models/environment.glb')