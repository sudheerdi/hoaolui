"use client";
import Navbar from "../components/feature/Navbar";
import Footer from "../components/feature/Footer";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhyChooseSection />
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join Thousands of Satisfied Communities
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your 30-day free trial today. No credit card required.
          </p>
          <button
            onClick={() => router.push("/signup/hoa-board")}
            className="text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-200 whitespace-nowrap cursor-pointer"
            style={{ backgroundColor: "#1FA372" }}
          >
            Get Started Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
