'use client';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  documentName,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-delete-bin-line text-red-600 text-2xl"></i>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            Delete Document?
          </h2>
          
          <p className="text-sm text-gray-600 text-center mb-6">
            Are you sure you want to delete <span className="font-semibold">{documentName}</span>? This action cannot be undone.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
