import React from 'react';

const Illustrations = () => {
  return (
    <div>
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
    </div>
  );
}

export default Illustrations;
