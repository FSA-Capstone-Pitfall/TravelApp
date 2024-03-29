import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import destinationsReducer from './slices/destinationsSlice';
import tripsReducer from './slices/tripsSlice';
import activitiesReducer from './slices/activitiesSlice';
import itinerariesReducer from './slices/itinerariesSlice';
import citiesReducer from './slices/citiesSlice';
import { createLogger } from 'redux-logger/src';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    destinations: destinationsReducer,
    trips: tripsReducer,
    activities: activitiesReducer,
    itineraries: itinerariesReducer,
    cities: citiesReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(createLogger()),
});

export default store;
export * from './slices/destinationsSlice';
export * from './slices/authSlice';
export * from './slices/activitiesSlice';
export * from './slices/destinationsSlice';
export * from './slices/itinerariesSlice';
export * from './slices/citiesSlice';
export * from './slices/tripsSlice';
