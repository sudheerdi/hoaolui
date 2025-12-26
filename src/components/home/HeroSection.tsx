import { useRouter } from "next/navigation";
import Button from "../../components/base/Button";

export default function HeroSection() {
  const router = useRouter();

  const handleFreeTrialClick = () => {
    router.push("/signup/hoa-board");
  };

  const handleViewFeaturesClick = () => {
    router.push("/features");
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url(https://readdy.ai/api/search-image?query=modern%20residential%20community%20aerial%20view%20with%20beautiful%20homes%20green%20spaces%20and%20organized%20neighborhoods%20in%20bright%20daylight%20professional%20real%20estate%20photography%20clean%20minimalist%20aesthetic%20with%20soft%20natural%20lighting%20and%20vibrant%20colors%20showing%20well%20maintained%20properties&width=1920&height=1080&seq=hero-community-001&orientation=landscape)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Smarter HOA Management for{" "}
              <span style={{ color: "#1FA372" }}>Modern Communities</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              Manage payments, approvals, meetings, violations, and community
              engagement—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg"
                onClick={handleFreeTrialClick}
                style={{ backgroundColor: "#1FA372", color: "white" }}
              >
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-gift-line"></i>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold">Start 30 Days Free Trial</span>
                  <span className="text-xs font-normal">
                    No credit card required • Cancel anytime
                  </span>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg"
                style={{ borderColor: "#1FA372", color: "#1FA372" }}
                onClick={handleViewFeaturesClick}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.backgroundColor = "#1FA372";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#1FA372";
                }}
              >
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-eye-line"></i>
                </div>
                View Features
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-300">
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#1FA372" }}
                >
                  500+
                </div>
                <div className="text-gray-600 text-sm">Communities</div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#1FA372" }}
                >
                  50K+
                </div>
                <div className="text-gray-600 text-sm">Residents</div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#1FA372" }}
                >
                  99.9%
                </div>
                <div className="text-gray-600 text-sm">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20HOA%20management%20dashboard%20interface%20with%20clean%20green%20and%20white%20design%20showing%20community%20analytics%20charts%20graphs%20and%20data%20visualization%20professional%20software%20application%20with%20organized%20layout%20residential%20property%20management%20system%20sleek%20contemporary%20UI%20design%20high%20quality%20digital%20interface&width=600&height=400&seq=dashboard-green-preview&orientation=landscape"
                alt="HOA Management Dashboard"
                className="w-full h-auto rounded-lg object-cover"
              />
              <div
                className="absolute -top-4 -right-4 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                style={{ backgroundColor: "#1FA372" }}
              >
                Live Demo
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#1FA372" }}
                ></div>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  System Online
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#1FA372" }}
                >
                  $2.5M
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  Payments Processed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
