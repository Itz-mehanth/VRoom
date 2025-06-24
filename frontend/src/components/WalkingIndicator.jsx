import React from 'react';

const WalkingIndicator = ({ isWalking }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      backgroundColor: isWalking ? '#4CAF50' : '#f44336',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '20px',
      fontWeight: 'bold',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: isWalking ? 1 : 0.5
      }} />
      {/* {isWalking ? 'Walking' : 'Idle'} */}
    </div>
  );
};

export default WalkingIndicator; 