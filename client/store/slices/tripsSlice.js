import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrips = createAsyncThunk('fetchTrips', async (userId) => {
  try {
    console.log('in the fetchTrips thunk', 'userId: ', userId);
    const { data } = await axios.get(`/api/users/${userId}/trips`);
    return data;
  } catch (err) {
    throw err.message;
  }
});

export const fetchSingleTrip = createAsyncThunk(
  'fetchSingleTrip',
  async ({ userId, tripId }) => {
    try {
      console.log(
        'in the fetchSingleTrip thunk',
        'userId: ',
        userId,
        'tripId: ',
        tripId
      );
      const { data } = await axios.get(`/api/users/${userId}/trips/${tripId}`);
      return data;
    } catch (err) {
      throw err.message;
    }
  }
);

const initialState = {
  itineraries: [],
  status: 'idle', // options: idle, loading, succeeded, failed
  error: null,
};

const trips = createSlice({
  name: 'trip',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.itineraries = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(fetchSingleTrip.fulfilled, (state, action) => {
        state.itineraries = action.payload;
      });
  },
});

export default trips.reducer;
