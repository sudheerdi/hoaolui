
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatSectionProps {
  messages: Message[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export default function ChatSection({ messages, inputMessage, setInputMessage, handleSendMessage }: ChatSectionProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-[#1FA372] text-white'
                    : 'bg-gray-100 text-black'
                }`}
              >
                <p className="text-base font-medium">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 text-base border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1FA372]"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#1FA372] text-white p-3 rounded-lg hover:bg-[#188a5e] transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-send-plane-fill text-lg w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
