
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AskQuestionPage = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'bot', 
      content: 'Welcome to LegalSetu! How can I assist you with your legal questions today? You can ask in your preferred language.' 
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'];
  
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
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    setMessage('');
    
    // Simulate bot response for demo
    setTimeout(() => {
      let botResponse = "Thank you for your question. I'm analyzing relevant legal information to provide you with accurate guidance. ";
      
      if (message.toLowerCase().includes('arrest') || message.toLowerCase().includes('rights')) {
        botResponse += "If you're arrested, you have the following rights: 1. Right to know the grounds of arrest. 2. Right to inform a friend or relative. 3. Right to consult a lawyer. 4. Right to be produced before a magistrate within 24 hours. These rights are guaranteed under Article 22 of the Indian Constitution and Section 50 of the Code of Criminal Procedure.";
      } else if (message.toLowerCase().includes('divorce')) {
        botResponse += "For divorce in India, you can file either mutual consent divorce (Section 13B of Hindu Marriage Act) or contested divorce. The process involves filing a petition, mediation, and court hearings. Required documents include marriage certificate, address proof, and income proof. The process typically takes 6-18 months for mutual consent and longer for contested cases.";
      } else {
        botResponse += "Based on your query, I'd recommend consulting with a specialized lawyer for personalized advice. Would you like me to help you find a lawyer in your area who specializes in this matter?";
      }
      
      setChatHistory(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 1000);
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
    // In a real app, this would trigger voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setMessage("What are the legal requirements for registering a property?");
        // Auto send after "voice recognition"
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
                  <li>
                    <a href="#" className="text-legalsetu-primary hover:underline">Family Law</a>
                  </li>
                  <li>
                    <a href="#" className="text-legalsetu-primary hover:underline">Property Law</a>
                  </li>
                  <li>
                    <a href="#" className="text-legalsetu-primary hover:underline">Criminal Law</a>
                  </li>
                  <li>
                    <a href="#" className="text-legalsetu-primary hover:underline">Consumer Rights</a>
                  </li>
                  <li>
                    <a href="#" className="text-legalsetu-primary hover:underline">Labor Laws</a>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-legalsetu-dark">Recent Updates</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="text-legalsetu-primary flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="text-sm">New consumer protection rules announced</p>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="text-legalsetu-primary flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="text-sm">Supreme Court ruling on property rights</p>
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
                  <div>
                    <select 
                      className="text-sm border rounded-md px-2 py-1 text-legalsetu-dark"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
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
                      placeholder={`Type your legal question in ${selectedLanguage}...`}
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
