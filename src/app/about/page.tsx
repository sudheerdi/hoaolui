"use client";

import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About CommUnity Connect
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering HOA communities with modern, efficient management
              solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At CommUnity Connect, we believe that managing a homeowners
                association should be simple, transparent, and efficient. Our
                mission is to provide HOA boards and community members with the
                tools they need to create thriving, well-managed neighborhoods.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to building technology that brings communities
                together, streamlines administrative tasks, and enhances
                communication between board members and residents.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20diverse%20community%20members%20collaborating%20together%20in%20a%20bright%20contemporary%20office%20space%20with%20large%20windows%20showing%20residential%20neighborhood%2C%20professional%20business%20atmosphere%2C%20people%20working%20on%20laptops%20and%20tablets%2C%20warm%20natural%20lighting%2C%20clean%20minimalist%20interior%20design%2C%20teamwork%20and%20cooperation%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=about-mission-1&orientation=landscape"
                alt="Our Mission"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at CommUnity Connect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-shield-check-line text-2xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Trust & Transparency
              </h3>
              <p className="text-gray-600">
                We build trust through transparent operations, clear
                communication, and honest relationships with our community
                partners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-lightbulb-line text-2xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600">
                We continuously evolve our platform with cutting-edge technology
                to meet the changing needs of modern communities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-team-line text-2xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community First
              </h3>
              <p className="text-gray-600">
                Every feature we build is designed with community needs in mind,
                ensuring better living experiences for all residents.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-customer-service-2-line text-2xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Exceptional Support
              </h3>
              <p className="text-gray-600">
                Our dedicated support team is always ready to help, ensuring you
                get the most out of our platform.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-lock-line text-2xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Security
              </h3>
              <p className="text-gray-600">
                We prioritize the security of your data with enterprise-grade
                encryption and regular security audits.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-rocket-line text-2xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Simplicity
              </h3>
              <p className="text-gray-600">
                We believe powerful software should be easy to use, making
                complex tasks simple and intuitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20startup%20office%20environment%20with%20team%20brainstorming%20around%20whiteboard%2C%20contemporary%20workspace%20with%20glass%20walls%2C%20collaborative%20atmosphere%2C%20diverse%20professionals%20planning%20and%20strategizing%2C%20natural%20daylight%2C%20clean%20professional%20setting%2C%20innovation%20and%20creativity%2C%20high%20quality%20business%20photography&width=600&height=400&seq=about-story-1&orientation=landscape"
                alt="Our Story"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                CommUnity Connect was founded by a team of HOA board members and
                technology experts who experienced firsthand the challenges of
                managing community associations with outdated tools and
                fragmented systems.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Frustrated by inefficient processes, poor communication, and
                lack of transparency, we set out to create a better solution.
                What started as a simple project to help our own communities has
                grown into a comprehensive platform serving thousands of HOAs
                across the country.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to be the trusted partner for communities of
                all sizes, helping them operate more efficiently and build
                stronger connections among residents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to your community's success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20business%20headshot%20portrait%20of%20confident%20female%20CEO%20executive%20in%20modern%20office%2C%20wearing%20business%20attire%2C%20warm%20smile%2C%20natural%20lighting%2C%20clean%20white%20background%2C%20corporate%20professional%20photography%2C%20leadership%20presence&width=300&height=300&seq=team-ceo-1&orientation=squarish"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sarah Johnson
              </h3>
              <p className="text-purple-600 font-medium mb-2">
                CEO & Co-Founder
              </p>
              <p className="text-gray-600 text-sm">
                Former HOA President with 15 years of community management
                experience
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20business%20headshot%20portrait%20of%20male%20technology%20executive%20CTO%20in%20modern%20office%2C%20wearing%20business%20casual%20attire%2C%20confident%20expression%2C%20natural%20lighting%2C%20clean%20white%20background%2C%20corporate%20professional%20photography%2C%20tech%20leadership&width=300&height=300&seq=team-cto-1&orientation=squarish"
                  alt="Michael Chen"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Michael Chen
              </h3>
              <p className="text-purple-600 font-medium mb-2">
                CTO & Co-Founder
              </p>
              <p className="text-gray-600 text-sm">
                Software architect with expertise in building scalable SaaS
                platforms
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20business%20headshot%20portrait%20of%20female%20customer%20success%20director%20in%20modern%20office%2C%20friendly%20approachable%20smile%2C%20wearing%20professional%20attire%2C%20natural%20lighting%2C%20clean%20white%20background%2C%20corporate%20professional%20photography%2C%20customer%20service%20excellence&width=300&height=300&seq=team-cs-1&orientation=squarish"
                  alt="Emily Rodriguez"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Emily Rodriguez
              </h3>
              <p className="text-purple-600 font-medium mb-2">
                Head of Customer Success
              </p>
              <p className="text-gray-600 text-sm">
                Dedicated to ensuring every community achieves their goals
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20business%20headshot%20portrait%20of%20male%20product%20manager%20in%20modern%20office%2C%20intelligent%20focused%20expression%2C%20wearing%20smart%20casual%20attire%2C%20natural%20lighting%2C%20clean%20white%20background%2C%20corporate%20professional%20photography%2C%20innovation%20mindset&width=300&height=300&seq=team-product-1&orientation=squarish"
                  alt="David Park"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                David Park
              </h3>
              <p className="text-purple-600 font-medium mb-2">
                Head of Product
              </p>
              <p className="text-gray-600 text-sm">
                Passionate about creating intuitive user experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
