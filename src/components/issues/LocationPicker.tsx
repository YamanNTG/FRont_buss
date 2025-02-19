import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
  isPinDraggable?: boolean;
}

interface MarkerProps {
  lat: number;
  lng: number;
}

const Marker: React.FC<MarkerProps> = () => (
  <div
    style={{
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      color: 'red',
      fontSize: '30px',
    }}
  >
    📍
  </div>
);

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  initialLocation = { lat: 53.3498, lng: -6.2603 },
  isPinDraggable = true,
}) => {
  const [location, setLocation] = useState(initialLocation);

  const handleMapClick = ({ lat, lng }: { lat: number; lng: number }) => {
    if (isPinDraggable) {
      const newLocation = { lat, lng };
      setLocation(newLocation);
      onLocationSelect(newLocation);
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
          libraries: ['places'],
          language: 'en',
        }}
        defaultCenter={location}
        defaultZoom={10}
        options={{
          fullscreenControl: true,
        }}
        onClick={handleMapClick}
      >
        <Marker lat={location.lat} lng={location.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default LocationPicker;
