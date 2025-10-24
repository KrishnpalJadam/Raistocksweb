import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrades } from "../slices/tradeSlice";
import { fetchTradeActions } from "../slices/tradeActionsSlice";
import { Link } from "react-router-dom";
import "./Trade.css";
import { X, Filter } from "lucide-react";

// === Filter Modal Component (same as your original) ===
const FilterModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold">Apply Filter</h5>
          <button
            className="btn btn-light rounded-circle shadow-sm"
            onClick={onClose}
            style={{ width: "40px", height: "40px" }}
          >
            <X />
          </button>
        </div>

        {/* Filter By Segment */}
        <div className="mb-3">
          <label className="fw-bold d-block mb-2">Filter By Segment</label>
          <div>
            <input type="radio" name="segment" id="cash" defaultChecked />{" "}
            <label htmlFor="cash">Cash</label>{" "}
            <input type="radio" name="segment" id="fno" />{" "}
            <label htmlFor="fno">Futures & Options</label>
          </div>
          <button className="btn btn-sm btn-outline-primary mt-2">Apply</button>
        </div>

        {/* Filter By Date */}
        <div className="mb-3">
          <label className="fw-bold d-block mb-2">Filter By Date</label>
          <div className="d-flex gap-2">
            <input type="date" className="form-control" />
            <input type="date" className="form-control" />
          </div>
          <button className="btn btn-sm btn-outline-primary mt-2">Apply</button>
        </div>

        {/* Check Accuracy */}
        <div className="mb-3">
          <label className="fw-bold d-block mb-2">Check Accuracy</label>
          <div className="d-flex gap-2 mb-2">
            <select className="form-select">
              <option>All</option>
              <option>Cash</option>
              <option>F&O</option>
            </select>
            <input type="date" className="form-control" />
            <input type="date" className="form-control" />
          </div>
          <button className="btn btn-sm btn-outline-success">Compute</button>
        </div>

        {/* Profit Generated */}
        <div className="mb-3">
          <label className="fw-bold d-block mb-2">Profit Generated</label>
          <div className="d-flex gap-2 mb-2">
            <select className="form-select">
              <option>Cash</option>
              <option>F&O</option>
            </select>
            <input type="date" className="form-control" />
            <input type="date" className="form-control" />
          </div>
          <button className="btn btn-sm btn-outline-success">Compute</button>
        </div>
      </div>
    </div>
  );
};

// === Helper Components ===
const TradeInfoRow = ({ label, value, className = "" }) => (
  <div className={`trade-info-row ${className}`}>
    <span className="trade-info-label">{label}</span>
    <span className="trade-info-value">{value}</span>
  </div>
);

