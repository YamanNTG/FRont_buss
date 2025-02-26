import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

interface LocationViewerProps {
  location: { lat: number; lng: number };
  showMarker?: boolean;
  mapHeight?: string;
  defaultLocation?: { lat: number; lng: number };
  hideDefaultLocationMarker?: boolean;
  showCurrentLocation?: boolean;
}

const DEFAULT_ZOOM = 10;

const mapOptions: google.maps.MapOptions = {
  fullscreenControl: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  disableDefaultUI: false,
  clickableIcons: false,
  scrollwheel: false,
};

// Helper function to check if two locations are equal (with small epsilon for floating point comparison)
const areLocationsEqual = (
  loc1: { lat: number; lng: number },
  loc2: { lat: number; lng: number },
  epsilon: number = 0.00001,
): boolean => {
  return (
    Math.abs(loc1.lat - loc2.lat) < epsilon &&
    Math.abs(loc1.lng - loc2.lng) < epsilon
  );
};

const LocationViewer: React.FC<LocationViewerProps> = ({
  location,
  showMarker = true,
  mapHeight = '400px',
  defaultLocation = { lat: 53.3498, lng: -6.2603 }, // Dublin
  hideDefaultLocationMarker = false,
  showCurrentLocation = false,
}) => {
  const mapContainerStyle = {
    height: mapHeight,
    width: '100%',
  };

  const [currentUserLocation, setCurrentUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const shouldShowMarker =
    showMarker &&
    !(
      hideDefaultLocationMarker && areLocationsEqual(location, defaultLocation)
    );

  //get user's current location
  useEffect(() => {
    if (showCurrentLocation) {
      setIsLoadingLocation(true);

      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser');
        setIsLoadingLocation(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          let errorMessage = 'Unknown error';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                'Location access denied. Please enable location services.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          setLocationError(errorMessage);
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    }
  }, [showCurrentLocation]);

  return (
    <div className="rounded-lg overflow-hidden relative">
      {isLoadingLocation && (
        <div className="absolute top-2 right-2 z-10 bg-white px-2 py-1 rounded-md shadow-md text-sm">
          Getting your location...
        </div>
      )}

      {locationError && (
        <div className="absolute top-2 right-2 z-10 bg-white px-2 py-1 rounded-md shadow-md text-sm text-red-500">
          {locationError}
        </div>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={DEFAULT_ZOOM}
        options={mapOptions}
      >
        {/* Issue marker */}
        {shouldShowMarker && (
          <Marker
            position={location}
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
        )}

        {/* Current user location marker  */}
        {currentUserLocation && (
          <Marker
            position={currentUserLocation}
            icon={{
              url:
                'data:image/svg+xml;charset=UTF-8,' +
                encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="18" fill="#1E88E5" />
                    <circle cx="18" cy="14" r="6" fill="white" />
                    <path d="M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12" fill="white" />
                  </svg>`,
                ),
              scaledSize: new google.maps.Size(36, 36),
              anchor: new google.maps.Point(18, 18),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default LocationViewer;
