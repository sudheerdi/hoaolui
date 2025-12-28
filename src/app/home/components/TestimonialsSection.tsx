import Card from '../../../components/base/Card';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HOA Board President',
      community: 'Sunset Ridge Community',
      image: 'https://readdy.ai/api/search-image?query=Professional%20middle%20aged%20woman%20with%20friendly%20smile%2C%20business%20headshot%20portrait%2C%20clean%20background%2C%20professional%20lighting%2C%20confident%20and%20approachable%20expression%2C%20business%20attire%2C%20high%20quality%20corporate%20photography%2C%20warm%20and%20trustworthy%20appearance&width=150&height=150&seq=testimonial-1&orientation=squarish',
      quote: 'CommUnity Connect transformed how we manage our 200-home community. Payment collection is now automated, and residents love the transparency.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Property Manager',
      community: 'Oakwood Estates',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20man%20in%20business%20suit%2C%20confident%20headshot%20portrait%2C%20clean%20background%2C%20professional%20lighting%2C%20friendly%20and%20competent%20expression%2C%20modern%20business%20attire%2C%20high%20quality%20corporate%20photography%2C%20trustworthy%20appearance&width=150&height=150&seq=testimonial-2&orientation=squarish',
      quote: 'The violation tracking and approval workflows have saved us countless hours. Our board meetings are now more efficient than ever.',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Community Resident',
      community: 'Pine Valley HOA',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Hispanic%20woman%20with%20warm%20smile%2C%20business%20headshot%20portrait%2C%20clean%20background%2C%20professional%20lighting%2C%20friendly%20and%20approachable%20expression%2C%20professional%20attire%2C%20high%20quality%20corporate%20photography%2C%20confident%20appearance&width=150&height=150&seq=testimonial-3&orientation=squarish',
      quote: 'Finally, an HOA platform that actually works! I can pay dues, submit requests, and stay informed about community events all in one place.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Communities Nationwide
          </h2>
          <p className="text-xl text-gray-600">
            See what HOA leaders and residents are saying about our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center">
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="w-5 h-5 flex items-center justify-center text-yellow-400">
                    <i className="ri-star-fill"></i>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-600 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Profile */}
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm" style={{ color: '#1FA372' }}>{testimonial.role}</div>
                  <div className="text-xs text-gray-500">{testimonial.community}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
