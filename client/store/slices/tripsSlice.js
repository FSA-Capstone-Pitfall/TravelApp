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

export const createTrip = createAsyncThunk(
  'createTrip',
  async ({ userId, name, city }) => {
    try {
      const { data: itinerary } = await axios.post(
        `/api/users/${userId}/itineraries`,
        {
          name,
          city,
        }
      );
      return { itinerary };
    } catch (error) {
      console.error('Unable to create itinerary.', error);
      return { error };
    }
  }
);

export const editTripActivity = createAsyncThunk(
  'editTripActivity',
  async ({ userId, tripId, activity, date, notes }) => {
    console.log('in the trips slice', userId, tripId, activity, date, notes);
    try {
      const { data } = await axios.put(`/api/users/${userId}/trips/${tripId}`, {
        activity,
        date,
        notes,
      });
      return data;
    } catch (err) {
      throw err.message;
    }
  }
);

export const editTripName = createAsyncThunk(
  'editTripName',
  async ({ userId, tripId, name }) => {
    console.log('in the trips slice', userId, tripId, name);
    try {
      const { data } = await axios.put(
        `/api/users/${userId}/trips/${tripId}/name`,
        {
          name,
        }
      );
      return data;
    } catch (err) {
      throw err.message;
    }
  }
);

export const deleteTripActvity = createAsyncThunk(
  'deleteTripActivity',
  async ({ userId, tripId, activityId }) => {
    console.log(
      'in the deleteTripActivity thunk',
      'userId: ',
      userId,
      'tripId: ',
      tripId,
      'activityId: ',
      activityId
    );
    try {
      const { data } = await axios.delete(
        `/api/users/${userId}/trips/${tripId}`,
        { data: { activityId } }
      );
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
      })
      .addCase(deleteTripActvity.fulfilled, (state, action) => {
        state.itineraries = action.payload;
      })
      .addCase(createTrip.fulfilled, (state, { payload }) => {
        if (payload.error) {
          let errorMessage = 'Something went wrong.';
          if (payload.error.response.status === 500) {
            errorMessage = 'Cannot create itinerary.';
          }
          return { ...state, error: errorMessage };
        }
        state.itineraries.push(payload.itinerary);
      })
      .addCase(editTripName.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(editTripActivity.fulfilled, (state, action) => {
        state.itineraries = action.payload;
      });
  },
});

export default trips.reducer;
