import React, { Suspense, useRef, useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, collectionGroup } from 'firebase/firestore';
import { db } from '../Firebase';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Separate component for the 3D model preview
const ModelPreview = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef();
  const [modelClone, setModelClone] = useState(null);

  // Create a clone of the model when it's loaded
  useEffect(() => {
    if (gltf) {
      const clone = gltf.scene.clone();
      setModelClone(clone);
    }
  }, [gltf]);

  if (!modelClone) return null;

  return (
    <mesh ref={modelRef} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
      <primitive object={modelClone} />
    </mesh>
  );
};

async function loadPlants() {
  try {
    const plantsDoc = doc(db, '3D/Plants');
    const modelsCollection = collection(plantsDoc, 'Models');
    const plantsSnapshot = await getDocs(modelsCollection);
    
    const results = await Promise.all(plantsSnapshot.docs.map(async docSnap => {
      try {
        const data = docSnap.data();
        console.log('Plants data:', data);
        const stageDocs = await getDocs(collection(db, `3D/Plants/Models/${docSnap.id}/Stages`));
        console.log('Stage documents for', docSnap.id, ':', stageDocs.docs.length);

        const stages = await Promise.all(stageDocs.docs.map(async stageSnap => {
          try {
            const stageData = stageSnap.data();
            console.log('Stage data for', stageSnap.id, ':', stageData);
            const modelPath = stageData.modelPath;
            
            if (!modelPath) {
              console.warn('No modelPath found for stage', stageSnap.id);
              return null;
            }

            // Ensure the modelPath is a valid URL or path
            try {
              new URL(modelPath);
              console.log('Valid URL modelPath:', modelPath);
            } catch (e) {
              console.log('Local path modelPath:', modelPath);
            }

            return {
              id: stageSnap.id,
              modelPath: modelPath
            };
          } catch (stageError) {
            console.error('Error processing stage:', stageSnap.id, stageError);
            return null;
          }
        }));

        // Filter out null stages and ensure at least one valid stage exists
        const validStages = stages.filter(stage => stage !== null);
        if (validStages.length === 0) {
          console.warn('No valid stages found for model:', docSnap.id);
          return null;
        }

        return {
          id: docSnap.id,
          ...data,
          name: data.name || docSnap.id,
          description: data.description || '',
          thumbnail: data.thumbnail || '/models/thumbnails/default.png',
          stages: validStages,
          modelPath: validStages[0].modelPath, // Use the first stage's modelPath as the default
          type: 'plant',
          category: docSnap.id
        };
      } catch (modelError) {
        console.error('Error processing model:', docSnap.id, modelError);
        return null;
      }
    }));

    const validResults = results.filter(result => result !== null);
    console.log('Final plant models:', validResults);
    return validResults;
  } catch (error) {
    console.error('Error loading plants:', error);
    return [];
  }
}


async function loadAssets() {
  try {
    const assetsDoc = doc(db, '3D/Assets');
    const modelsCollection = collection(assetsDoc, 'Models');
    const assetsSnapshot = await getDocs(modelsCollection);
    console.log('assetsSnapshot', assetsSnapshot.docs);
    
    const results = await Promise.all(assetsSnapshot.docs.map(async docSnap => {
      try {
        const data = docSnap.data();
        console.log('Asset data:', data);

        return {
          category: docSnap.id,
          id: data.id,
          name: data.name || data.id,
          description: data.description || '',
          modelPath: data.modelPath,
          thumbnail: data.thumbnailPath || '/models/thumbnails/default.png',
          currentCapacity: data.currentCapacity || 0,  // Add any necessary asset-specific properties
          maxCapacity: data.maxCapacity || 100,
          type: 'asset'
        };
      } catch (modelError) {
        console.error('Error processing model:', docSnap.id, modelError);
        return null;
      }
    }));

    const validResults = results.filter(result => result !== null);
    console.log('Final asset models:', validResults);
    return validResults;
  } catch (error) {
    console.error('Error loading assets:', error);
    return [];
  }
}

