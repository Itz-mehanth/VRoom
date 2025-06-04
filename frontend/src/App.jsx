import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const Home = ({ onJoinRoom }) => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomId.trim() && userName.trim()) {
      onJoinRoom(roomId.trim(), userName.trim());
    }
  };

  return (
    <div style={{ 
      height: '100vh',
      display: 'flex',
      backgroundColor: '#202124'
    }}>
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 48px',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '2.75rem',
          fontWeight: '400',
          marginBottom: '1rem'
        }}>
          Video meetings for everyone
        </h1>
        <p style={{ 
          fontSize: '1.125rem',
          marginBottom: '3rem',
          color: '#9aa0a6'
        }}>
          Connect, collaborate, and celebrate from anywhere with video chat
        </p>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#3c4043',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room code or link"
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1.5rem',
              backgroundColor: '#3c4043',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontSize: '1rem'
            }}
            required
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              style={{
                padding: '0.875rem 1.5rem',
                backgroundColor: '#8ab4f8',
                color: '#202124',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.975rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Join Meeting
            </button>
          </div>
        </form>
      </div>
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px'
      }}>
        <img 
          src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
          alt="Meet Preview"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px'
          }}
        />
      </div>
    </div>
  );
};

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

const VideoChat = ({ roomId, userName, onLeaveRoom }) => {
  const videoRef = useRef();
  const peerInstanceRef = useRef();
  const socketRef = useRef();
  const [users, setUsers] = useState([]);
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

    // Connect to socket.io backend using Netlify function URL
    socketRef.current = io('/.netlify/functions/server', {
      path: '/socket.io',
      transports: ['websocket']
    });

    // Initialize peer with Netlify function URL
    peerInstanceRef.current = new Peer(undefined, {
      host: window.location.hostname,
      path: '/.netlify/functions/server/peerjs',
      secure: window.location.protocol === 'https:',
      debug: 3,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' }
        ]
      }
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
          
          if (connectedPeers.has(call.peer)) {
            console.log('Already connected to this peer, ignoring call');
            return;
          }

          call.answer(stream);
          
          call.on('stream', remoteStream => {
            console.log('Received remote stream from:', call.peer);
            if (remoteStream.id === stream.id) {
              console.log('Warning: Received our own stream, ignoring');
              return;
            }
            
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

          call.on('error', error => {
            console.error('Call error with peer:', call.peer, error);
          });
        });

        // Handle new user connections
        socketRef.current.on('user-connected', userId => {
          console.log('New user connected:', userId);
          
          if (connectedPeers.has(userId)) {
            console.log('Already connected to this peer, skipping connection');
            return;
          }
          
          // Add a small delay to ensure the other peer is ready to receive the call
          setTimeout(() => {
            connectToNewUser(userId, stream);
          }, 1000);
        });
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
        alert('Could not access camera or microphone. Please check permissions.');
      });

    // Listen for room users updates
    socketRef.current.on('room-users', (roomUsers) => {
      console.log('Updated user list received:', roomUsers);
      setUsers(roomUsers);

      // Get the list of new peers that we need to connect to
      const currentPeers = new Set(connectedPeers);
      const newPeers = roomUsers.filter(user => 
        user.id !== myPeerId && !currentPeers.has(user.id)
      );

      // Connect to new peers if we have our stream ready
      if (localStream) {
        newPeers.forEach(user => {
          connectToNewUser(user.id, localStream);
        });
      }
    });

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

    peerInstanceRef.current.on('open', id => {
      console.log('My peer ID:', id);
      setMyPeerId(id);
      socketRef.current.emit('join-room', roomId, id, userName);
    });

    peerInstanceRef.current.on('error', error => {
      console.error('PeerJS error:', error);
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
        const tracks = localStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [roomId, userName]);

  // Function to connect to a new user
  const connectToNewUser = (userId, stream) => {
    console.log('Attempting to connect to new user:', userId);
    try {
      const call = peerInstanceRef.current.call(userId, stream);
      
      call.on('stream', remoteStream => {
        console.log('Received stream from new user:', userId);
        if (remoteStream.id === stream.id) {
          console.log('Warning: Received our own stream, ignoring');
          return;
        }
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

      call.on('error', error => {
        console.error('Call error with user:', userId, error);
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

  const VideoContainer = ({ stream, peerId, isLocal = false }) => {
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
  };

  return (
    <div style={{ 
      height: '100vh',
      backgroundColor: '#202124',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '12px 24px',
        borderBottom: '1px solid #3c4043',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontSize: '1.25rem' }}>Room: {roomId}</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={toggleVideo}
            style={{
              padding: '8px 16px',
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
            <span style={{ 
              fontSize: '1.2em',
              lineHeight: 1 
            }}>
              {isVideoEnabled ? '📹' : '🚫'}
            </span>
            {isVideoEnabled ? 'Video On' : 'Video Off'}
          </button>
          <button
            onClick={toggleAudio}
            style={{
              padding: '8px 16px',
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
            <span style={{ 
              fontSize: '1.2em',
              lineHeight: 1 
            }}>
              {isAudioEnabled ? '🎤' : '🔇'}
            </span>
            {isAudioEnabled ? 'Audio On' : 'Audio Off'}
          </button>
          <button
            onClick={isScreenSharing ? stopScreenShare : startScreenShare}
            style={{
              padding: '8px 16px',
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
          <button
            onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
            style={{
              padding: '8px 16px',
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
              padding: '8px 16px',
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
            onClick={onLeaveRoom}
            style={{
              padding: '8px 16px',
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
        flex: 1,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Video Grid */}
        <div style={{ 
          flex: 1,
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(peerStreams.size + 1))}, 1fr)`,
          gap: '24px',
          alignContent: 'start',
          height: '100%',
          overflow: 'auto'
        }}>
          <VideoContainer 
            stream={localStream} 
            isLocal={true} 
          />
          {Array.from(peerStreams.entries()).map(([peerId, stream]) => (
            <VideoContainer 
              key={peerId} 
              stream={stream} 
              peerId={peerId} 
            />
          ))}
        </div>

        {/* Sidebars */}
        {isParticipantsOpen && (
          <div style={{
            width: '320px',
            borderLeft: '1px solid #3c4043',
            backgroundColor: '#202124',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #3c4043' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem' }}>People</h3>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
              {users.filter(user => connectedPeers.has(user.id) || user.id === myPeerId).map(user => (
                <div 
                  key={user.id}
                  style={{
                    padding: '12px',
                    marginBottom: '8px',
                    backgroundColor: '#303134',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
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
                  {user.id === myPeerId && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={toggleVideo}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: isVideoEnabled ? '#3c4043' : '#ea4335',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{isVideoEnabled ? '📹' : '🚫'}</span>
                        {isVideoEnabled ? 'On' : 'Off'}
                      </button>
                      <button
                        onClick={toggleAudio}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: isAudioEnabled ? '#3c4043' : '#ea4335',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{isAudioEnabled ? '🎤' : '🔇'}</span>
                        {isAudioEnabled ? 'On' : 'Off'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {isChatOpen && (
          <div style={{
            width: '320px',
            borderLeft: '1px solid #3c4043',
            backgroundColor: '#202124',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #3c4043' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Chat</h3>
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
                borderTop: '1px solid #3c4043'
              }}
            >
              <div style={{ 
                display: 'flex',
                gap: '8px',
                backgroundColor: '#303134',
                borderRadius: '24px',
                padding: '8px 16px'
              }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Send a message to everyone"
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: newMessage.trim() ? '#8ab4f8' : '#9aa0a6',
                    cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                    padding: '4px'
                  }}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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
    <VideoChat
      roomId={currentRoom}
      userName={currentUser}
      onLeaveRoom={handleLeaveRoom}
    />
  );
};

export default App;
