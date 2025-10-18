import React from "react";
import { MapPin, Phone, Mail, Youtube, Instagram, Send } from "lucide-react";


const ContactUs = () => {
  return (
    <div className="web-contact bg-white">
      {/* Hero Section */}
      <section className="web-contact-hero text-white text-center d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="fw-bold mb-2">SEBI Registered Research Analyst</h1>
          <p className="fs-5">Registration Number - INH000020396</p>
          <h2 className="fw-bold mt-4">Contact Us</h2>
          <p className="fs-5 mt-2 mb-0">Reach Us Anytime. We're Here To Help You.</p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="web-contact-details py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-uppercase text-primary">Reach Us</h6>
            <h2 className="fw-bold">Contact Details</h2>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="web-contact-card text-center p-4 shadow-sm rounded-3 h-100">
                <MapPin size={36} className="text-primary mb-3" />
                <h5 className="fw-bold">Address</h5>
                <p className="text-muted mb-0">Raipur, Chhattisgarh, India</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="web-contact-card text-center p-4 shadow-sm rounded-3 h-100">
                <Phone size={36} className="text-primary mb-3" />
                <h5 className="fw-bold">Phone Numbers</h5>
                <p className="text-muted mb-1">+91 9985160343</p>
                <p className="text-muted mb-0">+91 9630135233</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="web-contact-card text-center p-4 shadow-sm rounded-3 h-100">
                <Mail size={36} className="text-primary mb-3" />
                <h5 className="fw-bold">Email</h5>
                <p className="text-muted mb-0">support@raistocks.com</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center mt-5">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="web-contact-social">
                <Youtube size={28} />
              </a>
              <a href="#" className="web-contact-social">
                <Instagram size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="web-contact-form py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Get In Touch</h2>
            <p className="text-muted">
              Send us a message — we’ll get back to you as soon as possible.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form className="web-contact-form-box p-4 shadow-sm bg-white rounded-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter contact number"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Please mention the reason for contact"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <button type="submit" className="btn btn-primary px-4 py-2">
                      <Send size={18} className="me-2" /> Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
