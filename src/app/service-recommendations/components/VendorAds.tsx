
export default function VendorAds() {
  const vendors = [
    {
      id: 1,
      name: 'Elite Electrical',
      category: 'Electrical',
      icon: 'ri-flashlight-line',
      rating: 4.9,
      reviews: 127,
      description: 'Licensed electricians for all your electrical needs',
      phone: '(555) 123-4567',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 2,
      name: 'Pro Plumbing',
      category: 'Plumbing',
      icon: 'ri-drop-line',
      rating: 4.8,
      reviews: 89,
      description: 'Emergency plumbing services 24/7',
      phone: '(555) 234-5678',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      name: 'Green Gardens',
      category: 'Gardening',
      icon: 'ri-plant-line',
      rating: 4.7,
      reviews: 156,
      description: 'Landscaping and garden maintenance',
      phone: '(555) 345-6789',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      name: 'Fix-It Fast',
      category: 'Maintenance',
      icon: 'ri-tools-line',
      rating: 4.6,
      reviews: 203,
      description: 'General maintenance and repairs',
      phone: '(555) 456-7890',
      color: 'bg-gray-100 text-gray-600'
    },
    {
      id: 5,
      name: 'Clean Sweep',
      category: 'Cleaning',
      icon: 'ri-brush-line',
      rating: 4.9,
      reviews: 94,
      description: 'Professional cleaning services',
      phone: '(555) 567-8901',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 6,
      name: 'Secure Systems',
      category: 'Security',
      icon: 'ri-shield-check-line',
      rating: 4.8,
      reviews: 78,
      description: 'Home security installation & monitoring',
      phone: '(555) 678-9012',
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 7,
      name: 'Cool Air HVAC',
      category: 'HVAC',
      icon: 'ri-temp-cold-line',
      rating: 4.7,
      reviews: 112,
      description: 'Heating, cooling & ventilation experts',
      phone: '(555) 789-0123',
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      id: 8,
      name: 'Roof Masters',
      category: 'Roofing',
      icon: 'ri-home-4-line',
      rating: 4.6,
      reviews: 67,
      description: 'Roof repair and replacement specialists',
      phone: '(555) 890-1234',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 9,
      name: 'Paint Pro',
      category: 'Painting',
      icon: 'ri-brush-2-line',
      rating: 4.8,
      reviews: 145,
      description: 'Interior and exterior painting services',
      phone: '(555) 901-2345',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      id: 10,
      name: 'Floor Masters',
      category: 'Flooring',
      icon: 'ri-home-2-line',
      rating: 4.7,
      reviews: 98,
      description: 'Hardwood, tile, and carpet installation',
      phone: '(555) 012-3456',
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  return (
    <div className="h-full flex flex-col border-l border-gray-200 bg-white rounded-r-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h3 className="font-semibold text-black text-base">Recommended Vendors</h3>
        <p className="text-sm text-gray-600 mt-1">Trusted service providers in your area</p>
      </div>

      {/* Vendor Cards - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${vendor.color}`}>
                <i className={`${vendor.icon} w-5 h-5 flex items-center justify-center`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-black text-base truncate">{vendor.name}</h4>
                <p className="text-xs text-gray-500 mb-1">{vendor.category}</p>
                <p className="text-xs text-gray-600 mb-2">{vendor.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star-${i < Math.floor(vendor.rating) ? 'fill' : 'line'} text-xs ${
                            i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'
                          } w-3 h-3 flex items-center justify-center`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({vendor.reviews})</span>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-600">{vendor.phone}</span>
                  <button className="text-xs text-[#1FA372] hover:text-[#188a5e] font-semibold cursor-pointer">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <button className="w-full px-4 py-2 text-sm text-[#1FA372] font-semibold border border-[#1FA372] rounded-lg hover:bg-[#1FA372] hover:text-white transition-colors cursor-pointer whitespace-nowrap">
          View All Vendors
        </button>
      </div>
    </div>
  );
}
