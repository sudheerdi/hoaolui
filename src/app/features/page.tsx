"use client";

import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import Card from "../../components/base/Card";

export default function Features() {
  const features = [
    {
      icon: "ri-bank-card-line",
      title: "Accounting & Finance",
      description:
        "Comprehensive financial management solutions for your HOA community. Our platform streamlines billing, payments, budgeting, and financial reporting. Manage accounts payable, vendor relationships, and access professional bookkeeping services. Ensure financial transparency and compliance with integrated bank connections and detailed financial tracking.",
      details: [
        "Bills & Payments",
        "Community Accounting & Financial Administration",
        "Budget Planning & Financial Reporting",
        "Bank Integrations",
        "Accounts Payable & Vendor Management",
        "Professional HOA Bookkeeping Services",
        "Tax Services",
        "Book Keeping",
      ],
      image:
        "https://readdy.ai/api/search-image?query=Modern%20professional%20accounting%20and%20finance%20dashboard%20with%20financial%20charts%20graphs%20and%20budget%20planning%20tools%20on%20computer%20screen%20in%20bright%20office%20environment%20with%20calculator%20and%20financial%20documents%20clean%20minimalist%20business%20setting&width=600&height=400&seq=feature1&orientation=landscape",
    },
    {
      icon: "ri-message-3-line",
      title: "Communication",
      description:
        "Keep your community connected and informed with powerful communication tools. Send multi-channel messages, automate mail and postal communications, and maintain active message boards. Ensure every resident stays updated with important announcements, events, and community news through seamless communication channels.",
      details: [
        "Multi-Channel Community Messaging",
        "Mails & Postal Automation",
        "Message Boards",
      ],
      image:
        "https://readdy.ai/api/search-image?query=Modern%20community%20communication%20platform%20showing%20messaging%20interface%20with%20notifications%20email%20automation%20and%20message%20boards%20on%20multiple%20devices%20smartphone%20tablet%20and%20laptop%20in%20bright%20collaborative%20workspace%20setting&width=600&height=400&seq=feature2&orientation=landscape",
    },
    {
      icon: "ri-building-line",
      title: "Association Management",
      description:
        "Simplify HOA operations with comprehensive association management tools. Track compliance, manage violations, utilize request templates, organize documents, and facilitate online voting. Provide residents with a dedicated homeowner portal for easy access to community information and services.",
      details: [
        "Compliance & Violation Management",
        "Request Templates",
        "Manage Documents",
        "Online Voting",
        "Homeowner Portal",
      ],
      image:
        "https://readdy.ai/api/search-image?query=Professional%20HOA%20association%20management%20dashboard%20showing%20compliance%20tracking%20violation%20management%20document%20organization%20and%20online%20voting%20interface%20on%20modern%20computer%20screen%20in%20organized%20office%20environment%20with%20community%20documents&width=600&height=400&seq=feature3&orientation=landscape",
    },
    {
      icon: "ri-shield-check-line",
      title: "Platform & Support",
      description:
        "Built on a robust and secure platform designed for reliability and ease of use. Enjoy seamless system integrations, enterprise-grade security, data protection, and dedicated customer support. Our platform ensures your community management operations run smoothly with 24/7 technical assistance and comprehensive service operations.",
      details: [
        "System Integrations & Connectivity",
        "Platform Security & Data Protection",
        "Customer Support & Service Operations",
      ],
      image:
        "https://readdy.ai/api/search-image?query=Modern%20cloud%20platform%20infrastructure%20with%20security%20shields%20data%20protection%20symbols%20system%20integration%20icons%20and%20customer%20support%20interface%20on%20multiple%20screens%20in%20high-tech%20data%20center%20environment%20with%20blue%20lighting&width=600&height=400&seq=feature4&orientation=landscape",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Modern HOAs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how CommUnity Connect streamlines every aspect of
            homeowners association management with our comprehensive feature
            set.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: "#E8F5F0" }}
                    >
                      <i
                        className={`${feature.icon} text-xl`}
                        style={{ color: "#1FA372" }}
                      ></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {feature.title}
                    </h2>
                  </div>

                  <p className="text-xl text-gray-600 mb-8">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-5 h-5 flex items-center justify-center text-green-600 mt-0.5">
                          <i className="ri-check-line"></i>
                        </div>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Card className="overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-64 object-cover object-top"
                    />
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your HOA Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of communities already using CommUnity Connect to
            streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: "#1FA372" }}
            >
              Start Free Trial
            </button>
            <button
              className="border-2 px-8 py-4 rounded-lg font-semibold hover:text-white transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ borderColor: "#1FA372", color: "#1FA372" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1FA372";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#1FA372";
              }}
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
