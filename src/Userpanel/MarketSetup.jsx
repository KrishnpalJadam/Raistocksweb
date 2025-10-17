



// MarketSetup.jsx
import React, { useEffect, useRef } from "react";
import { Target, Scale, TrendingUp, TrendingDown, BookOpen, X } from "lucide-react";
import { Link } from "react-router-dom";
// import Chart from "chart.js/auto";
import { GaugeController, Needle } from "chartjs-gauge"; // ✅ Important import


const MarketSetup = () => {
  const chartRef = useRef(null);

  useEffect(() => {


const data = [25, 25, 25, 25]; // 4 segments 25% each
const config = {
  type: "gauge",
  data: {
    datasets: [
      {
        value: 44.44, // needle position
        minValue: 0,
        data: [100], // total gauge span
        valueColorStops: [
          [0.0, "#8B0000"],  // Fear
          [0.25, "#FF6347"], // Accumulation
          [0.5, "#90EE90"],  // Distribution
          [0.75, "#006400"], // Greed
          [1.0, "#006400"]
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    layout: { padding: { bottom: 20 } },
    needle: {
      radiusPercentage: 2,
      widthPercentage: 3.2,
      lengthPercentage: 80,
      color: "#000",
    },
    valueLabel: { display: false },
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Market Phase Meter" },
    },
  },
};



const ctx = chartRef.current.getContext('2d');
window.myGauge = new Chart(ctx, config);
 

    // Cleanup
    return () => {
      if (window.myGauge) {
        window.myGauge.destroy();
      }
    };
  }, []);

  // --- DUMMY MARKET SETUP DATA ---
  const dummySetupData = {
    keyLevels: {
      support: [
        { level: "24,500 - 24,550", comment: "Major support zone, breakdown could trigger correction." },
        { level: "24,300", comment: "Short-term crucial support; bias turns weak below this." },
        { level: "23,800", comment: "Strong cushion for the medium-term trend." },
      ],
      resistance: [
        { level: "25,000 - 25,050", comment: "Immediate hurdle; sustained closing above this is bullish." },
        { level: "25,200", comment: "Ultimate barrier; new uptrend starts upon breach." },
        { level: "25,350", comment: "Upper band of channel." },
      ],
    },
    patterns: [
      {
        title: "Chart Pattern",
        icon: Scale,
        name: "Ascending Triangle",
        status: "Active (Breakout pending)",
        comment: "Developing on the Daily chart, indicating potential upward breakout.",
      },
      {
        title: "Candle Pattern",
        icon: BookOpen,
        name: "Doji (Weekly)",
        status: "Confirmed (Indecision)",
        comment: "Shows market indecision at high levels — caution advised.",
      },
    ],
    events: [
      {
        title: "Breakdown Event",
        icon: TrendingDown,
        name: "Bank Nifty Breakdown",
        status: "Confirmed Breakdown",
        price: "Below 54,000",
        comment: "Breakdown below key support suggests weakness in financial sector.",
      },
      {
        title: "Retest Confirmation",
        icon: TrendingUp,
        name: "Midcap Index Retest",
        status: "Retest Successful",
        price: "At 42,100",
        comment: "Midcap index retested previous breakout zone — strength confirmed.",
      },
    ],
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
        {price && <p className="text-muted small mb-1">Price Action: {price}</p>}
        <p className="small fw-semibold text-primary mb-1">Status: {status}</p>
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
              BankNifty Spot – 56,850
            </div>
          </div>
          <div className="col-6 text-center">
            <div className="market-meter-box bg-light border rounded py-2 fw-bold text-success">
              Trend – Bullish
            </div>
          </div>
        </div>
        <div className="text-center" style={{ width: "300px", marginLeft: "auto", marginRight: "auto" }}>
          <canvas ref={chartRef} width="300" height="150"></canvas>
          <div className="mt-2 fw-bold text-success fs-6">Current Phase: Greed</div>


        </div>
        <div className="d-flex justify-content-end colorbox mt-2 gap-3">
          {/* Fear */}
          <div className="d-flex align-items-center gap-1">
            <div style={{ width: "12px", height: "12px", backgroundColor: "#8B0000", borderRadius: "2px" }}></div>
            <small className="text-muted">Fear</small>
          </div>

          {/* Accumulation */}
          <div className="d-flex align-items-center gap-1">
            <div style={{ width: "12px", height: "12px", backgroundColor: "#FF6347", borderRadius: "2px" }}></div>
            <small className="text-muted">Accumulation</small>
          </div>

          {/* Distribution */}
          <div className="d-flex align-items-center gap-1">
            <div style={{ width: "12px", height: "12px", backgroundColor: "#90EE90", borderRadius: "2px" }}></div>
            <small className="text-muted">Distribution</small>
          </div>

          {/* Greed */}
          <div className="d-flex align-items-center gap-1">
            <div style={{ width: "12px", height: "12px", backgroundColor: "#006400", borderRadius: "2px" }}></div>
            <small className="text-muted">Greed</small>
          </div>
        </div>

      </div>

      {/* --- Support & Resistance --- */}
      <div className="row mb-4">
        <div className="col-6 mb-3">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-header bg-primary text-white fw-bold d-flex align-items-center">
              <Target size={18} className="me-2" /> Key Resistance Levels
            </div>
            <ul className="list-group list-group-flush">
              {dummySetupData.keyLevels.resistance.map((item, i) => (
                <li key={`R-${i}`} className="list-group-item small">
                  <span className="fw-semibold text-primary me-2">{item.level}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>

        <div className="col-6 mb-3">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-header bg-primary text-white fw-bold d-flex align-items-center">
              <Target size={18} className="me-2" /> Key Support Levels
            </div>
            <ul className="list-group list-group-flush">
              {dummySetupData.keyLevels.support.map((item, i) => (
                <li key={`S-${i}`} className="list-group-item small">
                  <span className="fw-semibold text-primary me-2">{item.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- Patterns & Events --- */}
      <div className="row">
        {dummySetupData.patterns.concat(dummySetupData.events).map((item, i) => (
          <div className="col-12 col-md-6 col-lg-3" key={i}>
            <SetupCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSetup;