async function loadFertilizers() {
  try {
    const fertilizersDoc = doc(db, '3D/Fertilizers');
    const modelsCollection = collection(fertilizersDoc, 'Models');
    const fertilizersSnapshot = await getDocs(modelsCollection);
    console.log('fertilizersSnapshot', fertilizersSnapshot.docs);
    
    const results = await Promise.all(fertilizersSnapshot.docs.map(async docSnap => {
      try {
        const data = docSnap.data();
        console.log('Fertilizer data:', data);

        return {
          category: docSnap.id,
          id: data.id,
          modelPath: data.modelPath,
          name: data.name || data.id,
          description: data.description || '',
          thumbnail: data.thumbnailPath || '/models/thumbnails/default.png',
          currentCapacity: data.currentCapacity || 0,  // Add any necessary asset-specific properties
          maxCapacity: data.maxCapacity || 100,
          type: 'fertilizer'
        };
      } catch (modelError) {
        console.error('Error processing model:', docSnap.id, modelError);
        return null;
      }
    }));

    const validResults = results.filter(result => result !== null);
    console.log('Final fertilizer models:', validResults);
    return validResults;
  } catch (error) {
    console.error('Error loading fertilizers:', error);
    return [];
  }
}




const ModelList = ({ 
  isPlantListOpen, 
  isFertilizerListOpen, 
  isAssetListOpen, 
  onPlantClose: onPlantToggle, 
  onFertilizerClose: onFertilizerToggle, 
  onAssetClose: onAssetToggle, 
  setDraggedModel, 
  draggedModel, 
  hoverPosition, 
  setHoverPosition,
  setHeldItem,
  heldItem  // Add this prop to track currently held item
}) => {

  const [fertilizers, setFertilizers] = useState([]);
  useEffect(() => {
    loadFertilizers().then(setFertilizers);
    console.log(fertilizers);
  }, []);

  const [plants, setPlants] = useState([]);
  useEffect(() => {
    loadPlants().then(setPlants);
    console.log(plants);
  }, []);

  const [assets, setassets] = useState([]);
  
  useEffect(() => {
    loadAssets().then(setassets);
    console.log(assets);
  }, []);

  // Helper function to check if an item is currently selected
  const isItemSelected = (item) => {
    return heldItem && heldItem.id === item.id;
  };

  // Helper function to handle item click
  const handleItemClick = (item, type) => {
    console.log("Clicked item:", item);
    if (isItemSelected(item)) {
      // If clicking the same item, deselect it
      setHeldItem(null);
    } else {
      // Set heldItem with category and type
      setHeldItem({
        ...item,
        type: type, // Use the type passed in
        category: item.category || 'default', // Use category if available, otherwise default
      });
    }
  };

  return (
    <>
      {/* Floating Models Button */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '150px',
        backgroundColor: isPlantListOpen ? '#8ab4f8' : 'rgba(32, 33, 36, 0.8)',
        color: isPlantListOpen ? '#202124' : 'white',
        padding: '8px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.2s ease'
      }} onClick={(e) => {
        e.stopPropagation();
        onPlantToggle();
      }}>
        <span style={{ fontSize: '1.2em', lineHeight: 1 }}>🪴</span>
      </div>
      
      {/* Fertilizer Button */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '220px',
        backgroundColor: isFertilizerListOpen ? '#8ab4f8' : 'rgba(32, 33, 36, 0.8)',
        color: isFertilizerListOpen ? '#202124' : 'white',
        padding: '8px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.2s ease'
      }} onClick={(e) => {
        e.stopPropagation();
        onFertilizerToggle();
      }}>
        <span style={{ fontSize: '1.2em', lineHeight: 1 }}>🧃</span>
      </div>

      {/* Assets Button */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '290px',
        backgroundColor: isAssetListOpen ? '#8ab4f8' : 'rgba(32, 33, 36, 0.8)',
        color: isAssetListOpen ? '#202124' : 'white',
        padding: '8px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.2s ease'
      }} onClick={(e) => {
        e.stopPropagation();
        onAssetToggle();
      }}>
        <span style={{ fontSize: '1.2em', lineHeight: 1 }}>💧</span>
        {/* {isAssetListOpen ? 'Hide Assets' : 'Show Assets'} */}
      </div>

      {/* Models Panel */}
      {(isPlantListOpen || isFertilizerListOpen || isAssetListOpen) && (
        <div 
          style={{
            position: 'fixed',
            top: '50px',
            left: '150px',
            width: '150px',
            backgroundColor: 'rgb(255, 255, 255, 0.8)',
            padding: '5px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 9,
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
          }}>
            {/* Draggable Models */}
            {isPlantListOpen && plants.map((plant) => (
              <>
              <span>{plant.name}</span>
              <div
                key={plant.id}
                style={{
                  padding: '5px',
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  height: '150px',  
                  cursor: 'grab',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  touchAction: 'none'
                }}
                draggable
                onDragStart={(e) => {
                  e.stopPropagation();
                  console.log("Dragging plant:", plant);
                  setDraggedModel(plant);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  console.log("Touch start on plant:", plant);
                  setDraggedModel(plant);
                }}
                onDrop={(e) => {
                  setDraggedModel(null);
                  setHoverPosition(null);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Canvas 
                  camera={{ position: [0, 0, 2], fov: 50 }}
                  style={{ background: 'transparent' }}
                >
                  <OrbitControls 
                    autoRotate 
                    autoRotateSpeed={15}
                    enableZoom={false}
                    enablePan={false}
                  />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <Suspense fallback={null}>
                    <ModelPreview modelPath={plant.stages[0].modelPath} />
                  </Suspense>
                </Canvas>
              </div>
              </>
            ))}

            {/* Clickable Fertilizers */}
            {isFertilizerListOpen && fertilizers.map((fertilizer) => (
              <>
              <span>{fertilizer.name}</span>
              <div
                key={fertilizer.id}
                style={{
                  padding: '5px',
                  backgroundColor: isItemSelected(fertilizer) ? '#e3f2fd' : 'white',
                  borderRadius: '5px',
                  height: '150px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  transform: isItemSelected(fertilizer) ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.2s ease'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(fertilizer, 'fertilizer');
                }}
              >
                <Canvas 
                  camera={{ position: [0, 0, 2], fov: 50 }}
                  style={{ background: 'transparent' }}
                >
                  <OrbitControls 
                    autoRotate 
                    autoRotateSpeed={15}
                    enableZoom={false}
                    enablePan={false}
                  />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <Suspense fallback={null}>
                    <ModelPreview modelPath={fertilizer.modelPath} />
                  </Suspense>
                </Canvas>
              </div>
              </>
            ))}              

            {/* Clickable Water Jugs */}
            {isAssetListOpen && assets.map((asset) => (
              <>
              <span>{asset.name}</span>
              <div
                key={asset.id}
                style={{
                  padding: '5px',
                  backgroundColor: isItemSelected(asset) ? '#e3f2fd' : 'white',
                  borderRadius: '5px',
                  height: '150px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  transform: isItemSelected(asset) ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.2s ease'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(asset, 'asset');
                }}
              >
                <Canvas 
                  camera={{ position: [0, 0, 2], fov: 50 }}
                  style={{ background: 'transparent' }}
                >
                  <OrbitControls 
                    autoRotate 
                    autoRotateSpeed={15}
                    enableZoom={false}
                    enablePan={false}
                  />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <Suspense fallback={null}>
                    <ModelPreview modelPath={asset.modelPath} />
                  </Suspense>
                </Canvas>
              </div>
              </>
            ))}              
          </div>
        </div>
      )}
    </>
  );
};

export default ModelList; 