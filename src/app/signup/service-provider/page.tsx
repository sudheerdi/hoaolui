"use client";

import { useState } from "react";
import Navbar from "../../../components/feature/Navbar";
import Button from "../../../components/base/Button";
import { serviceCategories } from "../../../lib/mocks/services";
import { useRouter } from "next/navigation";

interface ServiceSelection {
  category: string;
  subcategory: string;
  service: string;
}

export default function ServiceProviderSignup() {
  const router = useRouter();
  const [serviceSelections, setServiceSelections] = useState<
    ServiceSelection[]
  >([]);

  const [hoveredCategory, setHoveredCategory] = useState<string>("");
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string>("");
  const [categoryHoverPosition, setCategoryHoverPosition] = useState<number>(0);
  const [subcategoryHoverPosition, setSubcategoryHoverPosition] =
    useState<number>(0);

  const [businessInfo, setBusinessInfo] = useState({
    companyLogo: "",
    phone: "",
    email: "",
    website: "",
    availability: "",
  });

  const [personalDetails, setPersonalDetails] = useState({
    contactName: "",
    title: "",
    directPhone: "",
    directEmail: "",
    serviceCoverageArea: "",
    verifiedVendor: false,
    preferredVendor: false,
    internalNotes: "",
    videoLinks: "",
    socialProfiles: "",
  });

  const [reviewRatings, setReviewRatings] = useState({
    verifiedVendor: false,
    preferredVendor: false,
    internalNotes: "",
  });

  const handleServiceSelect = (
    categoryName: string,
    subcategoryName: string,
    serviceName: string
  ) => {
    const newSelection = {
      category: categoryName,
      subcategory: subcategoryName,
      service: serviceName,
    };
    setServiceSelections([...serviceSelections, newSelection]);
    setHoveredCategory("");
    setHoveredSubcategory("");
  };

  const handleDeleteService = (index: number) => {
    setServiceSelections(serviceSelections.filter((_, i) => i !== index));
  };

  const handleBusinessInfoChange = (field: string, value: string) => {
    setBusinessInfo({ ...businessInfo, [field]: value });
  };

  const handlePersonalDetailsChange = (
    field: string,
    value: string | boolean
  ) => {
    setPersonalDetails({ ...personalDetails, [field]: value });
  };

  const handleReviewRatingsChange = (
    field: string,
    value: string | boolean
  ) => {
    setReviewRatings({ ...reviewRatings, [field]: value });
  };

  const handleSaveDraft = () => {
    console.log("Draft saved:", {
      serviceSelections,
      businessInfo,
      personalDetails,
      reviewRatings,
    });
  };

  const handleCreateProfile = () => {
    console.log("Profile created:", {
      serviceSelections,
      businessInfo,
      personalDetails,
      reviewRatings,
    });
    router.push("/dashboard/service-provider");
  };

  const handleCancel = () => {
    router.push("/");
  };

  const hoveredCategoryData = serviceCategories.find(
    (cat) => cat.name === hoveredCategory
  );
  const hoveredSubcategoryData = hoveredCategoryData?.subcategories.find(
    (sub) => sub.name === hoveredSubcategory
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gradient-to-br from-gray-100 to-gray-50 py-16">
        <div className="h-full px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-tools-line text-3xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Home Service Provider
              </h1>
              <p className="text-gray-600">
                Complete your service provider profile
              </p>
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden">
              {/* Left Side: Category List - Always Visible */}
              <div className="w-64 flex flex-col relative">
                <div className="border-2 border-gray-200 rounded-lg p-3 flex flex-col h-full">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    Category
                  </h3>
                  <div className="space-y-2 overflow-y-auto flex-1">
                    {serviceCategories.map((category, index) => (
                      <button
                        key={category.id}
                        onMouseEnter={(e) => {
                          setHoveredCategory(category.name);
                          const rect = e.currentTarget.getBoundingClientRect();
                          const containerRect = e.currentTarget
                            .closest(".border-2")
                            ?.getBoundingClientRect();
                          if (containerRect) {
                            setCategoryHoverPosition(
                              rect.top - containerRect.top
                            );
                          }
                        }}
                        onMouseLeave={() => {
                          // Don't clear immediately to allow moving to submenu
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer text-xs ${
                          hoveredCategory === category.name
                            ? "text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                        style={
                          hoveredCategory === category.name
                            ? { backgroundColor: "#1FA372" }
                            : {}
                        }
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategory List - Absolute Position on Hover */}
                {hoveredCategory && (
                  <div
                    className="w-64 border-2 border-gray-200 rounded-lg p-3 flex flex-col bg-white absolute left-full shadow-lg z-10"
                    style={{
                      top: `${categoryHoverPosition}px`,
                      maxHeight: "calc(100% - " + categoryHoverPosition + "px)",
                      marginLeft: "-2px",
                    }}
                    onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                    onMouseLeave={() => {
                      setHoveredCategory("");
                      setHoveredSubcategory("");
                    }}
                  >
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Sub-Category
                    </h3>
                    <div className="space-y-2 overflow-y-auto flex-1">
                      {hoveredCategoryData?.subcategories.map(
                        (subcategory, index) => (
                          <button
                            key={subcategory.id}
                            onMouseEnter={(e) => {
                              setHoveredSubcategory(subcategory.name);
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              const containerRect = e.currentTarget
                                .closest(".border-2")
                                ?.getBoundingClientRect();
                              if (containerRect) {
                                setSubcategoryHoverPosition(
                                  rect.top - containerRect.top
                                );
                              }
                            }}
                            onMouseLeave={() => {
                              // Don't clear immediately to allow moving to service menu
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer text-xs ${
                              hoveredSubcategory === subcategory.name
                                ? "text-white"
                                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                            }`}
                            style={
                              hoveredSubcategory === subcategory.name
                                ? { backgroundColor: "#1FA372" }
                                : {}
                            }
                          >
                            {subcategory.name}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Service List - Absolute Position on Subcategory Hover */}
                {hoveredSubcategory && hoveredCategory && (
                  <div
                    className="w-64 border-2 border-gray-200 rounded-lg p-3 flex flex-col bg-white absolute shadow-lg z-20"
                    style={{
                      left: "calc(100% + 254px)",
                      top: `${
                        categoryHoverPosition + subcategoryHoverPosition
                      }px`,
                      maxHeight:
                        "calc(100% - " +
                        (categoryHoverPosition + subcategoryHoverPosition) +
                        "px)",
                      marginLeft: "-2px",
                    }}
                    onMouseEnter={() => {
                      setHoveredCategory(hoveredCategory);
                      setHoveredSubcategory(hoveredSubcategory);
                    }}
                    onMouseLeave={() => {
                      setHoveredCategory("");
                      setHoveredSubcategory("");
                    }}
                  >
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Service
                    </h3>
                    <div className="space-y-2 overflow-y-auto flex-1">
                      {hoveredSubcategoryData?.services.map((service, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            handleServiceSelect(
                              hoveredCategory,
                              hoveredSubcategory,
                              service
                            )
                          }
                          className="w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer text-xs bg-gray-50 text-gray-700 hover:text-white"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#1FA372";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#f9fafb";
                            e.currentTarget.style.color = "#374151";
                          }}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Form - Always Visible */}
              <div className="flex-1 border-2 border-gray-200 rounded-xl overflow-hidden flex flex-col">
                <div className="overflow-y-auto flex-1 p-6 space-y-6">
                  {/* 1. Business Information */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                      <div
                        className="w-6 h-6 flex items-center justify-center text-white rounded-full mr-2 text-xs"
                        style={{ backgroundColor: "#1FA372" }}
                      >
                        1
                      </div>
                      Business Information
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Company Logo URL
                        </label>
                        <input
                          type="text"
                          value={businessInfo.companyLogo}
                          onChange={(e) =>
                            handleBusinessInfoChange(
                              "companyLogo",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="https://example.com/logo.png"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={businessInfo.phone}
                          onChange={(e) =>
                            handleBusinessInfoChange("phone", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={businessInfo.email}
                          onChange={(e) =>
                            handleBusinessInfoChange("email", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="business@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          value={businessInfo.website}
                          onChange={(e) =>
                            handleBusinessInfoChange("website", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="https://www.example.com"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Availability
                        </label>
                        <input
                          type="text"
                          value={businessInfo.availability}
                          onChange={(e) =>
                            handleBusinessInfoChange(
                              "availability",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="Monday - Friday, 9:00 AM - 5:00 PM"
                        />
                      </div>

                      {/* Selected Services */}
                      {serviceSelections.length > 0 && (
                        <div className="col-span-3">
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            Selected Services
                          </label>
                          <div className="space-y-2">
                            {serviceSelections.map((selection, index) => (
                              <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between"
                              >
                                <div className="grid grid-cols-3 gap-3 flex-1">
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Category
                                    </p>
                                    <p className="text-xs font-medium text-gray-900">
                                      {selection.category}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Sub-Category
                                    </p>
                                    <p className="text-xs font-medium text-gray-900">
                                      {selection.subcategory}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Service
                                    </p>
                                    <p
                                      className="text-xs font-medium"
                                      style={{ color: "#1FA372" }}
                                    >
                                      {selection.service}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDeleteService(index)}
                                  className="ml-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <i className="ri-delete-bin-line text-red-500 text-sm"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Personal Details */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                      <div
                        className="w-6 h-6 flex items-center justify-center text-white rounded-full mr-2 text-xs"
                        style={{ backgroundColor: "#1FA372" }}
                      >
                        2
                      </div>
                      Personal Details
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          value={personalDetails.contactName}
                          onChange={(e) =>
                            handlePersonalDetailsChange(
                              "contactName",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={personalDetails.title}
                          onChange={(e) =>
                            handlePersonalDetailsChange("title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="Owner / Manager"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Direct Phone
                        </label>
                        <input
                          type="tel"
                          value={personalDetails.directPhone}
                          onChange={(e) =>
                            handlePersonalDetailsChange(
                              "directPhone",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="(555) 987-6543"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Direct Email
                        </label>
                        <input
                          type="email"
                          value={personalDetails.directEmail}
                          onChange={(e) =>
                            handlePersonalDetailsChange(
                              "directEmail",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Service Coverage Area
                        </label>
                        <input
                          type="text"
                          value={personalDetails.serviceCoverageArea}
                          onChange={(e) =>
                            handlePersonalDetailsChange(
                              "serviceCoverageArea",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="e.g., Los Angeles County, Orange County"
                        />
                      </div>
                      <div className="col-span-3 flex items-center space-x-6">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={personalDetails.verifiedVendor}
                            onChange={(e) =>
                              handlePersonalDetailsChange(
                                "verifiedVendor",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                            style={{ accentColor: "#1FA372" }}
                          />
                          <span className="ml-2 text-xs font-medium text-gray-700">
                            Verified Vendor
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={personalDetails.preferredVendor}
                            onChange={(e) =>
                              handlePersonalDetailsChange(
                                "preferredVendor",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                            style={{ accentColor: "#1FA372" }}
                          />
                          <span className="ml-2 text-xs font-medium text-gray-700">
                            Preferred Vendor
                          </span>
                        </label>
                      </div>
                      <div className="col-span-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Internal Notes
                        </label>
                        <textarea
                          value={personalDetails.internalNotes}
                          onChange={(e) =>
                            handlePersonalDetailsChange(
                              "internalNotes",
                              e.target.value
                            )
                          }
                          rows={3}
                          maxLength={500}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs resize-none"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="Add any internal notes or comments..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {personalDetails.internalNotes.length}/500 characters
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Video Links
                        </label>
                        <input
                          type="text"
                          value={personalDetails.videoLinks}
                          onChange={(e) =>
                            handlePersonalDetailsChange(
                              "videoLinks",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="YouTube, Vimeo links"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Social Profiles
                        </label>
                        <input
                          type="text"
                          value={personalDetails.socialProfiles}
                          onChange={(e) =>
                            handlePersonalDetailsChange(
                              "socialProfiles",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="Facebook, LinkedIn, Instagram"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Review and Ratings */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                      <div
                        className="w-6 h-6 flex items-center justify-center text-white rounded-full mr-2 text-xs"
                        style={{ backgroundColor: "#1FA372" }}
                      >
                        3
                      </div>
                      Review and Ratings
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-6">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={reviewRatings.verifiedVendor}
                            onChange={(e) =>
                              handleReviewRatingsChange(
                                "verifiedVendor",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                            style={{ accentColor: "#1FA372" }}
                          />
                          <span className="ml-2 text-xs font-medium text-gray-700">
                            Verified Vendor
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={reviewRatings.preferredVendor}
                            onChange={(e) =>
                              handleReviewRatingsChange(
                                "preferredVendor",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                            style={{ accentColor: "#1FA372" }}
                          />
                          <span className="ml-2 text-xs font-medium text-gray-700">
                            Preferred Vendor
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Internal Notes
                        </label>
                        <textarea
                          value={reviewRatings.internalNotes}
                          onChange={(e) =>
                            handleReviewRatingsChange(
                              "internalNotes",
                              e.target.value
                            )
                          }
                          rows={3}
                          maxLength={500}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-xs resize-none"
                          style={{
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1FA372";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(31, 163, 114, 0.2)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          placeholder="Add review notes, ratings, or feedback..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {reviewRatings.internalNotes.length}/500 characters
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div className="flex justify-end space-x-3 p-4 border-t-2 border-gray-200 bg-white">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="outline" onClick={handleSaveDraft}>
                    Save Draft
                  </Button>
                  <Button onClick={handleCreateProfile}>Create Profile</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
