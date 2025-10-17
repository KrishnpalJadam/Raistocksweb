// TradeDiary.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  X,
  BookOpen,
  TrendingUp,
  TrendingDown,
  ClipboardCheck,
} from "lucide-react";
import { fetchTrades } from "../slices/tradeSlice";
import { fetchTradeActions } from "../slices/tradeActionsSlice";
import {
  setTradeFormField,
  setSelectedTrade,
  addTradeLog,
  resetTradeForm,
} from "../slices/userTradeFormSlice";
import { addTradeDiaryEntry } from "../slices/tradeLogSlice";
// For simplicity, we'll redefine a subset here. In a real app, this would be imported.
// Will be replaced by trades from backend
const DUMMY_TRADES = [
  {
    id: 1,
    title: "BANKNIFTY 45000 CE (Oct 10 Expiry)",
    trade_action: "Buy",
    entry_price: 277.0,
    lot_size: 15,
    trade_segment: "Index option",
  },
  {
    id: 3,
    title: "SUN PHARMA LTD.",
    trade_action: "Buy",
    entry_price: 1699.0,
    lot_size: 1,
    trade_segment: "Cash",
  },
  {
    id: 5,
    title: "HDFC BANK LTD. Future",
    trade_action: "Sell",
    entry_price: 1550.0,
    lot_size: 550,
    trade_segment: "Stock future",
  },
  {
    id: 6,
    title: "VARUN BEVERAGES LTD. (VBL)",
    trade_action: "Buy",
    entry_price: 486.0,
    lot_size: 1,
    trade_segment: "Cash",
  },
];

