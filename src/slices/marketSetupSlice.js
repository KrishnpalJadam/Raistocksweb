import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
const API_URL = "http://localhost:5000/api/marketsetup";

// -------------------- Async Thunks -------------------- //

// Fetch all market setups
export const fetchMarketSetups = createAsyncThunk(
  "marketSetup/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data; // Expecting an array of setups
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Create a new market setup
export const createMarketSetup = createAsyncThunk(
  "marketSetup/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Delete a market setup by ID
export const deleteMarketSetup = createAsyncThunk(
  "marketSetup/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // Return deleted ID for state update
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// -------------------- Slice -------------------- //

const marketSetupSlice = createSlice({
  name: "marketSetup",
  initialState: {
    setups: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMarketSetups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketSetups.fulfilled, (state, action) => {
        state.loading = false;
        state.setups = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMarketSetups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createMarketSetup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMarketSetup.fulfilled, (state, action) => {
        state.loading = false;
        state.setups.unshift(action.payload); // Add new setup on top
      })
      .addCase(createMarketSetup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteMarketSetup.fulfilled, (state, action) => {
        state.setups = state.setups.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteMarketSetup.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetError } = marketSetupSlice.actions;
export default marketSetupSlice.reducer;
