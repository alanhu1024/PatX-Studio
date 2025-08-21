"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 滚动超过 10px 时显示背景
      setIsScrolled(window.scrollY > 10);
    };

    // 初始检查
    handleScroll();

    // 添加滚动监听
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50 transition-all duration-500 ease-out
        ${isScrolled
          ? 'bg-white/70 dark:bg-black/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-white/5 before:pointer-events-none'
          : 'bg-transparent border-b-transparent'
        }
      `}
      style={{
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded" />
              <span className="font-bold text-xl">PatX</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/Product"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 relative group"
              >
                Product
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
              <Link
                href="/Features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
              <Link
                href="/docs"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 relative group"
              >
                Docs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
              <Link
                href="/pricing"
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
