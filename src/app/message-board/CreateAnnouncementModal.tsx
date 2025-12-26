'use client';

import { useState } from 'react';
import { Message } from './MessageBoardScreen';

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (announcement: Omit<Message, 'id' | 'likes' | 'comments' | 'isRead'>) => void;
}

export default function CreateAnnouncementModal({ isOpen, onClose, onCreate }: CreateAnnouncementModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<'Event' | 'Alert' | 'Info'>('Info');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    const now = new Date();
    const announcement: Omit<Message, 'id' | 'likes' | 'comments' | 'isRead'> = {
      title: title.trim(),
      content: content.trim(),
      author: 'Admin User',
      authorAvatar: 'https://readdy.ai/api/search-image?query=professional%20admin%20user%20avatar%20smiling%20headshot%20portrait%20business%20attire%20clean%20white%20background&width=40&height=40&seq=admin1&orientation=squarish',
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      tag,
      priority,
      attachments: attachments.map(file => ({
        type: file.type.startsWith('image/') ? 'image' as const : 'file' as const,
        name: file.name,
        url: file.type.startsWith('image/') ? URL.createObjectURL(file) : '#'
      }))
    };

    onCreate(announcement);
    
    setTitle('');
    setContent('');
    setTag('Info');
    setPriority('Medium');
    setAttachments([]);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-medium text-black">Create Announcement</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-black transition-colors"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-base font-medium text-black mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA372] text-base text-black font-medium"
                placeholder="Enter announcement title"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-black mb-2">
                Category
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as 'Event' | 'Alert' | 'Info')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA372] text-base text-black font-medium pr-8"
              >
                <option value="Event">Event</option>
                <option value="Alert">Alert</option>
                <option value="Info">Info</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-medium text-black mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA372] resize-none text-base text-black font-medium"
                placeholder="Enter announcement content"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-black mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <i className="ri-upload-cloud-line text-4xl text-black mb-2"></i>
                <p className="text-base text-black mb-2 font-medium">
                  Drag and drop files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-base font-medium whitespace-nowrap"
                >
                  Choose Files
                </label>
              </div>

              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                        <i className={`${
                          file.type.startsWith('image/') ? 'ri-image-2-line' : 'ri-file-text-line'
                        } text-amber-500`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-base font-medium whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-6 py-2.5 bg-[#1FA372] text-white rounded-lg hover:bg-[#188f5f] transition-colors text-base font-medium whitespace-nowrap"
            >
              Create Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
