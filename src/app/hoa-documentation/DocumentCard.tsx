'use client';

interface DocumentCardProps {
  id: string;
  name: string;
  type: 'PDF' | 'DOC' | 'IMG' | 'XLS';
  size: string;
  uploadDate: string;
  uploadedBy: string;
  onPreview: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export default function DocumentCard({
  name,
  type,
  size,
  uploadDate,
  uploadedBy,
  onPreview,
  onShare,
  onDelete,
}: DocumentCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'PDF':
        return { icon: 'ri-file-pdf-2-fill', color: 'text-red-500', bg: 'bg-red-50' };
      case 'DOC':
        return { icon: 'ri-file-word-2-fill', color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'IMG':
        return { icon: 'ri-image-2-fill', color: 'text-purple-500', bg: 'bg-purple-50' };
      case 'XLS':
        return { icon: 'ri-file-excel-2-fill', color: 'text-green-500', bg: 'bg-green-50' };
      default:
        return { icon: 'ri-file-fill', color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  const iconData = getIcon();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 ${iconData.bg} rounded-lg flex items-center justify-center mb-3`}>
          <i className={`${iconData.icon} ${iconData.color} text-3xl`}></i>
        </div>
        
        <h3 className="text-sm font-semibold text-gray-900 text-center mb-1 line-clamp-2 w-full">
          {name}
        </h3>
        
        <p className="text-xs text-gray-500 mb-3">{size}</p>
        
        <div className="w-full border-t border-gray-100 pt-3 mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Uploaded:</span>
            <span className="font-medium">{uploadDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>By:</span>
            <span className="font-medium">{uploadedBy}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onPreview}
            className="flex-1 px-3 py-2 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-eye-line mr-1"></i>
            Preview
          </button>
          <button
            onClick={onShare}
            className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <i className="ri-share-line text-sm"></i>
          </button>
          <button
            onClick={onDelete}
            className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <i className="ri-delete-bin-line text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
