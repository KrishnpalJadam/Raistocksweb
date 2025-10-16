import React, { useEffect, useState } from "react";
import trader1 from "../assets/img2.jpg"; // Index Options/Futures
import trader2 from "../assets/img3.png"; // Crude/Gold/Silver
import trader3 from "../assets/imag4.png"; // Stock Options/Futures
import "./Trader.css";
import { Link } from "react-router-dom";

const Trader = () => {
  const cards = [
    { img: trader1, title: "Index Options / Futures" },
    { img: trader2, title: "Crude / Gold / Silver - Options / Futures" },
    { img: trader3, title: "Stock Options / Futures" },
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
    <div className="web-trader">
      {/* Hero Section - Matching the screenshot's top-area content */}
      <section className="web-trader-hero d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 className="fw-bold mb-2">SEBI Registered Research Analyst</h1>
          <p className="fs-5 mb-1">Registration Number - INH000020396</p>
          <h2 className="fw-bold mt-3">Traders</h2>
          <p className="fs-5 mt-2">
            When the World Throws Noise, We Offer Insight.
            <br />
            When The Market Brings Fear, We Deliver Focus.
            <br />
            When You're Overwhelmed, We Simplify.
          </p>
        </div>
      </section>

      {/* Services Section - Our Service */}
      <section className="web-trader-services py-5">
        <div className="container">
          <div className="text-center mb-5">
            {/* The CSS is used to render "Our Service" as a single heading */}
            <h6 className="text-uppercase text-primary">Our</h6>
            <h2 className="fw-bold">Service Offerings</h2>
          </div>

          <div className="row align-items-start"> {/* align-items-start for better alignment */}
            {/* LEFT SIDE (TEXT CONTENT) - Re-structured to match index-style list from screenshot */}
            <div className="col-md-6">
              <div className="text-start">
                <ul className="list-unstyled fs-6">
                  {/* These list items simulate the bold index titles in the screenshot */}
                  <li>
                    {/* Inner content is the list below "Cash" in the screenshot */}
                    <p className="text-muted" style={{fontSize: '1rem', marginTop: '10px'}}>
                      You get 1 to 4 actionable ideas every market day*
                    </p>
                    <ul style={{listStyleType: 'disc'}}>
                      <li>Scalp Trades – Quickfire momentum trades with tight risk control</li>
                      <li>Intraday Trades – Precision-based ideas for same-day profit</li>
                      <li>Swing Trades – Hold for weeks to months, with strong entry/exit logic</li>
                      <li>Investment Ideas – Long-term equity picks with solid fundamentals</li>
                      <li>Strategic Positions – Based on macro trends and market psychology</li>
                      <li>Income-Generating Ideas – Structured for passive, consistent return</li>
                    </ul>
                  </li>
                  {/* The other index titles are purely styled via CSS ::before selectors */}
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <p className="text-muted mt-3" style={{marginLeft: '15px'}}>(Minimum 24 calls in a month)</p>
                <p className="fw-bold" style={{marginLeft: '15px'}}>Ideal Capital: ₹2.5 lakh to ₹6 lakh</p>
                <p className="text-muted small fst-italic" style={{marginLeft: '15px'}}>
                  *If we don’t have a clear insight, we will not give any calls for the day.
                </p>

                <Link to="/ourplan" className="btn btn-primary px-4 py-2 mt-3 subscridbebuttton" style={{marginLeft: '15px'}}>Subscribe Now</Link>

               
              </div>
            </div>

            {/* RIGHT SIDE (CHANGING CARD) - Positioned to overlay the text below */}
            <div className="col-md-6 slidersection">
              <div className="web-trader-card shadow rounded-3 overflow-hidden text-center animate-card">
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
      <section className="web-trader-details py-5 bg-light">
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
                <strong>Trade Recommendations</strong> (entry, target, and stop-loss) will be shared via 
                <strong> WhatsApp</strong> for easy and timely access.
              </li>
              <li>
                The full research, strategy logic, technical context and market conditions will be 
                available on the <strong>Client Dashboard</strong> (accessible via secure login).
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Scope of Information Available on Dashboard</h5>
            <ul className="text-muted">
              <li>Market Sentiment, Market Cycle, and Sectoral Trends</li>
              <li>Technical Setups: Support &amp; Resistance, Chart/Candlestick Patterns</li>
              <li>Breakouts, Retests, and Market Structure</li>
              <li>Trade Setups with Strategy Explanation</li>
              <li>Risk Management Framework: Allocation &amp; Rebalancing Guidelines</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Performance Tracker: Transparent Results in Real Time</h5>
            <p className="text-muted">
              To ensure transparency and help clients evaluate our research objectively, we provide 
              access to a dedicated <strong>Performance Tracker</strong> as part of our dashboard.
            </p>
            <ul className="text-muted">
              <li>Track every recommendation’s performance — past and present</li>
              <li>Evaluate the consistency and quality of our research</li>
              <li>Make better decisions by learning from historical setups</li>
            </ul>
            <p className="text-muted">
              <strong>Access Mode:</strong> Available 24/7 via your secure Client Dashboard login. 
              Performance Tracker is <strong>not shared via WhatsApp</strong> to ensure data security 
              and platform integrity.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Disclaimer Regarding Performance</h5>
            <p className="text-muted">
              The Performance Tracker is updated in good faith and reflects the research team’s assessment 
              of outcomes based on publicly available price data. Minor variations may exist due to client 
              execution price, market slippage, or platform timing. This tracker is educational and does not 
              represent a promise of returns or financial guarantees.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">Client Responsibility</h5>
            <p className="text-muted">
              Clients are encouraged to log in regularly to the dashboard for full context before acting on 
              any recommendation. WhatsApp messages are for convenience, but complete decision-making should 
              be based on the full research presented in the dashboard.
            </p>
          </div>

          <div>
            <h5 className="fw-bold text-dark">Disclaimer</h5>
            <p className="text-muted mb-0">
              All services are educational and represent the analyst’s research view. These are not personalized 
              investment recommendations. Clients must assess suitability or consult a financial advisor before 
              making any decisions.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Trader;