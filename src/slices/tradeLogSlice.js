import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/trade-diary`;

// ✅ 1. Fetch user's trade diary entries
export const fetchTradeDiaryEntries = createAsyncThunk(
  "tradeLogs/fetchAll",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);

      // ✅ Fix: handle all possible structures safely
      const data =
        response.data?.trades ||
        response.data?.data?.trades ||
        response.data?.data ||
        [];

      console.log("Fetched diary logs from backend:", data);
      return data;
    } catch (err) {
      console.error(
        "Fetch Trade Logs Error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2. Add new trade diary entry
export const addTradeDiaryEntry = createAsyncThunk(
  "tradeLogs/add",
  async (entryData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const client =
        state.clientAuth?.client ||
        state.client ||
        state.auth?.client ||
        state.auth?.user ||
        null;

      const userId = client?._id || client?.id;
      if (!userId) throw new Error("User not logged in");

      const dataToSend = { ...entryData, crmUser: userId };

      const response = await axios.post(API_URL, dataToSend);
      console.log("API Response:", response.data); // Debug log

      const resData = response.data;
      const newLog =
        resData?.data?.trade ||
        resData?.data ||
        (Array.isArray(resData) ? resData[0] : resData) ||
        null;

      console.log("Processed new log:", newLog); // Debug log

      if (!newLog)
        throw new Error("Invalid server response: no trade log returned");
      return newLog;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ 3. Update trade diary entry
export const updateTradeDiaryEntry = createAsyncThunk(
  "tradeLogs/update",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      // ✅ Same fix here
      const clientState = getState().clientAuth;
      const state = getState();
      const client =
        state.clientAuth?.client ||
        state.client ||
        state.auth?.client ||
        state.auth?.user ||
        null;

      const userId = client?._id || client?.id;
      if (!userId) throw new Error("User not logged in");
      if (!userId) throw new Error("User not logged in");

      const updatedData = { ...data, crmUser: userId };
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ 4. Delete trade diary entry
export const deleteTradeDiaryEntry = createAsyncThunk(
  "tradeLogs/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ 5. Slice setup
const tradeLogSlice = createSlice({
  name: "tradeLogs",
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTradeDiaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeDiaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTradeDiaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addTradeDiaryEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTradeDiaryEntry.fulfilled, (state, action) => {
        state.loading = false;
        const newLog = action.payload;
        if (newLog) state.logs.unshift(newLog);
      })
      .addCase(addTradeDiaryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateTradeDiaryEntry.fulfilled, (state, action) => {
        const idx = state.logs.findIndex(
          (log) => log._id === action.payload._id
        );
        if (idx !== -1) state.logs[idx] = action.payload;
      })

      // DELETE
      .addCase(deleteTradeDiaryEntry.fulfilled, (state, action) => {
        state.logs = state.logs.filter((log) => log._id !== action.payload);
      });
  },
});

// ✅ Selectors
export const selectAllLogs = (state) => state.tradeLogs.logs;

export const selectTotalProfit = (state) =>
  state.tradeLogs.logs
    .filter((log) => log.result === "Profit")
    .reduce((sum, log) => sum + (Number(log.pnl) || 0), 0);

export const selectTotalLoss = (state) =>
  state.tradeLogs.logs
    .filter((log) => log.result === "Loss")
    .reduce((sum, log) => sum + (Number(log.pnl) || 0), 0);

export const { clearError } = tradeLogSlice.actions;
export default tradeLogSlice.reducer;
