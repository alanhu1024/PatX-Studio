import React from "react";
import Link from "next/link";

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" aria-label="Call to action">
      {/* Simplified background decorations */}
      <div className="absolute -bottom-16 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative max-w-screen-2xl">
        <div className="relative rounded-2xl p-12 sm:p-16 lg:p-20 text-center bg-gradient-to-br from-primary/80 via-primary/70 to-blue-600 text-white shadow-2xl border border-white/10 max-w-7xl mx-auto">
          <div className="relative z-10">
            {/* Simplified headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
              Beat deadlines with <span className="text-yellow-300">AI-assisted patent claim charts</span>
            </h2>
            
            <p className="text-xl sm:text-2xl opacity-95 max-w-4xl mx-auto mb-12 leading-relaxed">
              Go from patent to polished chart in minutes. AI-assisted mapping, you stay in control.
            </p>

            {/* CTA buttons */}
            <div className="flex items-center justify-center gap-6 flex-wrap mb-12">
              <Link
                href="/signup"
                className="px-10 py-5 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start free trial
              </Link>
              
              <Link
                href="/contact"
                className="px-10 py-5 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/30 transition-all duration-300 border border-white/20"
              >
                Talk to sales
              </Link>
            </div>

            {/* Simplified features */}
            <div className="flex items-center justify-center gap-10 text-base opacity-90 flex-wrap">
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>Minutes, not hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📄</span>
                <span>Structured claim-chart format</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <span>Pinpoint citations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


