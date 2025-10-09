import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';
import { 
  Navbar, 
  HeroSection, 
  LogoCloud, 
  FeatureSection,
  FAQSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  Footer,
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
} from "@/components";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <HeroSection />
        <LogoCloud />
        <FeatureSection />
        <FAQSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}


