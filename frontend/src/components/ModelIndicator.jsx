import React from 'react';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

const ModelIndicator = ({ position, isHovered, modelStats, heldItem }) => {
  // Don't show indicator if no item is held and model is hovered
  if (!heldItem && isHovered) return null;

  // Don't show if not hovered
  if (!isHovered) return null;

  const getIndicatorText = () => {
    if (!heldItem) return '';

    const stats = modelStats || { water: 0, fertilizer1: 0, fertilizer2: 0 };
    
    switch(heldItem.type) {
      case 'waterJug':
        return `Water: ${stats.water}L`;
      case 'fertilizer':
        if (heldItem.id === 'fertilizer1') {
          return `Fertilizer 1: ${stats.fertilizer1}g`;
        } else {
          return `Fertilizer 2: ${stats.fertilizer2}g`;
        }
      default:
        return '';
    }
  };

  const getIndicatorColor = () => {
    if (!heldItem) return 'black';

    switch(heldItem.type) {
      case 'waterJug':
        return '#black';
      case 'fertilizer':
        return 'black';
      default:
        return 'black';
    }
  };

  return (
    <Billboard
      position={[position[0], position[1] + 0.5, position[2]]}
      follow={true}
    >
      <Text
        fontSize={0.5}
        color={getIndicatorColor()}
        anchorX="center"
        anchorY="middle"
      >
        {getIndicatorText()}
      </Text>
    </Billboard>
  );
};

export default ModelIndicator; 