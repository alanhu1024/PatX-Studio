import React from "react";

export const LogoCloud: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-lg sm:text-xl text-muted-foreground mb-12">
          Trusted by famous brands
        </p>
        <div className="marquee" aria-label="Trusted brands carousel">
          <div className="marquee__track">
            <img src="https://ext.same-assets.com/1133407503/1955674907.svg" alt="Anvil" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://ext.same-assets.com/1133407503/2075191122.svg" alt="Doppler" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://ext.same-assets.com/1133407503/1432361546.svg" alt="Earth" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://ext.same-assets.com/1133407503/3668445894.svg" alt="Novel" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://ext.same-assets.com/1133407503/566171222.svg" alt="Slatewell" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://ext.same-assets.com/1133407503/1578610569.svg" alt="Solace Health" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://ext.same-assets.com/1133407503/2566791555.svg" alt="Wagtopia" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />

            {/* duplicate for seamless loop */}
            <img src="https://ext.same-assets.com/1133407503/1955674907.svg" alt="Anvil" className="h-8 opacity-60 hover:opacity-100 transition-opacity" aria-hidden="true" />
            <img src="https://ext.same-assets.com/1133407503/2075191122.svg" alt="Doppler" className="h-8 opacity-60 hover:opacity-100 transition-opacity" aria-hidden="true" />
            <img src="https://ext.same-assets.com/1133407503/1432361546.svg" alt="Earth" className="h-8 opacity-60 hover:opacity-100 transition-opacity" aria-hidden="true" />
            <img src="https://ext.same-assets.com/1133407503/3668445894.svg" alt="Novel" className="h-8 opacity-60 hover:opacity-100 transition-opacity" aria-hidden="true" />
            <img src="https://ext.same-assets.com/1133407503/566171222.svg" alt="Slatewell" className="h-8 opacity-60 hover:opacity-100 transition-opacity" aria-hidden="true" />
            <img src="https://ext.same-assets.com/1133407503/1578610569.svg" alt="Solace Health" className="h-8 opacity-60 hover:opacity-100 transition-opacity" aria-hidden="true" />
            <img src="https://ext.same-assets.com/1133407503/2566791555.svg" alt="Wagtopia" className="h-8 opacity-60 hover:opacity-100 transition-opacity" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};
