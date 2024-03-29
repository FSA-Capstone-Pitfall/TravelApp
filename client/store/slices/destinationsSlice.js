import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDestinations = createAsyncThunk('/destinations', async ({ identifier }) => {
  try {
    const { data } = await axios.get(`/api/destinations`, {
      params: {
        identifier
      }
    });
    return data;
  } catch (err) {
    throw err;
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
  },
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
        state.error = action.payload;
      });
  }
});

export default destinations.reducer;
