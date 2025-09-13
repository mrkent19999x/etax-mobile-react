import React, { useState } from 'react';
import { type PDFFile } from '../services/PDFManager';

interface PDFListProps {
  pdfs: PDFFile[];
  onDelete: (id: string) => void;
  onDownload: (pdf: PDFFile) => void;
  onView: (pdf: PDFFile) => void;
}

const PDFList: React.FC<PDFListProps> = ({ pdfs, onDelete, onDownload, onView }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredPDFs = filter === 'all' 
    ? pdfs 
    : pdfs.filter(pdf => pdf.category === filter);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  // const getCategoryIcon = (category: string) => {
  //   switch (category) {
  //     case 'tax_guide': return 'fas fa-book text-blue-500';
  //     case 'form_template': return 'fas fa-file-alt text-green-500';
  //     case 'document': return 'fas fa-file-pdf text-red-500';
  //     default: return 'fas fa-file text-gray-500';
  //   }
  // };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'tax_guide': return 'Hướng dẫn thuế';
      case 'form_template': return 'Mẫu tờ khai';
      case 'document': return 'Tài liệu';
      default: return 'Khác';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tất cả ({pdfs.length})
        </button>
        <button
          onClick={() => setFilter('tax_guide')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            filter === 'tax_guide'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Hướng dẫn ({pdfs.filter(p => p.category === 'tax_guide').length})
        </button>
        <button
          onClick={() => setFilter('form_template')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            filter === 'form_template'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Mẫu tờ khai ({pdfs.filter(p => p.category === 'form_template').length})
        </button>
        <button
          onClick={() => setFilter('document')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            filter === 'document'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tài liệu ({pdfs.filter(p => p.category === 'document').length})
        </button>
      </div>

      {/* PDF List */}
      {filteredPDFs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-file-pdf text-4xl mb-4 block"></i>
          <p>Chưa có file PDF nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPDFs.map((pdf) => (
            <div
              key={pdf.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file-pdf text-red-500 text-xl"></i>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {pdf.originalName}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      pdf.category === 'tax_guide' ? 'bg-blue-100 text-blue-800' :
                      pdf.category === 'form_template' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getCategoryName(pdf.category)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                    <span>{formatFileSize(pdf.size)}</span>
                    <span>•</span>
                    <span>{formatDate(pdf.uploadedAt)}</span>
                    <span>•</span>
                    <span>{pdf.downloadCount} lượt tải</span>
                  </div>
                  
                  {pdf.description && (
                    <p className="text-xs text-gray-600 mb-3">{pdf.description}</p>
                  )}
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(pdf)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <i className="fas fa-eye mr-1"></i>
                      Xem
                    </button>
                    <button
                      onClick={() => onDownload(pdf)}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
                    >
                      <i className="fas fa-download mr-1"></i>
                      Tải xuống
                    </button>
                    <button
                      onClick={() => onDelete(pdf.id)}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PDFList;