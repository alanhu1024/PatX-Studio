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
        sticky top-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm'
          : 'bg-transparent border-b-transparent'
        }
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded" />
              <span className="font-bold text-xl">PatX</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/Product"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Product
              </Link>
              <Link
                href="/Features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="/docs"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/talk-to-sales"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Talk to sales
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Sign up →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
