// // src/Userpanel/TradeSetup.jsx
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTradeSetup } from "../slices/tradeSetupSlice";
// import { DollarSign, X } from "lucide-react";

// const TradeSetup = () => {
//   const dispatch = useDispatch();
//   const { items, loading, error } = useSelector((state) => state.tradeSetup);

//   useEffect(() => {
//     dispatch(fetchTradeSetup());
//   }, [dispatch]);

//   // ✅ Filter: show only entries that have at least a title
//   const validItems = Array.isArray(items)
//     ? items.filter(
//         (item) =>
//           item &&
//           item.title && // must have title
//           item.title.trim() !== "" && // not empty
//           (item.comment || item.modelType) // and should have at least one more piece of info
//       )
//     : [];

//   const FeedCard = ({
//     modelType,
//     title,
//     value,
//     comment,
//     date,
//     icon: Icon,
//     color,
//   }) => (
//     <div
//       className="card"
//       style={{
//         border: "1px solid #e9ecef",
//         borderLeft: `4px solid ${color || "#0d6efd"}`,
//         borderRadius: "6px",
//         background: "#fff",
//         boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//         marginBottom: "16px",
//       }}
//     >
//       <div style={{ padding: "12px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "6px",
//           }}
//         >
//           <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <div
//                 style={{
//                   background: `${color || "#0d6efd"}20`,
//                   borderRadius: "50%",
//                   padding: "6px",
//                 }}
//               >
//                 <Icon size={16} color={color || "#0d6efd"} />
//               </div>
//               <span
//                 className="cardmode"
//                 style={{
//                   fontSize: "12px",
//                   color: "#6c757d",
//                   background: "#f8f9fa",
//                   padding: "2px 6px",
//                   borderRadius: "4px",
//                   fontWeight: "500",
//                 }}
//               >
//                 {modelType}
//               </span>
//             </div>
//             <h6
//               style={{
//                 margin: 0,
//                 fontSize: "14px",
//                 color: "#212529",
//                 fontWeight: "600",
//               }}
//             >
//               {title}
//             </h6>
//           </div>
//         </div>
//         {value && (
//           <p
//             style={{
//               margin: "12px 0 4px 0",
//               fontSize: "13px",
//               fontWeight: 600,
//               color,
//             }}
//           >
//             {value}
//           </p>
//         )}
//         {comment && (
//           <p
//             style={{
//               margin: "0 0 12px 0",
//               fontSize: "12px",
//               color: "#495057",
//               lineHeight: "1.5",
//             }}
//           >
//             {comment}
//           </p>
//         )}
//         <p
//           style={{
//             margin: 0,
//             fontSize: "11px",
//             color: "#6c757d",
//             textAlign: "right",
//           }}
//         >
//           {date}
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <div className="d-flex justify-content-between mb-4">
//         <h4 className="" style={{ fontWeight: "600" }}>
//           Trade Setup Feed
//         </h4>
//         <Link
//           to="/customer/dashboard"
//           className="d-flex align-items-center justify-content-center text-dark 
//            bg-white border rounded-pill shadow-sm"
//           style={{ width: "36px", height: "36px" }}
//         >
//           <X size={20} />
//         </Link>
//       </div>

//       <p style={{ fontSize: "12px", color: "#6c757d", marginBottom: "20px" }}>
//         Aggregated and prioritized view from Market Insight, Market Phase,
//         Market Trend & Market Setup.
//       </p>

//       {loading && <p>Loading feed...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div className="row">
//         {validItems.length > 0 ? (
//           validItems.map((item, i) => {
//             const { modelType, title, comment, createdAt, modelRef } = item;
//             return (
//               <div key={i} className="col-12 col-md-6 col-lg-4">
//                 <FeedCard
//                   modelType={modelType}
//                   title={title}
//                   comment={comment}
//                   icon={DollarSign}
//                   color={item.color || "#0d6efd"}
//                   date={
//                     modelRef?.createdAt
//                       ? new Date(modelRef.createdAt).toLocaleDateString()
//                       : new Date(createdAt).toLocaleDateString()
//                   }
//                 />
//               </div>
//             );
//           })
//         ) : (
//           !loading && (
//             <p style={{ color: "#6c757d" }}>
//               No valid trade setup data available.
//             </p>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default TradeSetup





