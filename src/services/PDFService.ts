// PDF Service - Tạo và quản lý PDF theo MST
export interface TaxDocumentData {
  mst: string;
  companyName: string;
  documentType: 'receipt' | 'invoice' | 'certificate';
  documentNumber: string;
  issueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  content: {
    title: string;
    description: string;
    details: string[];
    footer: string;
  };
}

export class PDFService {
  private static instance: PDFService;
  private documents: Map<string, TaxDocumentData[]> = new Map();

  private constructor() {
    this.initializeMockData();
  }

  public static getInstance(): PDFService {
    if (!PDFService.instance) {
      PDFService.instance = new PDFService();
    }
    return PDFService.instance;
  }

  /**
   * Khởi tạo dữ liệu mẫu
   */
  private initializeMockData(): void {
    // Mock data cho MST 0123456789
    this.documents.set('0123456789', [
      {
        mst: '0123456789',
        companyName: 'Công ty TNHH ABC',
        documentType: 'receipt',
        documentNumber: 'BL-2025-001',
        issueDate: '2025-01-12',
        amount: 5000000,
        status: 'paid',
        content: {
          title: 'BIÊN LAI THUẾ',
          description: 'Biên lai nộp thuế thu nhập doanh nghiệp',
          details: [
            'MST: 0123456789',
            'Tên công ty: Công ty TNHH ABC',
            'Số tiền: 5,000,000 VNĐ',
            'Ngày nộp: 12/01/2025',
            'Trạng thái: Đã nộp'
          ],
          footer: 'Cảm ơn quý khách đã sử dụng dịch vụ eTax'
        }
      },
      {
        mst: '0123456789',
        companyName: 'Công ty TNHH ABC',
        documentType: 'invoice',
        documentNumber: 'HD-2025-002',
        issueDate: '2025-01-10',
        amount: 2500000,
        status: 'pending',
        content: {
          title: 'HÓA ĐƠN THUẾ',
          description: 'Hóa đơn thuế giá trị gia tăng',
          details: [
            'MST: 0123456789',
            'Tên công ty: Công ty TNHH ABC',
            'Số tiền: 2,500,000 VNĐ',
            'Ngày phát hành: 10/01/2025',
            'Trạng thái: Chờ xử lý'
          ],
          footer: 'Hóa đơn điện tử có giá trị pháp lý'
        }
      }
    ]);

    // Mock data cho MST 9876543210
    this.documents.set('9876543210', [
      {
        mst: '9876543210',
        companyName: 'Công ty Cổ phần XYZ',
        documentType: 'certificate',
        documentNumber: 'CC-2025-003',
        issueDate: '2025-01-11',
        amount: 0,
        status: 'paid',
        content: {
          title: 'CHỨNG CHỈ THUẾ',
          description: 'Chứng chỉ hoàn thành nghĩa vụ thuế',
          details: [
            'MST: 9876543210',
            'Tên công ty: Công ty Cổ phần XYZ',
            'Loại chứng chỉ: Hoàn thành nghĩa vụ thuế',
            'Ngày cấp: 11/01/2025',
            'Trạng thái: Đã cấp'
          ],
          footer: 'Chứng chỉ có giá trị pháp lý'
        }
      }
    ]);
  }

  /**
   * Lấy danh sách chứng từ theo MST
   */
  public getDocumentsByMST(mst: string): TaxDocumentData[] {
    return this.documents.get(mst) || [];
  }

  /**
   * Tạo PDF từ dữ liệu chứng từ
   */
  public async generatePDF(document: TaxDocumentData): Promise<Blob> {
    const canvas = window.document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Không thể tạo canvas context');
    }

    // Set canvas size (A4: 595x842 points)
    canvas.width = 595;
    canvas.height = 842;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = '#007AFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(document.content.title, canvas.width / 2, 80);

    // Company info
    ctx.fillStyle = '#333333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`MST: ${document.mst}`, 50, 150);
    ctx.fillText(`Công ty: ${document.companyName}`, 50, 180);
    ctx.fillText(`Số chứng từ: ${document.documentNumber}`, 50, 210);
    ctx.fillText(`Ngày phát hành: ${document.issueDate}`, 50, 240);

    // Amount (if applicable)
    if (document.amount > 0) {
      ctx.fillText(`Số tiền: ${document.amount.toLocaleString('vi-VN')} VNĐ`, 50, 270);
    }

    // Status
    const statusColor = document.status === 'paid' ? '#34C759' :
                       document.status === 'pending' ? '#FF9500' : '#FF3B30';
    ctx.fillStyle = statusColor;
    ctx.fillText(`Trạng thái: ${this.getStatusText(document.status)}`, 50, 300);

    // Description
    ctx.fillStyle = '#666666';
    ctx.font = '14px Arial';
    ctx.fillText(document.content.description, 50, 350);

    // Details
    ctx.fillStyle = '#333333';
    ctx.font = '12px Arial';
    let y = 400;
    document.content.details.forEach(detail => {
      ctx.fillText(`• ${detail}`, 50, y);
      y += 20;
    });

    // Footer
    ctx.fillStyle = '#999999';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(document.content.footer, canvas.width / 2, 800);

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error('Không thể tạo PDF blob');
        }
      }, 'application/pdf');
    });
  }

  /**
   * Lưu PDF vào localStorage
   */
  public async savePDFToStorage(document: TaxDocumentData): Promise<string> {
    const pdfBlob = await this.generatePDF(document);
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Lưu thông tin PDF vào localStorage
    const pdfInfo = {
      url: pdfUrl,
      document: document,
      timestamp: Date.now()
    };

    const storageKey = `pdf_${document.mst}_${document.documentNumber}`;
    localStorage.setItem(storageKey, JSON.stringify(pdfInfo));

    return pdfUrl;
  }

  /**
   * Lấy PDF từ storage
   */
  public getPDFFromStorage(mst: string, documentNumber: string): string | null {
    const storageKey = `pdf_${mst}_${documentNumber}`;
    const pdfInfo = localStorage.getItem(storageKey);

    if (pdfInfo) {
      const data = JSON.parse(pdfInfo);
      return data.url;
    }

    return null;
  }

  /**
   * Xóa PDF cũ (cleanup)
   */
  public cleanupOldPDFs(): void {
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 ngày

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('pdf_')) {
        const pdfInfo = localStorage.getItem(key);
        if (pdfInfo) {
          const data = JSON.parse(pdfInfo);
          if (now - data.timestamp > maxAge) {
            localStorage.removeItem(key);
            URL.revokeObjectURL(data.url);
          }
        }
      }
    }
  }

  /**
   * Lấy text trạng thái
   */
  private getStatusText(status: string): string {
    switch (status) {
      case 'paid': return 'Đã nộp';
      case 'pending': return 'Chờ xử lý';
      case 'overdue': return 'Quá hạn';
      default: return 'Không xác định';
    }
  }

  /**
   * Tạo PDF test
   */
  public async createTestPDF(mst: string): Promise<string> {
    const documents = this.getDocumentsByMST(mst);
    if (documents.length === 0) {
      throw new Error('Không tìm thấy chứng từ cho MST này');
    }

    const document = documents[0];
    return await this.savePDFToStorage(document);
  }
}

// Export singleton instance
export const pdfService = PDFService.getInstance();
