'use client';

import { useState } from 'react';
import { Message } from './MessageBoardScreen';

interface MessageDetailsProps {
  message: Message;
}

export default function MessageDetails({ message }: MessageDetailsProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'Event':
        return 'ri-calendar-event-line';
      case 'Alert':
        return 'ri-alarm-warning-line';
      case 'Info':
        return 'ri-information-line';
      default:
        return 'ri-message-3-line';
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setNewComment('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1FA372] flex items-center justify-center text-white font-medium text-lg flex-shrink-0">
            {message.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-medium text-black mb-2">{message.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-black">{message.author}</span>
              <span>•</span>
              <span>{message.date}</span>
              <span>•</span>
              <span>{message.time}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="max-w-4xl">
          <p className="text-base font-semibold text-black leading-relaxed whitespace-pre-wrap mb-6">{message.content}</p>

          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-black mb-3">Attachments</h3>
              <div className="space-y-2">
                {message.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                        {attachment.type === 'image' ? (
                          <i className="ri-image-line text-xl text-blue-600"></i>
                        ) : (
                          <i className="ri-file-text-line text-xl text-blue-600"></i>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-black text-sm">{attachment.name}</div>
                        <div className="text-xs text-gray-500">
                          {attachment.type === 'image' ? 'Image • 2.4 MB' : 'PDF Document'}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      <i className="ri-download-line text-xl"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
