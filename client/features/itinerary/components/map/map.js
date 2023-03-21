import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapWithMarkers = (destinations) => {
  const apiKey = 'AIzaSyDgbRMDx6Coo7NSWhHae1La5TcxQBbS36w';

  // Get the first destination as the center
  const defaultCenter = destinations[0];

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {destinations.map((destination, index) => (
          <Marker key={index} position={destination} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithMarkers;
