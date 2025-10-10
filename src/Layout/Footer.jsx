import React from 'react';

const Footer = () => {
  return (
    <div>
 <footer className="footer-custom">
  <div className="container">
    <div className="row pt-4 pb-3">
      <div className="col-lg-3 col-md-6 mb-4">
        <a href="#" className="footer-logo-text d-block mb-3">
          <span className="bi bi-graph-up-arrow me-2" />
          **RAI**Stocks
        </a>
        <p className="small">
          SEBI Registered Research Analyst. Reg. No.: INH200000XXX
        </p>
        <p className="small">
          We provide audit-ready, conflict-free research to help you make
          smarter, more reliable investments.
        </p>
      </div>
      <div className="col-lg-3 col-md-6 mb-4">
        <h5 className="text-white fw-bold mb-3">Contact Info</h5>
        <ul className="list-unstyled">
          <li className="mb-2">
            <i className="bi bi-geo-alt-fill me-2" /> Mumbai, Maharashtra,
            India.
          </li>
          <li className="mb-2">
            <i className="bi bi-telephone-fill me-2" /> +91-98765 43210
          </li>
          <li className="mb-2">
            <i className="bi bi-envelope-fill me-2" /> support@raistocks.in
          </li>
        </ul>
        <div className="mt-3">
          <a href="#" className="social-icon">
            <i className="bi bi-facebook" />
          </a>
          <a href="#" className="social-icon">
            <i className="bi bi-twitter" />
          </a>
          <a href="#" className="social-icon">
            <i className="bi bi-linkedin" />
          </a>
          <a href="#" className="social-icon">
            <i className="bi bi-youtube" />
          </a>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-4">
        <h5 className="text-white fw-bold mb-3">Our Services</h5>
        <ul className="list-unstyled">
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> Equity Research
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> F&amp;O Strategies
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> Long Term Portfolios
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> Commodity Research
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> Free Trial
            </a>
          </li>
        </ul>
      </div>
      <div className="col-lg-3 col-md-6 mb-4">
        <h5 className="text-white fw-bold mb-3">Important Links</h5>
        <ul className="list-unstyled">
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> Terms &amp; Conditions
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> Privacy Policy
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> Refund Policy
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> SEBI Investor Charter
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right me-1" /> Disclosure &amp;
              Disclaimers
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="row">
      <div className="col-12 text-center pt-3 border-top border-secondary">
        <p className="mb-0 small">
          © RAIStocks. All Rights Reserved. Investment in the securities market
          is subject to market risks.
        </p>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}

export default Footer;
