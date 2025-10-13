// ResearchReport.jsx
import React from 'react';
import { FileText, Download, TrendingUp, DollarSign, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// NOTE: Ensure your rai-dashboard.css includes the necessary utility classes.

const ResearchReport = () => {
    // --- DUMMY RESEARCH REPORT DATA ---
    const dummyReports = [
        {
            id: 1,
            title: "Sector Deep Dive: The Indian Auto Ancillary Sector (Q3 FY26)",
            filename: "AutoAncillary_Q3FY26_DeepDive.pdf",
            date: "October 1, 2025",
            size: "1.2 MB",
            type: "Sectoral",
            link: "/reports/auto_ancillary_report.pdf" // Dummy PDF link
        },
        {
            id: 2,
            title: "Q2 Earnings Preview: Banking and Financial Services",
            filename: "Q2_Banking_Preview.pdf",
            date: "September 28, 2025",
            size: "750 KB",
            type: "Earnings",
            link: "/reports/q2_banking_preview.pdf"
        },
        {
            id: 3,
            title: "Long Term Idea: Power Grid Corporation of India Ltd. (Buy)",
            filename: "POWERGRID_LongTerm_Idea.pdf",
            date: "September 25, 2025",
            size: "450 KB",
            type: "Stock Specific",
            link: "/reports/powergrid_report.pdf"
        },
        {
            id: 4,
            title: "Commodity Outlook: Crude Oil and Gold Price Projections",
            filename: "Commodity_Outlook_Q4_FY26.pdf",
            date: "September 20, 2025",
            size: "980 KB",
            type: "Macro",
            link: "/reports/commodity_outlook.pdf"
        },
    ];

    const getIconColor = (type) => {
        switch (type) {
            case 'Sectoral': return '#007bff'; // Blue
            case 'Earnings': return '#198754'; // Green
            case 'Stock Specific': return '#ffc107'; // Yellow
            case 'Macro': return '#dc3545'; // Red
            default: return '#6c757d';
        }
    };

    return (
        <div className="rai-module-content p-3">
         
            <div className="d-flex  justify-content-between mb-4">
                <h4 className="" style={{ fontWeight: "600" }}>Investment Research Reports</h4>
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
            <p className="text-muted small mb-4">
                Access the latest research reports, deep dives, and long-term investment ideas from our desk.
            </p>

            <div className="list-group ">
                {dummyReports.map((report) => (
                    <div 
                        key={report.id} 
                        className="list-group-item repot list-group-item-action d-flex justify-content-between align-items-center rai-report-item"
                    >
                        <div className="d-flex align-items-center">
                            {/* File Icon with Category Color */}
                            <div className="rai-icon-bg me-3" style={{ 
                                backgroundColor: `${getIconColor(report.type)}15`,
                                minWidth: '40px', 
                                height: '40px',
                                borderRadius: '8px'
                            }}>
                                <FileText size={20} color={getIconColor(report.type)} />
                            </div>

                            <div>
                                {/* Report Title and Filename */}
                                <h5 className="mb-0 fw-bold" style={{ fontSize: '1rem' }}>{report.title}</h5>
                                <p className="text-muted mb-0 small">{report.filename} ({(report.type)} Report)</p>
                            </div>
                        </div>

                        {/* Metadata and Download Button */}
                        <div className="d-flex align-items-center flex-shrink-0">
                            <div className="text-end me-4 d-none d-md-block">
                                <span className="d-block small text-muted">Date: {report.date}</span>
                                <span className="d-block small text-muted">Size: {report.size}</span>
                            </div>
                            
                            <a 
                                href={report.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary btn-sm d-flex align-items-center"
                                download={report.filename} // Optional: forces download
                            >
                                <Download size={16} className="me-1" /> Open/Download
                            </a>
                        </div>
                    </div>
                ))}
            </div>

           
        </div>
    );
};

export default ResearchReport;