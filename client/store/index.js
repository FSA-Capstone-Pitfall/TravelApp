import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import destinationsReducer from './slices/destinationsSlice';
import tripsReducer from './slices/tripsSlice';
import activitiesReducer from './slices/activitiesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    destinations: destinationsReducer,
    trips: tripsReducer,
    activities: activitiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

export default store;
export * from './slices/destinationsSlice';
export * from './slices/authSlice';
export * from './slices/activitiesSlice';