import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCities = createAsyncThunk('/cities', async () => {
  try {
    const { data } = await axios.get(`/api/cities`);
    return data;
  } catch (err) {
    throw err;
  }
});

const initialState = {
  cities: [],
  status: 'idle', // options: idle, loading, succeeded, failed
  error: null,
};

const cities = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.cities = action.payload;
    });
  },
});

export default cities.reducer;
