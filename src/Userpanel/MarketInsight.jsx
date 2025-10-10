// MarketInsight.jsx
import React from 'react';
import { TrendingUp, DollarSign, Home, IndianRupee, Gavel, Globe, Star, BarChart2, Activity, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const dummyData = [
    {
        title: "FII/DII Cash Flow",
        icon: TrendingUp,
        value: "FII: -₹1,583 Cr | DII: +₹490 Cr",
        comment: "FIIs remain net sellers; DII buying activity continues to provide support.",
        date: "Oct 3, 2025",
        status: 'negative'
    },
    {
        title: "RBI (MPC) Decision",
        icon: IndianRupee,
        value: "Repo Rate: 5.50%",
        comment: "MPC kept rate unchanged and maintained a Neutral stance. Growth forecast revised up.",
        date: "Oct 1, 2025",
        status: 'positive'
    },
    {
        title: "US Fed (FOMC)",
        icon: DollarSign,
        value: "Fed Funds Rate: 4.00%–4.25%",
        comment: "Rate cut by 25 bps. Powell signals cautious approach due to labor market weakness.",
        date: "Sep 17, 2025",
        status: 'positive'
    },
  
   
   
];

// Status map
const statusMap = {
    positive: 'rai-comment-positive',
    negative: 'rai-comment-negative',
    neutral: 'text-muted'
};

const MarketInsightCard = ({ title, icon: Icon, value, comment, date, status }) => {
    const CommentClass = statusMap[status] || 'text-muted';

    return (
        <div className="rai-card card">
            <div className="card-body " style={{padding: "12px"}}>
                <div className="rai-flex-header">
                    <div className="rai-icon-bg me-2">
                        <Icon size={20} color="#007bff" />
                    </div>
                    <div>
                        <h6 className="rai-insight-title mb-0 " style={{fontSize: "14px"}}>{title}</h6>
                    </div>
                </div>

                <p className="rai-insight-value mb-1" style={{fontSize: "14px"}}>{value}</p>

                <p className={`card-text text-muted text-muted ${CommentClass} small`} style={{fontSize: "12px"}}>{comment}</p>

                {date && <p className="rai-date-small mb-0">*As of: {date}</p>}
            </div>
        </div>
    );
};

const MarketInsight = () => {
    return (
        <div className="rai-module-content">

            <div className="d-flex  justify-content-between mb-4">
                <h4 className="" style={{ fontWeight: "600" }}>Market Insight</h4>
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
                {dummyData.map((item, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <MarketInsightCard {...item} />
                    </div>
                ))}
            </div>
            <button className='btn btn-primary mt-4' style={{display: "flex", justifyContent: "center", marginLeft: "auto", marginRight: "auto"}}>Show More </button>
        </div>
    );
};

export default MarketInsight;
