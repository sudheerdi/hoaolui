"use client";

import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import { useState } from "react";

export default function ServicesPage() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const services = [
    {
      id: 1,
      icon: "ri-community-line",
      title: "Self HOA Board",
      description:
        "Empower your community board with comprehensive tools to manage your HOA independently. Take control of your community operations with ease.",
      image:
        "https://readdy.ai/api/search-image?query=professional%20community%20board%20meeting%20diverse%20people%20collaborating%20modern%20office%20setting%20purple%20accents%20teamwork%20community%20management%20HOA%20board%20members%20discussing%20plans&width=400&height=300&seq=service-hoa-board&orientation=landscape",
      features: [
        "Board Member Portal Access",
        "Meeting Management Tools",
        "Voting & Decision Making",
        "Community Governance",
        "Financial Oversight",
        "Document Management",
      ],
      link: "/signup/hoa-board",
    },
    {
      id: 2,
      icon: "ri-building-line",
      title: "Property Manager",
      description:
        "Professional property management solutions designed to streamline operations and enhance efficiency for managing multiple communities.",
      image:
        "https://readdy.ai/api/search-image?query=professional%20property%20manager%20in%20business%20attire%20reviewing%20documents%20at%20modern%20apartment%20complex%20residential%20buildings%20property%20management%20professional%20with%20tablet%20inspecting%20facilities%20clean%20simple%20background&width=400&height=300&seq=service-property-manager-v3&orientation=landscape",
      features: [
        "Multi-Property Management",
        "Tenant Communication",
        "Maintenance Coordination",
        "Financial Reporting",
        "Compliance Tracking",
        "Vendor Management",
      ],
      link: "/signup/property-manager",
    },
    {
      id: 3,
      icon: "ri-tools-line",
      title: "Home Service Provider",
      description:
        "Connect with communities and grow your service business. Offer your professional services to HOAs and property managers efficiently.",
      image:
        "https://readdy.ai/api/search-image?query=professional%20home%20service%20provider%20with%20tools%20working%20on%20residential%20property%20purple%20accents%20contractor%20technician%20maintenance%20worker%20professional%20service%20quality%20workmanship&width=400&height=300&seq=service-provider&orientation=landscape",
      features: [
        "Service Marketplace Access",
        "Job Request Management",
        "Scheduling & Dispatch",
        "Invoice & Payment Processing",
        "Customer Reviews",
        "Business Growth Tools",
      ],
      link: "/signup/service-provider",
      hideOnMobile: true,
    },
    {
      id: 4,
      icon: "ri-hammer-line",
      title: "Home Builder",
      description:
        "Seamlessly manage new construction communities and homeowner transitions. Build stronger relationships from groundbreaking to move-in.",
      image:
        "https://readdy.ai/api/search-image?query=professional%20home%20builder%20construction%20site%20modern%20residential%20development%20purple%20theme%20architect%20reviewing%20blueprints%20new%20home%20construction%20quality%20building&width=400&height=300&seq=service-home-builder&orientation=landscape",
      features: [
        "New Community Setup",
        "Homeowner Onboarding",
        "Construction Updates",
        "Warranty Management",
        "HOA Transition Tools",
        "Builder Portal Access",
      ],
      link: "/signup/home-builder",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Services Grid */}
      <section className="pt-16 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col ${
                  service.hideOnMobile ? "hidden md:flex" : ""
                }`}
              >
                {/* Service Image */}
                <div className="h-32 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Service Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-300"
                    style={{ backgroundColor: "#E8F5F0" }}
                  >
                    <i
                      className={`${service.icon} text-xl`}
                      style={{ color: "#1FA372" }}
                    ></i>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Read More Button */}
                  <button
                    onClick={() => toggleCard(service.id)}
                    className="text-sm font-semibold mb-3 text-left whitespace-nowrap cursor-pointer hover:underline"
                    style={{ color: "#1FA372" }}
                  >
                    {expandedCards.includes(service.id)
                      ? "Show Less"
                      : "Read More"}
                  </button>

                  {/* Features - Collapsible */}
                  {expandedCards.includes(service.id) && (
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <i
                            className="ri-check-line text-lg mr-2 flex-shrink-0 mt-0.5"
                            style={{ color: "#1FA372" }}
                          ></i>
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Get Started Button */}
                  <a
                    href={service.link}
                    className="w-full text-white py-2.5 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-center whitespace-nowrap cursor-pointer mt-auto block text-sm"
                    style={{ backgroundColor: "#1FA372" }}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
