'use client'

import React, { useState, useRef, useCallback } from 'react';
import { FileText, Settings, Shield, Zap, Check, X, Info, AlertTriangle, Building, CloudUpload, FolderOpen, CheckCircle, Trash2, Eye, Download, BarChart3, Target, Wrench } from 'lucide-react';

interface FileAnalysis {
  equipmentCount: number;
  specificationsCount: number;
  confidence: number;
  equipment: Array<{
    item: string;
    qty: number;
    location: string;
    specs: string;
  }>;
  specifications: Array<{
    section: string;
    title: string;
    items: number;
  }>;
  changes?: Array<{
    type: string;
    item: string;
    from: number;
    to: number;
    impact: string;
  }>;
}

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  type: string;
  status: string;
  uploadTime: string;
  isSelected: boolean;
  tag: string;
  analysis: FileAnalysis | null;
}

export default function ScoprixUploadInterface() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: 1,
      name: 'HVAC-Floor-2-50%CD.pdf',
      size: '2.1 MB',
      type: 'PDF',
      status: 'analyzed',
      uploadTime: '1 hour ago',
      isSelected: true,
      tag: 'ORIGINAL',
      analysis: {
        equipmentCount: 47,
        specificationsCount: 156,
        confidence: 96,
        equipment: [
          { item: 'VRF Outdoor Unit', qty: 2, location: 'Roof', specs: '10 Ton, NEMA 4X' },
          { item: 'VRF Indoor Units', qty: 12, location: 'Various Offices', specs: 'Ceiling Cassette' },
          { item: 'Ductwork - Main', qty: 450, location: 'Above Ceiling', specs: '24" x 12" Galvanized' }
        ],
        specifications: [
          { section: '23 05 00', title: 'Basic HVAC Requirements', items: 45 },
          { section: '23 36 00', title: 'VRF Systems', items: 67 },
          { section: '23 31 00', title: 'Ductwork', items: 44 }
        ]
      }
    },
    {
      id: 2,
      name: 'HVAC-Floor-2-100%CD.pdf',
      size: '2.8 MB',
      type: 'PDF',
      status: 'analyzed',
      uploadTime: '5 minutes ago',
      isSelected: true,
      tag: 'REVISED',
      analysis: {
        equipmentCount: 52,
        specificationsCount: 168,
        confidence: 94,
        equipment: [
          { item: 'VRF Outdoor Unit', qty: 3, location: 'Roof', specs: '10 Ton, NEMA 4X' },
          { item: 'VRF Indoor Units', qty: 15, location: 'Various Offices', specs: 'Ceiling Cassette' },
          { item: 'Ductwork - Main', qty: 520, location: 'Above Ceiling', specs: '24" x 12" Galvanized' }
        ],
        specifications: [
          { section: '23 05 00', title: 'Basic HVAC Requirements', items: 48 },
          { section: '23 36 00', title: 'VRF Systems', items: 72 },
          { section: '23 31 00', title: 'Ductwork', items: 48 }
        ],
        changes: [
          { type: 'added', item: 'VRF Outdoor Unit', from: 2, to: 3, impact: 'high' },
          { type: 'modified', item: 'VRF Indoor Units', from: 12, to: 15, impact: 'medium' },
          { type: 'modified', item: 'Ductwork - Main', from: 450, to: 520, impact: 'medium' }
        ]
      }
    }
  ]);

  const [isDragOver, setIsDragOver] = useState(false);
  const [showToast, setShowToast] = useState<{title: string, message: string, type: string} | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFileForAnalysis, setSelectedFileForAnalysis] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToastMessage = (title: string, message: string, type: string = 'info') => {
    setShowToast({ title, message, type });
    setTimeout(() => setShowToast(null), 4000);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileUpload = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    showToastMessage('Upload Started', `Processing ${files.length} file(s)...`, 'info');
    
    // Simulate upload with progress
    setTimeout(() => {
      const newFiles: UploadedFile[] = files.map((file, index) => ({
        id: uploadedFiles.length + index + 1,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('dwg') ? 'DWG' : 'DOC',
        status: 'processing',
        uploadTime: 'Just now',
        isSelected: true,
        tag: 'NEW',
        analysis: null
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      showToastMessage('Upload Complete', 'Files uploaded successfully and queued for analysis', 'success');
    }, 2000);
  }, [uploadedFiles.length]);

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

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-8 h-8 text-white" />;
      case 'DWG': return <BarChart3 className="w-8 h-8 text-white" />;
      default: return <FileText className="w-8 h-8 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzed': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'from-red-500 to-red-600';
      case 'DWG': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const selectedCount = uploadedFiles.filter(file => file.isSelected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 lg:p-6">
      {/* Toast Notification */}
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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 lg:p-8 mb-8 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  Scoprix Labs
                </h1>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg animate-pulse">
                  Enterprise
                </span>
              </div>
              <div className="lg:ml-4">
                <div className="text-xl font-bold text-gray-800 tracking-tight">
                  Metro Hospital HVAC Retrofit
                </div>
                <div className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Project #4521 • SOC 2 Compliant
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => showToastMessage('Audit Log', 'Opening comprehensive audit and compliance history...', 'info')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Audit Log
              </button>
              <button 
                className="bg-white/80 text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={() => showToastMessage('Settings', 'Opening system configuration panel...', 'info')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'upload', label: 'Upload & Process', icon: CloudUpload },
            { id: 'analysis', label: 'Analysis Results', icon: BarChart3 },
            { id: 'compare', label: 'Compare & COR', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Section */}
          <main className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>
            
            <div className="relative p-8">
              {activeTab === 'upload' && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <CloudUpload className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      Upload Construction Documents
                    </h2>
                    <div className="relative">
                      <button 
                        className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 rounded-full flex items-center justify-center font-bold hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                        onMouseEnter={() => setActiveTooltip('upload-tip')}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      {activeTooltip === 'upload-tip' && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-80 bg-gray-900/95 backdrop-blur-sm text-white p-6 rounded-2xl shadow-2xl z-50 animate-in fade-in duration-200">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3 text-yellow-400 font-bold">
                              <Zap className="w-4 h-4" />
                              <span>Upload Strategy Pro Tips</span>
                            </div>
                          </div>
                          <div className="text-sm leading-relaxed space-y-2">
                            <div className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                              <span>Upload both 50% and 100% construction documents for optimal change detection</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                              <span>Include equipment schedules and vendor submittals for comprehensive analysis</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Zap className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                              <span><strong>95%+ accuracy</strong> in change detection with complete document sets!</span>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Integration Banner */}
                  <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xl font-bold text-gray-900 mb-2">
                          Connected Integrations
                        </div>
                        <div className="text-gray-600">
                          Real-time sync with construction management platforms
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                          onClick={() => showToastMessage('Procore Sync', 'Syncing project data with Procore platform...', 'info')}
                        >
                          <Building className="w-4 h-4 mr-2" />
                          Procore
                        </button>
                        <button 
                          className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-600 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                          onClick={() => showToastMessage('Bluebeam Sync', 'Exporting markups to Bluebeam platform...', 'info')}
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Bluebeam
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Upload Area */}
                  <div 
                    className={`relative rounded-2xl p-12 text-center cursor-pointer mb-8 transition-all duration-300 border-3 border-dashed ${
                      isDragOver 
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105 shadow-2xl' 
                        : 'border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:shadow-lg hover:-translate-y-1'
                    } focus:outline-none focus:ring-4 focus:ring-blue-300`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                    tabIndex={0}
                    role="button"
                    aria-label="Upload construction documents by clicking here or dragging files"
                  >
                    {/* Background animation overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="mb-6">
                        <CloudUpload className={`w-16 h-16 mx-auto transition-all duration-300 ${
                          isDragOver ? 'text-blue-500 animate-bounce' : 'text-gray-400 hover:text-blue-500'
                        }`} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-700 mb-3">
                        <span className="hidden sm:inline">
                          {isDragOver ? 'Drop files here!' : 'Drag & drop files here or click to browse'}
                        </span>
                        <span className="sm:hidden">Tap to upload files</span>
                      </h3>
                      
                      <p className="text-gray-500 mb-6 text-lg">
                        Upload drawings, specifications, and vendor submittals
                      </p>
                      
                      <div className="inline-flex items-center gap-3 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-semibold border-2 border-red-200 shadow-md">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Maximum file size: 100MB per file</span>
                      </div>

                      <input 
                        type="file" 
                        ref={fileInputRef}
                        multiple 
                        className="hidden"
                        accept=".pdf,.dwg,.dxf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
                      />
                    </div>
                  </div>

                  {/* File Type Indicators */}
                  <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {[
                      { label: 'PDF Drawings', icon: FileText, color: 'from-red-100 to-red-50 text-red-700 border-red-200' },
                      { label: 'DWG/DXF', icon: BarChart3, color: 'from-blue-100 to-blue-50 text-blue-700 border-blue-200' },
                      { label: 'Excel Specs', icon: FileText, color: 'from-green-100 to-green-50 text-green-700 border-green-200' },
                      { label: 'Word Docs', icon: FileText, color: 'from-purple-100 to-purple-50 text-purple-700 border-purple-200' },
                      { label: 'Images', icon: Eye, color: 'from-yellow-100 to-yellow-50 text-yellow-700 border-yellow-200' }
                    ].map((type, index) => (
                      <span key={index} className={`px-4 py-2 bg-gradient-to-r ${type.color} rounded-xl font-semibold border shadow-sm`}>
                        <type.icon className="w-4 h-4 mr-2 inline" />
                        {type.label}
                      </span>
                    ))}
                  </div>

                  {/* Selected Files Info */}
                  {selectedCount > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8 shadow-lg animate-in fade-in duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-900 font-bold text-lg">
                            {selectedCount} file{selectedCount !== 1 ? 's' : ''} selected
                          </p>
                          <p className="text-blue-700">Ready for version comparison and analysis</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show message if no file selected or no analysis available */}
                  {!selectedFileForAnalysis && (
                    <div className="text-center py-12">
                      <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Document</h3>
                      <p className="text-gray-600">
                        Choose an analyzed document above to view detailed results
                      </p>
                    </div>
                  )}

                  {selectedFileForAnalysis && !selectedFileForAnalysis.analysis && (
                    <div className="text-center py-12">
                      <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Not Available</h3>
                      <p className="text-gray-600">
                        This document is still being processed or analysis failed
                      </p>
                    </div>
                  )}

                  {/* File List */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FolderOpen className="w-5 h-5 text-blue-500" />
                      Uploaded Files
                    </h3>
                    <div className="space-y-4">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-300 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                          <div className="flex items-center gap-6">
                            <input 
                              type="checkbox" 
                              checked={file.isSelected}
                              onChange={() => toggleFileSelection(file.id)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-4"
                            />
                            <div className={`w-16 h-16 bg-gradient-to-br ${getFileTypeColor(file.type)} rounded-2xl flex items-center justify-center shadow-lg`}>
                              {getFileIcon(file.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-bold text-gray-900 text-lg">{file.name}</h4>
                                <span className={`px-3 py-1 text-white text-sm font-bold rounded-lg shadow-md ${
                                  file.tag === 'ORIGINAL' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                                  file.tag === 'REVISED' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                  'bg-gradient-to-r from-blue-500 to-blue-600'
                                }`}>
                                  {file.tag}
                                </span>
                                {file.analysis && (
                                  <div className="relative">
                                    <button 
                                      className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                                      onMouseEnter={() => setActiveTooltip(`analysis-${file.id}`)}
                                      onMouseLeave={() => setActiveTooltip(null)}
                                    >
                                      <Info className="w-3 h-3" />
                                    </button>
                                    {activeTooltip === `analysis-${file.id}` && (
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-gray-900/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-2xl z-50 animate-in fade-in duration-200">
                                        <div className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                                          <BarChart3 className="w-4 h-4" />
                                          File Analysis
                                        </div>
                                        <div className="text-sm">
                                          This document contains {file.analysis.equipmentCount} equipment items and {file.analysis.specificationsCount} specifications. 
                                          Analysis confidence: {file.analysis.confidence}%. Perfect for comparison analysis!
                                        </div>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-gray-900"></div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-600">{file.size} • Uploaded {file.uploadTime} • {file.status === 'analyzed' ? 'Analysis complete' : 'Processing...'}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`px-4 py-2 rounded-xl font-bold border shadow-sm ${getStatusColor(file.status)}`}>
                                {file.status === 'analyzed' && <CheckCircle className="w-4 h-4 mr-2 inline" />}
                                {file.status === 'processing' && <div className="w-4 h-4 mr-2 inline-block border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>}
                                {file.status === 'analyzed' ? 'Analyzed' : 'Processing'}
                              </span>
                              <button 
                                className="w-12 h-12 bg-gray-100 text-gray-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                                onClick={() => showToastMessage('File Preview', `Opening preview for ${file.name}...`, 'info')}
                              >
                                <Eye className="w-5 h-5 mx-auto" />
                              </button>
                              <button 
                                className="w-12 h-12 bg-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300"
                                onClick={() => deleteFile(file.id)}
                              >
                                <Trash2 className="w-5 h-5 mx-auto" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedCount > 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:-translate-y-1"
                        onClick={() => setActiveTab('analysis')}
                      >
                        <Eye className="w-5 h-5 mr-3 inline" />
                        View Analysis Results
                      </button>
                      <button 
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 hover:-translate-y-1"
                        onClick={() => setActiveTab('compare')}
                      >
                        <BarChart3 className="w-5 h-5 mr-3 inline" />
                        Compare Versions & Generate CORs
                      </button>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'analysis' && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      Document Analysis Results
                    </h2>
                  </div>

                  {/* File Selection for Analysis */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Select Document to Analyze</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {uploadedFiles.filter(f => f.status === 'analyzed').map((file) => (
                        <button
                          key={file.id}
                          onClick={() => setSelectedFileForAnalysis(file)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            selectedFileForAnalysis?.id === file.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${getFileTypeColor(file.type)} rounded-xl flex items-center justify-center shadow-lg`}>
                              {getFileIcon(file.type)}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{file.name}</div>
                              <div className="text-sm text-gray-600">{file.analysis?.equipmentCount} equipment items • {file.analysis?.confidence}% confidence</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Analysis Results Display */}
                  {selectedFileForAnalysis && selectedFileForAnalysis.analysis && (
                    <div className="space-y-6">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <BarChart3 className="w-8 h-8 text-blue-500" />
                            <div>
                              <div className="text-2xl font-bold text-blue-900">{selectedFileForAnalysis.analysis.equipmentCount}</div>
                              <div className="text-blue-700 text-sm">Equipment Items</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-green-500" />
                            <div>
                              <div className="text-2xl font-bold text-green-900">{selectedFileForAnalysis.analysis.specificationsCount}</div>
                              <div className="text-green-700 text-sm">Specifications</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <Target className="w-8 h-8 text-purple-500" />
                            <div>
                              <div className="text-2xl font-bold text-purple-900">{selectedFileForAnalysis.analysis.confidence}%</div>
                              <div className="text-purple-700 text-sm">AI Confidence</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Equipment Analysis */}
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-blue-500" />
                            Equipment Schedule
                          </h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specifications</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedFileForAnalysis.analysis.equipment.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{item.item}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {item.qty}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.location}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.specs}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                                      Edit
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Specifications Analysis */}
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-green-500" />
                            Technical Specifications
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedFileForAnalysis.analysis.specifications.map((spec, index) => (
                              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="font-bold text-gray-900">{spec.section}</div>
                                <div className="text-sm text-gray-600 mt-1">{spec.title}</div>
                                <div className="text-lg font-bold text-blue-600 mt-2">{spec.items} items</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Changes Detection (if available) */}
                      {selectedFileForAnalysis.analysis.changes && (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5 text-orange-500" />
                              Detected Changes from Previous Version
                            </h3>
                          </div>
                          <div className="p-6">
                            <div className="space-y-4">
                              {selectedFileForAnalysis.analysis.changes.map((change, index) => (
                                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                                  change.type === 'added' ? 'bg-green-50 border-green-500' :
                                  change.type === 'modified' ? 'bg-yellow-50 border-yellow-500' :
                                  'bg-red-50 border-red-500'
                                }`}>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-bold text-gray-900">{change.item}</div>
                                      <div className="text-sm text-gray-600">
                                        {change.type === 'added' ? `Added ${change.to} units` :
                                         change.type === 'modified' ? `Changed from ${change.from} to ${change.to} units` :
                                         `Removed ${change.from} units`}
                                      </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      change.impact === 'high' ? 'bg-red-100 text-red-800' :
                                      change.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-blue-100 text-blue-800'
                                    }`}>
                                      {change.impact} impact
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-4 justify-center">
                        <button 
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                          onClick={() => showToastMessage('Analysis Export', 'Generating detailed analysis report...', 'info')}
                        >
                          <Download className="w-4 h-4 mr-2 inline" />
                          Export Analysis
                        </button>
                        <button 
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                          onClick={() => setActiveTab('compare')}
                        >
                          <BarChart3 className="w-4 h-4 mr-2 inline" />
                          Compare with Other Files
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'compare' && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      Compare Documents & Generate CORs
                    </h2>
                  </div>

                  {selectedCount > 1 ? (
                    <div className="text-center py-12">
                      <div className="mb-6">
                        <BarChart3 className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Compare</h3>
                        <p className="text-gray-600">
                          {selectedCount} files selected for version comparison and COR generation
                        </p>
                      </div>
                      <button 
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 hover:-translate-y-1"
                        onClick={() => showToastMessage('Analysis Started', 'Comparing document versions and generating change orders...', 'info')}
                      >
                        <BarChart3 className="w-5 h-5 mr-3 inline" />
                        Start Comparison Analysis
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Need More Files</h3>
                      <p className="text-gray-600 mb-6">
                        Please select at least 2 analyzed files to compare versions and generate change orders.
                      </p>
                      <button 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        onClick={() => setActiveTab('upload')}
                      >
                        <CloudUpload className="w-4 h-4 mr-2 inline" />
                        Upload More Files
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>

          {/* Analysis Sidebar */}
          <aside className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-green-500" />
              Analysis Dashboard
            </h3>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="text-green-800 font-bold mb-2">Ready for Analysis</div>
                <div className="text-2xl font-bold text-green-900">{selectedCount} Files</div>
                <div className="text-sm text-green-700 mt-1">Optimal comparison set detected</div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="text-blue-800 font-bold mb-2">Processing Speed</div>
                <div className="text-2xl font-bold text-blue-900">2.4 min</div>
                <div className="text-sm text-blue-700 mt-1">Average analysis time</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <div className="text-purple-800 font-bold mb-2">Accuracy Rate</div>
                <div className="text-2xl font-bold text-purple-900">96.7%</div>
                <div className="text-sm text-purple-700 mt-1">Change detection precision</div>
              </div>

              {/* Recent Analysis Results */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Recent Results
                </h4>
                <div className="space-y-3">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="font-semibold text-yellow-900 text-sm">⚠️ 7 Changes Detected</div>
                    <div className="text-yellow-700 text-xs mt-1">HVAC equipment specifications modified</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="font-semibold text-green-900 text-sm">✅ COR-2024-003 Generated</div>
                    <div className="text-green-700 text-xs mt-1">$47,250 additional scope identified</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="font-semibold text-blue-900 text-sm">📋 RFI-2024-012 Triggered</div>
                    <div className="text-blue-700 text-xs mt-1">NEMA 4X clarification required</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-md hover:shadow-lg"
                    onClick={() => showToastMessage('COR Generator', 'Opening change order generator with detected modifications...', 'info')}
                  >
                    <FileText className="w-4 h-4 mr-2 inline" />
                    Generate COR
                  </button>
                  <button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md hover:shadow-lg"
                    onClick={() => showToastMessage('RFI Creator', 'Creating RFI for specification clarifications...', 'info')}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2 inline" />
                    Create RFI
                  </button>
                  <button 
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-md hover:shadow-lg"
                    onClick={() => showToastMessage('Budget Assistant', 'Launching rough order of magnitude generator...', 'info')}
                  >
                    <BarChart3 className="w-4 h-4 mr-2 inline" />
                    ROM Estimate
                  </button>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">
                      AI Analysis Disclaimer
                    </div>
                    <div className="text-gray-600 text-xs leading-relaxed">
                      This tool provides AI-powered assistance for construction document analysis. 
                      All outputs require review by licensed professionals. Not a substitute for 
                      engineering judgment or code compliance verification.
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicator for Processing Files */}
              {uploadedFiles.some(file => file.status === 'processing') && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                    <div className="font-semibold text-yellow-900">Processing Files...</div>
                  </div>
                  <div className="w-full bg-yellow-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300" style={{width: '65%'}}></div>
                  </div>
                  <div className="text-yellow-700 text-xs">
                    Analyzing document structure and extracting specifications...
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span>Scoprix Core™ v1.0.3</span>
            <span>•</span>
            <span>WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span>SOC 2 Type II Certified</span>
          </div>
          <div>
            Built for construction professionals by construction professionals
          </div>
        </footer>
      </div>
    </div>
  );
}