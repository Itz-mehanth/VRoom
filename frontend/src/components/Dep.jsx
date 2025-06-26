import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Dep(props) {
  const { nodes, materials } = useGLTF('/CSEDep v1.glb')
  return (
    <group {...props} scale={4} position={[0,-1.4,0]} dispose={null}>
      <group position={[0.079, 0.345, 0]} scale={[1.089, 0.345, 1.089]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials.floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_3.geometry}
          material={materials.floor}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[-0.003, 0.003, -0.008]}
        scale={[3.293, 3.293, 9.328]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-0.466, 0.014, 0.856]}
        scale={[-0.164, -0.012, -0.038]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube082.geometry}
        material={nodes.Cube082.material}
        position={[0.241, -0.002, -5.316]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[-0.164, -0.016, -0.038]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor.geometry}
        material={materials.floor}
        position={[0.079, 0.345, 0]}
        scale={[1.089, 0.345, 1.089]}
      />
      <group position={[0.304, 0.071, -0.008]} scale={[1.4, 2.299, 6.515]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane010_1.geometry}
          material={materials.floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane010_2.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane010_3.geometry}
          material={materials['Light brown']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube091.geometry}
        material={nodes.Cube091.material}
        position={[1.064, 0.319, 0.08]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.278, 0.168, 0.301]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube111.geometry}
        material={materials['Material.006']}
        position={[1.064, 0.319, 0.08]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.278, 0.168, 0.301]}
      />
      <group position={[1.404, 0.218, -4.494]} scale={[0.301, 0.204, 0.301]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036.geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036_1.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036_2.geometry}
          material={materials.granite}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle025.geometry}
        material={materials['black metal']}
        position={[1.438, 0.237, -3.445]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle026.geometry}
        material={materials['black metal']}
        position={[1.434, 0.228, -3.445]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane108.geometry}
        material={materials['black metal']}
        position={[-0.602, 0.273, 0.193]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.003, 0.003, 0.006]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder164.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.273, 0.193]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0, -0.006, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle028.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.277, 0.195]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle029.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.277, 0.191]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle030.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.274, 0.195]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle031.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.274, 0.191]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle032.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.272, 0.195]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle033.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.272, 0.191]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle034.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.269, 0.195]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle035.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.269, 0.191]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane109.geometry}
        material={materials['black metal']}
        position={[-0.602, 0.335, 0.193]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.003, 0.003, 0.006]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder165.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.335, 0.193]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0, -0.006, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle036.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.339, 0.195]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle037.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.339, 0.191]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle038.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.337, 0.195]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle039.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.337, 0.191]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle040.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.334, 0.195]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle041.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.334, 0.191]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle042.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.332, 0.195]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle043.geometry}
        material={materials['black metal']}
        position={[-0.601, 0.332, 0.191]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0, 0.001, 0]}
      />
      <group
        position={[0.141, 0.214, 0.7]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane053.geometry}
        material={materials['Black light']}
        position={[0.273, 0.257, -5.706]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[0.14, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane055.geometry}
        material={materials['Light brown']}
        position={[0.148, 0.327, -5.702]}
        rotation={[Math.PI / 2, 0, -1.77]}
        scale={[0.14, 0.243, 0.189]}>
        <group
          position={[-0.788, 0.003, 0.602]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.031, 0.017, 0.005]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={materials['black metal']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials['Black light']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={materials['Light brown']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_3.geometry}
            material={materials.glass}
          />
        </group>
        <group
          position={[-0.63, 0.004, 0.6]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.031, 0.017, 0.005]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={materials['black metal']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials['Black light']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={materials['Light brown']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_3.geometry}
            material={materials.glass}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube088.geometry}
          material={materials['black metal']}
          position={[-0.63, 0.017, 0.6]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[0.015, 0.016, 0.006]}
        />
        <group
          position={[-0.676, -0.002, 0.699]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.023, 0.023, 0.005]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={materials['black metal']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials['Black light']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={materials['Light brown']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_3.geometry}
            material={materials.glass}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube090.geometry}
          material={materials['black metal']}
          position={[-0.676, 0.01, 0.699]}
          rotation={[Math.PI / 2, -1.57, 0]}
          scale={[0.015, 0.016, 0.006]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder082.geometry}
          material={materials['black metal']}
          position={[-0.779, 0, 0.438]}
          scale={[-0.021, -0.003, -0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder083.geometry}
          material={materials['black metal']}
          position={[-0.779, 0, 0.308]}
          scale={[-0.021, -0.003, -0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder087.geometry}
          material={materials['Light brown']}
          position={[-0.753, 0.013, 1.286]}
          scale={[0.033, 0.019, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder089.geometry}
          material={nodes.Cylinder089.material}
          position={[-0.678, 0.015, 0.6]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.006, 0.2, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder090.geometry}
          material={nodes.Cylinder090.material}
          position={[-0.705, 0.015, 0.6]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.006, 0.165, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder091.geometry}
          material={materials['black metal']}
          position={[-0.705, 0.015, 0.6]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.006, 0.165, 0.008]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane054.geometry}
          material={materials['black metal']}
          position={[-0.783, 0.013, 0.373]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.069, 0.107, 0.013]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane058.geometry}
          material={materials.glass}
          position={[-0.895, 0, 0.373]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane056.geometry}
        material={materials['Light brown']}
        position={[0.273, 0.257, -5.702]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[0.14, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane057.geometry}
        material={materials.glass}
        position={[0.273, 0.257, -5.702]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[0.14, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder084.geometry}
        material={materials['black metal']}
        position={[0.289, 0.244, -5.702]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder085.geometry}
        material={materials['black metal']}
        position={[0.289, 0.269, -5.702]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane059.geometry}
        material={materials['black metal']}
        position={[0.29, 0.257, -5.705]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.013, 0.015, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder086.geometry}
        material={materials['Light brown']}
        position={[0.292, 0.084, -5.705]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.005}
      />
      <group
        position={[0.286, 0.214, -5.703]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube084.geometry}
        material={materials['black metal']}
        position={[0.286, 0.214, -5.706]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube086.geometry}
        material={materials['black metal']}
        position={[0.174, 0.213, -5.594]}
        rotation={[Math.PI, -0.281, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube123.geometry}
        material={nodes.Cube123.material}
        position={[1.383, 0.261, -4.25]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.278, 0.184, 0.301]}
      />
      <group
        position={[-0.183, 0.746, -4.763]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[0.49, 0.746, -5.976]}
        rotation={[0, -1.57, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[-0.183, 0.746, -6.092]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[2.365, 0.753, -5.704]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[2.805, 0.746, -6.001]}
        rotation={[0, -1.57, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[2.832, 0.757, -4.701]}
        rotation={[0, -1.57, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group position={[2.845, 0.214, -4.8]} rotation={[0, -1.57, 0]} scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[2.336, 0.214, -2.499]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[2.337, 0.219, 0.408]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[2.337, 0.749, 0.552]}
        rotation={[0, -1.571, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[1.384, 0.749, 1.807]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[0.501, 0.749, 0.55]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane278.geometry}
        material={materials['Black light']}
        position={[0.321, 0.792, -0.565]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.14, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder475.geometry}
        material={materials['black metal']}
        position={[0.318, 0.78, -0.582]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder476.geometry}
        material={materials['black metal']}
        position={[0.318, 0.804, -0.582]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane279.geometry}
        material={materials['black metal']}
        position={[0.321, 0.792, -0.581]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.013, 0.015, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane280.geometry}
        material={materials['Light brown']}
        position={[0.318, 0.792, -0.565]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.14, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane281.geometry}
        material={materials.glass}
        position={[0.318, 0.792, -0.565]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.14, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane282.geometry}
        material={materials.glass}
        position={[0.318, 0.792, -0.565]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.14, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder477.geometry}
        material={materials['black metal']}
        position={[0.318, 0.78, -0.55]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder478.geometry}
        material={materials['black metal']}
        position={[0.318, 0.804, -0.55]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane283.geometry}
        material={materials['black metal']}
        position={[0.321, 0.792, -0.549]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.013, 0.015, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder479.geometry}
        material={materials['Light brown']}
        position={[0.321, 0.619, -0.547]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder480.geometry}
        material={materials['Light brown']}
        position={[0.321, 0.619, -0.585]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.005}
      />
      <group
        position={[0.319, 0.749, -0.553]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube362.geometry}
        material={materials['black metal']}
        position={[0.322, 0.749, -0.553]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <group
        position={[0.319, 0.749, -0.575]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube364.geometry}
        material={materials['black metal']}
        position={[0.322, 0.749, -0.575]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <group
        position={[0.319, 0.749, -0.602]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube366.geometry}
        material={materials['black metal']}
        position={[0.322, 0.749, -0.602]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder481.geometry}
        material={materials['black metal']}
        position={[0.321, 0.749, -0.578]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.001, 0.028, 0.001]}
      />
      <group
        position={[0.319, 0.728, -0.581]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube368.geometry}
        material={materials['black metal']}
        position={[0.322, 0.728, -0.581]}
        rotation={[0, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder482.geometry}
        material={nodes.Cylinder482.material}
        position={[0.321, 0.749, -0.578]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.001, 0.028, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder483.geometry}
        material={nodes.Cylinder483.material}
        position={[0.321, 0.749, -0.578]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.001, 0.023, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder484.geometry}
        material={materials['black metal']}
        position={[0.321, 0.749, -0.578]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.001, 0.023, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane284.geometry}
        material={materials['Light brown']}
        position={[0.318, 0.792, -0.564]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[0.14, 0.243, 0.189]}
      />
      <group
        position={[0.502, 0.752, -2.825]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[2.354, 0.753, -2.45]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube192.geometry}
        material={materials['black metal']}
        position={[2.307, 0.116, -2.067]}
        scale={[0.004, 0.004, 0.192]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube193.geometry}
        material={materials['black metal']}
        position={[2.306, 0.092, -2.276]}
        rotation={[0, 0, 0.786]}
        scale={[0.047, 0.047, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder186.geometry}
        material={materials['black metal']}
        position={[2.285, 0.072, -2.276]}
        scale={[-0.002, -0.001, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder187.geometry}
        material={materials['black metal']}
        position={[2.325, 0.072, -2.276]}
        scale={[-0.002, -0.001, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube194.geometry}
        material={materials['black metal']}
        position={[2.306, 0.092, -1.883]}
        rotation={[0, 0, 0.786]}
        scale={[0.047, 0.047, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder188.geometry}
        material={materials['black metal']}
        position={[2.285, 0.072, -1.883]}
        scale={[-0.002, -0.001, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder189.geometry}
        material={materials['black metal']}
        position={[2.325, 0.072, -1.883]}
        scale={[-0.002, -0.001, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube199.geometry}
        material={materials['black metal']}
        position={[0.689, 0.116, 0.675]}
        rotation={[0, -1.571, 0]}
        scale={[0.004, 0.004, 0.192]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube200.geometry}
        material={materials['black metal']}
        position={[0.897, 0.092, 0.674]}
        rotation={[-0.786, -Math.PI / 2, 0]}
        scale={[0.047, 0.047, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder190.geometry}
        material={materials['black metal']}
        position={[0.897, 0.072, 0.653]}
        rotation={[0, -1.571, 0]}
        scale={[-0.002, -0.001, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder191.geometry}
        material={materials['black metal']}
        position={[0.897, 0.072, 0.694]}
        rotation={[0, -1.571, 0]}
        scale={[-0.002, -0.001, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube201.geometry}
        material={materials['black metal']}
        position={[0.505, 0.092, 0.674]}
        rotation={[-0.786, -Math.PI / 2, 0]}
        scale={[0.047, 0.047, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder192.geometry}
        material={materials['black metal']}
        position={[0.505, 0.072, 0.653]}
        rotation={[0, -1.571, 0]}
        scale={[-0.002, -0.001, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder193.geometry}
        material={materials['black metal']}
        position={[0.505, 0.072, 0.694]}
        rotation={[0, -1.571, 0]}
        scale={[-0.002, -0.001, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane084.geometry}
        material={materials['Black light']}
        position={[-0.983, 0.259, 0.273]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder122.geometry}
        material={materials['black metal']}
        position={[-0.965, 0.247, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder123.geometry}
        material={materials['black metal']}
        position={[-0.965, 0.271, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane085.geometry}
        material={materials['black metal']}
        position={[-0.966, 0.259, 0.272]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[-0.983, 0.259, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane087.geometry}
        material={materials.glass}
        position={[-0.988, 0.259, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder124.geometry}
        material={materials['Light brown']}
        position={[-0.961, 0.086, 0.272]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube125.geometry}
        material={materials['black metal']}
        position={[-0.973, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube126.geometry}
        material={materials['black metal']}
        position={[-0.973, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube127.geometry}
        material={materials['black metal']}
        position={[-0.95, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube128.geometry}
        material={materials['black metal']}
        position={[-0.95, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube129.geometry}
        material={materials['black metal']}
        position={[-0.922, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube130.geometry}
        material={materials['black metal']}
        position={[-0.922, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder125.geometry}
        material={nodes.Cylinder125.material}
        position={[-0.948, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube131.geometry}
        material={materials['black metal']}
        position={[-0.944, 0.195, 0.27]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube132.geometry}
        material={materials['black metal']}
        position={[-0.944, 0.195, 0.273]}
        rotation={[-Math.PI, -1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder126.geometry}
        material={materials['black metal']}
        position={[-0.948, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder127.geometry}
        material={nodes.Cylinder127.material}
        position={[-0.947, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder128.geometry}
        material={materials['black metal']}
        position={[-0.947, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane100.geometry}
        material={materials['Black light']}
        position={[-1.501, 0.259, 0.273]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder150.geometry}
        material={materials['black metal']}
        position={[-1.483, 0.247, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder151.geometry}
        material={materials['black metal']}
        position={[-1.483, 0.271, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane101.geometry}
        material={materials['black metal']}
        position={[-1.484, 0.259, 0.272]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[-1.501, 0.259, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane103.geometry}
        material={materials.glass}
        position={[-1.506, 0.259, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder152.geometry}
        material={materials['Light brown']}
        position={[-1.479, 0.086, 0.272]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube157.geometry}
        material={materials['black metal']}
        position={[-1.491, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube158.geometry}
        material={materials['black metal']}
        position={[-1.491, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube159.geometry}
        material={materials['black metal']}
        position={[-1.468, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube160.geometry}
        material={materials['black metal']}
        position={[-1.468, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube161.geometry}
        material={materials['black metal']}
        position={[-1.44, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube162.geometry}
        material={materials['black metal']}
        position={[-1.44, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder153.geometry}
        material={nodes.Cylinder153.material}
        position={[-1.466, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube163.geometry}
        material={materials['black metal']}
        position={[-1.462, 0.195, 0.27]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube164.geometry}
        material={materials['black metal']}
        position={[-1.462, 0.195, 0.273]}
        rotation={[-Math.PI, -1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder154.geometry}
        material={materials['black metal']}
        position={[-1.466, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder155.geometry}
        material={nodes.Cylinder155.material}
        position={[-1.465, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder156.geometry}
        material={materials['black metal']}
        position={[-1.465, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane104.geometry}
        material={materials['Black light']}
        position={[-1.996, 0.259, 0.273]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder157.geometry}
        material={materials['black metal']}
        position={[-1.978, 0.247, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder158.geometry}
        material={materials['black metal']}
        position={[-1.978, 0.271, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane105.geometry}
        material={materials['black metal']}
        position={[-1.979, 0.259, 0.272]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[-1.996, 0.259, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane107.geometry}
        material={materials.glass}
        position={[-2.001, 0.259, 0.269]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder159.geometry}
        material={materials['Light brown']}
        position={[-1.974, 0.086, 0.272]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube165.geometry}
        material={materials['black metal']}
        position={[-1.986, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube166.geometry}
        material={materials['black metal']}
        position={[-1.986, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube167.geometry}
        material={materials['black metal']}
        position={[-1.963, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube168.geometry}
        material={materials['black metal']}
        position={[-1.963, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube169.geometry}
        material={materials['black metal']}
        position={[-1.935, 0.216, 0.27]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube170.geometry}
        material={materials['black metal']}
        position={[-1.935, 0.216, 0.273]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder160.geometry}
        material={nodes.Cylinder160.material}
        position={[-1.961, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube171.geometry}
        material={materials['black metal']}
        position={[-1.957, 0.195, 0.27]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube172.geometry}
        material={materials['black metal']}
        position={[-1.957, 0.195, 0.273]}
        rotation={[-Math.PI, -1.571, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder161.geometry}
        material={materials['black metal']}
        position={[-1.961, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder162.geometry}
        material={nodes.Cylinder162.material}
        position={[-1.96, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder163.geometry}
        material={materials['black metal']}
        position={[-1.96, 0.216, 0.273]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane088.geometry}
        material={materials['Black light']}
        position={[-0.839, 0.259, 0.504]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder129.geometry}
        material={materials['black metal']}
        position={[-0.857, 0.247, 0.507]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder130.geometry}
        material={materials['black metal']}
        position={[-0.857, 0.271, 0.507]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane089.geometry}
        material={materials['black metal']}
        position={[-0.857, 0.259, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[-0.839, 0.259, 0.507]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane091.geometry}
        material={materials.glass}
        position={[-0.834, 0.259, 0.507]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder131.geometry}
        material={materials['Light brown']}
        position={[-0.861, 0.086, 0.504]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube133.geometry}
        material={materials['black metal']}
        position={[-0.849, 0.216, 0.506]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube134.geometry}
        material={materials['black metal']}
        position={[-0.849, 0.216, 0.503]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube135.geometry}
        material={materials['black metal']}
        position={[-0.872, 0.216, 0.506]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube136.geometry}
        material={materials['black metal']}
        position={[-0.872, 0.216, 0.503]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube137.geometry}
        material={materials['black metal']}
        position={[-0.9, 0.216, 0.506]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube138.geometry}
        material={materials['black metal']}
        position={[-0.9, 0.216, 0.503]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder132.geometry}
        material={nodes.Cylinder132.material}
        position={[-0.875, 0.216, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube139.geometry}
        material={materials['black metal']}
        position={[-0.879, 0.195, 0.506]}
        rotation={[-Math.PI, 0, Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube140.geometry}
        material={materials['black metal']}
        position={[-0.879, 0.195, 0.503]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder133.geometry}
        material={materials['black metal']}
        position={[-0.875, 0.216, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder135.geometry}
        material={materials['black metal']}
        position={[-0.875, 0.216, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane092.geometry}
        material={materials['Black light']}
        position={[-1.362, 0.259, 0.504]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder136.geometry}
        material={materials['black metal']}
        position={[-1.38, 0.247, 0.507]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder137.geometry}
        material={materials['black metal']}
        position={[-1.38, 0.271, 0.507]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane093.geometry}
        material={materials['black metal']}
        position={[-1.38, 0.259, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[-1.362, 0.259, 0.507]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane095.geometry}
        material={materials.glass}
        position={[-1.357, 0.259, 0.507]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder138.geometry}
        material={materials['Light brown']}
        position={[-1.384, 0.086, 0.504]}
        rotation={[Math.PI / 2, 0, 3.141]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube141.geometry}
        material={materials['black metal']}
        position={[-1.372, 0.216, 0.506]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube142.geometry}
        material={materials['black metal']}
        position={[-1.372, 0.216, 0.503]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube143.geometry}
        material={materials['black metal']}
        position={[-1.395, 0.216, 0.506]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube144.geometry}
        material={materials['black metal']}
        position={[-1.395, 0.216, 0.503]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube145.geometry}
        material={materials['black metal']}
        position={[-1.423, 0.216, 0.506]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube146.geometry}
        material={materials['black metal']}
        position={[-1.423, 0.216, 0.503]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder139.geometry}
        material={nodes.Cylinder139.material}
        position={[-1.397, 0.216, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube147.geometry}
        material={materials['black metal']}
        position={[-1.401, 0.195, 0.506]}
        rotation={[-Math.PI, 0, Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube148.geometry}
        material={materials['black metal']}
        position={[-1.401, 0.195, 0.503]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder140.geometry}
        material={materials['black metal']}
        position={[-1.397, 0.216, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder141.geometry}
        material={nodes.Cylinder141.material}
        position={[-0.94, 0.216, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder142.geometry}
        material={materials['black metal']}
        position={[-1.398, 0.216, 0.504]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube173.geometry}
        material={materials['white shiny material']}
        position={[-0.617, 0.303, 0.158]}
        scale={[0.015, 0.05, 0.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube174.geometry}
        material={materials['white shiny material']}
        position={[-0.617, 0.303, 0.158]}
        scale={[0.015, 0.049, 0.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane110.geometry}
        material={materials['white shiny material']}
        position={[-0.624, 0.33, -0.056]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.087, 0.146, 0.146]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane111.geometry}
        material={materials['glass ']}
        position={[-0.624, 0.33, -0.056]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.087, 0.146, 0.146]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane112.geometry}
        material={materials['dark green']}
        position={[-0.624, 0.33, -0.056]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.087, 0.146, 0.146]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane113.geometry}
        material={materials['plain brown wood']}
        position={[-0.541, 0.469, -0.317]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.055, 0.112, 0.114]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane114.geometry}
        material={materials['plain brown wood']}
        position={[-0.42, 0.469, -0.317]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.062, 0.112, 0.114]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane115.geometry}
        material={materials['plain brown wood']}
        position={[-0.287, 0.469, -0.317]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.066, 0.112, 0.114]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane116.geometry}
        material={materials['plain brown wood']}
        position={[-0.161, 0.469, -0.317]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.054, 0.112, 0.114]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane117.geometry}
        material={materials['plain brown wood']}
        position={[0.019, 0.469, -0.317]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.047, 0.112, 0.114]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane118.geometry}
        material={materials['plain brown wood']}
        position={[0.116, 0.469, -0.317]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.047, 0.112, 0.114]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane119.geometry}
        material={materials['plain brown wood']}
        position={[0.212, 0.469, -0.315]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.047, 0.112, 0.114]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane120.geometry}
        material={materials['white shiny material']}
        position={[0.973, 0.364, 0.702]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.087, 0.146, 0.146]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane121.geometry}
        material={materials['glass ']}
        position={[0.973, 0.364, 0.702]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.087, 0.146, 0.146]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane122.geometry}
        material={materials['dark green']}
        position={[0.973, 0.364, 0.702]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.087, 0.146, 0.146]}
      />
      <group
        position={[-1.832, 0.259, 0.511]}
        rotation={[Math.PI / 2, 0, -3.126]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube149.geometry}
          material={materials['black metal']}
          position={[0.065, 0.004, 0.227]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.028, 0.017, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube150.geometry}
          material={materials['black metal']}
          position={[0.065, 0.017, 0.227]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[0.015, 0.016, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube151.geometry}
          material={materials['black metal']}
          position={[0.209, 0.004, 0.227]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.028, 0.017, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube152.geometry}
          material={materials['black metal']}
          position={[0.209, 0.017, 0.227]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[0.015, 0.016, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube153.geometry}
          material={materials['black metal']}
          position={[0.389, 0.005, 0.227]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.028, 0.017, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube154.geometry}
          material={materials['black metal']}
          position={[0.389, 0.017, 0.227]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[0.015, 0.016, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube155.geometry}
          material={materials['black metal']}
          position={[0.251, 0.004, 0.336]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.023, 0.021, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube156.geometry}
          material={materials['black metal']}
          position={[0.251, 0.017, 0.336]}
          rotation={[1.571, -Math.PI / 2, 0]}
          scale={[0.015, 0.016, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder143.geometry}
          material={materials['black metal']}
          position={[0.116, 0, 0.066]}
          scale={[-0.021, -0.003, -0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder144.geometry}
          material={materials['black metal']}
          position={[0.116, 0, -0.064]}
          scale={[-0.021, -0.003, -0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder145.geometry}
          material={materials['Light brown']}
          position={[0.142, 0.013, 0.913]}
          scale={[0.033, 0.019, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder146.geometry}
          material={nodes.Cylinder146.material}
          position={[0.226, 0.015, 0.228]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.006, 0.184, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder147.geometry}
          material={materials['black metal']}
          position={[0.226, 0.015, 0.228]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.006, 0.184, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder148.geometry}
          material={nodes.Cylinder148.material}
          position={[0.228, 0.015, 0.228]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.006, 0.152, 0.005]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder149.geometry}
          material={materials['black metal']}
          position={[0.228, 0.015, 0.228]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.006, 0.152, 0.008]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane096.geometry}
          material={materials['Black light']}
          position={[0, 0.015, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane097.geometry}
          material={materials['black metal']}
          position={[0.112, 0.013, 0]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.069, 0.107, 0.013]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane099.geometry}
          material={materials.glass}
          position={[-0.03, 0, 0]}
        />
      </group>
      <group
        position={[2.338, 0.257, -3.382]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane175.geometry}
        material={materials['Black light']}
        position={[2.334, 0.788, -3.186]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder210.geometry}
        material={materials['black metal']}
        position={[2.338, 0.776, -3.167]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder211.geometry}
        material={materials['black metal']}
        position={[2.338, 0.801, -3.167]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane178.geometry}
        material={materials['black metal']}
        position={[2.335, 0.788, -3.168]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[2.338, 0.788, -3.186]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane180.geometry}
        material={materials.glass}
        position={[2.338, 0.788, -3.19]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder212.geometry}
        material={materials['Light brown']}
        position={[2.335, 0.615, -3.163]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube217.geometry}
        material={materials['black metal']}
        position={[2.337, 0.745, -3.175]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube218.geometry}
        material={materials['black metal']}
        position={[2.333, 0.745, -3.175]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube219.geometry}
        material={materials['black metal']}
        position={[2.337, 0.745, -3.153]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube220.geometry}
        material={materials['black metal']}
        position={[2.333, 0.745, -3.153]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube221.geometry}
        material={materials['black metal']}
        position={[2.337, 0.745, -3.124]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube222.geometry}
        material={materials['black metal']}
        position={[2.333, 0.745, -3.124]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder213.geometry}
        material={nodes.Cylinder213.material}
        position={[2.334, 0.745, -3.15]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube223.geometry}
        material={materials['black metal']}
        position={[2.337, 0.725, -3.146]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube224.geometry}
        material={materials['black metal']}
        position={[2.333, 0.725, -3.146]}
        rotation={[-Math.PI, 0, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder214.geometry}
        material={materials['black metal']}
        position={[2.334, 0.745, -3.15]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder215.geometry}
        material={nodes.Cylinder215.material}
        position={[2.334, 0.745, -3.15]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder216.geometry}
        material={materials['black metal']}
        position={[2.334, 0.745, -3.15]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder349.geometry}
        material={materials['Light brown']}
        position={[2.335, 0.763, -3.163]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane285.geometry}
        material={materials['Black light']}
        position={[0.363, 0.792, -4.579]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder496.geometry}
        material={materials['black metal']}
        position={[0.344, 0.78, -4.575]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder498.geometry}
        material={materials['black metal']}
        position={[0.344, 0.805, -4.575]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane286.geometry}
        material={materials['black metal']}
        position={[0.345, 0.792, -4.578]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[0.363, 0.792, -4.575]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane288.geometry}
        material={materials.glass}
        position={[0.368, 0.792, -4.575]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder500.geometry}
        material={materials['Light brown']}
        position={[0.34, 0.62, -4.579]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube369.geometry}
        material={materials['black metal']}
        position={[0.352, 0.749, -4.576]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube370.geometry}
        material={materials['black metal']}
        position={[0.352, 0.749, -4.58]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube371.geometry}
        material={materials['black metal']}
        position={[0.33, 0.749, -4.576]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube372.geometry}
        material={materials['black metal']}
        position={[0.33, 0.749, -4.58]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube373.geometry}
        material={materials['black metal']}
        position={[0.302, 0.749, -4.576]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube374.geometry}
        material={materials['black metal']}
        position={[0.302, 0.749, -4.58]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder502.geometry}
        material={nodes.Cylinder502.material}
        position={[0.327, 0.749, -4.579]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube375.geometry}
        material={materials['black metal']}
        position={[0.323, 0.729, -4.576]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube376.geometry}
        material={materials['black metal']}
        position={[0.323, 0.729, -4.58]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder503.geometry}
        material={materials['black metal']}
        position={[0.327, 0.749, -4.579]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder504.geometry}
        material={nodes.Cylinder504.material}
        position={[0.327, 0.749, -4.579]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder505.geometry}
        material={materials['black metal']}
        position={[0.327, 0.749, -4.579]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder506.geometry}
        material={materials['Light brown']}
        position={[0.34, 0.767, -4.579]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane293.geometry}
        material={materials['Black light']}
        position={[2.572, 0.799, -4.333]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder515.geometry}
        material={materials['black metal']}
        position={[2.554, 0.786, -4.33]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder516.geometry}
        material={materials['black metal']}
        position={[2.554, 0.811, -4.33]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane294.geometry}
        material={materials['black metal']}
        position={[2.554, 0.799, -4.333]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane295.geometry}
        material={materials['Light brown']}
        position={[2.572, 0.799, -4.33]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder517.geometry}
        material={materials['Light brown']}
        position={[2.55, 0.626, -4.333]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube385.geometry}
        material={materials['black metal']}
        position={[2.562, 0.756, -4.331]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube386.geometry}
        material={materials['black metal']}
        position={[2.562, 0.756, -4.334]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube387.geometry}
        material={materials['black metal']}
        position={[2.539, 0.756, -4.331]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube388.geometry}
        material={materials['black metal']}
        position={[2.539, 0.756, -4.334]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube389.geometry}
        material={materials['black metal']}
        position={[2.511, 0.756, -4.331]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube390.geometry}
        material={materials['black metal']}
        position={[2.511, 0.756, -4.334]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder518.geometry}
        material={nodes.Cylinder518.material}
        position={[2.536, 0.756, -4.333]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube391.geometry}
        material={materials['black metal']}
        position={[2.532, 0.735, -4.331]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube392.geometry}
        material={materials['black metal']}
        position={[2.532, 0.735, -4.334]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder519.geometry}
        material={materials['black metal']}
        position={[2.536, 0.756, -4.333]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder520.geometry}
        material={nodes.Cylinder520.material}
        position={[2.536, 0.756, -4.333]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder521.geometry}
        material={materials['black metal']}
        position={[2.536, 0.756, -4.333]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane289.geometry}
        material={materials['Black light']}
        position={[2.714, 0.799, -4.499]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder507.geometry}
        material={materials['black metal']}
        position={[2.717, 0.786, -4.481]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder508.geometry}
        material={materials['black metal']}
        position={[2.717, 0.811, -4.481]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane290.geometry}
        material={materials['black metal']}
        position={[2.714, 0.799, -4.481]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.013, 0.017, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane291.geometry}
        material={materials['Light brown']}
        position={[2.717, 0.799, -4.499]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder509.geometry}
        material={materials['Light brown']}
        position={[2.714, 0.626, -4.477]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube377.geometry}
        material={materials['black metal']}
        position={[2.716, 0.756, -4.489]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube378.geometry}
        material={materials['black metal']}
        position={[2.713, 0.756, -4.489]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube379.geometry}
        material={materials['black metal']}
        position={[2.716, 0.756, -4.466]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube380.geometry}
        material={materials['black metal']}
        position={[2.713, 0.756, -4.466]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube381.geometry}
        material={materials['black metal']}
        position={[2.716, 0.756, -4.438]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube382.geometry}
        material={materials['black metal']}
        position={[2.713, 0.756, -4.438]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder510.geometry}
        material={nodes.Cylinder510.material}
        position={[2.714, 0.756, -4.463]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube383.geometry}
        material={materials['black metal']}
        position={[2.716, 0.735, -4.459]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube384.geometry}
        material={materials['black metal']}
        position={[2.713, 0.735, -4.459]}
        rotation={[-Math.PI, 0, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder511.geometry}
        material={materials['black metal']}
        position={[2.714, 0.756, -4.463]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder512.geometry}
        material={nodes.Cylinder512.material}
        position={[2.714, 0.756, -4.463]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder513.geometry}
        material={materials['black metal']}
        position={[2.714, 0.756, -4.463]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane038.geometry}
        material={materials['Black light']}
        position={[2.334, 0.257, -1.418]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder058.geometry}
        material={materials['black metal']}
        position={[2.34, 0.244, -1.399]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder059.geometry}
        material={materials['black metal']}
        position={[2.337, 0.269, -1.399]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane039.geometry}
        material={materials['black metal']}
        position={[2.334, 0.257, -1.4]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[2.337, 0.257, -1.418]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane041.geometry}
        material={materials.glass}
        position={[2.337, 0.257, -1.422]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder060.geometry}
        material={materials['Light brown']}
        position={[2.337, 0.084, -1.395]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube058.geometry}
        material={materials['black metal']}
        position={[2.339, 0.214, -1.407]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube059.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.407]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube060.geometry}
        material={materials['black metal']}
        position={[2.339, 0.214, -1.385]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube061.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.385]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube062.geometry}
        material={materials['black metal']}
        position={[2.339, 0.214, -1.357]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube063.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.357]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder061.geometry}
        material={nodes.Cylinder061.material}
        position={[2.336, 0.214, -1.382]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube064.geometry}
        material={materials['black metal']}
        position={[2.339, 0.193, -1.378]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube065.geometry}
        material={materials['black metal']}
        position={[2.336, 0.193, -1.378]}
        rotation={[-Math.PI, 0, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder062.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.382]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder063.geometry}
        material={nodes.Cylinder063.material}
        position={[2.336, 0.214, -1.382]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder064.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.382]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane181.geometry}
        material={materials['Black light']}
        position={[2.334, 0.257, -1.644]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder217.geometry}
        material={materials['black metal']}
        position={[2.34, 0.244, -1.626]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder218.geometry}
        material={materials['black metal']}
        position={[2.337, 0.269, -1.626]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane182.geometry}
        material={materials['black metal']}
        position={[2.334, 0.257, -1.627]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[2.337, 0.257, -1.644]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane184.geometry}
        material={materials.glass}
        position={[2.337, 0.257, -1.649]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder219.geometry}
        material={materials['Light brown']}
        position={[2.337, 0.084, -1.622]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube226.geometry}
        material={materials['black metal']}
        position={[2.339, 0.214, -1.634]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube227.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.634]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube228.geometry}
        material={materials['black metal']}
        position={[2.339, 0.214, -1.612]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube229.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.612]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube230.geometry}
        material={materials['black metal']}
        position={[2.339, 0.214, -1.583]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube231.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.583]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder220.geometry}
        material={nodes.Cylinder220.material}
        position={[2.336, 0.214, -1.609]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube232.geometry}
        material={materials['black metal']}
        position={[2.339, 0.193, -1.605]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube233.geometry}
        material={materials['black metal']}
        position={[2.336, 0.193, -1.605]}
        rotation={[-Math.PI, 0, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder221.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.609]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder222.geometry}
        material={nodes.Cylinder222.material}
        position={[2.336, 0.214, -1.609]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder223.geometry}
        material={materials['black metal']}
        position={[2.336, 0.214, -1.609]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane034.geometry}
        material={materials['Black light']}
        position={[2.334, 0.257, -0.84]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder051.geometry}
        material={materials['black metal']}
        position={[2.338, 0.244, -0.821]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder052.geometry}
        material={materials['black metal']}
        position={[2.338, 0.269, -0.821]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane035.geometry}
        material={materials['black metal']}
        position={[2.335, 0.257, -0.822]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[2.338, 0.257, -0.84]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane037.geometry}
        material={materials.glass}
        position={[2.338, 0.257, -0.844]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder053.geometry}
        material={materials['Light brown']}
        position={[2.335, 0.084, -0.817]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube050.geometry}
        material={materials['black metal']}
        position={[2.337, 0.214, -0.829]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube051.geometry}
        material={materials['black metal']}
        position={[2.334, 0.214, -0.829]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube052.geometry}
        material={materials['black metal']}
        position={[2.337, 0.214, -0.807]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube053.geometry}
        material={materials['black metal']}
        position={[2.334, 0.214, -0.807]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube054.geometry}
        material={materials['black metal']}
        position={[2.337, 0.214, -0.779]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube055.geometry}
        material={materials['black metal']}
        position={[2.334, 0.214, -0.779]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder054.geometry}
        material={nodes.Cylinder054.material}
        position={[2.334, 0.214, -0.804]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube056.geometry}
        material={materials['black metal']}
        position={[2.337, 0.193, -0.8]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube057.geometry}
        material={materials['black metal']}
        position={[2.334, 0.193, -0.8]}
        rotation={[-Math.PI, 0, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder055.geometry}
        material={materials['black metal']}
        position={[2.334, 0.214, -0.804]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder056.geometry}
        material={nodes.Cylinder056.material}
        position={[2.334, 0.214, -0.804]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder057.geometry}
        material={materials['black metal']}
        position={[2.334, 0.214, -0.804]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane227.geometry}
        material={materials['Black light']}
        position={[2.566, 0.792, -0.618]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder400.geometry}
        material={materials['black metal']}
        position={[2.548, 0.78, -0.615]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder401.geometry}
        material={materials['black metal']}
        position={[2.548, 0.804, -0.615]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane228.geometry}
        material={materials['black metal']}
        position={[2.549, 0.792, -0.618]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[2.566, 0.792, -0.615]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane230.geometry}
        material={materials.glass}
        position={[2.571, 0.792, -0.615]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder402.geometry}
        material={materials['Light brown']}
        position={[2.544, 0.619, -0.618]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube289.geometry}
        material={materials['black metal']}
        position={[2.556, 0.749, -0.616]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube290.geometry}
        material={materials['black metal']}
        position={[2.556, 0.749, -0.619]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube291.geometry}
        material={materials['black metal']}
        position={[2.533, 0.749, -0.616]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube292.geometry}
        material={materials['black metal']}
        position={[2.533, 0.749, -0.619]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube293.geometry}
        material={materials['black metal']}
        position={[2.505, 0.749, -0.616]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube294.geometry}
        material={materials['black metal']}
        position={[2.505, 0.749, -0.619]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder403.geometry}
        material={nodes.Cylinder403.material}
        position={[2.531, 0.749, -0.618]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube295.geometry}
        material={materials['black metal']}
        position={[2.527, 0.729, -0.616]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube296.geometry}
        material={materials['black metal']}
        position={[2.527, 0.729, -0.619]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder404.geometry}
        material={materials['black metal']}
        position={[2.531, 0.749, -0.618]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder405.geometry}
        material={nodes.Cylinder405.material}
        position={[2.53, 0.749, -0.618]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder406.geometry}
        material={materials['black metal']}
        position={[2.53, 0.749, -0.618]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane274.geometry}
        material={materials['Black light']}
        position={[2.892, 0.788, -0.855]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder468.geometry}
        material={materials['black metal']}
        position={[2.895, 0.776, -0.837]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder469.geometry}
        material={materials['black metal']}
        position={[2.895, 0.8, -0.837]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane275.geometry}
        material={materials['black metal']}
        position={[2.892, 0.788, -0.838]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[2.895, 0.788, -0.855]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane277.geometry}
        material={materials.glass}
        position={[2.895, 0.788, -0.86]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder470.geometry}
        material={materials['Light brown']}
        position={[2.892, 0.615, -0.833]}
        rotation={[Math.PI / 2, 0, 1.571]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube353.geometry}
        material={materials['black metal']}
        position={[2.894, 0.745, -0.845]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube354.geometry}
        material={materials['black metal']}
        position={[2.891, 0.745, -0.845]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube355.geometry}
        material={materials['black metal']}
        position={[2.894, 0.745, -0.823]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube356.geometry}
        material={materials['black metal']}
        position={[2.891, 0.745, -0.823]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube357.geometry}
        material={materials['black metal']}
        position={[2.894, 0.745, -0.794]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube358.geometry}
        material={materials['black metal']}
        position={[2.891, 0.745, -0.794]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder471.geometry}
        material={nodes.Cylinder471.material}
        position={[2.892, 0.745, -0.82]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube359.geometry}
        material={materials['black metal']}
        position={[2.894, 0.724, -0.816]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube360.geometry}
        material={materials['black metal']}
        position={[2.891, 0.724, -0.816]}
        rotation={[-Math.PI, 0, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder472.geometry}
        material={materials['black metal']}
        position={[2.892, 0.745, -0.82]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder473.geometry}
        material={nodes.Cylinder473.material}
        position={[2.892, 0.745, -0.819]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder474.geometry}
        material={materials['black metal']}
        position={[2.892, 0.745, -0.819]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane242.geometry}
        material={materials['Black light']}
        position={[2.339, 0.792, -1.627]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder424.geometry}
        material={materials['black metal']}
        position={[2.342, 0.78, -1.609]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder425.geometry}
        material={materials['black metal']}
        position={[2.342, 0.804, -1.609]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane243.geometry}
        material={materials['black metal']}
        position={[2.339, 0.792, -1.609]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[2.342, 0.792, -1.627]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane245.geometry}
        material={materials.glass}
        position={[2.342, 0.792, -1.632]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder426.geometry}
        material={materials['Light brown']}
        position={[2.339, 0.619, -1.604]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube313.geometry}
        material={materials['black metal']}
        position={[2.341, 0.749, -1.617]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube314.geometry}
        material={materials['black metal']}
        position={[2.338, 0.749, -1.617]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube315.geometry}
        material={materials['black metal']}
        position={[2.341, 0.749, -1.594]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube316.geometry}
        material={materials['black metal']}
        position={[2.338, 0.749, -1.594]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube317.geometry}
        material={materials['black metal']}
        position={[2.341, 0.749, -1.566]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube318.geometry}
        material={materials['black metal']}
        position={[2.338, 0.749, -1.566]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder427.geometry}
        material={nodes.Cylinder427.material}
        position={[2.339, 0.749, -1.591]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube319.geometry}
        material={materials['black metal']}
        position={[2.341, 0.729, -1.587]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube320.geometry}
        material={materials['black metal']}
        position={[2.338, 0.729, -1.587]}
        rotation={[-Math.PI, 0, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder428.geometry}
        material={materials['black metal']}
        position={[2.339, 0.749, -1.591]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder429.geometry}
        material={nodes.Cylinder429.material}
        position={[2.339, 0.749, -1.591]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder430.geometry}
        material={materials['black metal']}
        position={[2.339, 0.749, -1.591]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane231.geometry}
        material={materials['Black light']}
        position={[2.321, 0.792, 0.706]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder407.geometry}
        material={materials['black metal']}
        position={[2.303, 0.78, 0.709]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder408.geometry}
        material={materials['black metal']}
        position={[2.303, 0.804, 0.709]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane232.geometry}
        material={materials['black metal']}
        position={[2.303, 0.792, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[2.321, 0.792, 0.709]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane234.geometry}
        material={materials.glass}
        position={[2.326, 0.792, 0.709]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder409.geometry}
        material={materials['Light brown']}
        position={[2.299, 0.619, 0.706]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube297.geometry}
        material={materials['black metal']}
        position={[2.311, 0.749, 0.708]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube298.geometry}
        material={materials['black metal']}
        position={[2.311, 0.749, 0.705]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube299.geometry}
        material={materials['black metal']}
        position={[2.288, 0.749, 0.708]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube300.geometry}
        material={materials['black metal']}
        position={[2.288, 0.749, 0.705]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube301.geometry}
        material={materials['black metal']}
        position={[2.26, 0.749, 0.708]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube302.geometry}
        material={materials['black metal']}
        position={[2.26, 0.749, 0.705]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder410.geometry}
        material={nodes.Cylinder410.material}
        position={[2.286, 0.749, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube303.geometry}
        material={materials['black metal']}
        position={[2.282, 0.729, 0.708]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube304.geometry}
        material={materials['black metal']}
        position={[2.282, 0.729, 0.705]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder411.geometry}
        material={materials['black metal']}
        position={[2.286, 0.749, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder412.geometry}
        material={nodes.Cylinder412.material}
        position={[2.285, 0.749, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder413.geometry}
        material={materials['black metal']}
        position={[2.285, 0.749, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane270.geometry}
        material={materials['Black light']}
        position={[0.688, 0.792, 0.706]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder461.geometry}
        material={materials['black metal']}
        position={[0.669, 0.78, 0.709]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder462.geometry}
        material={materials['black metal']}
        position={[0.669, 0.804, 0.709]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[-0.003, -0.001, -0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane271.geometry}
        material={materials['black metal']}
        position={[0.67, 0.792, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.013, 0.017, 0.003]}
      />
      <group
        position={[0.688, 0.792, 0.709]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane273.geometry}
        material={materials.glass}
        position={[0.692, 0.792, 0.709]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={[0.157, 0.243, 0.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder463.geometry}
        material={materials['Light brown']}
        position={[0.665, 0.619, 0.706]}
        rotation={[Math.PI / 2, 0, 3.142]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube110.geometry}
        material={materials['black metal']}
        position={[0.677, 0.749, 0.708]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube346.geometry}
        material={materials['black metal']}
        position={[0.677, 0.749, 0.705]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube347.geometry}
        material={materials['black metal']}
        position={[0.655, 0.749, 0.708]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube348.geometry}
        material={materials['black metal']}
        position={[0.655, 0.749, 0.705]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube349.geometry}
        material={materials['black metal']}
        position={[0.626, 0.749, 0.708]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube350.geometry}
        material={materials['black metal']}
        position={[0.626, 0.749, 0.705]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder464.geometry}
        material={nodes.Cylinder464.material}
        position={[0.652, 0.749, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube351.geometry}
        material={materials['black metal']}
        position={[0.648, 0.729, 0.708]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube352.geometry}
        material={materials['black metal']}
        position={[0.648, 0.729, 0.705]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder465.geometry}
        material={materials['black metal']}
        position={[0.652, 0.749, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.029, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder466.geometry}
        material={nodes.Cylinder466.material}
        position={[0.652, 0.749, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder467.geometry}
        material={materials['black metal']}
        position={[0.652, 0.749, 0.706]}
        rotation={[Math.PI, 0, Math.PI / 2]}
        scale={[0.001, 0.024, 0.002]}
      />
      <group
        position={[0.513, 0.257, -1.14]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <group position={[2.332, 0.378, 0.59]} rotation={[0, -0.619, 1.19]} scale={0.017}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BézierCurve.geometry}
          material={materials['black rubber']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BézierCurve_1.geometry}
          material={materials['red metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BézierCurve_2.geometry}
          material={materials['white metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BézierCurve_3.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BézierCurve_4.geometry}
          material={materials['Material.007']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane127.geometry}
        material={materials['black metal']}
        position={[2.328, 0.162, -1.92]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve003.geometry}
        material={materials['black metal']}
        position={[2.33, 0.171, -1.921]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane128.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -1.956]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane129.geometry}
        material={materials['black metal']}
        position={[2.314, 0.142, -1.886]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.016]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane130.geometry}
        material={materials['black metal']}
        position={[2.294, 0.133, -1.921]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube191.geometry}
        material={materials['black metal']}
        position={[2.306, 0.126, -1.922]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane147.geometry}
        material={materials['black metal']}
        position={[0.542, 0.162, 0.696]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve008.geometry}
        material={materials['black metal']}
        position={[0.542, 0.171, 0.698]}
        rotation={[0, -1.571, 0]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane148.geometry}
        material={materials['black metal']}
        position={[0.578, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane149.geometry}
        material={materials['black metal']}
        position={[0.508, 0.142, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.016]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane150.geometry}
        material={materials['black metal']}
        position={[0.543, 0.133, 0.662]}
        rotation={[0, -1.571, 0]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube202.geometry}
        material={materials['black metal']}
        position={[0.544, 0.126, 0.674]}
        rotation={[0, -1.571, 0]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane131.geometry}
        material={materials['black metal']}
        position={[2.328, 0.162, -2.008]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve004.geometry}
        material={materials['black metal']}
        position={[2.33, 0.171, -2.008]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane132.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -2.044]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane133.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -1.972]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane134.geometry}
        material={materials['black metal']}
        position={[2.294, 0.133, -2.009]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube195.geometry}
        material={materials['black metal']}
        position={[2.306, 0.126, -2.01]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane151.geometry}
        material={materials['black metal']}
        position={[0.629, 0.162, 0.696]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve009.geometry}
        material={materials['black metal']}
        position={[0.63, 0.171, 0.698]}
        rotation={[0, -1.571, 0]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane152.geometry}
        material={materials['black metal']}
        position={[0.665, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane153.geometry}
        material={materials['black metal']}
        position={[0.594, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane154.geometry}
        material={materials['black metal']}
        position={[0.631, 0.133, 0.662]}
        rotation={[0, -1.571, 0]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube203.geometry}
        material={materials['black metal']}
        position={[0.632, 0.126, 0.674]}
        rotation={[0, -1.571, 0]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane135.geometry}
        material={materials['black metal']}
        position={[2.328, 0.162, -2.093]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve005.geometry}
        material={materials['black metal']}
        position={[2.33, 0.171, -2.093]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane136.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -2.129]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane137.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -2.058]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane138.geometry}
        material={materials['black metal']}
        position={[2.294, 0.133, -2.094]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube196.geometry}
        material={materials['black metal']}
        position={[2.306, 0.126, -2.095]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane155.geometry}
        material={materials['black metal']}
        position={[0.714, 0.162, 0.696]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve010.geometry}
        material={materials['black metal']}
        position={[0.715, 0.171, 0.698]}
        rotation={[0, -1.571, 0]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane156.geometry}
        material={materials['black metal']}
        position={[0.75, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane157.geometry}
        material={materials['black metal']}
        position={[0.679, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane158.geometry}
        material={materials['black metal']}
        position={[0.716, 0.133, 0.662]}
        rotation={[0, -1.571, 0]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube204.geometry}
        material={materials['black metal']}
        position={[0.717, 0.126, 0.674]}
        rotation={[0, -1.571, 0]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane139.geometry}
        material={materials['black metal']}
        position={[2.328, 0.162, -2.175]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve006.geometry}
        material={materials['black metal']}
        position={[2.33, 0.171, -2.176]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane140.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -2.211]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane141.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -2.14]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane142.geometry}
        material={materials['black metal']}
        position={[2.294, 0.133, -2.177]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube197.geometry}
        material={materials['black metal']}
        position={[2.306, 0.126, -2.177]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane159.geometry}
        material={materials['black metal']}
        position={[0.797, 0.162, 0.696]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve011.geometry}
        material={materials['black metal']}
        position={[0.797, 0.171, 0.698]}
        rotation={[0, -1.571, 0]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane160.geometry}
        material={materials['black metal']}
        position={[0.833, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane161.geometry}
        material={materials['black metal']}
        position={[0.761, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane162.geometry}
        material={materials['black metal']}
        position={[0.798, 0.133, 0.662]}
        rotation={[0, -1.571, 0]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube205.geometry}
        material={materials['black metal']}
        position={[0.799, 0.126, 0.674]}
        rotation={[0, -1.571, 0]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane143.geometry}
        material={materials['black metal']}
        position={[2.328, 0.162, -2.258]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve007.geometry}
        material={materials['black metal']}
        position={[2.33, 0.171, -2.258]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane144.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -2.294]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane145.geometry}
        material={materials['black metal']}
        position={[2.314, 0.155, -2.223]}
        rotation={[0, 0, 0.141]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane146.geometry}
        material={materials['black metal']}
        position={[2.294, 0.133, -2.259]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube198.geometry}
        material={materials['black metal']}
        position={[2.306, 0.126, -2.26]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane163.geometry}
        material={materials['black metal']}
        position={[0.88, 0.162, 0.696]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={[0.035, 0.043, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BézierCurve012.geometry}
        material={materials['black metal']}
        position={[0.88, 0.171, 0.698]}
        rotation={[0, -1.571, 0]}
        scale={[0.227, 0.227, 0.194]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane164.geometry}
        material={materials['black metal']}
        position={[0.915, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane165.geometry}
        material={materials['black metal']}
        position={[0.844, 0.155, 0.682]}
        rotation={[-0.141, -1.571, 0]}
        scale={[0.013, 0.016, 0.014]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane166.geometry}
        material={materials['black metal']}
        position={[0.881, 0.133, 0.662]}
        rotation={[0, -1.571, 0]}
        scale={[0.031, 0.031, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube206.geometry}
        material={materials['black metal']}
        position={[0.882, 0.126, 0.674]}
        rotation={[0, -1.571, 0]}
        scale={[0.001, 0.006, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube101.geometry}
        material={nodes.Cube101.material}
        position={[1.042, 0.325, -5.032]}
        scale={[0.278, 0.168, 0.301]}
      />
      <group position={[1.384, 0.218, -0.693]} scale={[0.301, 0.204, 0.301]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_1.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_2.geometry}
          material={materials.granite}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube124.geometry}
        material={materials['Material.006']}
        position={[1.042, 0.325, -5.032]}
        scale={[0.278, 0.168, 0.301]}
      />
      <group position={[1.384, 0.268, -0.693]} scale={[0.301, 0.204, 0.301]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009_1.geometry}
          material={materials['Light brown']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath.geometry}
        material={materials['white steel']}
        position={[1.651, 0.317, -0.593]}
        rotation={[0.604, Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath001.geometry}
        material={materials['white steel']}
        position={[1.432, 0.318, -0.593]}
        rotation={[0.597, -1.571, 0]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder267.geometry}
        material={materials['white steel']}
        position={[1.323, 0.472, -0.674]}
        rotation={[2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder235.geometry}
        material={materials['black steel']}
        position={[1.655, 0.132, -0.403]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder236.geometry}
        material={materials['black steel']}
        position={[1.655, 0.161, -0.448]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder237.geometry}
        material={materials['black steel']}
        position={[1.655, 0.226, -0.548]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder238.geometry}
        material={materials['black steel']}
        position={[1.655, 0.256, -0.594]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder239.geometry}
        material={materials['black steel']}
        position={[1.655, 0.316, -0.681]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder240.geometry}
        material={materials['black steel']}
        position={[1.655, 0.345, -0.727]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder241.geometry}
        material={materials['black steel']}
        position={[1.655, 0.401, -0.855]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder242.geometry}
        material={materials['black steel']}
        position={[1.655, 0.4, -0.9]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder243.geometry}
        material={materials['black steel']}
        position={[1.552, 0.401, -0.995]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder244.geometry}
        material={materials['black steel']}
        position={[1.507, 0.4, -0.995]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder245.geometry}
        material={materials['black steel']}
        position={[1.381, 0.401, -0.995]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder246.geometry}
        material={materials['black steel']}
        position={[1.336, 0.4, -0.995]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder247.geometry}
        material={materials['black steel']}
        position={[1.196, 0.401, -0.995]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder248.geometry}
        material={materials['black steel']}
        position={[1.151, 0.4, -0.995]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder249.geometry}
        material={materials['black steel']}
        position={[1.086, 0.441, -0.783]}
        rotation={[3.141, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder250.geometry}
        material={materials['black steel']}
        position={[1.086, 0.47, -0.738]}
        rotation={[3.141, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder251.geometry}
        material={materials['black steel']}
        position={[1.086, 0.527, -0.638]}
        rotation={[3.141, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder252.geometry}
        material={materials['black steel']}
        position={[1.086, 0.556, -0.592]}
        rotation={[3.141, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder253.geometry}
        material={materials['black steel']}
        position={[1.086, 0.602, -0.505]}
        rotation={[3.141, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder254.geometry}
        material={materials['black steel']}
        position={[1.086, 0.623, -0.459]}
        rotation={[3.141, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder255.geometry}
        material={materials['black steel']}
        position={[1.086, 0.673, -0.36]}
        rotation={[3.141, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder256.geometry}
        material={materials['black steel']}
        position={[1.086, 0.672, -0.315]}
        rotation={[3.141, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder257.geometry}
        material={materials['black steel']}
        position={[1.085, 0.401, -0.855]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder258.geometry}
        material={materials['black steel']}
        position={[1.085, 0.4, -0.9]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder259.geometry}
        material={materials['white steel']}
        position={[1.427, 0.155, -0.407]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder260.geometry}
        material={materials['white steel']}
        position={[1.427, 0.217, -0.498]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder261.geometry}
        material={materials['white steel']}
        position={[1.427, 0.279, -0.589]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder262.geometry}
        material={materials['white steel']}
        position={[1.427, 0.341, -0.68]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder263.geometry}
        material={materials['white steel']}
        position={[1.427, 0.398, -0.761]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder264.geometry}
        material={materials['white steel']}
        position={[1.323, 0.635, -0.387]}
        rotation={[2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder265.geometry}
        material={materials['white steel']}
        position={[1.323, 0.58, -0.482]}
        rotation={[2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder266.geometry}
        material={materials['white steel']}
        position={[1.323, 0.526, -0.578]}
        rotation={[2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder268.geometry}
        material={materials['white steel']}
        position={[1.323, 0.424, -0.761]}
        rotation={[2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath004.geometry}
        material={materials['black metal']}
        position={[1.651, 0.283, -0.593]}
        rotation={[0.604, Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath005.geometry}
        material={materials['black metal']}
        position={[1.651, 0.272, -0.593]}
        rotation={[0.604, Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath006.geometry}
        material={materials['black metal']}
        position={[1.651, 0.262, -0.593]}
        rotation={[0.604, Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder485.geometry}
        material={materials['black steel']}
        position={[1.021, 0.672, -0.315]}
        rotation={[0, 1.57, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder486.geometry}
        material={materials['black steel']}
        position={[0.951, 0.672, -0.315]}
        rotation={[0, 1.57, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder487.geometry}
        material={materials['black steel']}
        position={[0.881, 0.672, -0.315]}
        rotation={[0, 1.57, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder488.geometry}
        material={materials['black steel']}
        position={[0.855, 0.672, -0.345]}
        rotation={[0, 0.112, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder489.geometry}
        material={materials['black steel']}
        position={[0.853, 0.672, -0.436]}
        rotation={[0, 0.284, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder490.geometry}
        material={materials['black steel']}
        position={[0.824, 0.672, -0.534]}
        rotation={[0, 0.584, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder491.geometry}
        material={materials['black steel']}
        position={[0.773, 0.672, -0.616]}
        rotation={[0, 0.584, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder492.geometry}
        material={materials['black steel']}
        position={[0.715, 0.672, -0.676]}
        rotation={[0, 0.984, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder493.geometry}
        material={materials['black steel']}
        position={[0.641, 0.672, -0.724]}
        rotation={[0, 1.068, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder494.geometry}
        material={materials['black steel']}
        position={[0.564, 0.672, -0.749]}
        rotation={[0, 1.248, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <group
        position={[1.405, 0.287, -4.257]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.301, 0.204, 0.301]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube035.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube035_1.geometry}
          material={materials['Light brown']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath002.geometry}
        material={materials['white steel']}
        position={[1.116, 0.317, -4.371]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath003.geometry}
        material={materials['white steel']}
        position={[1.336, 0.318, -4.371]}
        rotation={[-0.597, 1.571, 0]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder269.geometry}
        material={materials['white steel']}
        position={[1.445, 0.335, -4.293]}
        rotation={[0.011, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder270.geometry}
        material={materials['black steel']}
        position={[1.678, 0.133, -4.554]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder271.geometry}
        material={materials['black steel']}
        position={[1.678, 0.162, -4.509]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder272.geometry}
        material={materials['black steel']}
        position={[1.678, 0.228, -4.409]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder273.geometry}
        material={materials['black steel']}
        position={[1.678, 0.257, -4.363]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder274.geometry}
        material={materials['black steel']}
        position={[1.678, 0.317, -4.275]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder275.geometry}
        material={materials['black steel']}
        position={[1.678, 0.346, -4.23]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder276.geometry}
        material={materials['black steel']}
        position={[1.113, 0.401, -4.109]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder277.geometry}
        material={materials['black steel']}
        position={[1.113, 0.4, -4.064]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder278.geometry}
        material={materials['black steel']}
        position={[1.216, 0.401, -3.97]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder279.geometry}
        material={materials['black steel']}
        position={[1.261, 0.4, -3.97]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder280.geometry}
        material={materials['black steel']}
        position={[1.386, 0.401, -3.97]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder281.geometry}
        material={materials['black steel']}
        position={[1.431, 0.4, -3.97]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder282.geometry}
        material={materials['black steel']}
        position={[1.571, 0.401, -3.97]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder283.geometry}
        material={materials['black steel']}
        position={[1.616, 0.4, -3.97]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder284.geometry}
        material={materials['black steel']}
        position={[1.108, 0.422, -4.181]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder285.geometry}
        material={materials['black steel']}
        position={[1.108, 0.451, -4.227]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder286.geometry}
        material={materials['black steel']}
        position={[1.108, 0.508, -4.327]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder287.geometry}
        material={materials['black steel']}
        position={[1.108, 0.537, -4.372]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder288.geometry}
        material={materials['black steel']}
        position={[1.108, 0.596, -4.46]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder289.geometry}
        material={materials['black steel']}
        position={[1.108, 0.618, -4.505]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder290.geometry}
        material={materials['black steel']}
        position={[1.108, 0.636, -4.56]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder291.geometry}
        material={materials['black steel']}
        position={[1.108, 0.642, -4.588]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder292.geometry}
        material={materials['black steel']}
        position={[1.683, 0.401, -4.109]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder293.geometry}
        material={materials['black steel']}
        position={[1.683, 0.4, -4.064]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder294.geometry}
        material={materials['white steel']}
        position={[1.341, 0.678, -4.567]}
        rotation={[-2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder295.geometry}
        material={materials['white steel']}
        position={[1.341, 0.636, -4.471]}
        rotation={[-2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder296.geometry}
        material={materials['white steel']}
        position={[1.341, 0.586, -4.375]}
        rotation={[-2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder297.geometry}
        material={materials['white steel']}
        position={[1.341, 0.537, -4.28]}
        rotation={[-2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder298.geometry}
        material={materials['white steel']}
        position={[1.341, 0.497, -4.193]}
        rotation={[-2.026, 0, Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder299.geometry}
        material={materials['white steel']}
        position={[1.445, 0.153, -4.567]}
        rotation={[0.011, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder300.geometry}
        material={materials['white steel']}
        position={[1.445, 0.213, -4.476]}
        rotation={[0.011, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder301.geometry}
        material={materials['white steel']}
        position={[1.445, 0.274, -4.384]}
        rotation={[0.011, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder302.geometry}
        material={materials['white steel']}
        position={[1.445, 0.392, -4.211]}
        rotation={[0.011, 0, -Math.PI / 2]}
        scale={[0.007, 0.001, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath007.geometry}
        material={materials['black metal']}
        position={[1.116, 0.275, -4.371]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath008.geometry}
        material={materials['black metal']}
        position={[1.116, 0.261, -4.371]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath009.geometry}
        material={materials['black metal']}
        position={[1.116, 0.247, -4.371]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath014.geometry}
        material={materials['white steel']}
        position={[1.116, 0.536, -3.286]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath015.geometry}
        material={materials['white steel']}
        position={[1.731, 0.534, -0.722]}
        rotation={[0.604, Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath017.geometry}
        material={materials['black metal']}
        position={[1.116, 0.502, -3.286]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath018.geometry}
        material={materials['white steel']}
        position={[1.731, 0.501, -0.722]}
        rotation={[0.604, Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath020.geometry}
        material={materials['black metal']}
        position={[1.116, 0.49, -3.286]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath021.geometry}
        material={materials['white steel']}
        position={[1.731, 0.489, -0.722]}
        rotation={[0.604, Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath023.geometry}
        material={materials['black metal']}
        position={[1.116, 0.474, -3.286]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath024.geometry}
        material={materials['white steel']}
        position={[1.731, 0.474, -0.722]}
        rotation={[0.604, Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder317.geometry}
        material={materials['black steel']}
        position={[1.115, 0.653, -2.908]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder318.geometry}
        material={materials['black steel']}
        position={[1.302, 0.653, -2.908]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder319.geometry}
        material={materials['black steel']}
        position={[1.489, 0.653, -2.908]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder320.geometry}
        material={materials['black steel']}
        position={[1.676, 0.653, -2.908]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder321.geometry}
        material={materials['black steel']}
        position={[1.074, 0.653, -2.264]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder322.geometry}
        material={materials['black steel']}
        position={[1.074, 0.653, -2.451]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder323.geometry}
        material={materials['black steel']}
        position={[1.074, 0.653, -2.638]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder324.geometry}
        material={materials['black steel']}
        position={[1.074, 0.653, -2.825]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder325.geometry}
        material={materials['black steel']}
        position={[1.702, 0.653, -2.19]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder326.geometry}
        material={materials['black steel']}
        position={[1.515, 0.653, -2.19]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder327.geometry}
        material={materials['black steel']}
        position={[1.328, 0.653, -2.19]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder328.geometry}
        material={materials['black steel']}
        position={[1.141, 0.653, -2.19]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder329.geometry}
        material={materials['black steel']}
        position={[1.76, 0.653, -2.832]}
        rotation={[0, -1.571, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder330.geometry}
        material={materials['black steel']}
        position={[1.76, 0.653, -2.645]}
        rotation={[0, -1.571, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder331.geometry}
        material={materials['black steel']}
        position={[1.76, 0.653, -2.458]}
        rotation={[0, -1.571, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder332.geometry}
        material={materials['black steel']}
        position={[1.76, 0.653, -2.271]}
        rotation={[0, -1.571, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder333.geometry}
        material={materials['black steel']}
        position={[0.503, 0.653, -1.82]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder334.geometry}
        material={materials['black steel']}
        position={[0.678, 0.653, -1.82]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder335.geometry}
        material={materials['black steel']}
        position={[0.852, 0.653, -1.82]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder336.geometry}
        material={materials['black steel']}
        position={[1.027, 0.653, -1.82]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder337.geometry}
        material={materials['black steel']}
        position={[1.201, 0.653, -1.82]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder338.geometry}
        material={materials['black steel']}
        position={[1.376, 0.653, -1.82]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder339.geometry}
        material={materials['black steel']}
        position={[1.55, 0.653, -1.82]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder340.geometry}
        material={materials['black steel']}
        position={[1.725, 0.653, -1.82]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder341.geometry}
        material={materials['black steel']}
        position={[1.766, 0.653, -1.759]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder342.geometry}
        material={materials['black steel']}
        position={[1.766, 0.653, -1.577]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder343.geometry}
        material={materials['black steel']}
        position={[1.766, 0.653, -1.395]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder344.geometry}
        material={materials['black steel']}
        position={[1.766, 0.653, -1.213]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder345.geometry}
        material={materials['black steel']}
        position={[1.766, 0.653, -1.031]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder346.geometry}
        material={materials['black steel']}
        position={[1.766, 0.653, -0.849]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder347.geometry}
        material={materials['black steel']}
        position={[1.766, 0.653, -0.667]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder348.geometry}
        material={materials['black steel']}
        position={[1.766, 0.653, -0.485]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath013.geometry}
        material={materials['white steel']}
        position={[1.116, 0.528, -4.371]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder350.geometry}
        material={materials['black steel']}
        position={[1.065, 0.648, -4.539]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath025.geometry}
        material={materials['white steel']}
        position={[1.116, 0.497, -4.371]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath026.geometry}
        material={materials['white steel']}
        position={[1.116, 0.483, -4.371]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath027.geometry}
        material={materials['white steel']}
        position={[1.116, 0.469, -4.371]}
        rotation={[-0.604, -Math.PI / 2, 0]}
        scale={0.138}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder351.geometry}
        material={materials['black steel']}
        position={[1.065, 0.648, -4.337]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder352.geometry}
        material={materials['black steel']}
        position={[1.065, 0.648, -4.136]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder353.geometry}
        material={materials['black steel']}
        position={[1.065, 0.648, -3.934]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder354.geometry}
        material={materials['black steel']}
        position={[1.065, 0.648, -3.732]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder355.geometry}
        material={materials['black steel']}
        position={[1.065, 0.648, -3.53]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder356.geometry}
        material={materials['black steel']}
        position={[1.065, 0.648, -3.329]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder357.geometry}
        material={materials['black steel']}
        position={[1.121, 0.648, -3.265]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder358.geometry}
        material={materials['black steel']}
        position={[1.329, 0.648, -3.265]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder359.geometry}
        material={materials['black steel']}
        position={[1.537, 0.648, -3.265]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder360.geometry}
        material={materials['black steel']}
        position={[1.746, 0.648, -3.265]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder361.geometry}
        material={materials['black steel']}
        position={[1.954, 0.648, -3.265]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder362.geometry}
        material={materials['black steel']}
        position={[2.162, 0.648, -3.265]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder363.geometry}
        material={materials['black steel']}
        position={[2.337, 0.648, -3.265]}
        scale={[1, 1.084, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath010.geometry}
        material={materials['black metal']}
        position={[1.336, 0.279, -4.371]}
        rotation={[-0.597, 1.571, 0]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath011.geometry}
        material={materials['black metal']}
        position={[1.336, 0.263, -4.371]}
        rotation={[-0.597, 1.571, 0]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath016.geometry}
        material={materials['black metal']}
        position={[1.336, 0.248, -4.371]}
        rotation={[-0.597, 1.571, 0]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder495.geometry}
        material={materials['black steel']}
        position={[1.493, 0.648, -4.56]}
        rotation={[0, -1.571, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder497.geometry}
        material={materials['black steel']}
        position={[1.717, 0.648, -4.56]}
        rotation={[0, -1.571, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder499.geometry}
        material={materials['black steel']}
        position={[1.941, 0.648, -4.56]}
        rotation={[0, -1.571, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder501.geometry}
        material={materials['black steel']}
        position={[2.165, 0.648, -4.56]}
        rotation={[0, -1.571, 0]}
        scale={[0.003, 0.059, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane309.geometry}
        material={materials['black metal']}
        position={[0.145, 0.902, -6.257]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.152, 0.114, 0.141]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube410.geometry}
        material={materials['black metal']}
        position={[0.146, 0.789, -6.253]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube411.geometry}
        material={materials['black metal']}
        position={[0.146, 0.858, -6.253]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube412.geometry}
        material={materials['black metal']}
        position={[0.146, 0.877, -6.253]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube413.geometry}
        material={materials['black metal']}
        position={[0.146, 0.943, -6.253]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube418.geometry}
        material={materials['black metal']}
        position={[0.043, 0.868, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube419.geometry}
        material={materials['black metal']}
        position={[0.058, 0.868, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube420.geometry}
        material={materials['black metal']}
        position={[0.146, 0.994, -6.253]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube421.geometry}
        material={materials['black metal']}
        position={[0.146, 1.012, -6.253]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube422.geometry}
        material={materials['black metal']}
        position={[0.013, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube423.geometry}
        material={materials['black metal']}
        position={[0.028, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube414.geometry}
        material={materials['black metal']}
        position={[0.078, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube415.geometry}
        material={materials['black metal']}
        position={[0.096, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube416.geometry}
        material={materials['black metal']}
        position={[0.137, 0.868, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube417.geometry}
        material={materials['black metal']}
        position={[0.153, 0.868, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube425.geometry}
        material={materials['black metal']}
        position={[0.12, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube426.geometry}
        material={materials['black metal']}
        position={[0.17, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube428.geometry}
        material={materials['black metal']}
        position={[0.229, 0.868, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube429.geometry}
        material={materials['black metal']}
        position={[0.245, 0.868, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube430.geometry}
        material={materials['black metal']}
        position={[0.193, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube431.geometry}
        material={materials['black metal']}
        position={[0.211, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube432.geometry}
        material={materials['black metal']}
        position={[0.258, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube433.geometry}
        material={materials['black metal']}
        position={[0.275, 0.883, -6.253]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane310.geometry}
        material={materials['black metal']}
        position={[0.281, 0.772, -6.253]}
        rotation={[Math.PI / 2, 0, 0.768]}
        scale={[0.044, 0.115, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane311.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane312.geometry}
        material={materials['black metal']}
        position={[0.187, 0.772, -6.253]}
        rotation={[Math.PI / 2, 0, -0.001]}
        scale={[0.046, 0.109, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane313.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane314.geometry}
        material={materials['black metal']}
        position={[0.094, 0.772, -6.253]}
        rotation={[Math.PI / 2, 0, 0.506]}
        scale={[0.045, 0.112, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane315.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane316.geometry}
        material={materials['black metal']}
        position={[2.568, 0.882, -6.17]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.152, 0.114, 0.141]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube424.geometry}
        material={materials['black metal']}
        position={[2.569, 0.77, -6.166]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube427.geometry}
        material={materials['black metal']}
        position={[2.569, 0.839, -6.166]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube434.geometry}
        material={materials['black metal']}
        position={[2.569, 0.857, -6.166]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube435.geometry}
        material={materials['black metal']}
        position={[2.569, 0.924, -6.166]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube436.geometry}
        material={materials['black metal']}
        position={[2.466, 0.848, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube437.geometry}
        material={materials['black metal']}
        position={[2.482, 0.848, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube438.geometry}
        material={materials['black metal']}
        position={[2.569, 0.974, -6.166]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube439.geometry}
        material={materials['black metal']}
        position={[2.569, 0.993, -6.166]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube440.geometry}
        material={materials['black metal']}
        position={[2.437, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube441.geometry}
        material={materials['black metal']}
        position={[2.451, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube442.geometry}
        material={materials['black metal']}
        position={[2.501, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube443.geometry}
        material={materials['black metal']}
        position={[2.519, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube444.geometry}
        material={materials['black metal']}
        position={[2.56, 0.848, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube445.geometry}
        material={materials['black metal']}
        position={[2.576, 0.848, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube446.geometry}
        material={materials['black metal']}
        position={[2.543, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube447.geometry}
        material={materials['black metal']}
        position={[2.593, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube448.geometry}
        material={materials['black metal']}
        position={[2.652, 0.848, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube449.geometry}
        material={materials['black metal']}
        position={[2.668, 0.848, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube450.geometry}
        material={materials['black metal']}
        position={[2.616, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube451.geometry}
        material={materials['black metal']}
        position={[2.634, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube452.geometry}
        material={materials['black metal']}
        position={[2.681, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube453.geometry}
        material={materials['black metal']}
        position={[2.698, 0.863, -6.166]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane317.geometry}
        material={materials['black metal']}
        position={[2.704, 0.753, -6.165]}
        rotation={[Math.PI / 2, 0, 0.768]}
        scale={[0.044, 0.115, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane318.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane319.geometry}
        material={materials['black metal']}
        position={[2.61, 0.753, -6.165]}
        rotation={[Math.PI / 2, 0, -0.001]}
        scale={[0.046, 0.109, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane320.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane321.geometry}
        material={materials['black metal']}
        position={[2.517, 0.753, -6.165]}
        rotation={[Math.PI / 2, 0, 0.506]}
        scale={[0.045, 0.112, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane322.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane323.geometry}
        material={materials['black metal']}
        position={[1.62, 0.899, 1.467]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.152, 0.114, 0.141]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube454.geometry}
        material={materials['black metal']}
        position={[1.615, 0.786, 1.469]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube455.geometry}
        material={materials['black metal']}
        position={[1.615, 0.855, 1.469]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube456.geometry}
        material={materials['black metal']}
        position={[1.615, 0.874, 1.469]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube457.geometry}
        material={materials['black metal']}
        position={[1.615, 0.94, 1.469]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube458.geometry}
        material={materials['black metal']}
        position={[1.615, 0.864, 1.366]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube459.geometry}
        material={materials['black metal']}
        position={[1.615, 0.864, 1.381]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube460.geometry}
        material={materials['black metal']}
        position={[1.615, 0.991, 1.469]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube461.geometry}
        material={materials['black metal']}
        position={[1.615, 1.009, 1.469]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube462.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.336]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube463.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.351]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube464.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.4]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube465.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.419]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube466.geometry}
        material={materials['black metal']}
        position={[1.615, 0.864, 1.46]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube467.geometry}
        material={materials['black metal']}
        position={[1.615, 0.864, 1.475]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube468.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.442]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube469.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.493]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube470.geometry}
        material={materials['black metal']}
        position={[1.615, 0.864, 1.552]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube471.geometry}
        material={materials['black metal']}
        position={[1.615, 0.864, 1.567]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube472.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.516]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube473.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.533]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube474.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.581]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube475.geometry}
        material={materials['black metal']}
        position={[1.615, 0.88, 1.598]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane324.geometry}
        material={materials['black metal']}
        position={[1.615, 0.769, 1.604]}
        rotation={[Math.PI / 2, 0, 2.339]}
        scale={[0.044, 0.115, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane325.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane326.geometry}
        material={materials['black metal']}
        position={[1.615, 0.769, 1.51]}
        rotation={[Math.PI / 2, 0, 1.57]}
        scale={[0.046, 0.109, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane327.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane328.geometry}
        material={materials['black metal']}
        position={[1.615, 0.769, 1.417]}
        rotation={[Math.PI / 2, 0, 2.077]}
        scale={[0.045, 0.112, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane329.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane330.geometry}
        material={materials['black metal']}
        position={[0.985, 0.899, 1.468]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.152, 0.114, 0.141]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube476.geometry}
        material={materials['black metal']}
        position={[0.989, 0.786, 1.466]}
        rotation={[0, 1.571, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube477.geometry}
        material={materials['black metal']}
        position={[0.989, 0.855, 1.466]}
        rotation={[0, 1.571, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube478.geometry}
        material={materials['black metal']}
        position={[0.989, 0.874, 1.466]}
        rotation={[0, 1.571, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube479.geometry}
        material={materials['black metal']}
        position={[0.989, 0.94, 1.466]}
        rotation={[0, 1.571, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube480.geometry}
        material={materials['black metal']}
        position={[0.989, 0.864, 1.569]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube481.geometry}
        material={materials['black metal']}
        position={[0.989, 0.864, 1.554]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube482.geometry}
        material={materials['black metal']}
        position={[0.989, 0.991, 1.466]}
        rotation={[0, 1.571, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube483.geometry}
        material={materials['black metal']}
        position={[0.989, 1.009, 1.466]}
        rotation={[0, 1.571, 0]}
        scale={[0.147, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube484.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.599]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube485.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.584]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube486.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.535]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube487.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.516]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube488.geometry}
        material={materials['black metal']}
        position={[0.989, 0.864, 1.475]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube489.geometry}
        material={materials['black metal']}
        position={[0.989, 0.864, 1.46]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube490.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.493]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube491.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.442]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube492.geometry}
        material={materials['black metal']}
        position={[0.989, 0.864, 1.383]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube493.geometry}
        material={materials['black metal']}
        position={[0.989, 0.864, 1.368]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube494.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.419]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube495.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.402]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube496.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.354]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube497.geometry}
        material={materials['black metal']}
        position={[0.989, 0.88, 1.337]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.105, 0.001, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane331.geometry}
        material={materials['black metal']}
        position={[0.99, 0.769, 1.331]}
        rotation={[Math.PI / 2, 0, -0.803]}
        scale={[0.044, 0.115, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane332.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane333.geometry}
        material={materials['black metal']}
        position={[0.99, 0.769, 1.425]}
        rotation={[Math.PI / 2, 0, -1.572]}
        scale={[0.046, 0.109, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane334.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane335.geometry}
        material={materials['black metal']}
        position={[0.99, 0.769, 1.518]}
        rotation={[Math.PI / 2, 0, -1.065]}
        scale={[0.045, 0.112, 0.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane336.geometry}
          material={materials['glass window']}
          position={[-0.932, 0, -0.997]}
        />
      </mesh>
      <group position={[1.561, 0.202, -4.049]} scale={[0.114, 0.132, 0.054]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_1.geometry}
          material={materials['white metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_3.geometry}
          material={nodes.Cube014_3.material}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Green_Dustbin.geometry}
        material={materials['green plastic']}
        position={[1.235, 0.177, -4.304]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={-0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Red_Dustbin.geometry}
        material={materials['red plastic']}
        position={[1.235, 0.1, -0.554]}
        scale={0.03}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube176.geometry}
        material={materials['green dark plastic']}
        position={[2.307, 0.176, 0.099]}
        scale={[0.036, 0.098, 0.143]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube177.geometry}
        material={materials['green dark plastic']}
        position={[2.306, 0.174, -2.892]}
        scale={[0.04, 0.108, 0.178]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube178.geometry}
        material={materials['green dark plastic']}
        position={[0.523, 0.174, -2.892]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.04, 0.108, 0.178]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube216.geometry}
        material={materials['green dark plastic']}
        position={[2.306, 0.71, -2.825]}
        scale={[0.04, 0.108, 0.178]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube225.geometry}
        material={materials['green dark plastic']}
        position={[0.534, 0.713, -0.002]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.04, 0.108, 0.178]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube244.geometry}
        material={materials['green dark plastic']}
        position={[0.533, 0.71, -2.372]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.04, 0.108, 0.178]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube271.geometry}
        material={materials['green dark plastic']}
        position={[2.307, 0.701, 0.1]}
        scale={[0.036, 0.098, 0.143]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube190.geometry}
        material={materials['green dark plastic']}
        position={[2.316, 0.195, -0.143]}
        scale={[0.045, 0.119, 0.1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube270.geometry}
        material={materials['green dark plastic']}
        position={[2.316, 0.72, -0.143]}
        scale={[0.045, 0.119, 0.1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube272.geometry}
        material={materials['green dark plastic']}
        position={[0.532, 0.753, -0.301]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.053, 0.141, 0.118]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane167.geometry}
        material={nodes.Plane167.material}
        position={[0.128, 0.541, 0.197]}
        scale={[0.763, 1, 0.518]}
      />
      <group position={[0.483, 0.531, -0.384]} scale={[0.377, 0.075, 0.377]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder028.geometry}
          material={nodes.Cylinder028.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder028_1.geometry}
          material={materials.floor}
        />
      </group>
      <group position={[1.421, 0.605, -0.286]} scale={[0.925, 1, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane025.geometry}
          material={nodes.Plane025.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane025_1.geometry}
          material={materials.floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane025_2.geometry}
          material={materials['Light brown']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane169.geometry}
        material={nodes.Plane169.material}
        position={[1.421, 0.609, -0.286]}
        scale={[0.925, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder199.geometry}
        material={materials['black steel']}
        position={[1.414, 1.112, -3.041]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.364, 2.695, 0.229]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder200.geometry}
        material={materials['blue glass']}
        position={[1.414, 1.112, -3.041]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.364, 2.695, 0.229]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane268.geometry}
        material={materials.granite}
        position={[0.128, 0.545, 0.197]}
        scale={[0.763, 1, 0.518]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane269.geometry}
        material={materials.granite}
        position={[0.128, 0.545, 0.197]}
        scale={[0.763, 1, 0.518]}
      />
      <group
        position={[1.966, 0.214, 0.7]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[0.513, 0.257, -0.547]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[0.513, 0.257, -1.737]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[0.157, 0.243, 0.189]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_2.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[0.509, 0.214, -2.501]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[0.393, 0.214, -3.239]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[0.317, 0.214, -4.44]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
      <group
        position={[0.005, 0.214, -4.763]}
        rotation={[0, 1.571, 0]}
        scale={[0.004, 0.003, 0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials['black metal']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Black light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Light brown']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials.glass}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/CSEDep v1.glb')