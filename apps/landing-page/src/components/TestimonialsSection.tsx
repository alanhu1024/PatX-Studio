import React from "react";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden scroll-mt-26">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="w-full max-w-hero mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ maxWidth: "1480px" }}>
        <div className="text-center mb-32 mx-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Trusted by Patent Professionals Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how leading IP attorneys and patent professionals are transforming their workflow with PatX AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mx-5">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">SM</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Sarah Mitchell</h3>
                <p className="text-sm text-muted-foreground">Senior Patent Attorney, TechLaw Partners</p>
              </div>
            </div>
            <blockquote className="text-muted-foreground leading-relaxed mb-4">
              "PatX has completely transformed our claim chart process. What used to take our team 4-5 hours now takes
              25 minutes. The accuracy is incredible, and our clients love the professional presentation."
            </blockquote>
            <div className="flex text-primary text-sm">★★★★★</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">DR</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">David Rodriguez</h3>
                <p className="text-sm text-muted-foreground">IP Counsel, InnovateCorp</p>
              </div>
            </div>
            <blockquote className="text-muted-foreground leading-relaxed mb-4">
              "The evidence tracking feature is a game-changer. Every citation is perfectly formatted and court-ready.
              We've used PatX charts in three major cases this year with excellent results."
            </blockquote>
            <div className="flex text-primary text-sm">★★★★★</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative hover:shadow-xl transition-shadow duration-300">
            <div className="absolute -top-3 -left-3 w-14 h-14 bg-green-500/20 rounded-full blur-xl"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">LC</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Lisa Chen</h3>
                <p className="text-sm text-muted-foreground">Managing Partner, Chen & Associates IP</p>
              </div>
            </div>
            <blockquote className="text-muted-foreground leading-relaxed mb-4">
              "PatX has allowed us to take on 40% more cases without expanding our team. The batch export feature
              saves us hours every week, and the quality is consistently excellent."
            </blockquote>
            <div className="flex text-primary text-sm">★★★★★</div>
          </div>
        </div>
      </div>
    </section>
  );
}