const TradeDiary = () => {
  const dispatch = useDispatch();
  const tradeForm = useSelector(
    (state) => state.userTradeForm?.tradeForm || {}
  );
  const { trades, loading: tradesLoading } = useSelector(
    (state) => state.trades
  );
  const { actions: tradeActions } = useSelector((state) => state.tradeActions);
  const { user, loading: authLoading } = useSelector((state) => state.crmAuth);
  const diaryLogs = useSelector((state) => state.tradeLogs?.logs || []);

  // Add a debug log to see when the user object is available from Redux
  useEffect(() => {
    if (user) {
      console.log("User object from Redux is available:", user);
      console.log("User ID from Redux:", user._id);
    } else {
      console.log("User object from Redux is null or undefined.");
    }
  }, [user]);

  // Fetch backend trades and existing diary entries on mount
  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  // Local state for matched trade and submitted entries
  const [matchedTrade, setMatchedTrade] = useState(null);
  const [submittedEntries, setSubmittedEntries] = useState([]);
  const [tradesWithExit, setTradesWithExit] = useState([]);

  // Helper function to check if trade has exit action and return it
  const getTradeExitAction = (tradeId) => {
    if (!tradeActions || !tradeActions.length) return null;
    return tradeActions.find((action) => {
      const matchesId =
        action.tradeId === tradeId ||
        action.trade_id === tradeId ||
        action._tradeId === tradeId ||
        action.related_trade === tradeId;
      if (!matchesId) return false;
      const t = (action.type || "").toLowerCase();
      // treat common exit indications as exit
      return (
        t.includes("book profit") ||
        t.includes("bookprofit") ||
        t.includes("stoploss") ||
        t.includes("stoploss hit") ||
        t.includes("exit")
      );
    });
  };

  // Use slice state as source of truth for form fields
  const selectedTrade =
    tradeForm.selectedTrade ||
    (tradesWithExit && tradesWithExit.length
      ? tradesWithExit[0]
      : trades && trades.length
      ? trades[0]
      : DUMMY_TRADES[0]) ||
    null;
  const yourEntry = tradeForm.yourEntry ?? "";
  const quantity = tradeForm.quantity ?? "";
  const yourExit = tradeForm.yourExit ?? "";

  // Ensure the slice has an initial selectedTrade so inputs remain controlled
  useEffect(() => {
    if (!tradeForm.selectedTrade) {
      const initial =
        tradesWithExit && tradesWithExit.length
          ? tradesWithExit[0]
          : trades && trades.length
          ? trades[0]
          : DUMMY_TRADES[0];
      if (initial) dispatch(setSelectedTrade(initial));
    }
  }, [tradeForm.selectedTrade, dispatch]);

  // When backend trades are loaded, fetch trade actions for each and keep only trades that have an exit action
  useEffect(() => {
    let mounted = true;
    const loadActionsAndFilter = async () => {
      if (!trades || !trades.length) {
        setTradesWithExit([]);
        return;
      }

      try {
        // Dispatch fetchTradeActions for all trades and wait for results
        const fetches = trades.map((t) =>
          dispatch(fetchTradeActions(t._id || t.id))
        );

        const results = await Promise.all(fetches);

        // helper to detect exit in actions payload
        const hasExitIn = (actionsArr) => {
          if (!actionsArr || !actionsArr.length) return false;
          return actionsArr.some((action) => {
            const t = (action.type || "").toLowerCase();
            return (
              t.includes("book profit") ||
              t.includes("bookprofit") ||
              t.includes("stoploss") ||
              t.includes("stoploss hit") ||
              t.includes("exit")
            );
          });
        };

        const withExit = trades.filter((t, idx) => {
          const res = results[idx];
          if (!res) return false;
          // if fulfilled and payload is array
          if (
            res.type &&
            res.type.endsWith("/fulfilled") &&
            Array.isArray(res.payload)
          ) {
            return hasExitIn(res.payload);
          }
          // fallback: check global tradeActions state for exit action
          return !!getTradeExitAction(t._id || t.id);
        });

        if (mounted) setTradesWithExit(withExit);
      } catch (err) {
        console.error("Error prefetching trade actions:", err);
      }
    };

    loadActionsAndFilter();

    return () => {
      mounted = false;
    };
  }, [trades, dispatch]);
  const [log, setLog] = useState([
    // Dummy logged trades for initial view
    {
      id: "L-001",
      tradeTitle: DUMMY_TRADES[0].title,
      action: DUMMY_TRADES[0].trade_action,
      entry: 280.5,
      exit: 436.0,
      quantity: 30, // 2 lots
      pnl: 4665.0,
      result: "Profit",
      date: "Oct 3, 2025",
    },
    {
      id: "L-002",
      tradeTitle: DUMMY_TRADES[5]?.title || "VBL",
      action: DUMMY_TRADES[5]?.trade_action || "Buy",
      entry: 485.0,
      exit: 460.0,
      quantity: 100,
      pnl: -2500.0,
      result: "Loss",
      date: "Sep 27, 2025",
    },
  ]);

  // Function to handle form submission and P&L calculation
  // submit handler: find partial match, ensure exit action exists, calculate pnl and persist
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTrade || !yourEntry || !quantity || !yourExit) {
      alert("Please fill all fields.");
      return;
    }

    // If auth state is still resolving, prevent submission
    if (authLoading) {
      alert(
        "Authentication is in progress. Please wait a moment and try again."
      );
      return;
    }

    // find best match from backend trades by partial title match
    const selectedTitle = (
      selectedTrade.title ||
      selectedTrade.trade_title ||
      ""
    ).toLowerCase();
    const backendTrades = trades && trades.length ? trades : DUMMY_TRADES;
    const found = backendTrades.find((t) => {
      const tTitle = (t.title || t.trade_title || "").toLowerCase();
      return (
        (selectedTitle && tTitle.includes(selectedTitle)) ||
        (tTitle && selectedTitle.includes(tTitle)) ||
        tTitle === selectedTitle
      );
    });

    // update matchedTrade local state for UI
    setMatchedTrade(found || null);

    let exitAction = null;
    try {
      if (found && (found._id || found.id)) {
        // fetch latest trade actions for that trade from backend
        // wait for fetch to complete so tradeActions state is populated
        // dispatch returns a promise - use unwrap if available
        // note: not using unwrap to keep compatibility
        // but we'll await the dispatch anyway
        // eslint-disable-next-line no-unused-vars
        await dispatch(fetchTradeActions(found._id || found.id));

        // find exit action in the populated tradeActions array
        exitAction = getTradeExitAction(found._id || found.id);
      }
    } catch (err) {
      console.error("Error fetching trade actions:", err);
    }

    if (!exitAction) {
      alert(
        "No exit action found for the selected recommendation. Cannot auto-log without an exit from backend."
      );
      return;
    }

    // parse numeric values
    const entry = parseFloat(yourEntry);
    const exit = parseFloat(yourExit);
    const qty = parseInt(quantity, 10);
    const action = (
      selectedTrade.trade_action ||
      selectedTrade.action ||
      "Buy"
    ).toLowerCase();

    const multiplier =
      action.includes("buy") || action.includes("long") ? 1 : -1;
    const rawPnl = (exit - entry) * qty * multiplier;
    const pnl = parseFloat(rawPnl.toFixed(2));
    const result = pnl >= 0 ? "Profit" : "Loss";

    // --- DEBUGGING ---
    // Log the user object and the derived ID right before the check.
    console.log("Inside handleSubmit, user object is:", user);
    console.log("Inside handleSubmit, attempting to get user._id:", user?._id);

    // Get the user ID directly from the Redux state.
    const currentUserId = user?._id;

    if (!currentUserId) {
      alert("Please log in to save trade logs.");
      return;
    }

    // recommended values from backend trade + exit action
    const recommendedEntry =
      found?.entry_price ?? found?.entryPrice ?? found?.entry ?? null;
    const recommendedExit =
      exitAction?.price ?? exitAction?.exit_price ?? exitAction?.value ?? null;

    const newLogEntry = {
      // keep a local id until backend responds
      id: `L-${Date.now()}`,
      user_id: currentUserId,
      trade_id: found?._id ?? found?.id ?? null,
      tradeTitle: selectedTrade.title || selectedTrade.trade_title || "",
      matchedTradeId: found?._id ?? found?.id ?? null,
      matchedTradeTitle: found?.title || found?.trade_title || null,
      action: selectedTrade.trade_action || selectedTrade.action || "",
      recommendedEntry: recommendedEntry,
      recommendedExit: recommendedExit,
      entry,
      exit,
      quantity: qty,
      pnl,
      result,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setLog((prev) => [newLogEntry, ...prev]);

    // persist to backend using tradeLogSlice thunk
    try {
      const payloadForBackend = {
        user_id: currentUserId,
        trade_id: newLogEntry.trade_id,
        trade_title: newLogEntry.tradeTitle,
        action: newLogEntry.action,
        recommended_entry: newLogEntry.recommendedEntry,
        recommended_exit: newLogEntry.recommendedExit,
        entry: newLogEntry.entry,
        exit: newLogEntry.exit,
        quantity: newLogEntry.quantity,
        pnl: newLogEntry.pnl,
        result: newLogEntry.result,
        matched_trade_title: newLogEntry.matchedTradeTitle,
        date: new Date().toISOString(),
      };

      // dispatch async thunk to save to backend and update tradeLogSlice
      const res = await dispatch(addTradeDiaryEntry(payloadForBackend));
      // if the thunk returned payload in res.payload, it will already be added to tradeLogSlice

      // also persist to userTradeFormSlice loggedTrades for local history
      dispatch(addTradeLog(newLogEntry));
      dispatch(resetTradeForm());

      alert("Trade logged successfully!");
    } catch (error) {
      console.error("Trade log error details:", error);
      alert("Failed to log trade: " + (error.message || "Unknown error"));
      return;
    }
  };

  return (
    <div className="rai-module-content p-3">
      <div className="d-flex  justify-content-between mb-4">
        <h4 className="" style={{ fontWeight: "600" }}>
          Trade Diary & P&L Log
        </h4>
        {/* Filter Modal */}
        <Link
          to="/customer/dashboard"
          className="d-flex align-items-center justify-content-center text-dark 
             bg-white border rounded-pill shadow-sm"
          style={{ width: "36px", height: "36px" }}
        >
          <X size={20} />
        </Link>
      </div>
      <div className="row">
        {/* --- 1. Trade Logging Form --- */}
        <div className="col-lg-5 mb-4">
          <div className="rai-card card p-4 shadow-sm border-info h-100">
            <h5 className="mb-3 text-info d-flex align-items-center">
              <ClipboardCheck size={20} className="me-2" /> Log Your Execution
            </h5>

            <form onSubmit={handleSubmit}>
              {/* Trade Selector */}
              <div className="mb-3">
                <label
                  htmlFor="tradeSelect"
                  className="form-label fw-bold small text-muted"
                >
                  Select Recommendation
                </label>
                <select
                  id="tradeSelect"
                  className="form-select"
                  value={
                    selectedTrade ? selectedTrade._id || selectedTrade.id : ""
                  }
                  onChange={(e) => {
                    const tradeId = e.target.value;
                    // prefer tradesWithExit, then trades, then dummy
                    const tradeObj =
                      (tradesWithExit || []).find(
                        (t) => String(t._id || t.id) === String(tradeId)
                      ) ||
                      (trades || []).find(
                        (t) => String(t._id || t.id) === String(tradeId)
                      ) ||
                      DUMMY_TRADES.find(
                        (t) => String(t.id) === String(tradeId)
                      ) ||
                      null;
                    dispatch(setSelectedTrade(tradeObj));
                  }}
                  required
                >
                  <option value="">Select a recommendation...</option>
                  {(tradesWithExit && tradesWithExit.length
                    ? tradesWithExit
                    : trades && trades.length
                    ? trades
                    : DUMMY_TRADES
                  ).map((trade) => {
                    // Compose title as [action] on [on] if available, else fallback
                    const action = trade.trade_action || trade.action || "";
                    const on = trade.on || "";
                    const title = on
                      ? `[${action}] on ${on}`
                      : `[${action}] ${trade.title || trade.trade_title}`;
                    return (
                      <option
                        key={trade._id || trade.id}
                        value={trade._id || trade.id}
                      >
                        {title} (Rec. Entry:{" "}
                        {trade.entry_price ?? trade.entry ?? trade.entryPrice})
                      </option>
                    );
                  })}
                </select>
                {/* {selectedTrade && (
                                    <p className="small text-primary mt-1">
                                        Action: **{selectedTrade?.trade_action || selectedTrade?.action}** | Lot Size: **{selectedTrade?.lot_size || selectedTrade?.lotSize}** ({selectedTrade?.trade_segment || selectedTrade?.segment})
                                    </p>
                                )} */}
              </div>

              {/* Entry Price */}
              <div className="mb-3">
                <label
                  htmlFor="yourEntry"
                  className="form-label fw-bold small text-muted"
                >
                  Your Entry Price (Actual)
                </label>
                <input
                  type="number"
                  id="yourEntry"
                  className="form-control"
                  step="0.01"
                  placeholder="e.g., 278.50"
                  value={yourEntry}
                  onChange={(e) =>
                    dispatch(
                      setTradeFormField({
                        field: "yourEntry",
                        value: e.target.value,
                      })
                    )
                  }
                  required
                />
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label
                  htmlFor="quantity"
                  className="form-label fw-bold small text-muted"
                >
                  Quantity / Lots Executed
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  min="1"
                  placeholder="e.g., 30 (2 lots of 15)"
                  value={quantity}
                  onChange={(e) =>
                    dispatch(
                      setTradeFormField({
                        field: "quantity",
                        value: e.target.value,
                      })
                    )
                  }
                  required
                />
              </div>

              {/* Exit Price */}
              <div className="mb-3">
                <label
                  htmlFor="yourExit"
                  className="form-label fw-bold small text-muted"
                >
                  Your Exit Price (Actual)
                </label>
                <input
                  type="number"
                  id="yourExit"
                  className="form-control"
                  step="0.01"
                  placeholder="e.g., 436.00"
                  value={yourExit}
                  onChange={(e) =>
                    dispatch(
                      setTradeFormField({
                        field: "yourExit",
                        value: e.target.value,
                      })
                    )
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Calculate & Log Trade
              </button>
            </form>
          </div>
        </div>

        {/* --- 2. Performance Summary Chart Placeholder --- */}
        <div className="col-lg-7 mb-4">
          <div className="rai-card card p-4 shadow-sm h-100">
            <h5 className="mb-3 text-secondary d-flex align-items-center">
              <TrendingUp size={20} className="me-2" /> Performance Summary
            </h5>
            <div className="d-flex justify-content-around text-center mb-4">
              <div className="p-3 bg-success-subtle rounded-3 w-40">
                <p className="small text-success mb-1 fw-bold">Total Profit</p>
                <h4 className="text-success mb-0">
                  ₹
                  {log
                    .filter((l) => l.result === "Profit")
                    .reduce((sum, l) => sum + l.pnl, 0)
                    .toLocaleString()}
                </h4>
              </div>
              <div className="p-3 bg-danger-subtle rounded-3 w-40">
                <p className="small text-danger mb-1 fw-bold">Total Loss</p>
                <h4 className="text-danger mb-0">
                  ₹
                  {Math.abs(
                    log
                      .filter((l) => l.result === "Loss")
                      .reduce((sum, l) => sum + l.pnl, 0)
                  ).toLocaleString()}
                </h4>
              </div>
            </div>
            <div
              className="p-4 bg-light text-center border rounded"
              style={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p className="text-muted small mb-0">
                [Chart Placeholder: Monthly P&L Curve / Equity Curve]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. P&L Log Table --- */}
      <h5 className="mb-3 mt-4 text-primary">
        Trade Log ({log.length} Entries)
      </h5>
      <div className="table-responsive rai-card card shadow-sm p-3">
        <table className="table table-striped table-hover mb-0 small">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Trade Title</th>
              <th>Action</th>
              <th>Entry (₹)</th>
              <th>Your Entry (₹)</th>
              <th>Exit (₹)</th>
              <th>Your Exit (₹)</th>
              <th>Qty</th>
              <th>P&L (₹)</th>
              <th>Result</th>
            </tr>
          </thead>

          <tbody>
            {log.map((entry, index) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td className="fw-bold">
                  {entry.tradeTitle}
                  {entry.matchedTradeId && (
                    <small className="d-block text-muted">
                      Matched: {entry.matchedTradeTitle}
                    </small>
                  )}
                </td>
                <td>
                  <span
                    className={`badge ${
                      entry.action.toLowerCase().includes("buy") ||
                      entry.action.toLowerCase().includes("long")
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {entry.action}
                  </span>
                </td>
                <td>
                  {entry.recommendedEntry
                    ? Number(entry.recommendedEntry).toFixed(2)
                    : "-"}
                </td>
                <td>
                  {entry.entry != null ? Number(entry.entry).toFixed(2) : "-"}
                </td>
                <td>
                  {entry.recommendedExit
                    ? Number(entry.recommendedExit).toFixed(2)
                    : "-"}
                </td>
                <td>
                  {entry.exit != null ? Number(entry.exit).toFixed(2) : "-"}
                </td>
                <td>{entry.quantity}</td>
                <td
                  className={`fw-bold ${
                    entry.result === "Profit" ? "text-success" : "text-danger"
                  }`}
                >
                  {entry.pnl.toLocaleString()}
                </td>
                <td>
                  <span
                    className={`badge ${
                      entry.result === "Profit"
                        ? "bg-success-subtle text-success"
                        : "bg-danger-subtle text-danger"
                    }`}
                  >
                    {entry.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Footer for totals */}
          <tfoot className="table-light">
            <tr>
              <td colSpan="7" className="text-end fw-bold">
                Total:
              </td>
              <td className="fw-bold">120</td> {/* total qty */}
              <td className="fw-bold text-success">+ ₹25,450</td>{" "}
              {/* total pnl */}
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TradeDiary;
