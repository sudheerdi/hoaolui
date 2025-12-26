"use client";

import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "HOA President",
      community: "Sunset Hills Community",
      location: "Phoenix, AZ",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20confident%20hispanic%20female%20HOA%20president%20in%20her%2040s%2C%20warm%20friendly%20smile%2C%20wearing%20business%20casual%20attire%2C%20outdoor%20residential%20community%20background%2C%20natural%20lighting%2C%20approachable%20leadership%20presence%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-1&orientation=squarish",
      quote:
        "CommUnity Connect has transformed how we manage our 200-unit community. What used to take hours of manual work now happens automatically. Our residents love the transparency and ease of use.",
      rating: 5,
    },
    {
      name: "Robert Thompson",
      role: "Board Treasurer",
      community: "Lakeside Estates",
      location: "Orlando, FL",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20mature%20caucasian%20male%20treasurer%20in%20his%2050s%2C%20confident%20professional%20expression%2C%20wearing%20business%20attire%2C%20modern%20office%20background%2C%20natural%20lighting%2C%20trustworthy%20financial%20expert%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-2&orientation=squarish",
      quote:
        "The financial management tools are outstanding. Tracking payments, generating reports, and managing our budget has never been easier. This platform pays for itself in time saved alone.",
      rating: 5,
    },
    {
      name: "Lisa Chen",
      role: "Community Manager",
      community: "Riverside Gardens",
      location: "Seattle, WA",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20asian%20female%20community%20manager%20in%20her%2030s%2C%20intelligent%20friendly%20smile%2C%20wearing%20professional%20attire%2C%20residential%20community%20setting%20background%2C%20natural%20lighting%2C%20organized%20efficient%20professional%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-3&orientation=squarish",
      quote:
        "As a professional community manager handling multiple HOAs, CommUnity Connect has streamlined my workflow tremendously. The mobile app keeps me connected wherever I am.",
      rating: 5,
    },
    {
      name: "Michael Anderson",
      role: "HOA Vice President",
      community: "Mountain View Townhomes",
      location: "Denver, CO",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20caucasian%20male%20vice%20president%20in%20his%2040s%2C%20confident%20approachable%20expression%2C%20wearing%20smart%20casual%20attire%2C%20mountain%20residential%20background%2C%20natural%20lighting%2C%20community%20leadership%20presence%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-4&orientation=squarish",
      quote:
        "The violation tracking and approval workflows have made our board's job so much easier. Everything is documented and transparent, which has significantly reduced disputes.",
      rating: 5,
    },
    {
      name: "Patricia Williams",
      role: "Board Secretary",
      community: "Oakwood Estates",
      location: "Atlanta, GA",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20african%20american%20female%20secretary%20in%20her%2050s%2C%20warm%20professional%20smile%2C%20wearing%20elegant%20business%20attire%2C%20suburban%20residential%20background%2C%20natural%20lighting%2C%20organized%20detail-oriented%20professional%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-5&orientation=squarish",
      quote:
        "Document management and meeting minutes have never been more organized. I can find any document in seconds, and sharing information with residents is effortless.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "HOA President",
      community: "Harbor Point Condos",
      location: "San Diego, CA",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20korean%20male%20HOA%20president%20in%20his%2040s%2C%20confident%20leadership%20expression%2C%20wearing%20business%20casual%20attire%2C%20coastal%20residential%20community%20background%2C%20natural%20lighting%2C%20modern%20professional%20presence%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-6&orientation=squarish",
      quote:
        "The voting feature has increased resident participation dramatically. We went from 30% to 75% participation in community votes. It's been a game-changer for engagement.",
      rating: 5,
    },
    {
      name: "Amanda Rodriguez",
      role: "Resident & Former Board Member",
      community: "Willow Creek Homes",
      location: "Austin, TX",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20hispanic%20female%20resident%20in%20her%2030s%2C%20friendly%20approachable%20smile%2C%20wearing%20casual%20professional%20attire%2C%20modern%20residential%20neighborhood%20background%2C%20natural%20lighting%2C%20community-minded%20individual%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-7&orientation=squarish",
      quote:
        "Even as a regular resident, I appreciate how easy it is to stay informed and involved. The platform makes our community feel more connected and transparent.",
      rating: 5,
    },
    {
      name: "James Patterson",
      role: "Property Manager",
      community: "Cedar Ridge Community",
      location: "Charlotte, NC",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20caucasian%20male%20property%20manager%20in%20his%2050s%2C%20experienced%20professional%20expression%2C%20wearing%20business%20attire%2C%20residential%20property%20background%2C%20natural%20lighting%2C%20reliable%20property%20management%20expert%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-8&orientation=squarish",
      quote:
        "I've worked with many HOA management systems over the years, and CommUnity Connect is by far the most intuitive and comprehensive. The customer support is exceptional too.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Board Member",
      community: "Maple Grove Estates",
      location: "Portland, OR",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20portrait%20of%20caucasian%20female%20board%20member%20in%20her%2040s%2C%20intelligent%20confident%20smile%2C%20wearing%20professional%20casual%20attire%2C%20green%20residential%20community%20background%2C%20natural%20lighting%2C%20engaged%20community%20leader%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial-9&orientation=squarish",
      quote:
        "The automated payment reminders and online payment options have improved our collection rate significantly. Residents love the convenience, and our cash flow is more predictable.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "5,000+", label: "Communities Served" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "500K+", label: "Active Residents" },
    { number: "4.9/5", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from HOA boards and community managers who trust CommUnity
              Connect
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: "#1FA372" }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 flex items-center justify-center"
                    >
                      <i className="ri-star-fill text-yellow-400"></i>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm" style={{ color: "#1FA372" }}>
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.community}
                    </div>
                    <div className="text-xs text-gray-400">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Video Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch how CommUnity Connect has helped communities thrive
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <div className="relative h-64 bg-gradient-to-br from-purple-100 to-purple-200">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20video%20thumbnail%20showing%20diverse%20HOA%20board%20members%20in%20modern%20meeting%20room%20discussing%20community%20management%2C%20bright%20contemporary%20office%20space%2C%20collaborative%20atmosphere%2C%20people%20smiling%20and%20engaged%2C%20natural%20lighting%2C%20high%20quality%20business%20photography&width=600&height=400&seq=video-thumb-1&orientation=landscape"
                  alt="Video Testimonial"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <i
                      className="ri-play-fill text-3xl"
                      style={{ color: "#1FA372" }}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sunset Hills Success Story
                </h3>
                <p className="text-gray-600">
                  How a 200-unit community streamlined operations and increased
                  engagement
                </p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <div className="relative h-64 bg-gradient-to-br from-purple-100 to-purple-200">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20video%20thumbnail%20showing%20community%20manager%20working%20on%20laptop%20in%20modern%20office%2C%20residential%20community%20visible%20through%20window%2C%20organized%20efficient%20workspace%2C%20professional%20business%20setting%2C%20natural%20daylight%2C%20high%20quality%20business%20photography&width=600&height=400&seq=video-thumb-2&orientation=landscape"
                  alt="Video Testimonial"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <i
                      className="ri-play-fill text-3xl"
                      style={{ color: "#1FA372" }}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Property Manager Perspective
                </h3>
                <p className="text-gray-600">
                  Managing multiple communities with ease using CommUnity
                  Connect
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
