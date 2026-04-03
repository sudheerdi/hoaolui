'use client';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  documentType: 'PDF' | 'DOC' | 'IMG' | 'XLS';
}

export default function PreviewModal({
  isOpen,
  onClose,
  documentName,
  documentType,
}: PreviewModalProps) {
  if (!isOpen) return null;

  const getPreviewContent = () => {
    switch (documentType) {
      case 'PDF':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <i className="ri-file-pdf-2-fill text-red-500 text-6xl mb-4"></i>
            <p className="text-gray-600 text-sm">PDF Preview</p>
            <p className="text-gray-900 font-medium mt-2">{documentName}</p>
          </div>
        );
      case 'DOC':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <i className="ri-file-word-2-fill text-blue-500 text-6xl mb-4"></i>
            <p className="text-gray-600 text-sm">Document Preview</p>
            <p className="text-gray-900 font-medium mt-2">{documentName}</p>
          </div>
        );
      case 'IMG':
        return (
          <div className="flex items-center justify-center h-full bg-gray-900">
            <img
              src={`https://readdy.ai/api/search-image?query=professional%20document%20image%20placeholder%20modern%20clean%20design&width=800&height=600&seq=doc-preview-${documentName}&orientation=landscape`}
              alt={documentName}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );
      case 'XLS':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <i className="ri-file-excel-2-fill text-green-500 text-6xl mb-4"></i>
            <p className="text-gray-600 text-sm">Spreadsheet Preview</p>
            <p className="text-gray-900 font-medium mt-2">{documentName}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-black/90 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-4 h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{documentName}</h2>
            <p className="text-sm text-gray-500 mt-1">{documentType} Document</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
              <i className="ri-download-line mr-2"></i>
              Download
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {getPreviewContent()}
        </div>
      </div>
    </div>
  );
}
