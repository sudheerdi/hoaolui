"use client";

import { useState } from "react";
import Navbar from "../../../components/feature/Navbar";
import Button from "../../../components/base/Button";
import { useRouter } from "next/navigation";

export default function HomeBuilderSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    communityName: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    hearAboutUs: "",
    captchaVerified: false,
  });

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
    if (formData.captchaVerified) {
      console.log("Form submitted:", formData);
      router.push("/dashboard/home-builder");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gradient-to-br from-gray-100 to-gray-50 py-16">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4"
                style={{ backgroundColor: "#E8F5F0" }}
              >
                <i
                  className="ri-hammer-line text-3xl"
                  style={{ color: "#1FA372" }}
                ></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Home Builder
              </h1>
              <p className="text-gray-600">Create your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
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
                  placeholder="John Doe"
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

              <div className="flex items-start space-x-3">
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

              <p className="text-center text-sm text-gray-600">
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
