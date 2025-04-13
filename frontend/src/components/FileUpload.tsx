import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Upload, FileText, Clock, MessageSquareText, CheckCircle, AlertCircle, FileQuestion, Calendar, Scale, AlertTriangle, Book } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';

const SummarizeDocumentPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  }, []);

  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  // Summary download handler
  const handleDownloadSummary = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-summary-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // File upload handler
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setSummary('');
      setError('');

      const response = await axios.post(
        'http://localhost:8000/api/v1/summary/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to get summary. Make sure backend is running and accepts PDF files.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Summary parser
  const parseSummary = (text: string) => {
    const sections: Record<string, string[]> = {
      documentType: [],
      legalPoints: [],
      dates: [],
      risks: [],
      terminology: []
    };

    const sectionMap: Record<string, keyof typeof sections> = {
      '## Document Type and Purpose': 'documentType',
      '## Key Legal Points': 'legalPoints',
      '## Important Dates': 'dates',
      '## Risks and Concerns': 'risks',
      '## Legal Terminology': 'terminology'
    };

    let currentSection: keyof typeof sections | null = null;
    
    text.split('\n').forEach(line => {
      const sectionHeader = Object.keys(sectionMap).find(header => line.startsWith(header));
      if (sectionHeader) {
        currentSection = sectionMap[sectionHeader];
        return;
      }
      
      if (currentSection && line.trim()) {
        const cleanedLine = line
          .replace(/^- /, '')
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .trim();
        sections[currentSection].push(cleanedLine);
      }
    });
    
    return sections;
  };

  // UI steps configuration
  const steps = [
    { icon: <Upload className="w-6 h-6" />, title: "Upload Your Document", description: "Upload a PDF, DOC, DOCX, JPG, or PNG file." },
    { icon: <Clock className="w-6 h-6" />, title: "AI Analysis", description: "Our AI analyzes the document to extract key information." },
    { icon: <FileText className="w-6 h-6" />, title: "View Summary", description: "Get a simplified summary, timelines, parties, and relevant laws." },
    { icon: <MessageSquareText className="w-6 h-6" />, title: "Ask Questions", description: "Use our chat to ask specific questions about the document." }
  ];

  const summaryData = summary ? parseSummary(summary) : null;

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

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* How It Works Column */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">How It Works</h2>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-legalsetu-primary text-white flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {step.icon}
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <AlertCircle className="text-legalsetu-primary flex-shrink-0 mr-2" size={18} />
                  <p className="text-sm text-gray-700">
                    LegalSetu ensures complete privacy. Your documents are processed securely and not stored permanently on our servers.
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Column */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Document</h2>
              <div
                className={`border-2 border-dashed rounded-lg p-8 ${
                  dragActive ? 'border-legalsetu-primary bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg mb-2">Drag and drop your document here</p>
                  <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-legalsetu-primary hover:bg-legalsetu-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    Browse Files
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
                </div>
              </div>

              {file && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <FileQuestion className="w-5 h-5 text-legalsetu-primary" />
                    <p className="text-sm text-gray-700 flex-grow">
                      Selected file: <span className="font-medium">{file.name}</span>
                    </p>
                    <Button
                      onClick={handleUpload}
                      disabled={loading}
                      className="bg-legalsetu-primary hover:bg-legalsetu-secondary"
                    >
                      {loading ? (
                        <>
                          <Clock className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Processing...
                        </>
                      ) : (
                        'Analyze Document'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full-width Summary Section */}
          {summaryData && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-legalsetu-primary" />
                <h3 className="text-lg font-semibold text-legalsetu-dark">Document Analysis Complete</h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-legalsetu-primary" />
                    <h4 className="font-semibold text-gray-900">Document Type & Purpose</h4>
                  </div>
                  <div className="space-y-2">
                    {summaryData.documentType.map((point, index) => (
                      <p key={index} className="text-gray-700">{point}</p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Scale className="w-5 h-5 text-legalsetu-primary" />
                      <h4 className="font-semibold text-gray-900">Key Legal Points</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {summaryData.legalPoints.map((point, index) => (
                        <p key={index} className="text-gray-700">{point}</p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-legalsetu-primary" />
                      <h4 className="font-semibold text-gray-900">Important Dates</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {summaryData.dates.map((date, index) => (
                        <p key={index} className="text-gray-700">{date}</p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <h4 className="font-semibold text-gray-900">Risks & Concerns</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {summaryData.risks.map((risk, index) => (
                        <p key={index} className="text-gray-700">{risk}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Book className="w-5 h-5 text-legalsetu-primary" />
                    <h4 className="font-semibold text-gray-900">Legal Terminology</h4>
                  </div>
                  <div className="space-y-2">
                    {summaryData.terminology.map((term, index) => (
                      <p key={index} className="text-gray-700">{term}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleDownloadSummary}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download Summary
                  </Button>
                  <Button className="flex-1 bg-legalsetu-primary hover:bg-legalsetu-secondary">
                    <MessageSquareText className="w-4 h-4 mr-2" />
                    Ask Questions
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default SummarizeDocumentPage;