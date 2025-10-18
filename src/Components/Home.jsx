import React, { useEffect, useRef } from "react";
import Review from "./Review";
import Complaints from "./Complaints";
import Homecards from "./Homecards";
import Illustrations from "./Iustrations";
import TrielPlan from "./TrielPlan";
import "./Home.css"
import { Link } from "react-router-dom";
const Home = () => {
  const heroBarsRef = useRef(null);
  const heroChartRef = useRef(null);

  useEffect(() => {
    // ---- Line Chart Animation ----
    const canvasLine = heroChartRef.current;
    const ctxLine = canvasLine.getContext("2d");
    canvasLine.width = window.innerWidth;
    canvasLine.height = window.innerHeight;

    const drawLineChart = () => {
      ctxLine.clearRect(0, 0, canvasLine.width, canvasLine.height);
      ctxLine.beginPath();
      ctxLine.moveTo(0, canvasLine.height / 2);
      for (let x = 0; x < canvasLine.width; x += 50) {
        const y =
          canvasLine.height / 2 +
          Math.sin(x / 50 + Date.now() / 500) * 50;
        ctxLine.lineTo(x, y);
      }
      ctxLine.strokeStyle = "#ffffff";
      ctxLine.lineWidth = 2;
      ctxLine.stroke();
      requestAnimationFrame(drawLineChart);
    };
    drawLineChart();

    // ---- Bars Animation ----
    const canvasBars = heroBarsRef.current;
    const ctxBars = canvasBars.getContext("2d");
    canvasBars.width = window.innerWidth;
    canvasBars.height = window.innerHeight;

    const drawBars = () => {
      ctxBars.clearRect(0, 0, canvasBars.width, canvasBars.height);
      const barCount = 20;
      const barWidth = canvasBars.width / barCount;
      for (let i = 0; i < barCount; i++) {
        const height =
          (Math.sin(Date.now() / 500 + i) + 1) * 0.4 * canvasBars.height;
        const x = i * barWidth;
        const gradient = ctxBars.createLinearGradient(
          x,
          canvasBars.height - height,
          x,
          canvasBars.height
        );
        gradient.addColorStop(0, "#66a3ff");
        gradient.addColorStop(1, "#1c5ce3");
        ctxBars.fillStyle = gradient;
        ctxBars.fillRect(x, canvasBars.height - height, barWidth - 5, height);
      }
      requestAnimationFrame(drawBars);
    };
    drawBars();

    // Cleanup on unmount
    return () => {
      ctxLine.clearRect(0, 0, canvasLine.width, canvasLine.height);
      ctxBars.clearRect(0, 0, canvasBars.width, canvasBars.height);
    };
  }, []);

  return (
    <>
      {/* 🟦 HERO SECTION START */}
      <section className="rai-hero-home">
        {/* Background Layers */}
        <canvas id="heroBars" ref={heroBarsRef}></canvas>
        <canvas id="heroChart" ref={heroChartRef}></canvas>
        <div className="animated-bg"></div>

        {/* Content */}
        <div className="rai-hero-inner">
          <p className="sebi-title">SEBI Registered Research Analyst</p>
          <p className="reg-number">Registration Number - INH000020396</p>

          <h1>Reliable Insights. Smarter Investments. Better Trading...</h1>

          <p className="subtext">
            <span className="line">
              Invest your time and efforts on running your business. Let
              research analyst guide you to achieve the optimum result.
            </span>
            <span className="line second">
              Your reliable source for SEBI-registered research, delivering
              actionable strategies and analysis directly to you.
            </span>
          </p>

          <div className="hero-cta">
            <Link to="/ourPlan" className="btn-primary btn-primary2">
              Subscribe Now
            </Link>
            <Link to="" className="btn-secondary btn-secondary2">
              Services
            </Link>
          </div>

          <div className="trust-icons">
            <span>Professional</span>
            <span>Reliable</span>
            <span>Experienced</span>
          </div>
        </div>
      </section>
      {/* 🟦 HERO SECTION END */}

      <Homecards />
      <Illustrations />
      <Complaints />
      <Review />
      <TrielPlan />
    </>
  );
};

export default Home;
