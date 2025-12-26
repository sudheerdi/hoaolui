'use client';

interface VendorDetailsPanelProps {
  vendor: any;
  onClose: () => void;
}

export default function VendorDetailsPanel({ vendor, onClose }: VendorDetailsPanelProps) {
  return (
    <>
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Vendor Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <img src={vendor.logo} alt={vendor.name} className="w-20 h-20 rounded-lg object-cover" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
              <p className="text-base font-medium text-black">{vendor.accountNumber}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Vendor Name
              </label>
              <p className="text-base font-medium text-black">{vendor.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Address
              </label>
              <p className="text-base font-medium text-black">{vendor.address}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Email
              </label>
              <p className="text-base font-medium text-black">{vendor.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <p className="text-base font-medium text-black">{vendor.phone}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Company Information
              </label>
              <p className="text-base font-medium text-black">{vendor.companyInfo}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Account Number
              </label>
              <p className="text-base font-medium text-black">{vendor.accountNumber}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                EIN Number
              </label>
              <p className="text-base font-medium text-black">{vendor.ein}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Website
              </label>
              <p className="text-base font-medium text-teal-600">{vendor.website}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Department
              </label>
              <p className="text-base font-medium text-black">{vendor.department}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black uppercase tracking-wider mb-1">
                Recent Payment
              </label>
              <p className="text-base font-medium text-black">{vendor.recentPayment}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
