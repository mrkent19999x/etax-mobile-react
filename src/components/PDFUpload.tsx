import React, { useState, useRef } from 'react';
import { PDFManager, type PDFFile } from '../services/PDFManager';

interface PDFUploadProps {
  onUpload: (pdfFile: PDFFile) => void;
  category?: string;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ onUpload, category = 'document' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.includes('pdf')) {
      setError('Chỉ chấp nhận file PDF');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File quá lớn (tối đa 10MB)');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const pdfFile = await PDFManager.uploadPDF(file, '', category);
      onUpload(pdfFile);
      setError('');
    } catch (err) {
      setError('Lỗi upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="fas fa-file-pdf text-2xl text-red-500"></i>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {uploading ? 'Đang upload...' : 'Upload file PDF'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Kéo thả file PDF vào đây hoặc click để chọn
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={openFileDialog}
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Đang upload...
                </>
              ) : (
                <>
                  <i className="fas fa-upload mr-2"></i>
                  Chọn file PDF
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-400">
              Tối đa 10MB • Chỉ file PDF
            </p>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              {error}
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default PDFUpload;