// src/slices/crmAuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/crm`;

// ============================
// ✅ REGISTER
// ============================
export const registerCRMUser = createAsyncThunk(
  "crm/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, {
        withCredentials: true, // allow cookies to be set
      });
      return response.data; // backend should return user info
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ============================
// ✅ LOGIN
// ============================
export const loginCRMUser = createAsyncThunk(
  "crm/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true } // send/receive cookies
      );
      return response.data; // backend should return user data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ============================
// ✅ GET PROFILE (persistent login)
// ============================
export const getCRMUserProfile = createAsyncThunk(
  "crm/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        withCredentials: true, // include cookies
      });
      return response.data; // user info if authenticated
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Not authorized");
    }
  }
);

// ============================
// ✅ LOGOUT
// ============================
export const logoutCRMUser = createAsyncThunk(
  "crm/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      return null; // clear state
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

// ============================
// ✅ SLICE
// ============================
const crmAuthSlice = createSlice({
  name: "crmAuth",
  initialState: {
    user: null, // user info
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerCRMUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCRMUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data || null;
      })
      .addCase(registerCRMUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginCRMUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCRMUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data || null;
        state.error = null;
      })
      .addCase(loginCRMUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // GET PROFILE
      .addCase(getCRMUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCRMUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data || null;
      })
      .addCase(getCRMUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutCRMUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default crmAuthSlice.reducer;
