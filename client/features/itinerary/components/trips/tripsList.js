import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../../../store/slices/tripsSlice';
import TripCard from './tripCard.js';

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

  return itineraries.map((trip) => {
    if (trip.status === status) {
      return (
        <TripCard
          duration={trip.itinerary.duration}
          city={trip.itinerary.city.name}
          itineraryId={trip.itineraryId}
        />
      );
    }
  });
}

export default TripsList;
