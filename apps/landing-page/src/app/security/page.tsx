import Link from "next/link";
import { Navbar, Footer } from "@/components";

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Security</h1>
              <p className="text-muted-foreground">Your data security is our top priority</p>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Security Commitment</h2>
                <p className="mb-4">
                  At PatX, we understand that patent and intellectual property data is among the most sensitive information 
                  your organization handles. We've built our platform with enterprise-grade security measures to protect 
                  your valuable IP assets and maintain the highest standards of data protection.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Encryption</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">🔒 In Transit</h3>
                    <p className="text-sm text-muted-foreground">
                      All data transmitted between your browser and our servers is protected using TLS 1.3 encryption, 
                      ensuring your patent documents are secure during upload and processing.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">🛡️ At Rest</h3>
                    <p className="text-sm text-muted-foreground">
                      Your stored data is encrypted using AES-256 encryption, the same standard used by banks and 
                      government agencies for protecting classified information.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Compliance & Certifications</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary font-bold">SOC</span>
                    </div>
                    <h3 className="font-semibold mb-1">SOC 2 Type II</h3>
                    <p className="text-sm text-muted-foreground">Audited security controls</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary font-bold">ISO</span>
                    </div>
                    <h3 className="font-semibold mb-1">ISO 27001</h3>
                    <p className="text-sm text-muted-foreground">Information security management</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary font-bold">GDPR</span>
                    </div>
                    <h3 className="font-semibold mb-1">GDPR Compliant</h3>
                    <p className="text-sm text-muted-foreground">European data protection</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Access Controls & Authentication</h2>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Multi-Factor Authentication (MFA):</strong> Required for all user accounts to prevent unauthorized access
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Role-Based Access Control:</strong> Granular permissions ensure users only access data they need
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Single Sign-On (SSO):</strong> Enterprise SSO integration for seamless and secure authentication
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Session Management:</strong> Automatic session timeout and secure session handling
                    </div>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Infrastructure Security</h2>
                <div className="bg-muted/30 p-6 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold mb-3">🏗️ Enterprise Cloud Infrastructure</h3>
                  <p className="mb-4">
                    PatX runs on enterprise-grade cloud infrastructure with multiple layers of security:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      <span className="text-sm">AWS/Azure enterprise cloud services with 99.9% uptime SLA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      <span className="text-sm">Network firewalls and intrusion detection systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      <span className="text-sm">DDoS protection and traffic monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      <span className="text-sm">Automated backup and disaster recovery systems</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Security Practices</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">🔍 Regular Security Audits</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Quarterly penetration testing by third-party security firms</li>
                      <li>• Continuous vulnerability scanning and assessment</li>
                      <li>• Annual compliance audits and certifications</li>
                      <li>• Code security reviews for all deployments</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">👥 Team Security</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Background checks for all employees</li>
                      <li>• Regular security awareness training</li>
                      <li>• Principle of least privilege access</li>
                      <li>• Secure development lifecycle practices</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Protection & Privacy</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold mb-3">🗂️ Data Handling Principles</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span><strong>Data Minimization:</strong> We only collect and process data necessary for service delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span><strong>Purpose Limitation:</strong> Your data is used only for patent analysis and chart generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span><strong>Data Retention:</strong> Automated deletion of data based on your retention policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span><strong>Right to Deletion:</strong> Complete data removal upon request</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Incident Response</h2>
                <p className="mb-4">
                  We maintain a comprehensive incident response plan to quickly address any security concerns:
                </p>
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">⚡</div>
                    <h3 className="font-semibold mb-1">Detection</h3>
                    <p className="text-sm text-muted-foreground">24/7 monitoring</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">🚨</div>
                    <h3 className="font-semibold mb-1">Response</h3>
                    <p className="text-sm text-muted-foreground">&lt; 1 hour alert</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">🔧</div>
                    <h3 className="font-semibold mb-1">Mitigation</h3>
                    <p className="text-sm text-muted-foreground">Immediate containment</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl mb-2">📋</div>
                    <h3 className="font-semibold mb-1">Communication</h3>
                    <p className="text-sm text-muted-foreground">Transparent updates</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Security Best Practices</h2>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold mb-3">🛡️ Recommended Actions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>Enable multi-factor authentication on your account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>Use strong, unique passwords for your PatX account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>Regularly review your account activity and access logs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>Report any suspicious activity immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>Keep your browser and devices updated</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Responsible Disclosure</h2>
                <p className="mb-4">
                  We welcome security researchers and users to report potential vulnerabilities. 
                  We are committed to working with the security community to verify and respond to legitimate security issues.
                </p>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🔍 How to Report Security Issues</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Email: <a href="mailto:security@patx.com" className="text-primary hover:underline">security@patx.com</a></li>
                    <li>• Include detailed steps to reproduce the issue</li>
                    <li>• Allow us 90 days to investigate and address the issue</li>
                    <li>• We will acknowledge receipt within 24 hours</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Security Updates & Communications</h2>
                <p className="mb-4">
                  Stay informed about our security practices and any important updates:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Security advisories are published on our status page</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Critical security updates are communicated via email</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Regular security blog posts and transparency reports</span>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Our Security Team</h2>
                <p className="mb-4">
                  Have questions about our security practices or need to report a security concern?
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">🔒 Security Inquiries</h3>
                    <p className="text-sm text-muted-foreground mb-2">For security-related questions and concerns</p>
                    <a href="mailto:security@patx.com" className="text-primary hover:underline">security@patx.com</a>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">🏢 Enterprise Security</h3>
                    <p className="text-sm text-muted-foreground mb-2">For enterprise security requirements and compliance</p>
                    <a href="mailto:enterprise@patx.com" className="text-primary hover:underline">enterprise@patx.com</a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
