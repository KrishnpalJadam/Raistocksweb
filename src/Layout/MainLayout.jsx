



import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import './Sidebar.css';
import Mainheader from "./Mainheader";
import Sidebar from "./Sidebar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const MainLayout = () => {
  const [screenSize, setScreenSize] = useState(getScreenCategory());
  const [sidebarVisible, setSidebarVisible] = useState(screenSize === 'desktop');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);

  function getScreenCategory() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width >= 768 && width < 992) return 'tablet';
    return 'desktop';
  }

  const handleToggleSidebar = () => {
    if (screenSize === 'desktop') {
      setSidebarVisible(prev => !prev);
    }
  };

  const handleToggleMobileSidebar = () => {
    setSidebarOpen(prev => !prev);
    const offcanvasEl = document.getElementById("mobileSidebar");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.toggle();
    else new bootstrap.Offcanvas(offcanvasEl).show();
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    const offcanvasEl = document.getElementById("mobileSidebar");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();
  };

  useEffect(() => {
    const handleResize = () => {
      const currentScreen = getScreenCategory();
      setScreenSize(currentScreen);
      if (currentScreen === 'desktop') {
        setSidebarVisible(true);
        setSidebarOpen(false);
      } else {
        setSidebarVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row fixed-top bg-white">
        <div className="col-12">
          <Mainheader
            onToggleSidebar={handleToggleSidebar}
            onToggleMobileSidebar={handleToggleMobileSidebar}
          />
        </div>
      </div>

      {/* Content Row */}
      <div className="row" style={{ paddingTop: "65px" }}>
        {/* Sidebar for Desktop */}
        {screenSize === 'desktop' && sidebarVisible && (
          <div className="col-lg-2 p-0 d-none d-lg-block">
            <Sidebar
              collapsed={false}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
              onCloseMobile={handleCloseSidebar}
              isMobileVisible={sidebarOpen}
            />
          </div>
        )}

        {/* Main Content */}
        <div
          className={`${screenSize === 'desktop' && sidebarVisible ? "col-md-9 col-lg-10  darkmodd" : "col-12"
            } bg-light`}
        >
          <div className="p-4 mainoutlet">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Offcanvas Sidebar for Mobile/Tablet */}
      {(screenSize === 'mobile' || screenSize === 'tablet') && (
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          style={{ width: '80%' }} // Set width here
        >
          <div className="offcanvas-body p-0">
            <Sidebar
              collapsed={false}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
              onCloseMobile={handleCloseSidebar}
              isMobileVisible={sidebarOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
















