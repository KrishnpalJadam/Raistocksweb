import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMarketInsights } from "../slices/marketInsightSlice";
import { TrendingUp, DollarSign, IndianRupee, X } from "lucide-react";
import { Link } from "react-router-dom";

// Map sentiment to class
const statusMap = {
  positive: "rai-comment-positive",
  negative: "rai-comment-negative",
  neutral: "text-muted",
};

// Card Component
const MarketInsightCard = ({ title, value, comment, date, sentiment }) => {
  const CommentClass = statusMap[sentiment] || "text-muted";

  return (
    <div className="rai-card card">
      <div className="card-body" style={{ padding: "12px" }}>
        <div className="rai-flex-header">
          <div className="rai-icon-bg me-2">
            <TrendingUp size={20} color="#007bff" />
          </div>
          <div>
            <h6 className="rai-insight-title mb-0" style={{ fontSize: "14px" }}>
              {title || ""}
            </h6>
          </div>
        </div>

        <p className="rai-insight-value mb-1" style={{ fontSize: "14px" }}>
          {value || ""}
        </p>

        <p
          className={`card-text text-muted small ${CommentClass}`}
          style={{ fontSize: "12px" }}
        >
          {comment || ""}
        </p>

        {date && <p className="rai-date-small mb-0">*As of: {new Date(date).toLocaleDateString()}</p>}
      </div>
    </div>
  );
};

const MarketInsight = () => {
  const dispatch = useDispatch();
  const { insights, loading, error } = useSelector((state) => state.marketInsight);

  useEffect(() => {
    dispatch(fetchMarketInsights());
  }, [dispatch]);

  return (
    <div className="rai-module-content">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="" style={{ fontWeight: "600" }}>
          Market Insight
        </h4>
        <Link
          to="/customer/dashboard"
          className="d-flex align-items-center justify-content-center text-dark bg-white border rounded-pill shadow-sm"
          style={{ width: "36px", height: "36px" }}
        >
          <X size={20} />
        </Link>
      </div>

      {loading && <p>Loading market insights...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {insights && insights.length > 0 ? (
          insights.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <MarketInsightCard
                title={item.title}
                value={item.marketInfo}
                comment={item.comment}
                date={item.date}
                sentiment={item.sentiment}
              />
            </div>
          ))
        ) : (
          !loading && <p>No market insights available.</p>
        )}
      </div>

      <button
        className="btn btn-primary mt-4"
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Show More
      </button>
    </div>
  );
};

export default MarketInsight;
