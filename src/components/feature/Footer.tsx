export default function Footer() {
  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Blog', href: '#' }
  ];

  const productLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Security', href: '#' },
    { name: 'API', href: '#' }
  ];

  const resourceLinks = [
    { name: 'Documentation', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Webinars', href: '#' }
  ];

  const contactLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Support', href: '#' },
    { name: 'Sales', href: '#' },
    { name: 'Partners', href: '#' }
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Mobile - Only Copyright */}
      <div className="md:hidden py-6 text-center">
        <p className="text-gray-600 text-sm">
          © 2024 CommUnity Connect. All rights reserved.
        </p>
      </div>

      {/* Tablet & Desktop - Full Footer */}
      <div className="hidden md:block container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#1FA372] rounded-lg flex items-center justify-center">
                <i className="ri-home-4-line text-white text-xl"></i>
              </div>
              <div>
                <div className="font-bold text-lg text-black">HOA Portal</div>
                <div className="text-xs text-gray-500">Community Management</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Streamline your HOA operations with our comprehensive management platform.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-black font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600 hover:text-black text-sm cursor-pointer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-black font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600 hover:text-black text-sm cursor-pointer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-black font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600 hover:text-black text-sm cursor-pointer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-black font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600 hover:text-black text-sm cursor-pointer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 CommUnity Connect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-black text-sm cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-black text-sm cursor-pointer">Terms of Service</a>
            <a href="https://readdy.ai/?origin=logo" className="text-gray-600 hover:text-black text-sm cursor-pointer">Website Builder</a>
          </div>
        </div>
      </div>
    </footer>
  );
}