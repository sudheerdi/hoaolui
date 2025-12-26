"use client";

import { useState } from "react";
import Navbar from "../../../components/feature/Navbar";
import Button from "../../../components/base/Button";
import { useRouter } from "next/navigation";
import { useLazySetHoaUserRegisterQuery } from "../../../services";

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

  const [setHoaUserRegistation] = useLazySetHoaUserRegisterQuery();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.captchaVerified) {
      try {
        const requestData = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          communityName: formData.communityName,
          communityAddress: formData.address,
        };
        await setHoaUserRegistation(requestData).unwrap();
        router.push("/login");
      } catch (error) {
        console.log("User registration failed", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gradient-to-br from-gray-100 to-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-community-line text-3xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                HOA Board Member
              </h1>
              <p className="text-gray-600">Create your community account</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Mobile: 1 column, Tablet and up: 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="communityName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Community Name
                  </label>
                  <input
                    type="text"
                    id="communityName"
                    name="communityName"
                    value={formData.communityName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    htmlFor="numberOfUnits"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Number of Units
                  </label>
                  <input
                    type="number"
                    id="numberOfUnits"
                    name="numberOfUnits"
                    value={formData.numberOfUnits}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    htmlFor="hearAboutUs"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAboutUs"
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg outline-none transition-all cursor-pointer"
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

              <div className="flex items-start space-x-3 mb-6">
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
    </div>
  );
}
