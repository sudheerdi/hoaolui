import { useEffect } from "react";

interface NotificationProps {
  type: "success" | "error" | "info" | "warning" | null;
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Notification({
  type,
  message,
  onClose,
  duration = 5000,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!type || !message) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[60] animate-slide-in">
      <div
        className={`flex items-start gap-3 px-6 py-4 rounded-lg shadow-lg max-w-md ${
          type === "success" ? "bg-white border-l-4" : "bg-white border-l-4"
        }`}
        style={{
          borderLeftColor: type === "success" ? "#1FA372" : "#EF4444",
        }}
      >
        <div
          className={`w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5`}
        >
          {type === "success" ? (
            <i
              className="ri-checkbox-circle-fill text-2xl"
              style={{ color: "#1FA372" }}
            ></i>
          ) : (
            <i className="ri-error-warning-fill text-2xl text-red-500"></i>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            {type === "success" ? "Success!" : "Error!"}
          </h3>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <i className="ri-close-line text-gray-400 text-xl"></i>
        </button>
      </div>
    </div>
  );
}
