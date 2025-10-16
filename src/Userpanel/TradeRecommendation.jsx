import React, { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("Recent");

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  const filteredTrades = trades.filter((t) =>
    activeTab === "Recent" ? t.status === "Closed" : t.status === "Live"
  );

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
          className={`tab-btn ${activeTab === "Recent" ? "active" : ""}`}
          onClick={() => setActiveTab("Recent")}
        >
          Recent Trades
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
                  {new Date(trade.recommendationDateTime).toLocaleString()}
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

// import React, { useState } from "react";

// import {  X, Filter, BookOpen } from "lucide-react";

// const TRADE_CHOICES = {
//     trade_segment: ["Cash", "Index future", "Index option", "Commodity future", "Commodity option", "Stock future", "Stock option"],
//     trade_type: ["Swing", "Intraday", "Scalp", "Invest", "Strategy"],
//     trade_action: ["Buy", "Sell", "Long", "Short"],
//     duration: ["Today", "Tomorrow", "15 Days", "1 to 2 Months", "1 to 3 Months", "1 to 4 Months", "1 to 6 Months", "2 to 3 months", "2 to 4 Months", "3 to 6 Months", "3 Months to 1 Year", "3 Months to 2 Years", "4 Months to 1 Year", "6 Months to 1 Year", "6 Months to 2 Years", "1 to 2 Years", "1 to 3 Years"],
//     weightage_extension: ["% of your capital", "% of your capital or minimum 1 lot"],
//     update_type: ["Update", "Book profit", "Exit", "Stoploss Hit"]
// };

// const DUMMY_TRADE_UPDATES = [
//     {
//         id: 101,
//         related_trade: 1,
//         update_type: "Book profit",
//         updated_price: 453.00,
//         remarks: "Everyone book full profits here. Exited at high.",
//         update_date_time: "October 3, 2025 2:02 PM",
//     },
//     {
//         id: 102,
//         related_trade: 1,
//         update_type: "Update",
//         updated_price: 436.00,
//         remarks: "Target 3 achieved! Book 50% here and revise SL to cost.",
//         update_date_time: "October 3, 2025 2:01 PM",
//     },
//     {
//         id: 103,
//         related_trade: 4,
//         update_type: "Update",
//         updated_price: 381.50,
//         remarks: "Holding trade. Price is consolidating near the 200 EMA.",
//         update_date_time: "October 4, 2025 10:30 AM",
//     },
//     {
//         id: 104,
//         related_trade: 2,
//         update_type: "Exit",
//         updated_price: 251.00,
//         remarks: "Target 1 hit, exiting position due to volatility.",
//         update_date_time: "October 4, 2025 9:30 AM",
//     },
//     {
//         id: 105,
//         related_trade: 5,
//         update_type: "Stoploss Hit",
//         updated_price: 320.00,
//         remarks: "SL hit due to sharp reversal. Manage risk.",
//         update_date_time: "October 3, 2025 1:00 PM",
//     },
//     {
//         id: 106,
//         related_trade: 3,
//         update_type: "Update",
//         updated_price: 1725.00,
//         remarks: "+1.52% up. Maintain SL.",
//         update_date_time: "October 4, 2025 10:12 AM",
//     },
//     {
//         id: 107,
//         related_trade: 6,
//         update_type: "Exit",
//         updated_price: 471.00,
//         remarks: "Exited position manually on weakness. Small loss booked.",
//         update_date_time: "October 3, 2025 11:45 AM",
//     },
// ];

// const DUMMY_TRADES = [
//     {
//         id: 1,
//         title: "BANKNIFTY 45000 CE (Oct 10 Expiry)",
//         trade_segment: "Index option",
//         trade_type: "Intraday",
//         trade_action: "Buy",
//         trade_on: "Banknifty 45000 CE",
//         entry_price: 277.00,
//         target_1: 344.00,
//         target_2: 384.00,
//         target_3: 436.00,
//         stoploss: 207.00,
//         duration: "Today",
//         weightage_value: 6,
//         weightage_extension: "% of your capital or minimum 1 lot",
//         lot_size: 15,
//         lots: 1,
//         recommendation_date_time: "October 3, 2025 12:12 PM",
//         attached_doc: "/docs/trade_plan_bn_20251003.pdf", // Attached document
//     },
//     {
//         id: 2,
//         title: "NIFTY 19800 CE (Oct 10 Expiry)",
//         trade_segment: "Index option",
//         trade_type: "Intraday",
//         trade_action: "Buy",
//         trade_on: "Nifty 19800 CE",
//         entry_price: 172.00,
//         target_1: 242.00,
//         target_2: 282.00,
//         target_3: 352.00,
//         stoploss: 134.00,
//         duration: "Today",
//         weightage_value: 5,
//         weightage_extension: "% of your capital or minimum 1 lot",
//         lot_size: 50,
//         lots: 1,
//         recommendation_date_time: "October 3, 2025 9:20 AM",
//         attached_doc: null,
//     },
//     {
//         id: 3,
//         title: "SUN PHARMA LTD.",
//         trade_segment: "Cash",
//         trade_type: "Swing",
//         trade_action: "Buy",
//         trade_on: "SUNPHARMA",
//         entry_price: 1699.00,
//         target_1: 1802.00,
//         target_2: 1840.00,
//         target_3: null,
//         stoploss: 1630.00,
//         duration: "1 to 3 Months",
//         weightage_value: 8,
//         weightage_extension: "% of your capital",
//         lot_size: 1,
//         lots: 50,
//         recommendation_date_time: "September 29, 2025 11:15 AM",
//         attached_doc: null,
//     },
//     {
//         id: 4,
//         title: "RVNL LTD.",
//         trade_segment: "Cash",
//         trade_type: "Swing",
//         trade_action: "Buy",
//         trade_on: "RVNL",
//         entry_price: 375.00,
//         target_1: 404.00,
//         target_2: 412.00,
//         target_3: 426.00,
//         stoploss: 350.00,
//         duration: "1 to 3 Months",
//         weightage_value: 7,
//         weightage_extension: "% of your capital",
//         lot_size: 1,
//         lots: 100,
//         recommendation_date_time: "September 28, 2025 1:15 PM",
//         attached_doc: "/docs/research_rvnl.docx", // Attached document
//     },
//     {
//         id: 5,
//         title: "HDFC BANK LTD.",
//         trade_segment: "Stock future",
//         trade_type: "Scalp",
//         trade_action: "Sell",
//         trade_on: "HDFCBANK",
//         entry_price: 1550.00,
//         target_1: 1540.00,
//         target_2: 1530.00,
//         target_3: null,
//         stoploss: 1565.00,
//         duration: "Today",
//         weightage_value: 4,
//         weightage_extension: "% of your capital or minimum 1 lot",
//         lot_size: 550,
//         lots: 1,
//         recommendation_date_time: "October 2, 2025 1:00 PM",
//         attached_doc: null,
//     },
//     {
//         id: 6,
//         title: "VARUN BEVERAGES LTD. (VBL)",
//         trade_segment: "Cash",
//         trade_type: "Swing",
//         trade_action: "Buy",
//         trade_on: "VBL",
//         entry_price: 486.00,
//         target_1: 520.00,
//         target_2: 540.00,
//         target_3: null,
//         stoploss: 460.00,
//         duration: "1 to 3 Months",
//         weightage_value: 7,
//         weightage_extension: "% of your capital",
//         lot_size: 1,
//         lots: 150,
//         recommendation_date_time: "September 27, 2025 10:43 AM",
//         attached_doc: null,
//     },
// ].map(trade => ({
//     ...trade,
//     updates: DUMMY_TRADE_UPDATES.filter(u => u.related_trade === trade.id).sort((a, b) => new Date(b.update_date_time) - new Date(a.update_date_time)),
//     isClosed: DUMMY_TRADE_UPDATES.filter(u => u.related_trade === trade.id).some(u => ["Book profit", "Exit", "Stoploss Hit"].includes(u.update_type)),
//     // Compute closing data for closed trades
//     closingData: (() => {
//         const exitUpdate = DUMMY_TRADE_UPDATES.find(u => u.related_trade === trade.id && ["Book profit", "Exit", "Stoploss Hit"].includes(u.update_type));
//         if (exitUpdate) {
//             const entry = trade.entry_price;
//             const exit = exitUpdate.updated_price;
//             const quantity = trade.trade_segment.toLowerCase().includes('option') || trade.trade_segment.toLowerCase().includes('future') ? trade.lot_size * trade.lots : trade.lots;
//             const multiplier = trade.trade_action.toLowerCase().includes('buy') || trade.trade_action.toLowerCase().includes('long') ? 1 : -1;
//             const pnl = parseFloat(((exit - entry) * quantity * multiplier).toFixed(2));
//             const result = pnl > 0 ? "Profit" : pnl < 0 ? "Loss" : "Break Even";
//             return { exitPrice: exit, pnl, result };
//         }
//         return null;
//     })()
// })).sort((a, b) => new Date(b.recommendation_date_time) - new Date(a.recommendation_date_time)); // Final sorting by date desc

// // --- Helper Components ---
// const TradeInfoRow = ({ label, value, className = "" }) => (
//     <div className={`trade-info-row ${className}`}>
//         <span className="trade-info-label">{label}</span>
//         <span className="trade-info-value">{value}</span>
//     </div>
// );

// const PnLCalculator = ({ entry, exit, lotInfo, action }) => {
//     const quantity = lotInfo.lot_size * lotInfo.lots;
//     const multiplier = action.toLowerCase().includes('buy') || action.toLowerCase().includes('long') ? 1 : -1;
//     const pnl = (exit - entry) * quantity * multiplier;
//     const result = pnl > 0 ? "Profit" : pnl < 0 ? "Loss" : "Break Even";

//     return (
//         <span className={`pnl-summary ${result === "Profit" ? "profit" : "loss"}`}>
//             {result === "Profit" ? "▲" : "▼"} ₹{Math.abs(pnl).toLocaleString()}
//         </span>
//     );
// };

// // --- Trade Update Component ---
// const TradeUpdatePill = ({ update }) => {
//     let updateColor = '#6c757d';
//     if (update.update_type === "Book profit") updateColor = '#198754';
//     if (update.update_type === "Stoploss Hit") updateColor = '#dc3545';
//     if (update.update_type === "Exit") updateColor = '#ffc107';

//     return (
//         <div className={`trade-update-pill`} style={{ borderLeft: `3px solid ${updateColor}` }}>
//             <div className="update-price-time">
//                 <span className="update-price" style={{ color: updateColor }}>
//                     {update.update_type}: ₹{update.updated_price}
//                 </span>
//                 <span className="update-time small text-muted">
//                     {update.update_date_time}
//                 </span>
//             </div>
//             {update.remarks && (
//                 <div className="update-text small text-dark-emphasis">
//                     {update.remarks}
//                 </div>
//             )}
//         </div>
//     );
// };

// // --- Full Trade Modal Component (Row Expand) ---
// const FullTradeModal = ({ trade, onClose }) => {
//     if (!trade) return null;

//     // Get PnL Example for closed trade
//     const pnlResult = trade.closingData;

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content p-4" style={{ maxWidth: '800px' }}>
//                 <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
//                     <h4 className="fw-bold text-primary">{trade.title}</h4>
//                     <button className="btn btn-light rounded-circle shadow-sm" onClick={onClose} >
//                         <X size={18} />
//                     </button>
//                 </div>

//                 {/* Status and P&L Summary */}
//                 <div className={`p-3 rounded-3 mb-4 d-flex justify-content-between align-items-center ${trade.isClosed ? (pnlResult.result === 'Profit' ? 'bg-success-subtle' : 'bg-danger-subtle') : 'bg-info-subtle'}`}>
//                     <span className={`fw-bold h5 mb-0 ${trade.isClosed ? (pnlResult.result === 'Profit' ? 'text-success' : 'text-danger') : 'text-info'}`}>
//                         Status: {trade.isClosed ? "CLOSED" : "LIVE"}
//                     </span>
//                     {trade.isClosed && (
//                         <span className="h5 mb-0">
//                             P&L: <PnLCalculator entry={trade.entry_price} exit={pnlResult.exitPrice} lotInfo={trade} action={trade.trade_action} />
//                         </span>
//                     )}
//                 </div>

//                 <div className="row">
//                     {/* Left Column: Trade Details */}
//                     <div className="col-lg-6">
//                         <h5 className="mb-3 text-secondary">Trade Details</h5>
//                         <div className="trade-details-grid-full mb-4">
//                             <TradeInfoRow label="Segment/Type" value={`${trade.trade_segment} / ${trade.trade_type}`} />
//                             <TradeInfoRow label="Action" value={`${trade.trade_action} on ${trade.trade_on}`} />
//                             <TradeInfoRow label="Entry Price" value={`₹${trade.entry_price.toFixed(2)}`} className="entry-row" />
//                             <TradeInfoRow label="Targets" value={`${trade.target_1}, ${trade.target_2}${trade.target_3 ? `, ${trade.target_3}` : ''}`} />
//                             <TradeInfoRow label="Stoploss" value={trade.stoploss} />
//                             <TradeInfoRow label="Duration" value={trade.duration} />
//                             <TradeInfoRow label="Date/Time" value={trade.recommendation_date_time} />
//                         </div>

//                         <h5 className="mb-3 text-secondary">Advanced</h5>
//                         <div className="trade-details-grid-full">
//                             <TradeInfoRow label="Weightage" value={`${trade.weightage_value} ${trade.weightage_extension}`} />
//                             <TradeInfoRow label="Lot Size" value={trade.lot_size} />
//                             <TradeInfoRow label="Lots" value={trade.lots} />
//                             <TradeInfoRow label="Total Qty" value={trade.lot_size * trade.lots} />
//                         </div>

//                         {trade.attached_doc && (
//                             <div className="mt-4">
//                                 <a
//                                     href={trade.attached_doc}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="btn btn-primary d-flex align-items-center"
//                                 >
//                                     <BookOpen size={16} className="me-2" /> Open Recommendation Document (.{(trade.attached_doc.split('.').pop())})
//                                 </a>
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Column: Trade Updates */}
//                     <div className="col-lg-6 border-start ps-lg-4 mt-4 mt-lg-0">
//                         <h5 className="mb-3 text-secondary">Trade Updates ({trade.updates.length})</h5>
//                         <div className="updates-list">
//                             {trade.updates.length > 0 ? (
//                                 trade.updates.map(update => (
//                                     <TradeUpdatePill key={update.id} update={update} />
//                                 ))
//                             ) : (
//                                 <p className="text-muted small">No updates available for this trade yet.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- Main Component ---
// const TradeRecommendation = () => {
//     const [activeTab, setActiveTab] = useState("Live");
//     const [selectedTrade, setSelectedTrade] = useState(null);
//     const [showFilter, setShowFilter] = useState(false);

