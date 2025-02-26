import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { IssuesItem } from '@/types/issues';
import { formatDate } from '@/utils/formatDate';

interface IssuesMapProps {
  issues: IssuesItem[];
  mapHeight?: string;
}

const DEFAULT_ZOOM = 12;

const mapOptions: google.maps.MapOptions = {
  fullscreenControl: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  disableDefaultUI: false,
  clickableIcons: false,
  scrollwheel: false,
};

const IssuesMap: React.FC<IssuesMapProps> = ({
  issues,
  mapHeight = '600px',
}) => {
  const [currentUserLocation, setCurrentUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssuesItem | null>(null);

  // Filter only open and ongoing issues
  const activeIssues = issues.filter(
    (issue) => ['open', 'in-progress'].includes(issue.status) && issue.location,
  );

  // Calculate map center
  const center = (() => {
    return { lat: 53.3498, lng: -6.2603 }; // Default to Dublin
  })();

  // Get user's current location
  useEffect(() => {
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
  }, []);

  const mapContainerStyle = {
    height: mapHeight,
    width: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  };

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
        center={center}
        zoom={DEFAULT_ZOOM}
        options={mapOptions}
      >
        {/* Issue markers */}
        {activeIssues.map((issue) => (
          <Marker
            key={issue._id}
            position={{
              lat: issue.location!.lat,
              lng: issue.location!.lng,
            }}
            onClick={() => setSelectedIssue(issue)}
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
        ))}

        {/* Selected Issue Info Window */}
        {selectedIssue && (
          <InfoWindow
            position={{
              lat: selectedIssue.location!.lat,
              lng: selectedIssue.location!.lng,
            }}
            onCloseClick={() => setSelectedIssue(null)}
          >
            <div className="p-4 max-w-[300px]">
              <h3 className="text-lg font-bold mb-2">{selectedIssue.title}</h3>
              <p className="text-gray-600 mb-4">{selectedIssue.description}</p>

              <div className="flex items-center mb-2">
                <img
                  src={
                    selectedIssue.user?.profileImage ||
                    'https://res.cloudinary.com/dzilw7kgd/image/upload/v1740485864/TransitTask-Assets/tmp-3-1740485864487_sdmyhn.png'
                  }
                  alt={selectedIssue.user?.name || 'Anonymous'}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="text-sm text-gray-600">
                  {selectedIssue.user?.name || 'Anonymous'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    selectedIssue.status === 'open'
                      ? 'bg-blue-100 text-blue-800'
                      : selectedIssue.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {selectedIssue.status}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(selectedIssue.createdAt)}
                </span>
              </div>
            </div>
          </InfoWindow>
        )}

        {/* Current user location marker */}
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

export default IssuesMap;
