import React, { useState } from "react";
import { LogIn, Menu } from "lucide-react";
import logo from "../assets/logo.png";
import Login from "../auth/Login";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header
      className="shadow-sm sticky-top bg-white"
      style={{ zIndex: 1050 }}
    >
      <nav className="navbar navbar-light py-3">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <a href="/" className="navbar-brand d-flex align-items-center">
            <img
              src={logo}
              alt="RAI Logo"
              className="me-2"
              style={{ height: 40 }}
            />
          </a>

          {/* Desktop Menu */}
          <ul className="d-none d-lg-flex list-unstyled mb-0 align-items-center gap-4">
            <li><a href="#home" className="nav-link text-dark fw-medium">Home</a></li>
            <li><a href="#about" className="nav-link text-dark fw-medium">About</a></li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark fw-medium"
                href="#services"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu shadow-sm">
                <li><a className="dropdown-item" href="#equity">Equity</a></li>
                <li><a className="dropdown-item" href="#commodities">Commodities</a></li>
                <li><a className="dropdown-item" href="#forex">Forex</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark fw-medium"
                href="#calculators"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Calculators
              </a>
              <ul className="dropdown-menu shadow-sm">
                <li><a className="dropdown-item" href="#sip">SIP Calculator</a></li>
                <li><a className="dropdown-item" href="#emi">EMI Calculator</a></li>
              </ul>
            </li>

            <li><a href="#contact" className="nav-link text-dark fw-medium">Contact</a></li>

            <li>
              <button
                className="btn btn-primary rounded-pill px-3 d-flex align-items-center"
                onClick={() => setShowLogin(true)}
              >
                <LogIn size={18} className="me-1" /> Login
              </button>
            </li>
          </ul>

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

          {/* Offcanvas Menu */}
          <div
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
                <li className="nav-item">
                  <a className="nav-link" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#services"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Services
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#equity">Equity</a></li>
                    <li><a className="dropdown-item" href="#commodities">Commodities</a></li>
                    <li><a className="dropdown-item" href="#forex">Forex</a></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#calculators"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Calculators
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#sip">SIP Calculator</a></li>
                    <li><a className="dropdown-item" href="#emi">EMI Calculator</a></li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contact</a>
                </li>

                <li className="mt-3">
                  <button
                    className="btn btn-primary w-100 rounded-pill"
                    onClick={() => setShowLogin(true)}
                    data-bs-dismiss="offcanvas"
                  >
                    <LogIn size={18} className="me-1" /> Login
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Login show={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
};

export default Header;
