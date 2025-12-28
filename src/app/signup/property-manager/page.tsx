"use client";

import { useState } from "react";
import Navbar from "../../../components/feature/Navbar";
import Footer from "../../../components/feature/Footer";
import Button from "../../../components/base/Button";
import Notification from "../../../components/base/Notification";

export default function PropertyManagerSignup() {
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
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.captchaVerified) {
      setNotification({
        type: "error",
        message: "Please verify that you are not a robot.",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({
        type: "error",
        message: "Passwords do not match. Please try again.",
      });
      return;
    }

    if (formData.password.length < 8) {
      setNotification({
        type: "error",
        message: "Password must be at least 8 characters long.",
      });
      return;
    }

    // Success case
    setNotification({
      type: "success",
      message: "Account created successfully! Redirecting to your dashboard...",
    });

    // Redirect after 2 seconds
    setTimeout(() => {
      console.log("Form submitted:", formData);
      window.REACT_APP_NAVIGATE("/dashboard/property-manager");
    }, 2000);
  };

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
                  className="ri-building-line text-2xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Property Manager
              </h1>
              <p className="text-gray-600 text-sm">Create your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Mobile: 1 column, Tablet and up: 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="communityName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Community Name
                  </label>
                  <input
                    type="text"
                    id="communityName"
                    name="communityName"
                    value={formData.communityName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="Enter community name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="numberOfUnits"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Units
                  </label>
                  <input
                    type="number"
                    id="numberOfUnits"
                    name="numberOfUnits"
                    value={formData.numberOfUnits}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="Number of units"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="Create a strong password"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="Street address"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="City"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="State"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="ZIP Code"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="hearAboutUs"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 pr-8 border border-gray-300 rounded-lg outline-none transition-all cursor-pointer"
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
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
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
                  required
                />
                <label
                  htmlFor="captcha"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I'm not a robot
                </label>
              </div>

              <Button className="w-full" disabled={!formData.captchaVerified}>
                Create an Account
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
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
