
import React, { useState } from 'react';
import { Search, MapPin, Star, CheckCircle, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const FindLawyerPage = () => {
  const [filters, setFilters] = useState({
    area: '',
    language: '',
    location: '',
    availability: ''
  });
  
  // Mock data for lawyers
  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: 'Adv. Rajesh Kumar',
      photo: 'https://placehold.co/100x100/1EAEDB/FFFFFF.png?text=RK',
      experience: '15 years',
      rating: 4.8,
      reviews: 56,
      specialization: 'Property Law',
      languages: ['English', 'Hindi', 'Tamil'],
      location: 'New Delhi',
      verified: true,
      availability: 'Available Today',
      description: 'Experienced property law attorney with expertise in real estate transactions, land disputes, and property registration.'
    },
    {
      id: 2,
      name: 'Adv. Priya Singh',
      photo: 'https://placehold.co/100x100/1EAEDB/FFFFFF.png?text=PS',
      experience: '8 years',
      rating: 4.6,
      reviews: 42,
      specialization: 'Family Law',
      languages: ['English', 'Hindi', 'Punjabi'],
      location: 'Mumbai',
      verified: true,
      availability: 'Available Tomorrow',
      description: 'Compassionate family lawyer specializing in divorce cases, child custody matters, and domestic violence issues.'
    },
    {
      id: 3,
      name: 'Adv. Arun Sharma',
      photo: 'https://placehold.co/100x100/1EAEDB/FFFFFF.png?text=AS',
      experience: '12 years',
      rating: 4.9,
      reviews: 78,
      specialization: 'Criminal Law',
      languages: ['English', 'Hindi', 'Marathi'],
      location: 'Pune',
      verified: true,
      availability: 'Available Today',
      description: 'Skilled criminal defense attorney with extensive courtroom experience. Handles both major and minor criminal cases.'
    },
    {
      id: 4,
      name: 'Adv. Meera Patel',
      photo: 'https://placehold.co/100x100/1EAEDB/FFFFFF.png?text=MP',
      experience: '10 years',
      rating: 4.7,
      reviews: 49,
      specialization: 'Corporate Law',
      languages: ['English', 'Gujarati', 'Hindi'],
      location: 'Ahmedabad',
      verified: true,
      availability: 'Available in 3 days',
      description: 'Corporate law specialist with expertise in company formation, compliance, and business transactions.'
    }
  ]);
  
  const areas = ['All Areas', 'Property Law', 'Family Law', 'Criminal Law', 'Corporate Law', 'Civil Law', 'Labor Law'];
  const languages = ['All Languages', 'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi'];
  const locations = ['All Locations', 'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
  const availabilities = ['Any Time', 'Today', 'Tomorrow', 'This Week'];
  
  const handleFilterChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const filteredLawyers = lawyers.filter(lawyer => {
    let match = true;
    
    if (filters.area && filters.area !== 'All Areas') {
      match = match && lawyer.specialization === filters.area;
    }
    
    if (filters.language && filters.language !== 'All Languages') {
      match = match && lawyer.languages.includes(filters.language);
    }
    
    if (filters.location && filters.location !== 'All Locations') {
      match = match && lawyer.location === filters.location;
    }
    
    if (filters.availability) {
      if (filters.availability === 'Today') {
        match = match && lawyer.availability === 'Available Today';
      } else if (filters.availability === 'Tomorrow') {
        match = match && lawyer.availability === 'Available Tomorrow';
      } else if (filters.availability === 'This Week') {
        match = match && (lawyer.availability === 'Available Today' || lawyer.availability === 'Available Tomorrow' || lawyer.availability.includes('3 days'));
      }
    }
    
    return match;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="bg-legalsetu-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Find a Legal Expert</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Connect with verified lawyers in your area who speak your language and specialize in your specific legal matter.
            </p>
            
            <div className="mt-8 bg-white rounded-lg p-2 max-w-3xl mx-auto flex">
              <input
                type="text"
                placeholder="Search by name, specialization, or location..."
                className="flex-grow px-4 py-2 focus:outline-none"
              />
              <Button className="bg-legalsetu-primary hover:bg-legalsetu-secondary">
                <Search size={18} className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="font-bold text-xl mb-6">Filter Lawyers</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area of Law</label>
                    <select 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-legalsetu-primary focus:ring focus:ring-legalsetu-light focus:ring-opacity-50"
                      value={filters.area}
                      onChange={(e) => handleFilterChange('area', e.target.value)}
                    >
                      <option value="">Select Area</option>
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-legalsetu-primary focus:ring focus:ring-legalsetu-light focus:ring-opacity-50"
                      value={filters.language}
                      onChange={(e) => handleFilterChange('language', e.target.value)}
                    >
                      <option value="">Select Language</option>
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-legalsetu-primary focus:ring focus:ring-legalsetu-light focus:ring-opacity-50"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                      <option value="">Select Location</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-legalsetu-primary focus:ring focus:ring-legalsetu-light focus:ring-opacity-50"
                      value={filters.availability}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                    >
                      <option value="">Select Availability</option>
                      {availabilities.map(availability => (
                        <option key={availability} value={availability}>{availability}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-legalsetu-primary text-legalsetu-primary hover:bg-legalsetu-gray"
                    onClick={() => setFilters({ area: '', language: '', location: '', availability: '' })}
                  >
                    Clear Filters
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Lawyer listings */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  {filteredLawyers.length} lawyers found
                </p>
                <select className="border-gray-300 rounded-md shadow-sm focus:border-legalsetu-primary focus:ring focus:ring-legalsetu-light focus:ring-opacity-50">
                  <option>Sort by: Recommended</option>
                  <option>Sort by: Rating (High to Low)</option>
                  <option>Sort by: Experience (Most to Least)</option>
                </select>
              </div>
              
              {filteredLawyers.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <p className="text-gray-600">No lawyers match your filter criteria. Try adjusting your filters.</p>
                </div>
              ) : (
                filteredLawyers.map(lawyer => (
                  <Card key={lawyer.id} className="p-6">
                    <div className="flex flex-col md:flex-row">
                      {/* Lawyer Image */}
                      <div className="mb-4 md:mb-0 md:mr-6">
                        <img 
                          src={lawyer.photo} 
                          alt={lawyer.name} 
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                      </div>
                      
                      {/* Lawyer Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-bold text-lg">{lawyer.name}</h3>
                              {lawyer.verified && (
                                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                                  <CheckCircle size={12} className="mr-1" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="text-legalsetu-primary font-medium">{lawyer.specialization}</p>
                            <p className="text-gray-600 text-sm">{lawyer.experience} experience</p>
                            
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                <Star className="text-yellow-400" size={16} fill="currentColor" />
                                <span className="ml-1 font-medium">{lawyer.rating}</span>
                              </div>
                              <span className="mx-1 text-gray-400">•</span>
                              <span className="text-gray-600 text-sm">{lawyer.reviews} reviews</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 md:mt-0">
                            <div className="flex items-center text-gray-600 text-sm mb-1">
                              <MapPin size={14} className="mr-1" />
                              {lawyer.location}
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar size={14} className="mr-1" />
                              {lawyer.availability}
                            </div>
                            <div className="mt-1 text-sm">
                              Speaks: {lawyer.languages.join(', ')}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mt-3 text-sm">{lawyer.description}</p>
                        
                        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                          <Button className="bg-legalsetu-primary hover:bg-legalsetu-secondary flex items-center">
                            <Calendar size={16} className="mr-2" />
                            Book Consultation
                          </Button>
                          <Button variant="outline" className="border-legalsetu-primary text-legalsetu-primary hover:bg-legalsetu-gray flex items-center">
                            <Phone size={16} className="mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
              
              {filteredLawyers.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="border-legalsetu-primary text-legalsetu-primary hover:bg-legalsetu-gray">
                    Load More
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default FindLawyerPage;
