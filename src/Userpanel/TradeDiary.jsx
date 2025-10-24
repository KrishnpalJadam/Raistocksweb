import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  X,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import { fetchTrades } from "../slices/tradeSlice";
import { fetchTradeActions } from "../slices/tradeActionsSlice";
import {
  setTradeFormField,
  setSelectedTrade,
  addTradeLog,
  resetTradeForm,
} from "../slices/userTradeFormSlice";
import {
  addTradeDiaryEntry,
  fetchTradeDiaryEntries,
} from "../slices/tradeLogSlice";

const TradeDiary = () => {
  const dispatch = useDispatch();
  const { trades } = useSelector((state) => state.trades);
  const { actions: tradeActions } = useSelector((state) => state.tradeActions);
  const { client: user, loading: authLoading } = useSelector(
    (state) => state.clientAuth
  );
  const diaryLogs = useSelector((state) => state.tradeLogs.logs || []);
  const tradeForm = useSelector((state) => state.userTradeForm.tradeForm || {});

  const [tradesWithExit, setTradesWithExit] = useState([]);

  // ✅ Fetch trades + actions + logs
  useEffect(() => {
    if (user?._id || user?.id) {
      dispatch(fetchTrades());
      dispatch(fetchTradeActions()); // fetch ALL actions once
      dispatch(fetchTradeDiaryEntries(user._id || user.id));
    }
  }, [dispatch, user?._id, user?.id]);

  // Filter trades that have an exit action
  useEffect(() => {
    if (!trades.length || !tradeActions.length) return;

    const exitTrades = trades.filter((trade) => {
      const tradeId = trade._id || trade.id;
      const relatedActions = tradeActions.filter(
        (a) =>
          a.tradeId === tradeId ||
          a.trade_id === tradeId ||
          a.related_trade === tradeId
      );
      // Only look for exit actions
      return relatedActions.some((a) => {
        const t = (a.type || "").toLowerCase();
        return t.includes("exit");
      });
    });

    setTradesWithExit(exitTrades);
  }, [trades, tradeActions]);

  const selectedTrade =
    tradeForm.selectedTrade ||
    (tradesWithExit.length ? tradesWithExit[0] : null);

  const yourEntry = tradeForm.yourEntry ?? "";
  const yourExit = tradeForm.yourExit ?? "";
  const quantity = tradeForm.quantity ?? "";

  useEffect(() => {
    if (!selectedTrade && tradesWithExit.length) {
      dispatch(setSelectedTrade(tradesWithExit[0]));
    }
  }, [selectedTrade, tradesWithExit, dispatch]);

  const getExitActionForTrade = (tradeId) => {
    return tradeActions.find((a) => {
      const matches =
        a.tradeId === tradeId ||
        a.trade_id === tradeId ||
        a.related_trade === tradeId;
      if (!matches) return false;
      const type = (a.type || "").toLowerCase();
      // Focus on exit actions only
      return type.includes("exit");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrade || !yourEntry || !yourExit || !quantity) {
      alert("Please fill all fields.");
      return;
    }

    if (authLoading) {
      alert("Authentication in progress. Please wait...");
      return;
    }

    const userId = user?._id || user?.id;
    if (!userId) {
      alert("Please log in to save your trade.");
      return;
    }

    const entry = parseFloat(yourEntry);
    const exit = parseFloat(yourExit);
    const qty = parseInt(quantity, 10);
    const pnl = parseFloat(((exit - entry) * qty).toFixed(2));
    const result = pnl >= 0 ? "Profit" : "Loss";

    const exitAction = getExitActionForTrade(selectedTrade._id || selectedTrade.id);
    const recommendedExit =
      exitAction?.price ||
      exitAction?.exit_price ||
      selectedTrade.exit_price ||
      null;

    const newLog = {
      trade_id: selectedTrade._id || selectedTrade.id,
      tradeTitle: selectedTrade.title || selectedTrade.trade_title,
      action:
        selectedTrade.trade_action ||
        selectedTrade.action ||
        "N/A",
      recommendedEntry:
        selectedTrade.entry_price ||
        selectedTrade.entry ||
        selectedTrade.entryPrice,
      recommendedExit,
      entry,
      exit,
      quantity: qty,
      pnl,
      result,
      date: new Date().toISOString(),
    };

    try {
      await dispatch(
        addTradeDiaryEntry({
          user_id: userId,
          trade_id: newLog.trade_id,
          trade_title: newLog.tradeTitle,
          recommended_entry: newLog.recommendedEntry,
          recommended_exit: newLog.recommendedExit,
          entry: newLog.entry,
          exit: newLog.exit,
          quantity: newLog.quantity,
          pnl: newLog.pnl,
          result: newLog.result,
          action: newLog.action,
          date: newLog.date,
        })
      );

      dispatch(addTradeLog(newLog));
      dispatch(resetTradeForm());
      alert("Trade logged successfully!");
    } catch (err) {
      console.error("Failed to log trade:", err);
      alert("Failed to log trade: " + (err.message || "Unknown error"));
    }
  };

  const totalPnL = diaryLogs.reduce((sum, l) => sum + (Number(l.pnl) || 0), 0);
  const totalProfit = diaryLogs
    .filter((l) => l.pnl >= 0)
    .reduce((s, l) => s + l.pnl, 0);
  const totalLoss = diaryLogs
    .filter((l) => l.pnl < 0)
    .reduce((s, l) => s + l.pnl, 0);

  return (
    <div className="rai-module-content p-3">
      <div className="d-flex justify-content-between mb-4">
        <h4 style={{ fontWeight: 600 }}>Trade Diary & P&L Log</h4>
        <Link
          to="/customer/dashboard"
          className="d-flex align-items-center justify-content-center text-dark bg-white border rounded-pill shadow-sm"
          style={{ width: 36, height: 36 }}
        >
          <X size={20} />
        </Link>
      </div>

      <div className="row">
        {/* --- Trade Form --- */}
        <div className="col-lg-5 mb-4">
          <div className="card p-4 shadow-sm border-info h-100">
            <h5 className="mb-3 text-info d-flex align-items-center">
              <ClipboardCheck size={20} className="me-2" /> Log Your Execution
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  Select Recommendation (with Exit)
                </label>
                <select
                  className="form-select"
                  value={selectedTrade?._id || selectedTrade?.id || ""}
                  onChange={(e) => {
                    const id = e.target.value;
                    const trade =
                      tradesWithExit.find(
                        (t) => String(t._id || t.id) === String(id)
                      ) || null;
                    dispatch(setSelectedTrade(trade));
                  }}
                  required
                >
                  <option value="">Select a recommendation...</option>
                  {tradesWithExit.map((trade) => {
                    const exitAction = getExitActionForTrade(
                      trade._id || trade.id
                    );
                    return (
                      <option
                        key={trade._id || trade.id}
                        value={trade._id || trade.id}
                      >
                        [{trade.trade_action}] {trade.title} (Rec. Entry:{" "}
                        {trade.entry_price}) | Exit:{" "}
                        {exitAction?.price || exitAction?.exit_price || "-"}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  Your Entry Price (Actual)
                </label>
                <input
                  type="number"
                  className="form-control"
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

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  Quantity / Lots
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
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

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  Your Exit Price (Actual)
                </label>
                <input
                  type="number"
                  className="form-control"
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

              <button className="btn btn-primary w-100 mt-2" type="submit">
                Calculate & Log Trade
              </button>
            </form>
          </div>
        </div>

        {/* --- Performance Summary --- */}
        <div className="col-lg-7 mb-4">
          <div className="card p-4 shadow-sm h-100">
            <h5 className="mb-3 text-secondary d-flex align-items-center">
              <TrendingUp size={20} className="me-2" /> Performance Summary
            </h5>

            <div className="d-flex justify-content-around text-center mb-4">
              <div className="p-3 bg-success-subtle rounded-3 w-40">
                <p className="small text-success mb-1 fw-bold">Total Profit</p>
                <h4 className="text-success mb-0">
                  ₹{totalProfit.toLocaleString()}
                </h4>
              </div>
              <div className="p-3 bg-danger-subtle rounded-3 w-40">
                <p className="small text-danger mb-1 fw-bold">Total Loss</p>
                <h4 className="text-danger mb-0">
                  ₹{Math.abs(totalLoss).toLocaleString()}
                </h4>
              </div>
            </div>

            <div
              className="p-4 bg-light text-center border rounded"
              style={{ height: 200 }}
            >
              <p className="text-muted small mb-0">
                [Chart Placeholder: Monthly P&L Curve]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Log Table --- */}
      <h5 className="mb-3 mt-4 text-primary">
        Trade Log ({diaryLogs.length} Entries)
      </h5>

      <div className="table-responsive card shadow-sm p-3">
        <table className="table table-striped table-hover mb-0 small">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Trade Title</th>
              <th>Action</th>
              <th>Rec. Entry</th>
              <th>Your Entry</th>
              <th>Rec. Exit</th>
              <th>Your Exit</th>
              <th>Qty</th>
              <th>P&L (₹)</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {diaryLogs.map((entry, i) => (
              <tr key={entry._id || entry.id || i}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.tradeTitle}</td>
                <td>{entry.action}</td>
                <td>{entry.recommendedEntry ?? "-"}</td>
                <td>{entry.entry ?? "-"}</td>
                <td>{entry.recommendedExit ?? "-"}</td>
                <td>{entry.exit ?? "-"}</td>
                <td>{entry.quantity}</td>
                <td
                  className={`fw-bold ${
                    entry.result === "Profit"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {entry.pnl.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>
                <td>{entry.result}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-light">
            <tr>
              <td colSpan="7" className="text-end fw-bold">
                Total:
              </td>
              <td className="fw-bold">
                {diaryLogs.reduce(
                  (s, l) => s + (Number(l.quantity) || 0),
                  0
                )}
              </td>
              <td
                className={`fw-bold ${
                  totalPnL >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {totalPnL.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TradeDiary;
