
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Home, MessageCircle, FileText, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 bg-legalsetu-primary rounded-full flex items-center justify-center text-white font-bold text-xl">LS</div>
              <span className="ml-2 text-xl font-bold text-legalsetu-primary">LegalSetu</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-legalsetu-primary px-3 py-2 text-sm font-medium flex items-center">
              <Home size={16} className="mr-1.5" />
              Home
            </Link>
            <Link to="/ask" className="text-gray-700 hover:text-legalsetu-primary px-3 py-2 text-sm font-medium flex items-center">
              <MessageCircle size={16} className="mr-1.5" />
              Ask a Legal Question
            </Link>
            <Link to="/summarize" className="text-gray-700 hover:text-legalsetu-primary px-3 py-2 text-sm font-medium flex items-center">
              <FileText size={16} className="mr-1.5" />
              Summarize a Legal Document
            </Link>
            <Link to="/find-lawyer" className="text-gray-700 hover:text-legalsetu-primary px-3 py-2 text-sm font-medium flex items-center">
              <Users size={16} className="mr-1.5" />
              Find a Lawyer
            </Link>
            
            {isLoggedIn ? (
              <div className="relative ml-3">
                <div className="flex">
                  <Button variant="ghost" className="inline-flex items-center">
                    <span className="h-8 w-8 rounded-full bg-legalsetu-gray flex items-center justify-center">
                      <User size={16} className="text-legalsetu-dark" />
                    </span>
                    <ChevronDown size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-legalsetu-primary hover:bg-legalsetu-secondary text-white">Login</Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-legalsetu-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-legalsetu-primary hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link 
              to="/ask"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-legalsetu-primary hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle size={18} className="mr-2" />
              Ask a Legal Question
            </Link>
            <Link 
              to="/summarize"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-legalsetu-primary hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText size={18} className="mr-2" />
              Summarize a Legal Document
            </Link>
            <Link 
              to="/find-lawyer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-legalsetu-primary hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={18} className="mr-2" />
              Find a Lawyer
            </Link>
            
            {isLoggedIn ? (
              <div className="px-3 py-2">
                <span className="block text-base font-medium text-gray-700">My Profile</span>
              </div>
            ) : (
              <Link 
                to="/login"
                className="block px-3 py-2 text-base font-medium text-legalsetu-primary hover:bg-gray-50 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
