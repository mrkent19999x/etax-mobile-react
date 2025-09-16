// Realtime Service - Cập nhật realtime cho PDF system
export interface RealtimeUpdate {
  id: string;
  type: 'document_created' | 'document_updated' | 'document_deleted' | 'status_changed';
  mst: string;
  documentNumber: string;
  timestamp: number;
  data: Record<string, unknown>;
}

export interface RealtimeListener {
  (update: RealtimeUpdate): void;
}

export class RealtimeService {
  private static instance: RealtimeService;
  private listeners: RealtimeListener[] = [];
  private updateInterval: NodeJS.Timeout | null = null;
  private isRunning = false;

  private constructor() {}

  public static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  /**
   * Khởi động realtime service
   */
  public start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    console.log('RealtimeService started');

    // Simulate realtime updates mỗi 30 giây
    this.updateInterval = setInterval(() => {
      this.simulateUpdate();
    }, 30000);

    // Simulate initial update
    setTimeout(() => {
      this.simulateUpdate();
    }, 5000);
  }

  /**
   * Dừng realtime service
   */
  public stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.isRunning = false;
    console.log('RealtimeService stopped');
  }

  /**
   * Thêm listener cho realtime updates
   */
  public addListener(listener: RealtimeListener): void {
    this.listeners.push(listener);
  }

  /**
   * Xóa listener
   */
  public removeListener(listener: RealtimeListener): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Gửi update đến tất cả listeners
   */
  private notifyListeners(update: RealtimeUpdate): void {
    this.listeners.forEach(listener => {
      try {
        listener(update);
      } catch (error) {
        console.error('Error in realtime listener:', error);
      }
    });
  }

  /**
   * Simulate realtime update
   */
  private simulateUpdate(): void {
    if (this.listeners.length === 0) return;

    const updateTypes: RealtimeUpdate['type'][] = [
      'document_created',
      'document_updated',
      'status_changed'
    ];

    const mstList = ['0123456789', '9876543210'];
    const documentNumbers = ['BL-2025-001', 'HD-2025-002', 'CC-2025-003'];

    const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
    const randomMST = mstList[Math.floor(Math.random() * mstList.length)];
    const randomDocNumber = documentNumbers[Math.floor(Math.random() * documentNumbers.length)];

    const update: RealtimeUpdate = {
      id: `update_${Date.now()}`,
      type: randomType,
      mst: randomMST,
      documentNumber: randomDocNumber,
      timestamp: Date.now(),
      data: this.generateUpdateData(randomType)
    };

    console.log('Realtime update:', update);
    this.notifyListeners(update);
  }

  /**
   * Generate update data based on type
   */
  private generateUpdateData(type: RealtimeUpdate['type']): Record<string, unknown> {
    switch (type) {
      case 'document_created':
        return {
          message: 'Chứng từ mới đã được tạo',
          action: 'refresh_documents'
        };

      case 'document_updated':
        return {
          message: 'Chứng từ đã được cập nhật',
          action: 'refresh_documents'
        };

      case 'status_changed':
        return {
          message: 'Trạng thái chứng từ đã thay đổi',
          action: 'refresh_documents',
          newStatus: 'paid'
        };

      case 'document_deleted':
        return {
          message: 'Chứng từ đã bị xóa',
          action: 'refresh_documents'
        };

      default:
        return {
          message: 'Cập nhật hệ thống',
          action: 'refresh_documents'
        };
    }
  }

  /**
   * Gửi update thủ công
   */
  public sendUpdate(update: Omit<RealtimeUpdate, 'id' | 'timestamp'>): void {
    const fullUpdate: RealtimeUpdate = {
      ...update,
      id: `update_${Date.now()}`,
      timestamp: Date.now()
    };

    console.log('Manual update sent:', fullUpdate);
    this.notifyListeners(fullUpdate);
  }

  /**
   * Lấy lịch sử updates
   */
  public getUpdateHistory(): RealtimeUpdate[] {
    const history = localStorage.getItem('realtime_history');
    if (history) {
      return JSON.parse(history);
    }
    return [];
  }

  /**
   * Lưu update vào history
   */
  public saveUpdateToHistory(update: RealtimeUpdate): void {
    const history = this.getUpdateHistory();
    history.unshift(update);

    // Giữ tối đa 100 updates
    if (history.length > 100) {
      history.splice(100);
    }

    localStorage.setItem('realtime_history', JSON.stringify(history));
  }

  /**
   * Xóa lịch sử updates
   */
  public clearUpdateHistory(): void {
    localStorage.removeItem('realtime_history');
  }

  /**
   * Kiểm tra trạng thái service
   */
  public isServiceRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Lấy số lượng listeners
   */
  public getListenerCount(): number {
    return this.listeners.length;
  }
}

// Export singleton instance
export const realtimeService = RealtimeService.getInstance();
