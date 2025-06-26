import React from 'react';
import LabelBillboard from './LabelBillboard';
import { Billboard, Text } from '@react-three/drei';

const ModelIndicator = ({ position, name, isHovered, modelStats, heldItem }) => {
  // Always show indicator, regardless of device or hover state

  const getIndicatorText = () => {
    if (!heldItem) return '';
    if (!modelStats) return 'loading...';
    const value = modelStats['nutrients'][heldItem.category] || 0;
    return `${heldItem.category}: ${value}`;
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