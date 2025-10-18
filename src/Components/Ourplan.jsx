import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SubscribeModal from './SubscribeModal';
import { useLocation } from 'react-router-dom';


// --- Investor Plans ---
const investorPlans = [

  {
    id: 1,
    title: 'Professional',
    duration: 'Monthly',
    price: '2,299',
    effectivePrice: '2,299',
    effectivePeriod: 'per month',
    isPopular: false,
    buttonClass: 'btn-primary',
    features: [
      
      '1-4* actionable ideas every market week',
      'Swing Trades – Hold for weeks to months with precise entry/exit logic',
      'Investment Ideas – Long-term picks with strong fundamentals',
      'F&O for portfolio hedging (Minimum 8 calls per month)',
    ],
    services: [
      'Delivered via WhatsApp for faster execution',
      'Personal Dashboard',
      'Real-time tracking of all active and closed trades',
      'Access to performance reports and allocation summaries',
      'A personalized Trade Diary to record and review each idea',
      'All your trades are trackable, ensuring full transparency and control',
      'Monthly performance report',
    ],
   
  },


  {
    id: 2,
    title: 'Enterprise',
    duration: 'Quarterly',
    price: '4,999',
    effectivePrice: '1,667',
    effectivePeriod: ' per month',
    isPopular: true,
    buttonClass: 'btn-popular',
    features: [
      
      '1-4* actionable ideas every market week',
      'Swing Trades – Hold for weeks to months with precise entry/exit logic',
      'Investment Ideas – Long-term picks with strong fundamentals',
      'F&O for portfolio hedging (Minimum 8 calls per month)',
    ],
    services: [
      'Delivered via WhatsApp for faster execution',
      'Personal Dashboard',
      'Real-time tracking of all active and closed trades',
      'Access to performance reports and allocation summaries',
      'A personalized Trade Diary to record and review each idea',
      'All your trades are trackable, ensuring full transparency and control',
      'Monthly performance report',
    ],
   
  },
  {
    id: 3,
    title: 'Ultimate',
    duration: 'Yearly',
    price: '12,999',
    effectivePrice: '1,084',
    effectivePeriod: 'per month',
    isPopular: false,
    buttonClass: 'btn-primary',
    features: [
     
      '1-4* actionable ideas every market week',
      'Swing Trades – Hold for weeks to months with precise entry/exit logic',
      'Investment Ideas – Long-term picks with strong fundamentals',
      'F&O for portfolio hedging (Minimum 8 calls per month)',
    ],
    services: [
      'Delivered via WhatsApp for faster execution',
      'Personal Dashboard',
      'Real-time tracking of all active and closed trades',
      'Access to performance reports and allocation summaries',
      'A personalized Trade Diary to record and review each idea',
      'All your trades are trackable, ensuring full transparency and control',
      'Monthly performance report',
    ],
    yearlyBenefits: [
      'Research Recommendation',
      'Model portfolio',
    ],
  },
];

// --- Trader Plans ---
const traderPlans = [
  {
    id: 1,
    title: 'Professional',
    duration: 'Monthly',
    price: '4,999',
    effectivePrice: '4,999',
    effectivePeriod: ' per month',
    isPopular: false,
    buttonClass: 'btn-primary',
    features: [
      '1 – 4 actionable ideas every market day*',
      'Scalp Trades – Quickfire momentum opportunities',
      'Intraday Trades – Precision-based daily setups',
      'Swing Trades – Hold for days/weeks with defined risk levels',
      'Investment Ideas – Long-term fundamental picks',
      'Strategic Positions – Based on macro & sentiment analysis',
      'Income-Generating Ideas – Designed for passive returns (Minimum 24 calls per month)',
    ],
    services: [
      'Delivered via WhatsApp for faster execution',
      'Personal Dashboard',
      'Real-time tracking of all active and closed trades',
      'Access to performance reports and allocation summaries',
      'A personalized Trade Diary to record and review each idea',
      'All your trades are trackable, ensuring full transparency and control',
      'Monthly performance report',
    ],
    yearlyBenefits: [
      'Research Recommendation',
      'Model portfolio',
    ],
  },
  {
    id: 2,
    title: 'Enterprise',
    duration: 'Quarterly',
    price: '11,999',
    effectivePrice: '3,999',
    effectivePeriod: ' per month',
    isPopular: true,
    buttonClass: 'btn-popular',
    features: [
      '1 – 4 actionable ideas every market day*',
      'Scalp Trades – Quickfire momentum opportunities',
      'Intraday Trades – Precision-based daily setups',
      'Swing Trades – Hold for days/weeks with defined risk levels',
      'Investment Ideas – Long-term fundamental picks',
      'Strategic Positions – Based on macro & sentiment analysis',
      'Income-Generating Ideas – Designed for passive returns (Minimum 24 calls per month)',
    ],
    services: [
      'Delivered via WhatsApp for faster execution',
      'Personal Dashboard',
      'Real-time tracking of all active and closed trades',
      'Access to performance reports and allocation summaries',
      'A personalized Trade Diary to record and review each idea',
      'All your trades are trackable, ensuring full transparency and control',
      'Monthly performance report',
    ],
    yearlyBenefits: [
      'Research Recommendation',
      'Model portfolio',
    ],
  },
  {
    id: 3,
    title: 'Ultimate',
    duration: 'Yearly',
    price: '35,999',
    effectivePrice: '2,999',
    effectivePeriod: ' per month',
    isPopular: false,
    buttonClass: 'btn-primary',
    features: [
      '1 – 4 actionable ideas every market day*',
      'Scalp Trades – Quickfire momentum opportunities',
      'Intraday Trades – Precision-based daily setups',
      'Swing Trades – Hold for days/weeks with defined risk levels',
      'Investment Ideas – Long-term fundamental picks',
      'Strategic Positions – Based on macro & sentiment analysis',
      'Income-Generating Ideas – Designed for passive returns (Minimum 24 calls per month)',
    ],
    services: [
      'Delivered via WhatsApp for faster execution',
      'Personal Dashboard',
      'Real-time tracking of all active and closed trades',
      'Access to performance reports and allocation summaries',
      'A personalized Trade Diary to record and review each idea',
      'All your trades are trackable, ensuring full transparency and control',
      'Monthly performance report',
    ],
    yearlyBenefits: [
      'Research Recommendation',
      'Model portfolio',
    ],
  },
];

