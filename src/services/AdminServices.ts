// Admin Services - Tích hợp từ admin-essential
export interface PlaceholderItem {
  id: number;
  key: string;
  value: string;
  type: 'text' | 'currency' | 'date' | 'number';
  page: string;
}

export interface AdminStats {
  totalUsers: number;
  activeLinks: number;
  totalViews: number;
  lastUpdate: string;
}

export interface DemoLink {
  id: number;
  token: string;
  user: string;
  created: string;
  expires: string;
  status: 'active' | 'expired';
}

export class AdminServices {
  private static instance: AdminServices;
  private placeholderData: PlaceholderItem[] = [];
  private stats: AdminStats = {
    totalUsers: 0,
    activeLinks: 0,
    totalViews: 0,
    lastUpdate: new Date().toISOString()
  };

  static getInstance(): AdminServices {
    if (!AdminServices.instance) {
      AdminServices.instance = new AdminServices();
    }
    return AdminServices.instance;
  }

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    // Load placeholder data
    const savedPlaceholders = localStorage.getItem('admin_placeholder_data');
    if (savedPlaceholders) {
      this.placeholderData = JSON.parse(savedPlaceholders);
    }

    // Load stats
    const savedStats = localStorage.getItem('admin_stats');
    if (savedStats) {
      this.stats = JSON.parse(savedStats);
    }
  }

  private saveData(): void {
    localStorage.setItem('admin_placeholder_data', JSON.stringify(this.placeholderData));
    localStorage.setItem('admin_stats', JSON.stringify(this.stats));
  }

  // Placeholder Management
  getPlaceholders(): PlaceholderItem[] {
    return this.placeholderData;
  }

  addPlaceholder(placeholder: Omit<PlaceholderItem, 'id'>): PlaceholderItem {
    const newPlaceholder: PlaceholderItem = {
      ...placeholder,
      id: Date.now()
    };
    this.placeholderData.push(newPlaceholder);
    this.saveData();
    return newPlaceholder;
  }

  updatePlaceholder(id: number, updates: Partial<PlaceholderItem>): boolean {
    const index = this.placeholderData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.placeholderData[index] = { ...this.placeholderData[index], ...updates };
      this.saveData();
      return true;
    }
    return false;
  }

  deletePlaceholder(id: number): boolean {
    const index = this.placeholderData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.placeholderData.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Stats Management
  getStats(): AdminStats {
    return this.stats;
  }

  updateStats(updates: Partial<AdminStats>): void {
    this.stats = { ...this.stats, ...updates, lastUpdate: new Date().toISOString() };
    this.saveData();
  }

  // Export/Import
  exportData(): string {
    const data = {
      placeholderData: this.placeholderData,
      stats: this.stats,
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.placeholderData) {
        this.placeholderData = data.placeholderData;
      }
      if (data.stats) {
        this.stats = data.stats;
      }
      this.saveData();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Placeholder scanning
  scanPlaceholders(htmlContent: string): string[] {
    const placeholderRegex = /\{\{(\w+)\}\}/g;
    const matches = htmlContent.match(placeholderRegex);
    return matches ? matches.map(match => match.replace(/\{\{|\}\}/g, '')) : [];
  }

  replacePlaceholders(htmlContent: string): string {
    let result = htmlContent;
    this.placeholderData.forEach(placeholder => {
      const regex = new RegExp(`\\{\\{${placeholder.key}\\}\\}`, 'g');
      result = result.replace(regex, placeholder.value);
    });
    return result;
  }
}

export const adminServices = AdminServices.getInstance();
