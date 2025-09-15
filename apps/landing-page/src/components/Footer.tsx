import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-primary rounded" />
              <span className="font-semibold text-lg">PatX</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              AI-powered patent claim chart tool that helps teams generate audit-traceable, export-ready charts in 20-30 minutes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="block text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="/#features" className="block text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="/#testimonials" className="block text-sm text-muted-foreground hover:text-foreground">Testimonials</Link></li>
              <li><Link href="/#pricing" className="block text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="/talk-to-sales" className="block text-sm text-muted-foreground hover:text-foreground">Talk to Sales</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/security" className="block text-sm text-muted-foreground hover:text-foreground">Security</Link></li>
              <li><Link href="mailto:alanhu1024@gmail.com" className="block text-sm text-muted-foreground hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-primary rounded" />
            <span className="text-sm text-muted-foreground">© 2025 AIGROW Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


