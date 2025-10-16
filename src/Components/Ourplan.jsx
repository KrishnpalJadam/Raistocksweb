import React, { useState } from 'react';
import { Check } from 'lucide-react';

// --- Investor Plans ---
const investorPlans = [
  {
    id: 1,
    title: 'Professional',
    duration: 'Monthly',
    price: '2,299',
    oldPrice: '2,299',
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
    oldPrice: '7,497',
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
    oldPrice: '27,588',
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

// --- Trader Plans (price changed only) ---
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

// --- Pricing Card Component ---
const PricingCard = ({ plan }) => (
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
      <p className="effective-price">
        <span className="text-sm">₹</span>
        {plan.effectivePrice} {plan.effectivePeriod}
      </p>
    </div>

    <div className="card-cta-group">
      <button className={`btn-cta w-full ${plan.buttonClass}`}>Subscribe Now</button>
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
  const [activeSegment, setActiveSegment] = useState('Investor');

  // dynamically choose plan set
  const currentPlans = activeSegment === 'Trader' ? traderPlans : investorPlans;

  return (
    <div className="ourplan-wrapper">
      <div className="content-container p-5">
        {/* Segment Switch */}
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

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {currentPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ourplan;
