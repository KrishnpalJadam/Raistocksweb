// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginClient } from "../slices/clientAuthSlice";

const Login = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [password] = useState("autofill"); // ✅ Just a placeholder, not used

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Correct slice reference
  const { client, loading, error } = useSelector((state) => state.clientAuth);

useEffect(() => {
  if (client) {
    toast.success("Login successful!🎉");
    setTimeout(() => {
      onClose();
      navigate("/customer/dashboard");
    }, 1500);
  }
}, [client, navigate, onClose]);

  // ✅ Hide modal if not visible
  if (!show) return null;

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    toast.error("Please enter your email");
    return;
  }

  try {
    await dispatch(loginClient({ email })).unwrap();
    // ❌ remove toast.success here
  } catch (err) {
    toast.error(err || "Invalid email");
  }
};

  return (
    <div className="rai-login-modal">
      <div className="rai-login-content">
        {/* Left Panel */}
        <div className="rai-login-left">
          <img
            src="https://assets.tickertape.in/images/landing-page/app_download.png"
            alt="Hand Mobile"
            className="img-fluid"
          />
          <h4 className="mt-3 text-primary d-none">
            Redefine your investing experience
          </h4>
          <p className="text-muted d-none">
            Login to Raistocks and manage your trading smarter with actionable insights.
          </p>
        </div>

        {/* Right Panel */}
        <div className="rai-login-right">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Login to Raistocks</h5>
            <button className="btn btn-sm btn-light" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field (autofilled, not used) */}
            <div className="mb-3">
              <label className="form-label">Password (auto-filled)</label>
              <input
                type="password"
                className="form-control"
                value={password}
                readOnly
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && <p className="text-danger small mt-2 text-center">{error}</p>}

          <p className="mt-3 small text-muted text-center">
            By logging in, you agree to our{" "}
            <a href="#terms">Terms & Conditions</a>
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;
