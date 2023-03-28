import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchItineraries = createAsyncThunk('fetchItineraries', async ({ cityId, page, limit }) => {
  try {
    const { data } = await axios.get(`/api/itineraries`, {
      params: {
        cityId,
        page,
        limit
      }
    });

    return data;
  } catch (err) {
    throw err.message;
  }
});

export const fetchItinerary = createAsyncThunk('fetchItinerary', async ({ itineraryId }) => {
  try {
    const { data } = await axios.get(`/api/itineraries/${itineraryId}`);
    return data;
  } catch (err) {
    throw err.message;
  }
});

const initialState = {
  itineraries: null,
  itinerary: null,
  error: null
};

const itinerariesSlice = createSlice({
  name: 'getItineraries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItineraries.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItineraries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.itineraries = action.payload;
      })
      .addCase(fetchItineraries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchItinerary.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItinerary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.itinerary = action.payload;
      })
      .addCase(fetchItinerary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default itinerariesSlice.reducer;