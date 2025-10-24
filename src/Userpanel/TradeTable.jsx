import React from "react";

const TradeTable = ({ title, data = [], isLive = false, onRowClick }) => {
  // Status color function
  const getStatusClass = (status) => {
    switch (status) {
      case "Live":
        return "bg-primary"; // blue
      case "Closed in profit":
        return "bg-success"; // green
      case "Closed in loss":
        return "bg-danger"; // red
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="card rai-dashboard-card p-3 p-md-4 mb-3">
      <h5 className="fw-semibold text-secondary mb-3">{title}</h5>

      <div className="rai-dashboard-table-container table-responsive">
        <table className="table table-striped table-hover align-middle text-nowrap">
          <thead className="table-light">
            <tr>
              <th style={{ minWidth: 100 }}>Date</th>
              <th style={{ minWidth: 120 }}>Segment</th>
              <th style={{ minWidth: 100 }}>Trade Type</th>
              <th style={{ minWidth: 100 }}>Action</th>
              <th style={{ minWidth: 120 }}>Stock/Index</th>
              <th style={{ minWidth: 100 }}>Entry</th>
              {isLive ? (
                <th style={{ minWidth: 150 }}>Target(s)</th>
              ) : (
                <th style={{ minWidth: 100 }}>Exit</th>
              )}
              <th style={{ minWidth: 100 }}>Stoploss</th>
              <th style={{ minWidth: 120 }}>Duration</th>
              <th style={{ minWidth: 200 }}>Weightage</th>
              <th style={{ minWidth: 100 }}>Lot Size</th>
              <th style={{ minWidth: 150 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => (
              <tr
                key={t.id}
                style={{ cursor: "pointer" }}
                onClick={() => onRowClick && onRowClick(t)} // row click handler
              >
                <td className="text-muted">
                  {new Date(t.recommendationDateTime).toLocaleDateString()}
                </td>
                <td className="fw-medium">{t.segment}</td>
                <td>{t.tradeType}</td>
                <td>
                  <span
                    className={`badge ${
                      t.action === "Buy" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {t.action}
                  </span>
                </td>
                <td className="text-truncate" style={{ maxWidth: 180 }}>
                  {t.on}
                </td>
                <td>₹{t.entryPrice}</td>
                <td>
                  {isLive
                    ? `₹${t.target1}, ₹${t.target2}, ₹${t.target3}`
                    : `₹${t.exitPrice || "-"}`}
                </td>
                <td>₹{t.stoploss}</td>
                <td>{t.timeDuration}</td>
                <td className="text-wrap" style={{ maxWidth: 220 }}>
                  {t.weightageValue}
                  {t.weightageExtension}
                </td>
                <td>
                  {t.lotSize} {t.lots > 1 ? `(${t.lots} lots)` : ""}
                </td>
                <td>
                  <span
                    className={`rai-dashboard-status-tag badge ${getStatusClass(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="alert alert-info text-center mt-3 mb-0">
          No records found.
        </div>
      )}
    </div>
  );
};

export default TradeTable;
