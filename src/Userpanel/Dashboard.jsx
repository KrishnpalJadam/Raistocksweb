// DashboardContent.jsx
import TradeTable from "./TradeTable";
import React, { useEffect, useRef } from "react";
import { Target, TrendingUp, DollarSign, Zap, LineChart } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrades } from "../slices/tradeSlice";
import { fetchTradeSetup } from "../slices/tradeSetupSlice";
import MarketTrend from "./MarketTrend";
import TradeSetup from "./TradeSetup";

/* Module Panel: fly-out from right covering main content */
const ModulePanel = ({ moduleName, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [onClose]);

  return (
    <div className="rai-dashboard-panel-overlay">
      <div ref={ref} className="rai-dashboard-panel">
        <button className="rai-dashboard-panel-close btn" onClick={onClose}>
          Close
        </button>
        <h4>{moduleName}</h4>
        <p className="text-muted">
          Module content will be implemented here. Admin inputs, charts, tables
          as per requirements.
        </p>
      </div>
    </div>
  );
};

// Icons and colors for different trade setup types
const getSetupIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "market insight":
      return DollarSign;
    case "market phase":
      return Zap;
    case "market trend":
      return LineChart;
    default:
      return Target;
  }
};

const getSetupColor = (type) => {
  switch (type?.toLowerCase()) {
    case "market insight":
      return "#0d6efd";
    case "market phase":
      return "#dc3545";
    case "market trend":
      return "#ffc107";
    default:
      return "#6c757d";
  }
};
const FeedCard = ({
  module,
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
      borderLeft: `4px solid ${color}`,
      borderRadius: "6px",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      marginBottom: "16px",
    }}
  >
    <div style={{ padding: "12px" }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: `${color}20`,
              borderRadius: "50%",
              padding: "6px",
              marginRight: "8px",
            }}
          >
            <Icon size={16} color={color} />
          </div>
          <h6 style={{ margin: 0, fontSize: "14px", color: "#212529" }}>
            {title}
          </h6>
        </div>
        <span
          className="cardmode"
          style={{
            fontSize: "11px",
            color: "#6c757d",
            background: "#f8f9fa",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          {module}
        </span>
      </div>

      {/* Value */}
      <p
        style={{
          margin: "0 0 4px 0",
          fontSize: "13px",
          fontWeight: 600,
          color,
        }}
      >
        {value}
      </p>

      {/* Comment */}
      <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#495057" }}>
        {comment}
      </p>

      {/* Date */}
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
const Dashboard = ({ activeModule, setActiveModule }) => {
  const dispatch = useDispatch();
  const {
    trades,
    loading: tradesLoading,
    error: tradesError,
  } = useSelector((state) => state.trades);
  const {
    items: tradeSetups,
    loading: setupsLoading,
    error: setupsError,
  } = useSelector((state) => state.tradeSetup);

  // Fetch trades and trade setups when component mounts
  useEffect(() => {
    dispatch(fetchTrades());
    dispatch(fetchTradeSetup());
  }, [dispatch]);

  // Filter and limit trades
  const liveTrades = trades
    .filter((trade) => trade && trade.status === "Live")
    .slice(0, 3);

  const closedTrades = trades
    .filter(
      (trade) =>
        trade && trade.status && trade.status.toLowerCase().includes("closed")
    )
    .slice(0, 3);

  // If an actual module other than the default 'Trade Recommendation' selected, show flyout
  const showPanel = activeModule && activeModule !== "Trade Recommendation";

  return (
    <main className="rai-dashboard-main">
      {!showPanel && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <select className="form-select w-auto">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 90 Days</option>
            </select>
            <DatePicker
              className="form-control"
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
            <span className="me-3 pt-1 ms-3">To</span>
            <DatePicker
              className="form-control"
              placeholderText="End Date"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </div>

          <div className="row mb-4">
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="card rai-dashboard-card p-3 bg-white">
                <h6 className="text-muted mb-1">Accuracy (All Trades)</h6>
                <h3 className="text-success fw-bold">78%</h3>
                <small className="text-muted">Cash: 85% | F&amp;O: 65%</small>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
              <div className="card rai-dashboard-card p-3 bg-white">
                <h6 className="text-muted mb-1">Our Returns (Cash)</h6>
                <h3 className="text-primary fw-bold">+32%</h3>
                <small className="text-success">VS Nifty50: +18%</small>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 mb-3">
              <div className="card rai-dashboard-card p-3 bg-white">
                <h6 className="text-muted mb-1">Avg. F&amp;O Return / Lot</h6>
                <h3 className="text-warning fw-bold">₹1,850</h3>
                <div className="d-flex macpro">
                  <small className="text-success">Max Profit Per Lot: 8%</small>
                  <small className="text-danger">Max Loss Per Lot: 8%</small>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-3">
              {tradesLoading ? (
                <div className="text-center p-4">Loading trades...</div>
              ) : tradesError ? (
                <div className="text-center p-4 text-danger">
                  Error loading trades: {tradesError}
                </div>
              ) : (
                <TradeTable
                  title="Live Trades"
                  data={liveTrades}
                  isLive={true}
                  onRowClick={(trade) => console.log("Clicked trade:", trade)}
                />
              )}
            </div>

            <div className="col-12">
              {tradesLoading ? (
                <div className="text-center p-4">Loading trades...</div>
              ) : tradesError ? (
                <div className="text-center p-4 text-danger">
                  Error loading trades: {tradesError}
                </div>
              ) : (
                <TradeTable
                  title="Closed Trades"
                  data={closedTrades}
                  isLive={false}
                  onRowClick={(trade) => console.log("Clicked trade:", trade)}
                />
              )}
            </div>
          </div>

          {/* <h5 className="mt-4 mb-3">Trade Setup Insight (Posts)</h5>
          <div className="row">
            {setupsLoading ? (
              <div className="text-center p-4">Loading trade setups...</div>
            ) : setupsError ? (
              <div className="text-center p-4 text-danger">
                Error loading trade setups: {setupsError}
              </div>
            ) : (
              tradeSetups.slice(0, 3).map((setup, i) => (
                <div key={setup._id || i} className="col-12 col-md-6 col-lg-4">
                  <FeedCard
                    module={setup.type || "Trade Setup"}
                    title={setup.title}
                    value={setup.value}
                    comment={setup.description || setup.comment}
                    date={new Date(setup.createdAt).toLocaleDateString()}
                    icon={getSetupIcon(setup.type)}
                    color={getSetupColor(setup.type)}
                  />
                </div>
              ))
            )}
          </div> */}
        </>
      )}
<TradeSetup/>
      {showPanel && (
        <ModulePanel
          moduleName={activeModule}
          onClose={() => setActiveModule("Trade Recommendation")}
        />
      )}
    </main>
  );
};

export default Dashboard;