import React, { useEffect } from "react";
import MarketSetup from "./MarketSetup";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketPhases } from "../slices/marketPhaseSlice";
import { fetchMarketTrends } from "../slices/marketTrendSlice";

const TradeSetup = () => {
  const dispatch = useDispatch();

  const {
    marketPhases,
    loading: phaseLoading,
    error: phaseError,
  } = useSelector((state) => state.marketPhase);

  const {
    trends,
    loading: trendLoading,
    error: trendError,
  } = useSelector((state) => state.marketTrend);

  useEffect(() => {
    dispatch(fetchMarketPhases());
    dispatch(fetchMarketTrends());
  }, [dispatch]);

  // ✅ Get latest Market Phase (most recent by date)
  const latestPhase =
    Array.isArray(marketPhases) && marketPhases.length > 0
      ? [...marketPhases].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
      : null;

  const phaseTitle = latestPhase?.title || "N/A";
  const phaseDescription =
    latestPhase?.description || "No description available.";

  // ✅ Get latest Market Trend (most recent by date)
  const latestTrend =
    Array.isArray(trends) && trends.length > 0
      ? [...trends].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
      : null;

  const trendTitle = latestTrend?.title || "N/A";
  const trendDescription =
    latestTrend?.description || "No description available.";

  return (
    <div className="container-fluid my-newtradesetup-container">
      <div>
        {/* Main Content */}
        <div>
          <h5 className="fw-bold mb-3">Trade Setup</h5>

          <div className="row g-3">
            {/* Fundamental Analysis */}
            <div className="col-md-6">
              <div
                className="my-newtradesetup-card rounded-5 p-3"
                style={{ border: "1px solid #1c5ce3" }}
              >
                <h6 className="fw-bold text-center">
                  Fundamental Analysis
                  <br />
                  <small>(From Market Insight)</small>
                </h6>
                <div className="row mt-3" style={{ alignItems: "center" }}>
                  <div className="col-6">
                    <h6 className="fw-bold text-success">Positive</h6>
                    <ul className="my-newtradesetup-list">
                      <li>FII/DII</li>
                      <li>MPC Meeting</li>
                      <li>FED Meeting</li>
                      <li>India Vix</li>
                      <li>GDP Data</li>
                      <li>Inflation</li>
                      <li>Auto Sales Data</li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <h6 className="fw-bold text-danger">Negative</h6>
                    <ul className="my-newtradesetup-list">
                      <li>Dollar Rate</li>
                      <li>Crude</li>
                      <li>Gold</li>
                      <li>Silver</li>
                      <li>Global Headline</li>
                      <li>Global Market</li>
                      <li>Stocks in news</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Analysis */}
            <div className="col-md-6">
              <div
                className="my-newtradesetup-card rounded-5 p-3"
                style={{ border: "1px solid #1c5ce3" }}
              >
                <h6 className="fw-bold text-center">Technical Analysis</h6>
                <div className="row mt-3">
                  {/* ========== Market Phase ========== */}
                  <div className="col-6 border-end">
                    <h6 className="fw-bold text-primary">Market Phase</h6>

                    {phaseLoading ? (
                      <p className="text-muted small">Loading...</p>
                    ) : phaseError ? (
                      <p className="text-danger small">{phaseError}</p>
                    ) : (
                      <p className="text-muted small">
                        <strong>{phaseTitle}</strong>
                        <br />
                        <small>{phaseDescription}</small>
                      </p>
                    )}
                  </div>

                  {/* ========== Market Trend ========== */}
                  <div className="col-6">
                    <h6 className="fw-bold text-primary">Market Trend</h6>
                    {trendLoading ? (
                      <p className="text-muted small">Loading...</p>
                    ) : trendError ? (
                      <p className="text-danger small">{trendError}</p>
                    ) : (
                      <p className="text-muted small">
                        <strong>{trendTitle}</strong>
                        <br />
                        <small>{trendDescription}</small>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* From Market Setup */}
          <div className="my-newtradesetup-card rounded-5 p-3 mt-4"
            style={{ border: "1px solid #1c5ce3" }}>
            <MarketSetup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeSetup;
