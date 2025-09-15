import Link from "next/link";
import { Navbar, Footer } from "@/components";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  PatX Studio ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our Service.
                </p>
                <p className="mb-4">
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, 
                  please do not access the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Register for an account</li>
                  <li>Use our Service</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>

                <p className="mb-4">This information may include:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Professional information (company, job title)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communications with us</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Usage Information</h3>
                <p className="mb-4">We automatically collect certain information when you use our Service:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns (pages visited, time spent, features used)</li>
                  <li>Log data (access times, error logs)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide, operate, and maintain our Service</li>
                  <li>Improve, personalize, and expand our Service</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information and updates</li>
                  <li>Respond to comments, questions, and provide customer service</li>
                  <li>Send marketing and promotional communications (with your consent)</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues and security vulnerabilities</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
                <p className="mb-4">We may share your information in the following situations:</p>
                
                <h3 className="text-xl font-semibold mb-3">Service Providers</h3>
                <p className="mb-4">
                  We may share your information with third-party service providers who perform services on our behalf, 
                  such as payment processing, data analysis, email delivery, hosting services, and customer service.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Transfers</h3>
                <p className="mb-4">
                  If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.
                </p>

                <h3 className="text-xl font-semibold mb-3">Legal Requirements</h3>
                <p className="mb-4">
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                </p>

                <h3 className="text-xl font-semibold mb-3">Consent</h3>
                <p className="mb-4">
                  We may share your information with your consent or at your direction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="mb-4">Security measures include:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="mb-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. 
                  We cannot guarantee absolute security of your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                <p className="mb-4">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                  unless a longer retention period is required or permitted by law.
                </p>
                <p className="mb-4">
                  When we no longer need your personal information, we will securely delete or anonymize it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>
                <p className="mb-4">Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your personal information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Withdraw consent:</strong> Withdraw previously given consent</li>
                </ul>
                <p className="mb-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to collect and use personal information about you. 
                  For more information about our use of cookies, please see our Cookie Policy.
                </p>
                <p className="mb-4">Types of cookies we use:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Essential cookies:</strong> Necessary for the Service to function properly</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how you use our Service</li>
                  <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
                <p className="mb-4">
                  Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices 
                  or content of these third parties. We encourage you to read their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                <p className="mb-4">
                  Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information 
                  from children under 18. If you become aware that a child has provided us with personal information, 
                  please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
                <p className="mb-4">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your personal information when it is transferred.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p className="mb-4">
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <ul className="list-none mb-4">
                  <li className="mb-2">Email: <a href="mailto:privacy@patxstudio.com" className="text-primary hover:underline">privacy@patxstudio.com</a></li>
                  <li className="mb-2">General inquiries: <a href="mailto:team@patxstudio.com" className="text-primary hover:underline">team@patxstudio.com</a></li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
