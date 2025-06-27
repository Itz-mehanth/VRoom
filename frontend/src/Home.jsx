import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, signOutUser } from './Firebase';
import { useAuth } from './contexts/AuthContext';
import './Home.css';
import { MapContainer, TileLayer, useMapEvents, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { getAllPlantInstances } from './services/plantService';
import { localToGeo } from './geoUtils';

function AddressSearch({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch recommendations as user types
  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        setResults([]);
        setShowDropdown(false);
      }
      setLoading(false);
    }, 400); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (lat, lon) => {
    onLocationSelect([parseFloat(lat), parseFloat(lon)]);
    setShowDropdown(false);
    setQuery(""); // Optionally clear input
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem", zIndex: 100 }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for a location"
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
        }}
        onFocus={() => setShowDropdown(results.length > 0)}
        autoComplete="off"
      />
      {loading && (
        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <span style={{ fontSize: 12, color: "#888" }}>Loading...</span>
        </div>
      )}
      {showDropdown && results.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 10,
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: "0 0 6px 6px",
            margin: 0,
            padding: 0,
            listStyle: "none",
            maxHeight: 180,
            overflowY: "auto",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
          }}
        >
          {results.map((result, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(result.lat, result.lon)}
              style={{
                padding: "0.7rem 1rem",
                cursor: "pointer",
                borderBottom: idx !== results.length - 1 ? "1px solid #f0f0f0" : "none",
                background: "#fff",
                color: 'black',
                transition: "background 0.2s"
              }}
              onMouseDown={e => e.preventDefault()} // Prevent input blur
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MapClickHandler({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function ZoomToUser({ userCoords, trigger }) {
  const map = useMap();
  useEffect(() => {
    if (trigger && userCoords) {
      map.setView(userCoords, 20);
    }
  }, [trigger, userCoords, map]);
  return null;
}

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const { currentUser } = useAuth();
  const [plantMarkers, setPlantMarkers] = useState([]);
  const mapRef = useRef();
  const [zoomTrigger, setZoomTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserCoords([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.warn("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    async function loadPlants() {
      try {
        const plants = await getAllPlantInstances();
        setPlantMarkers(plants);
      } catch (e) {
        console.error('[Home] Failed to load plant instances:', e);
      }
    }
    loadPlants();
  }, []);

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
    // Add coordinates to the URL if selected
    let url = `/room/${roomId}/user/${currentUser.uid}`;
    if (selectedCoords) {
      url += `?lat=${selectedCoords[0]}&lng=${selectedCoords[1]}`;
    }

    async function fetchGeocode() {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${selectedCoords[0]}&lon=${selectedCoords[1]}`);
      const data = await res.json();
      alert(`fetching location details`);
      if (data.error) {
        console.error("Geocode API error:", data.error);
        alert('Failed to fetch location details');
      } else {
        navigate(url);
      }
    }
    fetchGeocode();
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

  const handleZoomToUser = () => {
    setZoomTrigger(t => !t); // Toggle to trigger useEffect in ZoomToUser
  };

  // Emoji icons for markers
  const userEmojiIcon = L.divIcon({
    className: '',
    html: `<span style='font-size: 32px;'>🔵</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const selectedEmojiIcon = L.divIcon({
    className: '',
    html: `<span style='font-size: 32px;'>🔴</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const plantEmojiIcon = (lat, lng) => L.divIcon({
    className: '',
    html: `<span style='font-size: 32px;'>🟢</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="home-container">
      <div className="home-card">
        <div style={{ position: "relative" }}>
          <AddressSearch onLocationSelect={setSelectedCoords} />
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "35vh", zIndex: 1 }}
            whenCreated={mapInstance => { mapRef.current = mapInstance; }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler setCoords={setSelectedCoords} />
            {userCoords && <Marker icon={userEmojiIcon} position={userCoords} />}
            {selectedCoords && <Marker icon={selectedEmojiIcon} position={selectedCoords} />}
            {plantMarkers && plantMarkers.map((model, idx) => {
              if (!model.position) return null;
              const origin = [0, 0];
              const [x, , z] = model.position;
              const [lat, lng] = localToGeo([x, z], origin);
              return <Marker key={model.instanceId || idx} icon={plantEmojiIcon(lat, lng)} position={[lat, lng]} />;
            })}
            <ZoomToUser userCoords={userCoords} trigger={zoomTrigger} />
          </MapContainer>
        </div>
        <button
          onClick={handleZoomToUser}
          disabled={!userCoords}
          style={{ marginTop: 10 }}
        >
          Zoom to My Location
        </button>
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