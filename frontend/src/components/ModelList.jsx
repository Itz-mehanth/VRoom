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
        const stageDocs = await getDocs(collection(db, `3D/Plants/Models/${docSnap.id}/Stages`));

        const stages = await Promise.all(stageDocs.docs.map(async stageSnap => {
          try {
            const stageData = stageSnap.data();
            const modelPath = stageData.modelPath;

            if (!modelPath) return null;

            return {
              id: stageSnap.id,
              modelPath: modelPath
            };
          } catch (stageError) {
            return null;
          }
        }));

        const validStages = stages.filter(stage => stage !== null);
        if (validStages.length === 0) return null;

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
        return null;
      }
    }));

    const validResults = results.filter(result => result !== null);
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

    const results = await Promise.all(assetsSnapshot.docs.map(async docSnap => {
      try {
        const data = docSnap.data();
        return {
          category: docSnap.id,
          id: data.id,
          name: data.name || data.id,
          description: data.description || '',
          modelPath: data.modelPath,
          thumbnail: data.thumbnailPath || '/models/thumbnails/default.png',
          currentCapacity: data.currentCapacity || 0,
          maxCapacity: data.maxCapacity || 100,
          type: 'asset'
        };
      } catch (modelError) {
        return null;
      }
    }));

    const validResults = results.filter(result => result !== null);
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

    const results = await Promise.all(fertilizersSnapshot.docs.map(async docSnap => {
      try {
        const data = docSnap.data();
        return {
          category: docSnap.id,
          id: data.id,
          modelPath: data.modelPath,
          name: data.name || data.id,
          description: data.description || '',
          thumbnail: data.thumbnailPath || '/models/thumbnails/default.png',
          currentCapacity: data.currentCapacity || 0,
          maxCapacity: data.maxCapacity || 100,
          type: 'fertilizer'
        };
      } catch (modelError) {
        return null;
      }
    }));

    const validResults = results.filter(result => result !== null);
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
  heldItem
}) => {

  const [fertilizers, setFertilizers] = useState([]);
  useEffect(() => { loadFertilizers().then(setFertilizers); }, []);

  const [plants, setPlants] = useState([]);
  useEffect(() => { loadPlants().then(setPlants); }, []);

  const [assets, setassets] = useState([]);
  useEffect(() => { loadAssets().then(setassets); }, []);

  const isItemSelected = (item) => {
    return heldItem && heldItem.id === item.id;
  };

  const handleItemClick = (item, type) => {
    if (isItemSelected(item)) {
      setHeldItem(null);
    } else {
      setHeldItem({
        ...item,
        type: type,
        category: item.category || 'default',
      });
    }
  };

  const buttonStyle = (active) => ({
    position: 'fixed',
    top: '10px',
    backgroundColor: active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.9)',
    color: '#000',
    padding: '8px 16px',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    zIndex: 3000,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    border: active ? 'none' : '1px solid #eee'
  });

  return (
    <>
      <div style={{ ...buttonStyle(isPlantListOpen), left: '150px' }} onClick={(e) => {
        e.stopPropagation();
        onPlantToggle();
      }}>
        <span style={{ fontSize: '1.2em', lineHeight: 1 }}>🪴</span>
      </div>

      <div style={{ ...buttonStyle(isFertilizerListOpen), left: '220px' }} onClick={(e) => {
        e.stopPropagation();
        onFertilizerToggle();
      }}>
        <span style={{ fontSize: '1.2em', lineHeight: 1 }}>🧃</span>
      </div>

      <div style={{ ...buttonStyle(isAssetListOpen), left: '290px' }} onClick={(e) => {
        e.stopPropagation();
        onAssetToggle();
      }}>
        <span style={{ fontSize: '1.2em', lineHeight: 1 }}>💧</span>
      </div>

      {(isPlantListOpen || isFertilizerListOpen || isAssetListOpen) && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: '150px',
            width: '180px',
            backgroundColor: '#fff',
            padding: '12px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            zIndex: 2999,
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {isPlantListOpen && plants.map((plant) => (
              <div key={plant.id}>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: '#666' }}>{plant.name}</span>
                <div
                  style={{
                    padding: '5px',
                    backgroundColor: '#F8F8F8',
                    borderRadius: '12px',
                    height: '140px',
                    cursor: 'grab',
                    touchAction: 'none'
                  }}
                  draggable
                  onDragStart={(e) => {
                    e.stopPropagation();
                    setDraggedModel(plant);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setDraggedModel(plant);
                  }}
                  onDrop={(e) => {
                    setDraggedModel(null);
                    setHoverPosition(null);
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Canvas camera={{ position: [0, 0, 2], fov: 50 }} style={{ background: 'transparent' }}>
                    <OrbitControls autoRotate autoRotateSpeed={15} enableZoom={false} enablePan={false} />
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Suspense fallback={null}>
                      <ModelPreview modelPath={plant.stages[0].modelPath} />
                    </Suspense>
                  </Canvas>
                </div>
              </div>
            ))}

            {isFertilizerListOpen && fertilizers.map((fertilizer) => (
              <div key={fertilizer.id}>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: '#666' }}>{fertilizer.name}</span>
                <div
                  style={{
                    padding: '5px',
                    backgroundColor: isItemSelected(fertilizer) ? '#F0FFE5' : '#F8F8F8',
                    border: isItemSelected(fertilizer) ? '2px solid var(--color-primary)' : '2px solid transparent',
                    borderRadius: '12px',
                    height: '140px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(fertilizer, 'fertilizer');
                  }}
                >
                  <Canvas camera={{ position: [0, 0, 2], fov: 50 }} style={{ background: 'transparent' }}>
                    <OrbitControls autoRotate autoRotateSpeed={15} enableZoom={false} enablePan={false} />
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Suspense fallback={null}>
                      <ModelPreview modelPath={fertilizer.modelPath} />
                    </Suspense>
                  </Canvas>
                </div>
              </div>
            ))}

            {isAssetListOpen && assets.map((asset) => (
              <div key={asset.id}>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: '#666' }}>{asset.name}</span>
                <div
                  style={{
                    padding: '5px',
                    backgroundColor: isItemSelected(asset) ? '#F0FFE5' : '#F8F8F8',
                    border: isItemSelected(asset) ? '2px solid var(--color-primary)' : '2px solid transparent',
                    borderRadius: '12px',
                    height: '140px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(asset, 'asset');
                  }}
                >
                  <Canvas camera={{ position: [0, 0, 2], fov: 50 }} style={{ background: 'transparent' }}>
                    <OrbitControls autoRotate autoRotateSpeed={15} enableZoom={false} enablePan={false} />
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Suspense fallback={null}>
                      <ModelPreview modelPath={asset.modelPath} />
                    </Suspense>
                  </Canvas>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ModelList;