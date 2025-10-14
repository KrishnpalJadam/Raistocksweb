// ResearchReport.jsx
import React, { useEffect } from "react";
import { FileText, Download, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResearchReports,
  deleteResearchReport,
} from "../slices/researchReportSlice";

const ResearchReport = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector(
    (state) => state.researchReports
  );

  useEffect(() => {
    dispatch(fetchResearchReports());
  }, [dispatch]);

  const getIconColor = (type) => {
    switch (type) {
      case "Sectoral":
        return "#007bff";
      case "Earnings":
        return "#198754";
      case "Stock Specific":
        return "#ffc107";
      case "Macro":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="rai-module-content p-3">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="" style={{ fontWeight: "600" }}>
          Investment Research Reports
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

      <p className="text-muted small mb-4">
        Access the latest research reports, deep dives, and long-term investment
        ideas from our desk.
      </p>

      {loading && <p>Loading reports...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="list-group">
        {reports.length === 0 && !loading && (
          <p className="text-muted small">No reports available.</p>
        )}
{Array.isArray(reports) &&
  reports.map((report) => (
          <div
            key={report._id}
            className="list-group-item repot list-group-item-action d-flex justify-content-between align-items-center rai-report-item"
          >
            <div className="d-flex align-items-center">
              <div
                className="rai-icon-bg me-3"
                style={{
                  backgroundColor: `${getIconColor(report.type)}15`,
                  minWidth: "40px",
                  height: "40px",
                  borderRadius: "8px",
                }}
              >
                <FileText size={20} color={getIconColor(report.type)} />
              </div>

              <div>
                <h5 className="mb-0 fw-bold" style={{ fontSize: "1rem" }}>
                  {report.title}
                </h5>
                <p className="text-muted mb-0 small">
                  {report.fileName} (Research Report)
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center flex-shrink-0">
              <div className="text-end me-4 d-none d-md-block">
                <span className="d-block small text-muted">
                  Date: {new Date(report.createdAt).toLocaleDateString()}
                </span>
                <span className="d-block small text-muted">
                  Type: {report.fileType?.split("/")[1]?.toUpperCase()}
                </span>
              </div>

              <a
                href={`http://localhost:5000/api/research-reports/download/${report._id}`}
                className="btn btn-primary btn-sm d-flex align-items-center"
                target="_blank"
                rel="noopener noreferrer"
                download={report.fileName}
              >
                <Download size={16} className="me-1" /> Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchReport;
