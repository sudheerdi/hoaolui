"use client";

import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import Accordion from "../../components/base/Accordion";

export default function FAQs() {
  const generalFAQs = [
    {
      question: "What is CommUnity Connect?",
      answer:
        "CommUnity Connect is a comprehensive HOA management platform that helps homeowners associations streamline operations, improve communication, and enhance community engagement. Our cloud-based solution includes features for payments, approvals, violations, voting, meetings, and document management.",
    },
    {
      question: "How much does CommUnity Connect cost?",
      answer:
        "We offer three pricing tiers to fit communities of all sizes: Basic ($99/month for up to 50 units), Standard ($199/month for up to 150 units), and Pro ($399/month for up to 500 units). All plans include core features with varying levels of support and advanced capabilities. Visit our Pricing page for detailed information.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a 30-day free trial with full access to all features. No credit card is required to start your trial. This gives your board and community members time to explore the platform and see how it can benefit your HOA.",
    },
    {
      question: "How long does it take to set up CommUnity Connect?",
      answer:
        "Most communities are up and running within 1-2 weeks. Our onboarding team will guide you through the setup process, including importing your resident data, configuring your community settings, and training your board members. The timeline can vary based on your community's size and complexity.",
    },
    {
      question: "Can residents access the platform?",
      answer:
        "Absolutely! CommUnity Connect is designed for both board members and residents. Residents can log in to view announcements, submit requests, pay dues, vote on community matters, and access important documents. The platform promotes transparency and engagement across your entire community.",
    },
    {
      question: "Is my community's data secure?",
      answer:
        "Security is our top priority. We use enterprise-grade encryption, secure data centers, and regular security audits to protect your information. All data is backed up daily, and we comply with industry-standard security protocols. Your community's sensitive information is safe with us.",
    },
  ];

  const technicalFAQs = [
    {
      question: "What devices and browsers are supported?",
      answer:
        "CommUnity Connect works on all modern devices including desktops, laptops, tablets, and smartphones. We support the latest versions of Chrome, Firefox, Safari, and Edge browsers. Our mobile-responsive design ensures a seamless experience across all screen sizes.",
    },
    {
      question: "Do you offer mobile apps?",
      answer:
        "Yes! We offer native mobile apps for both iOS and Android devices. Residents and board members can download our apps from the App Store or Google Play to access all platform features on the go, receive push notifications, and stay connected with their community.",
    },
    {
      question: "Can I import existing data from another system?",
      answer:
        "Yes, we provide data migration services to help you transition from your current system. Our team will work with you to import resident information, financial records, documents, and other important data. We support various file formats and can customize the import process to meet your needs.",
    },
    {
      question: "Does CommUnity Connect integrate with accounting software?",
      answer:
        "Yes, we integrate with popular accounting platforms including QuickBooks and Xero. This allows you to sync financial data, streamline bookkeeping, and maintain accurate records across systems. Our integration capabilities help reduce manual data entry and minimize errors.",
    },
    {
      question: "What kind of customer support do you provide?",
      answer:
        "We offer multiple support channels including email, phone, and live chat. Our Standard and Pro plans include priority support with faster response times. We also provide a comprehensive knowledge base, video tutorials, and regular webinars to help you get the most out of the platform.",
    },
    {
      question: "Can I customize the platform for my community?",
      answer:
        "Yes! CommUnity Connect offers extensive customization options. You can add your community logo, customize colors, create custom forms, set up automated workflows, and configure features to match your specific needs. Our Pro plan includes advanced customization capabilities.",
    },
  ];

  const paymentFAQs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), ACH bank transfers, and electronic checks. Residents can set up automatic recurring payments for HOA dues, and we support one-time payments for special assessments or fees.",
    },
    {
      question: "Are there any transaction fees?",
      answer:
        "Transaction fees vary by payment method. Credit card payments typically incur a 2.9% + $0.30 fee, while ACH transfers have a lower fee of 1% (capped at $5). These fees can be passed on to residents or absorbed by the HOA, depending on your preference.",
    },
    {
      question: "How quickly are payments processed?",
      answer:
        "Credit card payments are processed immediately and funds are typically available in your account within 2-3 business days. ACH transfers take 3-5 business days to process. All payment activity is tracked in real-time within the platform for complete transparency.",
    },
    {
      question: "Can residents set up automatic payments?",
      answer:
        "Yes! Residents can easily set up recurring automatic payments for their monthly or quarterly HOA dues. They can choose their preferred payment method and schedule, and payments will be processed automatically on the specified date. This helps improve collection rates and reduces late payments.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about CommUnity Connect
            </p>
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              General Questions
            </h2>
            <p className="text-lg text-gray-600">
              Learn about CommUnity Connect and how it works
            </p>
          </div>

          <div className="space-y-4">
            {generalFAQs.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Technical FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Technical Questions
            </h2>
            <p className="text-lg text-gray-600">
              Platform features, integrations, and support
            </p>
          </div>

          <div className="space-y-4">
            {technicalFAQs.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Payment FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Payments & Billing
            </h2>
            <p className="text-lg text-gray-600">
              Information about payments and transactions
            </p>
          </div>

          <div className="space-y-4">
            {paymentFAQs.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
