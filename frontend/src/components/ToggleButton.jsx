const ToggleButton = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        padding: '12px 16px',
        backgroundColor: '#8ab4f8',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      Toggle View
    </button>
  );
  
  export default ToggleButton;