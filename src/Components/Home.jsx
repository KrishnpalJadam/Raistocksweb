import React from "react";

const Home = () => {
  return (
    <>
    <section className="rai-hero d-flex align-items-center" id="home">
      {/* Animated Stock Bars */}
      <div className="rai-hero-bg">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="rai-bar" style={{ animationDelay: `${i * 0.3}s` }}></div>
        ))}
      </div>

      <div className="container text-center text-white">
        <h6 className="fw-bold">SEBI Registered Research Analyst</h6>
        <p className="mb-4">Registration Number - INH000020396</p>
        <h1 className="fw-bold display-6">
          Reliable Insights. Smarter Investments. Better Trading...
        </h1>
        <p className="mt-3 mb-4">
          Invest your time and efforts on running your business. Let research analyst guide you to achieve the optimum result.
          <br /> Your reliable source for SEBI-registered research, delivering actionable strategies and analysis directly to you.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <a href="#subscribe" className="btn btn-light fw-semibold px-4 py-2">
            Subscribe Now
          </a>
          <a href="#services" className="btn btn-outline-light fw-semibold px-4 py-2">
            Services
          </a>
        </div>

        <div className="mt-4 d-flex justify-content-center gap-4 fw-semibold">
          <span>✔ Professional</span>
          <span>✔ Reliable</span>
          <span>✔ Experienced</span>
        </div>
      </div>
    </section>



  <section className="py-5 bg-white">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">
        Conflict-Free. Audit-Ready. Client-First.
      </h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper">
              <i className="bi bi-clipboard-check-fill" />
            </div>
            <h5 className="fw-bold">SEBI-Registered &amp; Fully Compliant</h5>
            <p className="text-muted mb-0">
              Operate strictly under SEBI RA guidelines, ensuring investor
              protection and legal compliance at all times.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper">
              <i className="bi bi-lightbulb-fill" />
            </div>
            <h5 className="fw-bold">Research You Can Rely On</h5>
            <p className="text-muted mb-0">
              In-depth fundamental and technical analysis, free from the
              conflict of interest of brokerages.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper">
              <i className="bi bi-eye-fill" />
            </div>
            <h5 className="fw-bold">Transparent Tracking 24x7</h5>
            <p className="text-muted mb-0">
              All past calls, performance, and disclosures are available for
              public audit and verification anytime.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper">
              <i className="bi bi-shield-lock-fill" />
            </div>
            <h5 className="fw-bold">Data Privacy &amp; Zero Conflict</h5>
            <p className="text-muted mb-0">
              Your privacy is paramount. We don't trade our research
              recommendations ahead of clients.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper">
              <i className="bi bi-cash-stack" />
            </div>
            <h5 className="fw-bold">Client-First Refund Assurance</h5>
            <p className="text-muted mb-0">
              Clear and fair refund policy defined in our terms, prioritizing
              client satisfaction and trust.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper">
              <i className="bi bi-headset" />
            </div>
            <h5 className="fw-bold">Dedicated Support &amp; SEBI Scores</h5>
            <p className="text-muted mb-0">
              Direct access to support and strict adherence to timelines for
              complaint resolution and SEBI SCORES.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
 
  <section className="py-5" style={{backgroundColor: "#fff5f5"}}>
    <div className="container">
      <h2 className="text-center fw-bold mb-5">
       What You Should Never Expect From Us
      </h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper feature-icon-wrapper2">
              <i className="bi bi-clipboard-check-fill" />
            </div>
            <h5 className="fw-bold">SEBI-Registered &amp; Fully Compliant</h5>
            <p className="text-muted mb-0">
              Operate strictly under SEBI RA guidelines, ensuring investor
              protection and legal compliance at all times.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper feature-icon-wrapper2">
              <i className="bi bi-lightbulb-fill" />
            </div>
            <h5 className="fw-bold">Research You Can Rely On</h5>
            <p className="text-muted mb-0">
              In-depth fundamental and technical analysis, free from the
              conflict of interest of brokerages.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper feature-icon-wrapper2">
              <i className="bi bi-eye-fill" />
            </div>
            <h5 className="fw-bold">Transparent Tracking 24x7</h5>
            <p className="text-muted mb-0">
              All past calls, performance, and disclosures are available for
              public audit and verification anytime.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper feature-icon-wrapper2">
              <i className="bi bi-shield-lock-fill" />
            </div>
            <h5 className="fw-bold">Data Privacy &amp; Zero Conflict</h5>
            <p className="text-muted mb-0">
              Your privacy is paramount. We don't trade our research
              recommendations ahead of clients.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper feature-icon-wrapper2">
              <i className="bi bi-cash-stack" />
            </div>
            <h5 className="fw-bold">Client-First Refund Assurance</h5>
            <p className="text-muted mb-0">
              Clear and fair refund policy defined in our terms, prioritizing
              client satisfaction and trust.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card feature-card p-4">
            <div className="feature-icon-wrapper feature-icon-wrapper2">
              <i className="bi bi-headset" />
            </div>
            <h5 className="fw-bold">Dedicated Support &amp; SEBI Scores</h5>
            <p className="text-muted mb-0">
              Direct access to support and strict adherence to timelines for
              complaint resolution and SEBI SCORES.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="py-5 bg-white">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">Check Out Our Illustrations</h2>
      <p className="text-center text-muted mb-4">
        Experience Shared by Those We've Helped (Illustrative Examples)
      </p>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
        <div className="col">
          <div className="illustration-card p-3 text-center">
            <div className="mb-2">
              <span className="performance-badge-success">Hit Target 1</span>
            </div>
            <h6 className="fw-bold">Reliance Ind.</h6>
            <p className="small mb-0 text-success fw-bold">+18.5% PROFIT</p>
            <p className="small text-muted mb-0">Entry: 2400 | Exit: 2844</p>
          </div>
        </div>
        <div className="col">
          <div className="illustration-card p-3 text-center">
            <div className="mb-2">
              <span className="performance-badge-success">Multi-bagger</span>
            </div>
            <h6 className="fw-bold">TCS Ltd.</h6>
            <p className="small mb-0 text-success fw-bold">+45.2% PROFIT</p>
            <p className="small text-muted mb-0">Entry: 3200 | Exit: 4646</p>
          </div>
        </div>
        <div className="col">
          <div className="illustration-card p-3 text-center">
            <div className="mb-2">
              <span className="performance-badge-danger">Stoploss Hit</span>
            </div>
            <h6 className="fw-bold">HDFC Bank</h6>
            <p className="small mb-0 text-danger fw-bold">-5.1% LOSS</p>
            <p className="small text-muted mb-0">Entry: 1550 | Exit: 1471</p>
          </div>
        </div>
        <div className="col">
          <div className="illustration-card p-3 text-center">
            <div className="mb-2">
              <span className="performance-badge-success">Target 2 Hit</span>
            </div>
            <h6 className="fw-bold">Infosys</h6>
            <p className="small mb-0 text-success fw-bold">+22.0% PROFIT</p>
            <p className="small text-muted mb-0">Entry: 1400 | Exit: 1708</p>
          </div>
        </div>
        <div className="col">
          <div className="illustration-card p-3 text-center">
            <div className="mb-2">
              <span className="performance-badge-success">Short Term</span>
            </div>
            <h6 className="fw-bold">Maruti</h6>
            <p className="small mb-0 text-success fw-bold">+12.8% PROFIT</p>
            <p className="small text-muted mb-0">Entry: 9500 | Exit: 10716</p>
          </div>
        </div>
        <div className="col">
          <div className="illustration-card p-3 text-center">
            <div className="mb-2">
              <span className="performance-badge-success">Target 1 Hit</span>
            </div>
            <h6 className="fw-bold">Wipro</h6>
            <p className="small mb-0 text-success fw-bold">+9.9% PROFIT</p>
            <p className="small text-muted mb-0">Entry: 400 | Exit: 439</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="small text-muted fst-italic">
          *Disclaimer: Past performance is not indicative of future returns.
          Illustrations are for example only.
        </p>
      </div>
    </div>
  </section>
  <hr />
  <section className="py-5 bg-light-gray">
    <div className="container">
      <h2 className="text-center fw-bold mb-4">
        Number of Client's Complaints
      </h2>
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-striped text-center align-middle caption-top bg-white">
          <caption>Complaint Data for FY 2024-25 (Illustrative)</caption>
          <thead className="table-primary">
            <tr>
              <th scope="col">Received From</th>
              <th scope="col">Pending</th>
              <th scope="col">Received</th>
              <th scope="col">Resolved</th>
              <th scope="col">Total</th>
              <th scope="col">Pending &gt; 3 months</th>
              <th scope="col">Avg Resolution (Days)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Direct Clients</td>
              <td>0</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>0</td>
              <td>5</td>
            </tr>
            <tr>
              <td>SEBI (SCORES)</td>
              <td>0</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>0</td>
              <td>8</td>
            </tr>
            <tr className="table-secondary fw-bold">
              <td>TOTAL</td>
              <td>0</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>0</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="small text-muted text-center mt-3">
        All data strictly reported as per SEBI Guidelines and disclosed
        quarterly.
      </p>
    </div>
  </section>
  <hr />
  <section className="py-5 bg-white">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">
        Experience Shared By Those We've Helped
      </h2>
      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="card p-4 shadow-sm mb-4  border-0 text-center mx-auto"
              style={{ maxWidth: 600 }}
            >
              <p className="lead fst-italic">
                "The analysis is deep and their process is completely
                transparent. It's refreshing to see a SEBI-RA who truly puts the
                client first. My returns have been consistent and manageable."
              </p>
              <div className="mt-3">
                <p className="fw-bold mb-1">- Rajesh K.</p>
                <div className="text-warning">
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-half" />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="card p-4 shadow-sm mb-4 border-0 text-center mx-auto"
              style={{ maxWidth: 600 }}
            >
              <p className="lead fst-italic">
                "No hidden costs and the 15-day trial was a game-changer. I saw
                the value before committing. Great support on portfolio
                restructuring."
              </p>
              <div className="mt-3">
                <p className="fw-bold mb-1">- Priya S.</p>
                <div className="text-warning">
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
  <hr />
  <section className="trial-cta-section">
    <div className="container trial-content">
      <h2 className="display-5 fw-bold mb-3">
        15-Day Trial @ ₹999 – Proof Over Promises
      </h2>
      <p className="lead mb-4">
        Experience the confidence of conflict-free research.
      </p>
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <ul className="trial-checklist list-unstyled text-center mx-auto">
            <li>
              <i className="bi bi-check-circle-fill" /> Full 15 Calendar Days /
              11 Trading Days
            </li>
            <li>
              <i className="bi bi-check-circle-fill" /> Min. 1 High-Quality
              Alert Daily
            </li>
            <li>
              <i className="bi bi-check-circle-fill" /> Complete Portfolio
              Access &amp; Guidance
            </li>
            <li>
              <i className="bi bi-check-circle-fill" /> Full Transparency. No
              Hidden Charges.
            </li>
          </ul>
        </div>
      </div>
      <a href="#" className="btn btn-trial-cta shadow-lg">
        Start Trial Now
      </a>
    </div>
  </section>
</>

  );
};

export default Home;
