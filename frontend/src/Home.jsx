import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from './Firebase';
import { useAuth } from './contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { Home as HomeIcon, User, LogOut } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [envPreset, setEnvPreset] = useState('sunset');
  const [recentRoom, setRecentRoom] = useState(null);

  useEffect(() => {
    const lastRoom = localStorage.getItem('lastJoinedRoom');
    if (lastRoom) {
      setRecentRoom(lastRoom);
    }
  }, []);

  const handleJoinRoom = async (e, specificRoomId = null) => {
    e?.preventDefault();
    if (!currentUser) return;

    const targetRoomId = specificRoomId || roomId;

    if (!targetRoomId?.trim()) {
      alert('Please enter a room ID');
      return;
    }

    // Persist recent room
    localStorage.setItem('lastJoinedRoom', targetRoomId);

    // Request Fullscreen
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.log("Fullscreen request failed", err);
    }

    // Simplified Logic: Only 'env' parameter
    let url = `/room/${targetRoomId}/user/${currentUser.uid}?env=${envPreset}`;
    navigate(url);
  };

  const handleSignIn = async () => {
    try { await signInWithGoogle(); }
    catch (error) { console.error('Error signing in:', error); }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // --- Views ---

  const LoginView = () => (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* Left side image for desktop */}
      <div className="desktop-only-image" style={{ flex: 1, background: '#f5f5f5', display: 'none', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ fontSize: '8rem', marginBottom: '2rem' }}>🌿</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Fineed</h2>
        <p style={{ maxWidth: '400px', textAlign: 'center', color: '#666' }}>Find your dream virtual space here.</p>
      </div>

      <div className="app-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2rem', flex: 1, maxWidth: '600px', margin: 'auto' }}>
        <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>We Say Hello!</h1>
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '3rem' }}>
            Welcome back.
          </p>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input type="email" placeholder="Email" style={{ padding: '1.2rem', background: '#F5F5F5', borderRadius: '16px', border: 'none' }} />
            <input type="password" placeholder="Password" style={{ padding: '1.2rem', background: '#F5F5F5', borderRadius: '16px', border: 'none' }} />
            <div style={{ textAlign: 'right', marginTop: '0.5rem', marginBottom: '2rem' }}>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>Forgot password?</span>
            </div>

            <button className="primary" style={{ padding: '1.2rem', fontSize: '1.1rem' }} onClick={handleSignIn}>Log In (Google)</button>
          </form>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '1.5rem' }}>Or Login With</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <button onClick={handleSignIn} className="icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* Desktop Sidebar (Visible > 768px via CSS) */}
      <div className="desktop-sidebar" style={{ display: 'none' }}>
        <h2 style={{ marginBottom: '3rem', paddingLeft: '0.5rem', fontSize: '1.8rem' }}>Fineed</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <button className={activeTab === 'home' ? 'primary' : 'secondary'} style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'home' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'home' ? 'var(--color-secondary)' : '#666', gap: '12px', display: 'flex', alignItems: 'center' }} onClick={() => setActiveTab('home')}>
            <HomeIcon size={20} /> <span style={{ fontSize: '1.2rem' }}>Home</span>
          </button>

          <button className={activeTab === 'profile' ? 'primary' : 'secondary'} style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'profile' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'profile' ? 'var(--color-secondary)' : '#666', gap: '12px', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/profile')}>
            <User size={20} /> <span style={{ fontSize: '1.2rem' }}>Profile</span>
          </button>
        </nav>
        <button onClick={handleLogout} className="secondary" style={{ marginTop: 'auto', justifyContent: 'flex-start', color: '#ff4d4f', gap: '12px', display: 'flex', alignItems: 'center' }}>
          <LogOut size={20} /> <span style={{ fontSize: '1.2rem' }}>Logout</span>
        </button>
      </div>

      <div className="app-content" style={{ flex: 1, padding: '2rem' }}>
        {/* Header (Mobile Only mostly) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Show Hamburger only on Mobile */}
            <button className="icon-btn" style={{ border: 'none', background: '#F5F5F5', width: 40, height: 40, display: window.innerWidth > 768 ? 'none' : 'flex' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            </button>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>Discover</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(e => console.log(e));
                } else {
                  document.exitFullscreen().catch(e => console.log(e));
                }
              }}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 8 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
            {/* Mobile Logout (Dropdown substitute: simple icon for now or just near profile) */}
            <button onClick={handleLogout} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 8, color: '#ff4d4f' }} title="Logout">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </button>

            {currentUser && currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} onClick={() => navigate('/profile')} />
            ) : (
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee' }}></div>
            )}
          </div>
        </div>

        {/* Dashboard Grid for Desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

          {/* Join Room Card */}
          <div>
            <p style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Recommended</p>
            <div className="card-join" style={{ background: '#fff', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>Join A Room</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Explore with friends</p>
                </div>
                <span style={{ background: '#F0FFE5', color: '#68A800', padding: '6px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>Live</span>
              </div>

              {/* Environment Selector */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Environment</label>
                <select
                  value={envPreset}
                  onChange={(e) => setEnvPreset(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #eee',
                    background: '#F8F8F8',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option value="sunset">Sunset (Default)</option>
                  <option value="forest">Forest</option>
                  <option value="city">City</option>
                  <option value="night">Night</option>
                  <option value="park">Park</option>
                  <option value="apartment">Apartment</option>
                  <option value="studio">Studio</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter Room ID"
                  style={{ flex: 1, margin: 0, background: '#F8F8F8', padding: '1rem', borderRadius: '12px', border: '1px solid #eee', outline: 'none' }}
                />
              </div>

              <button className="primary" onClick={(e) => handleJoinRoom(e)} style={{ padding: '1rem', fontSize: '1rem' }}>
                Join Now
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <p style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Recently Visited</p>
            {recentRoom ? (
              <div
                onClick={() => handleJoinRoom(null, recentRoom)}
                style={{ background: '#fff', padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: '1rem', cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s', ':hover': { borderColor: '#C9F31D' } }}>
                <div style={{ width: 56, height: 56, background: '#222', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '1.2rem' }}>
                  VR
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Room #{recentRoom}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Jump back in</p>
                </div>
                <button style={{ width: 'auto', padding: '0.6rem 1.2rem', fontSize: '0.9rem', background: '#F5F5F5', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Visit</button>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#999', background: '#f9f9f9', borderRadius: '16px' }}>No recent rooms</div>
            )}

          </div>
        </div>

        <div style={{ height: 40 }} /> {/* Spacer */}

        {/* Bottom Nav (Mobile Only) */}
        <div className="bottom-nav">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={activeTab === 'home' ? 'var(--color-primary-hover)' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>

          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => navigate('/profile')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', width: '100%', flex: 1, background: '#fff' }}>
      {!currentUser ? <LoginView /> : <HomeView />}
    </div>
  );
};

export default Home;