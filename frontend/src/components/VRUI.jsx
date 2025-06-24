import React from 'react';
import WalkingIndicator from './WalkingIndicator';
import ModelList from './ModelList';
import WorldMap from './WorldMap';

export default function VRUI({
  isPC,
  isWalking,
  setIsWalking,
  coords,
  placedModels,
  position,
  users,
  userName,
  isPlantListOpen,
  setIsPlantListOpen,
  isFertilizerListOpen,
  setIsFertilizerListOpen,
  isAssetListOpen,
  setIsAssetListOpen,
  draggedModel,
  setDraggedModel,
  dropIndicatorPosition,
  setDropIndicatorPosition,
  heldItem,
  setHeldItem,
  selectedModel,
  setSelectedModel,
  selectedModelDetails,
  setSelectedModelDetails,
  waterInHand,
  fertilizerInHand
}) {
  return (
    <>
      <WalkingIndicator isWalking={isWalking} />
      {/* Crosshair marker: always on mobile, only on PC when pointer lock is active */}
      {(!isPC || (typeof window !== 'undefined' && window.document && document.pointerLockElement)) && (
        <div style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          <div style={{
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
            +
          </div>
        </div>
      )}
      {/* Mobile Walk Button */}
      {!isPC && (
        <div style={{ position: 'fixed', top: '140px', left: '20px', zIndex: 1000 }}>
          <button
            style={{
              width: '60px', height: '60px', borderRadius: '50%', backgroundColor: isWalking ? '#4CAF50' : '#2196F3', border: 'none', color: 'white', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', opacity: 0.8, touchAction: 'none'
            }}
            onClick={() => setIsWalking(prev => !prev)}
          >
            {isWalking ? '⏹' : '▶'}
          </button>
        </div>
      )}
      {/* WorldMap overlay */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: 120, height: 120, background: 'rgba(0,0,0,0)', borderRadius: 8, overflow: 'hidden', zIndex: 2000, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', padding: 8 }}>
        <WorldMap
          coords={coords}
          placedModels={placedModels}
          userMarkerPosition={(() => {
            if (position && Array.isArray(coords) && coords.length === 2) {
              const origin = [0, 0];
              const [lat, lng] = [position.x, position.z];
              return [lat, lng];
            }
            return coords;
          })()}
          peers={users.filter(u => u.name !== userName)}
        />
      </div>
      <ModelList
        isPlantListOpen={isPlantListOpen}
        isFertilizerListOpen={isFertilizerListOpen}
        isAssetListOpen={isAssetListOpen}
        onPlantClose={() => { setIsPlantListOpen(!isPlantListOpen); setIsFertilizerListOpen(false); setIsAssetListOpen(false) }}
        onFertilizerClose={() => { setIsFertilizerListOpen(!isFertilizerListOpen); setIsPlantListOpen(false); setIsAssetListOpen(false) }}
        onAssetClose={() => { setIsAssetListOpen(!isAssetListOpen); setIsPlantListOpen(false); setIsFertilizerListOpen(false) }}
        setDraggedModel={setDraggedModel}
        draggedModel={draggedModel}
        hoverPosition={dropIndicatorPosition}
        setHoverPosition={setDropIndicatorPosition}
        setHeldItem={setHeldItem}
        heldItem={heldItem}
      />
      {/* Add more overlays as needed, e.g. ModelPreview, water/fertilizer indicators, etc. */}
    </>
  );
}
