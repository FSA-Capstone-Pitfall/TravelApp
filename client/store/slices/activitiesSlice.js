import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchActivities = createAsyncThunk('/activities', async ({
                                                                        destinationId,
                                                                        cityId,
                                                                        page,
                                                                        limit,
                                                                        categories,
                                                                      }) => {
  try {

    console.log({
      destinationId,
      cityId,
      page,
      limit,
      categories,
    })
    const { data } = await axios.get(`/api/activities`, {
      params: {
        destinationId: destinationId,
        cityId: cityId,
        page: page,
        limit: limit,
        categories: categories,
      },
    });
    return data;
  } catch (err) {
    throw err.message;
  }
});

const initialState = {
  activities: [],
  singleActivity: {},
  status: 'idle', // options: idle, loading, succeeded, failed
  error: null,
};

const activitiesSlice = createSlice({
  name: 'getActivity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default activitiesSlice.reducer;