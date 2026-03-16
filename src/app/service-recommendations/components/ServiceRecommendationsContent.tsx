
import { useState } from 'react';
import VendorAds from './VendorAds';
import ChatSection from './ChatSection';

export default function ServiceRecommendationsContent() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you find a service provider today?', sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: 'I can help you find trusted service providers. What type of service are you looking for?', 
          sender: 'bot' 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Panel - Chat Section */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ChatSection 
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>

      {/* Right Panel - Vendor Ads */}
      <div className="w-80 flex-shrink-0 overflow-hidden">
        <VendorAds />
      </div>
    </div>
  );
}
