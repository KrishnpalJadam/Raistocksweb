import React from "react";
import { ShieldCheck, Handshake, Scale, Lock, Users, BarChart3 } from "lucide-react";


const About = () => {
  return (
    <div className="web-about">
      {/* Hero Section */}
      <section className="web-about-hero text-center text-white d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="fw-bold mb-3">SEBI Registered Research Analyst</h1>
          <p className="fs-5 mb-1">Registration Number INH000020396</p>
          <h2 className="fw-bold mt-4">About Us</h2>
          <p className="fs-5 mt-2">
            Research You Can Trust. Growth You Can Track. Support You Can Count On.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="web-about-values py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-uppercase text-primary">Our</h6>
            <h2 className="fw-bold">Core Values</h2>
          </div>
          <div className="row g-4">
            {[
              {
                icon: <Scale size={36} />,
                title: "Integrity First",
                text: "We uphold the highest ethical standards and are bound by a deep sense of responsibility to always act in the client’s best interest.",
              },
              {
                icon: <Handshake size={36} />,
                title: "Trust & Transparency",
                text: "Our services are designed with radical transparency to ensure our clients can place their full trust in every insight we share.",
              },
              {
                icon: <ShieldCheck size={36} />,
                title: "Compliance-Driven Excellence",
                text: "Every research report and recommendation strictly adheres to SEBI regulations and industry best practices.",
              },
              {
                icon: <Lock size={36} />,
                title: "Security & Confidentiality",
                text: "We ensure the safety of all client data and investment information with best-in-class security protocols.",
              },
              {
                icon: <Users size={36} />,
                title: "Client Empowerment",
                text: "We don’t just advise—we educate, so our clients can invest with absolute clarity and confidence.",
              },
              {
                icon: <BarChart3 size={36} />,
                title: "Data-Led Precision",
                text: "All our insights and strategies are backed by rigorous quantitative and qualitative analysis.",
              },
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="web-about-card p-4 text-center h-100 shadow-sm rounded-3">
                  <div className="web-about-icon mb-3 text-primary">{item.icon}</div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted mb-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="web-about-vision py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Our Vision</h2>
              <p className="text-muted fs-6">
                To become India’s foremost compliance-driven research platform—setting the gold
                standard in secure, transparent, and data-led insights, grounded in unwavering
                integrity, and earning the unshakable trust of investors and traders. We empower
                our clients with the confidence to thrive and the knowledge to build lasting wealth.
              </p>
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Our Mission</h2>
              <p className="text-muted fs-6">
                To deliver transparent, compliance-first, and security-focused research to India’s
                investors and traders—driven by data, bound by integrity, and committed to
                trust-building at every step. Our mission is to provide accurate, ethical, and
                empowering research that gives every client the confidence to act decisively and
                succeed in their investment journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
