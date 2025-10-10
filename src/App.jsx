import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Home from "./Components/Home";
import Header from "./Layout/Header";
import Login from "./auth/Login";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Userpanel/Dashboard";
import TradeRecommendation from "./Userpanel/TradeRecommendation";
import MarketInsight from "./Userpanel/MarketInsight";
import MarketPhase from "./Userpanel/MarketPhase";
import MarketTrend from "./Userpanel/MarketTrend";
import MarketSetup from "./Userpanel/MarketSetup";
import TradeSetup from "./Userpanel/TradeSetup";
import TradeStrategy from "./Userpanel/TradeStrategy";
import ResearchReport from "./Userpanel/ResearchReport";
import ModelPortfolio from "./Userpanel/ModelPortfolio";
import TradeDiary from "./Userpanel/TradeDiary";
import Footer from "./Layout/Footer";

const AppWrapper = () => {
  const location = useLocation();

  // Conditions
  const isAuthRoute = location.pathname === "/login";
  const isCustomerRoute = location.pathname.startsWith("/customer/");

  return (
    <>
      {/* Header Website me hi show karega */}
      {!isAuthRoute && !isCustomerRoute && <Header />}

      <Routes>
        {/* Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Customer Panel */}
        <Route path="/customer/*" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="trade-recommendation" element={<TradeRecommendation />} />
          <Route path="market-insight" element={<MarketInsight />} />
          <Route path="market-phase" element={<MarketPhase />} />
          <Route path="market-trend" element={<MarketTrend />} />
          <Route path="market-setup" element={<MarketSetup />} />
          <Route path="trade-setup" element={<TradeSetup />} />
          <Route path="trade-strategy" element={<TradeStrategy />} />

          <Route path="research-report" element={<ResearchReport />} />
          <Route path="model-portfolio" element={<ModelPortfolio />} />
          <Route path="trade-diary" element={<TradeDiary />} />
        </Route>

      </Routes>
      
       {!isAuthRoute && !isCustomerRoute && <Footer/>}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
