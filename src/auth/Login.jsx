import React, { useState } from "react";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "user@example.com" && password === "123") {
      toast.success("Login successful 🎉");
      setTimeout(() => {
        onClose();
       navigate("customer/dashboard")
      }, 1500);
    } else {
      toast.error("Invalid credentials");
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
          <h4 className="mt-3 text-primary d-none">Redefine your investing experience</h4>
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
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <p className="mt-3 small text-muted">
            By logging in, you agree to our <a href="#terms">Terms & Conditions</a>
          </p>
        </div>
      </div>

      {/* Toast */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;
