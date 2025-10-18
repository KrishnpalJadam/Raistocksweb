import React, { useState } from "react";
import { LogIn, ChevronDown, Menu } from "lucide-react";
import logo from "../assets/logo.png";
import Login from "../auth/Login";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    {
      name: "Services",
      submenu: [
        { name: "Trader", to: "/trader" },
        { name: "Investor", to: "/investor" },
      ],
    },
    {
      name: "Calculators",
      submenu: [
        { name: "SIP", to: "#sip" },
        { name: "SWP", to: "/" },
        { name: "Rai Mambership Billng", to: "/" },
        { name: "Special", to: "/" },
      ],
    },
    { name: "Contact", to: "/contactUs" },
  ];

  const isActive = (item) => {
    if (item.to) return location.pathname === item.to;
    if (item.submenu) return item.submenu.some(sub => location.hash === sub.href);
    return false;
  };

  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("offcanvasNavbar");
    const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (offcanvas) offcanvas.hide();
  };

  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg  container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="RAI Logo" style={{ height: 60 }} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="btn d-lg-none border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <Menu size={26} />
        </button>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex justify-content-end flex-grow-1">
          <ul className="navbar-nav align-items-center gap-3">
            {menuItems.map((item, idx) =>
              item.submenu ? (
                <li className="nav-item dropdown" key={idx}>
                  <a
                    className={`nav-link dropdown-toggle position-relative ${isActive(item) ? "text-primary" : "text-black"}`}
                    href="#!"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    {item.name} <ChevronDown size={16} />
                    <span
                      className={`position-absolute bottom-0 start-0 w-100 border-2 border-primary ${isActive(item) ? "" : "opacity-0"}`}
                    ></span>
                  </a>
                  <ul className="dropdown-menu shadow rounded-3">
                    {item.submenu.map((sub, i) => (
                      <li key={i}>
                        <Link
                          className="dropdown-item text-dark fw-medium hover-bg-primary"
                          to={sub.to}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item" key={idx}>
                  <Link
                    to={item.to}
                    className={`nav-link fw-medium ${isActive(item) ? "text-primary border-bottom border-2 border-primary" : "text-black"}`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
            <li>
              <button
                className="btn btn-primary raibutton d-flex align-items-center transition-hover"
                onClick={() => setShowLogin(true)}
              >
              Login
              </button>
            </li>
          </ul>
        </div>

        {/* Offcanvas Mobile Menu */}
        {/* <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <img src={logo} alt="RAI Logo" style={{ height: 35 }} />
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {menuItems.map((item, idx) =>
                item.submenu ? (
                  <li className="nav-item dropdown" key={idx}>
                    <a
                      className="nav-link dropdown-toggle"
                      href="#!"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item.name}
                    </a>
                    <ul className="dropdown-menu">
                      {item.submenu.map((sub, i) => (
                        <li key={i}>
                          <a
                            className="dropdown-item"
                            href={sub.href}
                            onClick={closeOffcanvas}
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item" key={idx}>
                    <Link
                      to={item.to}
                      className="nav-link"
                      onClick={closeOffcanvas}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
              <li className="mt-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => { setShowLogin(true); closeOffcanvas(); }}
                >
                  <LogIn size={18} className="me-1" /> Login
                </button>
              </li>
            </ul>
          </div>
        </div> */}
      </nav>

      <Login show={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
};

export default Header;
