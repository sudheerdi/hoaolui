'use client';

import { Message } from './MessageBoardScreen';

interface MessageListProps {
  messages: Message[];
  selectedMessageId?: string;
  onSelectMessage: (message: Message) => void;
}

export default function MessageList({
  messages,
  selectedMessageId,
  onSelectMessage,
}: MessageListProps) {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Event':
        return 'bg-teal-100 text-teal-800';
      case 'Alert':
        return 'bg-red-100 text-red-800';
      case 'Info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'ri-alarm-warning-line text-red-500';
      case 'Medium':
        return 'ri-information-line text-amber-500';
      case 'Low':
        return 'ri-checkbox-circle-line text-green-500';
      default:
        return 'ri-information-line text-gray-500';
    }
  };

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onSelectMessage(message)}
          className={`p-4 border border-gray-200 rounded-lg cursor-pointer transition-all hover:shadow-md ${
            selectedMessageId === message.id
              ? 'bg-green-50 border-[#1FA372]'
              : 'bg-white'
          }`}
        >
          <div className="flex items-start gap-3">
            <img
              src={message.authorAvatar}
              alt={message.author}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(message.tag)}`}>
                  {message.tag}
                </span>
                <i className={`${getPriorityIcon(message.priority)} text-sm`}></i>
                {!message.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
              </div>

              <h3
                className={`text-base font-medium mb-1 line-clamp-2 ${
                  !message.isRead ? 'text-black' : 'text-black'
                }`}
              >
                {message.title}
              </h3>

              <p className="text-sm text-black font-medium line-clamp-2 mb-2">
                {message.content}
              </p>

              <div className="flex items-center justify-between text-sm text-black font-medium">
                <span>{message.author}</span>
                <span>{message.date}</span>
              </div>

              <div className="flex items-center gap-4 mt-2 text-sm text-black font-medium">
                <span className="flex items-center gap-1">
                  <i className="ri-thumb-up-line"></i>
                  {message.likes}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-chat-3-line"></i>
                  {message.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-message-3-line text-black text-3xl"></i>
          </div>
          <h3 className="text-base font-medium text-black mb-2">No messages found</h3>
          <p className="text-sm text-black font-medium">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
