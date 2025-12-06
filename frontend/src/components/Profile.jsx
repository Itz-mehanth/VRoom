import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for design matching
  const [role, setRole] = useState("UX / UI Designer");
  const [about, setAbout] = useState("I am a creative designer with a passion for creating beautiful and functional user experiences.");

  useEffect(() => {
    if (!currentUser) return;
    async function fetchProfile() {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username || currentUser.displayName || "User");
          if (data.role) setRole(data.role);
          if (data.about) setAbout(data.about);
        } else {
          setUsername(currentUser.displayName || currentUser.email.split("@")[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;
    await setDoc(doc(db, "users", currentUser.uid), {
      email: currentUser.email,
      username,
      role,
      about,
      lastLogin: Date.now(),
    }, { merge: true });
    setEditing(false);
  };

  if (!currentUser) return <div className="app-content">Please sign in.</div>;

  return (
    <div className="app-content" style={{ padding: 0, background: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="icon-btn" onClick={() => navigate('/')} style={{ border: 'none', background: '#F5F5F5', width: 40, height: 40 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Profile</span>
        <button className="icon-btn" style={{ border: 'none', background: 'transparent', width: 40, height: 40 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        </button>
      </div>

      {/* Avatar Section with Gradient */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        {/* Gradient Background Circle */}
        <div style={{
          position: 'absolute', top: '-20px',
          width: '100%', height: '180px',
          background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
          opacity: 0.3,
          zIndex: 0,
          borderBottomLeftRadius: '50% 20px',
          borderBottomRightRadius: '50% 20px',
          filter: 'blur(40px)'
        }}></div>

        <div style={{ width: 100, height: 100, padding: 4, background: '#fff', borderRadius: '50%', zIndex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <img
            src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${username}`}
            alt="Profile"
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem', zIndex: 1 }}>
          {editing ? (
            <input value={username} onChange={e => setUsername(e.target.value)} style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: '700', border: '1px solid #ddd', padding: '0.5rem', width: 'auto' }} />
          ) : (
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{username}</h2>
          )}
          <p style={{ color: '#888' }}>{role}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>

        {/* Helper Card for Editing */}
        {editing ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Role / Tagline</label>
            <input value={role} onChange={e => setRole(e.target.value)} />

            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', marginTop: '1rem' }}>About Me</label>
            <textarea
              value={about}
              onChange={e => setAbout(e.target.value)}
              style={{
                width: '100%', padding: '1rem', borderRadius: '12px', background: '#F5F5F5',
                border: 'none', minHeight: '100px', fontFamily: 'inherit'
              }}
            />
            <button className="primary" onClick={handleSave} style={{ marginTop: '1rem' }}>Save Changes</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem' }}>About</h3>
                <button onClick={() => setEditing(true)} style={{ color: 'var(--color-primary-hover)', background: 'none', padding: 0, width: 'auto', fontSize: '0.9rem' }}>Edit</button>
              </div>
              <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: '#555' }}>
                {about}
              </p>
            </div>


          </>
        )}

      </div>
    </div>
  );
}