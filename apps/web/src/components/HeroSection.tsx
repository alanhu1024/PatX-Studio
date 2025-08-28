import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden" role="banner" aria-label="Hero section">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      {/* Floating orbs decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="w-full max-w-hero mx-auto px-4 sm:px-6 lg:px-8 relative" style={{maxWidth: '1600px'}}>
        <div className="grid md:grid-cols-5 gap-4 sm:gap-6 lg:gap-12 items-center" style={{ margin: "0 clamp(10px, 3vw, 20px)" }}>
          {/* Left side - Text content */}
          <div className="md:col-span-2 xl:col-span-3">
            <h1 style={{lineHeight: 1.2}} className="hero-title text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
             Faster, More Reliable, <br/>and More Cost-Effective<br/>AI Patent Claim Charts
            </h1>
            <p className="hero-subtitle text-xl text-muted-foreground mb-8 max-w-2xl">
              Cut claim chart drafting time from 3 hours to 20–30 minutes <span className="text-primary">with audit-ready evidence and export-ready charts</span>.
            </p>
          </div>

          {/* Right side - App Mockup */}
          <div className="relative max-w-none md:col-span-3 xl:col-span-2">
            <style dangerouslySetInnerHTML={{ __html: `
      .claim-chart-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
      
      .claim-chart-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }
      
      .claim-chart-container .container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
      }
      
      /* Header */
      .claim-chart-container .header {
          padding: clamp(10px, 2vw, 15px) clamp(15px, 3vw, 30px);
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
      
      .claim-chart-container .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
      }
      
      .claim-chart-container .window-controls {
          display: flex;
          gap: 8px;
      }
      
      .claim-chart-container .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
      }
      
      .claim-chart-container .dot.red { background: #ff5f57; }
      .claim-chart-container .dot.yellow { background: #ffbd2e; }
      .claim-chart-container .dot.green { background: #28ca42; }
      
      .claim-chart-container .company-name {
          font-size: 15px;
          color: #6b7280;
          font-weight: 400;
      }
      
      /* Main Content */
      .claim-chart-container .main-content {
          display: flex;
          min-width: 0;
          overflow: hidden;
      }
      
      /* Sidebar */
      .claim-chart-container .sidebar {
          flex: 0 1 auto;
          min-width: clamp(100px, 12vw, 190px);
          max-width: clamp(140px, 20vw, 240px);
          width: clamp(100px, 15vw, 180px);
          background: #f9fafb;
          border-right: 1px solid #e5e7eb;
          padding: clamp(6px, 1vw, 20px);
          display: flex;
          flex-direction: column;
      }
      
      .claim-chart-container .sidebar-content {
          flex: 1;
      }
      
      .claim-chart-container .sidebar-section {
          margin-bottom: clamp(15px, 3vw, 25px);
      }
      
      .claim-chart-container .sidebar-title {
          font-size: clamp(9px, 1.1vw, 15px);
          color: #374151;
          margin-bottom: clamp(8px, 1.2vw, 15px);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
      }
      
      .claim-chart-container .sidebar-item {
          background: #e5e7eb;
          height: clamp(24px, 4vw, 32px);
          border-radius: 6px;
          margin-bottom: clamp(6px, 1vw, 10px);
      }
      
      .claim-chart-container .sidebar-item.active {
          background: #93c5fd;
          box-shadow: 0 2px 4px rgba(147, 197, 253, 0.2);
      }
      
      .claim-chart-container .start-button {
          background: white;
          border: 1px solid #93c5fd;
          color: #60a5fa;
          padding: clamp(6px, 1vw, 10px) clamp(12px, 2.5vw, 32px);
          border-radius: 8px;
          font-size: clamp(8px, 1vw, 13px);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          text-align: center;
      }
      
      .claim-chart-container .start-button:hover {
          background: #60a5fa;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
      }
      
      /* Chart Area */
      .claim-chart-container .chart-area {
          flex: 1 1 0;
          min-width: clamp(200px, 40vw, 300px);
          padding: clamp(10px, 2vw, 20px);
          display: flex;
          flex-direction: column;
      }
      
      .claim-chart-container .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: clamp(10px, 2vw, 20px);
          gap: clamp(6px, 1vw, 10px);
          flex-wrap: nowrap;
      }
      
      .claim-chart-container .chart-title {
          font-size: clamp(12px, 2vw, 28px);
          font-weight: 600;
          color: #1f2937;
          flex-shrink: 1;
          min-width: 0;
      }
      
      .claim-chart-container .export-button {
          background: white;
          border: 1px solid #93c5fd;
          color: #60a5fa;
          padding: 6px 16px;
          border-radius: 8px;
          font-size: clamp(9px, 1vw, 14px);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
          white-space: nowrap;
      }
      
      .claim-chart-container .export-button:hover {
          background: #eff6ff;
          transform: translateY(-1px);
      }
      
      /* Chart Grid */
      .claim-chart-container .chart-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(10px, 2vw, 20px);
      }
      
      .claim-chart-container .chart-column {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: clamp(12px, 2.5vw, 20px);
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1vw, 10px);
          min-width: 90px;
      }
      
      .claim-chart-container .chart-item {
          background: #e5e7eb;
          height: clamp(24px, 4vw, 32px);
          min-height: 20px;
          border-radius: 6px;
          transition: all 0.2s;
      }
      
      .claim-chart-container .chart-item:hover {
          background: #d1d5db;
      }
      
      .claim-chart-container .chart-item.highlight {
          background: #e0f2fe;
          border: 1px solid #bae6fd;
      }

      /* Media queries for width < 1280px */
      @media (max-width: 1279px) {
          .claim-chart-container .sidebar {
              min-width: clamp(130px, 18vw, 220px);
              max-width: clamp(160px, 22vw, 260px);
              width: clamp(140px, 20vw, 240px);
              padding: clamp(10px, 1.6vw, 20px);
          }
          
          .claim-chart-container .chart-area {
              min-width: clamp(220px, 40vw, 320px);
          }

          .claim-chart-container .sidebar-title {
              font-size: clamp(11px, 1.5vw, 16px);
          }

          .claim-chart-container .start-button {
              font-size: clamp(10px, 1.2vw, 13px);
              padding: clamp(6px, 1.1vw, 10px) clamp(12px, 2.2vw, 20px);
          }

          .claim-chart-container .company-name {
              font-size: 15px;
          }
      }

      /* Media queries for width < 1024px */
      @media (max-width: 1023px) {
          .claim-chart-container .sidebar {
              min-width: clamp(120px, 18vw, 200px);
              max-width: clamp(150px, 22vw, 240px);
              width: clamp(130px, 20vw, 220px);
              padding: clamp(8px, 1.4vw, 18px);
          }
          
          .claim-chart-container .chart-area {
              min-width: clamp(180px, 45vw, 280px);
          }

          .claim-chart-container .sidebar-title {
              font-size: clamp(10px, 1.6vw, 15px);
          }

          .claim-chart-container .start-button {
              font-size: clamp(9px, 1.3vw, 12px);
              padding: clamp(6px, 1.1vw, 9px) clamp(10px, 2vw, 18px);
          }

          .claim-chart-container .company-name {
              font-size: 15px;
          }
      }

      /* Media queries for very small screens */
      @media (max-width: 600px) {
          .claim-chart-container .sidebar {
              min-width: clamp(120px, 28vw, 180px);
              max-width: clamp(140px, 34vw, 200px);
              width: clamp(120px, 30vw, 180px);
              padding: clamp(8px, 2vw, 16px);
          }
          
          .claim-chart-container .sidebar-title {
              font-size: clamp(11px, 3.2vw, 12px);
              margin-bottom: clamp(6px, 1.4vw, 10px);
          }
          
          .claim-chart-container .start-button {
              font-size: clamp(9px, 2.2vw, 12px);
              padding: clamp(6px, 1.4vw, 9px) clamp(10px, 2.4vw, 16px);
          }

          .claim-chart-container .chart-area {
              min-width: clamp(140px, 30vw, 220px);
              padding: clamp(8px, 1.5vw, 16px);
          }

          .claim-chart-container .company-name {
              font-size: 14px;
          }
      }

      /* Ensure 601px–767px keeps sizes and preserves layout ratio */
      @media (min-width: 601px) and (max-width: 767px) {
          .claim-chart-container .sidebar {
              min-width: clamp(120px, 28vw, 180px);
              max-width: clamp(140px, 34vw, 200px);
              width: clamp(120px, 30vw, 180px);
              padding: clamp(8px, 2vw, 16px);
          }

          .claim-chart-container .chart-area {
              min-width: clamp(140px, 30vw, 220px);
              padding: clamp(8px, 1.5vw, 16px);
          }

          .claim-chart-container .sidebar-title {
              font-size: clamp(12px, 2.2vw, 14px);
              margin-bottom: clamp(6px, 1.2vw, 10px);
          }

          .claim-chart-container .start-button {
              font-size: clamp(12px, 2vw, 13px);
              padding: clamp(6px, 1.2vw, 10px) clamp(12px, 2.4vw, 20px);
          }

          .claim-chart-container .company-name {
              font-size: 15px;
          }
      }

      @media (max-width: 480px) {
          .claim-chart-container .main-content {
              flex-direction: column;
              gap: 0;
          }
          
          .claim-chart-container .sidebar {
              min-width: auto;
              max-width: none;
              width: 100%;
              border-right: none;
              border-bottom: 1px solid #e5e7eb;
              flex-direction: row;
              align-items: center;
              gap: clamp(8px, 2vw, 16px);
              padding: clamp(8px, 2vw, 16px);
              background: #f8fafc;
          }
          
          .claim-chart-container .sidebar-content {
              flex: 1;
              display: flex;
              gap: clamp(8px, 3vw, 20px);
              align-items: center;
          }
          
          .claim-chart-container .sidebar-section {
              margin-bottom: 0;
              flex: 1;
              min-width: 0;
          }
          
          .claim-chart-container .sidebar-title {
              font-size: clamp(8px, 2.2vw, 12px);
              margin-bottom: clamp(4px, 1vw, 8px);
              text-align: center;
          }
          
          .claim-chart-container .sidebar-item {
              height: clamp(16px, 4vw, 24px);
              margin-bottom: clamp(3px, 0.8vw, 6px);
          }
          
          .claim-chart-container .start-button {
              width: auto;
              flex-shrink: 0;
              padding: clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px);
              font-size: clamp(8px, 2vw, 12px);
              border-radius: 6px;
              white-space: nowrap;
          }

          .claim-chart-container .chart-area {
              padding: clamp(8px, 2vw, 16px);
              min-width: auto;
          }

          .claim-chart-container .chart-header {
              margin-bottom: clamp(8px, 2vw, 16px);
              flex-wrap: wrap;
              gap: clamp(8px, 2vw, 12px);
          }

          .claim-chart-container .chart-title {
              font-size: clamp(14px, 4vw, 20px);
          }

          .claim-chart-container .export-button {
              padding: clamp(4px, 1vw, 8px) clamp(8px, 2vw, 12px);
              font-size: clamp(7px, 1.8vw, 11px);
          }

          .claim-chart-container .chart-grid {
              gap: clamp(6px, 1.5vw, 12px);
          }

          .claim-chart-container .chart-column {
              padding: clamp(8px, 2vw, 16px);
              gap: clamp(4px, 1vw, 8px);
              min-width: 0;
          }

          .claim-chart-container .chart-item {
              height: clamp(16px, 4vw, 24px);
              min-height: 16px;
          }
      }
      
      /* Reduce left side text size when width < 1280px */
      @media (max-width: 1279px) {
          .hero-title {
              font-size: 2.5rem !important;
          }
          
          .hero-subtitle {
              font-size: 1.125rem !important;
          }
      }
      
      @media (max-width: 1024px) {
          .hero-title {
              font-size: 2.25rem !important;
          }
          
          .hero-subtitle {
              font-size: 1rem !important;
          }
      }
      
      @media (max-width: 768px) {
          .hero-title {
              font-size: 2rem !important;
          }
          
          .hero-subtitle {
              font-size: 0.875rem !important;
          }
      }

      @media (max-width: 480px) {
          .hero-title {
              font-size: 1.75rem !important;
              margin-bottom: 1rem !important;
          }
          
          .hero-subtitle {
              font-size: 0.8rem !important;
              margin-bottom: 1.5rem !important;
          }
      }
      
  `}} />
            <div className="claim-chart-container">
              <div className="container">
                <div className="header">
                  <div className="header-left">
                    <div className="window-controls">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="company-name">AIGROW Inc.</div>
                  </div>
                </div>

                <div className="main-content">
                  <div className="sidebar">
                    <div className="sidebar-content">
                      <div className="sidebar-section">
                        <div className="sidebar-title">Subject patent</div>
                        <div className="sidebar-item active"></div>
                      </div>

                      <div className="sidebar-section">
                        <div className="sidebar-title">Prior art references</div>
                        <div className="sidebar-item"></div>
                        <div className="sidebar-item"></div>
                      </div>
                    </div>

                    <button className="start-button">Start</button>
                  </div>

                  <div className="chart-area">
                    <div className="chart-header">
                      <h1 className="chart-title">Claim Chart</h1>
                      <button className="export-button">Export</button>
                    </div>

                    <div className="chart-grid">
                      <div className="chart-column">
                        <div className="chart-item highlight"></div>
                        <div className="chart-item"></div>
                        <div className="chart-item"></div>
                        <div className="chart-item"></div>
                      </div>
                      <div className="chart-column">
                        <div className="chart-item"></div>
                        <div className="chart-item"></div>
                        <div className="chart-item"></div>
                        <div className="chart-item"></div>
                        <div className="chart-item"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
