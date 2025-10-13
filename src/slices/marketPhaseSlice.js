import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch Market Phase data from backend
export const fetchMarketPhases = createAsyncThunk(
  "marketPhase/fetchMarketPhases",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/market-phase"); // 👈 Update base URL if needed
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch market phases"
      );
    }
  }
);

const marketPhaseSlice = createSlice({
  name: "marketPhase",
  initialState: {
    marketPhases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketPhases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketPhases.fulfilled, (state, action) => {
        state.loading = false;
        state.marketPhases = action.payload;
      })
      .addCase(fetchMarketPhases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default marketPhaseSlice.reducer;
