// ModelPortfolio.jsx
import React, { useState } from 'react';
import { PieChart, Zap, Target, TrendingUp, X } from 'lucide-react';

// NOTE: Ensure your rai-dashboard.css includes the necessary utility classes.

// --- DUMMY ALLOCATION DATA (Total Allocation should sum to 100%) ---
const dummyAllocation = [
    {
        id: 1,
        asset: "Large Cap Equity (Core)",
        ticker: "Nifty 50 Index",
        percentage: 40,
        color: '#007bff', // Blue
        comment: "Strategic long-term exposure to market leaders for stability.",
    },
    {
        id: 2,
        asset: "Mid Cap Equity (Growth)",
        ticker: "Nifty Midcap 100",
        percentage: 25,
        color: '#198754', // Green
        comment: "Targeting high-growth segments with slightly higher risk profile.",
    },
    {
        id: 3,
        asset: "Fixed Income / Debt",
        ticker: "Short Duration Funds",
        percentage: 20,
        color: '#ffc107', // Yellow/Warning (Fixed Income is defensive)
        comment: "Capital preservation and stability against equity volatility.",
    },
    {
        id: 4,
        asset: "Cash & Cash Equivalents",
        ticker: "Liquid Funds / Savings",
        percentage: 10,
        color: '#6c757d', // Gray/Muted
        comment: "Dry powder for capitalizing on market corrections (Accumulation phase).",
    },
    {
        id: 5,
        asset: "Commodities (Gold/Silver)",
        ticker: "ETF/Sovereign Bonds",
        percentage: 5,
        color: '#dc3545', // Red (Inflation Hedge)
        comment: "Inflation hedge and diversification against systemic risk.",
    },
];

// --- Sub-Component: Allocation Visualizer (CSS Bars) ---
const AllocationVisualizer = ({ allocationData }) => {
    return (
        <div className="p-3 border rounded mb-4 bg-light">
            <h5 className="mb-3 text-secondary">Current Allocation Snapshot</h5>
            <div className="d-flex w-100 rai-allocation-bar-container rounded overflow-hidden shadow-sm">
                {allocationData.map((item, index) => (
                    <div
                        key={item.id}
                        style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                            height: '25px',
                            textAlign: 'center',
                            color: item.percentage > 10 ? '#fff' : item.color, // Text color contrast
                            fontWeight: 'bold',
                            fontSize: '12px',
                            lineHeight: '25px',
                            // Optional: Add a subtle separator if needed
                            borderRight: index < allocationData.length - 1 ? '1px solid #ffffff30' : 'none'
                        }}
                        title={`${item.asset}: ${item.percentage}%`}
                    >
                        {item.percentage}%
                    </div>
                ))}
            </div>
            {/* Legend */}
            <div className="d-flex flex-wrap gap-3 mt-3">
                {allocationData.map(item => (
                    <span key={item.id} className="small text-muted d-flex align-items-center">
                        <span style={{ 
                            display: 'inline-block', 
                            width: '10px', 
                            height: '10px', 
                            backgroundColor: item.color, 
                            borderRadius: '50%',
                            marginRight: '5px'
                        }}></span>
                        {item.asset}
                    </span>
                ))}
            </div>
        </div>
    );
};

// --- Sub-Component: Allocation Modal ---
const AllocationModal = ({ show, onClose, allocationData }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content p-4" style={{ maxWidth: '900px' }}>
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <h4 className="fw-bold text-primary d-flex align-items-center">
                        <PieChart size={24} className="me-2 text-info"/> Model Portfolio Allocation (Beta)
                    </h4>
                    <button className="btn btn-light rounded-circle shadow-sm" onClick={onClose} style={{ width: "32px", height: "32px" }}>
                        <X size={18} />
                    </button>
                </div>
                
                {/* Visualizer */}
                <AllocationVisualizer allocationData={allocationData} />

                {/* Allocation Cards */}
                <h5 className="mb-3 text-secondary">Detailed Holdings</h5>
                <div className="row">
                    {allocationData.map(item => (
                        <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="rai-card card p-3 h-100" style={{ borderLeft: `4px solid ${item.color}` }}>
                                <div className="card-body p-0">
                                    <h6 className="card-title fw-bold mb-1" style={{ color: item.color }}>
                                        {item.asset}
                                    </h6>
                                    <p className="h3 fw-bolder mb-2" style={{ color: item.color }}>
                                        {item.percentage}%
                                    </p>
                                    <p className="text-muted small mb-1">Benchmark: {item.ticker}</p>
                                    <p className="card-text small">{item.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="alert alert-warning mt-4 small">
                    <Zap size={16} className="me-1" />
                    **Disclaimer:** This allocation serves as a guideline. Actual implementation must be customized based on your risk tolerance and financial goals.
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
const ModelPortfolio = () => {
    const [showModal, setShowModal] = useState(false);

    // Calculate total percentage for validation (for display purposes)
    const totalPercentage = dummyAllocation.reduce((sum, item) => sum + item.percentage, 0);

    return (
        <div className="rai-module-content p-3">
            <h2 className="border-bottom pb-2 mb-4 text-primary">Model Portfolio</h2>

            <div className="rai-card card p-4 text-center border-primary shadow-sm">
                <div className="card-body">
                    <PieChart size={36} className="text-primary mb-3 mx-auto" />
                    <h5 className="card-title fw-bold">View Recommended Asset Allocation</h5>
                    <p className="card-text text-muted">
                        See the ideal mix of Equity, Debt, and other assets. (Total Allocated: **{totalPercentage}%**)
                    </p>
                    
                    <button 
                        className="btn btn-primary mt-3 d-flex align-items-center justify-content-center mx-auto"
                        onClick={() => setShowModal(true)}
                    >
                        <Target size={18} className="me-2" /> Open Allocation Tool (Beta Mode)
                    </button>
                </div>
            </div>

            <AllocationModal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                allocationData={dummyAllocation} 
            />
        </div>
    );
};

export default ModelPortfolio;