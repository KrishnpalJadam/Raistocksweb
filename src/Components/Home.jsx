import React from "react";

const Home = () => {
  return (
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
  );
};

export default Home;
