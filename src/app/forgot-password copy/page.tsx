"use client";

import { useState } from "react";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import Button from "../../components/base/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gradient-to-br from-gray-100 to-gray-50 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
                    <i className="ri-lock-password-line text-3xl text-purple-600"></i>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Forgot Password?
                  </h1>
                  <p className="text-gray-600">
                    No worries, we'll send you reset instructions
                  </p>
                </div>

                {/* Form */}
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
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>

                  {/* Back to Login */}
                  <div className="text-center">
                    <a
                      href="/login"
                      className="text-sm font-medium text-purple-600 hover:text-purple-700 cursor-pointer inline-flex items-center whitespace-nowrap"
                    >
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-arrow-left-line"></i>
                      </div>
                      Back to Login
                    </a>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* Success Message */}
                <div className="text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                    <i className="ri-mail-check-line text-3xl text-green-600"></i>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Check Your Email
                  </h1>
                  <p className="text-gray-600 mb-6">
                    We've sent password reset instructions to
                    <br />
                    <span className="font-medium text-gray-900">{email}</span>
                  </p>

                  <div className="bg-purple-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                      Didn't receive the email? Check your spam folder or{" "}
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="font-medium text-purple-600 hover:text-purple-700 cursor-pointer whitespace-nowrap"
                      >
                        try another email address
                      </button>
                    </p>
                  </div>

                  <a href="/login">
                    <Button className="w-full">Back to Login</Button>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
