"use client";
import { useAppSelector } from "@/src/lib/hooks";
import Sidebar from "../../components/Sidebar";
import CalendarScreen from "./CalendarScreen";
import MemberCalendarScreen from "./MemberCalendarScreen";

export default function CalendarPage() {
  const { user } = useAppSelector((state) => state.hoaUser);

  return (
    <div className="min-h-screen bg-[#0A1823] p-[10px] pl-[270px]">
      <Sidebar />
      {user?.memberships[0]?.role === "COMMUNITY_ADMIN" ? (
        <CalendarScreen />
      ) : (
        <MemberCalendarScreen />
      )}
    </div>
  );
}
