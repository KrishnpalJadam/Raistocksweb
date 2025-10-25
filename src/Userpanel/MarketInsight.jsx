import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMarketInsights } from "../slices/marketInsightSlice";
import { TrendingUp, X } from "lucide-react";
import { Link } from "react-router-dom";

// ========== Helper: Sentiment to Class ==========
const getCommentClass = (sentiment) => {
  if (!sentiment) return "text-muted";
  const normalizedSentiment = sentiment.toLowerCase();
  return normalizedSentiment === "positive"
    ? "text-success"
    : normalizedSentiment === "negative"
    ? "text-danger"
    : "text-muted";
};

// ========== Card Component ==========
const MarketInsightCard = ({ title, value, comment, date, sentiment }) => {
  const commentClass = getCommentClass(sentiment);

  return (
    <div className="rai-card card row">
      <div className="card-body col-sm-12" style={{ padding: "12px" }}>
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

        <p className={`card-text small ${commentClass}`} style={{ fontSize: "12px" }}>
          {comment || ""}
        </p>

        {date && (
          <p className="rai-date-small mb-0">
            *As of: {new Date(date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

// ========== Main Component ==========
const MarketInsight = () => {
  const dispatch = useDispatch();
  const { insights, loading, error } = useSelector((state) => state.marketInsight);
  const [daysToShow, setDaysToShow] = useState(1); // Start with current day

  useEffect(() => {
    dispatch(fetchMarketInsights());
  }, [dispatch]);

  // ✅ Clean + valid insights
const validInsights = insights.filter(
  (item) =>
    item &&
    (item.title || item.marketInfo || item.comment || item.sentiment)
);

  // ✅ Group insights by date (YYYY-MM-DD)
  const groupedInsights = useMemo(() => {
    const groups = {};
    validInsights.forEach((item) => {
      const dateKey = new Date(item.date).toISOString().split("T")[0];
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });
    return groups;
  }, [validInsights]);

  // ✅ Generate an array of last 15 days (including today)
  const recentDates = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      arr.push(d.toISOString().split("T")[0]);
    }
    return arr; // [today, yesterday, ... up to 14 days ago]
  }, []);

  // ✅ Determine which dates to show (based on clicks)
  const visibleDates = recentDates.slice(0, daysToShow);

  // ✅ Combine trades for only visible days
  const visibleInsights = visibleDates.flatMap((dateKey) => groupedInsights[dateKey] || []);

  // ✅ Handle Show More
  const handleShowMore = () => {
    if (daysToShow < 15) setDaysToShow(daysToShow + 1);
  };

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

      {!loading && visibleInsights.length === 0 && (
        <p>No insights found for the selected days.</p>
      )}

      {/* ✅ Grouped by Date */}
      {visibleDates.map((dateKey) => {
        const items = groupedInsights[dateKey] || [];
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
              {items.map((item, index) => (
                <div  key={index}
      className={`${
        items.length === 1 ? "col-12" : "col-12 col-md-6 col-lg-4"
      } mb-3`}>
                  <MarketInsightCard
                    title={item.title}
                    value={item.marketInfo}
                    comment={item.comment}
                    date={item.date}
                    sentiment={item.sentiment}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* ✅ Show More Button */}
      {daysToShow < 15 && visibleInsights.length > 0 && (
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

export default MarketInsight;
