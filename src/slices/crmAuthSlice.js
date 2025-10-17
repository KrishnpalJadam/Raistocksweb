import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/crm`;

// ✅ Register and auto-login
export const registerCRMUser = createAsyncThunk(
  "crm/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      const data = response.data;

      // The actual user object is likely nested under a 'user' property.
      // Ensure this matches the structure in loginCRMUser.
      if (data && data.user) {
        localStorage.setItem("crmUser", JSON.stringify(data.user));
        return data.user; // Return only the user object
      // The actual user object is inside the 'data' property of the response.
      // Let's return that and also save it to localStorage.
      if (data && data.data) {
        localStorage.setItem("crmUser", JSON.stringify(data.data));
        return data.data; // Return only the user object
      }
      return rejectWithValue("Invalid response from server on registration");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ✅ Login
export const loginCRMUser = createAsyncThunk(
  "crm/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const data = response.data;

      // The actual user object is likely nested under a 'user' property.
      if (data && data.user) {
        localStorage.setItem("crmUser", JSON.stringify(data.user));
        return data.user; // Return only the user object
      // The actual user object is inside the 'data' property of the response.
      // Let's return that and also save it to localStorage.
      if (data && data.data) {
        localStorage.setItem("crmUser", JSON.stringify(data.data));
        return data.data; // Return only the user object
      }
      return rejectWithValue("Invalid response from server");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Logout
export const logoutCRMUser = createAsyncThunk("crm/logout", async () => {
  localStorage.removeItem("crmUser");
  return null;
});

// ✅ Slice
const crmAuthSlice = createSlice({
  name: "crmAuth",
  initialState: {
    user:
      // The stored item is now the user object directly.
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("crmUser")) || null
        : null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerCRMUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCRMUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerCRMUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginCRMUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCRMUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // payload is now the user object
      })
      .addCase(loginCRMUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutCRMUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default crmAuthSlice.reducer;
