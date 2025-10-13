// MarketTrend.jsx
import React from 'react';
import { LineChart, Zap, Skull, TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// NOTE: Ensure your rai-dashboard.css includes the necessary utility classes.

const MarketTrend = () => {
    // --- DUMMY MARKET TREND DATA ---
    const marketTrendData = {
        date: "October 4, 2025",
        title: "Bullish", // Selected trend (Bullish/Bearish/Sideways)
        comment: "The overall trend remains **Bullish** on the weekly and monthly charts, supported by strong ",
        status: 'Bullish' 
    };

    // Color and icon mapping for visual status
    const trendStatusMap = {
        'Bullish': { color: '#198754', icon: TrendingUp }, // Green
        'Bearish': { color: '#dc3545', icon: TrendingDown }, // Red
        'Sideways': { color: '#ffc107', icon: Minus }     // Yellow/Warning
    };

    const { date, title, comment } = marketTrendData;
    const trendInfo = trendStatusMap[title] || { color: '#6c757d', icon: LineChart };
    const Icon = trendInfo.icon;

    return (
        <div className="rai-module-content p-3">
     
              <div className="d-flex  justify-content-between mb-4">
                <h4 className="" style={{ fontWeight: "600" }}>Market Trend Analysis</h4>
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
            {/* Single Market Trend Card */}
            <div 
                className="rai-card card col-12 col-md-6 col-lg-4 p-0 " 
                style={{ 
                    borderLeft: `4px solid ${trendInfo.color}`,
                    borderColor: '#dee2e6' 
                }}
            >
                <div className="card-body">
                    {/* Header: Icon and Title */}
                    <div className="rai-flex-header align-items-center mb-2">
                        <div className="rai-icon-bg me-3">
                            <Icon size={24}  />
                        </div>
                        <h4 className="mb-0 fw-bold text-primary" style={{fontSize: "14px"}}>
                            Trend: {title}
                        </h4>
                    </div>
                    
                    {/* Comment */}
                    <p className="card-text  mb-3 text-muted" style={{fontSize: "13px"}}>
                        {comment}
                    </p>
                    
                    {/* Date */}
                    <p className="rai-date-small mb-0 text-end">
                        *Analysis Date: **{date}***
                    </p>
                </div>
            </div>
            
            {/* Contextual Box - Optional/Advanced View */}
            
        </div>
    );
};

export default MarketTrend;