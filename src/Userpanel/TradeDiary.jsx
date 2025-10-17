

// TradeDiary.jsx
import React, { useState } from 'react';
import { BookOpen, TrendingUp, TrendingDown, ClipboardCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// NOTE: We'll reuse the DUMMY_TRADES list from the TradeRecommendation component
// For simplicity, we'll redefine a subset here. In a real app, this would be imported.
const DUMMY_TRADES = [
  { id: 1, title: "BANKNIFTY 45000 CE (Oct 10 Expiry)", trade_action: "Buy", entry_price: 277.00, lot_size: 15, trade_segment: "Index option" },
  { id: 3, title: "SUN PHARMA LTD.", trade_action: "Buy", entry_price: 1699.00, lot_size: 1, trade_segment: "Cash" },
  { id: 5, title: "HDFC BANK LTD. Future", trade_action: "Sell", entry_price: 1550.00, lot_size: 550, trade_segment: "Stock future" },
  { id: 6, title: "VARUN BEVERAGES LTD. (VBL)", trade_action: "Buy", entry_price: 486.00, lot_size: 1, trade_segment: "Cash" },
];

const TradeDiary = () => {
  const [selectedTrade, setSelectedTrade] = useState(DUMMY_TRADES[0] || null);
  const [yourEntry, setYourEntry] = useState('');
  const [quantity, setQuantity] = useState('');
  const [yourExit, setYourExit] = useState('');
  const [log, setLog] = useState([
    // Dummy logged trades for initial view
    {
      id: 'L-001',
      tradeTitle: DUMMY_TRADES[0].title,
      action: DUMMY_TRADES[0].trade_action,
      entry: 280.50,
      exit: 436.00,
      quantity: 30, // 2 lots
      pnl: 4665.00,
      result: 'Profit',
      date: 'Oct 3, 2025'
    },
    {
      id: 'L-002',
      tradeTitle: DUMMY_TRADES[5]?.title || 'VBL',
      action: DUMMY_TRADES[5]?.trade_action || 'Buy',
      entry: 485.00,
      exit: 460.00,
      quantity: 100,
      pnl: -2500.00,
      result: 'Loss',
      date: 'Sep 27, 2025'
    }
  ]);

  // Function to handle form submission and P&L calculation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTrade || !yourEntry || !quantity || !yourExit) {
      alert("Please fill all fields.");
      return;
    }

    const entry = parseFloat(yourEntry);
    const exit = parseFloat(yourExit);
    const qty = parseInt(quantity);
    const action = selectedTrade.trade_action.toLowerCase();

    // Determine multiplier (1 for Buy/Long, -1 for Sell/Short)
    const multiplier = action.includes('buy') || action.includes('long') ? 1 : -1;

    // P&L Formula: (Exit Price - Entry Price) * Quantity * Multiplier
    // We use the reciprocal for P&L calculation on Sell/Short trades:
    // (Entry - Exit) * Quantity = (Exit - Entry) * Quantity * (-1)
    const rawPnl = (exit - entry) * qty * multiplier;
    const pnl = parseFloat(rawPnl.toFixed(2));
    const result = pnl >= 0 ? 'Profit' : 'Loss';

    const newLogEntry = {
      id: `L-${Date.now()}`,
      tradeTitle: selectedTrade.title,
      action: selectedTrade.trade_action,
      entry,
      exit,
      quantity: qty,
      pnl,
      result,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setLog([newLogEntry, ...log]);

    // Reset form
    setYourEntry('');
    setQuantity('');
    setYourExit('');
  };

  return (
    <div className="rai-module-content p-3">

      <div className="d-flex  justify-content-between mb-4">
        <h4 className="" style={{ fontWeight: "600" }}>Trade Diary & P&L Log</h4>
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
            <h5 className="mb-3 text-info d-flex align-items-center"><ClipboardCheck size={20} className="me-2" /> Log Your Execution</h5>

            <form onSubmit={handleSubmit}>
              {/* Trade Selector */}
              <div className="mb-3">
                <label htmlFor="tradeSelect" className="form-label fw-bold small text-muted">Select Recommendation</label>
                <select
                  id="tradeSelect"
                  className="form-select"
                  value={selectedTrade ? selectedTrade.id : ''}
                  onChange={(e) => {
                    const tradeId = parseInt(e.target.value);
                    setSelectedTrade(DUMMY_TRADES.find(t => t.id === tradeId) || null);
                  }}
                  required
                >
                  {DUMMY_TRADES.map(trade => (
                    <option key={trade.id} value={trade.id}>
                      [{trade.trade_action}] {trade.title} (Rec. Entry: {trade.entry_price})
                    </option>
                  ))}
                </select>
                {/* {selectedTrade && (
                                    <p className="small text-primary mt-1">
                                        Action: **{selectedTrade.trade_action}** | Lot Size: **{selectedTrade.lot_size}** ({selectedTrade.trade_segment})
                                    </p>
                                )} */}
              </div>

              {/* Entry Price */}
              <div className="mb-3">
                <label htmlFor="yourEntry" className="form-label fw-bold small text-muted">Your Entry Price (Actual)</label>
                <input
                  type="number"
                  id="yourEntry"
                  className="form-control"
                  step="0.01"
                  placeholder="e.g., 278.50"
                  value={yourEntry}
                  onChange={(e) => setYourEntry(e.target.value)}
                  required
                />
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label fw-bold small text-muted">Quantity / Lots Executed</label>
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  min="1"
                  placeholder="e.g., 30 (2 lots of 15)"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              {/* Exit Price */}
              <div className="mb-3">
                <label htmlFor="yourExit" className="form-label fw-bold small text-muted">Your Exit Price (Actual)</label>
                <input
                  type="number"
                  id="yourExit"
                  className="form-control"
                  step="0.01"
                  placeholder="e.g., 436.00"
                  value={yourExit}
                  onChange={(e) => setYourExit(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">Calculate & Log Trade</button>
            </form>
          </div>
        </div>

        {/* --- 2. Performance Summary Chart Placeholder --- */}
        <div className="col-lg-7 mb-4">
          <div className="rai-card card p-4 shadow-sm h-100">
            <h5 className="mb-3 text-secondary d-flex align-items-center"><TrendingUp size={20} className="me-2" /> Performance Summary</h5>
            <div className="d-flex justify-content-around text-center mb-4">
              <div className="p-3 bg-success-subtle rounded-3 w-40">

                <p className="small text-success mb-1 fw-bold">Total Profit</p>
                <h4 className="text-success mb-0">₹{log.filter(l => l.result === 'Profit').reduce((sum, l) => sum + l.pnl, 0).toLocaleString()}</h4>
              </div>
              <div className="p-3 bg-danger-subtle rounded-3 w-40">
                <p className="small text-danger mb-1 fw-bold">Total Loss</p>
                <h4 className="text-danger mb-0">₹{Math.abs(log.filter(l => l.result === 'Loss').reduce((sum, l) => sum + l.pnl, 0)).toLocaleString()}</h4>
              </div>
            </div>
            <div className="p-4 bg-light text-center border rounded" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p className="text-muted small mb-0">
                [Chart Placeholder: Monthly P&L Curve / Equity Curve]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. P&L Log Table --- */}
      <h5 className="mb-3 mt-4 text-primary">Trade Log ({log.length} Entries)</h5>
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
                <td className="fw-bold">{entry.tradeTitle}</td>
                <td>
                  <span
                    className={`badge ${entry.action.toLowerCase().includes("buy") ||
                        entry.action.toLowerCase().includes("long")
                        ? "bg-success"
                        : "bg-danger"
                      }`}
                  >
                    {entry.action}
                  </span>
                </td>
                <td>{entry.entry.toFixed(2)}</td>
                <td>{entry.entry.toFixed(2)}</td>
                <td>{entry.exit.toFixed(2)}</td>
                <td>{entry.exit.toFixed(2)}</td>
                <td>{entry.quantity}</td>
                <td
                  className={`fw-bold ${entry.result === "Profit" ? "text-success" : "text-danger"
                    }`}
                >
                  {entry.pnl.toLocaleString()}
                </td>
                <td>
                  <span
                    className={`badge ${entry.result === "Profit"
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
              <td className="fw-bold text-success">+ ₹25,450</td> {/* total pnl */}
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>



    </div>
  );
};

export default TradeDiary;






