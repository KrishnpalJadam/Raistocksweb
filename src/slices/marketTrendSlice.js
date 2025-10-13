import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch all market trends
export const fetchMarketTrends = createAsyncThunk(
  "marketTrend/fetchMarketTrends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/market-trend"); // change URL if deployed
      return response.data; // array of trends
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const marketTrendSlice = createSlice({
  name: "marketTrend",
  initialState: {
    trends: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.trends = action.payload;
      })
      .addCase(fetchMarketTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default marketTrendSlice.reducer;