//     // Filter trades based on the active tab
//     const filteredTrades = DUMMY_TRADES.filter((trade) => {
//         if (activeTab === "Live") return !trade.isClosed;
//         if (activeTab === "Recent") return trade.isClosed;
//         return true;
//     });

//     // Determine the primary border color
//     const getBorderClass = (trade) => {
//         if (!trade.isClosed) return "live-border";
//         if (trade.closingData && trade.closingData.result === "Profit") return "profit-border";
//         if (trade.closingData && trade.closingData.result === "Loss") return "loss-border";
//         return "closed-border";
//     };

//     return (
//         <div className="rai-module-content p-3">
//             <h2 className="border-bottom pb-2 mb-4 text-primary">Trade Recommendations</h2>

//             {/* Tabs Navigation and Filter Button */}
//             <div className="trade-tabs-header d-flex justify-content-between align-items-end mb-4">
//                 <div className="trade-tabs">
//                     <button
//                         className={`tab-btn ${activeTab === "Live" ? "active" : ""}`}
//                         onClick={() => setActiveTab("Live")}
//                     >
//                         Live Trades ({DUMMY_TRADES.filter(t => !t.isClosed).length})
//                     </button>
//                     <button
//                         className={`tab-btn ${activeTab === "Recent" ? "active" : ""}`}
//                         onClick={() => setActiveTab("Recent")}
//                     >
//                         Closed Trades ({DUMMY_TRADES.filter(t => t.isClosed).length})
//                     </button>
//                 </div>
//                 <button
//                     className="btn btn-sm btn-outline-secondary d-flex align-items-center"
//                     onClick={() => setShowFilter(true)}
//                 >
//                     <Filter size={16} className="me-1" /> Filter
//                 </button>
//             </div>

