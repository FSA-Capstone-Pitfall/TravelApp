import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleActivity = createAsyncThunk(
  'fetchSingleActivity',
  async (activityId) => {
    try {
      const { data: activity } = await axios.get(
        `/api/activities/${activityId}`
      );
      return { activity };
    } catch (err) {
      throw err.message;
    }
  }
);

export const fetchActivities = createAsyncThunk('/activities', async ({
                                                                        destinationId,
                                                                        cityId,
                                                                        page,
                                                                        limit,
                                                                        categories,
                                                                      }) => {
  try {

    const { data } = await axios.get(`/api/activities`, {
      params: {
        destinationId: destinationId,
        cityId: cityId,
        page: page,
        limit: limit,
        categories: categories.join(','),
      },
    });
    return data;
  } catch (err) {
    throw err.message;
  }
);

const initialState = {
  activities: [],
  selectedActivity: {},
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
      })
      .addCase(fetchSingleActivity.fulfilled, (state, { payload }) => {
        if (payload.error) {
          let errorMessage = 'Something went wrong.';
          if (payload.error.response.status === 500) {
            errorMessage = 'No activity found.';
          }
          return { ...state, error: errorMessage };
        }
        return { ...state, selectedActivity: payload.activity };
      });
  },
});

export default activitiesSlice.reducer;
