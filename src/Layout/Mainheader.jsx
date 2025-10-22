// src/components/Mainheader.jsx
import React, { useState } from "react";
import { Bell, Menu } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import HelpPopup from "./HelpPopup";
import { useSelector, useDispatch } from "react-redux";
import { logoutClient } from "../slices/clientAuthSlice"; // ✅ use clientAuthSlice now

const Mainheader = ({ isSidebarCollapsed, onToggleSidebar, onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.clientAuth); // ✅ get logged-in client from Redux
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

  // ✅ Logout Handler
  const handleLogout = async () => {
    try {
      await dispatch(logoutClient()).unwrap();
      navigate("/"); // redirect to home/login
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      <header className="rai-dashboard-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            className="btn rai-dashboard-icon-btn d-lg-none"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            <Menu className="text-dark" size={20} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="rai-dashboard-logo-text">
              <img src={logo} width={100} alt="Logo" />
            </span>
          </div>
        </div>

        <div
          className="text-center d-none d-sm-block fs-4"
          onClick={homePage}
          style={{ fontWeight: 700, cursor: "pointer" }}
        >
          Personal Dashboard
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* 🔔 Notifications */}
          <div className="dropdown me-2" style={{ position: "relative" }}>
            <button
              className="btn btn-primary btn-sm d-flex align-items-center rounded-3 dropdown-toggle"
              type="button"
              id="notificationDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Bell size={18} />
            </button>
            <span
              className="badge bg-danger rounded-pill"
              style={{ fontSize: 10, position: "absolute", top: -6, right: -6 }}
            >
              3
            </span>
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
                <button
                  onClick={handleLogout}
                  className="dropdown-item d-flex align-items-center text-danger"
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </li>
            </ul>
          </div>

          {/* ☀️ Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`btn btn-sm rounded-3 ${darkMode ? "btn-dark" : "btn-light"}`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      {/* Help Floating Button */}
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

      {showHelp && <HelpPopup onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default Mainheader;
