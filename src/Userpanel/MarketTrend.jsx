import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketTrends } from "../slices/marketTrendSlice";
import { LineChart, TrendingUp, TrendingDown, Minus, X } from "lucide-react";
import { Link } from "react-router-dom";

const MarketTrend = () => {
  const dispatch = useDispatch();
  const { trends, loading, error } = useSelector((state) => state.marketTrend);
  const [daysToShow, setDaysToShow] = useState(1); // start with current day only

  useEffect(() => {
    dispatch(fetchMarketTrends());
  }, [dispatch]);

  const trendStatusMap = {
    Bullish: { color: "#198754", icon: TrendingUp }, // Green
    Bearish: { color: "#dc3545", icon: TrendingDown }, // Red
    Sideways: { color: "#ffc107", icon: Minus }, // Yellow
  };

  const defaultTrendInfo = { color: "#6c757d", icon: LineChart };

  // ✅ Group trends by date (YYYY-MM-DD)
  const groupedTrends = useMemo(() => {
    const groups = {};
    if (!Array.isArray(trends)) return groups;
    trends.forEach((trend) => {
      if (!trend.date) return;
      const dateKey = new Date(trend.date).toISOString().split("T")[0];
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(trend);
    });
    return groups;
  }, [trends]);

  // ✅ Generate array of last 15 days (today + 14 previous)
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

  // ✅ Dates currently visible
  const visibleDates = recentDates.slice(0, daysToShow);

  // ✅ Handle "Show More"
  const handleShowMore = () => {
    if (daysToShow < 15) setDaysToShow(daysToShow + 1);
  };

  // ✅ Check if there’s any visible data
  const hasVisibleData = visibleDates.some((d) => groupedTrends[d]?.length > 0);

  return (
    <div className="rai-module-content p-3">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between mb-4">
        <h4 className="" style={{ fontWeight: "600" }}>
          Market Trend Analysis
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

      {/* ===== Loading & Error States ===== */}
      {loading && <p>Loading trends...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !hasVisibleData && <p>No market trends available.</p>}

      {/* ===== Grouped by Date ===== */}
      {visibleDates.map((dateKey) => {
        const items = groupedTrends[dateKey] || [];
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

            <div className="row g-3">
              {items.map((trend, idx) => {
                const {
                  _id,
                  title = "",
                  description = "",
                  date = "",
                } = trend;
                const trendInfo = trendStatusMap[title] || defaultTrendInfo;
                const Icon = trendInfo.icon;

                return (
                  <div
                    key={_id || idx}
                    className={`${
        items.length === 1 ? "col-12" : "col-12 col-md-6 col-lg-4 "
      } mb-3 bg-white p-3 me-3`}
                    style={{
                      borderLeft: `4px solid ${trendInfo.color}`,
                    }}
                  >
                    <div className="card-body">
                      {/* Header */}
                      <div className="rai-flex-header align-items-center mb-2">
                        <div className="rai-icon-bg me-3">
                          <Icon size={24} />
                        </div>
                        <h4
                          className="mb-0 fw-bold text-primary"
                          style={{ fontSize: "14px" }}
                        >
                          Trend: {title || ""}
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
                          {date
                            ? new Date(date).toLocaleDateString()
                            : "N/A"}
                        </strong>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ===== Show More Button ===== */}
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

export default MarketTrend;
