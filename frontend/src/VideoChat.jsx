import React, { useEffect, useRef, useState, memo } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const ChatMessage = ({ message, currentUserId }) => {
    const isSystem = message.type === 'system';
    const isCurrentUser = message.userId === currentUserId;
  
    return (
      <div style={{
        marginBottom: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSystem ? 'center' : (isCurrentUser ? 'flex-end' : 'flex-start'),
        width: '100%'
      }}>
        {!isSystem && (
          <div style={{ 
            fontSize: '0.8125rem', 
            color: '#9aa0a6',
            marginBottom: '4px',
            paddingLeft: isCurrentUser ? '0' : '8px',
            paddingRight: isCurrentUser ? '8px' : '0'
          }}>
            {isCurrentUser ? 'You' : message.userName}
          </div>
        )}
        <div style={{
          backgroundColor: isSystem ? '#303134' : (isCurrentUser ? '#8ab4f8' : '#3c4043'),
          color: isSystem ? '#9aa0a6' : (isCurrentUser ? '#202124' : 'white'),
          padding: '8px 12px',
          borderRadius: '8px',
          maxWidth: '80%',
          wordBreak: 'break-word',
          fontSize: isSystem ? '0.8125rem' : '0.875rem',
          fontStyle: isSystem ? 'italic' : 'normal'
        }}>
          {message.content}
        </div>
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#9aa0a6',
          marginTop: '4px',
          paddingLeft: isCurrentUser ? '0' : '8px',
          paddingRight: isCurrentUser ? '8px' : '0'
        }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    );
  };
  
  // Separate VideoContainer component
  const VideoContainer = memo(({ stream, peerId, isLocal, userName, isVideoEnabled, isAudioEnabled, users, focusedVideo, setFocusedVideo }) => {
    const videoRef = useRef();
    const isFocused = focusedVideo === (isLocal ? 'local' : peerId);
    const containerStyle = {
      position: 'relative',
      paddingTop: '56.25%',
      backgroundColor: '#3c4043',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      gridColumn: isFocused ? '1 / -1' : 'auto',
      gridRow: isFocused ? '1 / span 2' : 'auto',
    };
  
    const displayName = isLocal ? `${userName} (You)` : users.find(u => u.id === peerId)?.name || 'Unknown';
    const isVideoOff = isLocal ? !isVideoEnabled : false;
  
    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.error);
      }
    }, [stream]);
  
    return (
      <div
        style={containerStyle}
        onClick={() => setFocusedVideo(isFocused ? null : (isLocal ? 'local' : peerId))}
      >
        {stream && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: isVideoOff ? 'none' : 'block'
            }}
          />
        )}
        {isVideoOff && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#8ab4f8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: '#202124'
            }}>
              {displayName[0].toUpperCase()}
            </div>
            <div style={{
              color: '#fff',
              fontSize: '1rem'
            }}>
              Camera Off
            </div>
          </div>
        )}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>{displayName}</span>
            {isLocal && (
              <span style={{ opacity: 0.8 }}>
                {!isAudioEnabled && '🔇'}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  });
  
  // Separate VideoGrid component
  const VideoGrid = memo(({ 
    localStream, 
    peerStreams, 
    userName, 
    isVideoEnabled, 
    isAudioEnabled, 
    users, 
    focusedVideo, 
    setFocusedVideo 
  }) => {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        padding: '16px',
        height: '100%',
        overflow: 'auto',
        pointerEvents: 'auto'
      }}>
        {localStream && (
          <VideoContainer
            stream={localStream}
            isLocal={true}
            userName={userName}
            isVideoEnabled={isVideoEnabled}
            isAudioEnabled={isAudioEnabled}
            users={users}
            focusedVideo={focusedVideo}
            setFocusedVideo={setFocusedVideo}
          />
        )}
        {Array.from(peerStreams).map(([peerId, stream]) => (
          <VideoContainer
            key={peerId}
            stream={stream}
            peerId={peerId}
            isLocal={false}
            userName={userName}
            isVideoEnabled={isVideoEnabled}
            isAudioEnabled={isAudioEnabled}
            users={users}
            focusedVideo={focusedVideo}
            setFocusedVideo={setFocusedVideo}
          />
        ))}
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
    setSocket
  }) => {
    const videoRef = useRef();
    const peerInstanceRef = useRef();
    const socketRef = useRef();
    const [myPeerId, setMyPeerId] = useState(null);
    const [connectedPeers, setConnectedPeers] = useState(new Set());
    const [peerStreams, setPeerStreams] = useState(new Map());
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
    const [focusedVideo, setFocusedVideo] = useState(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [localStream, setLocalStream] = useState(null);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [screenStream, setScreenStream] = useState(null);
    const previousStreamRef = useRef(null);
    const chatContainerRef = useRef(null);
    const transformDataRef = useRef(new Map());
    const animationStateRef = useRef(new Map());
    const [notification, setNotification] = useState('');
  
    // Function to handle transform updates with animation state check
    const handleTransformUpdate = (userName, transformData) => {
      // If user is currently animating, ignore the update
      if (animationStateRef.current.get(userName)) {
        return;
      }

      // Set animation state to true
      animationStateRef.current.set(userName, true);

      // Update users with new position/rotation
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.name === userName) {
            return {
              ...user,
              ...transformData,
              isAnimating: true
            };
          }
          return user;
        });
      });

      // Set a timeout to mark animation as complete
      setTimeout(() => {
        animationStateRef.current.set(userName, false);
        setUsers(prevUsers => {
          return prevUsers.map(user => {
            if (user.name === userName) {
              return {
                ...user,
                isAnimating: false
              };
            }
            return user;
          });
        });
      }, 1000); // Adjust this value based on your animation duration
    };
  
    // Function to update user transform data without triggering re-render
    const updateUserTransform = (userName, data) => {
      const currentData = transformDataRef.current.get(userName) || {};
      transformDataRef.current.set(userName, {
        ...currentData,
        ...data,
        isAnimating: animationStateRef.current.get(userName) || false
      });
    };
  
    // Function to get latest transform data for a user
    const getUserTransform = (userName) => {
      return transformDataRef.current.get(userName) || {};
    };
  
    // Function to get camera stream
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        return stream;
      } catch (error) {
        console.error('Error getting camera stream:', error);
        throw error;
      }
    };
  
    // Function to switch stream for all peer connections
    const switchStreamForPeers = async (newStream) => {
      const peers = Array.from(connectedPeers);
      
      // Store video/audio states
      const wasVideoEnabled = isVideoEnabled;
      const wasAudioEnabled = isAudioEnabled;
  
      // Stop all tracks in the old stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
  
      // Set the new stream
      setLocalStream(newStream);
  
      // Set initial track states based on previous states
      newStream.getVideoTracks().forEach(track => {
        track.enabled = wasVideoEnabled;
      });
      newStream.getAudioTracks().forEach(track => {
        track.enabled = wasAudioEnabled;
      });
  
      // Update all peer connections with the new stream
      peers.forEach(peerId => {
        const calls = peerInstanceRef.current.connections[peerId];
        calls?.forEach(call => {
          // Replace tracks in the peer connection
          call.peerConnection?.getSenders().forEach(sender => {
            const track = newStream.getTracks().find(t => t.kind === sender.track.kind);
            if (track) {
              sender.replaceTrack(track);
            }
          });
        });
      });
    };
  
    const startScreenShare = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            cursor: "always"
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true
          }
        });
  
        // Save current stream to restore later
        if (!isScreenSharing) {
          previousStreamRef.current = localStream;
        }
  
        // Handle stream stop
        stream.getVideoTracks()[0].addEventListener('ended', () => {
          stopScreenShare();
        });
  
        await switchStreamForPeers(stream);
        setScreenStream(stream);
        setIsScreenSharing(true);
      } catch (error) {
        console.error('Error sharing screen:', error);
        alert('Could not share screen. Please check permissions.');
      }
    };
  
    const stopScreenShare = async () => {
      try {
        // Stop all tracks in the screen share stream
        if (screenStream) {
          screenStream.getTracks().forEach(track => track.stop());
        }
  
        let newStream;
        // Restore previous stream if it exists
        if (previousStreamRef.current) {
          try {
            // Try to reuse the previous stream
            if (previousStreamRef.current.active) {
              newStream = previousStreamRef.current;
            } else {
              // If previous stream is inactive, get a new camera stream
              newStream = await getCameraStream();
            }
          } catch (error) {
            // If there's an error with the previous stream, get a new one
            newStream = await getCameraStream();
          }
        } else {
          // If no previous stream, get a new camera stream
          newStream = await getCameraStream();
        }
  
        await switchStreamForPeers(newStream);
        previousStreamRef.current = null;
        setScreenStream(null);
        setIsScreenSharing(false);
      } catch (error) {
        console.error('Error stopping screen share:', error);
        // Try to get a new camera stream as fallback
        try {
          const newStream = await getCameraStream();
          await switchStreamForPeers(newStream);
          setIsScreenSharing(false);
        } catch (fallbackError) {
          console.error('Error getting camera stream after screen share:', fallbackError);
          alert('Could not restore camera. Please refresh the page.');
        }
      }
    };
  
    useEffect(() => {
      console.log('Component mounted - Initializing connections');
  
      // Initialize animation state tracking
      animationStateRef.current = new Map();
  
      if(true){
        // Connect to socket.io backend
        const socketUrl = 'https://vrroom-x6vw.onrender.com';
        socketRef.current = io(socketUrl, {
          withCredentials: true,
          transports: ['websocket', 'polling'],
          secure: true,
          rejectUnauthorized: false,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 10000,
          autoConnect: true,
          forceNew: true
        });
    
        // Add detailed error handling
        socketRef.current.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          console.error('Error details:', {
            message: error.message,
            description: error.description,
            type: error.type,
            context: error.context
          });
          
          // Try to reconnect with polling if websocket fails
          if (error.message.includes('websocket')) {
            console.log('WebSocket failed, attempting to connect with polling...');
            socketRef.current.io.opts.transports = ['polling', 'websocket'];
          }
        });

        socketRef.current.on('connect', () => {
          console.log('Socket connected successfully');
          console.log('Transport:', socketRef.current.io.engine.transport.name);
        });

        socketRef.current.on('disconnect', (reason) => {
          console.log('Socket disconnected:', reason);
          if (reason === 'io server disconnect') {
            // Server initiated disconnect, try to reconnect
            socketRef.current.connect();
          }
        });

        socketRef.current.on('reconnect_attempt', (attemptNumber) => {
          console.log('Reconnection attempt:', attemptNumber);
        });

        socketRef.current.on('reconnect_failed', () => {
          console.error('Failed to reconnect to server');
          // Notify user about connection issues
          alert('Unable to connect to server. Please check your internet connection and try again.');
        });
    
        // Initialize peer
        peerInstanceRef.current = new Peer(undefined, {
          host: 'vrroom-x6vw.onrender.com',
          port: '443',
          path:  '/peerjs',
          secure: true,
          debug: 3
        });
      } else {
        // Connect to socket.io backend
        const socketUrl = 'https://localhost:3001';
        socketRef.current = io(socketUrl, {
          secure: true,
          rejectUnauthorized: false
        });
  
        // Initialize peer
        peerInstanceRef.current = new Peer(undefined, {
          host: 'localhost',
          port: '3001',
          path: '/peerjs',
          secure: true,
          debug: 3
        });
      }

      // Handle socket connection
      socketRef.current.on('connect', () => {
        console.log('Socket connected, waiting for peer ID...');
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      peerInstanceRef.current.on('open', id => {
        console.log('My peer ID:', id);
        setMyPeerId(id);
        
        // Only emit join-room if socket is connected
        if (socketRef.current.connected) {
          console.log('Socket connected, emitting join-room');
          socketRef.current.emit('join-room', roomId, id, userName);
        } else {
          console.log('Socket not connected, waiting for connection...');
          socketRef.current.once('connect', () => {
            console.log('Socket connected, now emitting join-room');
            socketRef.current.emit('join-room', roomId, id, userName);
          });
        }
      });

      // Pass socket instance up to parent component
      setSocket(socketRef.current);
  
      // Handle user disconnections
      socketRef.current.on('user-disconnected', userId => {
        console.log('User disconnected:', userId);
        setPeerStreams(prev => {
          const newStreams = new Map(prev);
          newStreams.delete(userId);
          return newStreams;
        });

        setConnectedPeers(prev => {
          const newPeers = new Set(prev);
          newPeers.delete(userId);
          return newPeers;
        });
      });

      // Get initial camera stream
      getCameraStream()
        .then(stream => {
          console.log('Got local media stream');
          setLocalStream(stream);
  
          // Set initial track states
          stream.getVideoTracks().forEach(track => {
            track.enabled = isVideoEnabled;
          });
          stream.getAudioTracks().forEach(track => {
            track.enabled = isAudioEnabled;
          });
  
          // Answer incoming calls
          peerInstanceRef.current.on('call', call => {
            console.log('Incoming call from peer:', call.peer);
            call.answer(stream);
            
            call.on('stream', remoteStream => {
              console.log('Received remote stream from:', call.peer);
              setPeerStreams(prev => {
                const newStreams = new Map(prev);
                newStreams.set(call.peer, remoteStream);
                return newStreams;
              });
              setConnectedPeers(prev => new Set([...prev, call.peer]));
            });
  
            call.on('close', () => {
              console.log('Call closed with peer:', call.peer);
              setPeerStreams(prev => {
                const newStreams = new Map(prev);
                newStreams.delete(call.peer);
                return newStreams;
              });
              setConnectedPeers(prev => {
                const newPeers = new Set(prev);
                newPeers.delete(call.peer);
                return newPeers;
              });
            });
          });
  
          // Handle new user connections
          console.log('Listening for user-connected events');
          socketRef.current.on('user-connected', userId => {
            console.log('New user connected:', userId);
            const newUser = users.find(user => user.id === userId);
            if (newUser) {
              setNotification(`${newUser.name} joined`);
              setTimeout(() => setNotification(''), 3000);
            }
            connectToNewUser(userId, stream);
          });
        })
        .catch(error => {
          console.error('Error accessing media devices:', error);
          alert('Could not access camera or microphone. Please check permissions.');
        });
  
      // Listen for room users updates
      socketRef.current.on('room-users', (roomUsers) => {
        console.log('Room users update received:', roomUsers);
        
        // Update transform data for new users
        roomUsers.forEach(user => {
          updateUserTransform(user.name, {
            position: user.position,
            rotation: user.rotation,
            isWalking: user.isWalking
          });
        });


        setUsers(roomUsers);

        // Handle new peer connections
        if (localStream) {
          const currentPeers = new Set(connectedPeers);
          const newPeers = roomUsers.filter(user => 
            user.id !== myPeerId && !currentPeers.has(user.id)
          );
          
          
          newPeers.forEach(user => {
            console.log('Connecting to new peer:', user.id);
            connectToNewUser(user.id, localStream);
          });
        }
      });
  
  
  
      // Listen for chat messages
      socketRef.current.on('chat-message', (message) => {
        setMessages(prev => [...prev, message]);
        // Scroll to bottom on new message
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 100);
      });
  
      // Listen for chat history
      socketRef.current.on('chat-history', (history) => {
        setMessages(history);
        // Scroll to bottom after loading history
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 100);
      });
  
      // Listen for user position/rotation updates
      socketRef.current.on('user-transform', ({ userName, position, rotation, isWalking }) => {
        updateUserTransform(userName, { position, rotation, isWalking });
        
        handleTransformUpdate(userName, {
          position,
          rotation,
          isWalking: typeof isWalking === 'boolean' ? isWalking : undefined
        });
      });
  
      // Cleanup function
      return () => {
        console.log('Component unmounting - Cleaning up connections');
        socketRef.current?.disconnect();
        peerInstanceRef.current?.destroy();
        
        // Clean up all peer connections
        setPeerStreams(new Map());
        setConnectedPeers(new Set());
        
        // Stop all tracks in the local stream
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
        }
        
        // Clear animation states
        animationStateRef.current.clear();
      };
    }, [roomId, userName, setSocket]);
  
    // Expose transform data to parent components
    useEffect(() => {
      const transformData = {};
      transformDataRef.current.forEach((data, userName) => {
        transformData[userName] = data;
      });
      window.transformData = transformData; // For debugging
    }, []);
  
    // Function to connect to a new user
    const connectToNewUser = (userId, stream) => {
      // alert('new user:', userId);
      console.log('Attempting to connect to new user:', userId);
      try {
        const call = peerInstanceRef.current.call(userId, stream);
        
        call.on('stream', remoteStream => {
          console.log('Received stream from new user:', userId);
          setPeerStreams(prev => {
            const newStreams = new Map(prev);
            newStreams.set(userId, remoteStream);
            return newStreams;
          });
          setConnectedPeers(prev => new Set([...prev, userId]));
        });
  
        call.on('close', () => {
          console.log('Call closed with user:', userId);
          setPeerStreams(prev => {
            const newStreams = new Map(prev);
            newStreams.delete(userId);
            return newStreams;
          });
          setConnectedPeers(prev => {
            const newPeers = new Set(prev);
            newPeers.delete(userId);
            return newPeers;
          });
        });
      } catch (error) {
        console.error('Error connecting to new user:', userId, error);
      }
    };
  
    const handleSendMessage = (e) => {
      e.preventDefault();
      if (newMessage.trim()) {
        socketRef.current.emit('send-message', newMessage.trim());
        setNewMessage('');
      }
    };
  
    const toggleVideo = () => {
      if (localStream) {
        const videoTracks = localStream.getVideoTracks();
        videoTracks.forEach(track => {
          track.enabled = !isVideoEnabled;
        });
        setIsVideoEnabled(!isVideoEnabled);
      }
    };
  
    const toggleAudio = () => {
      if (localStream) {
        const audioTracks = localStream.getAudioTracks();
        audioTracks.forEach(track => {
          track.enabled = !isAudioEnabled;
        });
        setIsAudioEnabled(!isAudioEnabled);
      }
    };
  
    useEffect(() => {
      if (socketRef.current) {
        socketRef.current.on('user-connected', (userId) => {
          const newUser = users.find(user => user.id === userId);
          if (newUser) {
            setNotification(`${newUser.name} joined`);
            setTimeout(() => setNotification(''), 3000);
          }
        });
      }
    }, [users]);
  
    return (
      <div className="relative">
        {notification && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {notification}
          </div>
        )}
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,  
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}>
          {/* Header - Always visible */}
          <div style={{ 
            padding: '12px 24px',
            backgroundColor: 'rgba(32, 33, 36, 0.9)',
            borderBottom: '1px solid #3c4043',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'auto'
          }}>
            <div style={{ fontSize: '1.25rem', color: 'white' }}>Room: {roomId}</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {currentView === 'video' && (
                <>
                  <button
                    onClick={toggleVideo}
                    style={{
                      padding: '8px 8px',
                      backgroundColor: isVideoEnabled ? '#3c4043' : '#ea4335',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ fontSize: '1.2em', lineHeight: 1 }}>
                      {isVideoEnabled ? '📹' : '🚫'}
                    </span>
                    {isVideoEnabled ? 'Video On' : 'Video Off'}
                  </button>
                  <button
                    onClick={toggleAudio}
                    style={{
                      padding: '8px 8px',
                      backgroundColor: isAudioEnabled ? '#3c4043' : '#ea4335',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ fontSize: '1.2em', lineHeight: 1 }}>
                      {isAudioEnabled ? '🎤' : '🔇'}
                    </span>
                    {isAudioEnabled ? 'Audio On' : 'Audio Off'}
                  </button>
                  <button
                    onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                    style={{
                      padding: '8px 8px',
                      backgroundColor: isScreenSharing ? '#ea4335' : '#3c4043',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ fontSize: '1.2em', lineHeight: 1 }}>
                      {isScreenSharing ? '🔴' : '💻'}
                    </span>
                    {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                  </button>
                </>
              )}
              <button
                onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                style={{
                  padding: '8px 8px',
                  backgroundColor: isParticipantsOpen ? '#8ab4f8' : '#3c4043',
                  color: isParticipantsOpen ? '#202124' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                People ({Array.from(connectedPeers).length + 1})
              </button>
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                style={{
                  padding: '8px 8px',
                  backgroundColor: isChatOpen ? '#8ab4f8' : '#3c4043',
                  color: isChatOpen ? '#202124' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Chat
              </button>
              <button
                onClick={() => toggleView()}
                style={{
                  padding: '8px 8px',
                  backgroundColor: '#3c4043',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {currentView === 'vr' ? 'Enter Video Chat' : 'Enter VR'}
              </button>
              <button
                onClick={onLeaveRoom}
                style={{
                  padding: '8px 8px',
                  backgroundColor: '#ea4335',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Leave
              </button>
            </div>
          </div>
  
          {/* Main Content */}
          <div style={{ 
            display: 'flex',
            position: 'relative',
            height: 'calc(100%)',
            pointerEvents: 'none'
          }}>
            {/* Video Grid - Only visible in video mode, positioned on the right */}
            {currentView === 'video' && (
              <VideoGrid
                localStream={localStream}
                peerStreams={peerStreams}
                userName={userName}
                isVideoEnabled={isVideoEnabled}
                isAudioEnabled={isAudioEnabled}
                users={users}
                focusedVideo={focusedVideo}
                setFocusedVideo={setFocusedVideo}
              />
            )}
  
            {/* Sidebars - Always visible if open */}
            <div style={{ 
              display: 'flex',
              position: 'absolute',
              right: 0,
              height: '100%',
              pointerEvents: 'auto'
            }}>
              {isParticipantsOpen && (
                <div style={{
                  width: '320px',
                  borderLeft: '1px solid #3c4043',
                  backgroundColor: 'rgba(32, 33, 36, 0.95)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #3c4043' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'white' }}>People</h3>
                  </div>
                  <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                    {users.map(user => (
                      <div 
                        key={user.id}
                        style={{
                          padding: '12px',
                          marginBottom: '8px',
                          backgroundColor: '#303134',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          color: 'white'
                        }}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#8ab4f8',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#202124',
                          fontWeight: '500'
                        }}>
                          {user.name[0].toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: user.id === myPeerId ? '500' : 'normal' }}>
                            {user.name} {user.id === myPeerId && '(You)'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
  
              {isChatOpen && (
                <div style={{
                  width: '320px',
                  borderLeft: '1px solid #3c4043',
                  backgroundColor: 'rgba(32, 33, 36, 0.95)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #3c4043' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'white' }}>Chat</h3>
                  </div>
                  <div 
                    ref={chatContainerRef}
                    style={{ 
                      flex: 1,
                      overflow: 'auto',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    {messages.map((message, index) => (
                      <ChatMessage 
                        key={message.id || index}
                        message={message}
                        currentUserId={myPeerId}
                      />
                    ))}
                  </div>
                  <form 
                    onSubmit={handleSendMessage}
                    style={{ 
                      padding: '16px',
                      borderTop: '1px solid #3c4043',
                      backgroundColor: 'rgba(32, 33, 36, 0.95)'
                    }}
                  >
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: '#303134',
                        border: '1px solid #3c4043',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '0.875rem'
                      }}
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default VideoChat;