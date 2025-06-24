import React, { Fragment } from 'react';
import { TileLayer, Marker, MapContainer } from 'react-leaflet';
import L from 'leaflet';
import { localToGeo } from '../geoUtils';

function EmojiMarker({ position, emoji, label, isPeer }) {
  return (
    <Marker position={position} icon={L.divIcon({
      className: '',
      html: isPeer
        ? `<div style='display: flex; flex-direction: column; align-items: center;'>\
                <span style='display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: #1976d2; color: #fff; font-size: 18px; font-weight: bold; border: 2px solid #fff;'>${label}</span>\
             </div>`
        : `<span style='font-size: 32px; line-height: 1;'>${emoji}</span>`
    })} />
  );
}

export default function WorldMap({ coords, placedModels = [], userMarkerPosition = null, peers = [] }) {
  const hasCoords = Array.isArray(coords) && coords.length === 2 && coords.every(Number.isFinite);
  const center = hasCoords ? coords : [0, 0];
  const zoom = hasCoords ? 20 : 2;
  const origin = [0, 0];

  return (
    <Fragment>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* User marker: use userMarkerPosition if provided, else coords */}
        {userMarkerPosition && <EmojiMarker position={userMarkerPosition} emoji="🔵" label={`${userMarkerPosition[0]}, ${userMarkerPosition[1]}`} />}
        {placedModels && placedModels.map((model, idx) => {
          if (!model.position || !Array.isArray(model.position)) return null;
          const [x, , z] = model.position;
          const [lat, lng] = localToGeo([x, z], origin);
          return <EmojiMarker key={model.instanceId || idx} position={[lat, lng]} emoji="🟢" label={`${lat}, ${lng}`} />;
        })}
        {/* Peer markers */}
        {peers && Array.isArray(peers) && peers.map((peer, idx) => {
          if (!peer.position || !Array.isArray(peer.position)) return null;
          const [x, , z] = peer.position;
          const [lat, lng] = localToGeo([x, z], origin);
          return <EmojiMarker key={peer.id || peer.name || idx} position={[lat, lng]} emoji={null} label={peer.name || 'Peer'} isPeer />;
        })}
      </MapContainer>
    </Fragment>
  );
}
