import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDestinations = createAsyncThunk('/destinations', async () => {
  try {
    const { data } = await axios.get('/api/destinations');
    return data;
  } catch (err) {
    throw err.message;
  }
});

export const fetchSingleDestination = createAsyncThunk(
  'fetchSingleDestination',
  async (location) => {
    try {
      const { data } = await axios.get(`/api/destinations/${location}`);
      return data;
    } catch (err) {
      throw err.message;
    }
  }
);

const initialState = {
  destinations: [],
  status: 'idle', // options: idle, loading, succeeded, failed
  error: null,
};

const destinations = createSlice({
  name: 'destination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.destinations = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(fetchSingleDestination.fulfilled, (state, action) => {
        state.destinations = action.payload;
      });
  },
});

export default destinations.reducer;
