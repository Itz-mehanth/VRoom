import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Home from './Home';
import VRScene from './components/VRScene';
import VideoChat from './VideoChat';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ARPage from './components/ARPage';
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Room = () => {
  const { roomId, userId } = useParams();
  const { currentUser } = useAuth();
  const [currentView, setCurrentView] = useState('vr');
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [enterAr, setEnterAr] = useState(false);
  const query = useQuery();
  const lat = query.get("lat");
  const lng = query.get("lng");
  const coords = lat && lng ? [parseFloat(lat), parseFloat(lng)] : null;

  // Toggle view
  const toggleView = () => {
    setCurrentView(prev => prev === 'vr' ? 'video' : 'vr');
  };

  if (!currentUser || currentUser.uid !== userId) {
    return <div>Unauthorized access</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {!enterAr &&
        <>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0,
          pointerEvents: currentView === 'vr' ? 'auto' : 'none'
        }}>
          <VRScene
            coords={coords}
            roomId={roomId}
            userName={currentUser.displayName}
            users={users}
            toggleView={toggleView}
            socket={socket}
            enterAr={enterAr}
            />
        </div>
        </>
      }

      {enterAr && (
           <ARPage coords={coords} onExit={() => setEnterAr(false)} />
      )}

      <div style={{ 
        zIndex: 1,
        pointerEvents: 'none'
      }}>
          <VideoChat
            roomId={roomId}
            userName={currentUser.displayName}
            toggleView={toggleView}
            currentView={currentView}
            users={users}
            setUsers={setUsers}
            setSocket={setSocket}
            setEnterAr = {setEnterAr}
            enterAr={enterAr}
          />
        </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId/user/:userId" element={<Room />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
