import { useState, useEffect } from "react";
import Button from "../base/Button";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faqs" },
    { name: "Contact Us", href: "/contact" },
  ];

  const userTypes = [
    {
      title: "Self HOA Board",
      description: "Manage your community board",
      icon: "ri-community-line",
      href: "/signup/hoa-board",
    },
    {
      title: "Property Manager",
      description: "Professional property management",
      icon: "ri-building-line",
      href: "/signup/property-manager",
    },
    {
      title: "Home Service Provider",
      description: "Offer services to communities",
      icon: "ri-tools-line",
      href: "/signup/service-provider",
      hideOnMobile: true,
    },
    {
      title: "Home Builder",
      description: "Build and develop properties",
      icon: "ri-hammer-line",
      href: "/signup/home-builder",
    },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Top Row - Logo, Home Service Pro, Login, Sign In */}
          <div className="flex justify-between items-center h-16 border-b border-gray-100">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 cursor-pointer">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-lg"
                style={{ backgroundColor: "#1FA372" }}
              >
                <i className="ri-home-heart-line text-2xl text-white"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-black">HOA Portal</span>
                <span className="text-xs text-gray-500">
                  Community Management
                </span>
              </div>
            </a>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-3">
              {/* Hide Home Service Pro button on mobile */}
              <button
                onClick={() => router.push("/signup/service-provider")}
                className="text-gray-700 px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap hidden md:block"
                style={{ color: "#1FA372" }}
              >
                Home Service Pro
              </button>
              <button
                onClick={() => router.push("/login")}
                className="text-gray-700 px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap hidden lg:block"
                style={{ color: "#1FA372" }}
              >
                Login
              </button>
              <Button
                size="sm"
                onClick={() => setShowSignInModal(true)}
                data-signin-trigger
                className="hidden lg:block"
              >
                Sign In
              </Button>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 cursor-pointer"
                  style={{ color: "#1FA372" }}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i
                      className={`ri-${
                        isMenuOpen ? "close" : "menu"
                      }-line text-xl`}
                    ></i>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row - Main Navigation - Hidden on mobile */}
          <div className="hidden lg:flex justify-center items-center h-14">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-2 text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap relative ${
                    currentPath === item.href
                      ? "text-black font-bold"
                      : "text-gray-700 font-medium hover:text-black"
                  }`}
                  style={
                    currentPath === item.href
                      ? { borderBottom: "5px solid #000000" }
                      : {}
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left px-3 py-2 text-base cursor-pointer ${
                      currentPath === item.href
                        ? "text-black font-bold bg-gray-50"
                        : "text-gray-700 font-medium hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={() => router.push("/login")}
                  className="block w-full text-left px-3 py-2 text-base font-medium cursor-pointer"
                  style={{ color: "#1FA372" }}
                >
                  Login
                </button>
                <div className="px-3 py-2">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setShowSignInModal(true)}
                    data-signin-trigger
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Choose Your Account Type
                </h2>
                <button
                  onClick={() => setShowSignInModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-close-line text-2xl"></i>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userTypes.map((type) =>
                  !type.hideOnMobile || window.innerWidth >= 768 ? (
                    <button
                      key={type.title}
                      onClick={() => {
                        setShowSignInModal(false);
                        router.push(type.href);
                      }}
                      className={`bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group text-left ${
                        type.hideOnMobile ? "hidden md:block" : ""
                      }`}
                      style={{
                        borderColor:
                          currentPath === type.href ? "#1FA372" : undefined,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "#1FA372")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor =
                          currentPath === type.href ? "#1FA372" : "#e5e7eb")
                      }
                    >
                      <div
                        className="w-16 h-16 flex items-center justify-center rounded-full mb-4 transition-colors duration-200"
                        style={{ backgroundColor: "#1FA372" }}
                      >
                        <i className={`${type.icon} text-3xl text-white`}></i>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {type.title}
                      </h3>
                      <p className="text-gray-600">{type.description}</p>
                    </button>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
