import Image from "next/image";
import Link from "next/link";
import { 
  Navbar, 
  HeroSection, 
  LogoCloud, 
  FeatureSection,
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <HeroSection />
        <LogoCloud />
        <FeatureSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}


