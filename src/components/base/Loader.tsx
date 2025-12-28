import React from "react";

export default function Loader() {
  return (
    <div className="absolute top-0 left-0 w-full h-svh z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1FA372]"></div>
      </div>
    </div>
  );
}
