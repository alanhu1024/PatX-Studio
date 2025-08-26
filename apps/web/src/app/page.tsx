import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  CSVIcon,
  JSONIcon,
  MobileIcon,
  SecureIcon,
  SQLIcon,
  DBTIcon,
  LineageIcon,
  ColumnIcon,
  CollaborationIcon,
  CommentIcon,
  SSOIcon,
  SOCIcon,
} from "@/components/icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        {/* Floating orbs decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="w-full max-w-hero mx-auto px-4 sm:px-6 lg:px-8 relative" style={{maxWidth: '1480px'}}>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center" style={{ margin: "0 20px" }}>
            {/* Left side - Text content */}
            <div>
              <h1 style={{lineHeight: 1.2}} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
               Faster, More Reliable, <br/>and More Cost-Effective <br/>AI Patent Claim Charts
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                Cut claim chart drafting time from 3 hours to 20–30 minutes <span className="text-primary">with audit-ready evidence and export-ready charts</span>.
              </p>
            </div>

            {/* Right side - App Mockup */}
            <div className="relative max-w-none">
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
            padding: 15px 30px;
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
            font-size: 18px;
            color: #6b7280;
            font-weight: 400;
        }
        
        /* Main Content */
        .claim-chart-container .main-content {
            display: flex;
        }
        
        /* Sidebar */
        .claim-chart-container .sidebar {
            flex: 1;
            min-width: 150px;
            background: #f9fafb;
            border-right: 1px solid #e5e7eb;
            padding: 20px;
            display: flex;
            flex-direction: column;
        }
        
        .claim-chart-container .sidebar-content {
            flex: 1;
        }
        
        .claim-chart-container .sidebar-section {
            margin-bottom: 25px;
        }
        
        .claim-chart-container .sidebar-title {
            font-size: clamp(12px, 1.4vw, 15px);
            color: #374151;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .claim-chart-container .sidebar-item {
            background: #e5e7eb;
            height: 32px;
            border-radius: 6px;
            margin-bottom: 10px;
        }
        
        .claim-chart-container .sidebar-item.active {
            background: #93c5fd;
            box-shadow: 0 2px 4px rgba(147, 197, 253, 0.2);
        }
        
        .claim-chart-container .start-button {
            background: white;
            border: 1px solid #93c5fd;
            color: #60a5fa;
            padding: 10px 32px;
            border-radius: 8px;
            font-size: clamp(11px, 1.2vw, 13px);
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            width: 100%;
        }
        
        .claim-chart-container .start-button:hover {
            background: #60a5fa;
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
        }
        
        /* Chart Area */
        .claim-chart-container .chart-area {
            flex: 3;
            min-width: 300px;
            padding: 20px 30px;
            display: flex;
            flex-direction: column;
        }
        
        .claim-chart-container .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .claim-chart-container .chart-title {
            font-size: clamp(20px, 2.5vw, 28px);
            font-weight: 600;
            color: #1f2937;
        }
        
        .claim-chart-container .export-button {
            background: white;
            border: 1px solid #93c5fd;
            color: #60a5fa;
            padding: 8px 24px;
            border-radius: 8px;
            font-size: clamp(12px, 1.3vw, 14px);
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .claim-chart-container .export-button:hover {
            background: #eff6ff;
            transform: translateY(-1px);
        }
        
        /* Chart Grid */
        .claim-chart-container .chart-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .claim-chart-container .chart-column {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .claim-chart-container .chart-item {
            background: #e5e7eb;
            height: 32px;
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

      {/* Logo Cloud */}
      <section className="py-24 mt-16">
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

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              See your data<br />
              like never before,<br />
              <span className="gradient-text">without code</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Focus on the data, not the data engineering.
            </p>
            <p className="text-lg text-muted-foreground mb-12">
              Connect, explore, and visualize from over 150 SaaS tools without engineering or SQL.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Templates Card */}
            <div className="bg-card rounded-xl p-8 border">
              <div className="flex gap-4 mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg p-4 w-24 h-24" />
                <div className="bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg p-4 w-24 h-24" />
                <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-lg p-4 w-24 h-24" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Templates</h3>
              <h4 className="text-xl font-semibold mb-2">High quality, expert-made templates for table stakes startup metrics</h4>
              <p className="text-muted-foreground">Get started with popular startup metrics in minutes.</p>
            </div>

            {/* Connectors Card */}
            <div className="bg-card rounded-xl p-8 border">
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-muted rounded-lg p-3 flex items-center justify-center">
                  <img src="https://ext.same-assets.com/1133407503/2344503785.svg" alt="Stripe" className="w-8 h-8" />
                </div>
                <div className="bg-muted rounded-lg p-3 flex items-center justify-center">
                  <img src="https://ext.same-assets.com/1133407503/1052289501.svg" alt="Segment" className="w-8 h-8" />
                </div>
                <div className="bg-muted rounded-lg p-3 flex items-center justify-center">
                  <img src="https://ext.same-assets.com/1133407503/2089237992.svg" alt="Shopify" className="w-8 h-8" />
                </div>
                <div className="bg-muted rounded-lg p-3 flex items-center justify-center">
                  <img src="https://ext.same-assets.com/1133407503/4009742701.svg" alt="Google Ads" className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Connectors</h3>
              <h4 className="text-xl font-semibold mb-2">We connect to over 150+ apps out-of-the-box.</h4>
              <p className="text-muted-foreground">If it has an API, we'll build you a customer connector in 48 hours for free or your money back.</p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold">Beautiful dashboards</h3>
              <p className="text-muted-foreground text-sm">Design stunning dashboards. Filters for your team to explore easily. Tons of visualization options.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Spreadsheets on steroids</h3>
              <p className="text-muted-foreground text-sm">No SQL? No problem. Familiar Excel shortcuts. Slice and dice with powerful pivot tables.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Alerts</h3>
              <p className="text-muted-foreground text-sm">Stay on top of everything. Get alerts about sign ups, sales, and reactivations when they happen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Need more? We got you.</h2>
          <p className="text-center text-muted-foreground mb-12">
            Details matter, and we've put a lot of love into each and every one of them.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <CSVIcon />,
                title: "CSV download and upload",
                description: "CSVs that work with all your other tables."
              },
              {
                icon: <JSONIcon />,
                title: "JSON parsing",
                description: "Great for working with NoSQL objects. Looking at you MongoDB."
              },
              {
                icon: <MobileIcon />,
                title: "Mobile-friendly",
                description: "It's 2024."
              },
              {
                icon: <SecureIcon />,
                title: "Secure sharing",
                description: "Share your work with partners while keeping your data safe."
              },
              {
                icon: <SQLIcon />,
                title: "Powerful SQL editor",
                description: "Did we mention Supernova is also awesome for writing SQL?"
              },
              {
                icon: <DBTIcon />,
                title: "Works great with dbt",
                description: "Pull your docs automatically from your models."
              },
              {
                icon: <LineageIcon />,
                title: "Lineage",
                description: "Follow data from chart all the way back to the source tables."
              },
              {
                icon: <ColumnIcon />,
                title: "Column descriptions",
                description: "Easily document your models for your team."
              },
              {
                icon: <CollaborationIcon />,
                title: "Live collaboration",
                description: "Work together in real time."
              },
              {
                icon: <CommentIcon />,
                title: "Comments",
                description: "Ask questions right where the data lives."
              },
              {
                icon: <SSOIcon />,
                title: "SSO and SAML",
                description: "Enterprise-grade user provisioning."
              },
              {
                icon: <SOCIcon />,
                title: "SOC 2 Type 2 certified",
                description: "Our security is audited regularly."
              }
            ].map((feature, index) => (
              <div key={index} className="space-y-3">
                <div className="text-primary">{feature.icon}</div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Hundreds of people</span>
          </h2>
          <h2 className="text-4xl font-bold mb-4">already love us</h2>
          <p className="text-muted-foreground mb-12">But don't just take our word for it.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alice Sato",
                role: "Revenue Ops Manager, Airhouse",
                quote: "Without involving my technical team, I can report from our product database, Salesforce, Hubspot, Square, and Excel. We're a startup, and a complex stack that requires technical knowledge to run simple reports, plus a full-time employee to manage it, just isn't an option.",
                avatar: "https://ext.same-assets.com/1133407503/603093046.jpeg"
              },
              {
                name: "Sophie Benjamin",
                role: "Chief of Staff, Anvil",
                quote: "With PatX, we can orient our teams around revenue from day one and build a culture of truly data-driven decision making as we grow.",
                avatar: "https://ext.same-assets.com/1133407503/727278057.jpeg"
              },
              {
                name: "Marina Brown",
                role: "Chief Product Officer, BasicBlock",
                quote: "There are many business intelligence tools in the market but where it differentiates itself is through the simplicity and usability of the product. If you're slightly familiar with Excel, you'll know this.",
                avatar: "https://ext.same-assets.com/1133407503/2643777663.jpeg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 mt-12">
            <button className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity">
              Show more...
            </button>

            {/* Product Hunt Badge */}
            <a
              href="https://www.producthunt.com/posts/canvas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <span className="text-2xl">🏆</span>
              <span className="font-semibold text-orange-600">#1 Product of the Day</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-bg rounded-3xl p-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              We're making analytics<br />
              easy for everyone.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Take control of your data like never before. Join<br />
              the fight.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-6 py-3 bg-black/20 backdrop-blur-sm rounded-full font-medium hover:bg-black/30 transition-colors">
                Get started
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-medium hover:bg-white/30 transition-colors">
                Talk to sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link href="/product" className="block text-sm text-muted-foreground hover:text-foreground">Product</Link>
                <Link href="/features" className="block text-sm text-muted-foreground hover:text-foreground">Features</Link>
                <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground">Terms of service</Link>
                <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">Privacy policy</Link>
                <Link href="/security" className="block text-sm text-muted-foreground hover:text-foreground">Security</Link>
                <Link href="mailto:team@supernova.ai" className="block text-sm text-muted-foreground hover:text-foreground">Contact us</Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-primary rounded" />
              <span className="text-sm text-muted-foreground">© 2025 Infinite Canvas Inc. d/b/a AIGROW</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


