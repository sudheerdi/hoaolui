import VotesTopBar from "./VotesTopBar";
import VotesContent from "./VotesContent";

export default function MemberPollScreen() {
  return (
    <div className="flex-1 flex flex-col m-[10px] ml-[260px] min-h-[calc(100vh-20px)]">
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] flex-1 flex flex-col">
        <VotesTopBar />
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          <VotesContent />
        </main>
      </div>
    </div>
  );
}
