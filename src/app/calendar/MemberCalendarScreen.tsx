"use client";
import CalendarTopBar from "./CalendarTopBar";
import CalendarContent from "./CalendarContent";

export default function MemberCalendarScreen() {
  return (
    <div className="flex-1 flex flex-col m-[10px] min-h-[calc(100vh-20px)]">
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] flex-1 flex flex-col">
        <CalendarTopBar />
        <main className="flex-1 p-1 bg-[#F9FAFB]">
          <CalendarContent />
        </main>
      </div>
    </div>
  );
}
