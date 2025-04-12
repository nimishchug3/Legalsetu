
import React, { useState } from 'react';
import { MessageCircle, Mic, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', content: 'Hello! How can I assist you with your legal questions today?' }
  ]);
  
  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'];
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'bot', 
        content: "Thanks for your question. I'm analyzing relevant legal information to provide you with the most accurate guidance. Please note that while I provide legal information, this should not be considered formal legal advice."
      }]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  if (!isOpen) {
    return (
      <Button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-legalsetu-primary hover:bg-legalsetu-secondary shadow-lg flex items-center justify-center"
        aria-label="Open chat"
      >
        <MessageCircle size={24} className="text-white" />
      </Button>
    );
  }
  
  return (
    <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 h-[70vh] md:h-[520px] bg-white rounded-t-lg md:rounded-lg shadow-xl flex flex-col z-50 border border-gray-200 overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 bg-legalsetu-primary text-white">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
            <MessageCircle size={16} className="text-legalsetu-primary" />
          </div>
          <h3 className="ml-2 font-medium">LegalSetu Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            className="text-sm border rounded-md px-2 py-1 bg-white text-legalsetu-dark"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <button 
            onClick={toggleChat}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-legalsetu-lightblue space-y-3">
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                chat.role === 'user' 
                  ? 'bg-legalsetu-primary text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-gray-800 rounded-tl-none shadow-md'
              }`}
            >
              {chat.content}
            </div>
          </div>
        ))}
      </div>
      
      {/* Chat input */}
      <div className="border-t p-3 bg-white">
        <div className="flex items-center space-x-2">
          <textarea
            className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-legalsetu-primary resize-none"
            placeholder={`Type your legal question in ${selectedLanguage}...`}
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-col space-y-2">
            <button 
              className="p-2 rounded-full bg-legalsetu-lightblue hover:bg-gray-200 text-legalsetu-primary"
              aria-label="Voice input"
            >
              <Mic size={18} />
            </button>
            <button 
              onClick={handleSendMessage}
              className="p-2 rounded-full bg-legalsetu-primary hover:bg-legalsetu-secondary text-white"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-gray-500">
          LegalSetu AI provides information, not legal advice.
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
