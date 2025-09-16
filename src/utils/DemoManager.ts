// Demo Manager - Quản lý demo PWA system
export interface DemoTokenData {
  client: string;
  expires: string;
  domain: string;
  data: {
    mst: string;
    password: string;
    company: string;
    content: {
      welcome: string;
      features: string[];
      customMessage: string;
      theme: {
        primaryColor: string;
        secondaryColor: string;
      };
    };
  };
}

export interface DemoConfig {
  tokens: Record<string, DemoTokenData>;
  config?: {
    maxTokens: number;
    defaultExpiry: string;
    autoRefresh: boolean;
  };
}

export class DemoManager {
  private static instance: DemoManager;
  private config: DemoConfig | null = null;
  private currentToken: string | null = null;
  private clientData: DemoTokenData['data'] | null = null;

  private constructor() {}

  public static getInstance(): DemoManager {
    if (!DemoManager.instance) {
      DemoManager.instance = new DemoManager();
    }
    return DemoManager.instance;
  }

  /**
   * Khởi tạo Demo Manager
   */
  public async init(): Promise<void> {
    try {
      await this.loadConfig();
      this.currentToken = this.getTokenFromURL();

      if (this.currentToken && this.validateToken()) {
        this.loadClientData();
      }
    } catch (error) {
      console.error('Error initializing DemoManager:', error);
      throw new Error('Không thể khởi tạo hệ thống demo');
    }
  }

  /**
   * Load demo configuration từ file JSON
   */
  private async loadConfig(): Promise<void> {
    try {
      const response = await fetch('/etax-mobile-react/demo-tokens.json');
      if (!response.ok) {
        // Fallback to default config if file not found
        this.config = {
          tokens: {},
          config: {
            maxTokens: 10,
            defaultExpiry: "1y",
            autoRefresh: true
          }
        };
        return;
      }
      this.config = await response.json();
    } catch (error) {
      console.error('Error loading demo config:', error);
      // Fallback to default config
      this.config = {
        tokens: {},
        config: {
          maxTokens: 10,
          defaultExpiry: "1y",
          autoRefresh: true
        }
      };
    }
  }

  /**
   * Lấy token từ URL parameters
   */
  private getTokenFromURL(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  }

  /**
   * Validate token có hợp lệ không
   */
  public validateToken(): boolean {
    if (!this.currentToken || !this.config) {
      return false;
    }

    const tokenData = this.config.tokens[this.currentToken];
    if (!tokenData) {
      return false;
    }

    // Check expiry date
    const now = new Date();
    const expires = new Date(tokenData.expires);

    if (now > expires) {
      return false;
    }

    return true;
  }

  /**
   * Load client data từ token
   */
  private loadClientData(): void {
    if (this.currentToken && this.config) {
      this.clientData = this.config.tokens[this.currentToken].data;
    }
  }

  /**
   * Validate login credentials
   */
  public validateLogin(mst: string, password: string): boolean {
    if (!this.config) {
      return false;
    }

    // Tìm token có MST và password khớp
    for (const [tokenId, tokenData] of Object.entries(this.config.tokens)) {
      if (tokenData.data.mst === mst && tokenData.data.password === password) {
        // Set current token và client data
        this.currentToken = tokenId;
        this.clientData = tokenData.data;
        return true;
      }
    }

    return false;
  }

  /**
   * Lấy thông tin client hiện tại
   */
  public getClientData(): DemoTokenData['data'] | null {
    return this.clientData;
  }

  /**
   * Lấy token hiện tại
   */
  public getCurrentToken(): string | null {
    return this.currentToken;
  }

  /**
   * Kiểm tra token có hết hạn không
   */
  public isTokenExpired(): boolean {
    if (!this.currentToken || !this.config) {
      return true;
    }

    const tokenData = this.config.tokens[this.currentToken];
    if (!tokenData) {
      return true;
    }

    const now = new Date();
    const expires = new Date(tokenData.expires);

    return now > expires;
  }

  /**
   * Lấy thông tin expiry date
   */
  public getExpiryDate(): Date | null {
    if (!this.currentToken || !this.config) {
      return null;
    }

    const tokenData = this.config.tokens[this.currentToken];
    if (!tokenData) {
      return null;
    }

    return new Date(tokenData.expires);
  }

  /**
   * Lấy thông tin client name
   */
  public getClientName(): string | null {
    if (!this.currentToken || !this.config) {
      return null;
    }

    const tokenData = this.config.tokens[this.currentToken];
    return tokenData ? tokenData.client : null;
  }

  /**
   * Tạo URL với token
   */
  public createTokenURL(token: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}?token=${token}`;
  }

  /**
   * Redirect đến login page
   */
  public redirectToLogin(): void {
    window.location.href = '/';
  }

  /**
   * Redirect đến dashboard với token
   */
  public redirectToDashboard(): void {
    if (this.currentToken) {
      window.location.href = `/dashboard?token=${this.currentToken}`;
    } else {
      this.redirectToLogin();
    }
  }

  /**
   * Logout và clear data
   */
  public logout(): void {
    this.currentToken = null;
    this.clientData = null;
    this.redirectToLogin();
  }

  /**
   * Lấy tất cả tokens (for admin)
   */
  public getAllTokens(): Record<string, DemoTokenData> | null {
    return this.config?.tokens || null;
  }

  /**
   * Tạo token mới (for admin)
   */
  public createToken(tokenId: string, tokenData: DemoTokenData): boolean {
    if (!this.config) {
      return false;
    }

    this.config.tokens[tokenId] = tokenData;
    return true;
  }

  /**
   * Xóa token (for admin)
   */
  public deleteToken(tokenId: string): boolean {
    if (!this.config || !this.config.tokens[tokenId]) {
      return false;
    }

    delete this.config.tokens[tokenId];
    return true;
  }
}

// Export singleton instance
export const demoManager = DemoManager.getInstance();
