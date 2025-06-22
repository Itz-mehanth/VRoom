// src/geoUtils.js
// Utility functions for geo <-> local coordinate conversion

// Converts local (x, z) to geo (lat, lng) given an origin [lat, lng]
export function localToGeo([x, z], origin = [0, 0]) {
  const earthRadius = 6371000;
  const dLat = z / earthRadius;
  const dLng = x / (earthRadius * Math.cos((origin[0] * Math.PI) / 180));
  const lat = origin[0] + (dLat * 180) / Math.PI;
  const lng = origin[1] + (dLng * 180) / Math.PI;
  return [lat, lng];
}

// Converts geo (lat, lng) to local (x, z) given an origin [lat, lng]
export function geoToLocal([lat, lng], origin = [0, 0]) {
  const earthRadius = 6371000.000000000;
  const dLat = ((lat - origin[0]) * Math.PI) / 180;
  const dLng = ((lng - origin[1]) * Math.PI) / 180;
  const x = dLng * earthRadius * Math.cos((origin[0] * Math.PI) / 180);
  const z = dLat * earthRadius;
  return [x, 0, z];
}