//             {/* Trade Grid (4. Responsive Grid) */}
//             <div className="trade-grid">
//                 {filteredTrades.length > 0 ? (
//                     filteredTrades.map((trade) => (
//                         <div key={trade.id} className={`trade-card ${getBorderClass(trade)}`}>
//                             {/* Trade Header */}
//                             <div className="trade-header">
//                                 <h3 className="trade-title">{trade.title}</h3>
//                                 <div className={`status-tag ${trade.isClosed ? 'closed' : 'live'}`}>
//                                     {trade.isClosed ? 'Closed' : 'Live'}
//                                 </div>
//                             </div>

//                             <div className="trade-meta">
//                                 <span className="trade-date-time text-muted small">
//                                     Rec. Date: {new Date(trade.recommendation_date_time).toLocaleDateString()}
//                                 </span>
//                                 <span className={`badge ${trade.trade_action.toLowerCase().includes('buy') || trade.trade_action.toLowerCase().includes('long') ? 'bg-success' : 'bg-danger'} trade-action-badge`}>
//                                     {trade.trade_action}
//                                 </span>
//                             </div>

//                             {/* Trade Details Grid */}
//                             <div className="trade-details-grid mt-2">
//                                 <TradeInfoRow label="Entry" value={`₹${trade.entry_price.toFixed(2)}`} className="entry-row" />
//                                 <TradeInfoRow label="Target(s)" value={[trade.target_1, trade.target_2, trade.target_3].filter(t => t).join(", ")} />
//                                 <TradeInfoRow label="Stoploss" value={trade.stoploss} />
//                                 <TradeInfoRow label="Duration" value={trade.duration} />
//                                 <TradeInfoRow label="Segment/Type" value={`${trade.trade_segment} / ${trade.trade_type}`} />
//                                 <TradeInfoRow label="Weightage" value={`${trade.weightage_value}%`} />
//                             </div>

