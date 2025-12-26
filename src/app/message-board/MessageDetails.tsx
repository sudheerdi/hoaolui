'use client';

import { useState } from 'react';
import { Message } from './MessageBoardScreen';

interface MessageDetailsProps {
  message: Message;
}

export default function MessageDetails({ message }: MessageDetailsProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Event':
        return 'bg-teal-100 text-teal-800';
      case 'Alert':
        return 'bg-red-100 text-red-800';
      case 'Info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-black';
    }
  };

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
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1.5 rounded-full text-base font-medium ${getTagColor(message.tag)}`}>
                <i className={`${getTagIcon(message.tag)} mr-1`}></i>
                {message.tag}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-base font-medium ${
                message.priority === 'High' ? 'bg-red-100 text-red-800' :
                message.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {message.priority} Priority
              </span>
            </div>
            <h1 className="text-3xl font-medium text-black mb-4">{message.title}</h1>
            <div className="flex items-center gap-4 text-base text-black font-medium">
              <div className="flex items-center gap-2">
                <img
                  src={message.authorAvatar}
                  alt={message.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-black">{message.author}</div>
                  <div className="text-sm text-black font-medium">{message.date} at {message.time}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <i className="ri-edit-line text-xl text-black"></i>
            </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <i className="ri-delete-bin-line text-xl text-black"></i>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <p className="text-base text-black leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
        </div>

        {message.attachments && message.attachments.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-black mb-3">Attachments</h3>
            <div className="space-y-2">
              {message.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    {attachment.type === 'image' ? (
                      <i className="ri-image-line text-2xl text-black"></i>
                    ) : (
                      <i className="ri-file-text-line text-2xl text-black"></i>
                    )}
                    <div>
                      <div className="font-medium text-black text-base">{attachment.name}</div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-base whitespace-nowrap">
                    <i className="ri-download-line mr-1"></i>
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-6 py-4 border-y border-gray-200 mb-6">
          <button className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors text-base font-medium whitespace-nowrap">
            <i className="ri-thumb-up-line text-xl"></i>
            <span>{message.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors text-base font-medium whitespace-nowrap"
          >
            <i className="ri-chat-3-line text-xl"></i>
            <span>{message.comments} Comments</span>
          </button>
          <button className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors text-base font-medium whitespace-nowrap">
            <i className="ri-share-line text-xl"></i>
            Share
          </button>
        </div>

        {showComments && (
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Comments</h3>
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base text-black font-medium"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-base font-medium whitespace-nowrap"
                >
                  Post Comment
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                  S
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-black text-base">Sarah Johnson</span>
                      <span className="text-sm text-black font-medium">2 hours ago</span>
                    </div>
                    <p className="text-base text-black font-medium">
                      Thank you for the update! This is very helpful information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                  M
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-black text-base">Michael Chen</span>
                      <span className="text-sm text-black font-medium">5 hours ago</span>
                    </div>
                    <p className="text-base text-black font-medium">
                      Will there be any follow-up meetings regarding this matter?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
