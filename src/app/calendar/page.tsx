import Sidebar from "../../components/Sidebar";
import CalendarScreen from "./CalendarScreen";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#0A1823] p-[10px] pl-[270px]">
      <Sidebar />
      <CalendarScreen />
    </div>
  );
}
