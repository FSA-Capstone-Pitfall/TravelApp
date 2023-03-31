import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../../store/slices/tripsSlice';
import TripCard from './tripCard';

function TripsList({ status }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const itineraries = useSelector((state) => state.trips.itineraries);

  let userId;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    dispatch(fetchTrips(userId));
  }, [dispatch, userId]);

  const filteredTrips = itineraries
    .filter((itinerary) => itinerary.status === status)
    .filter((trip, index) => {
      if (status === 'upcoming') {
        return index !== 0;
      }
      return true;
    });

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
