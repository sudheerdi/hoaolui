"use client";
import ServiceRecommendationsTopBar from "./components/ServiceRecommendationsTopBar";
import ServiceRecommendationsContent from "./components/ServiceRecommendationsContent";
import DashboardLayout from "@/src/components/layout/DashboardLayout";

export default function ServiceRecommendations() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col ml-[260px] m-[10px] min-h-[calc(100vh-20px)]">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] flex-1 flex flex-col overflow-hidden">
          <ServiceRecommendationsTopBar />
          <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
            <ServiceRecommendationsContent />
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
