import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
  isPinDraggable?: boolean;
}

const DEFAULT_LOCATION = { lat: 53.3498, lng: -6.2603 }; // Dublin
const DEFAULT_ZOOM = 10;

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const mapOptions: google.maps.MapOptions = {
  fullscreenControl: true,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  disableDefaultUI: false,
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  initialLocation = DEFAULT_LOCATION,
  isPinDraggable = true,
}) => {
  const [location, setLocation] = useState(initialLocation);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!isPinDraggable || !event.latLng) return;

      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setLocation(newLocation);
      onLocationSelect(newLocation);
    },
    [isPinDraggable, onLocationSelect],
  );

  const handleMarkerDragEnd = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;

      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setLocation(newLocation);
      onLocationSelect(newLocation);
    },
    [onLocationSelect],
  );

  return (
    <div className="rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={DEFAULT_ZOOM}
        options={mapOptions}
        onClick={handleMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={location}
          draggable={isPinDraggable}
          onDragEnd={handleMarkerDragEnd}
          icon={{
            url:
              'data:image/svg+xml;charset=UTF-8,' +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF0000" stroke="#CC0000" stroke-width="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="#FFFFFF" stroke="#CC0000"/></svg>`,
              ),
            scaledSize: new google.maps.Size(36, 36),
            anchor: new google.maps.Point(18, 36),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default LocationPicker;
