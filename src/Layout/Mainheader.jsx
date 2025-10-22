// src/components/Mainheader.jsx
import React, { useState } from "react";
import { Bell, User, Menu, X, LineChart } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import HelpPopup from "./HelpPopup";
import { useSelector, useDispatch } from "react-redux"; // ✅ import Redux hook
import { logoutCRMUser } from "../slices/crmAuthSlice";

const Mainheader = ({ isSidebarCollapsed, onToggleSidebar, onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.crmAuth); // ✅ get logged-in user from Redux
  const [showHelp, setShowHelp] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sidebar toggle for desktop & mobile
  const handleToggle = () => {
    if (window.innerWidth < 992) onToggleMobileSidebar();
    else onToggleSidebar();
  };

  // Navigate to dashboard
  const homePage = () => {
    navigate("/customer/dashboard");
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutCRMUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      <header className="rai-dashboard-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Sidebar Toggle */}
          <button
            className="btn rai-dashboard-icon-btn d-lg-none"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            <Menu className="text-dark" size={20} />
          </button>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="rai-dashboard-logo-text">
              <img src={logo} width={100} alt="Logo" />
            </span>
          </div>
        </div>

        {/* Dashboard Title */}
        <div
          className="text-center d-none d-sm-block fs-4"
          onClick={homePage}
          style={{ fontWeight: 700, cursor: "pointer" }}
        >
          Personal Dashboard
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* 📩 Trade Dropdown */}
          <div className="dropdown me-2" style={{ position: "relative" }}>
            <button
              className="btn btn-primary btn-sm d-flex align-items-center rounded-3 dropdown-toggle"
              type="button"
              id="tradeDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              📩
            </button>
            <span
              className="badge bg-danger rounded-pill"
              style={{
                fontSize: 10,
                position: "absolute",
                top: -6,
                right: -6,
              }}
            >
              3
            </span>

            <ul
              className="dropdown-menu dropdown-menu-end shadow-sm"
              aria-labelledby="tradeDropdown"
              style={{ fontSize: "0.9rem", minWidth: "230px" }}
            >
              <li className="dropdown-header fw-bold">Recent Trade</li>
              <li>
                <span className="dropdown-item text-wrap">
                  🔹 Long Banklify at ₹233
                </span>
                <div className="dropdown-item text-wrap ml-3">
                  <p className="ml-3">
                    Entry Price : <span className="text-muted">233</span>
                  </p>
                </div>
              </li>
              <li>
                <span className="dropdown-item text-wrap">
                  🔹 New signal posted in Nifty section.
                </span>
                <div className="dropdown-item text-wrap ml-3">
                  <p className="ml-3">
                    Entry Price : <span className="text-muted">233</span>
                  </p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  to="/customer/trade-recommendation"
                  className="dropdown-item text-center text-primary fw-semibold"
                >
                  View all
                </Link>
              </li>
            </ul>
          </div>

          {/* 🔔 Notifications */}
          <div className="dropdown me-2" style={{ position: "relative" }}>
            <button
              className="btn btn-primary btn-sm d-flex align-items-center rounded-3 dropdown-toggle"
              type="button"
              id="notificationDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              🔔
            </button>
            <span
              className="badge bg-danger rounded-pill"
              style={{
                fontSize: 10,
                position: "absolute",
                top: -6,
                right: -6,
              }}
            >
              3
            </span>

            <ul
              className="dropdown-menu dropdown-menu-end shadow-sm"
              aria-labelledby="notificationDropdown"
              style={{ fontSize: "0.9rem", minWidth: "230px" }}
            >
              <li className="dropdown-header fw-bold">Notifications</li>
              <li>
                <span className="dropdown-item text-wrap">
                  🔹 Trade "Banknifty CE" closed with profit.
                </span>
              </li>
              <li>
                <span className="dropdown-item text-wrap">
                  🔹 New signal posted in Nifty section.
                </span>
              </li>
              <li>
                <span className="dropdown-item text-wrap">
                  🔹 Reminder: Check your open positions.
                </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item text-center text-primary fw-semibold"
                  href="#"
                >
                  View all
                </a>
              </li>
            </ul>
          </div>

          {/* 👤 Profile Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-primary btn-sm d-flex align-items-center rounded-3 dropdown-toggle"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              👤
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end shadow-sm"
              aria-labelledby="profileDropdown"
              style={{ fontSize: "0.9rem", minWidth: "180px" }}
            >
              <li>
                <Link
                  to="/customer/profile"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bi bi-person me-2"></i> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="dropdown-item d-flex align-items-center text-danger"
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </Link>
              </li>
            </ul>
          </div>

          {/* ☀️ Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`btn btn-sm rounded-3 ${
              darkMode ? "btn-dark" : "btn-light"
            }`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      {/* ✅ Help Floating Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="btn btn-primary rounded-circle shadow-lg helppop"
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          zIndex: 1050,
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
        }}
      >
        ❔
      </button>

      {/* ✅ Help Popup (passes logged-in user's ID) */}
      {showHelp && user && (
        <HelpPopup onClose={() => setShowHelp(false)} userId={user._id} />
      )}
    </>
  );
};

export default Mainheader;
