import React from "react";
import TalkToSalesTrigger from "./TalkToSalesTrigger";

export const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="pt-10 md:pt-12 lg:pt-16 pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-transparent to-primary/5 relative over
    flow-hidden scroll-mt-30">
      {/* Floating orbs decoration */}
      <div className="absolute top-32 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="w-full max-w-hero mx-auto px-4 sm:px-6 lg:px-8 relative" style={{maxWidth: '1480px'}}>
        {/* Top spacing for first feature */}
        <div className="h-12 md:h-16 lg:h-20"></div>
        
        {/* Feature 1 - Left Image, Right Text */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center mb-60 md:mb-80 lg:mb-96" style={{ margin: "0 20px" }}>
          {/* Left: PatX AI Engine Processing UI */}
          <div className="relative order-1 md:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground ml-2">PatX AI Engine</span>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="text-lg">⚡</div>
                  <div className="h-3 bg-primary/30 rounded flex-1 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-lg">⏱️</div>
                  <div className="h-3 bg-green-200 rounded flex-1"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-lg">🔍</div>
                  <div className="h-3 bg-blue-200 rounded w-3/4"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-lg">📂</div>
                  <div className="h-3 bg-purple-200 rounded w-4/5"></div>
                </div>
                <div className="mt-8 p-6 bg-primary/10 rounded-lg">
                  <div className="text-xs text-primary font-medium mb-2">Processing Complete - 23 minutes</div>
                  <div className="h-2 bg-primary/40 rounded w-full"></div>
                  <div className="h-2 bg-primary/30 rounded w-4/5 mt-2"></div>
                </div>
              </div>
            </div>
            {/* Floating decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
          </div>
          
          {/* Right: Text Content */}
          <div className="order-2 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-balance">⚡ Beat Deadlines, Not Paperwork</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Go from patent to polished chart in minutes. Our AI handles the heavy lifting so you can focus on strategy, not paperwork.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="text-lg">⏱️</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>From hours to minutes</strong> — process even complex patents under 30 minutes
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-lg">🔍</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>Element-by-element precision</strong> — automated matching with 95%+ accuracy
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-lg">📂</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>Plug & play file support</strong> — upload PDFs, Word docs, text, or pull directly from patent databases
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Spacer between features */}
        <div className="h-16 md:h-24 lg:h-32"></div>
        
        {/* Feature 2 - Right Image, Left Text */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center mb-60 md:mb-80 lg:mb-96" style={{ margin: "0 20px" }}>
          {/* Left: Text Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-balance">📑 Verifiable Evidence, Fully Traceable</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Every mapping is backed by verifiable citations and source tracking. Build airtight arguments with confidence that every line can stand up in court.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="text-lg">📝</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>One-click legal citations</strong> — formatted the right way, every time
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-lg">🎯</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>Page-level pinpointing</strong> — zero ambiguity on where evidence lives
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-lg">⚖️</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>Built for compliance</strong> — documentation structured for court admissibility
                </span>
              </li>
            </ul>
          </div>
          
          {/* Right: Evidence Tracker UI */}
          <div className="order-1 md:order-2 relative">
            <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold flex items-center gap-2">📑 Evidence Tracker</h3>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">✓ Verified</div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Court Ready</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="border border-green-200 bg-green-50 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm">📝</div>
                    <span className="text-sm font-medium text-green-800">Citation Generated</span>
                  </div>
                  <div className="text-xs text-green-600">Page 47, Column 2, Lines 15-23</div>
                </div>
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm">🎯</div>
                    <span className="text-sm font-medium text-blue-800">Precise Location</span>
                  </div>
                  <div className="text-xs text-blue-600">Figure 3, Element 42</div>
                </div>
                <div className="border border-purple-200 bg-purple-50 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm">⚖️</div>
                    <span className="text-sm font-medium text-purple-800">Compliance Check</span>
                  </div>
                  <div className="text-xs text-purple-600">Court admissible format</div>
                </div>
              </div>
            </div>
            {/* Floating decoration */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        {/* Spacer between features */}
        <div className="h-16 md:h-24 lg:h-32"></div>
        
        {/* Feature 3 - Left Image, Right Text */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center mb-60 md:mb-80 lg:mb-96" style={{ margin: "0 20px" }}>
          {/* Left: Export Center UI */}
          <div className="relative order-1 md:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-lg">📤</div>
                <span className="font-medium">Export Center</span>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <div className="text-lg mb-1">📊</div>
                    <div className="text-xs font-medium text-green-700">Excel</div>
                  </div>
                </div>
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-5 text-center">
                  <div className="text-lg mb-2">🎨</div>
                  <div className="text-sm font-medium text-primary">Custom Template Applied</div>
                  <div className="text-xs text-muted-foreground mt-1">Your branding • Legal formatting</div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm">📦</div>
                    <span className="text-sm font-medium text-primary">Batch Export Ready</span>
                  </div>
                  <div className="text-xs text-primary/80">5 charts • Multiple formats</div>
                </div>
              </div>
            </div>
            {/* Floating decoration */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>
          
          {/* Right: Text Content */}
          <div className="order-2 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-balance">📤 Court-Ready Exports, Instantly</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Deliver charts that look like they were prepared by a top firm — only faster.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="text-lg">📄</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>Multiple export options</strong> — PDF, Word, Excel, HTML, ready to file or share
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-lg">🎨</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>Custom templates</strong> — apply your branding and preferred legal style
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-lg">📦</div>
                <span className="text-muted-foreground leading-relaxed">
                  <strong>Batch exports</strong> — generate multiple charts at once without extra clicks
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center py-16 md:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
            Ready to start with AI patent analysis?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how AI can cut your patent drafting time from 3 hours to 20 minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <TalkToSalesTrigger 
              variant="default" 
              size="lg"
              className="px-8 py-3"
            >
              Schedule Demo
            </TalkToSalesTrigger>
            <a 
              href="/talk-to-sales" 
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      {/* Additional bottom spacing for features section */}
      <div className="h-20 md:h-32 lg:h-40"></div>
    </section>
  );
};
