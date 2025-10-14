import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🟢 API base URL
const API_URL = "http://localhost:5000/api/trades"; // change if needed

// 🧾 Fetch all trades
export const fetchTrades = createAsyncThunk("trades/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// ✏️ Update trade
export const updateTrade = createAsyncThunk(
  "trades/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data.trade;
  }
);

// 🔍 Filter trades
export const filterTrades = createAsyncThunk(
  "trades/filter",
  async ({ segment, startDate, endDate }) => {
    const response = await axios.get(API_URL);
    const allTrades = response.data;

    // Local filtering logic (you can also shift it to backend later)
    const filtered = allTrades.filter((t) => {
      const matchSegment = segment ? t.segment === segment : true;
      const matchDate =
        startDate && endDate
          ? new Date(t.recommendationDateTime) >= new Date(startDate) &&
            new Date(t.recommendationDateTime) <= new Date(endDate)
          : true;
      return matchSegment && matchDate;
    });

    return filtered;
  }
);

const tradeSlice = createSlice({
  name: "trades",
  initialState: {
    trades: [],
    filteredTrades: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrades.fulfilled, (state, action) => {
        state.loading = false;
        state.trades = action.payload;
        state.filteredTrades = action.payload;
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update
      .addCase(updateTrade.fulfilled, (state, action) => {
        const updatedTrade = action.payload;
        const index = state.trades.findIndex((t) => t._id === updatedTrade._id);
        if (index !== -1) state.trades[index] = updatedTrade;
      })

      // Filter
      .addCase(filterTrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterTrades.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredTrades = action.payload;
      })
      .addCase(filterTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tradeSlice.reducer;
