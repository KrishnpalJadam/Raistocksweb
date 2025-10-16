import React from 'react';

const TrielPlan = () => {
  return (
    <div>
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
    </div>
  );
}

export default TrielPlan;
