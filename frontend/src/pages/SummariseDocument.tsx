
import React, { useState } from 'react';
import { Upload, CheckCircle, File, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const SummarizeDocumentPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  
  // Sample analysis result
  const [analysisResult, setAnalysisResult] = useState({
    summary: '',
    timelines: [],
    parties: [],
    lawSections: []
  });
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFile(selectedFile);
    }
  };
  
  const handleFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    
    if (allowedTypes.includes(file.type)) {
      setFile(file);
      setIsUploaded(true);
    } else {
      alert('Please upload a valid document (PDF, DOC, DOCX, JPG, PNG)');
    }
  };
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      
      // Sample data for demonstration
      setAnalysisResult({
        summary: 'This is a tenancy agreement between Amit Kumar (Landlord) and Priya Singh (Tenant) for property located at 123 Main St, New Delhi for a period of 11 months starting from Jan 1, 2023, with a monthly rent of ₹15,000 and security deposit of ₹45,000.',
        timelines: [
          { date: 'January 1, 2023', event: 'Lease agreement begins' },
          { date: 'January 5, 2023', event: 'First rent payment due' },
          { date: 'November 30, 2023', event: 'Lease agreement expires' },
        ],
        parties: [
          { name: 'Amit Kumar', role: 'Landlord' },
          { name: 'Priya Singh', role: 'Tenant' },
        ],
        lawSections: [
          { section: 'Section 107', law: 'Transfer of Property Act', description: 'Leases, how made' },
          { section: 'Section 108', law: 'Transfer of Property Act', description: 'Rights and liabilities of lessor and lessee' },
          { section: 'Delhi Rent Control Act', law: 'State Law', description: 'Governs rights of tenants and landlords' },
        ]
      });
    }, 3000);
  };
  
  const reset = () => {
    setFile(null);
    setIsUploaded(false);
    setIsAnalyzing(false);
    setIsAnalyzed(false);
    setAnalysisResult({
      summary: '',
      timelines: [],
      parties: [],
      lawSections: []
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-legalsetu-dark mb-2">Summarize a Legal Document</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your legal document to get an instant summary, extract key information, identify relevant laws, and understand the timeline of events.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="font-bold text-xl mb-4">How It Works</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-legalsetu-primary text-white flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Upload Your Document</p>
                      <p className="text-sm text-gray-600">Upload a PDF, DOC, DOCX, JPG, or PNG file.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-legalsetu-primary text-white flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">AI Analysis</p>
                      <p className="text-sm text-gray-600">Our AI analyzes the document to extract key information.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-legalsetu-primary text-white flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">View Summary</p>
                      <p className="text-sm text-gray-600">Get a simplified summary, timelines, parties, and relevant laws.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-legalsetu-primary text-white flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Ask Questions</p>
                      <p className="text-sm text-gray-600">Use our chat to ask specific questions about the document.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <AlertCircle className="text-legalsetu-primary flex-shrink-0 mr-2" size={18} />
                    <p className="text-sm text-gray-700">
                      LegalSetu ensures complete privacy. Your documents are processed securely and not stored permanently on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {!isAnalyzed ? (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="font-bold text-xl mb-4">Upload Document</h2>
                  
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                      isDragging ? 'border-legalsetu-primary bg-blue-50' : 'border-gray-300'
                    } ${isUploaded ? 'bg-green-50' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input 
                      type="file" 
                      id="file-upload"
                      className="hidden" 
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    
                    {isUploaded ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="text-green-500 mb-2" size={40} />
                        <p className="font-medium">Document Uploaded Successfully</p>
                        <p className="text-sm text-gray-600 mt-1">{file?.name}</p>
                        <div className="flex gap-3 mt-4">
                          <Button 
                            variant="outline" 
                            className="text-gray-600 border-gray-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              reset();
                            }}
                          >
                            Change File
                          </Button>
                          <Button 
                            className="bg-legalsetu-primary hover:bg-legalsetu-secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAnalyze();
                            }}
                          >
                            {isAnalyzing ? 'Analyzing...' : 'Analyze Document'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="text-gray-400 mb-2" size={40} />
                        <p className="font-medium">Drag and drop your document here</p>
                        <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                        <p className="text-xs text-gray-400 mt-4">Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
                      </div>
                    )}
                  </div>
                  
                  {isAnalyzing && (
                    <div className="mt-6">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-legalsetu-primary animate-pulse" style={{ width: '70%' }}></div>
                      </div>
                      <p className="text-center text-sm text-gray-500 mt-2">
                        Analyzing your document... This may take a moment.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-bold text-xl">Document Analysis</h2>
                      <Button variant="outline" onClick={reset}>
                        Analyze Another Document
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4 bg-blue-50 p-3 rounded-lg">
                      <File className="text-legalsetu-primary" size={20} />
                      <span className="text-sm">{file?.name}</span>
                    </div>
                    
                    <Card className="mb-4">
                      <CardHeader>
                        <CardTitle className="text-lg text-legalsetu-dark">Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{analysisResult.summary}</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="mb-4">
                      <CardHeader>
                        <CardTitle className="text-lg text-legalsetu-dark">Timeline of Events</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analysisResult.timelines.map((timeline, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-legalsetu-primary text-white flex items-center justify-center flex-shrink-0 mr-2">
                                {idx + 1}
                              </div>
                              <div>
                                <p className="font-medium">{timeline.date}</p>
                                <p className="text-sm text-gray-600">{timeline.event}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-legalsetu-dark">Parties Involved</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {analysisResult.parties.map((party, idx) => (
                              <div key={idx} className="flex justify-between">
                                <p className="font-medium">{party.name}</p>
                                <p className="text-gray-600">{party.role}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-legalsetu-dark">Relevant Law Sections</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {analysisResult.lawSections.map((law, idx) => (
                              <div key={idx} className="text-sm">
                                <p className="font-medium">{law.section}</p>
                                <p className="text-gray-600">{law.law} - {law.description}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button className="bg-legalsetu-primary hover:bg-legalsetu-secondary">
                        Ask Questions About This Document
                      </Button>
                    </div>
                  </div>
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

export default SummarizeDocumentPage;
