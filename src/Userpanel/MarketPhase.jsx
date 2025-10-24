import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketPhases } from "../slices/marketPhaseSlice";
import { Aperture, TrendingUp, TrendingDown, Clock, X } from "lucide-react";
import { Link } from "react-router-dom";

const MarketPhase = () => {
  const dispatch = useDispatch();
  const { marketPhases, loading, error } = useSelector(
    (state) => state.marketPhase
  );

  const [daysToShow, setDaysToShow] = useState(1); // show only today initially

  useEffect(() => {
    dispatch(fetchMarketPhases());
  }, [dispatch]);

  const phases = Array.isArray(marketPhases) ? marketPhases : [];

  // ✅ Map for phase title → color & icon
  const phaseStatusMap = {
    "Greed/Euphoria": { color: "#dc3545", icon: TrendingUp },
    "Fear/Panic": { color: "#007bff", icon: TrendingDown },
    Accumulation: { color: "#198754", icon: Aperture },
    Distribution: { color: "#ffc107", icon: Clock },
  };

  const defaultPhaseInfo = { color: "#6c757d", icon: Clock };

  // ✅ Group phases by date (YYYY-MM-DD)
  const groupedPhases = useMemo(() => {
    const groups = {};
    phases.forEach((phase) => {
      if (!phase.date) return;
      const dateKey = new Date(phase.date).toISOString().split("T")[0];
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(phase);
    });
    return groups;
  }, [phases]);

  // ✅ Create an array of last 15 days (today + 14 previous)
  const recentDates = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      arr.push(d.toISOString().split("T")[0]);
    }
    return arr;
  }, []);

  // ✅ Which dates are visible right now
  const visibleDates = recentDates.slice(0, daysToShow);

  // ✅ Handle Show More
  const handleShowMore = () => {
    if (daysToShow < 15) setDaysToShow(daysToShow + 1);
  };

  if (loading) return <p>Loading Market Phase...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const hasVisibleData = visibleDates.some((d) => groupedPhases[d]?.length > 0);

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

      {!hasVisibleData && !loading && <p>No market phase data available.</p>}

      {/* ✅ Group by visible dates */}
      {visibleDates.map((dateKey) => {
        const items = groupedPhases[dateKey] || [];
        if (items.length === 0) return null;

        return (
          <div key={dateKey} className="mb-4">
            <h6 className="fw-bold text-primary mb-3">
              {new Date(dateKey).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </h6>

            <div className="row">
              {items.map((phase, idx) => {
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

                      <p
                        className="card-text mb-3 text-muted"
                        style={{ fontSize: "13px" }}
                      >
                        {description || ""}
                      </p>

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
          </div>
        );
      })}

      {/* ✅ Blue "Show More" Button */}
      {daysToShow < 15 && hasVisibleData && (
        <button
          className="btn btn-primary mt-4"
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default MarketPhase;
