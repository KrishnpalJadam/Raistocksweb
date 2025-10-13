// TradeSetup.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, DollarSign, Zap, LineChart, X } from 'lucide-react';

const TradeSetup = () => {
    const aggregatedFeed = [
        {
            module: "Market Insight",
            title: "FII/DII Cash Flow",
            value: "FII: -₹1,583 Cr | DII: +₹490 Cr",
            comment: "DII support offsets FII selling. Indicates domestic resilience.",
            date: "Oct 3, 2025",
            icon: DollarSign,
            color: "#0d6efd"
        },
        {
            module: "Market Phase",
            title: "Greed / Euphoria Phase",
            value: "CAUTION SIGNAL",
            comment: "Market is showing Greed. High risk of sharp correction, keep exposure limited.",
            date: "Oct 4, 2025",
            icon: Zap,
            color: "#dc3545"
        },
        {
            module: "Market Trend",
            title: "Bullish (Short-term struggle)",
            value: "Primary Up | Secondary Sideways",
            comment: "Overall trend is UP, but momentum stalling near resistance (Nifty 25,000).",
            date: "Oct 4, 2025",
            icon: LineChart,
            color: "#ffc107"
        },
        {
            module: "Market Setup",
            title: "Key Resistance Alert",
            value: "25,000 – 25,050",
            comment: "Critical breakout zone. Trades above this level are aggressive.",
            date: "Oct 4, 2025",
            icon: Target,
            color: "#dc3545"
        },
        {
            module: "Market Setup",
            title: "Retest Successful",
            value: "Midcap Index (42,100)",
            comment: "Successful retest confirms mid-cap strength. Potential for rotational buying.",
            date: "Oct 4, 2025",
            icon: TrendingUp,
            color: "#198754"
        },
        {
            module: "Market Insight",
            title: "US Fed Rate Cut",
            value: "25 bps → 4.00%–4.25%",
            comment: "Liquidity boost globally, but cautious forward guidance. Neutral to supportive.",
            date: "Sep 17, 2025",
            icon: DollarSign,
            color: "#0d6efd"
        },
    ];

    const FeedCard = ({ module, title, value, comment, date, icon: Icon, color }) => (
        <div  className='card'
            style={{ 
                border: "1px solid #e9ecef", 
                borderLeft: `4px solid ${color}`, 
                borderRadius: "6px", 
                background: "#fff", 
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                marginBottom: "16px"
            }}
        >
            <div style={{ padding: "12px" }}>
                {/* Header Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div 
                            style={{ 
                                background: `${color}20`, 
                                borderRadius: "50%", 
                                padding: "6px", 
                                marginRight: "8px" 
                            }}
                        >
                            <Icon size={16} color={color} />
                        </div>
                        <h6 style={{ margin: 0, fontSize: "14px", color: "#212529" }}>{title}</h6>
                    </div>
                    <span className='cardmode' style={{ fontSize: "11px", color: "#6c757d", background: "#f8f9fa", padding: "2px 6px", borderRadius: "4px" }}>
                        {module}
                    </span>
                </div>

                {/* Value */}
                <p style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: 600, color }}>{value}</p>

                {/* Comment */}
                <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#495057" }}>{comment}</p>

                {/* Date */}
                <p style={{ margin: 0, fontSize: "11px", color: "#6c757d", textAlign: "right" }}>{date}</p>
            </div>
        </div>
    );

    return (
        <div style={{ padding: "20px" }}>
           

            <div className="d-flex  justify-content-between mb-4">
                <h4 className="" style={{ fontWeight: "600" }}>  Trade Setup Feed</h4>
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
            <p style={{ fontSize: "12px", color: "#6c757d", marginBottom: "20px" }}>
                Aggregated and prioritized view from Market Insight, Market Phase, Market Trend & Market Setup.
            </p>

            <div className="row">
                {aggregatedFeed.map((item, i) => (
                    <div key={i} className="col-12 col-md-6 col-lg-4">
                        <FeedCard {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TradeSetup;
