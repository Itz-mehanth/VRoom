import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ModelList from './ModelList';

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
  fertilizerInHand,
  enterAr
}) {
  const navigate = useNavigate();

  return (
    <>
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
            color: 'white',
            textShadow: '0 0 2px black'
          }}>
            +
          </div>
        </div>
      )}

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

    </>
  );
}
