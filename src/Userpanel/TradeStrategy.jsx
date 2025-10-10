// TradeStrategy.jsx
import React from 'react';
import { Shield, Zap, TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';

// NOTE: Ensure your rai-dashboard.css includes the necessary utility classes.

const TradeStrategy = () => {
    // --- DUMMY STRATEGY DATA ---
    const currentStrategy = {
        title: "Tactical Caution: Range-Bound with Downside Bias",
        comment: "The market is showing consolidation near key resistance (Nifty 25,000) coupled with high fear/greed indices. The strategy shifts from aggressive long accumulation to **tactical shorting** and **defensive profit booking**.",
        themeColor: '#ffc107', // Warning color
        icon: Shield,
    };

    const strategyNotes = [
        {
            id: 1,
            icon: TrendingDown,
            text: "Intraday trades should prioritize **Sell/Short** opportunities around key resistance levels (e.g., Bank Nifty 54,000).",
            color: '#dc3545'
        },
        {
            id: 2,
            icon: Target,
            text: "Reduce target sizes (T1/T2) on long positions. Book **partial profits** quickly as momentum is fading.",
            color: '#198754'
        },
        {
            id: 3,
            icon: Clock,
            text: "Avoid **overnight positions** (BTST/STBT) during expiry weeks and high-volatility sessions.",
            color: '#007bff'
        },
        {
            id: 4,
            icon: Zap,
            text: "Keep **Stop Losses exceptionally tight** on all new derivative positions, especially options.",
            color: '#dc3545'
        },
        {
            id: 5,
            icon: TrendingUp,
            text: "Long-term investors can use any **deep correction (3-5%)** to accumulate quality blue-chip stocks.",
            color: '#198754'
        },
    ];

    return (
        <div className="rai-module-content p-3">
            <h2 className="border-bottom pb-2 mb-4 text-primary">Current Trading Strategy</h2>

            {/* Strategy Card */}
            <div className="rai-card card p-4 mb-4 shadow-sm" style={{ borderLeft: `5px solid ${currentStrategy.themeColor}` }}>
                <div className="d-flex align-items-center mb-3">
                    <div className="rai-icon-bg me-3" style={{ backgroundColor: `${currentStrategy.themeColor}15` }}>
                        <currentStrategy.icon size={24} color={currentStrategy.themeColor} />
                    </div>
                    <h5 className="card-title fw-bold mb-0" style={{ color: currentStrategy.themeColor }}>
                        {currentStrategy.title}
                    </h5>
                </div>
                
                <p className="card-text text-dark">{currentStrategy.comment}</p>
            </div>

            {/* Strategy Notes / Actionable Points */}
            <h5 className="mb-3 text-secondary">Actionable Strategy Notes</h5>
            <ul className="list-group rai-strategy-notes">
                {strategyNotes.map((note) => (
                    <li key={note.id} className="list-group-item d-flex align-items-center">
                        <note.icon size={18} color={note.color} className="me-3 flex-shrink-0" />
                        <span className="small text-dark">{note.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TradeStrategy;