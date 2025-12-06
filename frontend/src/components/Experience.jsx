// import React from 'react';
// import { XR } from '@react-three/xr';
// import { Sky, Stats, Html } from '@react-three/drei';

// // Import all your 3D and UI components
// import { ModelRegistry } from "../contexts/ModelRegistry";
// import Rig from './Rig';
// import PlantBot from './PlantBot';
// import HeldItem from './HeldItem';
// import DroppedModel from './DroppedModel';
// import Garden from './Garden';
// import Avatar from './Avatar';
// import RealtimeEnvironment from './RealtimeEnvironment';
// import ProceduralTerrain from './ProceduralTerrain';
// import { DragHandler } from './Scene';
// import VRUI from './VRUI'; // Your floating UI component

// export default function Experience({ isVREnabled, ...props }) {
//   const {
//     coords,
//     placedModels,
//     isWalking,
//     heldItem,
//     userName,
//     socket,
//     position,
//     users,
//     skyTurbidity,
//     sunPosition,
//     backgroundIntensity,
//     levaControls
//   } = props;
  
//   const [lat, lng] = coords || [0, 0];
//   const memoizedBBox = React.useMemo(() => [-100, -100, 100, 100], []);
//   const memoizedInitPosition = React.useMemo(() => [0, 0, 0], []);

//   return (
//     <XR>
//       <ModelRegistry>
//         {/* --- Environment & Lighting --- */}
//         <Sky sunPosition={sunPosition} turbidity={skyTurbidity} />
//         <RealtimeEnvironment
//           lat={lat}
//           lng={lng}
//           position={position}
//           useRealtime={levaControls.useRealtime}
//           customEnv={levaControls}
//           onBackgroundIntensityChange={props.setBackgroundIntensity}
//         />
//         <ambientLight intensity={0.5} />
//         <directionalLight castShadow position={sunPosition} intensity={1.5} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        
//         {/* --- Player, World, and Stats --- */}
//         <Rig {...props} />
//         <ProceduralTerrain bbox={memoizedBBox} position={memoizedInitPosition} envIntensity={backgroundIntensity} />
//         <Garden scale={0.5} />
//         <DragHandler {...props} />
//         <Stats />

//         {/* --- Interactive Objects --- */}
//         <PlantBot position={[2, 0, 2]} refillResourceFromAdvice={props.refillResourceFromAdvice} />
//         {heldItem && <HeldItem item={heldItem} waterCapacity={props.waterJugCapacity} />}
//         {users.map((user) => user.name !== userName && <Avatar key={user.id} {...user} />)}
//         {placedModels.map((model) => (
//           <DroppedModel key={model.instanceId} {...model} onPositionChange={(newPos) => props.handleModelPositionChange(model.id, newPos)} {...props} />
//         ))}

//         {/* --- Floating UI in VR --- */}
//         {isVREnabled && (
//           <Html position={[0, 1.6, -1.5]} transform occlude style={{ width: '800px', height: '600px', pointerEvents: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '20px' }}>
//             <VRUI isPC={false} {...props} />
//           </Html>
//         )}
//       </ModelRegistry>
//     </XR>
//   );
// }