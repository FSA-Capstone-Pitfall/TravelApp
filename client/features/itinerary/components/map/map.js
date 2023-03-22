import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const MapWithMarkers = (destinations) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