const TradeActions = ({ tradeId }) => {
  const dispatch = useDispatch();
  const { actions, loading } = useSelector(
    (state) => state.tradeActions || { actions: [], loading: false }
  );

  useEffect(() => {
    if (tradeId) {
      dispatch(fetchTradeActions(tradeId));
    }
  }, [tradeId, dispatch]);

  // Filter actions to only show those matching this trade's ID
  const tradeActions = actions.filter(
    (action) =>
      action.tradeId === tradeId ||
      action.trade_id === tradeId ||
      action._tradeId === tradeId
  );

  if (loading && !tradeActions.length) {
    return (
      <div className="trade-actions mt-3 text-center text-gray-500">
        Loading actions...
      </div>
    );
  }

  if (!tradeActions.length) return null;

  return (
    <div className="trade-actions mt-3">
      <h6 className="fw-bold mb-3">Trade Actions</h6>
      <div className="flex flex-col gap-3">
        {tradeActions.map((action) => {
          const dateStr =
            action.createdAt || action.createdDateAt || action.createdAtDate;
          const displayDate = dateStr
            ? new Date(dateStr).toLocaleDateString()
            : "-";

          return (
            <div
              key={action._id || action.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`px-4 py-2 rounded ${
                    action.type?.toLowerCase() === "update"
                      ? "bg-blue-100 text-blue-700"
                      : action.type?.toLowerCase().includes("profit")
                      ? "bg-green-100 text-green-700"
                      : action.type
                      ? "bg-gray-100 text-gray-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {action.type ? action.type : "Unknown"}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm font-medium">
                  ₹{action.price ?? "-"}
                </div>
                <div className="text-xs text-gray-500">{displayDate}</div>
                {action.title && <div className="text-sm">{action.title}</div>}
                {action.comment && (
                  <div className="text-xs text-gray-600">{action.comment}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TradeUpdatePill = ({ update }) => (
  <div
    className={`trade-update-pill ${update.type
      ?.toLowerCase()
      .replace(" ", "-")}`}
  >
    <div className="update-price-time">
      <span className="update-price">
        ₹{update.price}
        {update.text && update.live ? (
          <span
            className={`update-percentage ${
              update.text.startsWith("+") ? "profit-text" : "loss-text"
            }`}
          >
            {" "}
            {update.text}
          </span>
        ) : (
          ""
        )}
      </span>
      <span className="update-time">{update.time}</span>
    </div>
    {update.type === "Book profit" && (
      <div className="update-text">{update.text}</div>
    )}
    {update.type === "Update" && !update.live && (
      <div className="update-text">
        {update.text || (update.price >= 400 ? "3rd target done" : "")}
      </div>
    )}
  </div>
);

// === Main Component ===
const TradeRecommendation = () => {
  const dispatch = useDispatch();
  const { trades, loading } = useSelector((state) => state.trades);

  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("Closed");

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  const filteredTrades = useMemo(() => {
    return trades.filter((t) => {
      if (!t || !t.status) return false;
      const tradeStatus = t.status.toLowerCase();
      if (activeTab === "Closed") {
        return tradeStatus === "closed";
      } else {
        return tradeStatus !== "closed";
      }
    });
  }, [trades, activeTab]);

  const getBorderClass = (trade) => {
    if (trade.status === "Live") return "trade-card live-border";
    if (trade.result === "Profit") return "trade-card profit-border";
    if (trade.result === "Loss") return "trade-card loss-border";
    return "trade-card";
  };

  return (
    <div className="trade-container">
      <div className="d-flex justify-content-between">
        <h4 className="fw-bold">Trade Recommendation</h4>
        <Link
          to="/customer/dashboard"
          className="d-flex align-items-center justify-content-center text-dark 
             bg-white border rounded-pill shadow-sm"
          style={{ width: "36px", height: "36px" }}
        >
          <X size={20} />
        </Link>
      </div>

      {/* Tabs */}
      <div className="trade-tabs">
        <button
          className={`tab-btn ${activeTab === "Closed" ? "active" : ""}`}
          onClick={() => setActiveTab("Closed")}
        >
          Closed Trades
        </button>
        <button
          className={`tab-btn ${activeTab === "Live" ? "active" : ""}`}
          onClick={() => setActiveTab("Live")}
        >
          Live Trades
        </button>
        <button
          className="d-flex mt-2 align-items-center filter justify-content-center text-dark bg-white border rounded-2 shadow-sm"
          style={{ height: "35px" }}
          onClick={() => setShowFilter(true)}
        >
          <Filter className="me-2" size={18} /> Filter
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center mt-5">Loading trades...</div>
      ) : (
        <div className="trade-grid">
          {filteredTrades.map((trade) => (
            <div key={trade._id} className={getBorderClass(trade)}>
              <div className="trade-header">
                <h3 className="trade-title">
                  {trade.action} {trade.on} at ₹{trade.entryPrice}
                </h3>
                <div className={`status-tag ${trade.status.toLowerCase()}`}>
                  {trade.status}
                </div>
              </div>

              <div className="trade-meta">
                <span className="trade-date-time">
                  {(() => {
                    const date = new Date(trade.recommendationDateTime);
                    const formattedDate = date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                    const formattedTime = date.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });
                    return `${formattedDate} ${formattedTime}`;
                  })()}
                </span>

                <button className="butonsss text-muted">
                  {trade.segment} | {trade.tradeType}
                </button>
              </div>

              <div className="trade-details-grid">
                <TradeInfoRow label="Entry" value={`₹${trade.entryPrice}`} />
                <TradeInfoRow
                  label="Stoploss"
                  value={trade.stoploss || "N/A"}
                />
                <TradeInfoRow label="Duration" value={trade.timeDuration} />
                <TradeInfoRow
                  label="Weightage"
                  value={`${trade.weightageValue}${trade.weightageExtension}`}
                />
                {trade.lotSize && (
                  <TradeInfoRow label="Lot Size" value={trade.lotSize} />
                )}
                {(trade.target1 || trade.target2 || trade.target3) && (
                  <TradeInfoRow
                    label="Targets"
                    value={[trade.target1, trade.target2, trade.target3]
                      .filter((t) => t)
                      .join(", ")}
                  />
                )}
                <TradeInfoRow label="Risk" value={trade.risk} />
                <TradeInfoRow label="Brief" value={trade.brief} />
              </div>
              {/* Trade Actions Display */}
              <TradeActions tradeId={trade._id} />

              {/* <div className="d-flex justify-content-between">
                <div className="mt-4">
                  <button className="butonsss text-muted">Update</button>
                </div>
                {/* <div>
                  {trade.updates &&
                    trade.updates.map((update, index) => (
                      <TradeUpdatePill key={index} update={update} />
                    ))}
                </div> 
              </div> */}

              {/* --------- */}

              {trade.status === "Closed" && (
                <div
                  className={`pnl-summary ${
                    trade.result === "Profit" ? "profit" : "loss"
                  }`}
                >
                  {trade.result === "Profit" ? "▲" : "▼"} ₹
                  {Math.abs(trade.pnl || 0).toLocaleString()}
                  {(() => {
                    const lotSize = parseInt(trade.lotSize) || 0;
                    const entryPrice = parseFloat(trade.entryPrice) || 0;
                    return (lotSize * entryPrice).toLocaleString("en-IN");
                  })()}
                </div>
              )}
              {trade.status === "Live" && (
                <div className="pnl-summary live-status">Live</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal show={showFilter} onClose={() => setShowFilter(false)} />
    </div>
  );
};

export default TradeRecommendation;
