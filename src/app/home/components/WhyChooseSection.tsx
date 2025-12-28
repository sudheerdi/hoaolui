
export default function WhyChooseSection() {
  const benefits = [
    {
      icon: 'ri-smartphone-line',
      title: 'Modern UI',
      description: 'Intuitive, mobile-first design that residents and board members love to use.'
    },
    {
      icon: 'ri-cloud-line',
      title: '100% Cloud Based',
      description: 'Access your community data anywhere, anytime with enterprise-grade security.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Secure & Reliable',
      description: 'Bank-level encryption and 99.9% uptime guarantee for peace of mind.'
    },
    {
      icon: 'ri-team-line',
      title: 'Multi-role Support',
      description: 'Customized dashboards for board members, property managers, and residents.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose CommUnity Connect?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Built specifically for modern HOAs, our platform combines powerful functionality with an elegant user experience.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8F5F0' }}>
                    <i className={`${benefit.icon} text-xl`} style={{ color: '#1FA372' }}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src="https://readdy.ai/api/search-image?query=Professional%20business%20team%20working%20together%20in%20modern%20office%20environment%2C%20diverse%20group%20of%20people%20collaborating%20on%20community%20management%20project%2C%20clean%20modern%20workspace%20with%20computers%20and%20documents%2C%20bright%20natural%20lighting%2C%20professional%20corporate%20photography%2C%20teamwork%20and%20collaboration%20concept%2C%20high%20quality%20business%20imagery&width=600&height=500&seq=team-collaboration&orientation=landscape"
              alt="Professional team collaboration"
              className="rounded-2xl shadow-2xl object-cover w-full h-96"
            />
            
            {/* Overlay Stats */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold" style={{ color: '#1FA372' }}>24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">5★</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">Fast</div>
                    <div className="text-xs text-gray-600">Setup</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
