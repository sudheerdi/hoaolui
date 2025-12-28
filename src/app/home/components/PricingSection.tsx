import { useState } from 'react';
import Button from '../../../components/base/Button';
import Card from '../../../components/base/Card';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small communities',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        'Up to 50 units',
        'Payment processing',
        'Basic reporting',
        'Email support',
        'Mobile app access'
      ],
      popular: false
    },
    {
      name: 'Standard',
      description: 'Most popular for growing communities',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Up to 200 units',
        'All Basic features',
        'Violation management',
        'Document storage',
        'Priority support',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Pro',
      description: 'Advanced features for large communities',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        'Unlimited units',
        'All Standard features',
        'Advanced analytics',
        'API access',
        'Dedicated support',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your community size and needs
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer`}
              style={{ backgroundColor: isYearly ? '#1FA372' : '#e5e7eb' }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative text-center ${plan.popular ? 'scale-105' : ''}`}
              style={plan.popular ? { border: '2px solid #1FA372' } : {}}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="text-white px-4 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#1FA372' }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </div>
                <div className="text-gray-500">
                  per {isYearly ? 'year' : 'month'}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 flex items-center justify-center text-green-600">
                      <i className="ri-check-line"></i>
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? 'primary' : 'outline'} 
                className="w-full"
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom solution for your enterprise community?
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
}
