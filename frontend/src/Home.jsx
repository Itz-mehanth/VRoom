import React, { useEffect, useRef, useState } from 'react';


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

  export default Home;