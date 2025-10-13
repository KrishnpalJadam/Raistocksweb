// MarketPhase.jsx
import React from 'react';
import { Aperture, TrendingUp, TrendingDown, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// NOTE: Ensure your rai-dashboard.css includes the styles defined previously.

const MarketPhase = () => {
    // --- DUMMY MARKET PHASE DATA ---
    const marketPhaseData = {
        date: "October 4, 2025",
        title: "Greed/Euphoria", // Selected phase from (Accumulation/Distribution/Greed/Fear)
        icon: TrendingUp,
        comment: "The market is currently in a phase of **Greed**,Focus on profit booking and moving to high-quality.",
        status: 'negative' // Greed is often a warning signal
    };

    const phaseStatusMap = {
        'Greed/Euphoria': { color: '#dc3545', icon: TrendingUp }, // Red for caution in Greed
        'Fear/Panic': { color: '#007bff', icon: TrendingDown }, // Blue for opportunity in Fear
        'Accumulation': { color: '#198754', icon: Aperture }, // Green for strong opportunity
        'Distribution': { color: '#ffc107', icon: Clock }      // Yellow for warning
    };

    const { date, title, comment } = marketPhaseData;
    const phaseInfo = phaseStatusMap[title] || { color: '#6c757d', icon: Clock };
    const Icon = phaseInfo.icon;

    return (
        <div className="rai-module-content p-3">
   
             <div className="d-flex  justify-content-between mb-4">
                <h4 className="" style={{ fontWeight: "600" }}>Market Phase Analysis</h4>
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
            {/* Single Market Phase Card */}
            <div className="row">

          
            <div 
                className="rai-card card  col-12 col-md-6 col-lg-4 p-0" 
                style={{ 
                    borderLeft: `4px solid ${phaseInfo.color}`,
                    borderColor: '#dee2e6' 
                }}
            >
                <div className="card-body">
                    {/* Header: Icon and Title */}
                    <div className="rai-flex-header align-items-center mb-2">
                        <div className="rai-icon-bg me-3 " >
                            <Icon size={24}  />
                        </div>
                        <h4 className="mb-0 fw-bold text-primary" style={{fontSize: "14px"}}>
                            Market Phase: {title}
                        </h4>
                    </div>
                    
                    {/* Comment */}
                    <p className="card-text mb-3 text-muted" style={{fontSize: "13px"}}>
                        {comment}
                    </p>
                    
                    {/* Date */}
                    <p className="rai-date-small mb-0 text-end">
                        *Analysis Date: **{date}***
                    </p>
                </div>
            </div>
              </div>
            {/* Educational context */}
           
        </div>
    );
};

export default MarketPhase;