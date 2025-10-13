// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LineChart, Layers, TrendingUp, Settings, GanttChart,
  Sigma, Zap, NotebookText, Wallet, CalendarDays, ChevronRight
} from 'lucide-react';

const modules = [
  { name: "Market Insight", Icon: LineChart, path: "/customer/market-insight" },
  { name: "Market Phase", Icon: Layers, path: "/customer/market-phase" },
  { name: "Market Trend", Icon: TrendingUp, path: "/customer/market-trend" },
  { name: "Market Setup", Icon: Settings, path: "/customer/market-setup" },
  { name: "Trade Setup", Icon: GanttChart, path: "/customer/trade-setup" },
  { name: "Trade Strategy", Icon: Sigma, path: "/customer/trade-strategy" },
  { name: "Trade Recommendation", Icon: Zap, path: "/customer/trade-recommendation" },
  { name: "Research Report", Icon: NotebookText, path: "/customer/research-report" },
  { name: "Model Portfolio", Icon: Wallet, path: "/customer/model-portfolio" },
  { name: "Trade Diary", Icon: CalendarDays, path: "/customer/trade-diary" },
];

const Sidebar = ({ collapsed, isMobileVisible, onCloseMobile }) => {


  const wrapperClass = `rai-dashboard-sidebar ${collapsed ? 'collapsed' : 'expanded'} ${isMobileVisible ? 'visible' : ''}`;

  const handleClick = () => {
    if (window.innerWidth < 992 && onCloseMobile) onCloseMobile(); // close mobile sidebar after selection
  };

  return (
    <div className='' style={{ paddingTop: "0px" }}>
      <aside className={wrapperClass} aria-label="Sidebar">
        <div>
          <div className="rai-dashboard-modules-title text-dark">{collapsed ? '' : 'Modules'}</div>
          {modules.map((m) => {
        
            return (
              <Link
                key={m.name}
                to={m.path}
                className='rai-dashboard-sidebar-item'
                onClick={handleClick}
                title={m.name}
              >
                <m.Icon size={18} />
                <span className="rai-dashboard-sidebar-label fw-medium">{m.name}</span>
                <ChevronRight size={14} className="ai-dashboard-sidebar-chevron" />
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
