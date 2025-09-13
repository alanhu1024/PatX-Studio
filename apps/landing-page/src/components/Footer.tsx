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
              <li><Link href="/signup" className="block text-sm text-muted-foreground hover:text-foreground">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/security" className="block text-sm text-muted-foreground hover:text-foreground">Security</Link></li>
              <li><Link href="mailto:team@patxstudio.com" className="block text-sm text-muted-foreground hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-primary rounded" />
            <span className="text-sm text-muted-foreground">© 2025 AIGROW Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


