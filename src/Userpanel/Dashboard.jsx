// DashboardContent.jsx
import TradeTable from './TradeTable';
import React, { useEffect, useRef } from 'react';
import { Target, TrendingUp, DollarSign, Zap, LineChart } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/* Dummy data (same as original) */
const mockRecentTrades = [
    {
        id: 1,
        date: "2025-10-03",
        stock: "TCS",
        indexOption: "NIFTY 20000 CE",
        intraday: "Yes",
        type: "Buy",
        entry: "₹277",
        targets: "344, 384, 436",
        exit: "₹310",
        stoploss: "₹207",
        duration: "Today",
        weightage: "6% of your capital or min. 1 lot",
        lotSize: "30",
        status: "Live",
    },
    {
        id: 2,
        date: "2025-10-02",
        stock: "INFY",
        indexOption: "BANKNIFTY 46000 PE",
        intraday: "No",
        type: "Sell",
        entry: "₹1520",
        targets: "1480, 1455, 1430",
        exit: "₹1455",
        stoploss: "₹1550",
        duration: "2 Days",
        weightage: "4% of your capital",
        lotSize: "25",
        status: "Closed in profit",
    },
    {
        id: 3,
        date: "2025-09-30",
        stock: "RELIANCE",
        indexOption: "NIFTY 19800 CE",
        intraday: "Yes",
        type: "Buy",
        entry: "₹2450",
        targets: "2500, 2540, 2580",
        exit: "₹2400",
        stoploss: "₹2430",
        duration: "Today",
        weightage: "5% of your capital",
        lotSize: "15",
        status: "Closed in loss",
    },

];




const mockLiveTrades = [
    {
        id: 6,
        date: "2025-08-16",
        stock: "SBIN",
        indexOption: "NIFTY 19900 CE",
        intraday: "Yes",
        type: "Buy",
        entry: "₹750.00",
        targets: "₹770, ₹785, ₹790",
        target: "₹790.00", // keeping for backward compatibility
        stoploss: "₹730",
        duration: "Today",
        weightage: "5% of your capital or min. 1 lot",
        lotSize: "25",
        status: "Live",
    },
    {
        id: 7,
        date: "2025-08-16",
        stock: "AXISBANK",
        indexOption: "BANKNIFTY 46200 PE",
        intraday: "No",
        type: "Buy",
        entry: "₹1150.00",
        targets: "₹1180, ₹1190, ₹1200",
        target: "₹1200.00",
        stoploss: "₹1125",
        duration: "2 Days",
        weightage: "4% of your capital",
        lotSize: "30",
        status: "Live",
    },
    {
        id: 8,
        date: "2025-08-15",
        stock: "L&T",
        indexOption: "NIFTY 20000 CE",
        intraday: "Yes",
        type: "Sell",
        entry: "₹3500.00",
        targets: "₹3450, ₹3425, ₹3400",
        target: "₹3400.00",
        stoploss: "₹3550",
        duration: "Today",
        weightage: "6% of your capital or min. 1 lot",
        lotSize: "20",
        status: "Live",
    },
];



/* Module Panel: fly-out from right covering main content */
const ModulePanel = ({ moduleName, onClose }) => {
    const ref = useRef();

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        const onClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [onClose]);

    return (
        <div className="rai-dashboard-panel-overlay">
            <div ref={ref} className="rai-dashboard-panel">
                <button className="rai-dashboard-panel-close btn" onClick={onClose}>Close</button>
                <h4>{moduleName}</h4>
                <p className="text-muted">Module content will be implemented here. Admin inputs, charts, tables as per requirements.</p>
            </div>
        </div>
    );
};

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
       
    ];
 const FeedCard = ({ module, title, value, comment, date, icon: Icon, color }) => (
        <div className='card'
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
const Dashboard = ({ activeModule, setActiveModule }) => {
    // If an actual module other than the default 'Trade Recommendation' selected, show flyout
    const showPanel = activeModule && activeModule !== 'Trade Recommendation';

    return (
        <main className="rai-dashboard-main">
            {!showPanel && (
                <>

                    <div className="d-flex justify-content-end mb-3">
                        <select className="form-select w-auto">
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                            <option>Last 90 Days</option>
                        </select>
                        <DatePicker

                            className="form-control"
                            placeholderText="Start Date"
                            dateFormat="yyyy-MM-dd"
                            isClearable
                        />
                        <span className='me-3 pt-1 ms-3'>To</span>
                        <DatePicker

                            className="form-control"
                            placeholderText="End Date"
                            dateFormat="yyyy-MM-dd"
                            isClearable
                        />
                    </div>

                    <div className="row mb-4">
                        <div className="col-lg-4 col-md-6 mb-3">
                            <div className="card rai-dashboard-card p-3 bg-white">
                                <h6 className="text-muted mb-1">Accuracy (All Trades)</h6>
                                <h3 className="text-success fw-bold">78%</h3>
                                <small className="text-muted">Cash: 85% | F&amp;O: 65%</small>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-3">
                            <div className="card rai-dashboard-card p-3 bg-white">
                                <h6 className="text-muted mb-1">Our Returns (Cash)</h6>
                                <h3 className="text-primary fw-bold">+32%</h3>
                                <small className="text-success">VS Nifty50: +18%</small>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 mb-3">
                            <div className="card rai-dashboard-card p-3 bg-white">
                                <h6 className="text-muted mb-1">Avg. F&amp;O Return / Lot</h6>
                                <h3 className="text-warning fw-bold">₹1,850</h3>
                                <div className="d-flex macpro" >
                                    <small className="text-success">Max Profit Per Lot: 8%</small>
                                    <small className="text-danger">Max Loss Per Lot: 8%</small>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 mb-3">


                            <TradeTable
                                title="Live Trades"
                                data={mockLiveTrades}
                                isLive={true}
                                onRowClick={(trade) => console.log("Clicked trade:", trade)}
                            />
                        </div>

                        <div className="col-12">

                            <TradeTable
                                title="Recent Trades"
                                data={mockRecentTrades}
                                isLive={false}
                                onRowClick={(trade) => alert(`You clicked on ${trade.stock}`)}
                            />
                        </div>
                    </div>

                    <h5 className="mt-4 mb-3">Trade Setup Insight (Posts)</h5>
                   <div className="row">
                {aggregatedFeed.map((item, i) => (
                    <div key={i} className="col-12 col-md-6 col-lg-4">
                        <FeedCard {...item} />
                    </div>
                ))}
            </div>
                </>
            )}

            {showPanel && (
                <ModulePanel moduleName={activeModule} onClose={() => setActiveModule('Trade Recommendation')} />
            )}
        </main>
    );
};

export default Dashboard;
