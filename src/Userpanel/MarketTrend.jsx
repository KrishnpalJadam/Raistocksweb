import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketTrends } from "../slices/marketTrendSlice";
import { LineChart, TrendingUp, TrendingDown, Minus, X } from "lucide-react";
import { Link } from "react-router-dom";

const MarketTrend = () => {
  const dispatch = useDispatch();
  const { trends, loading, error } = useSelector((state) => state.marketTrend);

  useEffect(() => {
    dispatch(fetchMarketTrends());
  }, [dispatch]);

  const trendStatusMap = {
    Bullish: { color: "#198754", icon: TrendingUp }, // Green
    Bearish: { color: "#dc3545", icon: TrendingDown }, // Red
    Sideways: { color: "#ffc107", icon: Minus }, // Yellow
  };

  return (
    <div className="rai-module-content p-3">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="" style={{ fontWeight: "600" }}>Market Trend Analysis</h4>
        <Link
          to="/customer/dashboard"
          className="d-flex align-items-center justify-content-center text-dark 
           bg-white border rounded-pill shadow-sm"
          style={{ width: "36px", height: "36px" }}
        >
          <X size={20} />
        </Link>
      </div>

      {loading && <p>Loading trends...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && trends.length === 0 && <p>No market trends available.</p>}

      <div className="row g-3">
        {trends.map((trend) => {
          const { _id, title = "", description = "", date = "" } = trend;
          const trendInfo = trendStatusMap[title] || { color: "#6c757d", icon: LineChart };
          const Icon = trendInfo.icon;

          return (
            <div
              key={_id}
              className="rai-card card col-12 col-md-6 col-lg-4 p-0"
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
                  *Analysis Date: {new Date(date).toLocaleDateString() || ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketTrend;
