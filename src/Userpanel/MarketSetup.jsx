// MarketSetup.jsx
import React from 'react';
import { Target, Scale, Zap, TrendingUp, TrendingDown, BookOpen } from 'lucide-react';

// NOTE: Ensure your rai-dashboard.css includes the necessary utility classes.

const MarketSetup = () => {
  // --- DUMMY MARKET SETUP DATA ---
  const dummySetupData = {
    keyLevels: {
      support: [
        { level: "24,500 - 24,550 (Psychological/Fib)", comment: "Major support zone, breakdown could trigger deep correction." },
        { level: "24,300 (Weekly Low)", comment: "Short-term crucial support; intraday bias turns weak below this." },
        { level: "23,800 (20-Day EMA)", comment: "Strong technical cushion for the medium-term trend." },
      ],
      resistance: [
        { level: "25,000 - 25,050 (Psychological/Swing High)", comment: "Immediate hurdle; sustained closing above this is highly bullish." },
        { level: "25,200 (All-Time High)", comment: "Ultimate barrier; new uptrend starts upon breach." },
        { level: "25,350 (Projected Extension T1)", comment: "Upper band of channel." },
      ],
    },
    patterns: [
      {
        title: "Chart Pattern",
        icon: Scale,
        name: "Ascending Triangle",
        status: "Active (Breakout pending)",
        comment: "Developing on the Daily chart. Suggests consolidation with a potential upward breakout.",
        color: '#ffc107', // Yellow for Warning/Pending
      },
      {
        title: "Candle Pattern",
        icon: BookOpen,
        name: "Doji (Weekly)",
        status: "Confirmed (Indecision)",
        comment: "Indicates market fatigue and indecision at high levels. A cautionary signal.",
        color: '#6c757d', // Gray/Muted for Indecision
      },
    ],
    events: [
      {
        title: "Breakout/Breakdown",
        icon: TrendingDown,
        name: "Bank Nifty Breakdown",
        status: "Confirmed Breakdown",
        price: "Below 54,000",
        comment: "A sharp breakdown below the 54,000 support, suggesting weakness in the financial sector.",
        color: '#dc3545', // Red for Breakdown
      },
      {
        title: "Retest/Confirmation",
        icon: TrendingUp,
        name: "Midcap Index Retest",
        status: "Retest Successful",
        price: "At 42,100",
        comment: "Midcap index successfully retested the previous breakout zone, confirming strength for the next leg up.",
        color: '#198754', // Green for Confirmation
      },
    ]
  };

  // Helper Card Component for Patterns/Events
  const SetupCard = ({ title, icon: Icon, name, status, price, comment, color }) => (
    <div className="rai-card card mb-4 h-100" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="card-body">
        <div className="rai-flex-header mb-2">
          <div className="rai-icon-bg me-3" style={{ backgroundColor: `${color}15` }}>
            <Icon size={24} color={color} />
          </div>
          <h6 className="rai-insight-title mb-0" style={{ color: color }}>{title}</h6>
        </div>
        <h4 className="card-title h5 mb-1">{name}</h4>
        {price && <p className="mb-1 small text-muted">Price Action: **{price}**</p>}
        <p className={`fw-bold small mb-1`} style={{ color: color }}>Status: {status}</p>
        <p className="card-text small text-dark">{comment}</p>
        {/* Optional Image Placeholder */}
        {name.includes('Triangle') && (
          <div className="mt-2 p-2 bg-light text-center border rounded">


            [Image of Ascending Triangle Chart Pattern]

          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="rai-module-content p-3">
      <h2 className="border-bottom pb-2 mb-4 text-primary">Market Setup: Technical Structure</h2>

      {/* 1. Support & Resistance Section */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3">
          <div className="card h-100 rai-card-levels border-danger">
            <div className="card-header bg-danger text-white fw-bold d-flex align-items-center">
              <Target size={18} className="me-2" /> Key Resistance Levels
            </div>
            <ul className="list-group list-group-flush">
              {dummySetupData.keyLevels.resistance.map((item, index) => (
                <li key={`R-${index}`} className="list-group-item small">
                  <span className="fw-bold text-danger me-2">{item.level}</span>
                  <span className="text-muted">({item.comment})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-6 mb-3">
          <div className="card h-100 rai-card-levels border-success">
            <div className="card-header bg-success text-white fw-bold d-flex align-items-center">
              <Target size={18} className="me-2" /> Key Support Levels
            </div>
            <ul className="list-group list-group-flush">
              {dummySetupData.keyLevels.support.map((item, index) => (
                <li key={`S-${index}`} className="list-group-item small">
                  <span className="fw-bold text-success me-2">{item.level}</span>
                  <span className="text-muted">({item.comment})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Patterns and Events Section */}
      <h4 className="mt-3 mb-3 text-secondary border-bottom pb-1">Current Patterns & Breakouts</h4>
      <div className="row">
        {/* Chart Pattern Card */}
        <div className="col-12 col-md-6 col-lg-3">
          <SetupCard {...dummySetupData.patterns[0]} />
        </div>
        {/* Candle Pattern Card */}
        <div className="col-12 col-md-6 col-lg-3">
          <SetupCard {...dummySetupData.patterns[1]} />
        </div>
        {/* Breakout/Breakdown Card */}
        <div className="col-12 col-md-6 col-lg-3">
          <SetupCard {...dummySetupData.events[0]} />
        </div>
        {/* Retest/Confirmation Card */}
        <div className="col-12 col-md-6 col-lg-3">
          <SetupCard {...dummySetupData.events[1]} />
        </div>
      </div>

     
    </div>
  );
};

export default MarketSetup;