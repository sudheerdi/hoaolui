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

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Event':
        return 'bg-blue-100 text-blue-700';
      case 'Alert':
        return 'bg-red-100 text-red-700';
      case 'Info':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onSelectMessage(message)}
          className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
            selectedMessageId === message.id
              ? 'bg-green-50 border-[#1FA372]'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTagColor(message.tag)}`}>
              <i className={`${getTagIcon(message.tag)} text-lg`}></i>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-black mb-1 line-clamp-1">
                {message.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                <span>{message.author}</span>
                <span>•</span>
                <span>{message.date}</span>
                <span>•</span>
                <span>{message.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-message-3-line text-gray-400 text-3xl"></i>
          </div>
          <h3 className="text-base font-medium text-gray-700 mb-2">No messages found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
