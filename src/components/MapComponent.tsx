'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon missing in Leaflet + Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapUpdater({ lat, lng, zoom }: { lat: number, lng: number, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom);
  }, [lat, lng, zoom, map]);
  return null;
}

export default function MapComponent({ lat = 18.5204, lng = 73.8567, zoom = 14, isExact = false }: { lat?: number, lng?: number, zoom?: number, isExact?: boolean }) {
  return (
    <div style={{ height: '100%', width: '100%', position: 'relative', zIndex: 0 }}>
      <MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
        <MapUpdater lat={lat} lng={lng} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <div className="font-bold text-center mb-1" style={{color: '#1a1a1a'}}>
              {isExact ? '📍 Exact Parcel Match' : '🏘️ Approximate Region'}
            </div>
            <div className="text-center" style={{color: '#4a4a4a'}}>
              {lat.toFixed(5)}° N, {lng.toFixed(5)}° E
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