// --- Trial Plan (hidden by default) ---
const trialPlan = [
  {
    id: 1,
    duration: "15 Days",
    price: "999",
    isPopular: false,
    buttonClass: "btn-primary",
    features: [
      // --- Features ---
      "1 – 4 actionable ideas every market day*",
      "Scalp Trades – Quickfire momentum opportunities",
      "Intraday Trades – Precision-based daily setups",
      "Swing Trades – Hold for days/weeks with defined risk levels",
      "Investment Ideas – Long-term fundamental picks",
      "Strategic Positions – Based on macro & sentiment analysis",
      "Income-Generating Ideas – Designed for passive returns",


    ],
    services: [
      // --- Services ---
      "Delivered via WhatsApp for faster execution",
      "Personal Dashboard access",
      "Real-time tracking of all active and closed trades",
      "Performance reports and allocation summaries",
      "Personalized Trade Diary to record and review each idea",
      "All trades are trackable ensuring full transparency and control",
      "End-of-trial performance report",
    ]

  },
];


 

// --- Pricing Card Component ---
const PricingCard = ({ plan, onSubscribe }) => (
  <div className={`pricing-card-container ${plan.isPopular ? 'popular-card' : ''}`}>
    {plan.isPopular && <div className="popular-tag">MOST POPULAR</div>}

    <div className="card-header">
      <h3 className="card-title">{plan.duration}</h3>
    </div>

    <div className="card-price-block">
      <div className="main-price-display">
        <span className="text-2xl font-bold">₹</span>
        {plan.price}
      </div>
      <p className="price-gst">(including GST)</p>
      {plan.effectivePrice && (
        <p className="effective-price">
          <span className="text-sm">₹</span>
          {plan.effectivePrice} {plan.effectivePeriod}
        </p>
      )}

    </div>

    <div className="card-cta-group">
      <button
        className={`btn-cta w-full ${plan.buttonClass}`}
        onClick={onSubscribe}
      >
        Subscribe Now
      </button>
    </div>

    <div className="card-features">
      <span className='fw-bold fs-5'>Fetures</span>
      <ul className="feature-list mb-3">
        {plan.features?.map((feature, index) => (
          <li key={index} className="feature-item ">
            <Check className="feature-icon" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* ✅ Render Services only if available */}
      {plan.services && (
        <>
          <span className="fw-bold fs-5 ">Services</span>
          <ul className="feature-list mt-3">
            {plan.services.map((service, index) => (
              <li key={index} className="feature-item">
                <Check className="feature-icon" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  </div>
);

// --- Main Component ---
const Ourplan = () => {
  const location = useLocation();
  const [activeSegment, setActiveSegment] = useState('Investor');
  const [showTrialOnly, setShowTrialOnly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null); // moved inside


  useEffect(() => {
    // 🔹 If navigated from Start Trial button
    if (location.state?.showTrial) {
      setActiveSegment('Trial');
      setShowTrialOnly(true);
    }
  }, [location.state]);

  const currentPlans =
    activeSegment === 'Trader'
      ? traderPlans
      : activeSegment === 'Trial'
        ? trialPlan
        : investorPlans;

  const [isModalOpen, setIsModalOpen] = useState(false);

const handleSubscribeClick = (plan) => {
  setSelectedPlan(plan);
  setIsModalOpen(true);
};


  const handleModalSubmit = (data) => {
    console.log('User Data:', data);
    setIsModalOpen(false);
  };

  return (
    <div className={`ourplan-wrapper ${showTrialOnly ? 'trial-mode' : ''}`}>
      <div className="content-container p-5">

        {/* 🔹 Hide the switch when showing only Trial */}
        {!showTrialOnly && (
          <div className="segment-switch-group p-3">
            <div className="segment-switch">
              <button
                onClick={() => setActiveSegment('Trader')}
                className={`segment-button ${activeSegment === 'Trader' ? 'active' : ''}`}
              >
                Trader
              </button>
              <button
                onClick={() => setActiveSegment('Investor')}
                className={`segment-button ms-3 ${activeSegment === 'Investor' ? 'active' : ''}`}
              >
                Investor
              </button>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div
          className="pricing-grid"
          style={
            showTrialOnly
              ? { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }
              : {}
          }
        >
          {currentPlans.map((plan) => (
     <PricingCard
  key={plan.id}
  plan={plan}
  onSubscribe={() => handleSubscribeClick(plan)}
/>


          ))}
        </div>

<SubscribeModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleModalSubmit}
  selectedPlan={selectedPlan}
/>

      </div>
    </div>
  );
};

export default Ourplan;
          onSubmit={handleModalSubmit}
