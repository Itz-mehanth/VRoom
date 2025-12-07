import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Search, Flower, FlaskConical, Droplet } from 'lucide-react';
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
  enterAr,
  onOpenMarketplace // Added prop
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

      {/* Explore Button */}
      {/* Explore Button - Top Left */}
      <button
        onClick={onOpenMarketplace}
        style={{
          position: 'fixed',
          top: '80px', // Moved down to avoid VideoChat bar overlap (64px)
          left: '20px',
          zIndex: 4000, // Higher than other UI
          padding: '10px 16px',
          backgroundColor: '#ffffff',
          color: '#059669',
          border: '1px solid #d1fae5',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'all 0.2s',
          width: 'auto',
          pointerEvents: 'auto'
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}
      >
        <Search size={18} color="#059669" />
        <span>Explore Plants</span>
      </button>

      {/* Inventory Toggles - Top Left (Offset) */}
      <div style={{ position: 'fixed', top: '80px', left: '180px', display: 'flex', gap: '12px', zIndex: 4000, pointerEvents: 'auto' }}>
        {/* Plants Toggle */}
        <button
          onClick={() => { setIsPlantListOpen(!isPlantListOpen); setIsFertilizerListOpen(false); setIsAssetListOpen(false); }}
          style={{
            width: '40px', height: '40px', borderRadius: '50%', border: 'none',
            backgroundColor: isPlantListOpen ? '#059669' : 'white',
            color: isPlantListOpen ? 'white' : '#4b5563',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <Flower size={20} color={isPlantListOpen ? 'white' : '#4b5563'} />
        </button>

        {/* Fertilizer Toggle */}
        <button
          onClick={() => { setIsFertilizerListOpen(!isFertilizerListOpen); setIsPlantListOpen(false); setIsAssetListOpen(false); }}
          style={{
            width: '40px', height: '40px', borderRadius: '50%', border: 'none',
            backgroundColor: isFertilizerListOpen ? '#059669' : 'white',
            color: isFertilizerListOpen ? 'white' : '#4b5563',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <FlaskConical size={20} color={isFertilizerListOpen ? 'white' : '#4b5563'} />
        </button>

        {/* Assets Toggle */}
        <button
          onClick={() => { setIsAssetListOpen(!isAssetListOpen); setIsPlantListOpen(false); setIsFertilizerListOpen(false); }}
          style={{
            width: '40px', height: '40px', borderRadius: '50%', border: 'none',
            backgroundColor: isAssetListOpen ? '#059669' : 'white',
            color: isAssetListOpen ? 'white' : '#4b5563',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <Droplet size={20} color={isAssetListOpen ? 'white' : '#4b5563'} />
        </button>
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

    </>
  );
}
