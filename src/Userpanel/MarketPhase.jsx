import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketPhases } from "../slices/marketPhaseSlice";
import { Aperture, TrendingUp, TrendingDown, Clock, X } from "lucide-react";
import { Link } from "react-router-dom";

const MarketPhase = () => {
  const dispatch = useDispatch();

  const { marketPhases, loading, error } = useSelector(
    (state) => state.marketPhase
  );

  useEffect(() => {
    dispatch(fetchMarketPhases());
  }, [dispatch]);

  if (loading) return <p>Loading Market Phase...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  // Render all market phases (most recent first)
  const phases = Array.isArray(marketPhases) ? marketPhases : [];

  const phaseStatusMap = {
    "Greed/Euphoria": { color: "#dc3545", icon: TrendingUp },
    "Fear/Panic": { color: "#007bff", icon: TrendingDown },
    Accumulation: { color: "#198754", icon: Aperture },
    Distribution: { color: "#ffc107", icon: Clock },
  };

  const defaultPhaseInfo = { color: "#6c757d", icon: Clock };

  return (
    <div className="rai-module-content p-3">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="" style={{ fontWeight: "600" }}>
          Market Phase Analysis
        </h4>
        <Link
          to="/customer/dashboard"
          className="d-flex align-items-center justify-content-center text-dark 
             bg-white border rounded-pill shadow-sm"
          style={{ width: "36px", height: "36px" }}
        >
          <X size={20} />
        </Link>
      </div>

      {phases.length === 0 ? (
        <p>No market phase data available.</p>
      ) : (
        <div className="row">
          {phases.map((phase, idx) => {
            const { title = "", description = "", date = "" } = phase;
            const info = phaseStatusMap[title] || defaultPhaseInfo;
            const PhaseIcon = info.icon;

            return (
              <div
                key={phase.id || idx}
                className="rai-card card col-12 col-md-6 col-lg-4 p-0 mb-3"
                style={{
                  borderLeft: `4px solid ${info.color}`,
                  borderColor: "#dee2e6",
                }}
              >
                <div className="card-body">
                  {/* Header */}
                  <div className="rai-flex-header align-items-center mb-2">
                    <div className="rai-icon-bg me-3">
                      <PhaseIcon size={24} />
                    </div>
                    <h4
                      className="mb-0 fw-bold text-primary"
                      style={{ fontSize: "14px" }}
                    >
                      Market Phase: {title || "N/A"}
                    </h4>
                  </div>

                  {/* Description */}
                  <p
                    className="card-text mb-3 text-muted"
                    style={{ fontSize: "13px" }}
                  >
                    {description || ""}
                  </p>

                  {/* Date */}
                  <p className="rai-date-small mb-0 text-end">
                    *Analysis Date:{" "}
                    <strong>
                      {date ? new Date(date).toDateString() : "N/A"}
                    </strong>
                    *
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MarketPhase;
