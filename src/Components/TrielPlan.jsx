import React, { useEffect, useRef } from "react";
import "./TrielPlan.css"; // We'll keep CSS in a separate file

const TrielPlan = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 320;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawBarWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 40;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const height = Math.sin(Date.now() / 500 + i) * 60 + 120;
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 3, height);
      }

      requestAnimationFrame(drawBarWave);
    };

    drawBarWave();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section className="rai-final-cta">
      {/* Background Bar Animation */}
      <div className="rai-background">
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* CTA Content */}
      <div className="rai-final-content">
        <p className="subheading">Try Before You Commit</p>
        <h2 className="text-white fw-bold" style={{fontSize: "2.6rem"}}>15-Day Trial @ ₹999 – Proof Over Promises</h2>
        <p className="details">In these 15 days, you will get:</p>
        <ul className="trial-features">
          <li>11 trading days.</li>
          <li>At least 1 call daily (up to 4 max.)</li>
          <li>Full transparency, real-time results.</li>
          <li>No hidden charges. No upsells. No BS.</li>
          <li>Dashboard to check results.</li>
        </ul>
        <a href="#trial-form" className="rai-final-btn">
          Start Trial
        </a>
      </div>
    </section>
  );
};

export default TrielPlan;
