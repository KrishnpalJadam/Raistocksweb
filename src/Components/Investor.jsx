import React, { useEffect, useState } from "react";
import trader1 from "../assets/img2.jpg"; // Index Options/Futures
import trader2 from "../assets/img3.png"; // Crude/Gold/Silver
import trader3 from "../assets/imag4.png"; // Stock Options/Futures
import { Link } from "react-router-dom";
 // Create a CSS similar to Trader.css for styling

const Investor = () => {
  const cards = [
    { img: trader1, title: "Cash" },
    { img: trader2, title: "F&O For Hedging" },
    { img: trader3, title: "Cash" },
  
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change card every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="web-investor">
      {/* Hero Section */}
      <section className="web-trader-hero d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 className="fw-bold mb-2">SEBI Registered Research Analyst</h1>
          <p className="fs-5 mb-1">Registration Number – INH000020396</p>
          <h2 className="fw-bold mt-3">Investors</h2>
          <p className="fs-5 mt-2">
            "We don’t just help you pick stocks. We help you build a life of control, clarity, and financial freedom."
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="web-investor-services py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-uppercase text-primary">Our</h6>
            <h2 className="fw-bold">Services</h2>
          </div>

          <div className="row align-items-start">
            {/* LEFT SIDE (TEXT) */}
            <div className="col-md-6">
              <div className="text-start">
                <ul className="list-unstyled fs-6">
                    <span className="fw-bold fs-5">-  Cash</span> <br />
                     <span className="fw-bold fs-5 mt-4">-  F&O for Hedging</span>
                  <li>
                    <p className="text-muted" style={{ fontSize: "1rem", marginTop: "10px" }}>
                      You get 1 to 4* actionable ideas every market week:
                    </p>
                    <ul style={{ listStyleType: "disc" }}>
                      <li>Swing Trades – Hold for weeks to months, with strong entry/exit logic</li>
                      <li>Investment Ideas – Long-term equity picks with solid fundamentals</li>
                      <li>FNO for portfolio hedging</li>
                    </ul>
                  </li>
                </ul>
                <p className="text-muted mt-3">(Minimum 8 Calls in a month)</p>
                <p className="fw-bold">Ideal Capital: ₹2.5 lakh to ₹6 lakh</p>
                <p className="text-muted small fst-italic">
                  *If we don’t have a clear insight, we will not give any calls for the week.
                </p>

                <Link to="/ourplan" className="btn btn-primary px-4 py-2 mt-3">
                  Subscribe Now
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE (CARDS) */}
            <div className="col-md-6 slidersection">
              <div className="web-investor-card shadow rounded-3 overflow-hidden text-center animate-card">
                <img
                  src={cards[currentIndex].img}
                  alt={cards[currentIndex].title}
                  className="w-100 card-image"
                />
                <div className="p-3 bg-white">
                  <h6 className="fw-bold mb-0">{cards[currentIndex].title}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="web-investor-details py-5 bg-light">
        <div className="container">
          <h3 className="fw-bold text-center mb-4">Service Details</h3>
          <p className="text-muted text-center mb-5">
            Our subscription service offers research-driven market insights and trade guidance, 
            designed to support informed decision-making and responsible risk-taking.
          </p>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Service Delivery</h5>
            <ul className="text-muted">
              <li>
                Trade Recommendations (entry, target, and stop-loss) will be shared via WhatsApp for easy and timely access.
              </li>
              <li>
                Full research, strategy logic, technical context, and market conditions will be available on the Client Dashboard (secure login).
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Scope of Information Available on Dashboard</h5>
            <ul className="text-muted">
              <li>Market Sentiment, Market Cycle, and Sectoral Trends</li>
              <li>Technical Setups: Support & Resistance, Chart/Candlestick Patterns</li>
              <li>Breakouts, Retests, and Market Structure</li>
              <li>Trade Setups with Strategy Explanation</li>
              <li>Risk Management Framework: Allocation & Rebalancing Guidelines</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Performance Tracker: Transparent Results in Real Time</h5>
            <p className="text-muted">
              To ensure transparency, we provide access to a dedicated Performance Tracker as part of our dashboard.
            </p>
            <ul className="text-muted">
              <li>Track every recommendation’s performance — past and present</li>
              <li>Evaluate consistency and quality of our research</li>
              <li>Learn from historical setups to make better decisions</li>
            </ul>
            <p className="text-muted">
              <strong>Access Mode:</strong> Available 24/7 via secure Client Dashboard. Not shared via WhatsApp.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Disclaimer Regarding Performance</h5>
            <p className="text-muted">
              Tracker reflects research team’s assessment of outcomes based on publicly available data. Minor variations may exist due to client execution, market slippage, or timing. Educational only.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Client Responsibility</h5>
            <p className="text-muted">
              Clients should log in regularly to the dashboard before acting on recommendations. WhatsApp messages are for convenience only.
            </p>
          </div>

          <div>
            <h5 className="fw-bold text-dark">Disclaimer</h5>
            <p className="text-muted mb-0">
              All services are educational and represent the analyst’s research view. Not personalized investment advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investor;
