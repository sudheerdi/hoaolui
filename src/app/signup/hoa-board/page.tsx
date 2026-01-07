"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/feature/Navbar";
import Footer from "../../../components/feature/Footer";
import Button from "../../../components/base/Button";
import Notification from "../../../components/base/Notification";

export default function HOABoardSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    communityName: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    numberOfUnits: "",
    hearAboutUs: "",
    captchaVerified: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.communityName.trim())
      newErrors.communityName = "Community name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.numberOfUnits.trim())
      newErrors.numberOfUnits = "Number of units is required";
    if (!formData.hearAboutUs)
      newErrors.hearAboutUs = "Please select an option";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Password match validation
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.password = "Passwords do not match";
      newErrors.confirmPassword = "Passwords do not match";
    }

    // CAPTCHA validation
    if (!formData.captchaVerified) {
      setNotification({
        type: "error",
        message: "Please verify that you are not a robot.",
      });
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please fix all errors before submitting.",
      });
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      console.log("Form submitted:", formData);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center py-6">
          <div className="max-w-2xl mx-auto px-4 w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div
                className="w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-checkbox-circle-fill text-5xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Registration Successful!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Your registration has been successful. Please check your email
                and click the activation link, then login again.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <i
                    className="ri-mail-line mr-2"
                    style={{ color: "#1FA372" }}
                  ></i>
                  We've sent an activation email to{" "}
                  <strong>{formData.email}</strong>
                </p>
              </div>
              <Button onClick={() => router.push("/login")} className="mx-auto">
                Go to Login
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center py-6">
          <div className="max-w-2xl mx-auto px-4 w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div
                className="w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-loader-4-line text-5xl animate-spin"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Creating Your Account...
              </h2>
              <p className="text-gray-600">
                Please wait while we process your registration.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <main className="flex-grow bg-gradient-to-br from-gray-100 to-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-3"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-community-line text-2xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                HOA Board Member
              </h1>
              <p className="text-sm text-gray-600">
                Create your community account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Mobile: 1 column, Tablet and up: 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="communityName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Community Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="communityName"
                    name="communityName"
                    value={formData.communityName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.communityName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.communityName) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.communityName) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="Enter community name"
                  />
                  {errors.communityName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.communityName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.email) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.phoneNumber) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.phoneNumber) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.firstName) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.firstName) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.lastName) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.lastName) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.address) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.address) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="Street address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.city) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.city) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.state) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.state) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.zipCode ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.zipCode) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.zipCode) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="ZIP Code"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.zipCode}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.password) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.password) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="Create a strong password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.confirmPassword) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.confirmPassword) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="numberOfUnits"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Units <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="numberOfUnits"
                    name="numberOfUnits"
                    value={formData.numberOfUnits}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
                      errors.numberOfUnits
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.numberOfUnits) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.numberOfUnits) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    placeholder="Number of units"
                  />
                  {errors.numberOfUnits && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.numberOfUnits}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="hearAboutUs"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    How did you hear about us?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 pr-8 border rounded-lg outline-none transition-all cursor-pointer text-sm ${
                      errors.hearAboutUs ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      if (!errors.hearAboutUs) {
                        e.currentTarget.style.borderColor = "#1FA372";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(31, 163, 114, 0.2)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.hearAboutUs) {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    <option value="">Select an option</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.hearAboutUs && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.hearAboutUs}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4">
                <input
                  type="checkbox"
                  id="captcha"
                  checked={formData.captchaVerified}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      captchaVerified: e.target.checked,
                    })
                  }
                  className="mt-1 w-5 h-5 border-gray-300 rounded cursor-pointer"
                  style={{ accentColor: "#1FA372" }}
                />
                <label
                  htmlFor="captcha"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I'm not a robot <span className="text-red-500">*</span>
                </label>
              </div>

              <Button className="w-full">Create an Account</Button>

              <p className="text-center text-sm text-gray-600 mt-3">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="hover:opacity-80 font-medium cursor-pointer"
                  style={{ color: "#1FA372" }}
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
