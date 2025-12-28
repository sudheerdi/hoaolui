"use client";

import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import { useState } from "react";

const pricingPlans = [
  {
    category: "Self HOA Board-Governed Associations",
    tiers: [
      { units: "0-25", costPerUnit: "$39.00", total: "$39.00" },
      { units: "26-50", costPerUnit: "$0.65", total: "$65" },
      { units: "50-100", costPerUnit: "$1.00", total: "$100" },
      { units: "100-200", costPerUnit: "$2.00", total: "$100" },
      { units: "200-300", costPerUnit: "$3.00", total: "$210" },
      {
        units: "Above 300",
        costPerUnit: "",
        total: "$250 (Unit per Price is 0.6)",
      },
    ],
    features: [
      "Homeowners & Residents Management",
      "Tenants & Occupants Tracking",
      "Admin Users & Roles",
      "Custom Request Forms",
      "Approval Workflows",
      "Violations Management",
      "Document Storage: 100GB",
      "Text, Email & Voice Alerts",
      "Community Forums",
      "Surveys & Voting",
      "USPS First-Class Mail: $1.35/letter",
      "USPS Standard Mail: $1.15/letter",
      "Mailed Check Service: $2.25/check",
      "Assessment Billing: Unlimited",
      "ACH Payments: $2.50",
      "Credit/Debit Payments: 3.5% + $0.50",
      "Lockbox Service: $2.50",
      "Reports & Analytics",
      "Report Packets",
      "Custom Chart of Accounts",
      "Bank Reconciliation",
      "Bank Connections",
      "Vendor Document Storage: 100 docs",
      "Bookkeeping Add-On: $219/mo",
      "HOA Tax Filing (1120-H): $399/filing",
      "1099 Filing: $20/form",
      "Vendor Directory",
      "Managed Payables",
      "Payable Approvals",
      "Vendor Digital Payments",
      "Customer Support",
      "Onboarding Assistance",
      "Training",
      "Data Migration",
    ],
  },
  {
    category: "Property Management Company",
    monthlyPerUnit: "$250",
    perUnit: "$0.5",
    features: [
      "All Self HOA Board features included",
      "Multi-property management",
      "Advanced reporting & analytics",
      "Priority customer support",
      "Dedicated account manager",
      "Custom integrations available",
    ],
  },
];

export default function PricingPage() {
  const [expandedCard1, setExpandedCard1] = useState(false);
  const [expandedCard2, setExpandedCard2] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Pricing Tables - Side by Side */}
      <section className="pt-16 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Self HOA Board Pricing */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col">
              <div
                className="px-8 py-5"
                style={{
                  background: "linear-gradient(to right, #1FA372, #17865d)",
                }}
              >
                <h2 className="text-2xl font-bold text-white">
                  Self HOA Board-Governed Associations
                </h2>
                <p className="mt-1 text-sm" style={{ color: "#E8F5F0" }}>
                  Pricing based on number of units
                </p>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                {/* Pricing Table */}
                <div className="overflow-x-auto mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-green-50">
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-900">
                          Units
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-900">
                          Cost Per Unit
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-900">
                          Monthly Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pricingPlans[0].tiers.map((tier, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-2 text-gray-900 font-medium text-xs">
                            {tier.units}
                          </td>
                          <td className="px-4 py-2 text-gray-700 text-xs">
                            {tier.costPerUnit}
                          </td>
                          <td
                            className="px-4 py-2 font-bold text-xs"
                            style={{ color: "#1FA372" }}
                          >
                            {tier.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Features List */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Included Features
                  </h3>

                  {/* Read More Button */}
                  <button
                    onClick={() => setExpandedCard1(!expandedCard1)}
                    className="text-sm font-semibold mb-3 whitespace-nowrap cursor-pointer hover:underline"
                    style={{ color: "#1FA372" }}
                  >
                    {expandedCard1 ? "Show Less" : "Read More"}
                  </button>

                  {/* All features - Collapsible */}
                  {expandedCard1 && (
                    <div className="grid grid-cols-1 gap-2">
                      {pricingPlans[0].features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <i
                            className="ri-check-line text-base mr-2 flex-shrink-0 mt-0.5"
                            style={{ color: "#1FA372" }}
                          ></i>
                          <span className="text-gray-700 text-xs">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="mt-4 text-center">
                  <a
                    href="/signup/hoa-board"
                    className="inline-block text-white py-2.5 px-8 rounded-lg font-bold text-sm hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
                    style={{ backgroundColor: "#1FA372" }}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* Property Management Company Pricing */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5">
                <h2 className="text-2xl font-bold text-white">
                  Property Management Company
                </h2>
                <p className="text-blue-100 mt-1 text-sm">
                  Professional management solutions
                </p>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                {/* Pricing Info */}
                <div className="bg-blue-50 rounded-xl p-5 mb-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-gray-600 mb-1 text-xs">Starts from</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {pricingPlans[1].monthlyPerUnit}
                      </p>
                      <p className="text-gray-600 mt-1 text-xs">
                        Monthly per unit
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 mb-1 text-xs">
                        Per Unit Cost
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {pricingPlans[1].perUnit}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Everything in Self HOA Board, plus:
                  </h3>

                  {/* Read More Button */}
                  <button
                    onClick={() => setExpandedCard2(!expandedCard2)}
                    className="text-sm font-semibold mb-3 whitespace-nowrap cursor-pointer hover:underline text-blue-600"
                  >
                    {expandedCard2 ? "Show Less" : "Read More"}
                  </button>

                  {/* All features - Collapsible */}
                  {expandedCard2 && (
                    <div className="grid grid-cols-1 gap-2 mb-4">
                      {pricingPlans[1].features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <i className="ri-check-line text-blue-600 text-base mr-2 flex-shrink-0 mt-0.5"></i>
                          <span className="text-gray-700 font-medium text-xs">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="mt-auto text-center">
                  <a
                    href="/signup/property-manager"
                    className="inline-block bg-blue-600 text-white py-2.5 px-8 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
