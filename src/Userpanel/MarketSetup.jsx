// MarketSetup.jsx
import {
  Target,
  Scale,
  TrendingUp,
  TrendingDown,
  BookOpen,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMarketSetups } from "../slices/marketSetupSlice";

// import Chart from "chart.js/auto";
import { GaugeController, Needle } from "chartjs-gauge"; // ✅ Important import

const MarketSetup = () => {
  const chartRef = useRef(null);

  const [marketSetup, setMarketSetup] = useState(null); // ✅ Correct place
  const [activeStep, setActiveStep] = useState(1);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const { setups, loading, error } = useSelector((state) => state.marketSetup);
  const dispatch = useDispatch();

  // Get the latest setup (first in the array)
  const currentSetup = setups[0] || {
    on: "",
    price: 0,
    supportLevels: [],
    resistanceLevels: [],
    supportResistanceComment: "",
    phase: "",
    phaseComment: "",
    trend: "",
    trendComment: "",
    chartPattern: "",
    chartPatternComment: "",
    candlePattern: "",
    candlePatternComment: "",
    breakoutEvents: [], // Array of { formation: String, eventComment: String }
    imageUrl: "",
  };

  // Log the setup data for debugging
  useEffect(() => {
    console.log("Current setup updated:", currentSetup);
    if (currentSetup.breakoutEvents) {
      console.log("Breakout events:", currentSetup.breakoutEvents);
    }
  }, [currentSetup]);

  useEffect(() => {
    // Fetch market setups when component mounts
    dispatch(fetchMarketSetups())
      .unwrap()
      .then((data) => {
        console.log("Fetched market setups:", data);
      })
      .catch((error) => {
        console.error("Error fetching market setups:", error);
      });
  }, [dispatch]);

  // Set the marketSetup state when setups are loaded
  useEffect(() => {
    if (setups.length > 0) {
      setMarketSetup(setups[0]);
    }
  }, [setups]);

  // Chart effect
  useEffect(() => {
    if (!chartRef.current || !marketSetup) return;

    const phaseMap = {
      Fear: 0.25, // 25% of the gauge
      Accumulation: 0.5, // 50%
      Distribution: 0.75, // 75%
      Greed: 1.0, // 100%
    };

    const colorMap = {
      Fear: "#8B0000",
      Accumulation: "#FF6347",
      Distribution: "#90EE90",
      Greed: "#006400",
    };

    const needleValue = phaseMap[marketSetup.phase] || 0;
    const currentPhaseColor = colorMap[marketSetup.phase] || "#000";

    const data = {
      datasets: [
        {
          value: needleValue, // position of needle
          minValue: 0,
          data: [1], // total gauge value
          valueColorStops: [
            [0, "#8B0000"], // Fear zone
            [0.25, "#FF6347"], // Accumulation zone
            [0.5, "#90EE90"], // Distribution zone
            [0.75, "#006400"], // Greed zone
            [needleValue, currentPhaseColor], // Current phase color stops at needle
            [needleValue + 0.001, "#e0e0e0"], // Grey color after needle
            [1, "#e0e0e0"], // rest of gauge stays grey
          ],
          borderWidth: 1,
          needleColor: "#000", // needle color stays black
        },
      ],
    };

    const config = {
      type: "gauge",
      data: data,
      options: {
        responsive: true,
        layout: { padding: { bottom: 20 } },
        needle: {
          radiusPercentage: 2,
          widthPercentage: 3.2,
          lengthPercentage: 80,
          color: "#000", // keep needle black
        },
        valueLabel: { display: false },
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Market Phase Meter" },
        },
      },
    };

    const ctx = chartRef.current.getContext("2d");
    window.myGauge && window.myGauge.destroy();
    window.myGauge = new Chart(ctx, config);
  }, [marketSetup]);

  // Define colors for up to 5 steps/events
  const eventColors = {
    step1: "bg-orange-400",
    step2: "bg-orange-500",
    step3: "bg-red-500",
    step4: "bg-pink-500",
    step5: "bg-purple-500",
  };

  const SetupCard = ({ title, icon: Icon, name, status, price, comment }) => (
    <div className="card shadow-sm mb-4 border-primary h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-primary bg-opacity-10 rounded p-2 me-3 d-flex align-items-center justify-content-center">
            <Icon size={20} color="#0d6efd" />
          </div>
          <h6 className="mb-0 text-primary fw-semibold">{title}</h6>
        </div>
        <h5 className="fw-bold mb-1">{name}</h5>
        {price && (
          <p className="text-muted small mb-1">Price Action: {price}</p>
        )}

        <p className="small text-secondary mb-0">{comment}</p>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-3 market-meter-container">
      <div className="d-flex justify-content-between mb-4">
        <h4 style={{ fontWeight: "600" }}>Market Setup</h4>
        <Link
          to="/customer/dashboard"
          className="d-flex align-items-center justify-content-center text-dark bg-white border rounded-pill shadow-sm"
          style={{ width: "36px", height: "36px" }}
        >
          <X size={20} />
        </Link>
      </div>

      {/* === METER SECTION === */}
      <div className="card shadow-sm border-primary mb-4 p-3">
        <div className="row mb-3">
          <div className="col-6 text-center">
            <div className="market-meter-box bg-light border rounded py-2 fw-bold">
              {marketSetup?.on} - {marketSetup?.price}
            </div>
          </div>
          <div className="col-6 text-center">
            <div className="market-meter-box bg-light border rounded py-2 fw-bold text-success">
              Trend – {marketSetup?.trend}
            </div>
          </div>
        </div>

        <div
          className="text-center"
          style={{ width: "300px", margin: "0 auto" }}
        >
          <canvas ref={chartRef} width="300" height="150"></canvas>
          <div className="mt-2 fw-bold fs-6">
            Current Phase: {marketSetup?.phase}
          </div>
        </div>

        <div className="d-flex justify-content-end colorbox mt-2 gap-3">
          {/* Fear */}
          <div className="d-flex align-items-center gap-1">
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#8B0000",
                borderRadius: "2px",
              }}
            ></div>
            <small className="text-muted">Fear</small>
          </div>
          {/* Accumulation */}
          <div className="d-flex align-items-center gap-1">
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#FF6347",
                borderRadius: "2px",
              }}
            ></div>
            <small className="text-muted">Accumulation</small>
          </div>
          {/* Distribution */}
          <div className="d-flex align-items-center gap-1">
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#90EE90",
                borderRadius: "2px",
              }}
            ></div>
            <small className="text-muted">Distribution</small>
          </div>
          {/* Greed */}
          <div className="d-flex align-items-center gap-1">
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#006400",
                borderRadius: "2px",
              }}
            ></div>
            <small className="text-muted">Greed</small>
          </div>
        </div>
      </div>

      {/* --- Support & Resistance --- */}
      <div className="card border-primary mb-4">
        <div className="row mb-4">
          {/* Support Levels */}
          <div className="col-6 mb-3">
            <div className="card border-success shadow-sm h-100">
              <div className="card-header bg-success text-white fw-bold d-flex align-items-center">
                <Target size={18} className="me-2" /> Key Support Levels
              </div>
              <ul className="list-group list-group-flush">
                {currentSetup.supportLevels &&
                  currentSetup.supportLevels.map((level, i) => (
                    <li key={`S-${i}`} className="list-group-item small">
                      <span className="fw-semibold text-primary me-2">
                        {level.toLocaleString()}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Resistance Levels */}
          <div className="col-6 mb-3">
            <div className="card border-danger shadow-sm h-100">
              <div className="card-header bg-danger text-white fw-bold d-flex align-items-center">
                <Target size={18} className="me-2" /> Key Resistance Levels
              </div>
              <ul className="list-group list-group-flush">
                {currentSetup.resistanceLevels &&
                  currentSetup.resistanceLevels.map((level, i) => (
                    <li key={`R-${i}`} className="list-group-item small">
                      <span className="fw-semibold text-primary me-2">
                        {level.toLocaleString()}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Support/Resistance Comment */}
          <div className="p-3">
            <div
              className="bg-light p-3"
              style={{ width: "100%", height: "100px" }}
            >
              {currentSetup.supportResistanceComment || "No comment available"}
            </div>
          </div>
        </div>
      </div>
      {/* --- Patterns & Events --- */}
      <div className="row">
        {/* Chart Pattern Card */}
        <div className="col-12 col-md-6 col-lg-6">
          <SetupCard
            title="Chart Pattern"
            icon={Scale}
            name={currentSetup.chartPattern || "No pattern detected"}
            status="Active"
            comment={currentSetup.chartPatternComment || "No comment available"}
          />
        </div>
        {/* Candle Pattern Card */}
        <div className="col-12 col-md-6 col-lg-6">
          <SetupCard
            title="Candle Pattern"
            icon={BookOpen}
            name={currentSetup.candlePattern || "No pattern detected"}
            status="Active"
            comment={
              currentSetup.candlePatternComment || "No comment available"
            }
          />
        </div>
      </div>
      <div className="bg-white card border-primary mt-4">
        <div className="">
          <div className="steps p-3">
            {console.log("Current setup:", currentSetup)}
            {console.log("Breakout events:", currentSetup.breakoutEvents)}
            {currentSetup.breakoutEvents &&
              currentSetup.breakoutEvents.map((event, index) => {
                if (index < 5) {
                  // Limit to 5 events
                  return (
                    <div
                      key={index}
                      className={`step step${index + 1}`}
                      onClick={() => setActiveStep(index + 1)}
                    >
                      {event.formation || "N/A"}
                    </div>
                  );
                }
                return null;
              })}
          </div>
          <div className="p-3">
            <div
              className="bg-light p-3"
              style={{ width: "100%", height: "100px" }}
            >
              {(currentSetup.breakoutEvents &&
                currentSetup.breakoutEvents[activeStep - 1]?.eventComment) ||
                "Select an event to view comment"}
            </div>
          </div>
        </div>
      </div>

      {/* Image Button and Popup */}
      <div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            console.log("Image URL:", currentSetup.imageUrl);
            console.log(
              "Full Image URL:",
              `http://localhost:5000${currentSetup.imageUrl}`
            );
            setShowImagePopup(true);
          }}
          disabled={!currentSetup.imageUrl}
        >
          See Image 
        </button>
      </div>

      {/* Image Popup */}
      {showImagePopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
          }}
          onClick={() => setShowImagePopup(false)}
        >
          <div
            className="bg-white p-3 rounded position-relative"
            style={{ maxWidth: "90%", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-close position-absolute top-0 end-0 m-2"
              onClick={() => setShowImagePopup(false)}
            />
            <div className="text-center">
              {currentSetup.imageUrl ? (
                <img
                  src={`http://localhost:5000${currentSetup.imageUrl}`}
                  alt="Market Setup"
                  className="img-fluid"
                  style={{ maxHeight: "80vh" }}
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      currentSetup.imageUrl
                    );
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
              ) : (
                <div className="p-4 text-muted">No image available</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketSetup;
