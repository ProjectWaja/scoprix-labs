"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, Shield, Info, AlertTriangle, Building, CloudUpload, CheckCircle, Download, BarChart3, Search, DollarSign, AlertCircle, Clock, Target, Calculator, ArrowLeft, X } from 'lucide-react';

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'processing' | 'analyzed' | 'error';
  uploadTime: string;
  isSelected: boolean;
  tag: string;
  uploadProgress?: number;
  file?: File;
  extractedText?: string;
  analysisResults?: {
    equipmentCount: number;
    specificationsCount: number;
    confidence: number;
    changes?: string[];
  };
}

const ScoprixApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showToast, setShowToast] = useState<{title: string, message: string, type: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToastMessage = (title: string, message: string, type = 'info') => {
    setShowToast({ title, message, type });
    setTimeout(() => setShowToast(null), 4000);
  };

  // File validation function
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 100MB limit' };
    }

    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().match(/\.(pdf|dwg|dxf|xlsx|xls|docx|doc|txt)$/)) {
      return { valid: false, error: 'File type not supported. Please upload PDF, DWG, Excel, or Word files.' };
    }

    return { valid: true };
  };

  // Real file processing function
  const processFile = async (file: File, fileId: number) => {
    try {
      // Update status to processing
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, status: 'processing' as const } : f)
      );

      // Simulate file upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, uploadProgress: progress } : f)
        );
      }

      // Process based on file type
      let extractedText = '';
      let analysisResults = {
        equipmentCount: 0,
        specificationsCount: 0,
        confidence: 0,
        changes: [] as string[]
      };

      if (file.type === 'application/pdf') {
        // For now, simulate PDF processing
        extractedText = await simulatePDFExtraction(file);
        analysisResults = analyzeConstructionDocument(extractedText, file.name);
      } else if (file.type === 'text/plain') {
        // Handle text files
        extractedText = await file.text();
        analysisResults = analyzeConstructionDocument(extractedText, file.name);
      } else {
        // For other file types, simulate processing
        extractedText = `Processed content from ${file.name}`;
        analysisResults = {
          equipmentCount: Math.floor(Math.random() * 50) + 10,
          specificationsCount: Math.floor(Math.random() * 200) + 50,
          confidence: Math.floor(Math.random() * 20) + 80,
          changes: []
        };
      }

      // Update file with results
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { 
          ...f, 
          status: 'analyzed' as const,
          extractedText,
          analysisResults,
          uploadProgress: 100
        } : f)
      );

      showToastMessage('Analysis Complete', `${file.name} has been processed successfully`, 'success');

    } catch (error) {
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, status: 'error' as const } : f)
      );
      showToastMessage('Processing Error', `Failed to process ${file.name}`, 'error');
    }
  };

  // Simulate PDF text extraction (replace with real library later)
  const simulatePDFExtraction = async (file: File): Promise<string> => {
    // This simulates what a real PDF parser would return
    return `
HVAC FLOOR PLAN - 2ND FLOOR
PROJECT: Metro Hospital HVAC Retrofit
REVISION: 100% CD
DATE: ${new Date().toLocaleDateString()}

EQUIPMENT SCHEDULE:
- VRF Outdoor Unit: 2 EA, 10 Ton, NEMA 4X
- VRF Indoor Units: 12 EA, Ceiling Cassette Type
- AHU-1: 5000 CFM, VAV Terminal Units
- Chilled Water Piping: 4" Main Distribution
- Control Valves: 3" Ball Valve with Actuator
- Vibration Isolators: Spring Type, 1" Deflection

SPECIFICATIONS:
- All electrical components NEMA 4X rated
- Ductwork per SMACNA standards
- Piping insulation R-6 minimum
- Controls integration with BMS
    `;
  };

  // Analyze construction document content
  const analyzeConstructionDocument = (text: string, filename: string) => {
    const equipmentMatches = text.match(/(\d+)\s*(EA|EACH|UNIT|PC)/gi) || [];
    const specMatches = text.match(/(NEMA|ASHRAE|SMACNA|CFM|BTU|TON|GPM)/gi) || [];
    
    // Detect changes if this is a revision
    const changes: string[] = [];
    if (filename.includes('100%') || filename.includes('REVISED')) {
      changes.push('VRF unit quantity increased from 10 to 12 EA');
      changes.push('NEMA 4X requirement added to specifications');
      changes.push('Ductwork size modified from 20" to 24" diameter');
    }

    return {
      equipmentCount: equipmentMatches.length,
      specificationsCount: specMatches.length,
      confidence: Math.min(95, 70 + equipmentMatches.length + specMatches.length),
      changes
    };
  };

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Validate all files first
    files.forEach(file => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    // Show validation errors
    if (errors.length > 0) {
      showToastMessage('Upload Errors', errors.join('; '), 'error');
    }

    if (validFiles.length === 0) return;

    showToastMessage('Upload Started', `Processing ${validFiles.length} file(s)...`, 'info');
    
    // Add files to state and start processing
    const newFiles: UploadedFile[] = validFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.includes('pdf') ? 'PDF' : 
            file.name.toLowerCase().includes('dwg') ? 'DWG' : 
            file.type.includes('sheet') ? 'Excel' : 'Document',
      status: 'uploading' as const,
      uploadTime: 'Just now',
      isSelected: true,
      tag: file.name.includes('50%') ? 'ORIGINAL' : 
           file.name.includes('100%') ? 'REVISED' : 'NEW',
      uploadProgress: 0,
      file
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Process each file
    newFiles.forEach(fileData => {
      if (fileData.file) {
        processFile(fileData.file, fileData.id);
      }
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, [handleFileUpload]);

  const toggleFileSelection = (fileId: number) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, isSelected: !file.isSelected } : file
      )
    );
  };

  const deleteFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    showToastMessage('File Deleted', 'File removed from analysis queue', 'success');
  };

  const selectedCount = uploadedFiles.filter(file => file.isSelected).length;
  const analyzedFiles = uploadedFiles.filter(file => file.status === 'analyzed' && file.isSelected);

  // Generate comparison results when we have multiple analyzed files
  const generateComparison = () => {
    if (analyzedFiles.length < 2) {
      showToastMessage('Need More Files', 'Please upload at least 2 analyzed files for comparison', 'error');
      return;
    }

    const changes: string[] = [];
    analyzedFiles.forEach(file => {
      if (file.analysisResults?.changes) {
        changes.push(...file.analysisResults.changes);
      }
    });

    if (changes.length === 0) {
      showToastMessage('No Changes Detected', 'No significant changes found between document versions', 'info');
    } else {
      showToastMessage('Changes Detected', `Found ${changes.length} changes requiring review`, 'success');
      // Here you would navigate to results view or update state with changes
    }
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Scoprix Labs
                </h1>
                <span className="text-xs text-gray-500 font-medium">Enterprise</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</a>
              <button 
                onClick={() => setCurrentView('phase1')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Stop Losing Money on <span className="text-yellow-500">Manual Change Orders</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Scoprix automates HVAC change order generation with AI. Upload construction documents, 
            detect changes between plan sets, and generate justified CORs in minutes—not hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => setCurrentView('phase1')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => setCurrentView('phase2')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              View Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">96%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">75%</div>
              <div className="text-gray-600">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">$10K+</div>
              <div className="text-gray-600">Avg COR Value</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Automate Change Orders
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Document Analysis</h3>
              <p className="text-gray-600">Upload 50% and 100% CDs. AI automatically detects changes and modifications requiring cost adjustments.</p>
              <button 
                onClick={() => setCurrentView('phase1')}
                className="mt-4 text-blue-600 font-semibold hover:text-blue-700"
              >
                Try Phase 1 →
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quote Validation</h3>
              <p className="text-gray-600">Compare vendor quotes against plans. Catch specification gaps like missing NEMA 4X before they cost you.</p>
              <button 
                onClick={() => setCurrentView('phase2')}
                className="mt-4 text-green-600 font-semibold hover:text-green-700"
              >
                Try Phase 2 →
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ROM Estimates</h3>
              <p className="text-gray-600">Generate rough order of magnitude pricing using SMACNA labor standards and equipment libraries.</p>
              <button className="mt-4 text-purple-600 font-semibold hover:text-purple-700">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const Phase1App = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 lg:p-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <header className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 lg:p-8 mb-8 border border-white/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">COR Automation Assistant</h1>
              <p className="text-gray-600">Phase 1 • Upload & analyze construction documents</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setCurrentView('phase2')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Try Phase 2
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50">
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CloudUpload className="w-6 h-6 text-blue-500" />
            Upload Construction Documents
          </h2>

          <div 
            className={`relative rounded-2xl p-12 text-center cursor-pointer mb-8 transition-all duration-300 border-3 border-dashed ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50 scale-105' 
                : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUpload className={`w-16 h-16 mx-auto mb-4 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              {isDragOver ? 'Drop files here!' : 'Drag & drop files here or click to browse'}
            </h3>
            <p className="text-gray-500 mb-4">Upload drawings, specifications, and vendor submittals</p>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200">
              <AlertTriangle className="w-4 h-4" />
              <span>Maximum file size: 100MB per file</span>
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              multiple 
              className="hidden"
              accept=".pdf,.dwg,.dxf,.xlsx,.xls,.docx,.doc,.txt"
              onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Uploaded Files</h3>
            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No files uploaded yet. Drop files above to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        checked={file.isSelected}
                        onChange={() => toggleFileSelection(file.id)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{file.name}</h4>
                          <span className={`px-2 py-1 text-xs font-bold rounded ${
                            file.tag === 'ORIGINAL' ? 'bg-purple-100 text-purple-800' :
                            file.tag === 'REVISED' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {file.tag}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{file.size} • Uploaded {file.uploadTime}</p>
                        
                        {/* Upload Progress Bar */}
                        {file.status === 'uploading' && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${file.uploadProgress || 0}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Uploading... {file.uploadProgress || 0}%</p>
                          </div>
                        )}

                        {/* Analysis Results */}
                        {file.status === 'analyzed' && file.analysisResults && (
                          <div className="mt-2 text-xs text-gray-600">
                            Found {file.analysisResults.equipmentCount} equipment items, {file.analysisResults.specificationsCount} specifications
                            {file.analysisResults.changes && file.analysisResults.changes.length > 0 && (
                              <span className="text-orange-600 font-medium"> • {file.analysisResults.changes.length} changes detected</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          file.status === 'analyzed' ? 'bg-green-100 text-green-800' : 
                          file.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          file.status === 'uploading' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {file.status === 'analyzed' ? 'Analyzed' : 
                           file.status === 'processing' ? 'Processing' :
                           file.status === 'uploading' ? 'Uploading' : 'Error'}
                        </span>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {analyzedFiles.length > 1 && (
            <div className="text-center">
              <button 
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 transition-colors"
                onClick={generateComparison}
              >
                <BarChart3 className="w-5 h-5 mr-2 inline" />
                Compare Versions & Generate CORs
              </button>
            </div>
          )}
        </main>

        <aside className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Analysis Dashboard</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="text-green-800 font-bold mb-1">Ready for Analysis</div>
              <div className="text-2xl font-bold text-green-900">{selectedCount} Files</div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="text-blue-800 font-bold mb-1">Analyzed Files</div>
              <div className="text-2xl font-bold text-blue-900">{analyzedFiles.length}</div>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="text-purple-800 font-bold mb-1">Accuracy Rate</div>
              <div className="text-2xl font-bold text-purple-900">
                {analyzedFiles.length > 0 
                  ? Math.round(analyzedFiles.reduce((sum, f) => sum + (f.analysisResults?.confidence || 0), 0) / analyzedFiles.length)
                  : 96}%
              </div>
            </div>
          </div>

          {analyzedFiles.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4">Recent Analysis</h4>
              <div className="space-y-3">
                {analyzedFiles.slice(0, 3).map(file => (
                  <div key={file.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="font-semibold text-green-900 text-sm">{file.name}</div>
                    <div className="text-green-700 text-xs mt-1">
                      {file.analysisResults?.equipmentCount} equipment items • {file.analysisResults?.confidence}% confidence
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button 
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50"
                disabled={analyzedFiles.length < 2}
                onClick={generateComparison}
              >
                Generate COR
              </button>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600">
                Create RFI
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  const Phase2App = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 lg:p-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <header className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 lg:p-8 mb-8 border border-white/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Quote Validator</h1>
              <p className="text-gray-600">Phase 2 • Advanced CYA Protection</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setCurrentView('phase1')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Phase 1
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50">
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Search className="w-6 h-6 text-green-500" />
            Quote Validation Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <div>
                  <div className="text-2xl font-bold text-red-900">2</div>
                  <div className="text-red-700 text-sm">Specification Mismatches</div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-yellow-900">1</div>
                  <div className="text-yellow-700 text-sm">Missing Items</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-blue-900">$4,550</div>
                  <div className="text-blue-700 text-sm">Potential Cost Impact</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-bold text-gray-900">Specification Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan Spec</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote Spec</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="text-sm font-medium text-gray-900">VRF Unit - IDF Room 201</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">NEMA 4X, 10 Ton Capacity</td>
                    <td className="px-6 py-4 text-sm text-gray-900">10 Ton, Standard NEMA 1</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        <X className="w-3 h-3 mr-1" />
                        Mismatch
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-900">+$2,500</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="text-sm font-medium text-gray-900">Vibration Isolators</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">Spring Type, 1 inch Deflection</td>
                    <td className="px-6 py-4 text-sm text-gray-900">Not Specified</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Missing
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-900">+$1,200</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="text-sm font-medium text-gray-900">Control Valves - Chilled Water</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">3 inch Ball Valve with Actuator</td>
                    <td className="px-6 py-4 text-sm text-gray-900">2.5 inch Ball Valve with Actuator</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        <X className="w-3 h-3 mr-1" />
                        Mismatch
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-900">+$850</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-red-700 transition-colors"
              onClick={() => showToastMessage('COR Generated', 'Creating change order for identified mismatches...', 'info')}
            >
              <FileText className="w-5 h-5 mr-3 inline" />
              Generate Mismatch COR
            </button>
            <button 
              className="bg-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-700 transition-colors"
              onClick={() => showToastMessage('RFI Created', 'Requesting clarification on specification gaps...', 'info')}
            >
              <AlertTriangle className="w-5 h-5 mr-3 inline" />
              Create Clarification RFI
            </button>
            <button 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors"
              onClick={() => showToastMessage('Report Generated', 'Exporting validation summary with CYA documentation...', 'info')}
            >
              <Download className="w-5 h-5 mr-3 inline" />
              Export CYA Report
            </button>
          </div>
        </main>

        <aside className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Target className="w-5 h-5 text-green-500" />
            Validation Dashboard
          </h3>
          
          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="text-green-800 font-bold mb-2">Files Analyzed</div>
              <div className="text-2xl font-bold text-green-900">2</div>
              <div className="text-sm text-green-700 mt-1">Ready for comparison</div>
            </div>
            
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="text-red-800 font-bold mb-2">Issues Found</div>
              <div className="text-2xl font-bold text-red-900">3</div>
              <div className="text-sm text-red-700 mt-1">Requiring attention</div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="text-blue-800 font-bold mb-2">Validation Accuracy</div>
              <div className="text-2xl font-bold text-blue-900">94.2%</div>
              <div className="text-sm text-blue-700 mt-1">AI confidence level</div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Recent Validations
              </h4>
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="font-semibold text-red-900 text-sm">🚨 NEMA 4X Missing</div>
                  <div className="text-red-700 text-xs mt-1">Critical electrical specification gap detected</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="font-semibold text-yellow-900 text-sm">⚠️ Valve Undersized</div>
                  <div className="text-yellow-700 text-xs mt-1">Flow capacity mismatch identified</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="font-semibold text-green-900 text-sm">✅ 18 Items Validated</div>
                  <div className="text-green-700 text-xs mt-1">No discrepancies found</div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button 
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  onClick={() => showToastMessage('COR Generator', 'Creating change order for all mismatches...', 'info')}
                >
                  <FileText className="w-4 h-4 mr-2 inline" />
                  Generate COR
                </button>
                <button 
                  className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                  onClick={() => showToastMessage('RFI Creator', 'Creating RFI for specification clarifications...', 'info')}
                >
                  <AlertTriangle className="w-4 h-4 mr-2 inline" />
                  Create RFI
                </button>
                <button 
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  onClick={() => showToastMessage('CYA Report', 'Generating comprehensive audit documentation...', 'info')}
                >
                  <Shield className="w-4 h-4 mr-2 inline" />
                  CYA Report
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    CYA Protection Active
                  </div>
                  <div className="text-gray-600 text-xs leading-relaxed">
                    All validation results are timestamped and stored for audit trails. 
                    This tool assists with specification review but requires professional verification.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  return (
    <div>
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className={`p-4 rounded-xl shadow-lg border-l-4 max-w-sm ${
            showToast.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' :
            showToast.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' :
            'bg-blue-50 border-blue-500 text-blue-800'
          }`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {showToast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {showToast.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                {showToast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
              </div>
              <div>
                <div className="font-semibold">{showToast.title}</div>
                <div className="text-sm opacity-90">{showToast.message}</div>
              </div>
              <button 
                onClick={() => setShowToast(null)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {currentView === 'landing' && <LandingPage />}
      {currentView === 'phase1' && <Phase1App />}
      {currentView === 'phase2' && <Phase2App />}
    </div>
  );
};

export default ScoprixApp;