"use client";
import DocumentsTopBar from "./components/DocumentsTopBar";
import DocumentsContent from "./components/DocumentsContent";

export default function MemberDocumentationScreen() {
  return (
    <div className="flex-1 flex flex-col m-[10px] ml-[270px] min-h-[calc(100vh-20px)]">
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] h-full flex flex-col overflow-hidden">
        <DocumentsTopBar />
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          <DocumentsContent />
        </main>
      </div>
    </div>
  );
}
