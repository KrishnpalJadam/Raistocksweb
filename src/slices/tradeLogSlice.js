import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/trade-diary`;

// Fetch user's trade diary entries
export const fetchTradeDiaryEntries = createAsyncThunk(
  "tradeLogs/fetchAll",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      // Ensure we always return an array
      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add new trade diary entry
export const addTradeDiaryEntry = createAsyncThunk(
  "tradeLogs/add",
  async (entryData, { rejectWithValue }) => {
    try {
      // Log the data being sent to the backend for debugging
      console.log("Data being sent to /api/trade-diary:", entryData);
      const response = await axios.post(API_URL, entryData);
      return response.data;
    } catch (error) {
      // Log the detailed error response from the backend
      console.error("Backend Error:", error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update trade diary entry
export const updateTradeDiaryEntry = createAsyncThunk(
  "tradeLogs/update",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const userId = getState().crmAuth.user?.data?.id;
      if (!userId) throw new Error("User not logged in");

      const response = await axios.put(`${API_URL}/${id}`, {
        ...data,
        user_id: userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete trade diary entry
export const deleteTradeDiaryEntry = createAsyncThunk(
  "tradeLogs/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const userId = getState().crmAuth.user?.data?.id;
      if (!userId) throw new Error("User not logged in");

      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  logs: [],
  loading: false,
  error: null,
};

const tradeLogSlice = createSlice({
  name: "tradeLogs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch entries
      .addCase(fetchTradeDiaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  .addCase(fetchTradeDiaryEntries.fulfilled, (state, action) => {
  state.loading = false;
  const payload = action.payload;

  // Ensure it's always an array
  if (Array.isArray(payload)) {
    state.logs = payload;
  } else if (Array.isArray(payload.data)) {
    state.logs = payload.data;
  } else {
    state.logs = []; // fallback
  }
})
      .addCase(fetchTradeDiaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add entry
      .addCase(addTradeDiaryEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTradeDiaryEntry.fulfilled, (state, action) => {
        state.loading = false;
        // The backend might return the new entry directly or nested in a 'data' property.
        // This handles both cases.
        const newLog = action.payload.data || action.payload;
        // Add the new log to the beginning of the array
        state.logs.unshift(newLog);
      })
      .addCase(addTradeDiaryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update entry
      .addCase(updateTradeDiaryEntry.fulfilled, (state, action) => {
        const index = state.logs.findIndex(
          (log) => log._id === action.payload._id
        );
        if (index !== -1) {
          state.logs[index] = action.payload;
        }
      })

      // Delete entry
      .addCase(deleteTradeDiaryEntry.fulfilled, (state, action) => {
        state.logs = state.logs.filter((log) => log._id !== action.payload);
      });
  },
});

// Selectors
export const selectAllLogs = (state) => state.tradeLogs.logs;
export const selectTotalProfit = (state) =>
  state.tradeLogs.logs
    .filter((log) => log.result === "Profit")
    .reduce((sum, log) => sum + log.pnl, 0);
export const selectTotalLoss = (state) =>
  state.tradeLogs.logs
    .filter((log) => log.result === "Loss")
    .reduce((sum, log) => sum + log.pnl, 0);

export default tradeLogSlice.reducer;
