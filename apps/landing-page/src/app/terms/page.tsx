import Link from "next/link";
import { Navbar, Footer } from "@/components";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="mb-4">
                  By accessing or using PatX Studio ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                  If you disagree with any part of these terms, then you may not access the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                <p className="mb-4">
                  PatX Studio is an AI-powered patent claim chart tool that helps teams generate audit-traceable, 
                  export-ready charts in 20-30 minutes. The Service includes web-based tools, analytics, and related services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <p className="mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                  You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>You must be at least 18 years old to use this Service</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                <p className="mb-4">You may not use our Service:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property Rights</h2>
                <p className="mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of 
                  PatX Studio and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <p className="mb-4">
                  You retain ownership of any content you submit, post, or display on or through the Service. 
                  By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                  reproduce, modify, and distribute your content in connection with the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>
                <p className="mb-4">
                  Paid services are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Subscription fees are charged at the beginning of each billing cycle</li>
                  <li>You may cancel your subscription at any time</li>
                  <li>Refunds are provided only in accordance with our refund policy</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Privacy Policy</h2>
                <p className="mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                  to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
                  including without limitation if you breach the Terms.
                </p>
                <p className="mb-4">
                  Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, 
                  you may simply discontinue using the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                <p className="mb-4">
                  In no event shall PatX Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                  loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Disclaimer</h2>
                <p className="mb-4">
                  The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, 
                  PatX Studio excludes all representations, warranties, conditions, and terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
                <p className="mb-4">
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which PatX Studio operates, 
                  without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="mb-4">
                  Email: <a href="mailto:legal@patxstudio.com" className="text-primary hover:underline">legal@patxstudio.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
