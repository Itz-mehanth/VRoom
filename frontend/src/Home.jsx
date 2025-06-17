import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, signOutUser } from './Firebase';
import { useAuth } from './contexts/AuthContext';
import './Home.css';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please sign in first');
      return;
    }
    if (!roomId.trim()) {
      alert('Please enter a room ID');
      return;
    }
    navigate(`/room/${roomId}/user/${currentUser.uid}`);
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in with Google');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out');
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">VR Room</h1>
        
        {!currentUser ? (
          <button
            onClick={handleSignIn}
            className="auth-button sign-in-button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            Sign in with Google
          </button>
        ) : (
          <div className="user-profile">
            <div className="user-info">
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="user-avatar"
              />
              <div className="user-details">
                <p className="user-name">{currentUser.displayName}</p>
                <p className="user-email">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="auth-button sign-out-button"
            >
              Sign Out
            </button>
          </div>
        )}

        <form onSubmit={handleJoinRoom} className="room-form">
          <div className="form-group">
            <label htmlFor="roomId" className="form-label">
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="form-input"
              placeholder="Enter room ID"
            />
          </div>
          <button
            type="submit"
            disabled={!currentUser}
            className="join-button"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;