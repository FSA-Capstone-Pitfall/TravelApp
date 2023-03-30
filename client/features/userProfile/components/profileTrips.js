import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../../store/slices/tripsSlice';
import ProfileCard from './profileCard.js';

function ProfileTrips() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const itineraries = useSelector((state) => state.trips.itineraries);

  useEffect(() => {
    if (user) {
      dispatch(fetchTrips(user.id));
    }
  }, [dispatch, user]);

  const filteredTrips = itineraries.filter(
    (itinerary) => itinerary.authorId === user.userId
  );

  return filteredTrips.map((trip) => (
    <ProfileCard
      key={trip.itinerary.id}
      duration={trip.itinerary.duration}
      city={trip.itinerary.city.name}
      itineraryId={trip.itineraryId}
      name={trip.itinerary.name}
      imageUrl={trip.itinerary.imageUrl}
    />
  ));
}

export default ProfileTrips;
