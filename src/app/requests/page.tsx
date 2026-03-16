"use client";
import RequestsTopBar from "./components/RequestsTopBar";
import RequestsContent from "./components/RequestsContent";
import DashboardLayout from "@/src/components/layout/DashboardLayout";

export default function Requests() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col ml-[260px] m-[10px] min-h-[calc(100vh-20px)]">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] flex-1 flex flex-col">
          <RequestsTopBar />
          <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
            <RequestsContent />
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
