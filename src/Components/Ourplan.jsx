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
      'Everything in Standard +',
      'Blueprint',
      'GPQ',
      'Sales Signals',
      'Inventory management',
      'Webhooks',
      'Assignment rules',
      'Validation rules',
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
      'Everything in Professional +',
      'Zia — AI assistant',
      'Territory management',
      'Custom functions',
      'Journey orchestration',
      'Multi-user portals',
      'Page layouts',
      'Client scripts',
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
      'Everything in Enterprise +',
      'Enhanced feature limits',
      'Custom AI/ML platform',
      'Advanced customization',
      'Data preparation',
      'Augmented analytics',
      'Data storytelling',
      'Unified business insights',
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
      'Everything in Standard +',
      'Blueprint',
      'GPQ',
      'Sales Signals',
      'Inventory management',
      'Webhooks',
      'Assignment rules',
      'Validation rules',
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
      'Everything in Professional +',
      'Zia — AI assistant',
      'Territory management',
      'Custom functions',
      'Journey orchestration',
      'Multi-user portals',
      'Page layouts',
      'Client scripts',
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
      'Everything in Enterprise +',
      'Enhanced feature limits',
      'Custom AI/ML platform',
      'Advanced customization',
      'Data preparation',
      'Augmented analytics',
      'Data storytelling',
      'Unified business insights',
    ],
  },
];

// --- Trial Plan (hidden by default) ---
const trialPlan = [
  {
    id: 1,
    duration: '15 Days',
    price: '999',
    isPopular: false,
    buttonClass: 'btn-primary',
    features: [
      'Everything in Standard +',
      'Blueprint',
      'GPQ',
      'Sales Signals',
      'Inventory management',
      'Webhooks',
      'Assignment rules',
      'Validation rules',
    ],
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
      <ul className="feature-list">
        {plan.features.map((feature, index) => (
          <li key={index} className="feature-item">
            <Check className="feature-icon" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// --- Main Component ---
const Ourplan = () => {
  const location = useLocation();
  const [activeSegment, setActiveSegment] = useState('Investor');
  const [showTrialOnly, setShowTrialOnly] = useState(false);

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

  const handleSubscribeClick = () => {
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
              onSubscribe={handleSubscribeClick}
            />
          ))}
        </div>

        <SubscribeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
};

export default Ourplan;
