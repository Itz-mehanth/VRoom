import React, { useEffect, useState } from 'react';
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import WalkingIndicator from './WalkingIndicator';
import ModelList from './ModelList';
import WorldMap from './WorldMap';
import { localToGeo } from '../geoUtils';

export default function VRUI({
  isPC,
  isWalking,
  setIsWalking,
  coords,
  placedModels,
  position,
  users,
  userName,
  isPlantListOpen,
  setIsPlantListOpen,
  isFertilizerListOpen,
  setIsFertilizerListOpen,
  isAssetListOpen,
  setIsAssetListOpen,
  draggedModel,
  setDraggedModel,
  dropIndicatorPosition,
  setDropIndicatorPosition,
  heldItem,
  setHeldItem,
  selectedModel,
  setSelectedModel,
  selectedModelDetails,
  setSelectedModelDetails,
  waterInHand,
  fertilizerInHand
}) {
  const [locationDetails, setLocationDetails] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [timezoneName, setTimezoneName] = useState(null);
  const navigate = useNavigate();

  // Helper: convert x/z to lat/lng if needed (assume coords is [lat, lng] if available)
  const getLatLng = () => {
    if (Array.isArray(coords) && coords.length === 2) {
      return coords;
    }
    // fallback: convert 3D position to lat/lng using localToGeo
    const origin = [0, 0];
    return localToGeo([position.x, position.z], origin);
  };

  const handleShowLocation = async () => {
    setLoadingLocation(true);
    setShowLocationModal(true);
    const [lat, lng] = getLatLng();
    try {
      // Use Nominatim OpenStreetMap reverse geocoding
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data.error) {
        console.error("Geocode API error:", data.error);
        navigate("/"); // Redirect to home if geocode fails
        return;
      }
      setLocationDetails(data);

      // Fetch weather from OpenWeatherMap
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6f3f02c4c5f662748117bf92782917ab&units=metric`);
      const weatherData = await weatherRes.json();
      setWeatherDetails(weatherData);

      // Fetch timezone from TimeZoneDB
      const tzRes = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=A57Y73285BMN&format=json&by=position&lat=${lat}&lng=${lng}`);
      const tzData = await tzRes.json();
      setTimezoneName(tzData.zoneName); // e.g. "Asia/Kolkata"
    } catch (e) {
      console.error("Geocode error:", e);
      setLocationDetails({ error: 'Failed to fetch location details.' });
      setWeatherDetails(null);
      setTimezoneName(null);
    }
    setLoadingLocation(false);
  };

  return (
    <>
      <WalkingIndicator isWalking={isWalking} />
      {/* Crosshair marker: always on mobile, only on PC when pointer lock is active */}
      {(!isPC || (typeof window !== 'undefined' && window.document && document.pointerLockElement)) && (
        <div style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          <div style={{
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
            +
          </div>
        </div>
      )}
      {/* Mobile Walk Button */}
      {!isPC && (
        <div style={{ position: 'fixed', top: '140px', left: '20px', zIndex: 1000 }}>
          <button
            style={{
              width: '60px', height: '60px', borderRadius: '50%', backgroundColor: isWalking ? '#4CAF50' : '#2196F3', border: 'none', color: 'white', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', opacity: 0.8, touchAction: 'none'
            }}
            onClick={() => setIsWalking(prev => !prev)}
          >
            {isWalking ? '⏹' : '▶'}
          </button>
        </div>
      )}
      {/* WorldMap overlay */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: 120, height: 120, background: 'rgba(0,0,0,0)', borderRadius: 8, overflow: 'hidden', zIndex: 2000, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', padding: 8 }}>
        <WorldMap
          coords={coords}
          placedModels={placedModels}
          userMarkerPosition={(() => {
            if (position && Array.isArray(coords) && coords.length === 2) {
              const origin = [0, 0];
              const [lat, lng] = [position.x, position.z];
              return [lat, lng];
            }
            return coords;
          })()}
          peers={users.filter(u => u.name !== userName)}
        />
      </div>
      <ModelList
        isPlantListOpen={isPlantListOpen}
        isFertilizerListOpen={isFertilizerListOpen}
        isAssetListOpen={isAssetListOpen}
        onPlantClose={() => { setIsPlantListOpen(!isPlantListOpen); setIsFertilizerListOpen(false); setIsAssetListOpen(false) }}
        onFertilizerClose={() => { setIsFertilizerListOpen(!isFertilizerListOpen); setIsPlantListOpen(false); setIsAssetListOpen(false) }}
        onAssetClose={() => { setIsAssetListOpen(!isAssetListOpen); setIsPlantListOpen(false); setIsFertilizerListOpen(false) }}
        setDraggedModel={setDraggedModel}
        draggedModel={draggedModel}
        hoverPosition={dropIndicatorPosition}
        setHoverPosition={setDropIndicatorPosition}
        setHeldItem={setHeldItem}
        heldItem={heldItem}
      />
      {/* Location Details Button */}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 3000 }}>
        <button
          style={{ padding: '10px 18px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', cursor: 'pointer' }}
          onClick={handleShowLocation}
        >
          📍 View Location Details
        </button>
      </div>
      {/* Location Modal */}
      {showLocationModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowLocationModal(false)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', position: 'relative', color: '#222', fontFamily: 'inherit' }} onClick={e => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }} onClick={() => setShowLocationModal(false)}>&times;</button>
            <h2 style={{ marginBottom: 16, fontSize: 20, color: '#1976d2' }}>Current Location</h2>
            {loadingLocation && <div>Loading...</div>}
            {locationDetails && !loadingLocation && (
              locationDetails.error ? <div style={{ color: 'red' }}>{locationDetails.error}</div> :
              <div style={{ lineHeight: 1.7 }}>
                <div><b style={{ color: '#1976d2' }}>Address:</b> <span style={{ color: '#333' }}>{locationDetails.display_name || 'N/A'}</span></div>
                <div><b style={{ color: '#1976d2' }}>City:</b> <span style={{ color: '#333' }}>{locationDetails.address?.city || locationDetails.address?.town || locationDetails.address?.village || 'N/A'}</span></div>
                <div><b style={{ color: '#1976d2' }}>State:</b> <span style={{ color: '#333' }}>{locationDetails.address?.state || 'N/A'}</span></div>
                <div><b style={{ color: '#1976d2' }}>Country:</b> <span style={{ color: '#333' }}>{locationDetails.address?.country || 'N/A'}</span></div>
                <div style={{ marginTop: 8, fontSize: 13, color: '#888' }}>Lat: {locationDetails.lat}, Lng: {locationDetails.lon}</div>
                {/* Local time */}
                <div style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
                  <b style={{ color: '#1976d2' }}>Local Time:</b>{" "}
                  {timezoneName
                    ? DateTime.now().setZone(timezoneName).toLocaleString(DateTime.TIME_WITH_SECONDS)
                    : "Loading..."}
                </div>
                {/* Weather details */}
                {weatherDetails && weatherDetails.main && (
                  <div style={{ marginTop: 18, padding: 12, background: '#f5f7fa', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {weatherDetails.weather && weatherDetails.weather[0]?.icon && (
                        <img src={`https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 48, height: 48 }} />
                      )}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 18, color: '#1976d2' }}>{weatherDetails.weather[0]?.main || ''}</div>
                        <div style={{ fontSize: 15, color: '#333' }}>{weatherDetails.weather[0]?.description || ''}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 16 }}>
                      <span style={{ color: '#1976d2', fontWeight: 600 }}>Temperature:</span> {weatherDetails.main.temp}&deg;C
                    </div>
                    <div style={{ fontSize: 15 }}>
                      <span style={{ color: '#1976d2', fontWeight: 600 }}>Humidity:</span> {weatherDetails.main.humidity}%
                    </div>
                    <div style={{ fontSize: 15 }}>
                      <span style={{ color: '#1976d2', fontWeight: 600 }}>Wind:</span> {weatherDetails.wind?.speed} m/s
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
