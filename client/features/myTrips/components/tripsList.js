import React from 'react';
import TripCard from './tripCard';

function TripsList({ status, itineraries }) {
  const filteredTrips = itineraries.filter(
    (itinerary) => itinerary.status === status
  );

  return filteredTrips.map((trip) => {
    if (trip.status === status) {
      return (
        <TripCard
          key={trip.itinerary.id}
          duration={trip.itinerary.duration}
          city={trip.itinerary.city.name}
          itineraryId={trip.itineraryId}
          name={trip.itinerary.name}
          image={trip.itinerary.imageUrl}
          status={trip.status}
        />
      );
    }
  });
}

export default TripsList;
