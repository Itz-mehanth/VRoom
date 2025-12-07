import React, { useEffect, useRef, useState, memo } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { useNavigate } from 'react-router-dom';

/* --- Components --- */

import {
  Mic, MicOff, Video, VideoOff, ScreenShare, Box, PhoneOff, Send, ArrowLeft, MessageSquare, X, LayoutGrid, Glasses, Maximize, Search
} from 'lucide-react';

/* --- Components --- */

const Icons = {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  AR: Box,
  Hangup: PhoneOff,
  Send,
  Back: ArrowLeft,
  Chat: MessageSquare,
  Close: X,
  Grid: LayoutGrid,
  Vr: Glasses,
  Fullscreen: Maximize,
  Search
};

const ChatMessage = ({ message, currentUserId }) => {
  const isSystem = message.type === 'system';
  const isCurrentUser = message.userId === currentUserId;

  return (
    <div style={{
      marginBottom: '16px',
      display: 'flex',
      flexDirection: isSystem ? 'row' : (isCurrentUser ? 'row-reverse' : 'row'),
      alignItems: 'flex-start',
      gap: '12px',
      width: '100%',
      justifyContent: isSystem ? 'center' : 'flex-start'
    }}>
      {!isSystem && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eee', overflow: 'hidden', flexShrink: 0 }}>
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.userName}`} alt="Avatar" style={{ width: '100%', height: '100%' }} />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isCurrentUser ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
        {!isSystem && !isCurrentUser && <span style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4 }}>{message.userName}</span>}
        <div style={{
          backgroundColor: isSystem ? 'transparent' : (isCurrentUser ? '#F0F2F5' : '#fff'),
          color: isSystem ? '#999' : '#1a1a1a',
          padding: isSystem ? '0' : '12px 16px',
          borderRadius: isSystem ? '0' : '16px',
          borderTopLeftRadius: isCurrentUser ? '16px' : '4px',
          borderTopRightRadius: isCurrentUser ? '4px' : '16px',
          fontSize: '0.9rem',
          fontStyle: isSystem ? 'italic' : 'normal',
          boxShadow: isSystem ? 'none' : '0 2px 5px rgba(0,0,0,0.03)',
          border: isSystem ? 'none' : '1px solid #f0f0f0'
        }}>
          {message.content}
        </div>
        {!isSystem && <span style={{ fontSize: '0.7rem', color: '#ccc', marginTop: 4 }}>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
      </div>
    </div>
  );
};

const Snackbar = ({ message, show }) => (
  <div style={{
    position: 'absolute',
    bottom: '90px',
    left: '50%',
    transform: `translateX(-50%) translateY(${show ? '0' : '20px'})`,
    backgroundColor: '#323232',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 4000,
    opacity: show ? 1 : 0,
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.95rem'
  }}>
    <span>ℹ️</span> {message}
  </div>
);

// Video Component
const VideoTile = memo(({ stream, peerId, isLocal, userName, isVideoEnabled, isAudioEnabled, isFocused, onClick, small, error }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(console.error);
    }
  }, [stream]);

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: small ? '16px' : '24px',
        overflow: 'hidden',
        backgroundColor: '#202124',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: isFocused ? '2px solid #C9F31D' : 'none',
        pointerEvents: 'auto'
      }}
    >
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isLocal ? 'scaleX(-1)' : 'none' }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#333', color: '#ea4335', textAlign: 'center', padding: '10px' }}>
          {/* Show Error if exists, else Avatar */}
          {stream === null && isLocal && (
            <div style={{ marginBottom: 8, fontSize: '0.8rem', fontWeight: 'bold' }}>
              {error || 'Camera Unavailable'}
            </div>
          )}
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt={userName} style={{ width: '60%', height: '60%', borderRadius: '50%', opacity: 0.5 }} />
        </div>
      )}

      <div style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        background: 'rgba(0,0,0,0.5)',
        padding: '4px 12px',
        borderRadius: '12px',
        color: 'white',
        fontSize: '0.8rem',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
        <span>{isLocal ? 'You' : userName}</span>
        {!isAudioEnabled && <span style={{ color: '#ea4335' }}><Icons.MicOff /></span>}
      </div>
    </div>
  );
});


const VideoChat = ({
  roomId,
  userName,
  onLeaveRoom,
  toggleView,
  users,
  setUsers,
  currentView,
  setSocket,
  setEnterAr,
  enterAr
}) => {
  const videoRef = useRef();
  const peerInstanceRef = useRef();

  const socketRef = useRef();
  const callsRef = useRef({}); // Track active calls to prevent GC
  const [myPeerId, setMyPeerId] = useState(null);
  const [connectedPeers, setConnectedPeers] = useState(new Set());
  const [peerStreams, setPeerStreams] = useState(new Map());
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [focusedVideo, setFocusedVideo] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const chatContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(false); // Default hidden

  const [notification, setNotification] = useState('');
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // --- Socket Logic ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socketRef.current.emit('send-message', newMessage.trim());
      setNewMessage('');
    }
  };

  const getCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      setCameraError(null);
      return stream;
    } catch (err) {
      console.error("Camera Error:", err);
      setCameraError(err.name + ": " + err.message);
      return null;
    }
  };

  const connectToNewUser = (userId, stream) => {
    try {
      console.log('[Peer] Calling user:', userId);
      const call = peerInstanceRef.current.call(userId, stream);
      callsRef.current[userId] = call;

      call.on('stream', remoteStream => {
        console.log('[Peer] Received remote stream from callee:', userId);
        setPeerStreams(prev => { const n = new Map(prev); n.set(userId, remoteStream); return n; });
        setConnectedPeers(prev => new Set([...prev, userId]));
      });
      call.on('close', () => {
        console.log('[Peer] Call closed with:', userId);
        setPeerStreams(prev => { const n = new Map(prev); n.delete(userId); return n; });
        setConnectedPeers(prev => { const n = new Set(prev); n.delete(userId); return n; });
        delete callsRef.current[userId];
      });
      call.on('error', (err) => {
        console.error('[Peer] Call error:', err);
        delete callsRef.current[userId];
      });
    } catch (error) { console.error("Call failed:", error); }
  };

  useEffect(() => {
    let mounted = true;
    let myStream = null;

    const init = async () => {
      try {
        const stream = await getCameraStream();
        if (!mounted) return;
        myStream = stream;
        setLocalStream(stream);

        // Auto-detect production: if page is HTTPS or on netlify/render domain
        const isProd = window.location.protocol === 'https:' ||
          window.location.hostname.includes('netlify.app') ||
          window.location.hostname.includes('onrender.com');

        const hostname = window.location.hostname;
        const backendUrl = isProd ? 'https://vrroom-x6vw.onrender.com' : `http://${hostname}:3001`;

        console.log('[VideoChat] Environment:', isProd ? 'Production' : 'Development');
        console.log('[VideoChat] Backend URL:', backendUrl);

        const socket = io(backendUrl, {
          secure: isProd,
          rejectUnauthorized: false,
          transports: ['polling'], // Force polling only - WebSocket fails on Render
          reconnectionDelayMax: 10000,
          reconnectionAttempts: 5
        });
        socketRef.current = socket;
        setSocket(socket);

        const peer = new Peer(undefined, {
          host: isProd ? 'vrroom-x6vw.onrender.com' : hostname,
          port: isProd ? 443 : 3001,
          path: '/peerjs',
          secure: isProd,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' }
            ]
          }
        });
        peerInstanceRef.current = peer;

        // --- Socket.IO Connection Debugging ---
        socket.on('connect', () => {
          console.log('[Socket] ✅ Connected to server');
          console.log('[Socket] Socket ID:', socket.id);
        });

        socket.on('connect_error', (error) => {
          console.error('[Socket] ❌ Connection error:', error.message);
          console.error('[Socket] Error details:', error);
        });

        socket.on('disconnect', (reason) => {
          console.warn('[Socket] ⚠️ Disconnected:', reason);
          if (reason === 'io server disconnect') {
            console.log('[Socket] Server disconnected, attempting reconnect...');
            socket.connect();
          }
        });

        socket.on('reconnect', (attemptNumber) => {
          console.log('[Socket] 🔄 Reconnected after', attemptNumber, 'attempts');
        });

        socket.on('reconnect_attempt', (attemptNumber) => {
          console.log('[Socket] 🔄 Reconnection attempt', attemptNumber);
        });

        socket.on('reconnect_error', (error) => {
          console.error('[Socket] ❌ Reconnection error:', error.message);
        });

        socket.on('reconnect_failed', () => {
          console.error('[Socket] ❌ Reconnection failed - giving up');
        });

        // --- Peer Listeners ---
        peer.on('call', call => {
          console.log('[Peer] Received incoming call from:', call.peer);
          callsRef.current[call.peer] = call;
          call.answer(stream);
          call.on('stream', remoteStream => {
            console.log('[Peer] Received remote stream from:', call.peer);
            setPeerStreams(prev => { const n = new Map(prev); n.set(call.peer, remoteStream); return n; });
            setConnectedPeers(prev => new Set([...prev, call.peer]));
          });
        });

        peer.on('error', (error) => {
          console.error('[Peer] ❌ Error:', error);
        });

        peer.on('open', id => {
          console.log('[Peer] My ID:', id);
          setMyPeerId(id);
          // Only join room after Peer is ready AND we have stream
          console.log('[Socket] Attempting to join room:', roomId, 'with ID:', id);
          if (socket.connected) {
            console.log('[Socket] Socket already connected, joining room immediately');
            socket.emit('join-room', roomId, id, userName);
          } else {
            console.log('[Socket] Socket not connected yet, waiting for connection...');
            socket.once('connect', () => {
              console.log('[Socket] Socket connected, now joining room');
              socket.emit('join-room', roomId, id, userName);
            });
          }
        });

        // --- Socket Listeners ---
        socket.on('user-connected', ({ userId, userName }) => {
          console.log('[Socket] User connected:', userId, userName);

          setUsers(prev => {
            if (prev.find(u => u.userId === userId)) return prev;
            return [...prev, { userId, name: userName, id: userId }]; // Add new user to state to trigger rendering
          });

          setNotification(`${userName || 'User'} joined`);
          setTimeout(() => setNotification(''), 3000);

          // Initiate call since we are the existing user
          connectToNewUser(userId, stream);
        });

        socket.on('user-disconnected', ({ userId, userName }) => {
          setNotification(`${userName} left`);
          setTimeout(() => setNotification(''), 3000);
          setPeerStreams(prev => { const n = new Map(prev); n.delete(userId); return n; });
          setConnectedPeers(prev => { const n = new Set(prev); n.delete(userId); return n; });
        });

        socket.on('room-users', (roomUsers) => setUsers(roomUsers));

        socket.on('chat-message', (msg) => {
          setMessages(prev => [...prev, msg]);
          setTimeout(() => chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' }), 100);
        });

      } catch (err) {
        console.error("Failed to initialize VideoChat:", err);
      }
    };

    init();

    return () => {
      mounted = false;
      socketRef.current?.disconnect();
      peerInstanceRef.current?.destroy();
      if (myStream) myStream.getTracks().forEach(t => t.stop());
    }
  }, [roomId, userName]);


  /* --- Layout Logic --- */
  const featuredPeerId = focusedVideo === 'local' ? null : (focusedVideo || null);
  const showLocalAsFeatured = focusedVideo === 'local';
  const showFeatured = !!featuredPeerId || showLocalAsFeatured;

  const featuredStream = showLocalAsFeatured ? localStream : peerStreams.get(featuredPeerId);
  const featuredName = showLocalAsFeatured ? `${userName} (You)` : (users.find(u => u.id === featuredPeerId)?.name || 'Peer');

  const thumbnails = [];
  if (localStream && !showLocalAsFeatured) thumbnails.push({ id: 'local', stream: localStream, name: `${userName} (You)`, isLocal: true });

  peerStreams.forEach((stream, id) => {
    if (id !== featuredPeerId) {
      thumbnails.push({ id, stream, name: users.find(u => u.id === id)?.name || 'Peer', isLocal: false });
    }
  });

  // Filter users for search
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = users.filter(u => (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: 'transparent', overflow: 'hidden', pointerEvents: 'none', flexDirection: isMobile ? 'column' : 'row' }}>

      {/* Main Stage */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

        {/* Top Control Bar (Room Info etc) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          zIndex: 1000,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={onLeaveRoom} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', color: 'white' }}>
              <Icons.Back />
            </button>
          </div>

          {/* Center: View Toggle */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', borderRadius: '24px', padding: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => currentView !== 'video' && toggleView()}
              style={{
                background: currentView === 'video' ? '#333' : 'transparent',
                color: currentView === 'video' ? 'white' : '#aaa',
                border: 'none', borderRadius: '20px', padding: '8px 20px',
                fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
              }}
            >
              <Icons.Grid style={{ width: 18, height: 18 }} stroke={currentView === 'video' ? 'white' : '#aaa'} />
              {!isMobile && "grid"}
            </button>
            <button
              onClick={() => currentView !== 'vr' && toggleView()}
              style={{
                background: currentView === 'vr' ? '#333' : 'transparent',
                color: currentView === 'vr' ? 'white' : '#aaa',
                border: 'none', borderRadius: '20px', padding: '8px 20px',
                fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
              }}
            >
              <Icons.Vr style={{ width: 18, height: 18 }} stroke={currentView === 'vr' ? 'white' : '#aaa'} />
              {!isMobile && "3D world"}
            </button>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Info Only */}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', overflow: 'hidden' }}>
          {/* VR / Video Logic */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: currentView === 'video' || showFeatured ? 'block' : 'none' }}>
            {showFeatured && (
              <VideoTile stream={featuredStream} isLocal={showLocalAsFeatured} userName={featuredName} isFocused={true} isAudioEnabled={true} onClick={() => setFocusedVideo(null)} />
            )}
            {currentView === 'video' && !showFeatured && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
                padding: '64px 24px 100px',
                height: '100%',
                alignContent: 'center',
                overflowY: 'auto',
                backgroundColor: '#131313' // Solid background to hide 3D scene
              }}>
                <VideoTile stream={localStream} isLocal={true} userName="You" isAudioEnabled={isAudioEnabled} error={cameraError} />

                {Array.from(new Set([...users.map(u => u.id), ...peerStreams.keys()]))
                  .filter(id => id !== myPeerId)
                  .map(peerId => {
                    const peerUser = users.find(u => u.id === peerId);
                    const stream = peerStreams.get(peerId);
                    return (
                      <VideoTile
                        key={peerId}
                        stream={stream}
                        userName={peerUser ? peerUser.name : 'Guest User'}
                        isLocal={false}
                        isAudioEnabled={true}
                        error={stream ? null : 'Waiting for video...'}
                      />
                    );
                  })}
              </div>
            )}
          </div>

          {/* Self View in VR */}
          {currentView === 'vr' && localStream && (
            <div style={{ position: 'absolute', bottom: '100px', right: '24px', width: '200px', borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', zIndex: 50 }}>
              <VideoTile stream={localStream} isLocal={true} userName="You" isAudioEnabled={isAudioEnabled} small />
            </div>
          )}

          {/* Thumbnails Strip (Desktop Only, Video Mode) */}
          {currentView === 'video' && showFeatured && !isMobile && (
            <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', width: '180px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '80%', overflowY: 'auto' }}>
              {thumbnails.map(t => (
                <div key={t.id} style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: '2px solid transparent' }}>
                  <VideoTile stream={t.stream} isLocal={t.isLocal} userName={t.name} small onClick={() => setFocusedVideo(t.id === 'local' ? 'local' : t.id)} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Dock Control Bar */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          padding: '12px 24px',
          background: '#202124',
          borderRadius: '24px',
          border: '1px solid #333',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          zIndex: 2000,
          pointerEvents: 'auto',
          alignItems: 'center'
        }}>
          <button onClick={() => setIsAudioEnabled(!isAudioEnabled)} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: isAudioEnabled ? '#3C4043' : '#ea4335', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isAudioEnabled ? <Icons.Mic color="white" size={20} /> : <Icons.MicOff color="white" size={20} />}
          </button>
          <button onClick={() => setIsVideoEnabled(!isVideoEnabled)} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: isVideoEnabled ? '#3C4043' : '#ea4335', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isVideoEnabled ? <Icons.Video color="white" size={20} /> : <Icons.VideoOff color="white" size={20} />}
          </button>

          <div style={{ width: 1, height: 24, background: '#555', margin: '0 8px' }} />

          <button onClick={() => setIsScreenSharing(!isScreenSharing)} style={{ width: 44, height: 44, borderRadius: '12px', border: 'none', background: isScreenSharing ? '#8AB4F8' : '#3C4043', color: isScreenSharing ? '#202124' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.ScreenShare color={isScreenSharing ? '#202124' : 'white'} size={20} />
          </button>

          <button onClick={() => { if (currentView !== 'vr') toggleView(); }} title="Enter VR Mode" style={{ width: 44, height: 44, borderRadius: '12px', border: 'none', background: currentView === 'vr' ? '#8AB4F8' : '#3C4043', color: currentView === 'vr' ? '#202124' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Vr color={currentView === 'vr' ? '#202124' : 'white'} size={20} />
          </button>

          <button onClick={() => setEnterAr(!enterAr)} title="Enter AR Mode" style={{ width: 44, height: 44, borderRadius: '12px', border: 'none', background: enterAr ? '#8AB4F8' : '#3C4043', color: enterAr ? '#202124' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.AR color={enterAr ? '#202124' : 'white'} size={20} />
          </button>

          <button onClick={() => setShowSidebar(!showSidebar)} style={{ width: 44, height: 44, borderRadius: '12px', border: 'none', background: showSidebar ? '#8AB4F8' : '#3C4043', color: showSidebar ? '#202124' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Chat color={showSidebar ? '#013ef7ff' : 'white'} size={20} />
          </button>

          <button onClick={() => { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); }} style={{ width: 44, height: 44, borderRadius: '12px', border: 'none', background: '#3C4043', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Fullscreen color="white" size={20} />
          </button>

          <div style={{ width: 1, height: 24, background: '#555', margin: '0 8px' }} />

          <button onClick={onLeaveRoom} style={{ padding: '0 24px', height: 44, borderRadius: '24px', border: 'none', background: '#ea4335', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Hangup color="white" size={20} style={{ marginRight: 8 }} />
            <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>End</span>
          </button>
        </div>

      </div>

      <Snackbar message={notification} show={!!notification} />

      {/* Right Sidebar - Logic to push content (flex) on Desktop */}
      {showSidebar && (
        <div style={{
          width: isMobile ? '100%' : '360px',
          height: '100%',
          backgroundColor: '#202124', // Dark Theme
          borderLeft: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 3000,
          position: isMobile ? 'absolute' : 'relative',
          top: 0,
          right: 0,

          pointerEvents: 'auto',
          boxShadow: isMobile ? '0 0 0 1000px rgba(0,0,0,0.5)' : 'none'
        }}>
          {/* Header */}
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
            <h3 style={{ margin: 0, color: '#e8eaed', fontSize: '1.2rem' }}>Meeting Info</h3>
            <button onClick={() => setShowSidebar(false)} style={{ background: 'none', border: 'none', color: '#e8eaed', cursor: 'pointer' }}><Icons.Close stroke="white" /></button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
            <button
              onClick={() => setActiveTab('people')}
              style={{ flex: 1, padding: '12px', background: 'none', border: 'none', color: activeTab === 'people' ? '#8AB4F8' : '#aaa', borderBottom: activeTab === 'people' ? '2px solid #8AB4F8' : 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              People ({users.length + 1})
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              style={{ flex: 1, padding: '12px', background: 'none', border: 'none', color: activeTab === 'chat' ? '#8AB4F8' : '#aaa', borderBottom: activeTab === 'chat' ? '2px solid #8AB4F8' : 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Chat
            </button>
          </div>

          {/* PEOPLE TAB */}
          {activeTab === 'people' && (
            <>
              {/* Search */}
              <div style={{ padding: '12px 20px' }}>
                <div style={{ position: 'relative', background: '#333', borderRadius: '24px', padding: '10px 16px', display: 'flex', alignItems: 'center' }}>
                  <Icons.Search style={{ width: 18, height: 18, marginRight: '8px', opacity: 0.7 }} />
                  <input
                    type="text"
                    placeholder="Search people"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '0.9rem', width: '100%', outline: 'none' }}
                  />
                </div>
              </div>

              {/* List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
                <p style={{ color: '#9aa0a6', fontSize: '0.8rem', fontWeight: 600, marginTop: '8px', marginBottom: '16px' }}>IN MEETING ({users.length + 1})</p>

                {/* Me */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#8AB4F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#202124' }}>
                      {(userName || 'U')[0]}
                    </div>
                    <div>
                      <div style={{ color: '#e8eaed', fontWeight: 500 }}>{userName || 'You'} <span style={{ color: '#9aa0a6' }}>(You)</span></div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ color: isAudioEnabled ? '#e8eaed' : '#ea4335' }}>{isAudioEnabled ? <Icons.Mic style={{ width: 18 }} /> : <Icons.MicOff style={{ width: 18 }} />}</div>
                    <div style={{ color: isVideoEnabled ? '#e8eaed' : '#ea4335' }}>{isVideoEnabled ? <Icons.Video style={{ width: 18 }} /> : <Icons.VideoOff style={{ width: 18 }} />}</div>
                  </div>
                </div>

                {/* Others */}
                {filteredUsers.filter(u => u.id !== myPeerId).map(u => (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fb8c00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
                        {(u.name || 'U')[0]}
                      </div>
                      <div>
                        <div style={{ color: '#e8eaed', fontWeight: 500 }}>{u.name || 'Guest User'}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', color: '#e8eaed' }}>
                      <Icons.MicOff style={{ width: 18, opacity: 0.5 }} />
                      <Icons.VideoOff style={{ width: 18, opacity: 0.5 }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div
                ref={chatContainerRef}
                style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }}
              >
                {messages.length === 0 && (
                  <div style={{ color: '#aaa', textAlign: 'center', marginTop: '40px', fontStyle: 'italic' }}>
                    No messages yet. Say hello!
                  </div>
                )}
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} currentUserId={myPeerId || 'me'} />
                ))}
              </div>
              <div style={{ padding: '16px', background: '#202124', borderTop: '1px solid #333' }}>
                <form onSubmit={handleSendMessage} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  background: '#333',
                  borderRadius: '24px',
                  padding: '4px 8px 4px 20px',
                  width: '100%',
                  boxSizing: 'border-box' // Ensure padding doesn't overflow width
                }}>
                  <input
                    type="text"
                    placeholder="Send a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      outline: 'none',
                      fontSize: '0.9rem',
                      padding: '10px 0'
                    }}
                  />
                  <button type="submit" style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#8AB4F8',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icons.Send style={{ width: 20, height: 20 }} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}  </div>
  );
};

export default VideoChat;