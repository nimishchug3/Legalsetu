
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-legalsetu-dark text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LegalSetu</h3>
            <p className="text-gray-300 text-sm">
              Making legal assistance accessible, understandable and affordable for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/ask" className="hover:text-legalsetu-primary">Ask a Legal Question</Link></li>
              <li><Link to="/summarize" className="hover:text-legalsetu-primary">Summarize Documents</Link></li>
              <li><Link to="/find-lawyer" className="hover:text-legalsetu-primary">Find a Lawyer</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/faq" className="hover:text-legalsetu-primary">FAQs</Link></li>
              <li><a href="#" className="hover:text-legalsetu-primary">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-legalsetu-primary">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-legalsetu-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-legalsetu-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-legalsetu-primary">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} LegalSetu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
