// PDF Manager - Quản lý file PDF cho admin và khách hàng
export interface PDFFile {
  id: string;
  name: string;
  originalName: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  description: string;
  category: 'tax_guide' | 'form_template' | 'document' | 'other';
  isPublic: boolean;
  downloadCount: number;
}

export class PDFManager {
  private static STORAGE_KEY = 'pdf_files';
  // private static UPLOAD_KEY = 'pdf_uploads';

  // Upload PDF file
  static async uploadPDF(file: File, description: string = '', category: string = 'document'): Promise<PDFFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const pdfFile: PDFFile = {
            id: `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: file.name.replace(/\.[^/.]+$/, ""),
            originalName: file.name,
            size: file.size,
            type: file.type,
            url: e.target?.result as string,
            uploadedAt: new Date().toISOString(),
            uploadedBy: 'admin',
            description,
            category: category as any,
            isPublic: true,
            downloadCount: 0
          };

          this.savePDF(pdfFile);
          resolve(pdfFile);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Lỗi đọc file'));
      reader.readAsDataURL(file);
    });
  }

  // Lưu PDF vào localStorage
  private static savePDF(pdfFile: PDFFile): void {
    const files = this.getAllPDFs();
    files.push(pdfFile);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(files));
  }

  // Lấy tất cả PDF files
  static getAllPDFs(): PDFFile[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Lấy PDF theo ID
  static getPDFById(id: string): PDFFile | null {
    const files = this.getAllPDFs();
    return files.find(file => file.id === id) || null;
  }

  // Lấy PDF theo category
  static getPDFsByCategory(category: string): PDFFile[] {
    const files = this.getAllPDFs();
    return files.filter(file => file.category === category);
  }

  // Xóa PDF
  static deletePDF(id: string): boolean {
    const files = this.getAllPDFs();
    const filtered = files.filter(file => file.id !== id);
    
    if (filtered.length < files.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }
    
    return false;
  }

  // Tăng download count
  static incrementDownloadCount(id: string): void {
    const files = this.getAllPDFs();
    const file = files.find(f => f.id === id);
    if (file) {
      file.downloadCount++;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(files));
    }
  }

  // Download PDF với giao diện iOS
  static downloadPDF(pdfFile: PDFFile): void {
    // Tăng download count
    this.incrementDownloadCount(pdfFile.id);

    // Tạo link download
    const link = document.createElement('a');
    link.href = pdfFile.url;
    link.download = pdfFile.originalName;
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Mở PDF với iOS viewer
  static openPDFViewer(pdfFile: PDFFile): void {
    // Tăng download count
    this.incrementDownloadCount(pdfFile.id);

    // Tạo window mới với iOS style
    const viewerWindow = window.open('', '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes');
    
    if (viewerWindow) {
      viewerWindow.document.write(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${pdfFile.name}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #f2f2f7;
              height: 100vh;
              display: flex;
              flex-direction: column;
            }
            
            .header {
              background: #007AFF;
              color: white;
              padding: 16px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .header h1 {
              font-size: 18px;
              font-weight: 600;
            }
            
            .close-btn {
              background: rgba(255,255,255,0.2);
              border: none;
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              cursor: pointer;
              font-size: 14px;
            }
            
            .pdf-container {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            
            .pdf-info {
              background: white;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 20px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 300px;
            }
            
            .pdf-icon {
              width: 60px;
              height: 60px;
              background: #FF3B30;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 16px;
            }
            
            .pdf-icon i {
              color: white;
              font-size: 24px;
            }
            
            .pdf-name {
              font-size: 16px;
              font-weight: 600;
              color: #1d1d1f;
              margin-bottom: 8px;
            }
            
            .pdf-size {
              font-size: 14px;
              color: #8e8e93;
              margin-bottom: 16px;
            }
            
            .download-btn {
              background: #007AFF;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 25px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
              transition: background 0.2s;
            }
            
            .download-btn:hover {
              background: #0056CC;
            }
            
            .pdf-viewer {
              width: 100%;
              height: 400px;
              border: none;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            
            .back-btn {
              position: absolute;
              top: 20px;
              left: 20px;
              background: rgba(0,0,0,0.5);
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 20px;
              cursor: pointer;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📄 ${pdfFile.name}</h1>
            <button class="close-btn" onclick="window.close()">Đóng</button>
          </div>
          
          <div class="pdf-container">
            <div class="pdf-info">
              <div class="pdf-icon">
                <i class="fas fa-file-pdf"></i>
              </div>
              <div class="pdf-name">${pdfFile.originalName}</div>
              <div class="pdf-size">${this.formatFileSize(pdfFile.size)}</div>
              <button class="download-btn" onclick="downloadPDF()">
                <i class="fas fa-download"></i> Tải xuống
              </button>
            </div>
            
            <iframe 
              class="pdf-viewer" 
              src="${pdfFile.url}" 
              type="application/pdf"
            ></iframe>
          </div>
          
          <script>
            function downloadPDF() {
              const link = document.createElement('a');
              link.href = '${pdfFile.url}';
              link.download = '${pdfFile.originalName}';
              link.click();
            }
            
            // Auto close sau 30 giây nếu không tương tác
            let timeout = setTimeout(() => {
              if (confirm('Đóng trình xem PDF?')) {
                window.close();
              }
            }, 30000);
            
            // Reset timeout khi có tương tác
            document.addEventListener('click', () => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                if (confirm('Đóng trình xem PDF?')) {
                  window.close();
                }
              }, 30000);
            });
          </script>
        </body>
        </html>
      `);
      viewerWindow.document.close();
    }
  }

  // Format file size
  private static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Lấy thống kê
  static getStats() {
    const files = this.getAllPDFs();
    return {
      total: files.length,
      totalSize: files.reduce((sum, file) => sum + file.size, 0),
      totalDownloads: files.reduce((sum, file) => sum + file.downloadCount, 0),
      byCategory: files.reduce((acc, file) => {
        acc[file.category] = (acc[file.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}