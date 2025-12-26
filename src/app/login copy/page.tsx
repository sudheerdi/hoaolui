"use client";

import { useState } from "react";
import Navbar from "../../components/feature/Navbar";
import Button from "../../components/base/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gradient-to-br from-gray-100 to-gray-50 py-16">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-mail-line text-gray-400"></i>
                    </div>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-lock-line text-gray-400"></i>
                    </div>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-none transition-all"
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
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i
                        className={`ri-eye-${
                          showPassword ? "off" : ""
                        }-line text-gray-400 hover:text-gray-600`}
                      ></i>
                    </div>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 border-gray-300 rounded cursor-pointer"
                    style={{ accentColor: "#1FA372" }}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium hover:opacity-80 cursor-pointer whitespace-nowrap"
                  style={{ color: "#1FA372" }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full">
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-google-fill text-red-500 text-lg"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Google
                  </span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-apple-fill text-gray-900 text-lg"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Apple
                  </span>
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    const signInButton = document.querySelector(
                      "[data-signin-trigger]"
                    ) as HTMLElement;
                    if (signInButton) {
                      signInButton.click();
                    }
                  }}
                  className="font-medium hover:opacity-80 cursor-pointer whitespace-nowrap"
                  style={{ color: "#1FA372" }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <a
                href="/contact"
                className="font-medium hover:opacity-80 cursor-pointer whitespace-nowrap"
                style={{ color: "#1FA372" }}
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
