
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, FileText, Users, Shield, Globe, Zap, ThumbsUp, Gavel, Scale, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-legalsetu-lightblue to-white py-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] opacity-[0.07] mix-blend-overlay pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold text-legalsetu-primary mb-6 leading-tight">
                  Simplifying Legal Access <span className="text-legalsetu-secondary">for Everyone</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Get instant legal assistance, document summaries, and connect with verified lawyers in your language.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/ask" >
                    <Button className="bg-legalsetu-primary hover:bg-legalsetu-secondary text-white px-8 py-6 h-auto text-base shadow-lg">
                      Ask a Question
                    </Button>
                  </Link>
                  <Link to="/find-lawyer">
                    <Button variant="outline" className="border-legalsetu-primary text-legalsetu-primary hover:bg-legalsetu-lightblue px-8 py-6 h-auto text-base">
                      Find a Lawyer
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex md:justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                  alt="Lady Justice" 
                    className="max-h-[400px] w-auto animate-float object-contain rounded-xl "
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-legalsetu-primary">Our Services</h2>
              <div className="mt-2 h-1 w-20 bg-legalsetu-primary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-3 bg-legalsetu-primary"></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="bg-legalsetu-lightblue p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-legalsetu-primary transition-all duration-300">
                    <MessageCircle size={32} className="text-legalsetu-primary group-hover:text-white transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-legalsetu-primary">Ask a Legal Question</h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Type or speak your legal issue in your language and get instant answers from our AI-powered assistant.
                  </p>
                  <Link to="/ask" className="mt-auto no-underline">
                    <Button className="w-full bg-legalsetu-primary hover:bg-legalsetu-secondary text-white">Start Chat</Button>
                  </Link>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-3 bg-legalsetu-primary"></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="bg-legalsetu-lightblue p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-legalsetu-primary transition-all duration-300">
                    <FileText size={32} className="text-legalsetu-primary group-hover:text-white transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-legalsetu-primary">Summarize a Legal Document</h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Upload documents to get simple summaries, timelines, and key points of relevant law sections.
                  </p>
                  <Link to="/summarize" className="mt-auto no-underline">
                    <Button className="w-full bg-legalsetu-primary hover:bg-legalsetu-secondary text-white">Upload & Analyze</Button>
                  </Link>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-3 bg-legalsetu-primary"></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="bg-legalsetu-lightblue p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-legalsetu-primary transition-all duration-300">
                    <Users size={32} className="text-legalsetu-primary group-hover:text-white transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-legalsetu-primary">Find a Lawyer</h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Search verified lawyers by language, expertise, and availability in your area for personalized advice.
                  </p>
                  <Link to="/find-lawyer" className="mt-auto no-underline">
                    <Button className="w-full bg-legalsetu-primary hover:bg-legalsetu-secondary text-white">Search Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-legalsetu-lightblue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-legalsetu-primary">Why Choose LegalSetu?</h2>
              <div className="mt-2 h-1 w-20 bg-legalsetu-primary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-legalsetu-primary">
                <div className="flex items-center mb-4">
                  <Globe size={24} className="text-legalsetu-primary mr-3" />
                  <h3 className="font-bold text-lg text-legalsetu-dark">Multilingual Support</h3>
                </div>
                <p className="text-gray-600">Get legal assistance in your regional language, making complex laws accessible to all.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-legalsetu-primary">
                <div className="flex items-center mb-4">
                  <Zap size={24} className="text-legalsetu-primary mr-3" />
                  <h3 className="font-bold text-lg text-legalsetu-dark">AI-Powered</h3>
                </div>
                <p className="text-gray-600">Advanced AI technology to simplify complex legal information and provide accurate guidance.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-legalsetu-primary">
                <div className="flex items-center mb-4">
                  <FileText size={24} className="text-legalsetu-primary mr-3" />
                  <h3 className="font-bold text-lg text-legalsetu-dark">Document Analysis</h3>
                </div>
                <p className="text-gray-600">Get quick, easy-to-understand summaries of legal documents with key points highlighted.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-legalsetu-primary">
                <div className="flex items-center mb-4">
                  <Shield size={24} className="text-legalsetu-primary mr-3" />
                  <h3 className="font-bold text-lg text-legalsetu-dark">Verified Lawyers</h3>
                </div>
                <p className="text-gray-600">Connect with pre-verified legal professionals for personalized consultation and guidance.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-legalsetu-primary">What Users Say</h2>
              <div className="mt-2 h-1 w-20 bg-legalsetu-primary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-legalsetu-primary flex items-center justify-center text-white font-semibold">
                    RK
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold text-legalsetu-dark">Rajesh Kumar</h4>
                    <p className="text-sm text-gray-500">Farmer, Bihar</p>
                  </div>
                </div>
                <div className="mb-4 text-yellow-400 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "LegalSetu helped me understand my land rights in Hindi. The document summary feature saved me multiple trips to a lawyer."
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-legalsetu-primary flex items-center justify-center text-white font-semibold">
                    SP
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold text-legalsetu-dark">Sita Patel</h4>
                    <p className="text-sm text-gray-500">Teacher, Gujarat</p>
                  </div>
                </div>
                <div className="mb-4 text-yellow-400 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "I was able to chat with the AI in Gujarati and get information about property inheritance laws. Very helpful service!"
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-legalsetu-primary flex items-center justify-center text-white font-semibold">
                    MR
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold text-legalsetu-dark">Manoj Reddy</h4>
                    <p className="text-sm text-gray-500">Small Business Owner, Telangana</p>
                  </div>
                </div>
                <div className="mb-4 text-yellow-400 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "Found an excellent business lawyer through LegalSetu. The platform made legal consultation affordable and accessible."
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-legalsetu-lightblue border border-legalsetu-primary/20 text-legalsetu-primary">
                <ThumbsUp size={18} />
                <span className="font-medium">Trusted by thousands of users across India</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default HomePage;
