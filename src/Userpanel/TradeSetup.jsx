// src/Userpanel/TradeSetup.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTradeSetup } from "../slices/tradeSetupSlice";
import { DollarSign, X } from "lucide-react";

const TradeSetup = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.tradeSetup);

  useEffect(() => {
    dispatch(fetchTradeSetup());
  }, [dispatch]);

  // ✅ Filter: show only entries that have at least a title
  const validItems = Array.isArray(items)
    ? items.filter(
        (item) =>
          item &&
          item.title && // must have title
          item.title.trim() !== "" && // not empty
          (item.comment || item.modelType) // and should have at least one more piece of info
      )
    : [];

  const FeedCard = ({
    modelType,
    title,
    value,
    comment,
    date,
    icon: Icon,
    color,
  }) => (
    <div
      className="card"
      style={{
        border: "1px solid #e9ecef",
        borderLeft: `4px solid ${color || "#0d6efd"}`,
        borderRadius: "6px",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        marginBottom: "16px",
      }}
    >
      <div style={{ padding: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  background: `${color || "#0d6efd"}20`,
                  borderRadius: "50%",
                  padding: "6px",
                }}
              >
                <Icon size={16} color={color || "#0d6efd"} />
              </div>
              <span
                className="cardmode"
                style={{
                  fontSize: "12px",
                  color: "#6c757d",
                  background: "#f8f9fa",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontWeight: "500",
                }}
              >
                {modelType}
              </span>
            </div>
            <h6
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#212529",
                fontWeight: "600",
              }}
            >
              {title}
            </h6>
          </div>
        </div>
        {value && (
          <p
            style={{
              margin: "12px 0 4px 0",
              fontSize: "13px",
              fontWeight: 600,
              color,
            }}
          >
            {value}
          </p>
        )}
        {comment && (
          <p
            style={{
              margin: "0 0 12px 0",
              fontSize: "12px",
              color: "#495057",
              lineHeight: "1.5",
            }}
          >
            {comment}
          </p>
        )}
        <p
          style={{
            margin: 0,
            fontSize: "11px",
            color: "#6c757d",
            textAlign: "right",
          }}
        >
          {date}
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between mb-4">
        <h4 className="" style={{ fontWeight: "600" }}>
          Trade Setup Feed
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

      <p style={{ fontSize: "12px", color: "#6c757d", marginBottom: "20px" }}>
        Aggregated and prioritized view from Market Insight, Market Phase,
        Market Trend & Market Setup.
      </p>

      {loading && <p>Loading feed...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="row">
        {validItems.length > 0 ? (
          validItems.map((item, i) => {
            const { modelType, title, comment, createdAt, modelRef } = item;
            return (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <FeedCard
                  modelType={modelType}
                  title={title}
                  comment={comment}
                  icon={DollarSign}
                  color={item.color || "#0d6efd"}
                  date={
                    modelRef?.createdAt
                      ? new Date(modelRef.createdAt).toLocaleDateString()
                      : new Date(createdAt).toLocaleDateString()
                  }
                />
              </div>
            );
          })
        ) : (
          !loading && (
            <p style={{ color: "#6c757d" }}>
              No valid trade setup data available.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default TradeSetup;
