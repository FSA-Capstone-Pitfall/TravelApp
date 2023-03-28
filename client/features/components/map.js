import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const Map = ({ destinations }) => {
  const locationKey = 'AIzaSyARbbsqAblNXS7rOerdE1gI_q5a6yQyXgw';

  // Get the first destination as the center
  const defaultCenter = destinations[0];

  return (
    <LoadScript googleMapsApiKey={locationKey}>
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

export default Map;
