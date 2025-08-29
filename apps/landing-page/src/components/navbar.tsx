"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 判断是否在主页
  const isHomePage = pathname === "/";

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300 ease-out
        ${isScrolled
          ? 'bg-background/20 backdrop-blur-2xl saturate-150 contrast-90'
          : 'bg-transparent'
        }
      `}
    >
      {/* intensified frosted layer with vertical edge fade when scrolled */}
      {isScrolled && (
        <>
          {/* stronger blur strip that respects content via backdrop */}
          <div className="pointer-events-none absolute inset-0 backdrop-blur-2xl saturate-150 contrast-90" />
          {/* soften only the bottom edge so it blends with content */}
          <div className="pointer-events-none absolute inset-0 mask-fade-bottom-soft" />
        </>
      )}
      <div className="px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link 
              href={isHomePage ? "#home" : "/"} 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity border-0 outline-none focus:outline-none"
            >
              <div className="w-6 h-6 bg-primary rounded border-0" />
              <span className="font-bold text-xl">PatX</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href={isHomePage ? "#home" : "/"}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
              <Link
                href={isHomePage ? "#features" : "/#features"}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 relative group"
              >
                Feature
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
              <Link
                href={isHomePage ? "#testimonials" : "/#testimonials"}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 relative group"
              >
                Testimonials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
              <Link
                href={isHomePage ? "#pricing" : "/#pricing"}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/talk-to-sales"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 relative group"
            >
              Talk to sales
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign up →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
