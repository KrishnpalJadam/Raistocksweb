// MarketSetup.jsx
import React from 'react';
import { Target, Scale, TrendingUp, TrendingDown, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketSetup = () => {
  // --- DUMMY MARKET SETUP DATA (same structure) ---
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

  // --- Card Component for Pattern/Event ---
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

        {name.includes("Triangle") && (
          <div className="mt-3 p-3 text-center border rounded bg-light text-muted small">
            [Chart pattern image placeholder]
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-3">

         <div className="d-flex  justify-content-between mb-4">
                <h4 className="" style={{ fontWeight: "600" }}>Market Setup</h4>
                {/* Filter Modal */}
                <Link
                    to="/customer/dashboard"
                    className="d-flex align-items-center justify-content-center text-dark 
             bg-white border rounded-pill shadow-sm"
                    style={{ width: "36px", height: "36px" }}
                >
                    <X size={20} />
                </Link>
            </div>
     
      {/* --- Support & Resistance --- */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-header bg-primary text-white fw-bold d-flex align-items-center">
              <Target size={18} className="me-2" /> Key Resistance Levels
            </div>
            <ul className="list-group list-group-flush">
              {dummySetupData.keyLevels.resistance.map((item, index) => (
                <li key={`R-${index}`} className="list-group-item small">
                  <span className="fw-semibold text-primary me-2">{item.level}</span>
                  <span className="text-muted">{item.comment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-6 mb-3">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-header bg-primary text-white fw-bold d-flex align-items-center">
              <Target size={18} className="me-2" /> Key Support Levels
            </div>
            <ul className="list-group list-group-flush">
              {dummySetupData.keyLevels.support.map((item, index) => (
                <li key={`S-${index}`} className="list-group-item small">
                  <span className="fw-semibold text-primary me-2">{item.level}</span>
                  <span className="text-muted">{item.comment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- Patterns & Events --- */}
     
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3">
          <SetupCard {...dummySetupData.patterns[0]} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <SetupCard {...dummySetupData.patterns[1]} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <SetupCard {...dummySetupData.events[0]} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <SetupCard {...dummySetupData.events[1]} />
        </div>
      </div>
    </div>
  );
};

export default MarketSetup;
