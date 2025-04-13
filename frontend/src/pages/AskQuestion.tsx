import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AskQuestionPage = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'bot', 
      content: 'Welcome to LegalSetu! How can I assist you with your legal questions today? You can ask in your preferred language.' 
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What are my rights if I'm arrested?",
    "How can I file for divorce?",
    "What documents do I need for property registration?",
    "How to file a consumer complaint?",
    "What are the legal procedures for starting a business?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const userMessage = message;
    setChatHistory([...chatHistory, { role: 'user', content: userMessage }]);
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage,
          language: "English", // default language for now
        }),
      });

      if (!response.ok) throw new Error('Failed to get response from backend');

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, {
        role: 'bot',
        content: "Oops! Something went wrong. Please try again later."
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulated voice-to-text
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setMessage("What are the legal requirements for registering a property?");
        setTimeout(() => {
          handleSendMessage();
        }, 500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-legalsetu-dark mb-2">Ask a Legal Question</h1>
            <p className="text-gray-600">
              Get instant answers to your legal questions in simple, easy-to-understand language.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="font-bold text-lg mb-4 text-legalsetu-dark">Popular Topics</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-legalsetu-primary hover:underline">Family Law</a></li>
                  <li><a href="#" className="text-legalsetu-primary hover:underline">Property Law</a></li>
                  <li><a href="#" className="text-legalsetu-primary hover:underline">Criminal Law</a></li>
                  <li><a href="#" className="text-legalsetu-primary hover:underline">Consumer Rights</a></li>
                  <li><a href="#" className="text-legalsetu-primary hover:underline">Labor Laws</a></li>
                </ul>
              </div>

             <div className="bg-white p-6 rounded-lg shadow-sm">
  <h3 className="font-bold text-lg mb-4 text-legalsetu-dark">Recent Updates</h3>
  <div className="space-y-4">
    <div className="flex items-start space-x-3">
      <Clock className="text-legalsetu-primary flex-shrink-0 mt-1" size={16} />
      <div>
        <p className="text-sm">Uttarakhand passes Uniform Civil Code for equal legal rights</p>
        <p className="text-xs text-gray-500 mt-1">3 days ago</p>
      </div>
    </div>
    <div className="flex items-start space-x-3">
      <Clock className="text-legalsetu-primary flex-shrink-0 mt-1" size={16} />
      <div>
        <p className="text-sm">Supreme Court to examine revocation of OCI status in legal rights case</p>
        <p className="text-xs text-gray-500 mt-1">5 days ago</p>
      </div>
    </div>
    <div className="flex items-start space-x-3">
      <Clock className="text-legalsetu-primary flex-shrink-0 mt-1" size={16} />
      <div>
        <p className="text-sm">Law Commission recommends reforms in criminal sentencing guidelines</p>
        <p className="text-xs text-gray-500 mt-1">1 week ago</p>
      </div>
    </div>
  </div>
</div>

            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col h-[70vh]">
                {/* Chat header */}
                <div className="bg-legalsetu-primary text-white p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <ArrowLeft className="mr-2 cursor-pointer" size={20} />
                    <h2 className="font-medium">Legal Assistant</h2>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div 
                      key={index} 
                      className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-4 rounded-lg ${
                          chat.role === 'user' 
                            ? 'bg-legalsetu-primary text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {chat.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />

                  {/* Show suggested questions if chat is empty */}
                  {chatHistory.length === 1 && (
                    <div className="pt-4">
                      <p className="text-gray-500 mb-2">Suggested questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, idx) => (
                          <Button 
                            key={idx} 
                            variant="outline" 
                            className="text-sm text-legalsetu-primary border-legalsetu-primary"
                            onClick={() => handleSuggestedQuestion(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat input */}
                <div className="border-t p-3 bg-white">
                  <div className="flex items-center">
                    <textarea
                      className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-legalsetu-primary resize-none"
                      placeholder="Type your legal question..."
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="flex flex-col ml-2 space-y-2">
                      <button 
                        onClick={toggleRecording}
                        className={`p-2 rounded-full ${
                          isRecording 
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                        aria-label="Voice input"
                      >
                        <Mic size={20} />
                      </button>
                      <button 
                        onClick={handleSendMessage}
                        disabled={message.trim() === ''}
                        className={`p-2 rounded-full ${
                          message.trim() === ''
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-legalsetu-primary hover:bg-legalsetu-secondary text-white'
                        }`}
                        aria-label="Send message"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-center text-xs text-gray-500">
                    LegalSetu provides information, not legal advice. For specific legal concerns, consult with a qualified lawyer.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AskQuestionPage;
