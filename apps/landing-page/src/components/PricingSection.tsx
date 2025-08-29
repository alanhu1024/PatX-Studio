"use client";

import React from "react";

const PRICING = {
  monthly: {
    free: { name: "Free Trial", price: 0, includedCharts: 3, overage: null },
    starter: { name: "Starter", price: 59, includedCharts: 10, overage: 1 },
  },
  perUse: {
    quick: { name: "Quick Chart", price: 29 },
  },
};

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50 scroll-mt-21">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. All plans include our core patent comparison features with flexible pricing for different usage patterns.
          </p>
        </div>

        {/* Main Pricing Options */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <PriceCard
              title={PRICING.monthly.free.name}
              price="Free"
              bullets={[
                "3 charts to try our platform",
                "Excel export (basic template)",
                "No credit card required",
              ]}
              cta="Start Free Trial"
            />
            <PriceCard
              title={PRICING.monthly.starter.name}
              price={`$${PRICING.monthly.starter.price}/month`}
              bullets={[
                `10 charts included ($${PRICING.monthly.starter.price/10}/chart)`,
                "Excel export (basic template)",
                "Perfect for occasional use",
              ]}
              cta="Start with Starter"
              highlight
            />
            <QuickChartCard
              title={PRICING.perUse.quick.name}
              price={`$${PRICING.perUse.quick.price}/chart`}
              bullets={[
                "Patent upload & analysis",
                "Element-by-element comparison",
                "Excel export (basic template)",
              ]}
              cta="Buy One Chart"
            />
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600 max-w-4xl mx-auto">
            * Billing details: One chart typically covers 1 independent claim × 1 comparison object. 
            Dependent claims are displayed by default. Same-object re-analysis within 24 hours is free. 
            Prices exclude applicable taxes.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Price Card Component */
function PriceCard({
  title,
  price,
  bullets,
  cta,
  highlight,
  isFree,
}: {
  title: string;
  price: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
  isFree?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col h-96 relative transition-all duration-200 ${
        highlight 
          ? "border-blue-500 ring-2 ring-blue-100 shadow-xl bg-gradient-to-br from-blue-50 to-white scale-105 transform" 
          : isFree 
          ? "border-green-500 ring-2 ring-green-100 shadow-sm bg-white" 
          : "border-gray-200 shadow-sm bg-white hover:shadow-md"
      }`}
    >
      {highlight && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg className="w-3 h-3 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Recommended
          </div>
        </div>
      )}
      {!highlight && (
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      )}
      <div className={`text-3xl font-bold mb-6 ${highlight ? "text-blue-700 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent" : "text-gray-900"}`}>{price}</div>
      <ul className="space-y-3 mb-8 flex-1">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-600">{bullet}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 mt-auto ${
          highlight
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105"
            : isFree
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

/** Quick Chart Card Component - Independent Style */
function QuickChartCard({
  title,
  price,
  bullets,
  cta,
}: {
  title: string;
  price: string;
  bullets: string[];
  cta: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-orange-300 p-6 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden flex flex-col h-96">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-200 rounded-full translate-y-8 -translate-x-8 opacity-30"></div>
      
      {/* Badge */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
          Pay-per-use
        </div>
      </div>
      
      <div className="text-3xl font-bold text-orange-600 mb-6">{price}</div>
      <ul className="space-y-3 mb-8 flex-1">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start">
            <svg
              className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">{bullet}</span>
          </li>
        ))}
      </ul>
      <button className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-105 shadow-lg mt-auto">
        {cta}
      </button>
    </div>
  );
}