// src/redux/researchReportSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/research-reports`; // Adjust base path if needed

// --- Fetch all reports ---
export const fetchResearchReports = createAsyncThunk(
  "researchReports/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reports"
      );
    }
  }
);

// --- Delete a report ---
export const deleteResearchReport = createAsyncThunk(
  "researchReports/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete report"
      );
    }
  }
);

// src/redux/researchReportSlice.js
const researchReportSlice = createSlice({
  name: "researchReports",
  initialState: {
    reports: [], // ✅ ensure always an array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResearchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(fetchResearchReports.fulfilled, (state, action) => {
  console.log("Fetched reports payload:", action.payload); // 🪄 Add this line
  state.loading = false;
  state.reports = Array.isArray(action.payload)
    ? action.payload
    : action.payload?.reports || [];
})
      .addCase(fetchResearchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default researchReportSlice.reducer;
