import React, { useEffect, useRef, useState } from 'react';
import Home from './Home';
import VRScene from './components/VRScene';
import VideoChat from './VideoChat';

const App = () => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('vr'); // default to VR
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // Toggle view
  const toggleView = () => {
    setCurrentView(prev => prev === 'vr' ? 'video' : 'vr');
  };

  const handleJoinRoom = (roomId, userName) => {
    setCurrentRoom(roomId);
    setCurrentUser(userName);
    // Update URL with both room ID and username
    const encodedUsername = encodeURIComponent(userName); // Handle special characters in username
    window.history.pushState({}, '', `/room/${roomId}/user/${encodedUsername}`);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
    setCurrentUser(null);
    // Reset URL
    window.history.pushState({}, '', '/');
  };

  // Check for room ID and username in URL on load
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/room\/([^/]+)\/user\/([^/]+)/);
    
    if (match) {
      const [, roomId, encodedUsername] = match;
      const userName = decodeURIComponent(encodedUsername);
      
      if (!currentRoom) {
        // If we have both room ID and username in the URL, automatically join
        handleJoinRoom(roomId, userName);
      }
    } else if (path.includes('/room/')) {
      // If URL is malformed or missing information, go back to home
      window.history.pushState({}, '', '/');
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/\/room\/([^/]+)\/user\/([^/]+)/);
      
      if (match) {
        const [, roomId, encodedUsername] = match;
        const userName = decodeURIComponent(encodedUsername);
        setCurrentRoom(roomId);
        setCurrentUser(userName);
      } else {
        setCurrentRoom(null);
        setCurrentUser(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (!currentRoom || !currentUser) {
    return <Home onJoinRoom={handleJoinRoom} />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* VR Scene as base layer */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        pointerEvents: currentView === 'vr' ? 'auto' : 'none' // Enable pointer events only in VR mode
      }}>
        <VRScene
          roomId={currentRoom}
          userName={currentUser}
          users={users}
          toggleView={toggleView}
          socket={socket}
        />
      </div>

      {/* Video Chat UI layer */}
      <div style={{ 
        zIndex: 1,
        pointerEvents: 'none' // Let pointer events pass through by default
      }}>
        <VideoChat
          roomId={currentRoom}
          userName={currentUser}
          toggleView={toggleView}
          currentView={currentView}
          onLeaveRoom={handleLeaveRoom}
          users={users}
          setUsers={setUsers}
          setSocket={setSocket}
        />
      </div>
    </div>
  );
};

export default App;
