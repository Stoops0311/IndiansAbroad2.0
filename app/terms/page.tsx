import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-12 md:pt-16">
        <section className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Terms and Conditions
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                By enrolling in Myst Education, you agree to be bound by the following terms and conditions. This website is operated by MYST EDUCATION.
              </p>

              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p className="leading-relaxed">
                    By enrolling in our services, you acknowledge that you have read, understood, and agree to these Terms and Conditions, as well as our Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Provided</h2>
                  <p className="leading-relaxed">
                    Myst Education offers immigration and study abroad consulting services. The specific services being offered to you will be detailed in your enrollment email sent by our team.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Enrollment Process</h2>
                  <p className="leading-relaxed">
                    To enroll in our services, you must complete the registration process and provide accurate and complete information. You must be at least 18 years old or have the consent of a parent or guardian to use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Responsibilities</h2>
                  <ul className="list-disc list-inside space-y-2 leading-relaxed">
                    <li>You agree to provide truthful, accurate, and complete information during the enrollment and application process.</li>
                    <li>You agree to use our services for lawful purposes only and not engage in any activity that would violate applicable laws or regulations.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Fees and Payment</h2>
                  <ul className="list-disc list-inside space-y-2 leading-relaxed">
                    <li>The fees for our services will be clearly stated on our website or communicated directly by our authorized counselors.</li>
                    <li>Payments must be made according to the agreed terms. Failure to pay may result in suspension or termination of services.</li>
                    <li>Refund policies, if applicable, will be outlined in your service agreement.</li>
                    <li>Refunds will be processed through the original mode of payment and may take up to 14 business days to reflect in your account.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cancellation and Refunds</h2>
                  <ul className="list-disc list-inside space-y-2 leading-relaxed">
                    <li><strong>Cancellation Timeline:</strong> If you wish to cancel your enrollment, you must notify us in writing within 7 calendar days from the date of enrollment.</li>
                    <li><strong>Refund Mode and Duration:</strong> Refunds, if applicable, will be processed according to the terms outlined in your service agreement. Certain fees may be non-refundable, as specified in your agreement. Refunds will be processed through the original mode of payment and may take up to 14 business days to be credited back to you, depending on your bank or payment service provider.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Privacy Policy</h2>
                  <p className="leading-relaxed mb-4">
                    Myst Education is committed to protecting your personal information. We collect, store, and use your data in compliance with applicable laws and regulations.
                  </p>
                  <ul className="list-disc list-inside space-y-2 leading-relaxed">
                    <li>Your information will only be used for purposes related to the services you have enrolled for.</li>
                    <li>We will not share your personal data with third parties without your consent, except where required by law or to provide services (e.g., processing applications).</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    For detailed information on how we manage your personal data, please refer to our full Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
                  <p className="leading-relaxed">
                    In case of any legal disputes, the matter will be governed under the jurisdiction of Mumbai, India.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                  <p className="leading-relaxed">
                    If you have any queries or need further clarification, feel free to contact us at:{" "}
                    <a href="mailto:info@indiansabroad.in" className="text-primary hover:text-primary/80 underline">
                      info@indiansabroad.in
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}