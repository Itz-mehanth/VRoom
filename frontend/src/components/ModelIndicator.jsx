import React from 'react';
import LabelBillboard from './LabelBillboard';
import { Billboard, Text } from '@react-three/drei';

const ModelIndicator = ({ position, name, isHovered, modelStats, heldItem }) => {
  // Don't show indicator if no item is held and model is hovered
  if (!heldItem && isHovered) return null;

  // Don't show if not hovered
  if (!isHovered) return (
    <Billboard position={position}>
      <Text fontSize={0.2} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </Billboard>
  );

  const getIndicatorText = () => {
    if (!heldItem) return '';

    const stats = modelStats || { water: 0, fertilizer1: 0, fertilizer2: 0 };
    
    switch(heldItem.type) {
      case 'asset':
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
    if (!heldItem) return '#2C3E50';

    switch(heldItem.type) {
      case 'asset':
        return '#2980B9'; // Professional blue
      case 'fertilizer':
        return '#27AE60'; // Professional green
      default:
        return '#2C3E50'; // Professional dark blue
    }
  };

  return (
    <LabelBillboard
      position={position}
      name={name}
      text={getIndicatorText()}
      color={getIndicatorColor()}
      maxDistance={30}
      minOpacity={0.4}
    />
  );
};

export default ModelIndicator; 