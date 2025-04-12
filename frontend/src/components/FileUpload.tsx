import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Upload, FileText, Clock, MessageSquareText, CheckCircle, AlertCircle, FileQuestion, Calendar, Scale, AlertTriangle, Book, Users } from 'lucide-react';

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      setFile(files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

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

      const response = await axios.post('http://localhost:8000/api/v1/summary/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to get summary. Make sure backend is running and accepts PDF files.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseSummary = (text: string) => {
    const sections: { [key: string]: string[] } = {
      documentType: [],
      legalPoints: [],
      dates: [],
      risks: [],
      terminology: []
    };
    
    let currentSection = '';
    
    text.split('\n').forEach(line => {
      if (line.includes('Document Type and Purpose:')) {
        currentSection = 'documentType';
      } else if (line.includes('Key Legal Points:')) {
        currentSection = 'legalPoints';
      } else if (line.includes('Important Dates:')) {
        currentSection = 'dates';
      } else if (line.includes('Risks or Concerns:')) {
        currentSection = 'risks';
      } else if (line.includes('Explanation of Terminology:')) {
        currentSection = 'terminology';
      } else if (line.trim() && currentSection) {
        sections[currentSection].push(line.trim());
      }
    });
    
    return sections;
  };

  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Your Document",
      description: "Upload a PDF, DOC, DOCX, JPG, or PNG file."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "AI Analysis",
      description: "Our AI analyzes the document to extract key information."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "View Summary",
      description: "Get a simplified summary, timelines, parties, and relevant laws."
    },
    {
      icon: <MessageSquareText className="w-6 h-6" />,
      title: "Ask Questions",
      description: "Use our chat to ask specific questions about the document."
    }
  ];

  const summaryData = summary ? parseSummary(summary) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Summarize a Legal Document</h1>
        <p className="text-lg text-gray-600">
          Upload your legal document to get an instant summary, extract key information, identify relevant laws, and understand the timeline of events.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
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

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              LegalSetu ensures complete privacy. Your documents are processed securely and not stored permanently on our servers.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Document</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg mb-2">
                Drag and drop your document here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                Browse Files
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, DOC, DOCX, JPG, PNG
              </p>
            </div>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <FileQuestion className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-gray-700 flex-grow">Selected file: <span className="font-medium">{file.name}</span></p>
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                  {loading ? (
                    <>
                      <Clock className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    'Analyze Document'
                  )}
                </button>
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

          {summaryData && (
            <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Document Analysis Complete</h3>
              </div>
              
              <div className="p-6">
                {/* Top Row - Document Type & Purpose */}
                <div className="mb-6 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Document Type & Purpose</h4>
                  </div>
                  <div className="space-y-2">
                    {summaryData.documentType.map((point, index) => (
                      <p key={index} className="text-gray-700">{point}</p>
                    ))}
                  </div>
                </div>

                {/* Middle Row - Three Columns */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Legal Points */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Scale className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Key Legal Points</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {summaryData.legalPoints.map((point, index) => (
                        <p key={index} className="text-gray-700">{point}</p>
                      ))}
                    </div>
                  </div>

                  {/* Important Dates */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Important Dates</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {summaryData.dates.map((date, index) => (
                        <p key={index} className="text-gray-700">{date}</p>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
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

                {/* Bottom Row - Terminology */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Book className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Legal Terminology</h4>
                  </div>
                  <div className="space-y-2">
                    {summaryData.terminology.map((term, index) => (
                      <p key={index} className="text-gray-700">{term}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-gray-200">
                  <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Summary
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <MessageSquareText className="w-4 h-4 mr-2" />
                    Ask Questions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;