//                             {/* Latest Update & View Details Button */}
//                             <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
//                                 <div>
//                                     <button
//                                         className="btn btn-sm btn-outline-primary"
//                                         onClick={() => setSelectedTrade(trade)}
//                                     >
//                                         View Details
//                                     </button>
//                                 </div>

//                                 {trade.isClosed && trade.closingData ? (
//                                     <div className="text-end">
//                                         <PnLCalculator entry={trade.entry_price} exit={trade.closingData.exitPrice} lotInfo={trade} action={trade.trade_action} />
//                                         <p className="small text-muted mb-0 mt-1">
//                                             Closed at ₹{trade.closingData.exitPrice.toFixed(2)}
//                                         </p>
//                                     </div>
//                                 ) : trade.updates.length > 0 ? (
//                                     <div className="text-end small">
//                                         <span className={`fw-bold ${trade.updates[0].update_type === 'Book profit' ? 'text-success' : 'text-primary'}`}>
//                                             {trade.updates[0].update_type}
//                                         </span>
//                                         <p className="text-muted mb-0 mt-1" style={{ fontSize: '11px' }}>
//                                             {trade.updates[0].update_date_time}
//                                         </p>
//                                     </div>
//                                 ) : (
//                                     <span className="small text-muted">No updates</span>
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-muted">No {activeTab.toLowerCase()} trades to display.</p>
//                 )}
//             </div>

//             {/* Modals */}
//             <FullTradeModal trade={selectedTrade} onClose={() => setSelectedTrade(null)} />
//             {/* NOTE: FilterModal component from your input is used here (assuming it's available) */}
//             {/* <FilterModal show={showFilter} onClose={() => setShowFilter(false)} /> */}
//         </div>
//     );
// };

// export default TradeRecommendation;
