import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = ({ lat, lng, city }) => {
  const defaultPosition = [24.7136, 46.6753]; 
  const position = lat && lng ? [lat, lng] : defaultPosition;

  const ChangeView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 13);
    }, [center, map]);
    return null;
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%', zIndex: "1" }}>
        <ChangeView center={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#07489D', textAlign: 'center' }}>
              {city || 'الرياض'}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default Map;
